const contaId = localStorage.getItem('contaId')
var idPessoa = 0
var numeroCandidato = 0
var ofertaConcursoId = 0
var aprovado = ""
var usuarioAprovacaoId = 0
var classificacao = ""


$(document).ready(function() {




	var tamanhoBody = $("body").width()

	if (tamanhoBody < 768) {
		$("#qualPreencher").show()
		$("#qualPreencherSwitch").hide()
	} else {
		$("#qualPreencher").hide()
		$("#qualPreencherSwitch").show()
	}

	if ($('input[name="qualPreencher"]').is(':checked')) {
		$("#certidaoNascimento").show();
		$("#certidaoCasamento").hide();


		$("input[name='certidaoCasamentoNumero']").attr("required", false);
		$("input[name='certidaoCasamentoCartorio']").attr("required", false);
		$("select[name='certidaoCasamentoUfCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("select[name='certidaoCasamentoCidadeCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoCasamentoFolha']").attr("required", false);
		$("input[name='certidaoCasamentoLivro']").attr("required", false);
		$("input[name='certidaoCasamentoOrdem']").attr("required", false);
		$("input[name='certidaoCasamentoDataEmissao']").attr("required", false);
	} else {
		$("#certidaoNascimento").hide();
		$("#certidaoCasamento").show();

		$("input[name='certidaoNascimentoNumero']").attr("required", false);
		$("select[name='certidaoNascimentoMunicipioCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoCartorio']").attr("required", false);
		$("select[name='certidaoNascimentoUfCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoDataEmissao']").attr("required", false);
		$("input[name='certidaoNascimentoFolha']").attr("required", false);
		$("input[name='certidaoNascimentoLivro']").attr("required", false);
		$("input[name='certidaoNascimentoOrdem']").attr("required", false);
	}


	function applyMask(value) {
		value = value.replace(/[^0-9X]/g, ''); // Remove tudo que não for número ou "X"
		var x = value.endsWith('X') ? 'X' : ''; // Verifica se o "X" está no final
		value = value.replace('X', ''); // Remove o "X" para aplicar a máscara

		// Máscaras possíveis baseadas no número de dígitos
		var masks = [
			'0',
			'0-0',
			'00-0',
			'000-0',
			'000.0-0',
			'000.00-0',
			'000.000-0',
			'000.000.0-0',
			'000.000.00-0',
			'000.000.000-00',
			'000.000.000-000',
			'000.000.000-0000',
			'000.000.000-000000',
			'000.000.000-00000',
		];

		var length = value.length; // Conta o número total de dígitos
		var mask = masks[length - 1]; // Seleciona a máscara apropriada

		var result = '';
		var j = 0;
		for (var i = 0; i < mask.length; i++) {
			if (mask[i] === '0' && j < value.length) {
				result += value[j++];
			} else if (mask[i] !== '0') {
				result += mask[i];
			}
		}
		return result + x; // Adiciona o "X" de volta ao final se estiver presente
	}

	$('#rgNumero').on('focus', function() {
		$(this).data('prevValue', $(this).val());
		$(this).val($(this).val().replace(/[^0-9X]/g, '')); // Remove máscara e mantém o valor
	});

	$('#rgNumero').on('blur', function() {
		var value = $(this).val();
		$(this).val(applyMask(value)); // Aplica a máscara ao sair do campo
	});

	$('#rgNumero').on('input', function() {
		var value = $(this).val().replace(/[^0-9X]/g, ''); // Remove tudo que não for número ou "X"
		if (value.length > 14) {
			value = value.slice(0, 14); // Limita a entrada a 14 caracteres
			$(this).val(value); // Atualiza o valor no campo
		}
	});

	$.ajax({
		url: url_base + '/tiposIngresso/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			if (item.ativo == "S") {
				$('#tipoIngressoId').append($('<option>', {
					value: item.idTipoIngresso,
					text: item.tipoIngresso,
					name: item.tipoIngresso
				}));
			}

		});
	})

	$.ajax({
		url: url_base + '/raca',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#racaId').append($('<option>', {
					value: item.idRaca,
					text: item.raca,
					name: item.raca
				}));
			}
		});
	})

	$.ajax({
		url: url_base + '/paises',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			$('#paisNascimentoId').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));

			$('#paisResidenciaId').append($('<option>', {
				value: item.idPais,
				text: item.nomePais,
				name: item.nomePais
			}));

		});


	})



	$.ajax({
		url: url_base + '/nacionalidade',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#nacionalidadeId').append($('<option>', {
				value: item.idNacionalidade,
				text: item.nacionalidade,
				name: item.nacionalidade
			}));
		});
	})

	$.ajax({
		url: url_base + '/municipio',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#municipioNascimentoId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));

			$('#certidaoNascimentoMunicipioCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));

			$('#certidaoCasamentoCidadeCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));

		});
	})


	$.ajax({
		url: url_base + '/uf',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#ufNascimentoId').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#rgUfEmissorId').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#rneUfEmissorId').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#certidaoNascimentoUfCartorioId').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));

			$('#certidaoCasamentoUfCartorioId').append($('<option>', {
				value: item.idUf,
				text: item.codUf + " - " + item.nomeUf,
				name: item.codUf
			}));
		});
	})



	/*$.ajax({
		url: url_base + "/pessoas",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#pessoaId").append(
				$("<option>", {
					value: item.idPessoa,
					text: item.nome,
					name: item.nome,
				})
			);
		});
	});
	
	$.ajax({
		url: url_base + "/situacaoProfessor",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#situacaoProfessorId").append(
				$("<option>", {
					value: item.idSituacaoProfessor,
					text: item.situacaoProfessor,
					name: item.situacaoProfessor,
				})
			);
		});
	});
	
	$.ajax({
		url: url_base + "/nivelEscolaridade",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#nivelEscolaridadeId").append(
				$("<option>", {
					value: item.idNivelEscolaridade,
					text: item.nivelEscolaridade,
					name: item.nivelEscolaridade,
				})
			);
		});
	});
	
	$.ajax({
		url: url_base + "/tipoEnsinoMedio",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#tipoEnsinoMedioId").append(
				$("<option>", {
					value: item.idTipoEnsinoMedio,
					text: item.tipoEnsinoMedio,
					name: item.tipoEnsinoMedio,
				})
			);
		});
	});*/

	$("select").select2();
});

