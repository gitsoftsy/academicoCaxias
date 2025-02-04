const contaId = localStorage.getItem('contaId');;
let idGradeCurricularSelecionada
let listaGrades

$(document).ready(function() {
	$('select').select2()
	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#escolaId').append($('<option>', {
				value: item.idEscola,
				text: item.nomeEscola,
				name: item.nomeEscola
			}));
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
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

			$("#periodoLetivoId").append(
				$("<option>", {
					value: item.idPeriodoLetivo,
					text: `Ano: ${item.ano} - Período: ${item.periodo} - ${tipoPeriodicidade}`,
					name: item.periodo,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});


	$.ajax({
		url: url_base + "/turno/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turnoId").append(
				$("<option>", {
					value: item.idTurno,
					text: item.turno,
					name: item.turno,
				})
			);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	/*$.ajax({
		url: url_base + "/gradeCurricular/",
		type: "GET",
		async: false,
	}).done(function(data) {
		listaGrades = data
		listarGrade(data)
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});*/

	$.ajax({
		url: url_base + "/cursos/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#cursoIdLista").append(
					$("<option>", {
						value: item.idCurso,
						text: `${item.nome} - ${item.codCurso}`,
						name: item.nome,
					})
				);
			}

		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$('select').select2()

	$('#cursoIdLista').change(() => {
		$("#cola-tabela-grade").empty()

		$('#curriculoIdLista').empty()
		$('#curriculoIdLista').removeAttr('disabled');
		$('#curriculoIdLista').append(`<option value='' selected disabled>Selecione o currículo</option>`)

		let curso = $('#cursoIdLista').val()
		$.ajax({
			url: url_base + `/curriculo/curso/${curso}`,
			type: "get",
			async: false,
		}).done(function(data) {
			console.log(data)
			$.each(data, function(index, item) {
				$('#curriculoIdLista').append($('<option>', {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo
				}));
			});
		})
	});

});

function getGrade(event) {
	event.preventDefault()
	const idCurriculo = $("#curriculoIdLista").val()
	if (idCurriculo != null && idCurriculo != undefined && idCurriculo != 0) {
		$.ajax({
			url: url_base + "/gradeCurricular/curriculo/" + idCurriculo,
			type: "GET",
			async: false,
		}).done(function(data) {
			if (data.length > 0) {
				listaGrades = data
				listarGrade(data)
			} else {
				Swal.fire({
					icon: "info",
					title: "Não existe nenhuma grade vinculada a este currículo!",
					text: "Cadastre uma grade vinculado a este currículo para fazer o cadastro da turma."
				}).then();
				$("#cola-tabela-grade").empty()
			}

		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
	} else {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Você deve preencher os dois campos antes de listar as grades!",
		});
	}

}

const listarGrade = (dados) => {
	var html = dados.map(function(item) {
		var ativo;

		var obrigatoria;
		var retemSerie;

		let colorBtn = 'btn-warning'

		if (idGradeCurricularSelecionada == item.idGradeCurricular) {
			colorBtn = 'btn-primary'
		}


		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		if (item.obrigatoria == "N") {
			obrigatoria = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		} else {
			obrigatoria = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		if (item.retemSerie == "N") {
			retemSerie = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		} else {
			retemSerie = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		return (
			"<tr>" +

			'<td class="d-flex justify-content-center"><span style="width: 50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn ' + colorBtn + ' btn-sm" data-id="' +
			item.idGradeCurricular +
			'"onclick="selecionar(this)"><i class="fa-solid fa-right-to-bracket fa-lg"></i></span></td>' +

			"<td>" +
			item.serie.serie +
			"</td>" +

			"<td>" +
			item.disciplina.codDiscip + ' - ' + item.disciplina.nome +
			"</td>" +

			"<td>" +
			obrigatoria +
			"</td>" +

			"<td>" +
			retemSerie +
			"</td>" +

			"</tr>"
		);
	}).join("");

	$("#cola-tabela-grade").html(html);
}

const selecionar = (element) => {
	idGradeCurricularSelecionada = element.getAttribute("data-id")
	listarGrade(listaGrades)
}

$("#formNovoCadastro").submit(function(e) {
	e.preventDefault();
	
		

	var dadosFormulario = {
		escolaId: Number($('#escolaId').val()),
		codTurmaInep: $('#codTurmaInep').val(),
		turnoId: $('#turnoId').val(),
		libras: $('input[name="libras"]:checked').val(),
		vagas: $('#vagas').val(),
		"periodoLetivoId": $('#periodoLetivoId').val(),
		"gradeCurricularId": idGradeCurricularSelecionada,
		"nomeTurma": $('#nomeTurma').val(),
		"controlaVagas": $('input[name="controlaVagas"]:checked').val()
	};

	$.ajax({
		url: url_base + '/turma',
		type: "POST",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	}).done(function(data) {
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(result => {
			window.location.href = "turma";
		})
	});
});