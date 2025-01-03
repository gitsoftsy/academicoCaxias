var dados = [];
var ufs = [];
var id = '';
var motivo = '';
var nome2 = '';
var idSelect = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let destinatarios = []
let idSerie;
let idDisciplina;
let periodoLetivoId;
const contaId = localStorage.getItem('contaId');
const turmaId = params.get("turma");

$(document).ready(function() {


	$.ajax({
		url: url_base + "/tiposMatricula/conta/" + contaId,
		type: "GET",
	}).done(function(data) {
		console.log(data)
		$.each(data, function(index, item) {
			$("#tipoMatriculaId").append(
				$("<option>", {
					value: item.idTipoMatricula,
					text: item.tipoMatricula,
				})
			);
		});
	});


	if (isNaN(contaId)) {
		Swal.fire({
			title: "Nenhum usuário localizado, logue novamente",
			icon: "info",
		}).then(result => {
			if (result) {
				window.location.href = "login"
			}
		})
	}


	$("#inputBusca").on("keyup", function() {
		var valorBusca = $(this).val().toLowerCase();

		if (valorBusca === '') {
			busca()
			$("#cola-tabela tr").show();
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
			}).show();
		}
	});

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		realizarBusca(valorBusca);
	});

	function realizarBusca(valorInput) {
		if (valorInput === '') {
			showPage(currentPage);
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorInput) > -1;
			}).show();
		}
	}

	getDados()
	updatePagination();
	showPage(currentPage);


});


function getDados() {
	$.ajax({
		url: url_base + "/turma/" + turmaId,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$("#nomeTurma").val(data.nomeTurma)
			$("#disciplina").val(`${data.gradeCurricular.disciplina.nome} - ${data.gradeCurricular.disciplina.codDiscip}`)
			$("#escola").val(data.escola.nomeEscola)
			$("#curso").val(data.gradeCurricular.curriculo.nomeCurso)
			$("#curriculo").val(data.gradeCurricular.curriculo.curriculo)
			$("#serie").val(data.gradeCurricular.serie.serie)
			$("#anoPeriodo").val(`${data.periodoLetivo.ano}/${data.periodoLetivo.periodo}`)
			$("#turno").val(data.turno.turno)
			$("#vagas").val(data.vagas)

			periodoLetivoId = data.periodoLetivo.idPeriodoLetivo
			idSerie = data.gradeCurricular.serie.idSerie
			idDisciplina = data.gradeCurricular.disciplina.idDisciplina

			$.ajax({
				url: url_base + "/alunos/conta/" + contaId,
				type: "GET",
				async: false,
			})
				.done(function(data) {
					dados = data
					listarDados(data);
					$('input[data-toggle="toggle"]').bootstrapToggle();
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
				});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function listarDados(dados) {
	var html = dados.map(function(item) {
		return (
			"<tr>" +
			"<td>" +
			"<input type='checkbox' class='form-check-input' data-id='" + item.idAluno + "' />" +
			"</td>" +
			"<td>" +
			item.aluno +
			"</td>" +
			"<td>" +
			item.pessoa.nomeCompleto +
			"</td>" +
			"<td>" +
			(item.emailInterno || "Não possui") +
			"</td>" +
			"</tr>"
		);
	}).join("");

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

	console.log(id)
	console.log(status)
	$.ajax({
		url: url_base + `/motivoReprovacaoDocumento/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	})
}

/*function showModal(ref) {
	id = ref.getAttribute("data-id");
	motivo = ref.getAttribute("data-motivo");

	$('#motivoEdit').val(motivo);
}*/

/*function editar() {
	var objeto = {
		"idMotivoReprovacaoDocumento": id,
		"contaId": contaId,
		"motivoReprovacaoDocumento": $("#motivoEdit").val(),
		"obrigatorio": "N"
	}

	$.ajax({
		url: url_base + "/motivoReprovacaoDocumento",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			$('#edit-nome').val('');
			$('#edit-nome2').val('');
			$('#selectEdit').val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		})
	return false;
}*/


$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});

$('#formNovoCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});


// Atualizando o evento para lidar com checkboxes dinâmicos
$('#inicio').on('change', function() {
	if ($('#inicio').val() != '') {
		$('#inicio').attr('required', true)
		$('#termino').attr('disabled', false);
		$('#termino').attr('required', true);
	} else {
		$('#termino').attr('disabled', true);
		$('#termino').attr('required', false);
	}
});


$('#checkAll').on('change', function() {
	const isChecked = $(this).is(':checked');

	// Altera todos os checkboxes dentro da tabela
	$('#cola-tabela input[type="checkbox"]').prop('checked', isChecked);
});

// Garantindo a sincronização de `#checkAll` quando itens individuais são alterados
$('#cola-tabela').on('change', 'input[type="checkbox"]', function() {
	const totalCheckboxes = $('#cola-tabela input[type="checkbox"]').length;
	const checkedCheckboxes = $('#cola-tabela input[type="checkbox"]:checked').length;

	// Sincroniza o estado do checkbox principal
	$('#checkAll').prop('checked', totalCheckboxes === checkedCheckboxes);
});

function cadastrar() {

	destinatarios = obterIdsSelecionados();


		const objeto = {
			"contaId": contaId,
			"tipoMatriculaId": $("#tipoMatriculaId").val(),
			"ativo": "S",
			"alunosId": destinatarios,
			"periodoLetivoId": periodoLetivoId,
			"disciplinaId": idDisciplina,
			"turmaId": turmaId,
			"serieId": idSerie,
			"manual": "S",
			"usuarioId": usuarioId,
			"observacao": null
		};

		console.log(objeto)

		$.ajax({
			url: url_base + "/prematricula",
			type: "POST",
			data: JSON.stringify(objeto),
			contentType: "application/json; charset=utf-8",
			async: false,
			error: function(e) {
				console.error(e.responseJSON.message);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			}
		}).done(function(data) {
		// Limpa os campos e exibe mensagem de sucesso
		limpaCampo();
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "turma-matriculas?turma=" + turmaId
		})


	});



	return false;
}



function obterIdsSelecionados() {
	let idsSelecionados = [];

	// Itera pelos checkboxes que estão marcados
	$('#cola-tabela input[type="checkbox"]:checked').each(function() {
		const id = $(this).data('id'); // Pega o atributo data-id
		const idTipoMatricula = $(this).data('tipomatricula');
		if (id) {
			idsSelecionados.push(id); // Adiciona o ID ao array
		}
	});

	return idsSelecionados; // Retorna o array com os IDs
}


function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}


function enviarCadastro(base64Anexo) {





	const dataInicio = $("#inicio").val() != '' ? `${$("#inicio").val()}T15:30:00` : null
	const dataFim = $("#termino").val() != '' ? `${$("#termino").val()}T15:30:00` : null


	if (destinatarios.length === 0) {
		Swal.fire({
			icon: "info",
			title: "Nenhum aluno selecionado",
			text: "Selecione pelo menos um aluno antes de continuar.",
		});
		return false;
	}


}


function limpaCampo() {
	$('#cadastro-nome').val('');
	$('#cadastro-nome2').val('');
	$('#selectCadastro').val('');
}