const contaId = localStorage.getItem("contaId");
let idGradeCurricularSelecionada;
let listaGrades;
let id = params.get("id");
const dadosDisciplina = JSON.parse(localStorage.getItem("objetoDisciplina"))

$(document).ready(function() {
	$("select").select2();


	$.ajax({
		url: url_base + "/alunos/" + id,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	})
		.done(function(res) {
			$("#matricula").val(res.aluno);
			$("#nomeAluno").val(res.pessoa.nomeCompleto);
		})


	$.ajax({
		url: url_base + "/periodoletivo/conta/" + contaId,
		type: "get",
		async: false,
		error: function(e) {
			console.log(e);
		},
	}).done(function(data) {

		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#anoPeriodoId").append(
					$("<option>", {
						value: item.idPeriodoLetivo,
						text: `${item.ano}/${item.periodo}`,
						name: item.period,
					})
				);
			}
		});
	});

	$.ajax({
		url: url_base + "/serie/conta/" + contaId,
		type: "get",
		async: false,
		error: function(e) {
			console.log(e);
		},
	}).done(function(data) {

		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#serieId").append(
					$("<option>", {
						value: item.idSerie,
						text: `${item.serie} - ${item.descricao}`,
						name: item.serie,
					})
				);
			}
		});
	});


	$.ajax({
		url: url_base + "/disciplina/conta/" + contaId,
		type: "get",
		async: false,
		error: function(e) {
			console.log(e);
		},
	}).done(function(data) {



		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#disciplinasId").append(
					$("<option>", {
						value: item.idDisciplina,
						text: `${item.codDiscip} - ${item.nome}`,
						name: item.codDiscip,
					})
				);
			}
		});
	});


	$.ajax({
		url: url_base + "/turno/conta/" + contaId,
		type: "get",
		async: false,
		error: function(e) {
			console.log(e);
		},
	}).done(function(data) {

		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#turnoId").append(
					$("<option>", {
						value: item.idTurno,
						text: `${item.turno} `,
						name: item.turno,
					})
				);
			}
		});

	});

	$("#serieId").val(dadosDisciplina.serieId);
	$("#anoPeriodoId").val(dadosDisciplina.periodoLetivoId);
	$("#disciplinasId").val(dadosDisciplina.disciplinaId);

});






$("#turnoId").change(() => {
	Swal.showLoading();
	$("#escolaId").empty();
	$("#escolaId").removeAttr("disabled");
	$("#escolaId").append(
		`<option value='0' selected disabled>Selecione a escola</option>`
	);

	let turnoId = $("#turnoId").val();
	let periodoLetivo = dadosDisciplina.periodoLetivoId;
	let serieId = dadosDisciplina.serieId;
	let disciplina = dadosDisciplina.disciplinaId;
	$.ajax({
		url: url_base + `/escolas/prematricula?idPeriodoLetivo=${periodoLetivo}&idTurno=${turnoId}&idDisciplina=${disciplina}&idSerie=${serieId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data.data, function(index, item) {
			$("#escolaId").append(
				$("<option>", {
					value: item.idEscola,
					text: item.nomeEscola,
					name: item.nomeEscola,
				})
			);
		});

		Swal.close();
	});
});

$("#escolaId").change(() => {
	Swal.showLoading();
	$("#turmaId").empty();
	$("#turmaId").removeAttr("disabled");
	$("#turmaId").append(
		`<option value='0' selected disabled>Selecione a turma</option>`
	);

	let turnoId = $("#turnoId").val();
	let periodoLetivo = dadosDisciplina.periodoLetivoId;
	let serieId = dadosDisciplina.serieId;
	let disciplina = dadosDisciplina.disciplinaId;
	let escolaId = $("#escolaId").val();

	$.ajax({
		url: url_base + `/turma/prematricula?idPeriodoLetivo=${periodoLetivo}&idSerie=${serieId}&idDisciplina=${disciplina}&idEscola=${escolaId}&idTurno=${turnoId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data.data, function(index, item) {
			$("#turmaId").append(
				$("<option>", {
					value: item.idTurma,
					text: item.nomeTurma,
					name: item.idTurma,
				})
			);
		});
		Swal.close();
	});
});



function cadastrar() {
	const tipoMatriculaId = dadosDisciplina.tipoMatriculaId;
	const periodoLetivoId = dadosDisciplina.periodoLetivoId;
	const disciplinaId = dadosDisciplina.disciplinaId;
	const turmaId =  $("#turmaId").val();
	const serieId = dadosDisciplina.serieId;
	const idPreMatricula = dadosDisciplina.idPreMatricula;
	

	let objeto = {
		"contaId": contaId,
		"tipoMatriculaId": tipoMatriculaId,
		"ativo": "S",
		"alunoId": id,
		"periodoLetivoId": periodoLetivoId,
		"disciplinaId": disciplinaId,
		"turmaId": turmaId,
		"serieId": serieId,
		"manual": "S",
		"usuarioId": usuarioId,
		"observacao": ""
	};

	console.log(objeto)

	$.ajax({
		url: url_base + "/matricula",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Swal.close();
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível cadastar nesse momento!",
			});
		},
	}).done(function(res) {

		$.ajax({
			url: url_base + "/prematricula/" + idPreMatricula,
			type: "DELETE",
			contentType: "application/json; charset=utf-8",
			async: false,
			error: function(e) {
				Swal.close();
				console.log(e);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível cadastar nesse momento!",
				});
			},
		}).done(function(res) {
			Swal.fire({
				title: "Matricula efetivada com sucesso",
				icon: "success",
			});
			window.location.href = "matricular-disciplina?id=" + id
		});
	});
}


const vagas = $("#vagas");
const vagasMin = $("#vagasMin");

function displayMessage(element, messageId, messageText) {
	// Remove a mensagem existente
	$(`#${messageId}`).remove();

	// Adiciona nova mensagem
	const message = $("<p></p>")
		.attr("id", messageId)
		.text(messageText)
		.css("color", "#FF0000");
	element.after(message);
}

function clearMessage(messageId) {
	$(`#${messageId}`).remove();
}

function validateVagas(totalField, minField, messageId, element) {
	const total = parseInt(totalField.val(), 10);
	const min = parseInt(minField.val(), 10);

	if (totalField.val() && minField.val() && min > total) {
		$("#btn-submit").prop("disabled", true);
		displayMessage(
			element,
			messageId,
			"As vagas mínimas devem ser iguais ou menores que o total de vagas."
		);
		return false;
	} else {
		clearMessage(messageId);
		$("#btn-submit").prop("disabled", false);
	}
	return true;
}

$("#formNovoCadastro").on("submit", function(e) {

	e.preventDefault();

	cadastrar();

	return false;
});
