var dados = [];
var ufs = [];
const contaId = localStorage.getItem('contaId');
var nome = '';
var nome2 = '';
var dataIni = '';
var dataFim = '';
var periodoLetivoId = 0
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var id = 0;
var periodosLetivos = []

$(document).ready(function() {

	getDados()

	$.ajax({
		url: url_base + '/periodoletivo/conta/' + contaId,
		type: "get",
		async: false,
	}).done(function(data) {
		periodosLetivos = data
		preencherOpcoes(periodosLetivos, "#periodoLetivoOption", "#periodoLetivoId", "#periodoLetivoSearch");
		preencherOpcoes(periodosLetivos, "#periodoLetivoOptionEdit", "#periodoLetivoIdEdit", "#periodoLetivoSearchEdit");
	})

	$("#inputBusca").on("keyup", function() {
		var valorBusca = $(this).val().toLowerCase();

		if (valorBusca === '') {
			busca()
			$("#cola-tabela tr").show();
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
			}).show();
		}
	});

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		realizarBusca(valorBusca);
	});

	function realizarBusca(valorInput) {
		if (valorInput === '') {
			showPage(currentPage);
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorInput) > -1;
			}).show();
		}
	}

	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});

	showPage(currentPage);
	updatePagination();

});


function preencherOpcoes(periodosLetivos, optionsListId, selectId, searchId) {
	const $optionsList = $(optionsListId);
	const $periodoLetivoId = $(selectId);

	// Limpa as opções anteriores
	$optionsList.empty();
	$periodoLetivoId
		.empty()
		.append(
			'<option value="" disabled selected>Selecione uma opção</option>'
		);

	// Itera sobre os cursos retornados pela API
	$.each(periodosLetivos, function(index, item) {
		if (item.ativo === "S") {
			// Cria a opção da lista de sugestões
			const optionHTML = `<li data-value="${item.idPeriodoLetivo}">${item.ano}/${item.periodo} - ${formatarPeriodo(item.tipoPeriodicidade)} - ${item.descricao}</li>`;
			$optionsList.append(optionHTML);

			// Cria a opção no select oculto
			$periodoLetivoId.append(
				$("<option>", {
					value: item.idPeriodoLetivo,
					text: item.ano + '/' + item.periodo + " - " + formatarPeriodo(item.tipoPeriodicidade) + " - " + item.descricao
				})
			);
		}
	});

	// Exibe as opções ao focar no campo de busca
	$(searchId).on("focus", function() {
		$optionsList.show();
	});

	// Filtra as opções conforme o usuário digita
	$(searchId).on("input", function() {
		const searchValue = $(this).val().toLowerCase();
		$optionsList.find("li").each(function() {
			const text = $(this).text().toLowerCase();
			$(this).toggle(text.includes(searchValue));
		});
	});

	// Ao clicar em uma opção, atualiza o campo de busca e o select oculto
	$optionsList.on("click", "li", function() {
		const selectedText = $(this).text();
		const selectedValue = $(this).data("value");

		$(searchId).val(selectedText); // Preenche o campo de pesquisa
		$periodoLetivoId.val(selectedValue); // Preenche o select oculto com o ID do curso
		$optionsList.hide(); // Esconde a lista de opções
	});

	// Fecha a lista se o usuário clicar fora
	$(document).on("click", function(e) {
		if (!$(e.target).closest(".custom-select").length) {
			$optionsList.hide();
		}
	});
}


function formatarPeriodo(tipoPeriodicidade) {
	if (tipoPeriodicidade == "A") {
		return "Anual"
	} else if (tipoPeriodicidade == "B") {
		return "Bimestral"
	} else if (tipoPeriodicidade == "T") {
		return "Trimestral"
	} else if (tipoPeriodicidade == "S") {
		return "Semestral"
	}

}

function formatarDataParaBR(data) {
	var dataISO = data + "T00:00:00";
	var dataObj = new Date(dataISO);
	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();
	return dia + "/" + mes + "/" + ano;
}


