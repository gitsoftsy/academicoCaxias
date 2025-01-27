const contaId = localStorage.getItem('contaId')
const escolaId = sessionStorage.getItem('escolaId')
let idCandidato = params.get("id");
let listaDocumentos = []
let idDoc = ''
let idPessoa = ''
let idResponsavel = ''
let idFichaMedica = ''
let nomeCandidato = ""
let ofertaConcurso = {}
let candidato = {}
let idOfertaConcurso


const getDadosOfertaConcurso = () => {
	$.ajax({
		url: url_base + "/cursos/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#cursoId').append($('<option>', {
				value: item.idCurso,
				text: `${item.nome} - ${item.codCurso}`,
				name: item.nome
			}));
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/situacoesAluno/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#situacaoAlunoId').append($('<option>', {
				value: item.idSituacaoAluno,
				text: item.situacaoAluno,
				name: item.situacaoAluno
			}));
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/turno/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#turnoId').append($('<option>', {
				value: item.idTurno,
				text: item.turno,
				name: item.turno
			}));
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + '/serie/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#serieId').append($('<option>', {
					value: item.idSerie,
					text: item.serie + " - " + item.descricao,
					name: item.serie
				}));
			}
		});
	})


	$.ajax({
		url: url_base + '/curriculo',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$('#curriculoId').append($('<option>', {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo
				}));
			}
		});
	})

	$.ajax({
		url: url_base + "/concursos/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#concursoId').append($('<option>', {
				value: item.idConcurso,
				text: item.concurso,
				name: item.concurso
			}));
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#escolaId').append($('<option>', {
				value: item.idEscola,
				text: item.nomeEscola,
				name: item.nomeEscola
			}));
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	});

}


const getOfertaConcurso = (idOferta) => {
	$.ajax({
		url: url_base + "/ofertasConcurso/" + idOferta,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e)
		}
	}).done(function(data) {
		console.log(data)
		ofertaConcurso = data
		$('#concursoId').val(data.concursoId)
		$('#cursoId').val(data.cursoId)
		$('#escolaId').val(data.escolaId)
		$('#turnoId').val(data.turnoId)
		$('#serieId').val(data.serieId)
		$('#descricaoOferta').val(data.descricaoOferta)
		$("#curriculoId").val(data.curriculoId)

	})
}

$(document).ready(function() {
	getDadosOfertaConcurso()

	var triggerTabList = [].slice.call(document.querySelectorAll('#nav-tab button'))
	triggerTabList.forEach(function(triggerEl) {
		var tabTrigger = new bootstrap.Tab(triggerEl)
		triggerEl.addEventListener('click', function(event) {
			event.preventDefault()
			tabTrigger.show()
		})
	})

	var buttonId;
	$('#nav-dados-aluno input, #nav-dados-aluno select').attr('disabled', true);
	$('#nav-responsavel input, #nav-responsavel select').attr('disabled', true);
	localStorage.setItem("idCandidato", idCandidato)
	$('#municipioNascimentoId').attr('disabled', true);

	$.ajax({
		url: url_base + "/motivoReprovacaoDocumento/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#motivoReprovacaoDocumentoId').append($('<option>', {
				value: item.idMotivoReprovacaoDocumento,
				text: item.motivoReprovacaoDocumento,
				name: item.motivoReprovacaoDocumento
			}));
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	});

	/*	getDocumentos()*/
	loadSelects()
	getDadosCandidato()
	/*getDadosResponsavel()*/


	$('#nav-dados-aluno input, #nav-dados-aluno select').attr('disabled', true);
	$('#nav-responsavel input, #nav-responsavel select').attr('disabled', true);
	$('#nav-disabled input, #nav-disabled select').attr('disabled', true);

	$.ajax({
		url: url_base + "/motivoReprovacaoCandidato/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#motivoReprovacaoCandidatoId').append($('<option>', {
				value: item.idMotivoReprovacaoCandidato,
				text: item.motivoReprovacaoCandidato,
				name: item.motivoReprovacaoCandidato
			}));

			$('#motivoReprovadoDocumentoId').append($('<option>', {
				value: item.idMotivoReprovacaoCandidato,
				text: item.motivoReprovacaoCandidato,
				name: item.motivoReprovacaoCandidato
			}));
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação imagens 2 AJAX:", textStatus, errorThrown);
	})

})