$('#formNovoCadastro').submit(function(event) {
	event.preventDefault();

	if ($("#senhaConfirmacao").val() != $("#senha").val()) {
		Swal.fire({
			icon: "error",
			title: "A duas senhas devem ser iguais!",
			text: "Verifique as senha novamente!",
		});
	} else {

		let cpf = $('#cpf').val().replace(/[^\d]+/g, '')

		if (cpf == "") {
			cpf = null
		}

		var rgValue = $('#rgNumero').val();



		var dadosFormulario = {
			pessoaDTO: {
				contaId: contaId,
				nomeCompleto: $('#nomeCompleto').val(),
				nomeMae: null,
				nomePai: null,
				sexo: $('input[name="sexo"]:checked').val(),
				dtNascimento: $('#dtNascimento').val(),
				cpf: cpf,
				racaId: $('#racaId').val(),
				paisNascimentoId: $('#paisNascimentoId').val(),
				paisResidenciaId: $('#paisResidenciaId').val(),
				ufNascimentoId: $('#ufNascimentoId').val(),
				municipioNascimentoId: $('#municipioNascimentoId').val(),
				nacionalidadeId: $('#nacionalidadeId').val(),
				"nacionalidade": $('#nacionalidadeId').find(":selected").text().substring(0, 3),
				estadoCivil: $('input[name="estadoCivil"]:checked').val(),
				rgNumero: rgValue.replace(/[^\dX]/g, ''),
				rgDataExpedicao: $('#rgDataExpedicao').val(),
				rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
				rgUfEmissorId: $('#rgUfEmissorId').val(),
				certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
				certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
				certidaoNascimentoUfCartorioId: Number($('#certidaoNascimentoUfCartorioId').val()),
				certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
				certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
				certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
				certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
				certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
				certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
				certidaoCasamentoUfCartorioId: Number($('#certidaoCasamentoUfCartorioId').val()),
				certidaoCasamentoCidadeCartorio: $('#certidaoCasamentoCidadeCartorio').val(),
				certidaoCasamentoFolha: $('#certidaoCasamentoFolha').val(),
				certidaoCasamentoLivro: $('#certidaoCasamentoLivro').val(),
				certidaoCasamentoOrdem: $('#certidaoCasamentoOrdem').val(),
				certidaoCasamentoDataEmissao: $('#certidaoCasamentoDataEmissao').val(),
				rneNumero: $("#rneNumero").val(),
				rneOrgaoExpedidor: $("#rneOrgaoExpedidor").val(),
				rneUfEmissorId: $("#rneUfEmissorId").val(),
				rneDataExpedicao: $("#rneDataExpedicao").val(),
				"certidaoNascimentoMunicipioCartorioId": $('#certidaoNascimentoMunicipioCartorioId').val(),
				"certidaoCasamentoMunicipioCartorioId": $('#certidaoCasamentoMunicipioCartorioId').val(),
				"pessoaId": 2,
				tipoIngressoId: null,
				senha: "teste"
			},
			professorDTO: {
				"pessoaId": 2,
				"contaId": contaId,
				"codigoInep": $("#codigoInep").val() === '' ? null : $("#codigoInep").val(),
				"matricula": $("#matricula").val(),
				"usuario": $("#usuario").val(),
				"senha": $("#senha").val(),
				"emailInstitucional": $("#emailInstucional").val(),
				"dataContratacao": $("#dataContratacao").val(),
				"dataDemissao": $("#dataDemissao").val()
			}

		}


		console.log(dadosFormulario)


		$.ajax({
			url: url_base + "/professores/pessoa-professor",
			type: "POST",
			data: JSON.stringify(dadosFormulario),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(e);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			},
		}).done(function(data) {
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			}).then(()=> {
				window.location.href = "professores";
			});
			
		});

	}

});






