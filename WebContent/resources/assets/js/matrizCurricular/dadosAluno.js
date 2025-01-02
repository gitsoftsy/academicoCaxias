const contaId = localStorage.getItem("contaId");
const escolaId = sessionStorage.getItem("escolaId");
let idAluno = params.get("id");
let listaDocumentos = [];
let idDoc = "";
let idPessoa = "";
let aluno = {};
let changeDadosPessoais = false;
let changeDadosAcademicos = false;

var notas = [];

$(document).ready(function() {
	var triggerTabList = [].slice.call(
		document.querySelectorAll("#nav-tab button")
	);
	triggerTabList.forEach(function(triggerEl) {
		var tabTrigger = new bootstrap.Tab(triggerEl);
		triggerEl.addEventListener("click", function(event) {
			event.preventDefault();
			tabTrigger.show();
		});
	});

	$("#btn-edit").hide();
	$(
		"#nav-dados-pessoais input, #nav-dados-pessoais select, #nav-acad input, #nav-acad select"
	).attr("disabled", true);
	$("#municipioNascimentoId").attr("disabled", true);

	localStorage.setItem("idAluno", idAluno);
	loadSelects();
	loadSelectsAcademico();
	getDadosAluno();

	getDadosAcademicos();
});

$("#nav-dados-pessoais input, #nav-dados-pessoais select").change(() => {
	console.log(changeDadosPessoais);
	changeDadosPessoais = true;
});

$("#nav-acad input, #nav-acad select").change(() => {
	console.log(changeDadosAcademicos);
	changeDadosAcademicos = true;
});

const editarAluno = () => {
	$("#btn-edit").show();
	$(
		"#nav-dados-pessoais input, #nav-dados-pessoais select, #nav-acad input, #nav-acad select"
	).attr("disabled", false);
	$("#municipioNascimentoId").attr("disabled", false);
};

