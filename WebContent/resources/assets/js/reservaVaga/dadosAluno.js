const contaId = localStorage.getItem('contaId')
const idCandidato = sessionStorage.getItem('idCandidato')
let id = getSearchParams("id");
const candidatoId = getSearchParams("idCandidato");
var idPessoa = 0
var numeroCandidato = 0
var ofertaConcursoId = 0
var aprovado = ""
var usuarioAprovacaoId = 0
var classificacao = ""
var motivoReprovacaoId = 0


$(document).ready(function() {

	var tamanhoBody = $("body").width()

	if (tamanhoBody < 768) {
		$("#qualPreencher").show()
		$("#qualPreencherSwitch").hide()
	} else {
		$("#qualPreencher").hide()
		$("#qualPreencherSwitch").show()
	}

	$('select').select2();

	if ($('input[name="qualPreencher"]').is(':checked')) {
		$("#certidaoNascimento").show();
		$("#certidaoCasamento").hide();

		$("input[name='certidaoNascimentoNumero']").attr("required", true);
		$("select[name='certidaoNascimentoMunicipioCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("input[name='certidaoNascimentoCartorio']").attr("required", true);
		$("select[name='certidaoNascimentoUfCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("input[name='certidaoNascimentoDataEmissao']").attr("required", true);
		$("input[name='certidaoNascimentoFolha']").attr("required", true);
		$("input[name='certidaoNascimentoLivro']").attr("required", true);
		$("input[name='certidaoNascimentoOrdem']").attr("required", true);

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

		$("input[name='certidaoCasamentoNumero']").attr("required", true);
		$("input[name='certidaoCasamentoCartorio']").attr("required", true);
		$("select[name='certidaoCasamentoUfCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("select[name='certidaoCasamentoCidadeCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("input[name='certidaoCasamentoFolha']").attr("required", true);
		$("input[name='certidaoCasamentoLivro']").attr("required", true);
		$("input[name='certidaoCasamentoOrdem']").attr("required", true);
		$("input[name='certidaoCasamentoDataEmissao']").attr("required", true);

		$("input[name='certidaoNascimentoNumero']").attr("required", false);
		$("select[name='certidaoNascimentoMunicipioCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoCartorio']").attr("required", false);
		$("select[name='certidaoNascimentoUfCartorioId']").attr("required", false).select2(); // Remove required e inicializa select2
		$("input[name='certidaoNascimentoDataEmissao']").attr("required", false);
		$("input[name='certidaoNascimentoFolha']").attr("required", false);
		$("input[name='certidaoNascimentoLivro']").attr("required", false);
		$("input[name='certidaoNascimentoOrdem']").attr("required", false);
	}








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

	if (candidatoId != undefined) {
		carregarDados(candidatoId)
	} else {
		carregarDados(id)
	}

	// Função para capturar os dados do formulário ao ser submetido
	$('#formSubmit').submit(function(event) {

		event.preventDefault();

		let cpf = $('#cpf').val().replace(/[^\d]+/g, '')

		if (cpf == "") {
			var dadosFormulario = {
				pessoaDTO: {
					contaId: contaId,
					nomeCompleto: $('#nomeCompleto').val(),
					nomeMae: $('#nomeMae').val(),
					nomePai: $('#nomePai').val(),
					sexo: $('input[name="sexo"]:checked').val(),
					dtNascimento: $('#dtNascimento').val(),
					cpf: null,
					racaId: $('#racaId').val(),
					paisNascimentoId: $('#paisNascimentoId').val(),
					ufNascimentoId: $('#ufNascimentoId').val(),
					municipioNascimentoId: $('#municipioNascimentoId').val(),
					nacionalidadeId: $('#nacionalidadeId').val(),
					"nacionalidade": $('#nacionalidadeId').find(":selected").text().substring(0, 3),
					estadoCivil: $('input[name="estadoCivil"]:checked').val(),
					rgNumero: $('#rgNumero').val().replace(/[^\d]+/g, ''),
					rgDataExpedicao: $('#rgDataExpedicao').val(),
					rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
					rgUfEmissorId: $('#rgUfEmissorId').val(),
					certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
					certidaoNascimentoCidadeCartorio: $('#certidaoNascimentoCidadeCartorio').val(),
					certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
					certidaoNascimentoUfCartorioId: $('#certidaoNascimentoUfCartorioId').val(),
					certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
					certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
					certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
					certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
					certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
					certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
					certidaoCasamentoUfCartorioId: $('#certidaoCasamentoUfCartorioId').val(),
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
					"certidaoCasamentoMunicipioCartorioId": $('#certidaoCasamentoCidadeCartorioId').val()
				},
				candidatoDTO: {
					contaId: contaId,
					"pessoaId": 2,
					"candidato": parseInt(Math.random() * 100000),
					"ofertaConcursoId": null,
					"tipoIngressoId": $('#tipoIngressoId').val(),
					"classificacao": null,
					"aluno": null,
					"aprovado": null,
					"usuarioAprovacaoId": null
				}


			};

		} else {
			var dadosFormulario = {
				pessoaDTO: {
					contaId: contaId,
					nomeCompleto: $('#nomeCompleto').val(),
					nomeMae: $('#nomeMae').val(),
					nomePai: $('#nomePai').val(),
					sexo: $('input[name="sexo"]:checked').val(),
					dtNascimento: $('#dtNascimento').val(),
					cpf: cpf,
					racaId: $('#racaId').val(),
					paisNascimentoId: $('#paisNascimentoId').val(),
					ufNascimentoId: $('#ufNascimentoId').val(),
					municipioNascimentoId: $('#municipioNascimentoId').val(),
					nacionalidadeId: $('#nacionalidadeId').val(),
					"nacionalidade": $('#nacionalidadeId').find(":selected").text().substring(0, 3),
					estadoCivil: $('input[name="estadoCivil"]:checked').val(),
					rgNumero: $('#rgNumero').val().replace(/[^\d]+/g, ''),
					rgDataExpedicao: $('#rgDataExpedicao').val(),
					rgOrgaoExpedidor: $('#rgOrgaoExpedidor').val(),
					rgUfEmissorId: $('#rgUfEmissorId').val(),
					certidaoNascimentoNumero: $('#certidaoNascimentoNumero').val(),
					certidaoNascimentoCidadeCartorio: $('#certidaoNascimentoCidadeCartorio').val(),
					certidaoNascimentoCartorio: $('#certidaoNascimentoCartorio').val(),
					certidaoNascimentoUfCartorioId: $('#certidaoNascimentoUfCartorioId').val(),
					certidaoNascimentoDataEmissao: $('#certidaoNascimentoDataEmissao').val(),
					certidaoNascimentoFolha: $('#certidaoNascimentoFolha').val(),
					certidaoNascimentoLivro: $('#certidaoNascimentoLivro').val(),
					certidaoNascimentoOrdem: $('#certidaoNascimentoOrdem').val(),
					certidaoCasamentoNumero: $('#certidaoCasamentoNumero').val(),
					certidaoCasamentoCartorio: $('#certidaoCasamentoCartorio').val(),
					certidaoCasamentoUfCartorioId: $('#certidaoCasamentoUfCartorioId').val(),
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
					"certidaoCasamentoMunicipioCartorioId": $('#certidaoCasamentoCidadeCartorioId').val()
				},
				candidatoDTO: {
					contaId: contaId,
					"pessoaId": 2,
					"candidato": parseInt(Math.random() * 100000),
					"ofertaConcursoId": null,
					"tipoIngressoId": $('#tipoIngressoId').val(),
					"classificacao": null,
					"aluno": null,
					"aprovado": null,
					"usuarioAprovacaoId": null
				}

			};

		}

		console.log(cpf)


		// Aqui você pode acessar os valores dos campos de input usando jQuery

		// Aqui você pode enviar o objeto formData para onde for necessário, como uma requisição AJAX
		// Exemplo:

		/*$.ajax({
			url: url_base + '/pessoas',
			type: "POST",
			data: JSON.stringify(dadosFormulario),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading()
			},
			error: function(e) {
				Swal.close()
				console.log(e)
				console.log(e.responseJSON)
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			}
		}).done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
			
		});*/


		if (id != undefined || candidatoId != undefined) {
			dadosFormulario.candidatoDTO.idCandidato = candidatoId
			dadosFormulario.candidatoDTO.pessoaId = idPessoa
			dadosFormulario.pessoaDTO.idPessoa = idPessoa
			dadosFormulario.candidatoDTO.aprovado = aprovado
			if(aprovado === "N"){
				dadosFormulario.candidatoDTO.motivoReprovacaoCandidatoId = motivoReprovacaoId
			}
			
			dadosFormulario.candidatoDTO.candidato = Number(numeroCandidato)
			dadosFormulario.candidatoDTO.ofertaConcursoId = ofertaConcursoId
			dadosFormulario.candidatoDTO.usuarioAprovacaoId = usuarioAprovacaoId
			dadosFormulario.candidatoDTO.classificacao = classificacao
			dadosFormulario.candidatoDTO.motivoReprovacaoId = 

			localStorage.setItem('jsonAluno', JSON.stringify(dadosFormulario))
			localStorage.setItem('numeroReserva', dadosFormulario.candidatoDTO.candidato)

			if (candidatoId != undefined) {
				window.location.href = "endereco-aluno?idCandidato=" + candidatoId;
			} else {
				window.location.href = "endereco-aluno?id=" + id;
			}
		} else {
			localStorage.setItem('jsonAluno', JSON.stringify(dadosFormulario))
			localStorage.setItem('numeroReserva', dadosFormulario.candidatoDTO.candidato)
			window.location.href = "endereco-aluno";
		}

	});
})


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
    if ($("#paisNascimentoId").val() != '31') {
        $("#ufNascimentoId").val(28).trigger('change').prop("disabled", true);
        $("#municipioNascimentoId").val(5571).trigger('change').prop("disabled", true);
    } else {
        $("#ufNascimentoId").prop("disabled", false).trigger('change');
        $("#municipioNascimentoId").prop("disabled", false).trigger('change');
    }
});




function carregarDados(id) {

	$(".bg-loading").fadeIn();

	if (id != undefined) {


		$('#municipioNascimentoId').attr('disabled', false)
		$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)
		$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', false)

		$.ajax({
			url: url_base + '/candidatos/' + id,
			type: "get",
			async: false,
		}).done(function(data) {

			$("#tipoIngressoId").val(data.tipoIngresso.idTipoIngresso)
			

			numeroCandidato = data.candidato
			idPessoa = data.pessoa
			idCandidadto = data.idCandidato
			aprovado = data.aprovado
			ofertaConcursoId = data.ofertaConcursoId
			usuarioAprovacaoId = data.usuarioAprovacao
			classificacao = data.classificacao
			if(aprovado === "N"){
				motivoReprovacaoId = data.motivoReprovacaoCandidato.idMotivoReprovacaoCandidato
			}
			

			$.ajax({
				url: url_base + '/pessoas/' + data.pessoa,
				type: "get",
				async: false,
			}).done(function(data) {
				
				console.log(data)
				// Verificar se os dados de certidão de nascimento estão preenchidos
				if (data.certidaoNascimentoNumero !== null &&
					data.certidaoNascimentoDataEmissao !== null &&
					data.certidaoNascimentoFolha !== null &&
					data.certidaoNascimentoLivro !== null &&
					data.certidaoNascimentoOrdem !== null ) {

					$('input[id="qualPreencher"]').attr('checked', true)

					$("#certidaoCasamento").hide()
					$("#certidaoNascimento").show()


					$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
					$('#certidaoNascimentoCartorio').val(data.certidaoNascimentoCartorio);
					$('#certidaoNascimentoUfCartorioId').val(data.certidaoNascimentoMunicipioCartorio != null ? data.certidaoNascimentoMunicipioCartorio.ufId : "")
					$('#certidaoNascimentoMunicipioCartorioId').val( data.certidaoNascimentoMunicipioCartorio != null ? data.certidaoNascimentoMunicipioCartorio.idMunicipio : "");
					$('#certidaoNascimentoMunicipioCartorioId').removeAttr("disabled")
					$('#certidaoNascimentoDataEmissao').val(data.certidaoNascimentoDataEmissao);
					$('#certidaoNascimentoFolha').val(data.certidaoNascimentoFolha);
					$('#certidaoNascimentoLivro').val(data.certidaoNascimentoLivro);
					$('#certidaoNascimentoOrdem').val(data.certidaoNascimentoOrdem);

					$("[name='certidaoCasamentoNumero']").attr("required", false);
					$("[name='certidaoCasamentoCartorio']").attr("required", false);
					$("[name='certidaoCasamentoUfCartorioId']").attr("required", false);
					$("[name='certidaoCasamentoCidadeCartorio']").attr("required", false);
					$("[name='certidaoCasamentoFolha']").attr("required", false);
					$("[name='certidaoCasamentoLivro']").attr("required", false);
					$("[name='certidaoCasamentoOrdem']").attr("required", false);
					$("[name='certidaoCasamentoDataEmissao']").attr("required", false);
				} else if (data.certidaoCasamentoCartorio !== null &&
					data.certidaoCasamentoMunicipioCartorio !== null &&
					data.certidaoCasamentoDataEmissao !== null &&
					data.certidaoCasamentoFolha !== null &&
					data.certidaoCasamentoLivro !== null &&
					data.certidaoCasamentoOrdem !== null ) {
					// Verificar se os dados de certidão de casamento estão preenchidos
					$('input[id="qualPreencher"]').attr('checked', false)
					$("#certidaoNascimento").hide()
					$("#certidaoCasamento").show()
					$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);
					$('#certidaoCasamentoCartorio').val(data.certidaoCasamentoCartorio);
					$('#certidaoCasamentoUfCartorioId').val(data.certidaoCasamentoMunicipioCartorio.ufId);
					$('#certidaoCasamentoCidadeCartorioId').val(data.certidaoCasamentoMunicipioCartorio.idMunicipio);
					$('#certidaoCasamentoCidadeCartorioId').removeAttr("disabled")
					$('#certidaoCasamentoDataEmissao').val(data.certidaoCasamentoDataEmissao);
					$('#certidaoCasamentoOrdem').val(data.certidaoCasamentoOrdem);
					$('#certidaoCasamentoFolha').val(data.certidaoCasamentoFolha);
					$('#certidaoCasamentoLivro').val(data.certidaoCasamentoLivro);

					$("[name='certidaoNascimentoNumero']").attr("required", false);
					$("[name='certidaoNascimentoCidadeCartorio']").attr("required", false);
					$("[name='certidaoNascimentoCartorio']").attr("required", false);
					$("[name='certidaoNascimentoUfCartorioId']").attr("required", false);
					$("[name='certidaoNascimentoDataEmissao']").attr("required", false);
					$("[name='certidaoNascimentoFolha']").attr("required", false);
					$("[name='certidaoNascimentoLivro']").attr("required", false);
					$("[name='certidaoNascimentoOrdem']").attr("required", false);

				}
				// Preenchendo campos de input
				$('#nomeCompleto').val(data.nomeCompleto);
				$('#nomeMae').val(data.nomeMae);
				$('#nomePai').val(data.nomePai);
				$('#nomeSocial').val(data.nomeSocial);
				$('#cpf').val(data.cpf !== null ? data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") : "");
				$('#rgNumero').val(data.rgNumero !== null ? data.rgNumero.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4") : "");
				$('#rgOrgaoExpedidor').val(data.rgOrgaoExpedidor);
				$('#rgDataExpedicao').val(data.rgDataExpedicao);
				$('#dtNascimento').val(data.dtNascimento);
				$('#sexo_' + data.sexo).prop('checked', true); // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
				$('#sexo_' + data.estadoCivil).prop('checked', true); // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
				$('#cep').val(data.cep);
				$('#endereco').val(data.endereco);
				$('#numero').val(data.numero);
				$('#complemento').val(data.complemento);
				$('#bairro').val(data.bairro);
				$('#municipio').val(data.municipio);
				$('#distrito').val(data.distrito);
				$('#uf').val(data.uf);
				$('#telefone').val(data.telefone);
				$('#celular').val(data.celular);
				$('#email').val(data.email);
				$('#empresa').val(data.empresa);
				$('#ocupacao').val(data.ocupacao);
				$('#telefoneComercial').val(data.telefoneComercial);



				// Preenchendo campos de select (exemplo com raca, nacionalidade, paisNascimento, paisResidencia)
				$('#racaId').val(data.raca.idRaca);
				$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade);
				$('#paisNascimentoId').val(data.paisNascimento.idPais);
				$('#paisResidenciaId').val(data.paisResidencia.idPais);
				$('#relacionamentoId').val(data.idPapelPessoa);
				
				/*	$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade).attr("selected", true);;
					$('#paisNascimentoId').val(data.paisNascimento.idPais).attr("selected", true);;
					$('#paisResidenciaId').val(data.paisResidencia.idPais).attr("selected", true);;
					$('#ufNascimentoId').val(data.municipioNascimento.ufId).attr("selected", true);*/



				// Exemplo de preenchimento para campos específicos como certidaoNascimentoNumero, certidaoCasamentoNumero, etc.
				$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
				$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);

				// Aqui você pode adicionar os demais campos conforme necessário
				// Exemplo para preenchimento de campo select com município de nascimento
				$('#municipioNascimentoId').val(data.municipioNascimento.idMunicipio);
				$('#ufNascimentoId').val(data.municipioNascimento.ufId);
				$('#rgUfEmissorId').val(data.rgUfEmissor !== null ? data.rgUfEmissor.idUf : "");

				// Exemplo para estado civil usando radio button
				$('input[name="estadoCivil"][value="' + data.estadoCivil + '"]').prop('checked', true); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'



			})
		})

	}
	$(".bg-loading").addClass("none");
	$(".bg-loading").fadeOut()

}


