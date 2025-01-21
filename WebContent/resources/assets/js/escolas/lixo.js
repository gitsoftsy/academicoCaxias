
var pefilEscola = sessionStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var dados = []
var rows = 8;
var idEscolaLixo = 0
var currentPage = 1;
var pagesToShow = 5;
var escolaId = sessionStorage.getItem('escolaId');


$(document).ready(function() {

	$('#tituloForm').text(nomeEscola + " - Gerenciamento de Lixo");

	getDados()
})

$("#formNovoCadastro :input").change(function() {
   $("#btn-submit").removeAttr('disabled')
});

function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}

$("#formNovoCadastro").submit(function(e) {


	e.preventDefault();

	if (dados.length > 0) {
		atualizar()
	} else {
		cadastrar()
	}

})




function atualizar() {
	if ($('input[id="isOutros"]').is(':checked')) {
		var objeto = {
			"idEscolaLixo": Number(idEscolaLixo),
			"escolaId": Number(escolaId),
			"coletaPeriodica": getAswer('input[name="isColetaPeriodica"]'),
			"queimaLixo": getAswer('input[name="isQueimaLixo"]'),
			"jogaOutraArea":  getAswer('input[name="isJogaOutraArea"]'),
			"reciclagem": getAswer('input[name="isReciclagem"]'),
			"enterra":  getAswer('input[name="isEnterra"]'),
			"outros": "S",
			"descricaoOutros": $('input[name="descricao"]').val()
			}
	} else {
		var objeto = {
			"idEscolaLixo": Number(idEscolaLixo),
			"escolaId": Number(escolaId),
			"coletaPeriodica": getAswer('input[name="isColetaPeriodica"]'),
			"queimaLixo": getAswer('input[name="isQueimaLixo"]'),
			"jogaOutraArea":  getAswer('input[name="isJogaOutraArea"]'),
			"reciclagem": getAswer('input[name="isReciclagem"]'),
			"enterra":  getAswer('input[name="isEnterra"]'),
			"outros": "N"
		}
	}

	$.ajax({
		url: url_base + "/escolaLixo",
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

function getDados() {
	$.ajax({
		url: url_base + `/escolaLixo/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			idEscolaLixo = data[0].idEscolaLixo
			dados = data

			if (data[0].coletaPeriodica == "S") {
				$('input[id="isColetaPeriodica"]').attr('checked', true);
			} else {
				$('input[id="isColetaPeriodica"]').attr('checked', false);
			}

			if (data[0].queimaLixo == "S") {
				$('input[id="isQueimaLixo"]').attr('checked', true);
			} else {
				$('input[id="isQueimaLixo"]').attr('checked', false);
			}

			if (data[0].jogaOutraArea == "S") {
				$('input[id="isJogaOutraArea"]').attr('checked', true);
			} else {
				$('input[id="isJogaOutraArea"]').attr('checked', false);
			}

			if (data[0].reciclagem == "S") {
				$('input[id="isReciclagem"]').attr('checked', true)
			} else {
				$('input[id="isReciclagem"]').attr('checked', false)
			}

			if (data[0].enterra == "S") {
				$('input[id="isEnterra"]').attr('checked', true)
			} else {
				$('input[id="isEnterra"]').attr('checked', false)
			}

			if (data[0].outros == "S") {
				$('input[id="isOutros"]').attr('checked', true)
			} else {
				$('input[id="isOutros"]').attr('checked', false)
			}

			if (data[0].descricaoOutros == null) {
				$("#cardDesc").hide()
			} else {
				$("#cardDesc").show()
				$('input[id="descricao"]').val(data[0].descricaoOutros)
			}
		})
}

$('input[id="isOutros"]').click(() => {
	if ($('input[id="isOutros"]').is(':checked') == true) {
		$("#cardDesc").show()
		$('input[name="descricao"]').attr('required', true)
	} else {
		$("#cardDesc").hide()
		$('input[name="descricao"]').attr('required', false)

	}
})

function cadastrar() {
	if ($('input[id="isOutros"]').is(':checked')) {
		var objeto = {
			"escolaId": Number(escolaId),
			"coletaPeriodica": getAswer('input[name="isColetaPeriodica"]'),
			"queimaLixo": getAswer('input[name="isQueimaLixo"]'),
			"jogaOutraArea":  getAswer('input[name="isJogaOutraArea"]'),
			"reciclagem": getAswer('input[name="isReciclagem"]'),
			"enterra":  getAswer('input[name="isEnterra"]'),
			"outros": "S",
			"descricaoOutros": $('input[name="descricao"]').val()
		}
	} else {
		var objeto = {
			"escolaId": Number(escolaId),
			"coletaPeriodica": getAswer('input[name="isColetaPeriodica"]'),
			"queimaLixo": getAswer('input[name="isQueimaLixo"]'),
			"jogaOutraArea":  getAswer('input[name="isJogaOutraArea"]'),
			"reciclagem": getAswer('input[name="isReciclagem"]'),
			"enterra":  getAswer('input[name="isEnterra"]'),
			"outros": "N"
		}
	}



	$.ajax({
		url: url_base + "/escolaLixo",
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
			
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
	return false;

}