const listarDados = (dados) => {
	var html = dados
		.map(function(item) {
			return (
				"<tr>" +
				"<td>" +
				item.matricula.turma.nomeTurma +
				"</td>" +
				"<td>" +
				item.matricula.turma.gradeCurricular.disciplina.nome +
				"</td>" +
				"<td>" +
				item.matricula.turma.periodoLetivo.ano +
				"</td>" +
				"<td>" +
				item.matricula.turma.periodoLetivo.periodo +
				"/" +
				item.matricula.turma.periodoLetivo.descricao +
				"</td>" +
				"<td>" +
				item.situacaoAluno.situacaoAluno +
				"</td>" +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela-matricula").html(html);
};

const getDadosAcademicos = () => {
	$("#escolaId").val(aluno.escola.idEscola);
	$("#cursoId").val(aluno.curso.idCurso);
	$("#serieId").val(aluno.serie.idSerie);
	$("#situacaoAlunoId").val(aluno.situacaoAluno.idSituacaoAluno);
	$("#aluno").val(aluno.aluno);
	$("#emailInterno").val(aluno.emailInterno);
	$("#turnoId").val(aluno.turno.idTurno);
};

const getDadosAluno = () => {
	/*$.ajax({
		url: url_base + "/nota/aluno/" + idAluno,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(res) {
		notas = res;
		listarNotas(res);
	});*/

	$.ajax({
		url: url_base + "/alunos/" + idAluno,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	})
		.done(function(res) {
			$("#matricula").val(res.aluno);
			$("#nomeAluno").val(res.pessoa.nomeCompleto);

			let response = res;
			idPessoa = response.pessoa;
			aluno = response;
			let data = response.pessoa;

			$.ajax({
				url: url_base + "/matricula/matricula/" + res.aluno,
				type: "GET",
				async: false,
				error: function(e) {
					console.log(e);
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível realizar esse comando!",
					});
				},
			}).done((response) => {

				if (response.length != 0) {

					res.matricula = response[0];
					listarDados([res]);
				}
			});

			nomeCandidato = data.nomeCompleto;

			var cpfCandidato = data.cpf
				? data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
				: "";

			let numRg = data.rgNumero;

			// Preenchendo campos de input
			$("#nomeCompleto").val(data.nomeCompleto );
			$("#nomeMae").val(data.nomeMae );
			$("#nomePai").val(data.nomePai);
			$("#nomeSocial").val(data.nomeSocial );
			$("#cpf").val(cpfCandidato );
			$("#rgNumero").val(
				numRg != null
					? numRg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4")
					: ""
			);
			$("#rgOrgaoExpedidor").val(data.rgOrgaoExpedidor);
			$("#rgDataExpedicao").val(data.rgDataExpedicao);
			$("#dtNascimento").val(data.dtNascimento);
			$("#tipoIngressoId").val(response.candidato.tipoIngresso.idTipoIngresso);
			if (data.sexo === "M") {
				$('input[id="masculino"]').prop("checked", true);
			} else {
				$('input[id="feminino"]').prop("checked", true);
			}

			$("#sexo_" + data.estadoCivil).prop("checked", true);
			$("#cep").val(data.cep);
			$("#endereco").val(data.endereco);
			$("#numero").val(data.numero);
			$("#complemento").val(data.complemento);
			$("#bairro").val(data.bairro);
			$("#municipio").val(data.municipio);
			$("#distrito").val(data.distrito);
			$("#uf").val(data.uf);
			$("#telefone").val(
				data.telefone != null && data.telefone != ""
					? data.telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3")
					: ""
			);
			$("#celular").val(
				data.celular != null && data.celular != ""
					? data.celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
					: ""
			);
			$("#email").val(data.email);
			$("#empresa").val(data.empresa);
			$("#ocupacao").val(data.ocupacao);
			$("#telefoneComercial").val(
				data.telefoneComercial != null && data.telefoneComercial != ""
					? data.telefoneComercial.replace(
						/^(\d{2})(\d{5})(\d{4})$/,
						"($1) $2-$3"
					)
					: "Não Preenchido"
			);

			$("#racaId").val(data.raca.idRaca);
			$("#nacionalidadeId").val(data.nacionalidadeId.idNacionalidade);
			$("#paisNascimentoId").val(data.paisNascimento.idPais);
			$("#paisResidenciaId").val(data.paisResidencia.idPais);
			$("#relacionamentoId").val(data.idPapelPessoa);

			$("#certidaoNascimentoNumero").val(data.certidaoNascimentoNumero);
			$("#certidaoCasamentoNumero").val(data.certidaoCasamentoNumero);

			$("#ufNascimentoId").val(data.municipioNascimento.ufId);

			$.ajax({
				url: url_base + "/municipio/uf/" + $("#ufNascimentoId").val(),
				type: "get",
				async: false,
			}).done(function(data) {
				$.each(data, function(index, item) {
					$("#municipioNascimentoId").append(
						$("<option>", {
							value: item.idMunicipio,
							text: item.nomeMunicipio,
							name: item.nomeMunicipio,
						})
					);
				});
			});

			$("#municipioNascimentoId").val(data.municipioNascimento.idMunicipio);
			$("#rgUfEmissorId").val(
				data.rgUfEmissor != null ? data.rgUfEmissor.idUf : 0
			);

			if (
				data.certidaoNascimentoNumero !== null &&
				data.certidaoNascimentoDataEmissao !== null &&
				data.certidaoNascimentoFolha !== null &&
				data.certidaoNascimentoLivro !== null &&
				data.certidaoNascimentoOrdem !== null
			) {
				$('input[id="qualPreencher"]').attr("checked", true);

				$("#certidaoCasamento").hide();
				$("#certidaoNascimento").show();

				$("#certidaoNascimentoNumero").val(data.certidaoNascimentoNumero);
				$("#certidaoNascimentoCartorio").val(data.certidaoNascimentoCartorio);

				$("#certidaoNascimentoUfCartorioId").val(
					data.certidaoNascimentoMunicipioCartorio != null
						? data.certidaoNascimentoMunicipioCartorio.ufId
						: ""
				);

				$("#certidaoNascimentoDataEmissao").val(
					data.certidaoNascimentoDataEmissao
				);
				$("#certidaoNascimentoFolha").val(data.certidaoNascimentoFolha);
				$("#certidaoNascimentoLivro").val(data.certidaoNascimentoLivro);
				$("#certidaoNascimentoOrdem").val(data.certidaoNascimentoOrdem);
				$.ajax({
					url:
						url_base +
						"/municipio/uf/" +
						$("#certidaoNascimentoUfCartorioId").val(),
					type: "get",
					async: false,
				}).done(function(data) {
					$.each(data, function(index, item) {
						$("#certidaoNascimentoMunicipioCartorioId").append(
							$("<option>", {
								value: item.idMunicipio,
								text: item.nomeMunicipio,
								name: item.nomeMunicipio,
							})
						);
					});
				});
				$("#certidaoNascimentoMunicipioCartorioId").val(
					data.certidaoNascimentoMunicipioCartorio != null
						? data.certidaoNascimentoMunicipioCartorio.idMunicipio
						: ""
				);
			} else if (
				data.certidaoCasamentoCartorio !== null &&
				data.certidaoCasamentoMunicipioCartorio !== null &&
				data.certidaoCasamentoDataEmissao !== null &&
				data.certidaoCasamentoFolha !== null &&
				data.certidaoCasamentoLivro !== null &&
				data.certidaoCasamentoOrdem !== null
			) {
				$('input[id="qualPreencher"]').attr("checked", false);
				$("#certidaoNascimento").hide();
				$("#certidaoCasamento").show();
				$("#certidaoCasamentoNumero").val(data.certidaoCasamentoNumero);
				$("#certidaoCasamentoCartorio").val(data.certidaoCasamentoCartorio);
				$("#certidaoCasamentoDataEmissao").val(
					data.certidaoCasamentoDataEmissao
				);
				$("#certidaoCasamentoOrdem").val(data.certidaoCasamentoOrdem);
				$("#certidaoCasamentoFolha").val(data.certidaoCasamentoFolha);
				$("#certidaoCasamentoLivro").val(data.certidaoCasamentoLivro);
				$("#certidaoCasamentoUfCartorioId").val(
					data.certidaoCasamentoMunicipioCartorio.ufId
				);
				$.ajax({
					url:
						url_base +
						"/municipio/uf/" +
						$("#certidaoCasamentoUfCartorioId").val(),
					type: "get",
					async: false,
				}).done(function(data) {
					$.each(data, function(index, item) {
						$("#certidaoCasamentoCidadeCartorioId").append(
							$("<option>", {
								value: item.idMunicipio,
								text: item.nomeMunicipio,
								name: item.nomeMunicipio,
							})
						);
					});
				});
				$("#certidaoCasamentoCidadeCartorioId").val(
					data.certidaoCasamentoMunicipioCartorio.idMunicipio
				);
			}

			$('input[name="estadoCivil"][value="' + data.estadoCivil + '"]').prop(
				"checked",
				true
			); // Supondo que o valor de 'estadoCivil' seja uma string como 'SO' ou 'CA'

			$(".bg-loading").addClass("none");
			$(".bg-loading").fadeOut();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error(
				"Erro na solicitação candidato AJAX:",
				textStatus,
				errorThrown
			);
		});

	$("#municipioNascimentoId").attr("disabled", true);
	$("#certidaoNascimentoMunicipioCartorioId").attr("disabled", true);
	$("#certidaoNascimentoMunicipioCartorioId").attr("disabled", true);

	$("isEnderecoAluno").hide();
};

/*const listarNotas = (dados) => {
	dados.sort((a, b) => a.ordem - b.ordem);

	const formatarData = (data) => {
		if (!data) return "";
		const dataObj = new Date(data);
		return new Intl.DateTimeFormat("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		}).format(dataObj);
	};

	const formatarNota = (nota) => {
		if (!nota) return "0.00";
		return parseFloat(nota).toFixed(2);
	};

	var html = dados
		.map(function(item) {
			let compareceu;

			if (item.compareceu == "N") {
				compareceu =
					'<i style="color:#ff1f00; font-size: 28px" class="fa-regular fa-circle-xmark"></i>';
			} else {
				compareceu =
					"<i style='color:#2eaa3a; font-size: 28px' class='fa-regular fa-circle-check'></i>";
			}

			return (
				"<tr>" +
				"<td>" +
				item.prova.turma.gradeCurricular.disciplina.nome +
				"</td>" +
				"<td>" +
				item.prova.turma.nomeTurma +
				"</td>" +
				"<td>" +
				item.prova.turma.periodoLetivo.descricao +
				"</td>" +
				"<td>" +
				item.prova.descricao +
				"</td>" +
				"<td>" +
				item.prova.nomeAbreviado +
				"</td>" +
				"<td>" +
				formatarData(item.prova.dataAgendaProva) +
				"</td>" +
				"<td>" +
				formatarNota(item.nota) +
				"</td>" +
				"<td>" +
				item.prova.conceitoMax +
				"</td>" +
				"<td>" +
				compareceu +
				"</td>" +
				'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
				item.idNota +
				'" onclick="showModal(this)"><i class="fa-solid fa-pen fa-lg"></i></span> ' +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela-notas").html(html);
};*/
var idNota = "";
var notaSelecionada = [];

function showModal(ref) {
	idNota = ref.getAttribute("data-id");

	notaSelecionada = notas.find((item) => item.idNota == idNota);

	const htmlNota = `
  <tr>
    <td>${notaSelecionada.prova.descricao}</td>
    <td>
      <input 
        type="number" 
        class="form-control nota-input" 
        value="${parseFloat(notaSelecionada.nota).toFixed(2)}" 
        min="0" 
        max="${notaSelecionada.notaMax}" 
        data-max="${notaSelecionada.prova.conceitoMax}"
        step="0.01"
      />
    </td>
  </tr>
`;

	$("#cola-tabela-editNota").html(htmlNota);
	$("#modalNota").modal("show");
}

$("#submitFormEdit").on("click", function() {
	const usuarioId = sessionStorage.getItem("usuarioId");

	const inputNota = $(".nota-input");
	const novaNota = parseFloat(inputNota.val());
	const maxNota = parseFloat(inputNota.data("max"));

	if (novaNota < 0 || novaNota > maxNota) {
		Swal.fire({
			icon: "error",
			title: "Valor inválido!",
			text: `A nota deve estar entre 0 e ${maxNota.toFixed(2)}`,
		});
		return;
	}

	const objetoEdit = {
		idNota: idNota,
		alunoId: idAluno,
		provaId: notaSelecionada.prova.idProva,
		compareceu: notaSelecionada.compareceu,
		ordem: notaSelecionada.ordem,
		nota: novaNota,
		usuarioId: usuarioId,
		professorId: null,
	};

	console.log(objetoEdit);

	$.ajax({
		url: url_base + "/nota",
		type: "put",
		contentType: "application/json",
		data: JSON.stringify(objetoEdit),
		error: function(e) {
			Swal.close();
			console.log(e);
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		});
		listarNotas(notas);
		$("#modalNota").modal("hide");
	});
	$("#modalNota").modal("hide");

});

