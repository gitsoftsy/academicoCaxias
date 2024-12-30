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
const contaId = localStorage.getItem('contaId');
const alunoId = params.get("id");


$(document).ready(function() {


	tinymce.init({
		selector: '#mensagem',
		height: 300,
		menubar: false,
		plugins: 'link image code lists',
		toolbar: 'undo redo | bold italic underline | bullist numlist | link image | code',
		content_style: 'body { font-family:Arial,sans-serif; font-size:14px }'
	});


	$.ajax({
		url: url_base + "/tipoAviso/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log(data)

		$.each(data, function(index, item) {
			$("#tipoAvisoId").append(
				$("<option>", {
					value: item.idTipoAviso,
					text: item.descricao,
					name: item.idTipoAviso,
				})
			);


		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
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

	getDados()

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


});


function getDados() {
	$.ajax({
		url: url_base + "/alunos/" + alunoId,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			console.log(data)
			dados = data
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function listarDados(dados) {

	$("#matricula").val(dados.aluno)
	$("#nomeAluno").val(dados.pessoa.nomeCompleto)
	$("#emailAluno").val(dados.emailInterno != '' ? dados.emailInterno : "Não Possui")
	$("#cursoAluno").val(dados.curso.nome + ' - ' + dados.curso.codCurso)

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
	const fileInput = $("#anexoAviso")[0]; // Garante que está pegando o elemento correto

	const file = fileInput.files[0];
	if (file) {

		const reader = new FileReader();
		reader.onload = function(event) {
			const base64Anexo = event.target.result.split(",")[1];
			enviarCadastro(base64Anexo);
		};
		reader.onerror = function() {
			Swal.fire({
				icon: "error",
				title: "Erro",
				text: "Não foi possível processar o anexo.",
			});
		};
		reader.readAsDataURL(file);
	} else {

		enviarCadastro(null);
	}
}



function obterIdsSelecionados() {
	let idsSelecionados = [];

	// Itera pelos checkboxes que estão marcados
	$('#cola-tabela input[type="checkbox"]:checked').each(function() {
		const id = $(this).data('id'); // Pega o atributo data-id
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



	const objeto = {
		"tipoAvisoId": Number($("#tipoAvisoId").val()),
		"dataInicio": dataInicio,
		"dataFim": dataFim,
		"titulo": $("#assunto").val(),
		"mensagem": tinymce.get('mensagem').getContent(),
		"usuarioId": Number(usuarioId),
		"professorId": null,
		"destinatarios": [alunoId],
		"pathAnexo": base64Anexo,
		permiteResposta: getAswer("#isAviso"),
		contaId: Number(contaId)
	};


	console.log(objeto)

	$.ajax({
		url: url_base + "/aviso",
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
			window.location.href = "avisos?idAluno=" + alunoId
		})


	});

	return false;
}


function limpaCampo() {
	$('#cadastro-nome').val('');
	$('#cadastro-nome2').val('');
	$('#selectCadastro').val('');
}