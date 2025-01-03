
var pefilEscola = sessionStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = sessionStorage.getItem('escolaId');
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")
var idEscolaEnergiaEletrica = 0
var isSemEnergiaEletrica = 'S'
var dados = []


$(document).ready(function() {

	$('#tituloForm').text(nomeEscola + " - Energia Elétrica");
	getDados()

})


$("#formNovoCadastro :input").change(function() {
	$("#btn-submit").removeAttr('disabled')
});

function getDados() {
	$.ajax({
		url: url_base + `/escolaEnergiaEletrica/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			dados = data

			idEscolaEnergiaEletrica = data[0].idEscolaEnergiaEletrica

			console.log(data)



			if (data[0].redePublica == "S") {
				$('input[id="isRedePublica"]').attr('checked', true)
			} else {
				$('input[id="isRedePublica"]').attr('checked', false)
			}
			if (data[0].gerador == "S") {
				$('input[id="isGerador"]').attr('checked', true)
			} else {
				$('input[id="isGerador"]').attr('checked', false)
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
				$("#cardDesc").val(data[0].descricaoOutros)
			}

			if (data[0].semEnergiaEletrica == 'S') {
				$('input[id="isSemEnergiaEletrica"]').attr('checked', false)
				$('input[id="isGerador"]').attr('checked', false)
				$('input[id="isGerador"]').prop('disabled', true)
				$('input[id="isOutros"]').attr('checked', false)
				$('input[id="isOutros"]').prop('disabled', true)
				$("#cardDesc").hide()
			}else{
				$('input[id="isSemEnergiaEletrica"]').attr('checked', true)
			}

		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	return false
}


/*$('input[id="isInexistente"]').click(() => {
	if ($('input[id="isInexistente"]').is(':checked') == true) {
		$('input[id="isFossa"]').prop('checked', false)
		$('input[id="isFossa"]').prop('disabled', true)
	} else {
		$('input[id="isFossa"]').attr('checked', false)
		$('input[id="isFossa"]').prop('disabled', false)
	}
})*/


$('input[id="isSemEnergiaEletrica"]').click(() => {
	if ($('input[id="isSemEnergiaEletrica"]').is(':checked') == true) {
		$('input[id="isGerador"]').prop('disabled', false)
		$('input[id="isOutros"]').prop('disabled', false)
		$('input[id="isRedePublica"]').prop('checked', true)
	} else {
		$('input[id="isGerador"]').prop('checked', false)
		$('input[id="isGerador"]').prop('disabled', true)
		$('input[id="isOutros"]').prop('disabled', true)
		$('input[id="isRedePublica"]').prop('checked', false)
		$('input[id="isRedePublica"]').prop('disabled', false)
	}
})


$('input[id="isOutros"]').click(() => {
	if ($('input[id="isOutros"]').is(':checked') == true) {
		$("#cardDesc").show()
			$('input[name="descricao"]').attr('required', true)
	} else {
		$("#cardDesc").hide()
		$('input[name="descricao"]').attr('required', false)
	}
})



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



function atualizar() {
	
	
	
	if(getAswer("#isSemEnergiaEletrica") == 'S'){
		isSemEnergiaEletrica = "N"
	}
	if ($('input[id="isOutros"]').is(':checked')) {
		var objeto = {
			"idEscolaEnergiaEletrica": idEscolaEnergiaEletrica,
			"escolaId": Number(escolaId),
			"redePublica": getAswer("#isRedePublica"),
			"gerador": getAswer("#isGerador"),
			"outros": getAswer("#isOutros"),
			"descricaoOutros": $("#descricao").val(),
			"semEnergiaEletrica": isSemEnergiaEletrica
		}
	} else {
		var objeto = {
			"idEscolaEnergiaEletrica": idEscolaEnergiaEletrica,
			"escolaId": Number(escolaId),
			"redePublica": getAswer("#isRedePublica"),
			"gerador": getAswer("#isGerador"),
			"outros": getAswer("#isOutros"),
			"semEnergiaEletrica": isSemEnergiaEletrica
		}
	}


	$.ajax({
		url: url_base + "/escolaEnergiaEletrica",
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
		
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
			
			getDados();
		});
	return false;
}

function cadastrar() {
	
	if(getAswer("#isSemEnergiaEletrica") == 'S'){
		isSemEnergiaEletrica = "N"
	}
	if ($('input[id="isOutros"]').is(':checked')) {
		var objeto = {
			"escolaId": Number(escolaId),
			"redePublica": getAswer("#isRedePublica"),
			"gerador": getAswer("#isGerador"),
			"outros": getAswer("#isOutros"),
			"descricaoOutros": $("#descricao").val(),
			"semEnergiaEletrica": isSemEnergiaEletrica
		}
	} else {
		var objeto = {
			"escolaId": Number(escolaId),
			"redePublica": getAswer("#isRedePublica"),
			"gerador": getAswer("#isGerador"),
			"outros": getAswer("#isOutros"),
			"semEnergiaEletrica": isSemEnergiaEletrica
		}
	}
	$.ajax({
		url: url_base + "/escolaEnergiaEletrica",
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

