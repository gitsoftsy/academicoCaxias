var id = '';
var logo = '';
var cnpj = '';
const contaId = localStorage.getItem('contaId')

$(document).ready(function() {
	id = getSearchParams("id");
	$("#divLogoEscola").hide();

	getValorSelects()

	$.ajax({
		url: url_base + "/escolas/" + id,
		type: "GET",
		async: true,
	})
		.done(function(data) {
			
			console.log(data)

			const ref = data
			logo = ref.logoEscola
			console.log(ref)

			if (ref.cnpj == '' || ref.cnpj == null) {
				$('#cnpj').removeAttr("disabled")
			} else {
				$('#cnpj').attr("disabled", "disabled")
			}

			if (ref.bairro == "" || ref.bairro == null) {
				$('#bairro').removeAttr("disabled")
			} else {
				$('#bairro').removeAttr("disabled")
			}

			if (ref.endereco == "" || ref.endereco == null) {
				$('#endereco').removeAttr("disabled")
			} else {
				$('#endereco').removeAttr("disabled")
			}

			$('#nome').val(ref.nomeEscola)
			$("#tipoEscola").val(ref.tipoEscola).attr('selected', true);
			$('#cnpj').val(ref.cnpj)
			$('#codigoInep').val(ref.codigoInep)
			$('#cep').val(ref.cep)
			$('#endereco').val(ref.endereco)
			$('#numero').val(ref.numero)
			$('#bairro').val(ref.bairro)
			$('#municipio').val(ref.municipio)
			$("#complemento").val(ref.complemento)
			$('#uf').val(ref.uf)
			$('#numCME').val(ref.numCME)
			$('#numParecerCME').val(ref.numParecerCME)
			$('#latitude').val(ref.latitude)
			$('#longitude').val(ref.longitude)
			$('#email').val(ref.email)

			if (data.ativo == "S") {
				$(".ativar").hide();
				$(".desativar").show()
			} else {
				$(".desativar").hide();
				$(".ativar").show();
			}


			if (data.tipoEscola == "PU") {
				$("#tipoEscola").val('PU').attr('selected', true);
			} else {
				$("#tipoEscola").val('PV').attr('selected', true);
			}

			/*			if (ref.educacaoIndigena === 'S') {
							$('input[id="isIndigena"]').attr('checked', true)
						} else {
							$('input[id="isIndigena"]').attr('checked', false)
						}
			
						if (ref.exameSelecao === 'S') {
							$('input[id="exameSelecao"]').attr('checked', true)
						} else {
							$('input[id="exameSelecao"]').attr('checked', false)
						}
			
						if (ref.compartilhaEspaco === 'S') {
							$('input[id="compartilhaEspaco"]').attr('checked', true)
						} else {
							$('input[id="compartilhaEspaco"]').attr('checked', false)
						}
			
						if (ref.usaEspacoEntornoEscolar === 'S') {
							$('input[id="usaEspacoEntornoEscolar"]').attr('checked', true)
						} else {
							$('input[id="usaEspacoEntornoEscolar"]').attr('checked', false)
						}*/

			if (ref.pppAtualizado12Meses === 'S') {
				$('input[id="pppAtualizado12Meses"]').attr('checked', true)
			} else {
				$('input[id="pppAtualizado12Meses"]').attr('checked', false)
			}
			$("#localizacaoId").val(ref.localizacao.idLocalizacao).attr('selected', true);
			$("#dependenciaAdmId").val(ref.dependenciaAdm.idDependenciaAdministrativa).attr('selected', true);
			$("#situacaoFuncionamentoId").val(ref.situacaoFuncionamento.idSituacaoFuncionamento).attr('selected', true);
			$("#formaOcupacaoPredioId").val(ref.formaOcupacaoPredio.idFormaOcupacaoPredio).attr('selected', true);

			$("#zoneamentoId").val(ref.zoneamento.idZoneamento).attr('selected', true);
			$("#categoriaEscolaPrivadaId").val(ref.categoriaEscolaPrivada.idCategoriaEscolaPrivada).attr('selected', true);
			$("#entidadeSuperiorId").val(ref.entidadeSuperior.idEntidadeSuperior).attr('selected', true);
			$("#orgaoPublicoId").val(ref.orgaoPublico.idOrgaoPublico).attr('selected', true);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

});

$('input[name="alteraLogo"]').change(function() {
	if ($(this).is(':checked') == true) {
		$('#divLogoEscola').show();
		$("#logoEscola").attr('required', true);
	} else {
		$('#divLogoEscola').hide();
		$("#logoEscola").val(null).attr('required', false);
	}
});

$("#cep").blur(function() {



	if (padrao.test(cep)) {
		Swal.fire({
			title: "CEP Inválido",
			confirmButtonText: "Ok",
			icon: 'error'
		}).then((result) => {
			$("#cep").val('')
		});
	} else {
		$.ajax({
			url: 'https://viacep.com.br/ws/' + $("#cep").val() + '/json/',
			type: "get",
			async: false,
			beforeSend: function() {
				// Mostrar indicador de carregamento
				Swal.showLoading()
			}
		}).done(function(data) {
			Swal.close();

			if (data.erro == true) {

				$("#uf").prop('disabled', false)
				$("#municipio").prop('disabled', false)
				$("#bairro").prop('disabled', false)
				$("#endereco").prop('disabled', false)
				$("#longitude").prop('disabled', false)
				$("#latitude").prop('disabled', false)

				$("#endereco").val('');
				$("#bairro").val('');
				$("#municipio").val('');
				$("#uf").val('');
				$("#longitude").val('');
				$("#latitude").val('');

				$('.bg-loading').fadeOut()
			} else if (data.bairro == '' && data.logradouro == '') {
				$("#bairro").prop('disabled', false)
				$("#endereco").prop('disabled', false)

			} else {
				$("#uf").prop('disabled', true)
				$("#municipio").prop('disabled', true)
				$("#bairro").prop('disabled', true)
				$("#endereco").prop('disabled', true)
				$("#longitude").prop('disabled', true)
				$("#latitude").prop('disabled', true)
			}

			console.log(data)
			$("#endereco").val(data.logradouro);
			$("#bairro").val(data.bairro);
			$("#municipio").val(data.localidade);
			$("#uf").val(data.uf);

			$.ajax({
				url: 'https://nominatim.openstreetmap.org/search?format=json&q=' + data.logradouro + ', ' + data.localidade + ', ' + data.uf,
				type: "get",
				async: false,
			}).done(function(geoData) {
				var lat = geoData[0].lat;
				var lng = geoData[0].lon;

				$("#longitude").val(lng);
				$("#latitude").val(lat);
			});
		})
	}
});


function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}

$("#formEditar").submit(function(e) {
	e.preventDefault();

	function convertToBase64(file, callback) {
		var reader = new FileReader();
		reader.onload = function(event) {
			callback(event.target.result);
		};
		reader.readAsDataURL(file);
	}

	var logoEscolaFile = $('#logoEscola')[0].files[0];

	if ($("#cnpj").val() == '') {
		cnpj = null
	} else {
		cnpj = $('#cnpj').val().replace(/[^\d]+/g, '');
	}

	if (logoEscolaFile) {
		convertToBase64(logoEscolaFile, function(base64String) {
			var dadosComImgBase64 = {
				idEscola: id,
				nomeEscola: $('#nome').val(),
				logoEscola: '',
				tipoEscola: $('#tipoEscola').val(),
				cnpj: cnpj,
				codigoInep: $('#codigoInep').val(),
				cep: $('#cep').val().replace(/[^\d]+/g, ''),
				endereco: $('#endereco').val(),
				numero: $('#numero').val(),
				bairro: $('#bairro').val(),
				municipio: $('#municipio').val(),
				complemento: $("#complemento").val(),
				uf: $('#uf').val(),
				numCME: $('#numCME').val(),
				numParecerCME: $('#numParecerCME').val(),
				latitude: $('#latitude').val(),
				longitude: $('#longitude').val(),
				email: $('#email').val(),
				educacaoIndigena: "N",
				exameSelecao: "N",
				compartilhaEspaco: "N",
				usaEspacoEntornoEscolar: "N",
				pppAtualizado12Meses: getAswer("#pppAtualizado12Meses"),
				localizacaoId: Number($('#localizacaoId').val()),
				contaId: Number(contaId)
			};

			enviarDadosFormulario(dadosComImgBase64);
		});
	} else {

		var dadosFormulario = {
			idEscola: id,
			nomeEscola: $('#nome').val(),
			logoEscola: '',
			tipoEscola: $('#tipoEscola').val(),
			cnpj: cnpj,
			codigoInep: $('#codigoInep').val(),
			cep: $('#cep').val().replace(/[^\d]+/g, ''),
			endereco: $('#endereco').val(),
			numero: $('#numero').val(),
			bairro: $('#bairro').val(),
			municipio: $('#municipio').val(),
			uf: $('#uf').val(),
			complemento: $("#complemento").val(),
			numCME: $('#numCME').val(),
			numParecerCME: $('#numParecerCME').val(),
			latitude: $('#latitude').val(),
			longitude: $('#longitude').val(),
			email: $('#email').val(),
			educacaoIndigena: "N",
			exameSelecao: "N",
			compartilhaEspaco: "N",
			usaEspacoEntornoEscolar: "N",
			pppAtualizado12Meses: getAswer("#pppAtualizado12Meses"),
			localizacaoId: Number($('#localizacaoId').val()),
			contaId: Number(contaId)
		};

		enviarDadosFormulario(dadosFormulario);
	}


});

function desativarEscola(endpoint) {
	$.ajax({
		url: url_base + `/${endpoint}/${id}/desativar`,
		type: "PUT",
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
	}).done(function(data) {
		Swal.fire({
			title: "Desativado com sucesso",
			icon: "success",
		}).then(result => {
			window.location.reload();
		})
	})
	return false;
}

function ativarEscola(endpoint) {
	$.ajax({
		url: url_base + `/${endpoint}/${id}/ativar`,
		type: "PUT",
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
	}).done(function(data) {

		Swal.fire({
			title: "Ativado com sucesso",
			icon: "success",
		}).then(result => {
			window.location.reload();

		})
	})
	return false;
}

/*const desativar = () => {

	Swal.fire({
		title: "Deseja mesmo desativar essa escola?",
		showDenyButton: true,
		confirmButtonText: "Não",
		denyButtonText: `Sim`
	}).then((result) => {
		if (result.isDenied) {
			Swal.fire("Saved!", "", "success");
		} else{
			Swal.fire("Changes are not saved", "", "info");
		}
	});
}*/

function enviarDadosFormulario(objeto) {
	console.log(objeto)
	$.ajax({
		url: url_base + '/escolas',
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.log(e)
		}
	}).done(function(data) {
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		})
		window.location.href = "acessar-escolas";
	});


}