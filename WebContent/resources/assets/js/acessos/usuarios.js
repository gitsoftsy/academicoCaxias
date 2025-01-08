var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";
var ativo = "";
const contaId = localStorage.getItem("contaId");
let dadosUser = "";

$(document).ready(function() {
	getDados();

	$(".telefone").mask("(99) 99999-9999");

	$(".reveal").on("click", function() {
		let pwd = $(this).siblings("input");
		let icon = $(this).find("i");
		if (pwd.attr("type") === "password") {
			pwd.attr("type", "text");
			icon.removeClass("fa-eye").addClass("fa-eye-slash");
		} else {
			pwd.attr("type", "password");
			icon.removeClass("fa-eye-slash").addClass("fa-eye");
		}
	});

	$(".reveal-pwd").on("click", function() {
		let pwd = $(this).siblings("input");
		let icon = $(this).find("i");
		if (pwd.attr("type") === "password") {
			pwd.attr("type", "text");
			icon.removeClass("fa-eye").addClass("fa-eye-slash");
		} else {
			pwd.attr("type", "password");
			icon.removeClass("fa-eye-slash").addClass("fa-eye");
		}
	});

	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});

	// Dropdown de Pesquisa
	$(".dropdown-toggle-form").click(function() {
		$(this).siblings(".dropdown-content-form").toggleClass("show");
	});

	$(".searchButton").click(function() {
		var searchInput = normalizeString($(this).siblings(".searchInput").val());
		var columnToSearch = $(this).closest(".sortable").data("column");
		var filteredData;

		// Função para normalizar strings (remover acentuação, diacríticos e deixar em minúsculas)
		function normalizeString(str) {
			return str
				? str
					.toLowerCase()
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "")
				: "";
		}


		filteredData = dadosOriginais.filter(function(item) {
			var valueToCheck = normalizeString(
				item[columnToSearch]?.toString() || ""
			);
			return valueToCheck.includes(searchInput);
		});

		dados = filteredData
		listarDados(filteredData);
		showPage(currentPage);
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
			listarDados(dadosOriginais);
			dados = dadosOriginais
			showPage(currentPage);
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
		dados = dadosOrdenados
		listarDados(dadosOrdenados);
		showPage(currentPage);
		updatePagination();
		$('input[data-toggle="toggle"]').bootstrapToggle();
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
		url: url_base + "/usuario",
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e);
		},
	})
		.done(function(data) {
			console.log(data)
			dados = data;
			dadosOriginais = data;
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function editar(usuario) {
	var idUsuario = usuario.getAttribute("data-id");
	window.location.href = "novoUsuario?id=" + idUsuario;
}

function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");

	const button = $(element).closest("tr").find(".btn-status");
	if (status === "S") {
		button.removeClass("btn-success").addClass("btn-danger");
		button.find("i").removeClass("fa-check").addClass("fa-xmark");
		element.setAttribute("data-status", "N");
	} else {
		button.removeClass("btn-danger").addClass("btn-success");
		button.find("i").removeClass("fa-xmark").addClass("fa-check");
		element.setAttribute("data-status", "S");
	}

	console.log(id);
	console.log(status);

	$.ajax({
		url:
			url_base + `/usuario/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
	}).then((data) => {
		window.location.href = "usuarios";
	});
}

function listarDados(dados) {
	console.log(dados);
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
				item.nomeCompleto +
				"</td>" +
				"<td>" +
				item.usuario +
				"</td>" +
				"<td>" +
				item.email +
				"</td>" +
				"<td class='telefone'>" +
				item.celular +
				"</td>" +
				"<td>" +
				'<input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idUsuario +
				' " onChange="alteraStatus(this)" ' +
				(item.ativo === "S" ? "checked" : "") +
				' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
				"</td>" +
				'<td class="d-flex justify-content-center">' +
				'<span style="width:50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm"' +
				'" data-id="' +
				item.idUsuario +
				'" data-nome="' +
				item.nomeCompleto +
				'" data-usuario="' +
				item.usuario +
				'" data-email="' +
				item.email +
				'" data-ativo="' +
				item.ativo +
				'"  onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span>' +
				'<button style="width:50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm edit-table"' +
				'" data-id="' +
				item.idUsuario +
				'" data-usuario="' +
				item.usuario +
				'" data-nome-completo="' +
				item.nomeCompleto +
				'" data-email="' +
				item.email +
				'" data-email-verificado="' +
				item.emailVerificado +
				'" data-cpf="' +
				item.cpf +
				'" data-data-nascimento="' +
				item.dataNascimento +
				'" data-celular="' +
				item.celular +
				'" data-celular-verificado="' +
				item.celularVerificado +
				'"data-bs-toggle="modal" onclick="showModal(this)" data-bs-target="#editPassword"><i class="fa-solid fa-key"></i></button>' +
				"</td>" +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela").html(html);
}

function showModal(ref) {
	$("#novaSenha").val("");
	$("#confirmaNovaSenha").val("");

	dadosUser = {
		idUsuario: ref.getAttribute("data-id"),
		usuario: ref.getAttribute("data-usuario"),
		nomeCompleto: ref.getAttribute("data-nome-completo"),
		email: ref.getAttribute("data-email"),
		emailVerificado: ref.getAttribute("data-email-verificado"),
		cpf: ref.getAttribute("data-cpf"),
		dataNascimento: ref.getAttribute("data-data-nascimento"),
		celular: ref.getAttribute("data-celular"),
		celularVerificado: ref.getAttribute("data-celular-verificado"),
	};

	console.log(dadosUser);
}

function validarSenha() {
	let novaSenha = $("#novaSenha").val();
	let confirmaNovaSenha = $("#confirmaNovaSenha").val();
	const message = $("<p id='errMessage'></p>")
		.text("A senhas não coincidem!")
		.css("color", "#FF0000");
	if (novaSenha == confirmaNovaSenha) {
		$("#agrupadorNovaSenha").removeClass("err-message");
		$("#errMessage").css("display", "none");
		$("#btn-salvar").removeAttr("disabled");
	} else {
		if ($("#cardNovaSenha").find("#errMessage").length > 0) {
			$("#errMessage").remove();
		}
		$("#btn-salvar").attr("disabled", "disabled");
		$("#agrupadorNovaSenha").addClass("err-message");
		$("#cardNovaSenha").append(message);
		message.show();
	}
}
$("#novaSenha").blur(function() {
	if ($("#confirmaNovaSenha").val().length > 0) {
		validarSenha();
	}
});
$("#confirmaNovaSenha").blur(function() {
	validarSenha();
});

const editPassword = () => {
	let novaSenha = $("#novaSenha").val();
	let confirmaNovaSenha = $("#confirmaNovaSenha").val();

	console.log(novaSenha);
	console.log(confirmaNovaSenha);

	dadosUser.senha = novaSenha;

	console.log(dadosUser);

	$.ajax({
		url: url_base + "/usuario",
		type: "PUT",
		data: JSON.stringify(dadosUser),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then((data) => {
			window.location.href = "usuarios";
		});
	});
};

// Exportar Dados
$("#exportar-excel").click(function() {
	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "cursos.xlsx");
});

// Limpa input
function limpaCampo() {
	$("#escolaId").val("");
	$("#dependenciaAdmId").val("");
	$("#codCurso").val("");
	$("#nome").val("");
	$("#codCursoInpe").val("");
}

$("#editPassword").on("submit", function(e) {
	e.preventDefault();
	editPassword();
	return false;
});
