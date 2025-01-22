var dados = [];
const contaId = localStorage.getItem("contaId");
var nome = "";
var nome2 = "";
var nome3 = "";
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = "";
let id = "";
var sortOrder = {};
var dadosOriginais = [];

$(document).ready(function() {

	$.ajax({
		url: url_base + "/escolas/ativos/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#escola").append(
				$("<option>", {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/cursos/ativos/conta/" + contaId,
		type: "get",
		async: false,
		error: function(e) {
			console.log(e);
		},
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#curso").append(
					$("<option>", {
						value: item.idCurso,
						text: `${item.nome} - ${item.codCurso}`,
						name: item.nome,
					})
				);
			}
		});
	});

	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});
});

$("#btn-buscar").on("click", function() {
	const matricula = $("#matricula").val();
	const nome = $("#nome").val();
	const cpf = $("#cpf").val();
	const escola = $("#escola").val();
	const curso = $("#curso").val();

	if (!matricula && !nome && !cpf && !escola && !curso) {
		Swal.fire({
			icon: "error",
			title: "Preencha ao menos um filtro",
			text: "Por favor, informe ao menos um filtro para realizar a busca.",
		});
		return;
	}

	if (nome && nome.length < 3) {
		Swal.fire({
			icon: "error",
			title: "Nome inválido",
			text: "O campo Nome precisa ter pelo menos 3 caracteres.",
		});
		return;
	}

	if (cpf && cpf.length < 3) {
		Swal.fire({
			icon: "error",
			title: "CPF inválido",
			text: "O campo CPF precisa ter pelo menos 3 caracteres.",
		});
		return;
	}

	const filtros = {
		idConta: contaId,
		matricula: matricula || "",
		nome: nome || "",
		cpf: cpf || "",
		idEscola: escola || "",
		idCurso: curso || "",
	};

	getDados(filtros);
	showPage(currentPage);
	updatePagination();
});

function getDados(filtros) {
	$.ajax({
		url: url_base + `/api-educacional/alunos/busca?idConta=${filtros.idConta}&nome=${filtros.nome}&cpf=${filtros.cpf}&matricula=${filtros.matricula}&idCurso=${filtros.idCurso}&idEscola=${filtros.idEscola}`,
		type: "POST",
		data: filtros,
		error: function(e) {
			Swal.close();
			console.log(e);
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
		async: false,
	})
		.done(function(data) {
			if (data && data.length > 0) {
				dadosOriginais = data;
				dados = data;
				listarDados(data);
				$(".checkbox-toggle").each(function() {
					var status = $(this).data("status");
					if (status !== "S") {
						$(this).prop("checked", false);
					}
				});
				$('input[data-toggle="toggle"]').bootstrapToggle();
			} else {
				Swal.fire({
					icon: "error",
					title: "Não foram encontrados dados para os filtros informados.",
					text: "Verifique os valores e tente novamente.",
				});
			}
		})
}

$("#limpa-filtros").click(function() {
	currentPage = 1;
	dados = [...dadosOriginais];

	updatePagination();
	showPage(currentPage);

	$(".searchInput").val("");
	$('input[data-toggle="toggle"]').bootstrapToggle();
});

function listarDados(dados) {
	var html = dados
		.map(function(item) {
			// var ativo;

			// if (item.ativo == "N") {
			//   ativo =
			//     '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
			// } else {
			//   ativo =
			//     "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
			// }

			const cpf =
				item.pessoa.cpf == null
					? "Não possui"
					: item.pessoa.cpf.replace(
						/(\d{3})(\d{3})(\d{3})(\d{2})/,
						"$1.$2.$3-$4"
					);

			return (
				"<tr>" +
				"<td>" +
				item.aluno +
				"</td>" +
				"<td>" +
				item.pessoa.nomeCompleto +
				"</td>" +
				"<td>" +
				cpf +
				"</td>" +
				"<td>" +
				`${item.curso.nome} - ${item.curso.codCurso}` +
				"</td>" +
				"<td>" +
				item.serie.serie +
				"</td>" +
				"<td>" +
				item.escola.nomeEscola +
				"</td>" +
				"<td>" +
				item.turno.turno +
				"</td>" +
				"<td>" +
				(item.emailInterno || "Não possui") +
				"</td>" +
				"<td>" +
				item.situacaoAluno.situacaoAluno +
				"</td>" +
				'<td class="d-flex justify-content-center">' +
				'<span style="width:50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" ' +
				"data-id=" +
				item.idAluno +
				' onclick="showModal(this)"><i class="fa-solid fa-file-lines "></i></span>' +
				'<span style="width:50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" ' +
				"data-id=" +
				item.idAluno +
				' onclick="verAvisosAluno(this)"><i class="fa-solid fa-bell"></i></span>' +
				/*			'<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
								item.idAluno +
								'" onclick="showModal(this)"><i class="fa-solid fa-pen fa-lg"></i></span>' +*/
				"</td>" +
				"</tr>"
			);
		})
		.join("");

	$("#tableAlunos").show();
	$("#textoInicial").hide();
	$("#cola-tabela").html(html);
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

	$.ajax({
		url:
			url_base +
			`/criteriosAvaliacao/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e);
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
	}).then((data) => {
		getDados();
	});
}

function showModal(ref) {
	id = ref.getAttribute("data-id");

	window.location.href = "consulta-aluno?id=" + id;
}

function verAvisosAluno(ref) {
	id = ref.getAttribute("data-id");

	window.location.href = "avisos?idAluno=" + id;
}
