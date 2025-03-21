var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 10;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";
var ativo = "";
const ofertaConcursoId = params.get("id")
const contaId = localStorage.getItem("contaId");

$(document).ready(function() {


	getDados();

	// Dropdown de Pesquisa
	$(".dropdown-toggle-form").click(function() {
		$(this).siblings(".dropdown-content-form").toggleClass("show");
	});

	$(".searchButton").click(function() {
		var searchInput = $(this)
			.siblings(".searchInput")
			.val()
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		var columnToSearch = $(this).closest(".sortable").data("column");
		var filteredData;

		if (columnToSearch === "dependenciaAdm") {
			filteredData = dadosOriginais.filter(function(item) {
				return item.dependenciaAdm.dependenciaAdministrativa
					.toLowerCase()
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "")
					.includes(searchInput);
			});
		} else if (columnToSearch === "escolaId") {
			filteredData = dadosOriginais.filter(function(item) {
				var escola = escolas.find(function(school) {
					return school.idEscola === item.escolaId;
				});
				var nomeEscola = escola
					? escola.nomeEscola
						.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
					: "";
				return nomeEscola.includes(searchInput);
			});
		} else {
			filteredData = dadosOriginais.filter(function(item) {
				return item[columnToSearch]
					.toString()
					.toLowerCase()
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "")
					.includes(searchInput);
			});
		}

		dados = filteredData;
		showPage(1);
		updatePagination();

		$('input[data-toggle="toggle"]').bootstrapToggle();

		$(this).siblings(".searchInput").val("");
		$(this).closest(".dropdown-content-form").removeClass("show");
	});

	$(document).on("click", ".sortable .col", function() {
		var column = $(this).closest("th").data("column");
		var currentOrder = sortOrder[column] || "vazio";
		var newOrder;

		if (currentOrder === "vazio") {
			newOrder = "asc";
		} else if (currentOrder === "asc") {
			newOrder = "desc";
		} else {
			newOrder = "vazio";
		}

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
			dados = dadosOriginais;
			showPage(1);
			updatePagination();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === "dependenciaAdm") {
				var valueA = a.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
				var valueB = b.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
				if (order === "asc") {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			} else if (column === "escolaId") {
				var escolaA = escolas.find(function(school) {
					return school.idEscola === a.escolaId;
				});
				var escolaB = escolas.find(function(school) {
					return school.idEscola === b.escolaId;
				});
				var nomeEscolaA = escolaA ? escolaA.nomeEscola.toLowerCase() : "";
				var nomeEscolaB = escolaB ? escolaB.nomeEscola.toLowerCase() : "";
				if (order === "asc") {
					return nomeEscolaA.localeCompare(nomeEscolaB);
				} else {
					return nomeEscolaB.localeCompare(nomeEscolaA);
				}
			} else {
				var valueA = a[column].toString().toLowerCase();
				var valueB = b[column].toString().toLowerCase();
				if (order === "asc") {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			}
		});
		dados = dadosOrdenados;
		showPage(1);
		updatePagination();
		$('input[data-toggle="toggle"]').bootstrapToggle();
	}

	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
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
	$.ajax({
		url: url_base + `/ofertaConcursoImg/oferta/${ofertaConcursoId}/imagens`,
		type: "GET",
		async: false,
		headers: {
			"idConta": contaId
		}
	})
		.done(function(data) {
			dados = data;
			dadosOriginais = data;
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}


function listarDados(dados) {
	var html = dados
		.map(function(item) {

			if (item.ativo == "N") {
				ativo =
					'<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
			} else {
				ativo =
					"<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
			}

			return (
				"<tr>" +
				"<td>" +
				item.ordem +
				"</td>" +
				"<td>" +
				(item.tipoDispositivo != "M" ? "Desktop" : "Mobile") +
				"</td>" +
				"<td>" +
				item.url +
				"</td>" +

				'<td class="d-flex justify-content-center">' +
				/*'<span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" ' +
				' data-id="' +
				item.idCursoImg +
				'"  onclick="baixarImg(this)">Vizualizar Imagem</span>' +*/

				'<span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-danger btn-sm" ' +
				' data-id="' +
				item.idOfertaConcursoImg +
				'"  onclick="removerImagem(this)">Remover</span>' +

				'</td>' +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela").html(html);
}


function removerImagem(element) {
	id = element.getAttribute("data-id")


	$.ajax({
		url: url_base + `/ofertaConcursoImg/oferta/imagem/${id}`,
		type: "DELETE",
		contentType: "application/json; charset=utf-8",
		async: false,
		headers: {
			"idConta": contaId
		},
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Falha na requisição",
			});
		},
	}).done(function(data) {
		getDados();
		showPage(currentPage);
		updatePagination();
		Swal.fire({
			title: "Removido com sucesso!",
			icon: "success",
		});
	});

	return false
}





function convertToBase64(file, callback) {
	var reader = new FileReader();
	reader.onload = function(event) {
		callback(event.target.result);
	};
	reader.readAsDataURL(file);
}

// Exportar Dados

$("#exportar-excel").click(function() {
	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "cursos.xlsx");
});



function cadastrar() {

	let imagem = $("#imagem")[0].files[0];
	convertToBase64(imagem, function(base64String) {
		// Pegue apenas a parte base64 da string
		var base64Data = base64String.split(",")[1];

		var dadosFormulario = {
			"contaId": contaId,
			"ofertaConcursoId": ofertaConcursoId,
			"usuarioId": usuarioId,
			"tipoDispositivo": $("input[name='dispositivo']:checked").val(),
			"pathImg": base64Data,
			"ordem": $("#ordem").val(),
			"url": $("#url").val()
		};

		console.log(dadosFormulario);

		$.ajax({
			url: url_base + "/ofertaConcursoImg/imagem",
			type: "POST",
			data: JSON.stringify(dadosFormulario),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(e);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: e.responseJSON.message,
				});
			},
		}).done(function(data) {
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			});
			getDados()
			updatePagination();
			showPage(currentPage);
		});
	});
}



$("#formCadastro").on("submit", function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});
// Limpa input

function limpaCampo() {
	$("#escolaId").val("");
	$("#dependenciaAdmId").val("");
	$("#codCurso").val("");
	$("#nome").val("");
	$("#codCursoInpe").val("");
}