function formatarDataParaBR(data) {
	var dataObj = new Date(data);

	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();
	return dia + "/" + mes + "/" + ano;
}

const showFichaMedica = (ref) => {
	window.location.href = "reserva-ficha?idFichaMedica=" + idFichaMedica;
}

const showResponsavel = () => {
	window.location.href = "dadosResponsavel?idResponsavel=" + idResponsavel;
}

const aprovarCandidato = () => {
	if ($("#curriculoId").val() == null) {
		Swal.fire({
			title: "Oferta de Curso sem Currículo informado.",
			text: "Para realizar a aprovação do Candidato, altere a oferta e informe o Currículo.",
			icon: "error",
		}).then((data) => {
			window.location.href = 'nova-oferta-concurso?id=' + idOfertaConcurso
		})
	}
	const senhaAleatoria = gerarSenhaAleatoria();
	$(".senha").val(senhaAleatoria);
}



function gerarSenhaAleatoria(tamanho = 8) {
	const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let senha = "";
	for (let i = 0; i < tamanho; i++) {
		const randomIndex = Math.floor(Math.random() * caracteres.length);
		senha += caracteres[randomIndex];
	}
	return senha;
}

function validarObjeto(obj) {
	for (const [chave, valor] of Object.entries(obj)) {
		if (valor === null || valor === undefined) {
			console.error(`O campo "${chave}" está inválido (null ou undefined).`);
			return false;
		}
	}
	return true;
}

$('#gerarAluno').click((event) => {
	event.preventDefault()
	const objeto = {
		"contaId": contaId,
		"cursoId": $('#cursoId').val(),
		"escolaId": $('#escolaId').val(),
		"serieId": $('#serieId').val(),
		"turnoId": $('#turnoId').val(),
		"pessoaId": candidato.pessoa,
		"candidatoId": candidato.idCandidato,
		"situacaoAlunoId": $('#situacaoAlunoId').val(),
		"aluno": $('#aluno').val(),
		"emailInterno": $('#emailInterno').val(),
		"senha": $('#senha').val(),
		"geraPrematricula": $('#geraMatricula:checked').val() != 'on' ? "N" : "S",
		"tipoMatriculaId": $('#geraMatricula:checked').val() != 'on' ? null : Number($("#tipoMatriculaId").val()),
		"curriculoId": $("#curriculoId").val()
	}

	if (!validarObjeto(objeto)) {
		Swal.fire({
			icon: "info",
			title: "Campos inválidos",
			text: "Preencha todos os campos!"

		});
		return
	}

	console.log(objeto)

	$.ajax({
		url: url_base + "/alunos/",
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível cadastrar o aluno!"

			});
		}
	}).done(function(response) {
		console.log(response)

		$.ajax({
			url: url_base + "/candidatos/" + Number(idCandidato) + '/aprovar',
			type: "put",
			contentType: "application/json; charset=utf-8",
			async: false,
			error: function(e) {
				console.log(e)
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!"

				});
			}
		}).done(function(data) {

			$('#aluno').val('')
			$('#emailInterno').val('')
			$('#senha').val('')
			Swal.fire({
				title: "Aprovado!",
				text: "Aluno criado com sucesso",
				icon: "success",
			}).then(result => {
				window.location.href = 'consulta-aluno?id=' + response.idAluno
			})
		})
	})
})

/*$('#mtMatricula').change(() => {
	if ($('#mtMatricula:checked').val() == 'on') {
		$('#divMatricula').hide()
	} else {
		$('#divMatricula').show()
	}

})*/

/*$('#geraMatricula').change(() => {
	if ($('#geraMatricula:checked').val() == 'on') {
		$('.divTipoMatricula').show()
	} else {
		$('.divTipoMatricula').hide()
	}

})*/