$('#certidaoCasamentoUfCartorioId').change(() => {
	$("#certidaoCasamentoCidadeCartorioId").attr("disabled", false)
	$("#certidaoCasamentoCidadeCartorioId").empty()
	$("#certidaoCasamentoCidadeCartorioId").append("<option selected disabled>Selecione uma opção</option>")
	$.ajax({
		url: url_base + '/municipio/uf/' + $('#certidaoCasamentoUfCartorioId').val(),
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#certidaoCasamentoCidadeCartorioId').append($('<option>', {
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



$('input[name="isRne"]').click(function() {
	if ($(this).is(':checked')) {
		$("#rneSec").show();
	} else {
		$("#rneSec").hide();
	}
});


$('input[name="qualPreencher"]').click(function() {
	if ($(this).is(':checked')) {
		$("#certidaoNascimento").show();
		$("#certidaoCasamento").hide();

		$("input[name='certidaoNascimentoNumero']").attr("required", true);
		$("select[name='certidaoNascimentoMunicipioCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("input[name='certidaoNascimentoCartorio']").attr("required", true);
		$("select[name='certidaoNascimentoUfCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("input[name='certidaoNascimentoDataEmissao']").attr("required", true);
		$("input[name='certidaoNascimentoFolha']").attr("required", true);
		$("input[name='certidaoNascimentoLivro']").attr("required", true);
		$("input[name='certidaoNascimentoOrdem']").attr("required", true);

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

		$("input[name='certidaoCasamentoNumero']").attr("required", true);
		$("input[name='certidaoCasamentoCartorio']").attr("required", true);
		$("select[name='certidaoCasamentoUfCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("select[name='certidaoCasamentoCidadeCartorioId']").attr("required", true).select2(); // Adiciona required e inicializa select2
		$("input[name='certidaoCasamentoFolha']").attr("required", true);
		$("input[name='certidaoCasamentoLivro']").attr("required", true);
		$("input[name='certidaoCasamentoOrdem']").attr("required", true);
		$("input[name='certidaoCasamentoDataEmissao']").attr("required", true);

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




$("#nacionalidadeId").on("blur", () => {
	if ($('#nacionalidadeId').find(":selected").text() != "Brasileiro" && $('#nacionalidadeId').find(":selected").text() != "Selecione uma opção") {
		$("#rne").show()
	} else {
		$("#rne").hide()
	}
})

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

function ValidarCpf() {
	const cpf = $('#cpf');
	const message = $("<p id='errMessage'></p>").text("CPF Inválido").css('color', '#FF0000');
	if (cpfValido(cpf.val())) {
		$("#btn-submit").removeAttr('disabled');
		cpf.removeClass('err-message')
		$('#errMessage').css('display', 'none')
	} else {
		if ($("#cardCpf").find('#errMessage').length > 0) {
			$('#errMessage').remove()
		}
		$("#btn-submit").attr("disabled", "disabled");
		cpf.addClass('err-message')
		$("#cardCpf").append(message)
		message.show()
	}
}
$("#cpf").blur(function() {
	if(this.val() !== '')
		ValidarCpf()
	
});


//nomeBox: Mande o nome do id do elemento que envolve o input e label
//valorDataNascimento: mande o VALOR do input de data de nascimento
//valorComparado: mande o valor do input de data que tem que ser MAIOR que a data de nascimento
const validarDatas = (nomeBox, valorDataNascimento, idElementoComparado) => {
	const rgDataExpedicao = $(`#${idElementoComparado}`)
	const box = $(`#${nomeBox}`)
	const message = $(`<p id='errMessage${idElementoComparado}'></p>`).text("Data inferior a data de nascimento.").css('color', '#FF0000');
	const dtNasc = new Date(valorDataNascimento);
	const dataComparada = new Date(rgDataExpedicao.val());

	if (dataComparada > dtNasc) {
		$("#btn-submit").removeAttr('disabled');
		rgDataExpedicao.removeClass('err-message')
		$(`#errMessage${idElementoComparado}`).css('display', 'none')
	} else {
		if ($(`#${nomeBox}`).find(`#errMessage${idElementoComparado}`).length > 0) {
			$(`#errMessage${idElementoComparado}`).remove()
		}
		$("#btn-submit").attr("disabled", "disabled");
		rgDataExpedicao.addClass('err-message')
		$(`#${nomeBox}`).append(message)
		message.show()
	}
}
$("#rgDataExpedicao").blur(function() {
	const dtNasc = $('#dtNascimento').val()
	validarDatas('rgDataExpedicaoDiv', dtNasc, 'rgDataExpedicao')
});
$("#certidaoCasamentoDataEmissao").blur(function() {
	const dtNasc = $('#dtNascimento').val()
	validarDatas('certidaoCasamentoDataEmissaoDiv', dtNasc, 'certidaoCasamentoDataEmissao')
});
$("#certidaoNascimentoDataEmissao").blur(function() {
	const dtNasc = $('#dtNascimento').val()
	validarDatas('certidaoNascimentoDataEmissaoDiv', dtNasc, 'certidaoNascimentoDataEmissao')
});