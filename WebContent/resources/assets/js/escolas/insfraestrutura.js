var pefilEscola = sessionStorage.getItem("perfil");
var escola = JSON.parse(pefilEscola);
var nomeEscola = escola.nome;
var dados = [];
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var escolaId = sessionStorage.getItem('escolaId');
var idEscolaInfraestrutura = 0
let checkS = $("#isOutrosS")
let checkN = $("#isOutrosN")

$(document).ready(function() {

	$('#tituloForm').text(nomeEscola + " - Infraestrurtura");

	console.log($('#switch').is(':checked'))
	getDados()

})

$("#formNovoCadastro :input").change(function() {
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

function getDados() {
	$.ajax({
		url: url_base + `/escolaInfraestrutura/escola/${escolaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {

			console.log(data)
			dados = data
			idEscolaInfraestrutura = data[0].idEscolaInfraestrutura

			if (data[0].escolaAcessivel == "S") {
				$('#isAcessivel').attr('checked', true);
			} else {
				$('#isAcessivel').attr('checked', false);
			}

			if (data[0].dependenciasAcessiveis == "S") {

				$('#isDependenciaAcessivel').attr('checked', true)
			} else {
				$('#isDependenciaAcessivel').attr('checked', false)
			}

			if (data[0].sanitariosAcessiveis == "S") {
				$('#isSanitariosAcessivel').attr('checked', true)
			} else {
				$('#isSanitariosAcessivel').attr('checked', false)
			}

			if (data[0].alimentacaoFornecida == "S") {
				$('#isAlimentacaoFornecida').attr('checked', true)
			} else {
				$('#isAlimentacaoFornecida').attr('checked', false)
			}

			if (data[0].aguaFiltrada == "S") {
				$('#isAguaFiltrada').attr('checked', true)
			} else {
				$('#isAguaFiltrada').attr('checked', false)
			}

			if (data[0].sanitarioDentroEscola == "S") {
				$('#isSanitarioEscola').attr('checked', true)
			} else {
				$('#isSanitarioEscola').attr('checked', false)
			}

			if (data[0].biblioteca == "S") {
				$('#isBiblioteca').attr('checked', true)
			} else {
				$('#isBiblioteca').attr('checked', false)
			}

			if (data[0].cozinha == "S") {
				$('#isCozinha').attr('checked', true)
			} else {
				$('#isCozinha').attr('checked', false)
			}

			if (data[0].labInformatica == "S") {
				$('#isLabInformatica').attr('checked', true)
			} else {
				$('#isLabInformatica').attr('checked', false)
			}

			if (data[0].labCiencias == "S") {
				$('#isLabCiencia').attr('checked', true)
			} else {
				$('#isLabCiencia').attr('checked', false)
			}

			if (data[0].salaLeitura == "S") {
				$('#isSalaLeitura').attr('checked', true)
			} else {
				$('#isSalaLeitura').attr('checked', false)
			}

			if (data[0].quadraEsportes == "S") {
				$('#isQuadraEsportes').attr('checked', true)
			} else {
				$('#isQuadraEsportes').attr('checked', false)
			}

			if (data[0].salaDiretoria == "S") {
				$('#isSalaDiretoria').attr('checked', true)
			} else {
				$('#isSalaDiretoria').attr('checked', false)
			}

			if (data[0].salaProfessores == "S") {
				$('#isSalaProfessores').attr('checked', true)
			} else {
				$('#isSalaProfessores').attr('checked', false)
			}

			if (data[0].salaAtendimentoEspecial == "S") {
				$('#isSalaAtendimentoEspecial').attr('checked', true)
			} else {
				$('#isSalaAtendimentoEspecial').attr('checked', false)
			}

			if (data[0].internet == "S") {
				$('#isInternet').attr('checked', true)
			} else {
				$('#isInternet').attr('checked', false)
			}

			if (data[0].bandaLarga == "S") {
				$('#isBandaLarga').attr('checked', true)
			} else {
				$('#isBandaLarga').attr('checked', false)
			}
		})

		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}


function atualizar() {
	var objeto = {
		"idEscolaInfraestrutura": idEscolaInfraestrutura,
		"escolaId": escolaId,
		"escolaAcessivel": getAswer('#isAcessivel'),
		"dependenciasAcessiveis": getAswer('#isDependenciaAcessivel'),
		"sanitariosAcessiveis": getAswer('#isSanitariosAcessivel'),
		"alimentacaoFornecida": getAswer('#isAlimentacaoFornecida'),
		"aguaFiltrada": getAswer('#isAguaFiltrada'),
		"sanitarioDentroEscola": getAswer('#isSanitarioEscola'),
		"biblioteca": getAswer('#isBiblioteca'),
		"cozinha": getAswer('#isCozinha'),
		"labInformatica": getAswer('#isLabInformatica'),
		"labCiencias": getAswer('#isLabCiencia'),
		"salaLeitura": getAswer('#isSalaLeitura'),
		"quadraEsportes": getAswer('#isQuadraEsportes'),
		"salaDiretoria": getAswer('#isSalaDiretoria'),
		"salaProfessores": getAswer('#isSalaProfessores'),
		"salaAtendimentoEspecial": getAswer('#isSalaAtendimentoEspecial'),
		"internet": getAswer('#isInternet'),
		"bandaLarga": getAswer('#isBandaLarga')
	}

	$.ajax({
		url: url_base + "/escolaInfraestrutura",
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
	var objeto = {
		"escolaId": Number(escolaId),
		"escolaAcessivel": getAswer('#isAcessivel'),
		"dependenciasAcessiveis": getAswer('#isDependenciaAcessivel'),
		"sanitariosAcessiveis": getAswer('#isSanitariosAcessivel'),
		"alimentacaoFornecida": getAswer('#isAlimentacaoFornecida'),
		"aguaFiltrada": getAswer('#isAguaFiltrada'),
		"sanitarioDentroEscola": getAswer('#isSanitarioEscola'),
		"biblioteca": getAswer('#isBiblioteca'),
		"cozinha": getAswer('#isCozinha'),
		"labInformatica": getAswer('#isLabInformatica'),
		"labCiencias": getAswer('#isLabCiencia'),
		"salaLeitura": getAswer('#isSalaLeitura'),
		"quadraEsportes": getAswer('#isQuadraEsportes'),
		"salaDiretoria": getAswer('#isSalaDiretoria'),
		"salaProfessores": getAswer('#isSalaProfessores'),
		"salaAtendimentoEspecial": getAswer('#isSalaAtendimentoEspecial'),
		"internet": getAswer('#isInternet'),
		"bandaLarga": getAswer('#isBandaLarga')
	}
	$.ajax({
		url: url_base + "/escolaInfraestrutura",
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