$('#certidaoCasamentoUfCartorioId').change(() => {
	$("#certidaoCasamentoMunicipioCartorioId").attr("disabled", false)
	$("#certidaoCasamentoMunicipioCartorioId").empty()
	$("#certidaoCasamentoMunicipioCartorioId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#certidaoCasamentoUfCartorioId').val(),
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#certidaoCasamentoMunicipioCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});


	})
})


$('#certidaoNascimentoUfCartorioId').change(() => {
	$("#certidaoNascimentoMunicipioCartorioId").attr("disabled", false)
	$("#certidaoNascimentoMunicipioCartorioId").empty()
	$("#certidaoNascimentoMunicipioCartorioId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#certidaoNascimentoUfCartorioId').val(),
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#certidaoNascimentoMunicipioCartorioId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});


	})
})


$('input[name="qualPreencher"]').click(function() {
	if ($(this).is(':checked')) {
		$("#certidaoNascimento").show();
		$("#certidaoCasamento").hide();

		$("input[name='certidaoCasamentoNumero']").attr("required", false);
		$("input[name='certidaoCasamentoCartorio']").attr("required", false);
		$("select[name='certidaoCasamentoUfCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("select[name='certidaoCasamentoCidadeCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoCasamentoFolha']").attr("required", false);
		$("input[name='certidaoCasamentoLivro']").attr("required", false);
		$("input[name='certidaoCasamentoOrdem']").attr("required", false);
		$("input[name='certidaoCasamentoDataEmissao']").attr("required", false);
	} else {
		$("#certidaoNascimento").hide();
		$("#certidaoCasamento").show();

		$("input[name='certidaoNascimentoNumero']").attr("required", false);
		$("select[name='certidaoNascimentoMunicipioCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoCartorio']").attr("required", false);
		$("select[name='certidaoNascimentoUfCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoDataEmissao']").attr("required", false);
		$("input[name='certidaoNascimentoFolha']").attr("required", false);
		$("input[name='certidaoNascimentoLivro']").attr("required", false);
		$("input[name='certidaoNascimentoOrdem']").attr("required", false);
	}
});

$('#ufNascimentoId').change(() => {
	$("#municipioNascimentoId").attr("disabled", false)
	$("#municipioNascimentoId").empty()
	$("#municipioNascimentoId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#ufNascimentoId').val(),
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#municipioNascimentoId').append($('<option>', {
				value: item.idMunicipio,
				text: item.nomeMunicipio,
				name: item.nomeMunicipio
			}));
		});


	})
})



$('#paisNascimentoId').change(() => {
	if ($('#paisNascimentoId').val() != 31) {

		$('#ufNascimentoId').val(28).trigger('change')
		$("#municipioNascimentoId").val(5571).trigger('change')
		$("#ufNascimentoId").attr("disabled", "disabled");
		$("#municipioNascimentoId").attr("disabled", "disabled");
	} else {
		$("#ufNascimentoId").removeAttr("disabled");
		$("#municipioNascimentoId").removeAttr("disabled");
	}
})

