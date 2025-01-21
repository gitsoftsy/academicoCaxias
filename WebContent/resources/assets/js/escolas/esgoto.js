
var pefilEscola = sessionStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var dados = [];
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = sessionStorage.getItem('escolaId');
var idEscolaEsgoto = 0
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")

$(document).ready(function() {

	$('#tituloForm').text(nomeEscola + " - Esgoto");

	getDados()

})

$('input[id="isInexistente"]').click(() => {
	if ($('input[id="isInexistente"]').is(':checked') == true) {
		$('input[id="isFossa"]').prop('checked', false)
		$('input[id="isFossa"]').prop('disabled', true)
		$('input[id="isRedePublica"]').attr('checked', false)
		$('input[id="isRedePublica"]').prop('disabled', true)
	} else {
		$('input[id="isRedePublica"]').attr('checked', false)
		$('input[id="isRedePublica"]').prop('disabled', false)
		$('input[id="isFossa"]').attr('checked', false)
		$('input[id="isFossa"]').prop('disabled', false)
	}
})

$('#formNovoCadastro :input').on('change', function() {
	$("#btn-submit").removeAttr('disabled')
});

$("#formNovoCadastro").submit(function(e) {

	e.preventDefault();

	if (dados.length > 0) {
		atualizar()
	} else {
		cadastrar()
	}


})

function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}


function getDados() {
	$.ajax({
		url: url_base + `/escolaEsgoto/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			console.log(data)
			dados = data
			idEscolaEsgoto = data[0].idEscolaEsgoto

			console.log(data[0])

			if (data[0].redePublica == "S") {
				$('input[id="isRedePublica"]').attr('checked', true)
			} else {
				$('input[id="isRedePublica"]').attr('checked', false)
			}

			if (data[0].fossa == "S") {
				$('input[id="isFossa"]').attr('checked', true)
			} else {
				$('input[id="isFossa"]').attr('checked', false)
			}

			if (data[0].inexistente == "S") {
				$('input[id="isInexistente"]').attr('checked', true)
				$('input[id="isFossa"]').attr('checked', false)
				$('input[id="isFossa"]').prop('disabled', true)
			} else {
				$('input[id="isInexistente"]').attr('checked', false)
			}

		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

function atualizar() {
	var objeto = {
		"idEscolaEsgoto": idEscolaEsgoto,
		"escolaId": Number(escolaId),
		"redePublica": getAswer("#isRedePublica"),
		"fossa": getAswer("#isFossa"),
		"inexistente": getAswer("#isInexistente")
	}

	$.ajax({
		url: url_base + "/escolaEsgoto",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
				footer: "Verifique se você selecionou todos os dados!"
			});
		}
	})
		.done(function(data) {

			getDados();
			
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		});
	return false;
}

function cadastrar() {
	var objeto = {
		"escolaId": Number(escolaId),
		"redePublica": getAswer("#isRedePublica"),
		"fossa": getAswer("#isFossa"),
		"inexistente": getAswer("#isInexistente")
	}
	$.ajax({
		url: url_base + "/escolaEsgoto",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(objeto)
			console.log(e)
			console.log(e.responseJSON[0].mensagem)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Este item já foi cadastrado!",

			});
		}
	})
		.done(function(data) {

			dados = data

			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
	return false;
}