const reprovarCandidato = () => {
	Swal.fire({
		title: "Deseja mesmo reprovar esse candidato?",
		icon: "question",
		showCancelButton: true,
		showConfirmButton: false,
		showDenyButton: true,
		denyButtonText: 'Reprovar',
		cancelButtonText: 'Cancelar'
	}).then(result => {
		if (result.isDenied) {
			$.ajax({
				url: url_base + "/candidatos/" + Number(idCandidato) + '/reprovar',
				type: "put",
				contentType: "application/json; charset=utf-8",
				async: false,
				error: function(e) {
					console.log(e)
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível realizar esse comando!"

					});
				}
			}).done(function(data) {
				Swal.fire({
					title: "Reprovado com sucesso",
					icon: "success",
				}).then((data) => {
					window.location.href = 'reservas'
				})
			})
		} else if (result.isCanceled) { }
	})
}

const loadSelects = () => {
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
		url: url_base + '/tiposMatricula/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {

			$('#tipoMatriculaId').append($('<option>', {
				value: item.idTipoMatricula,
				text: item.tipoMatricula,
				name: item.tipoMatricula
			}));

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
}

const getDadosCandidato = () => {
	$.ajax({
		url: url_base + "/candidatos/" + idCandidato,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!"

			});
		}
	}).done(function(response) {
		idPessoa = response.pessoa
		candidato = response
		console.log(idPessoa)
		idOfertaConcurso = response.ofertaConcursoId
		getOfertaConcurso(response.ofertaConcursoId)

		if (response.aprovado == 'S') {
			$("#containerAprovacao").removeAttr("hidden")
			$('#aprovarCandidato').hide()
			$("#containerReprovacao").hide()
			$('#reprovarCandidato').css('display', 'flex')
			$('#reprovarCandidato').css('gap', '0.5rem')
			$('#reprovarCandidato').css('align-items', 'center')
		} else if (response.aprovado == 'N') {
			$('#reprovarCandidato').hide()
			$("#containerReprovacao").removeAttr("hidden")
			$("#motivoReprovadoDocumentoId").val(response.motivoReprovacaoCandidato.idMotivoReprovacaoCandidato)
			$("#obsAprovacaoReprovado").val(response.motivoReprovacaoCandidato.motivoReprovacaoCandidato)
			$('#aprovarCandidato').css('display', 'flex')
			$('#aprovarCandidato').css('gap', '0.5rem')
			$('#aprovarCandidato').css('align-items', 'center')
		} else {
			$('#aprovarCandidato').css('display', 'flex')
			$('#aprovarCandidato').css('gap', '0.5rem')
			$('#aprovarCandidato').css('align-items', 'center')
			$('#reprovarCandidato').css('display', 'flex')
			$('#reprovarCandidato').css('gap', '0.5rem')
			$('#reprovarCandidato').css('align-items', 'center')
		}


		$.ajax({
			url: url_base + '/pessoas/' + idPessoa,
			type: "get",
			async: false,
			error: function(e) {
				console.log(e)
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!"

				});
			}
		}).done(function(data) {

			console.log(data)
			nomeCandidato = data.nomeCompleto

			var cpfCandidato = data.cpf
				? data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
				: '';



			let numRg = data.rgNumero

			// Preenchendo campos de input
			$('#nomeCompleto').val(data.nomeCompleto);
			$('#nomeMae').val(data.nomeMae);
			$('#nomePai').val(data.nomePai);
			$('#nomeSocial').val(data.nomeSocial);
			$('#cpf').val(cpfCandidato);
			$('#rgNumero').val(
				numRg != null
					? numRg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4")
					: ''
			);
			$('#rgOrgaoExpedidor').val(data.rgOrgaoExpedidor);
			$('#rgDataExpedicao').val(data.rgDataExpedicao);
			$('#dtNascimento').val(data.dtNascimento);
			$('#tipoIngressoId').val(response.tipoIngresso.idTipoIngresso)
			if (data.sexo === 'M') {
				$('input[id="masculino"]').prop('checked', true)
			} else {
				$('input[id="feminino"]').prop('checked', true)
			} // Supondo que o valor de 'sexo' seja uma string como 'M' ou 'F'
			$('#sexo_' + data.estadoCivil).prop('checked', true);
			$('#cep').val(data.cep);
			$('#endereco').val(data.endereco);
			$('#numero').val(data.numero);
			$('#complemento').val(data.complemento);
			$('#bairro').val(data.bairro);
			$('#municipio').val(data.municipio);
			$('#distrito').val(data.distrito);
			$('#uf').val(data.uf);
			$('#telefone').val(data.telefone != null && data.telefone != '' ? data.telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : '')
			$('#celular').val(data.celular != null && data.celular != '' ? data.celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : '')
			$('#email').val(data.email);
			$('#empresa').val(data.empresa);
			$('#ocupacao').val(data.ocupacao);
			$('#telefoneComercial').val(data.telefoneComercial != null && data.telefoneComercial != '' ? data.telefoneComercial.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : '')

			// Preenchendo campos de select (exemplo com raca, nacionalidade, paisNascimento, paisResidencia)
			$('#racaId').val(data.raca.idRaca);
			$('#nacionalidadeId').val(data.nacionalidadeId.idNacionalidade);
			$('#paisNascimentoId').val(data.paisNascimento.idPais);
			$('#paisResidenciaId').val(data.paisResidencia.idPais);
			$('#relacionamentoId').val(data.idPapelPessoa);

			// Exemplo de preenchimento para campos específicos como certidaoNascimentoNumero, certidaoCasamentoNumero, etc.
			$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
			$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);

			// Aqui você pode adicionar os demais campos conforme necessário
			// Exemplo para preenchimento de campo select com município de nascimento

			$('#ufNascimentoId').val(data.municipioNascimento.ufId);
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

			$('#municipioNascimentoId').val(data.municipioNascimento.idMunicipio);


			$('#rgUfEmissorId').val(data.rgUfEmissor != null ? data.rgUfEmissor : 0);

			if (data.certidaoNascimentoNumero !== null &&
				data.certidaoNascimentoDataEmissao !== null &&
				data.certidaoNascimentoFolha !== null &&
				data.certidaoNascimentoLivro !== null &&
				data.certidaoNascimentoOrdem !== null) {

				$('input[id="qualPreencher"]').attr('checked', true)

				$("#certidaoCasamento").hide()
				$("#certidaoNascimento").show()


				$('#certidaoNascimentoNumero').val(data.certidaoNascimentoNumero);
				$('#certidaoNascimentoCartorio').val(data.certidaoNascimentoCartorio);

				$('#certidaoNascimentoUfCartorioId').val(data.certidaoNascimentoMunicipioCartorio != null ? data.certidaoNascimentoMunicipioCartorio.ufId : "")
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
				$('#certidaoNascimentoMunicipioCartorioId').val(data.certidaoNascimentoMunicipioCartorio != null ? data.certidaoNascimentoMunicipioCartorio.idMunicipio : "");
				$('#certidaoNascimentoDataEmissao').val(data.certidaoNascimentoDataEmissao);
				$('#certidaoNascimentoFolha').val(data.certidaoNascimentoFolha);
				$('#certidaoNascimentoLivro').val(data.certidaoNascimentoLivro);
				$('#certidaoNascimentoOrdem').val(data.certidaoNascimentoOrdem);
			} else if (data.certidaoCasamentoCartorio !== null &&
				data.certidaoCasamentoMunicipioCartorio !== null &&
				data.certidaoCasamentoDataEmissao !== null &&
				data.certidaoCasamentoFolha !== null &&
				data.certidaoCasamentoLivro !== null &&
				data.certidaoCasamentoOrdem !== null) {
				$('input[id="qualPreencher"]').attr('checked', false)
				$("#certidaoNascimento").hide()
				$("#certidaoCasamento").show()
				$('#certidaoCasamentoNumero').val(data.certidaoCasamentoNumero);
				$('#certidaoCasamentoCartorio').val(data.certidaoCasamentoCartorio);
				$('#certidaoCasamentoDataEmissao').val(data.certidaoCasamentoDataEmissao);
				$('#certidaoCasamentoOrdem').val(data.certidaoCasamentoOrdem);
				$('#certidaoCasamentoFolha').val(data.certidaoCasamentoFolha);
				$('#certidaoCasamentoLivro').val(data.certidaoCasamentoLivro);
				$('#certidaoCasamentoUfCartorioId').val(data.certidaoCasamentoMunicipioCartorio.ufId);
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
				$('#certidaoCasamentoCidadeCartorioId').val(data.certidaoCasamentoMunicipioCartorio.idMunicipio);

			}

			// Exemplo para estado civil usando radio button
			$('input[name="estadoCivil"][value="' + data.estadoCivil + '"]').prop('checked', true); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'

			$(".bg-loading").addClass("none");
			$(".bg-loading").fadeOut();
		})
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação candidato AJAX:", textStatus, errorThrown);
	});

	$('#municipioNascimentoId').attr('disabled', true)
	$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', true)
	$('#certidaoNascimentoMunicipioCartorioId').attr('disabled', true)

	$("isEnderecoAluno").hide()

}

