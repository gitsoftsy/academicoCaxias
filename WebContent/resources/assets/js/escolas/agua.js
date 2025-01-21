
var pefilEscola = sessionStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = sessionStorage.getItem('escolaId');
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")
var idEscolaAgua = 0
var dados = []

$(document).ready(function() {
	
	$('#tituloForm').text(nomeEscola + " - Água");
	getDados()
})


$("#formNovoCadastro :input").change(function() {
   $("#btn-submit").removeAttr('disabled')
});


function getDados() {
	$.ajax({
		url: url_base + `/escolaAgua/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			dados = data

			idEscolaAgua = data[0].idEscolaAgua

			console.log(data)

			if (data[0].semAgua == "N") {
				$('#isAguaTratada').attr('checked', false);
				$('#isFonteRio').attr('checked', false);
				$('#isPocoArtesiano').attr('checked', false);
				$('#isCacimba').attr('checked', false);
				$('#isFonteRio').prop('disabled', true)
				$('#isPocoArtesiano').prop('disabled', true)
				$('#isAguaTratada').prop('disabled', true)
				$('#isCacimba').prop('disabled', true)

				$('input[id="isAguaTratadaS"]').prop('disabled', true)
				$('input[id="isPocoArtesianoN"]').prop('checked', true)
				$('input[id="isFonteRioN"]').prop('disabled', true)
				$('input[id="isPocoArtesianoS"]').prop('disabled', true)
				$('input[id="isPocoArtesianoN"]').prop('disabled', true)
				$('input[id="isPocoArtesianoN"]').prop('checked', true)
				$('input[id="isCacimbaN"]').prop('disabled', true)
				$('input[id="isCacimbaN"]').prop('checked', true)
				$('input[id="isCacimbaS"]').prop('disabled', true)
				$('input[id="isFonteRioN"]').prop('checked', true)
				$('input[id="isFonteRioN"]').prop('disabled', true)
				$('input[id="isFonteRioS"]').prop('disabled', true)

			} else {
				if (data[0].aguaTratada == "S") {
					$('#isAguaTratada').attr('checked', true);
				} else {
					$('#isAguaTratada').attr('checked', false);
				}

				if (data[0].aguaPocoArtesiano == "S") {
					$('#isPocoArtesiano').attr('checked', true);
				} else {
					$('#isPocoArtesiano').attr('checked', false)
				}

				if (data[0].aguaCacimba == "S") {
					$('#isCacimba').attr('checked', true);
				} else {
					$('#isCacimba').attr('checked', false);
				}

				if (data[0].aguaFonteRio == "S") {
					$('#isFonteRio').attr('checked', true);
				} else {
					$('#isFonteRio').attr('checked', false);
				}
			}

			if (data[0].semAgua == "S") {
				$('#isSemAgua').attr('checked', true);
			} else {
				$('#isSemAgua').attr('checked', false);
			}


		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	return false
}

$('input[id="isSemAgua"]').click(() => {
	if ($('input[id="isSemAgua"]').is(':checked') == false) {
		
		$('input[id="isFonteRio"]').prop('checked', false)
		$('input[id="isFonteRio"]').prop('disabled', true)
		$('input[id="isAguaTratada"]').prop('checked', false)
		$('input[id="isAguaTratada"]').prop('disabled', true)
		$('input[id="isCacimba"]').prop('checked', false)
		$('input[id="isCacimba"]').prop('disabled', true)
		$('input[id="isPocoArtesiano"]').prop('checked', false)
		$('input[id="isPocoArtesiano"]').prop('disabled', true)
	} else {
		
		$('input[id="isFonteRio"]').prop('disabled', false)
		$('input[id="isAguaTratada"]').prop('disabled', false)
		$('input[id="isCacimba"]').prop('disabled', false)
		$('input[id="isPocoArtesiano"]').prop('disabled', false)
		
	}
})

function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}



$("#formNovoCadastro").submit(function(e) {

	e.preventDefault();

	console.log(dados)

	if (dados.length > 0) {
		atualizar()
	} else {
		cadastrar()
	}

})


function atualizar() {
	var objeto = {
		"idEscolaAgua": idEscolaAgua,
		"escolaId": escolaId,
		"aguaTratada": getAswer($('#isAguaTratada')),
		"aguaPocoArtesiano": getAswer($("#isPocoArtesiano")),
		"aguaCacimba": getAswer($("#isCacimba")),
		"aguaFonteRio": getAswer($("#isFonteRio")),
		"semAgua": getAswer($("#isSemAgua"))
	}

	$.ajax({
		url: url_base + "/escolaAgua",
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
		"aguaTratada": getAswer($('#isAguaTratada')),
		"aguaPocoArtesiano": getAswer($("#isPocoArtesiano")),
		"aguaCacimba": getAswer($("#isCacimba")),
		"aguaFonteRio": getAswer($("#isFonteRio")),
		"semAgua": getAswer($("#isSemAgua"))
	}


	$.ajax({
		url: url_base + "/escolaAgua",
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