function ValidarCpf() {
	const cpf = $('#cpf');



	$.ajax({
		url: url_base + '/pessoas/cpf/' + cpf.val().replace(/[^a-zA-Z0-9 ]/g, ""),
		type: "get",
		async: false,
		error: function(e) {

			const message = $("<p id='errMessage'></p>").text("CPF Inválido").css('color', '#FF0000');
			if (cpfValido(cpf.val())) {
				$("#btn-submit").removeAttr('disabled');
				cpf.removeClass('err-message');
				$('#errMessage').css('display', 'none');
			} else {
				if ($("#cardCpf").find('#errMessage').length > 0) {
					$('#errMessage').remove();
				}
				$("#btn-submit").attr("disabled", "disabled");
				cpf.addClass('err-message');
				$("#cardCpf").append(message);
				message.show();
			}
			console.log(e);


		},
	}).done(function(data) {
		const message = $("<p id='errMessage'></p>").text("CPF já cadastrado").css('color', '#FF0000');
		/*	$("#btn-submit").removeAttr('disabled');
			cpf.removeClass('err-message');
			$('#errMessage').css('display', 'none');*/

		/*if ($("#cardCpf").find('#errMessage').length > 0) {
			$('#errMessage').remove();
		}*/

		if ($("#cardCpf").find('#errMessage').length > 0) {
			$('#errMessage').remove();
			$("#btn-submit").attr("disabled", "disabled");
			cpf.addClass('err-message');
			$("#cardCpf").append(message);
			message.show();
		} else {
			$("#btn-submit").attr("disabled", "disabled");
			cpf.addClass('err-message');
			$("#cardCpf").append(message);
			message.show();
		}



		/*console.log(data)
	
		if (data.certidaoNascimentoNumero !== null &&
			data.certidaoNascimentoDataEmissao !== null &&
			data.certidaoNascimentoFolha !== null &&
			data.certidaoNascimentoLivro !== null &&
			data.certidaoNascimentoOrdem !== null) {
	
			$('input[id="qualPreencher"]').attr('checked', true);
	
			$("#certidaoCasamento").hide();
			$("#certidaoNascimento").show();
	
			$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
			$('#certidaoNascimentoCartorio').val(data.certidaoNascimentoCartorio);
			$('#certidaoNascimentoUfCartorioId').val(data.certidaoNascimentoMunicipioCartorio != null ? data.certidaoNascimentoMunicipioCartorio.ufId : "").trigger('change');
			$('#certidaoNascimentoMunicipioCartorioId').val(data.certidaoNascimentoMunicipioCartorio != null ? data.certidaoNascimentoMunicipioCartorio.idMunicipio : "").trigger('change');
			$('#certidaoNascimentoMunicipioCartorioId').removeAttr("disabled");
			$('#certidaoNascimentoDataEmissao').val(data.certidaoNascimentoDataEmissao);
			$('#certidaoNascimentoFolha').val(data.certidaoNascimentoFolha);
			$('#certidaoNascimentoLivro').val(data.certidaoNascimentoLivro);
			$('#certidaoNascimentoOrdem').val(data.certidaoNascimentoOrdem);
	
			// Restante do código...
		} else if (data.certidaoCasamentoCartorio !== null &&
			data.certidaoCasamentoMunicipioCartorio !== null &&
			data.certidaoCasamentoDataEmissao !== null &&
			data.certidaoCasamentoFolha !== null &&
			data.certidaoCasamentoLivro !== null &&
			data.certidaoCasamentoOrdem !== null) {
	
			$('input[id="qualPreencher"]').attr('checked', false);
			$("#certidaoNascimento").hide();
			$("#certidaoCasamento").show();
	
			$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);
			$('#certidaoCasamentoCartorio').val(data.certidaoCasamentoCartorio);
			$('#certidaoCasamentoUfCartorioId').val(data.certidaoCasamentoMunicipioCartorio.ufId).trigger('change');
			$('#certidaoCasamentoCidadeCartorioId').val(data.certidaoCasamentoMunicipioCartorio.idMunicipio).trigger('change');
			$('#certidaoCasamentoCidadeCartorioId').removeAttr("disabled");
			$('#certidaoCasamentoDataEmissao').val(data.certidaoCasamentoDataEmissao);
			$('#certidaoCasamentoOrdem').val(data.certidaoCasamentoOrdem);
			$('#certidaoCasamentoFolha').val(data.certidaoCasamentoFolha);
			$('#certidaoCasamentoLivro').val(data.certidaoCasamentoLivro);
	
			// Restante do código...
		}
	
		// Preenchendo outros campos de select
		$('#racaId').val(data.raca.idRaca).trigger('change');
		$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade).trigger('change');
		$('#paisNascimentoId').val(data.paisNascimento.idPais).trigger('change');
		$('#paisResidenciaId').val(data.paisResidencia.idPais).trigger('change');
		$('#ufNascimentoId').val(data.municipioNascimento.ufId).trigger('change');
		$('#municipioNascimentoId').val(data.municipioNascimento.idMunicipio).trigger('change');
		$('#rgUfEmissorId').val(data.rgUfEmissor !== null ? data.rgUfEmissor.idUf : "").trigger('change');
	
		// Preenchendo campos de input
		$('#nomeCompleto').val(data.nomeCompleto);
		$('#cpf').val(data.cpf !== null ? data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") : "");
		$('#rgNumero').val(data.rgNumero !== null ? data.rgNumero.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4") : "");
		$('#rgOrgaoExpedidor').val(data.rgOrgaoExpedidor);
		$('#rgDataExpedicao').val(data.rgDataExpedicao);
		$('#dtNascimento').val(data.dtNascimento);
		$('#sexo_' + data.sexo).prop('checked', true);
		$('#estadoCivil_' + data.estadoCivil).prop('checked', true);
		$('#telefone').val(data.telefone);
		$('#celular').val(data.celular);
		$('#email').val(data.email);
		$('#empresa').val(data.empresa);
		$('#ocupacao').val(data.ocupacao);
		$('#telefoneComercial').val(data.telefoneComercial);*/

		// Restante do código...
	});

	// Validação do CPF

}



