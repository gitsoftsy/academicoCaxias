var dados = [];
const contaId = localStorage.getItem("contaId");
var nome = "";
var nome2 = "";
var nome3 = "";
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = "";
let id = params.get("id");
var sortOrder = {};
var dadosOriginais = [];
let disciplinasNaoConfirmadas = [];
let disciplinasConfirmadas = [];

$(document).ready(function() {
	$("#tableAlunos").hide();
	$("select").select2();

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

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			var valueA, valueB;

			switch (column) {
				case "matriculaPes":
					valueA = a.aluno;
					valueB = b.aluno;
					break;
				case "nomePes":
					valueA = a.pessoa.nomeCompleto
						? a.pessoa.nomeCompleto.toString().toLowerCase()
						: "";
					valueB = b.pessoa.nomeCompleto
						? b.pessoa.nomeCompleto.toString().toLowerCase()
						: "";
					break;
				case "cpfPes":
					valueA = a.pessoa.cpf ? a.pessoa.cpf.toString().toLowerCase() : "";
					valueB = b.pessoa.cpf ? b.pessoa.cpf.toString().toLowerCase() : "";
					break;
				case "cursoPes":
					valueA =
						a.curso && a.curso.nome
							? a.curso.nome.toString().toLowerCase()
							: "";
					valueB =
						b.curso && b.curso.nome
							? b.curso.nome.toString().toLowerCase()
							: "";
					break;
				case "seriePes":
					valueA = a.serie ? a.serie.serie.toString().toLowerCase() : "";
					valueB = b.serie ? b.serie.serie.toString().toLowerCase() : "";
					break;
				case "escolaPes":
					valueA = a.escola ? a.escola.nomeEscola.toString().toLowerCase() : "";
					valueB = b.escola ? b.escola.nomeEscola.toString().toLowerCase() : "";
					break;
				case "turnoPes":
					valueA = a.turno ? a.turno.turno.toString().toLowerCase() : "";
					valueB = b.turno ? b.turno.turno.toString().toLowerCase() : "";
					break;
				case "emailPes":
					valueA = a.emailInterno
						? a.emailInterno.toString().toLowerCase()
						: "";
					valueB = b.emailInterno
						? b.emailInterno.toString().toLowerCase()
						: "";
					break;
				case "situacaoAlunoPes":
					valueA = a.situacaoAluno
						? a.situacaoAluno.situacaoAluno.toString().toLowerCase()
						: "";
					valueB = b.situacaoAluno
						? b.situacaoAluno.situacaoAluno.toString().toLowerCase()
						: "";
					break;
				default:
					valueA = "";
					valueB = "";
			}

			if (order === "asc") {
				return valueA.localeCompare(valueB);
			} else {
				return valueB.localeCompare(valueA);
			}
		});

		dados = dadosOrdenados;
		showPage(1);
		updatePagination();
		$('input[data-toggle="toggle"]').bootstrapToggle();
	}

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
			$('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});


	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});

	$("select").select2();

	getDados()
	showPage(currentPage);
	updatePagination();

});


function getDados() {
	$.ajax({
		url: url_base + `/matricula/dadosMatricula?idAluno=` + id,
		type: "GET",
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
			console.log(data);
			if (data && data.data.length > 0) {
				console.log("Entrou");
				dadosOriginais = data.data;
				dados = data.data;

				data.data.forEach(disciplina => {
					if (disciplina.nomeTurma === "") {
						disciplinasNaoConfirmadas.push(disciplina);
					} else {
						disciplinasConfirmadas.push(disciplina);
					}
				});

				console.log("Disciplinas Não Confirmadas:", disciplinasNaoConfirmadas);
				console.log("Disciplinas Confirmadas:", disciplinasConfirmadas);

				listarDisciplinasConfirmadas(disciplinasConfirmadas);
				listarDisciplinasNaoConfirmadas(disciplinasNaoConfirmadas)

				$(".checkbox-toggle").each(function() {
					var status = $(this).data("status");
					if (status !== "S") {
						$(this).prop("checked", false);
					}
				});
				$('input[data-toggle="toggle"]').bootstrapToggle();
			}
		});
}


$("#limpa-filtros").click(function() {
	currentPage = 1;
	dados = [...dadosOriginais];

	updatePagination();
	showPage(currentPage);

	$(".searchInput").val("");
	$('input[data-toggle="toggle"]').bootstrapToggle();
});

const listarDisciplinasConfirmadas = (dados) => {
	var html = dados
		.map(function(item) {
			let nomeTurma;

			if (item.tipo == "Pré-Matricula") {
				nomeTurma = item.nomeTurma;
			} else {
				nomeTurma = "(Sem turma)";
			}

			return (
				"<tr>" +
				"<td>" +
				(item.nomeTurma != '' ? item.nomeTurma : "(Sem Turma)") +
				"</td>" +
				"<td>" +
				item.codigoDisciplina +
				"</td>" +
				"<td>" +
				item.ano +
				"</td>" +
				"<td>" +
				item.periodo +
				"/" +
				item.descricao +
				"</td>" +
				"<td>" +
				item.tipoMatricula +
				"</td>" +
				"<td>" +
				item.tipo +
				"</td>" +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela-matricula").html(html);
};


const listarDisciplinasNaoConfirmadas = (dados) => {
	var html = dados
		.map(function(item) {
			let nomeTurma;

			if (item.tipo == "Pré-Matricula") {
				nomeTurma = item.nomeTurma;
			} else {
				nomeTurma = "(Sem turma)";
			}

			return (
				"<tr>" +
				"<td>" +
				(item.nomeTurma != '' ? item.nomeTurma : "(Sem Turma)") +
				"</td>" +
				"<td>" +
				item.codigoDisciplina +
				"</td>" +
				"<td>" +
				item.ano +
				"</td>" +
				"<td>" +
				item.periodo +
				"/" +
				item.descricao +
				"</td>" +
				"<td>" +
				item.tipoMatricula +
				"</td>" +
				"<td>" +
				item.tipo +
				"</td>" +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela-disciplina").html(html);
};
const acessar = () => {
	window.location.href = "pre-matricula-disciplina?id=" + id;
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