function getDados() {
	$.ajax({
		url: url_base + "/concursos/conta/" + contaId,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			dadosOriginais = data
			listarDados(data);
			showPage(currentPage);
			updatePagination();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function listarDados(dados) {
	if (dados.length > 0) {


		var html = dados.map(function(item) {


			var ativo;

			if (item.ativo == "N") {
				ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
			} else {
				ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
			}

			return (
				"<tr>" +
				"<td>" +
				item.concurso +
				"</td>" +
				"<td>" +
				formatarDataParaBR(item.dataAbertura) +
				"</td>" +
				"<td>" +
				formatarDataParaBR(item.dataFechamento) +
				"</td>" +
				"<td><div class='d-flex align-items-center gap-1'>" +
				'<input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idConcurso +
				' " onChange="alteraStatus(this)" ' + `${item.ativo === "S" ? "checked" : ""}` + ' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
				"</div></td>" +
				'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
				item.idConcurso +
				'" data-nome="' +
				item.concurso +
				'" data-dataInicio="' +
				item.dataAbertura +
				'" data-dataFim="' +
				item.dataFechamento +
				'" data-idPeriodoLetivo="' +
				item.periodoLetivo.idPeriodoLetivo +
				'" data-ativo="' +
				item.ativo +
				'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		}).join("");

		$("#cola-tabela").html(html);
	}

}

function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");

	const button = $(element).closest("tr").find(".btn-status");
	if (status === "S") {
		button.removeClass("btn-success").addClass("btn-danger");
		button.find("i").removeClass("fa-check").addClass("fa-xmark");
		element.setAttribute("data-status", "N");
	} else {
		button.removeClass("btn-danger").addClass("btn-success");
		button.find("i").removeClass("fa-xmark").addClass("fa-check");
		element.setAttribute("data-status", "S");
	}

	console.log(id)
	console.log(status)

	$.ajax({
		url: url_base + `/concursos/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).then(data => {
		window.location.href = 'concurso'
	})
}
function showModal(ref) {
	// Obtém os atributos do elemento de referência
	id = ref.getAttribute("data-id");
	const nome = ref.getAttribute("data-nome");
	const dataIni = ref.getAttribute("data-dataInicio");
	const dataFim = ref.getAttribute("data-dataFim");
	const isAtivo = ref.getAttribute("data-ativo");
	const periodoLetivoId = ref.getAttribute("data-idPeriodoLetivo");

	// Atualiza o valor do select oculto
	$("#periodoLetivoIdEdit").val(periodoLetivoId).change();

	// Verifica se a opção correspondente está no select e obtém o texto
	const periodoLetivoSelecionado = $("#periodoLetivoIdEdit option:selected").text();
	if (periodoLetivoSelecionado) {
		// Preenche o campo de pesquisa com o texto correspondente
		$("#periodoLetivoSearchEdit").val(periodoLetivoSelecionado);
	} else {
		// Preencha com um valor padrão ou mensagem se a opção não for encontrada
		$("#periodoLetivoSearchEdit").val("Período não encontrado");
	}

	// Controle de exibição para elementos de ativação/desativação
	if (isAtivo === "S") {
		$(".ativar").hide();
		$(".desativar").show();
	} else {
		$(".desativar").hide();
		$(".ativar").show();
	}

	// Preenche outros campos
	$('#edit-nome').val(nome);
	$("#dataInicioEdit").val(dataIni);
	$("#dataFimEdit").val(dataFim);
}


function formatarHoraParaAPI(hora) {
	if (/^\d{2}:\d{2}$/.test(hora)) {
		return hora + ":00";
	}
	return hora;
}

function editar() {
	var objeto = {
		idConcurso: id,
		concurso: $('#edit-nome').val(),
		dataAbertura: $('#dataInicioEdit').val(),
		dataFechamento: $("#dataFimEdit").val(),
		periodoLetivoId: $("#periodoLetivoIdEdit").val(),
		contaId: contaId
	}

	var dataInicio = new Date(objeto.dataAbertura);
	var dataFim = new Date(objeto.dataFechamento);

	if (dataFim < dataInicio) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "A data de fim não pode ser menor que a data de início.",
		});

		return
	}


	$.ajax({
		url: url_base + "/concursos",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(data) {
			$('#edit-nome').val('');
			$('#edit-nome2').val('');
			$("#horaInicioEdit").val('');
			$("#horaFimEdit").val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			})
		})
	return false;
}
$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});
$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

function cadastrar() {

	var objeto = {
		concurso: $('#cadastro-nome').val(),
		dataAbertura: $('#dataInicio').val(),
		dataFechamento: $("#dataFechamento").val(),
		periodoLetivoId: $("#periodoLetivoId").val(),
		contaId: contaId
	}

	var dataInicio = new Date(objeto.dataAbertura);
	var dataFim = new Date(objeto.dataFechamento);

	if (dataFim < dataInicio) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "A data de fim não pode ser menor que a data de início.",
		});

		return
	}

	$.ajax({
		url: url_base + "/concursos",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		}
	})
		.done(function(data) {
			$('#cadastro-nome').val('');
			$("#dataInicio").val('');
			$("#dataFechamento").val('');
			getDados();
			updatePagination();
			showPage(currentPage);
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		})
	return false;
}

function limpaCampo() {
	$('#cadastro-nome').val('');
	$('#cadastro-nome2').val('');
	$("#horaInicio").val('');
	$("#horaFim").val('');
}