$(document).ready(function() {
	$.ajax({
		url: url_base + "/turma",
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turmaId").append(
				$("<option>", {
					value: item.idTurma,
					text: item.anoEscolar.anoEscolar + " - " + item.numTurma,
					name: item.numTurma,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/disciplina",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#disciplinaId").append(
				$("<option>", {
					value: item.idDisciplina,
					text: item.nome,
					name: item.nome,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/periodoletivo",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#periodoLetivoId").append(
				$("<option>", {
					value: item.idPeriodoLetivo,
					text: item.periodo,
					name: item.periodo,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/cursos",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#cursoId").append(
				$("<option>", {
					value: item.idCurso,
					text: `${item.nome} - ${item.codCurso}`,
					name: item.nome,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/curriculo",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#curriculoId").append(
				$("<option>", {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo,
				})
			);
		});
	});
});

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();

	var dadosFormulario = {
		turmaId: Number($('#turmaId').val()),
		disciplinaId: Number($('#disciplinaId').val()),
		periodoLetivoId: Number($('#periodoLetivoId').val()),
		serie: $('#serie').val(),
		cursoId: Number($('#cursoId').val()),
		curriculoId: Number($('#curriculoId').val()),
		qtdAulasPrevistas: $('#qtdAulasPrevistas').val(),
		dtInicio: $('#dtInicio').val(),
		dtFim: $('#dtFim').val(),
		situacao: $('#situacao').val(),
		nivelPresenca: $('#nivelPresenca').val(),
		duracaoAula: $('#duracaoAula').val()
	}

	$.ajax({
		url: url_base + "/turmaDisciplina",
		type: "POST",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
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
				title: "Cadastrado com sucesso",
				icon: "success",
			}).then(()=> {
				window.location.href = "turmas-disciplina";
			});
		
	});
});
