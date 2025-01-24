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
const idAluno = params.get("id");
const idUsuario = localStorage.getItem("usuarioId");


$(document).ready(function() {
	$("#tableMatriculas").hide();
	$("#tablePreMatriculas").hide();
	$("#notFound").hide();
	$("select").select2();

	getMatriculas()
	getContainerAluno(idAluno)

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
		url: url_base + "/serie/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#serie").append(
				$("<option>", {
					value: item.idSerie,
					text: `${item.serie} - ${item.descricao}`,
					name: item.serie,
				})
			);
		});
	});


	$.ajax({
		url: url_base + "/tiposMatricula/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#tiposMatricula").append(
				$("<option>", {
					value: item.idTipoMatricula,
					text: item.tipoMatricula,
					name: item.tipoMatricula,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/periodoletivo/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			let tipoPeriodicidade;

			switch (item.tipoPeriodicidade) {
				case 'A':
					tipoPeriodicidade = 'Anual'
				case 'B':
					tipoPeriodicidade = 'Bimestral'
				case 'T':
					tipoPeriodicidade = 'Trimestral'
				case 'S':
					tipoPeriodicidade = 'Semestral'
			}

			$("#periodoLetivo").append(
				$("<option>", {
					value: item.idPeriodoLetivo,
					text: `${item.ano}/${item.periodo} - ${tipoPeriodicidade}`,
					name: item.periodo,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
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

});

$("#btn-buscar").on("click", function() {
	const serie = $("#serie").val();
	const idPeriodoLetivo = $("#periodoLetivo").val();
	const tipoMatricula = $("#tiposMatricula").val();
	const escola = $("#escola").val();

	if (!serie && !idPeriodoLetivo && !tipoMatricula) {
		Swal.fire({
			icon: "error",
			title: "Preencha a série, o período letivo e o tipo da matrícula",
			text: "Por favor, informe a série, o período letivo e o tipo da matrícula para realizar a busca.",
		});
		return;
	}

	if (!tipoMatricula) {
		Swal.fire({
			icon: "error",
			title: "Preencha o tipo da matrícula",
			text: "Por favor, informe o tipo da matrícula para realizar a busca.",
		});
		return;
	}

	if (!serie) {
		Swal.fire({
			icon: "error",
			title: "Preencha a série",
			text: "Por favor, informe a série para realizar a busca.",
		});
		return;
	}

	if (!idPeriodoLetivo) {
		Swal.fire({
			icon: "error",
			title: "Preencha a série",
			text: "Por favor, informe o período letivo para realizar a busca.",
		});
		return;
	}

	const filtros = {
		idConta: contaId,
		idSerie: serie || "",
		idPeriodoLetivo: idPeriodoLetivo || "",
		idEscola: escola || "",
	};

	$("#tablePreMatriculas").show();
	getDados(filtros);
	showPage(currentPage);
	updatePagination();
});

function getDados(filtros) {
	console.log(filtros)
	$.ajax({
		url: url_base + `/alunos/disciplinasDispPreMatr?
			&idAluno=${idAluno}
			&idSerie=${filtros.idSerie}
			&idPeriodoLetivo=${filtros.idPeriodoLetivo}
			&idEscola=${filtros.idEscola}`,
		type: "GET",
		error: function(e) {
			Swal.close();
			console.log(e);
			console.log(e.responseJSON);
		},
		async: false,
	})
		.done(function(response) {
			console.log('Response dados:', response)
			dados = response.data
			listarDados(response.data);
			$(".checkbox-toggle").each(function() {
				var status = $(this).data("status");
				if (status !== "S") {
					$(this).prop("checked", false);
				}
			});
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
}

function listarDados(dados) {
	console.log(dados)
	var html = dados
		.map(function(item) {
			const nomeTurma = item.nomeTurma == null ? 'Sem turma' : item.nomeTurma
			const nomeEscola = item.nomeEscola == null ? 'Sem turma' : item.nomeEscola

			return (
				"<tr>" +
				"<td>" +
				nomeEscola +
				"</td>" +
				"<td>" +
				nomeTurma +
				"</td>" +
				"<td>" +
				`${item.codDiscip} - ${item.nomeDisciplina}` +
				"</td>" +
				`<td class="d-flex justify-content-center">
									<span class="btn btn-success btn-sm" data-id="${item.idEscola
				}" data-nome="${item.nomeEscola}" data-logo="${item.logoEscola}" onclick="matricularAluno(${item.idTurma}, ${item.idDisciplina})" style="margin: 5%;" >
										Matricular
									</span>
								</td>`+
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela-pre-matricula").html(html);
}

const getMatriculas = () => {
	console.log('id', idAluno)
	$.ajax({
		url: url_base + `/matricula/dadosMatricula?idAluno=${idAluno}`,
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
	}).done(function(response) {
		dadosOriginais = response.data;

		if (response.data.length > 0) {
			$("#tableMatriculas").show();
			console.log('Response matriculas', response.data)
			listarMatriculas(response.data);
		} else {
			$("#notFound").show();
		}

		$(".checkbox-toggle").each(function() {
			var status = $(this).data("status");
			if (status !== "S") {
				$(this).prop("checked", false);
			}
		});
		$('input[data-toggle="toggle"]').bootstrapToggle();
	})
}

function listarMatriculas(dados) {
	var html = dados
		.map(function(item) {

			let tipoPeriodicidade;

			if (item.tipoPeriodicidade === "A") {
				tipoPeriodicidade = "Anual";
			} else if (item.tipoPeriodicidade === "B") {
				tipoPeriodicidade = "Bimestral";
			} else if (item.tipoPeriodicidade === "T") {
				tipoPeriodicidade = "Trimestral";
			} else if (item.tipoPeriodicidade === "S") {
				tipoPeriodicidade = "Semestral";
			}

			const nomeTurma = item.nomeTurma == "" ? 'não possui' : item.nomeTurma


			return (
				"<tr>" +
				"<td>" +
				`${item.ano}/${item.periodo} - ${tipoPeriodicidade}` +
				"</td>" +
				"<td>" +
				nomeTurma +
				"</td>" +
				"<td>" +
				`${item.codigoDisciplina} - ${item.nomeDisciplina}` +
				"</td>" +
				"<td>" +
				item.tipoMatricula +
				"</td>" +
				"<td>" +
				item.tipo +
				"</td>" +
				`<td class="d-flex justify-content-center">
					<span class="btn btn-danger btn-sm" data-id="${item.idEscola
				}" data-nome="${item.nomeEscola}" data-logo="${item.logoEscola}" onclick="removerMatricula(${item.idPrematricula})" style="margin: 5%;" >
						Remover
					</span>
				</td>`+
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela-matriculas").html(html);
}

const matricular = (idTurma, idDisciplina) => {
	const serie = $("#serie").val();
	const idPeriodoLetivo = $("#periodoLetivo").val();
	const tipoMatricula = $("#tiposMatricula").val();

	console.log('idTurma:', idTurma)
	console.log('idDisciplina:', idDisciplina)

	const body = {
		"contaId": contaId,
		"tipoMatriculaId": tipoMatricula,
		"ativo": "S",
		"alunosId": [idAluno],
		"periodoLetivoId": idPeriodoLetivo,
		"disciplinaId": idDisciplina,
		"turmaId": idTurma,
		"serieId": serie,
		"mensagemErro": "",
		"manual": "S",
		"usuarioId": idUsuario,
		"observacao": ""
	}

	$.ajax({
		url: url_base + "/prematricula/",
		type: "post",
		data: JSON.stringify(body),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			if (e.responseJSON.error == "Erro de violação de chave única") {
				Swal.fire({
					icon: "info",
					title: "Aluno já matriculado!",
					text: "O aluno selecionado já foi matriculado nessa disciplina."

				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!"

				});
			}

		}
	}).done(function(data) {
		Swal.fire({
			title: "Matriculado com sucesso",
			icon: "success",
		}).then((data) => {
			window.location.reload()
		})
	})
}

const matricularAluno = (idTurma, idDisciplina) => {
	console.log('Matricular:', idTurma, idDisciplina)
	Swal.fire({
		title: "Deseja mesmo matricular o aluno nesta disciplina?",
		icon: "warning",
		showCancelButton: false,
		showConfirmButton: true,
		showDenyButton: true,
		confirmButtonText: 'Matricular',
		cancelButtonText: 'Cancelar'
	}).then(result => {
		if (result.isConfirmed) {
			matricular(idTurma, idDisciplina)
		} else if (result.isCanceled) { }
	})
}

const removerMatricula = (idPrematricula) => {
	console.log('Delete:', idPrematricula)
	Swal.fire({
		title: "Deseja mesmo remover?",
		icon: "warning",
		showCancelButton: true,
		showConfirmButton: false,
		showDenyButton: true,
		denyButtonText: 'Deletar',
		cancelButtonText: 'Cancelar'
	}).then(result => {
		if (result.isDenied) {
			$.ajax({
				url: url_base + "/prematricula/" + idPrematricula,
				type: "delete",
				contentType: "application/json; charset=utf-8",
				async: false,
				error: function(e) {
					console.log(e)
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível realizar esse comando!"

					});
				}
			}).done(function(data) {
				Swal.fire({
					title: "Deletado com sucesso",
					icon: "success",
				}).then((data) => {
					window.location.reload()
				})
			})
		} else if (result.isCanceled) { }
	})
}


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