const editarCandidato = () => {
	window.location.href = "dados-aluno?idCandidato=" + idCandidato;
}

function showPage(page) {
	var start = (page - 1) * rows;
	var end = start + rows;

	$('#cola-tabela tr').hide();
	$('#cola-tabela tr').slice(start, end).show();
}

function toggleNavigation() {
	var totalRows = $('#tabela-ficha tr').length;
	var totalPages = Math.ceil(totalRows / rows);

	$('#prevFicha').prop('disabled', currentPage === 1);
	$('#nextFicha').prop('disabled', currentPage === totalPages);

	$('#pagination-ficha').toggle(totalRows > 0);

	$('#page-numbers-ficha').empty();

	if (totalRows > 0) {
		var startPage = Math.max(1, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1));
		var endPage = Math.min(totalPages, startPage + pagesToShow - 1);

		if (startPage > 1) {
			$('#page-numbers-ficha').append('<button class="btn btn-sm btn-page" data-page="1">1</button>');
			if (startPage > 2) {
				$('#page-numbers-ficha').append('<span>...</span>');
			}
		}

		for (var i = startPage; i <= endPage; i++) {
			var btnClass = (i === currentPage) ? 'btn btn-sm btn-page active-page' : 'btn btn-sm btn-page';
			$('#page-numbers-ficha').append('<button class="' + btnClass + '" data-page="' + i + '">' + i + '</button>');
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				$('#page-numbers-ficha').append('<span>...</span>');
			}
			$('#page-numbers-ficha').append('<button class="btn btn-sm btn-page" data-page="' + totalPages + '">' + totalPages + '</button>');
		}

		$('.btn-page-ficha').click(function() {
			goToPage(parseInt($(this).data('page')));

		});
	}
}


