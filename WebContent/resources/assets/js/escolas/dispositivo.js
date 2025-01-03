
var pefilEscola = sessionStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = sessionStorage.getItem('escolaId');
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")
var idEscolaDispositivo = 0
var dados = []

$(document).ready(function() {

	$('#tituloForm').text(nomeEscola + " - Controle de Dispositivos");

	getDados()


})

$('#formNovoCadastro :input').on('change', function() {
	$("#btn-submit").removeAttr('disabled')
});




function getDados() {
	$.ajax({
		url: url_base + `/escolaDispositivo/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			dados = data

			idEscolaDispositivo = data[0].idEscolaDispositivo

			console.log(data)

			$('#qtdComputadoresAlunos').val(data[0].qtdComputadoresAlunos)
			$('#qtdAparelhosDvd').val(data[0].qtdAparelhosDvd)
			$('#qtdImpressora').val(data[0].qtdImpressora)
			$('#qtdParabolicas').val(data[0].qtdParabolicas)
			$('#qtdCopiadoras').val(data[0].qtdCopiadoras)
			$('#qtdProjetores').val(data[0].qtdProjetores)
			$('#qtdTvs').val(data[0].qtdTvs)



		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	return false
}


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
		"idEscolaDispositivo": Number(idEscolaDispositivo),
		"escolaId": Number(escolaId),
		"qtdComputadoresAlunos": $("#qtdComputadoresAlunos").val(),
		"qtdAparelhosDvd": $("#qtdAparelhosDvd").val(),
		"qtdImpressora": $("#qtdImpressora").val(),
		"qtdParabolicas": $("#qtdParabolicas").val(),
		"qtdCopiadoras": $("#qtdCopiadoras").val(),
		"qtdProjetores": $("#qtdProjetores").val(),
		"qtdTvs": $("#qtdTvs").val()
	}

	$.ajax({
		url: url_base + "/escolaDispositivo",
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
		"qtdComputadoresAlunos": $("#qtdComputadoresAlunos").val(),
		"qtdAparelhosDvd": $("#qtdAparelhosDvd").val(),
		"qtdImpressora": $("#qtdImpressora").val(),
		"qtdParabolicas": $("#qtdParabolicas").val(),
		"qtdCopiadoras": $("#qtdCopiadoras").val(),
		"qtdProjetores": $("#qtdProjetores").val(),
		"qtdTvs": $("#qtdTvs").val()
	}


	$.ajax({
		url: url_base + "/escolaDispositivo",
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