const loadSelectsAcademico = () => {
	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#escolaId").append(
					$("<option>", {
						value: item.idEscola,
						text: item.nomeEscola,
						name: item.nomeEscola,
					})
				);
			}
		});
	});

	$.ajax({
		url: url_base + "/turno/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turnoId").append(
				$("<option>", {
					value: item.idTurno,
					text: item.turno,
					name: item.turno,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/situacoesAluno/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#situacaoAlunoId").append(
				$("<option>", {
					value: item.idSituacaoAluno,
					text: item.situacaoAluno,
					name: item.situacaoAluno,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/serie/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#serieId").append(
				$("<option>", {
					value: item.idSerie,
					text: `${item.serie} - ${item.descricao}`,
					name: item.serie,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/cursos/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#cursoId").append(
				$("<option>", {
					value: item.idCurso,
					text: `${item.nome} - ${item.codCurso}`,
					name: item.nome,
				})
			);
		});
	});
};

const loadSelects = () => {
	$.ajax({
		url: url_base + "/tiposIngresso/conta/" + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#tipoIngressoId").append(
					$("<option>", {
						value: item.idTipoIngresso,
						text: item.tipoIngresso,
						name: item.tipoIngresso,
					})
				);
			}
		});
	});

	$.ajax({
		url: url_base + "/raca",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#racaId").append(
					$("<option>", {
						value: item.idRaca,
						text: item.raca,
						name: item.raca,
					})
				);
			}
		});
	});

	$.ajax({
		url: url_base + "/paises",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#paisNascimentoId").append(
				$("<option>", {
					value: item.idPais,
					text: item.nomePais,
					name: item.nomePais,
				})
			);

			$("#paisResidenciaId").append(
				$("<option>", {
					value: item.idPais,
					text: item.nomePais,
					name: item.nomePais,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/nacionalidade",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#nacionalidadeId").append(
				$("<option>", {
					value: item.idNacionalidade,
					text: item.nacionalidade,
					name: item.nacionalidade,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/uf",
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#ufNascimentoId").append(
				$("<option>", {
					value: item.idUf,
					text: item.codUf + " - " + item.nomeUf,
					name: item.codUf,
				})
			);

			$("#rgUfEmissorId").append(
				$("<option>", {
					value: item.idUf,
					text: item.codUf + " - " + item.nomeUf,
					name: item.codUf,
				})
			);

			$("#rneUfEmissorId").append(
				$("<option>", {
					value: item.idUf,
					text: item.codUf + " - " + item.nomeUf,
					name: item.codUf,
				})
			);

			$("#certidaoNascimentoUfCartorioId").append(
				$("<option>", {
					value: item.idUf,
					text: item.codUf + " - " + item.nomeUf,
					name: item.codUf,
				})
			);

			$("#certidaoCasamentoUfCartorioId").append(
				$("<option>", {
					value: item.idUf,
					text: item.codUf + " - " + item.nomeUf,
					name: item.codUf,
				})
			);
		});
	});
};