function updatePagination() {
	toggleNavigation();
}

function goToPage(page) {
	if (page >= 1 && page <= Math.ceil($('#tabela-ficha tr').length / rows)) {
		currentPage = page;
		showPage(currentPage);
		updatePagination();

	}
}

$(".reveal").on("click", function() {
	const $input = $(this).siblings(".senha"); // Seleciona o input relacionado
	const $icon = $(this).find("i"); // Seleciona o ícone dentro do botão

	if ($input.attr("type") === "password") {
		$input.attr("type", "text");
		$icon.removeClass("fa-eye").addClass("fa-eye-slash");
	} else {
		$input.attr("type", "password");
		$icon.removeClass("fa-eye-slash").addClass("fa-eye");
	}
});


$("#verDadosAluno").on("click", function() {
	window.location.href = "alunos";
})



$('#prevFicha').click(function() {
	goToPage(currentPage - 1);
});

$('#nextFicha').click(function() {
	goToPage(currentPage + 1);
});

$('#formReprovCand').submit(function(event) {
	event.preventDefault();

	const objeto = {
		"motivoReprovacaoCandidatoId": $("#motivoReprovacaoCandidatoId").val(),
		"descricaoReprovacao": $("#obsReprovacaoCandidato").val()
	}
	$.ajax({
		url: url_base + "/candidatos/" + Number(idCandidato) + '/reprovar',
		type: "put",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!"

			});
		}
	}).done(function(data) {
		Swal.fire({
			title: "Reprovado com sucesso",
			icon: "success",
		}).then((data) => {
			window.location.href = 'reservas'
		})
	})
})