function cpfValido(cpf) {
	cpf = cpf.replace(/[^\d]+/g, '');

	if (cpf.length != 11)
		return false;

	var soma = 0;
	var resto;
	for (var i = 1; i <= 9; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
	}
	resto = (soma * 10) % 11;

	if ((resto == 10) || (resto == 11)) {
		resto = 0;
	}

	if (resto != parseInt(cpf.substring(9, 10))) {
		return false;
	}

	soma = 0;
	for (var i = 1; i <= 10; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
	}
	resto = (soma * 10) % 11;

	if ((resto == 10) || (resto == 11)) {
		resto = 0;
	}

	if (resto != parseInt(cpf.substring(10, 11))) {
		return false;
	}

	return true;
}

$("#cpf").blur(function() {
	if ($("#cpf").val() !== '')
		ValidarCpf()
});


$("#usuario").blur(() => {

	const usuario = $("#usuario")
	$.ajax({
		url: url_base + '/professores/verificar-usuario?usuario=' + usuario.val(),
		type: "get"
	}).done(function(data) {
		const messageUsuario = $("<p id='errMessageUsuario'></p>").text("Usuário já utilizado").css('color', '#FF0000');
		if (data.data.length != 0) {
			if ($("#cardMatricula").find('#errMessageUsuario').length > 0) {
				$('#errMessageUsuario').remove()
			}
			$("#btn-submit").attr("disabled", "disabled");
			usuario.addClass('err-message')
			$("#cardUsuario").append(messageUsuario)
			messageUsuario.show()
		} else {
			$("#btn-submit").removeAttr('disabled');
			usuario.removeClass('err-message')
			$('#errMessageUsuario').css('display', 'none')


		}
	});
})


$("#matricula").blur(() => {

	const matricula = $("#matricula")
	$.ajax({
		url: url_base + '/professores/verificar-matricula?matricula=' + matricula.val(),
		type: "get",
	}).done(function(data) {
		if (data.data.length != 0) {
			const messageEmail = $("<p id='errMessageMatricula'></p>").text("Matrícula já utilizada").css('color', '#FF0000');
			if ($("#cardMatricula").find('#errMessageMatricula').length > 0) {
				$('#errMessageMatricula').remove()
			}
			$("#btn-submit").attr("disabled", "disabled");
			matricula.addClass('err-message')
			$("#cardMatricula").append(messageEmail)
			messageEmail.show()
		} else {
			$("#btn-submit").removeAttr('disabled');
			matricula.removeClass('err-message')
			$('#errMessageMatricula').css('display', 'none')


		}
	});
})


$(".reveal").on('click', function() {
	let pwd = $(this).siblings("input");
	let icon = $(this).find("i");
	if (pwd.attr('type') === 'password') {
		pwd.attr('type', 'text');
		icon.removeClass("fa-eye").addClass("fa-eye-slash");
	} else {
		pwd.attr('type', 'password');
		icon.removeClass("fa-eye-slash").addClass("fa-eye");
	}
});

$(".reveal-pwd").on('click', function() {
	let pwd = $(this).siblings("input");
	let icon = $(this).find("i");
	if (pwd.attr('type') === 'password') {
		pwd.attr('type', 'text');
		icon.removeClass("fa-eye").addClass("fa-eye-slash");
	} else {
		pwd.attr('type', 'password');
		icon.removeClass("fa-eye-slash").addClass("fa-eye");
	}
});
