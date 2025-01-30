var dados = [];
var sortOrder = {};
var dadosOriginais = [];
const contaId = localStorage.getItem("contaId");
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;

$(document).ready(function() {
	getDados();

	// Dropdown de Pesquisa
	$(".dropdown-toggle-form").click(function() { });

	$(".searchButton").click(function() {
		var searchInput = $(this)
			.siblings(".searchInput")
			.val()
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		var columnToSearch = $(this).closest(".sortable").data("column");
		var filteredData = dadosOriginais.filter(function(item) {
			var itemValue = item[columnToSearch]
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");
			return itemValue.includes(searchInput);
		});

		dados = filteredData;
		listarDados(filteredData);
		showPage(currentPage);
		updatePagination();
		$('input[data-toggle="toggle"]').bootstrapToggle();
		$(this).siblings(".searchInput").val("");
		$(this).closest(".dropdown-content-form").removeClass("show");
		
		
		updatePagination();
		showPage(currentPage);
	});

	$(document).click(function(event) {
		if (!$(event.target).closest(".dropdown-form").length) {
			$(".dropdown-content-form").removeClass("show");
		}
	});

	$("#inputBusca").on("keyup input", function() {
		var valorBusca = $(this)
			.val()
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		realizarBusca(valorBusca);
	});

	function realizarBusca(valorInput) {
		if (valorInput === "") {
			showPage(currentPage);
		} else {
			$("#cola-tabela tr")
				.hide()
				.filter(function() {
					return $(this).text().toLowerCase().indexOf(valorInput) > -1;
				})
				.show();
		}

		updatePagination();
		showPage(currentPage);
	}

	$(document).on("click", ".sortable .col", function() {
		var column = $(this).closest("th").data("column");
		var currentOrder = sortOrder[column] || "vazio";
		var newOrder =
			currentOrder === "vazio"
				? "asc"
				: currentOrder === "asc"
					? "desc"
					: "vazio";

		$(".sortable span").removeClass("asc desc");
		$(this).find("span").addClass(newOrder);

		var icon = $(this).find("i");
		icon.removeClass("fa-sort-up fa-sort-down fa-sort");

		if (newOrder === "asc") {
			icon.addClass("fa-sort-up");
			sortData(column, newOrder);
		} else if (newOrder === "desc") {
			icon.addClass("fa-sort-down");
			sortData(column, newOrder);
		} else {
			icon.addClass("fa-sort");
			listarDados(dadosOriginais);
			showPage(currentPage);
			updatePagination();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});

	showPage(currentPage);
	updatePagination();
});

$("#limpa-filtros").click(function() {
	currentPage = 1;
	dados = [...dadosOriginais];

	updatePagination();
	showPage(currentPage);

	$(".searchInput").val("");
	$('input[data-toggle="toggle"]').bootstrapToggle();
});

function getDados() {
	const usuarioId = sessionStorage.getItem("usuarioId");
	$.ajax({
		url: `${url_base}/escolas/usuario/${contaId}/${usuarioId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data;
			dadosOriginais = data;
			showPage(1);
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function listarDados(dados) {
	var html = dados
		.map(function(item) {
			var ativo =
				item.ativo === "N"
					? '<i style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
					: "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";

			return `
            <tr>
                <td class="d-flex justify-content-center">
                    <span class="btn btn-warning btn-sm" data-id="${item.idEscola
				}" data-nome="${item.nomeEscola}" data-logo="${item.logoEscola}" onclick="acessar(this)" style="margin: 5%;" >
                        <i class="fa-solid fa-right-to-bracket fa-lg"></i>
                    </span>
                </td>
                <td>${item.nomeEscola}</td>
                <td>${item.municipio}</td>
                <td>${item.uf}</td>
                <td>${item.codigoInep}</td>
                <td>
                    <input type="checkbox" data-id="${item.idEscola
				}" data-status="${item.ativo}" onChange="alteraStatus(this)"
                        ${item.ativo === "S" ? "checked" : ""}
                        data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" class="checkbox-toggle">
                </td>
                <td>
                    <span class="btn btn-warning btn-sm" data-id="${item.idEscola
				}" onclick="editar(this)">
                        <i class="fa-solid fa-pen fa-lg"></i>
                    </span>
                </td>
            </tr>`;
		})
		.join("");
	

	$("#cola-tabela").html(html);
}

function sortData(column, order) {
	var dadosOrdenados = dadosOriginais.slice();
	dadosOrdenados.sort(function(a, b) {
		var valueA = a[column].toLowerCase();
		var valueB = b[column].toLowerCase();
		return order === "asc"
			? valueA.localeCompare(valueB)
			: valueB.localeCompare(valueA);
	});

	dados = dadosOrdenados;
	listarDados(dadosOrdenados);
	showPage(currentPage);
	updatePagination();
	$('input[data-toggle="toggle"]').bootstrapToggle();
}

function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");

	if (status === "S") {
		$.ajax({
			url:
				url_base +
				`/ofertasConcurso/conta/${contaId}/escolas/${id}/podeDesativar`,
			type: "GET",
			success: function(response) {
				if (response.data[0].podeDesativar === "N") {
					let modalContent =
						'<p style="text-align: left;">Existem registros ativos atrelados a essa escola, para desativa-la primeiro desative:</p>';

					if (response.data[0].ofertaAtiva === "S") {
						modalContent +=
							'<p style="text-align: left;">- Ofertas de Concurso: <a href="oferta-concurso">Desativar ofertas</a></p>';
					}

					if (response.data[0].turmaAtiva === "S") {
						modalContent +=
							'<p style="text-align: left;">- Turmas: <a href="turma">Desativar turmas</a></p>';
					}

					Swal.fire({
						icon: "error",
						title: "Alteração não Permitida",
						html: modalContent,
					});

					getDados()
				} else {
					desativarEscola(element);
				}
			},
			error: function(e) {
				Swal.fire({
					icon: "error",
					title: "Erro ao verificar possibilidade de desativação",
				});
				console.log(e.responseJSON);
			},
		});
	} else {
		ativarEscola(element);
	}
	}

function desativarEscola(element) {
	var id = element.getAttribute("data-id");
	$.ajax({
		url: url_base + `/escolas/${id}/desativar`,
		type: "PUT",
		success: function() {
			const button = $(element).closest("tr").find(".btn-status");
			button.removeClass("btn-success").addClass("btn-danger");
			button.find("i").removeClass("fa-check").addClass("fa-xmark");
			element.setAttribute("data-status", "N");
			Swal.fire({
				title: "Desativado com sucesso",
				icon: "success",
			});
			getDados()

		},
		error: function(e) {
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
			console.log(e.responseJSON);
		},
	});
}

function ativarEscola(element) {
	var id = element.getAttribute("data-id");
	$.ajax({
		url: url_base + `/escolas/${id}/ativar`,
		type: "PUT",
		success: function() {
			const button = $(element).closest("tr").find(".btn-status");
			button.removeClass("btn-danger").addClass("btn-success");
			button.find("i").removeClass("fa-xmark").addClass("fa-check");
			element.setAttribute("data-status", "S");
			Swal.fire({
				title: "Ativado com sucesso",
				icon: "success",
			});
			getDados()
		},
		error: function(e) {
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
			console.log(e.responseJSON);
		},
	});
}

// Redireciona para a página de edição
function editar(ref) {
	var id = ref.getAttribute("data-id");
	window.location.href = "editar-escola?id=" + id;
}

function acessar(element) {
	var id = $(element).data("id");
	var nome = $(element).data("nome");
	var logo = $(element).data("logo");

	sessionStorage.setItem(
		"perfil",
		JSON.stringify({ perfil: "escola", id, nome, logo })
	);
	sessionStorage.setItem("escolaId", id);
	window.location.href = "acessar-escolas";
}