$("#btn-edit").click(() => {
	var dadosFormulario = {
		idPessoa: aluno.pessoa.idPessoa,
		contaId: parseInt(contaId),
		nomeCompleto: $("#nomeCompleto").val(),
		nomeSocial: $("#nomeSocial").val(),
		cpf: $("#cpf")
			.val()
			.replace(/[^\d]+/g, ""),
		rgNumero: $("#rgNumero")
			.val()
			.replace(/[^\d]+/g, ""),
		rgOrgaoExpedidor: $("#rgOrgaoExpedidor").val(),
		rgUfEmissorId: parseInt($("#rgUfEmissorId").val()),
		rgDataExpedicao: $("#rgDataExpedicao").val(),
		rneNumero: $("#rneNumero").val(),
		rneOrgaoExpedidor: $("#rneOrgaoExpedidor").val(),
		rneUfEmissorId: parseInt($("#rneUfEmissorId").val()),
		rneDataExpedicao: $("#rneDataExpedicao").val(),
		certidaoNascimentoNumero: $("#certidaoNascimentoNumero").val(),
		certidaoNascimentoCartorio: $("#certidaoNascimentoCartorio").val(),
		certidaoNascimentoUfCartorioId: parseInt(
			$("#certidaoNascimentoUfCartorioId").val()
		),
		certidaoNascimentoDataEmissao: $("#certidaoNascimentoDataEmissao").val(),
		certidaoNascimentoFolha: $("#certidaoNascimentoFolha").val(),
		certidaoNascimentoLivro: $("#certidaoNascimentoLivro").val(),
		certidaoNascimentoOrdem: $("#certidaoNascimentoOrdem").val(),
		certidaoCasamentoNumero: $("#certidaoCasamentoNumero").val(),
		certidaoCasamentoCartorio: $("#certidaoCasamentoCartorio").val(),
		certidaoCasamentoUfCartorioId:
			$("#certidaoCasamentoUfCartorioId").val() == null ||
				$("#certidaoCasamentoUfCartorioId").val() == undefined
				? ""
				: $("#certidaoCasamentoUfCartorioId").val(),
		certidaoCasamentoDataEmissao: $("#certidaoCasamentoDataEmissao").val(),
		certidaoCasamentoFolha: $("#certidaoCasamentoFolha").val(),
		certidaoCasamentoLivro: $("#certidaoCasamentoLivro").val(),
		certidaoCasamentoOrdem: $("#certidaoCasamentoOrdem").val(),
		dtNascimento: $("#dtNascimento").val(),
		sexo: $('input[name="sexo"]:checked').val(),
		racaId: parseInt($("#racaId").val()),
		paisNascimentoId: parseInt($("#paisNascimentoId").val()),
		ufNascimentoId: parseInt($("#ufNascimentoId").val()),
		nacionalidadeId: parseInt($("#nacionalidadeId").val()),
		municipioNascimentoId: parseInt($("#municipioNascimentoId").val()),
		paisResidenciaId: parseInt($("#paisNascimentoId").val()),
		nacionalidade: $("#nacionalidadeId option:selected").text().substring(0, 2),
		nomePai: $("#nomePai").val(),
		nomeMae: $("#nomeMae").val(),
		uf: $("#uf").val(),
	};

	$.ajax({
		url: url_base + "/pessoas/" + aluno.pessoa.idPessoa,
		type: "PUT",
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e);
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		let objeto = {
			idAluno: aluno.idAluno,
			contaId: contaId,
			cursoId: $("#cursoId").val(),
			escolaId: $("#escolaId").val(),
			serieId: $("#serieId").val(),
			turnoId: $("#turnoId").val(),
			pessoaId: aluno.pessoa.idPessoa,
			candidatoId: aluno.candidato.idCandidato,
			situacaoAlunoId: $("#situacaoAlunoId").val(),
			aluno: $("#aluno").val(),
			emailInterno: $("#emailInterno").val(),
		};

		$.ajax({
			url: url_base + "/alunos",
			type: "PUT",
			data: JSON.stringify(objeto),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				Swal.close();
				console.log(e);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			},
		}).done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			}).then((result) => {
				window.location.href = "alunos";
			});
		});
	});
});
