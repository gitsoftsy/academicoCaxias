var dados = [];
const contaId = localStorage.getItem("contaId");
var nome = "";
var nome2 = "";
var nome3 = "";
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = "";
let id = "";
let idProva = null;
let idProvaSelecionado = "";
let url = "";
var listaAvaliacao;
let idDisciplina;
let idEscola;
const idTurma = params.get("turma");
let turma = null;

function formatarPeriodo(tipoPeriodicidade) {
	$('#adicionarAvaliacaoBTN').hide()
	$('#isRequiredConceito').hide()
	if (tipoPeriodicidade == "A") {
		return "Anual";
	} else if (tipoPeriodicidade == "B") {
		return "Bimestral";
	} else if (tipoPeriodicidade == "T") {
		return "Trimestral";
	} else if (tipoPeriodicidade == "S") {
		return "Semestral";
	}
}

$(document).ready(function() {
	var ano = document.getElementById("ano");
	var anoAtual = new Date().getFullYear();

	var anosRetroativos = anoAtual - 2000;
	var anosFuturos = 10;

	var anoInicial = anoAtual + anosFuturos;
	var anoFinal = anoAtual - anosRetroativos;

	for (var i = anoInicial; i >= anoFinal; i--) {
		var option = document.createElement("option");
		option.value = i;
		option.text = i;
		ano.appendChild(option);
	}

	$("#btn-save").hide();
	$(".container-table").hide();
	$("#escolaIdDisable, #disciplinaId, #turno, #turmaId, #ano, #periodo").prop(
		"disabled",
		true
	);

	$.ajax({
		url: url_base + "/escolas/conta/" + contaId,
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#escolaId").append(
				$("<option>", {
					value: item.idEscola,
					text: item.nomeEscola,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/periodoletivo/conta/" + contaId,
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#periodo").append(
				$("<option>", {
					value: item.idPeriodoLetivo,
					text:
						item.ano +
						"/" +
						item.periodo +
						" - " +
						formatarPeriodo(item.tipoPeriodicidade) +
						" - " +
						item.descricao,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/turno/conta/" + contaId,
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turno").append(
				$("<option>", {
					value: item.idTurno,
					text: item.turno,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/turma",
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#turmaId").append(
				$("<option>", {
					value: item.idTurma,
					text: item.nomeTurma + " - " + item.gradeCurricular.disciplina.nome,
				})
			);
		});
	});

	$.ajax({
		url: url_base + "/disciplina/conta/" + contaId,
		type: "GET",
	}).done(function(data) {
		$.each(data, function(index, item) {
			$("#disciplinaId").append(
				$("<option>", {
					value: item.idDisciplina,
					text: `${item.codDiscip} - ${item.nome}`,
				})
			);
		});
	});

	$("#escolaId, #disciplinaId, #turno, #turmaId, #ano, #periodo").select2();
	$("#turmaId").select2();

	if (idTurma != undefined) {
		$.ajax({
			url: url_base + "/turma/" + idTurma,
			type: "GET",
		}).done(function(data) {
			$("#turno").val(data.turno.idTurno);
			$("#disciplinaId").val(data.gradeCurricular.disciplina.idDisciplina);
			$("#turmaId").val(idTurma);
			$("#periodo").val(data.periodoLetivo.idPeriodoLetivo);
			$("#ano").val(data.periodoLetivo.ano);
			$("#escolaId").val(data.escola.idEscola);

			$(
				"#escolaId, #disciplinaId, #turno, #turmaId, #ano, #periodo, #btn-buscar"
			).prop("disabled", true);
			$("#escolaId, #disciplinaId, #turno, #turmaId, #ano, #periodo").select2();
			$("#turmaId").select2();

			buscar();
		});
	}

	$("#escolaId, #disciplinaId, #turno, #turmaId, #ano, #periodo").select2();
});

$("#ano").change(() => {
	$("#periodo").prop("disabled", false).val(null).trigger("change");
	$("#turno, #turmaId, #disciplinaId")
		.prop("disabled", true)
		.val(null)
		.trigger("change");

	$("#turno, #turmaId, #disciplinaId").prop("disabled", true);
});

$("#escolaId").change(() => {
	$("#ano").prop("disabled", false).val(null).trigger("change");

	$("#periodo, #turno, #turmaId, #disciplinaId")
		.prop("disabled", true)
		.val(null)
		.trigger("change");

	$("#disciplinaId, #turno, #turmaId, #periodo").prop("disabled", true);
});

$("#periodo").change(() => {
	$("#turno").prop("disabled", false).val(null).trigger("change");
	$("#turmaId, #disciplinaId")
		.prop("disabled", true)
		.val(null)
		.trigger("change");

	$("#turmaId, #disciplinaId").prop("disabled", true);
});

$("#turno").change(() => {
	$("#disciplinaId").prop("disabled", false).val(null).trigger("change");

	$("#turmaId, #disciplinaId")
		.prop("disabled", true)
		.val(null)
		.trigger("change");

	$("#turmaId").prop("disabled", true);
	$("#disciplinaId").prop("disabled", false);
});

$("#disciplinaId").change(() => {
	$("#turmaId").prop("disabled", false).val(null).trigger("change");
});

const buscar = () => {
	$("#messageInfo").hide();
	$(".container-table").show();
	$("#btn-save").show();

	if (idTurma != undefined) {
		$.ajax({
			url: `${url_base}/prova/listarProvas?idEscola=&ano=&periodoLetivo=&idTurno=&idDisciplina=&idTurma=${idTurma}`,
			type: "GET",
		}).done(function(data) {
			listaAvaliacao = data;
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
		});
	} else {
		fetchData()
	}
	$('#adicionarAvaliacaoBTN').show()

};

function fetchData() {
	// Captura os valores dos selects
	const escolaId = $('#escolaId').val();
	const ano = $('#ano').val();
	const periodo = $('#periodo').val();
	const turno = $('#turno').val();
	const disciplinaId = $('#disciplinaId').val();
	const turmaId = $('#turmaId').val();

	// Verifica se todos os campos foram preenchidos
	if (!escolaId || !ano || !periodo || !turno || !disciplinaId || !turmaId) {
		alert('Por favor, preencha todos os campos antes de continuar.');
		return;
	}

	// Monta os parâmetros para a URL
	const params = {
		idEscola: escolaId,
		ano: ano,
		periodoLetivo: periodo,
		idTurno: turno,
		idDisciplina: disciplinaId,
		idTurma: turmaId,
	};

	// Converte os parâmetros para a string de query
	const queryString = $.param(params);

	console.log(queryString)

	// Faz a requisição GET com os parâmetros
	$.ajax({
		url: `${url_base}/prova/listarProvas?idEscola=&ano=&periodoLetivo=&idTurno=&idDisciplina=&idTurma=${turmaId}`,
		type: 'GET',
	})
		.done(function(data) {
			console.log('Dados recebidos:', data);
			listaAvaliacao = data;
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(error) {
			console.error('Erro na requisição:', error);
			alert('Ocorreu um erro ao buscar os dados. Tente novamente.');
		});
}

function formatarDataParaBR(data) {
	var dataObj = new Date(data);

	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();
	return dia + "/" + mes + "/" + ano;
}

const listarDados = (dados) => {
	dados.sort((a, b) => a.ordem - b.ordem);

	var html = dados
		.map(function(item) {
			let simulado;

			if (item.ehSimulado == "N") {
				simulado =
					'<i style="color:#ff1f00; font-size: 28px" class="fa-regular fa-circle-xmark"></i>';
			} else {
				simulado =
					"<i style='color:#2eaa3a; font-size: 28px' class='fa-regular fa-circle-check'></i>";
			}

			console.log(item);

			const dtDivulgacao = item.dtDivulgacao == null ? 'não possui' : formatarDataParaBR(item.dtDivulgacao)
			const dtAgendaProva = item.dtAgendaProva == null ? 'não possui' : formatarDataParaBR(item.dtAgendaProva)

			return (
				"<tr>" +
				"<td>" +
				item.nomeAbreviado +
				"</td>" +
				"<td>" +
				item.descricao +
				"</td>" +
				'<td class="text-center align-middle">' +
				simulado +
				"</td>" +
				"<td>" +
				dtDivulgacao +
				"</td>" +
				"<td>" +
				dtAgendaProva +
				"</td>" +
				"<td>" +
				'<input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idProva +
				' " onChange="alteraStatus(this)" ' +
				`${item.ativo === "S" ? "checked" : ""}` +
				' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
				"</td>" +
				'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
				item.idProva +
				'" onclick="showModal(this)"><i class="fa-solid fa-pen fa-lg"></i></span> ' +
				"</td>" +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela-professor").html(html);
};

function limpaCampo() {
	$("#provaFormEdit")[0].reset();
}

$('#tipoConceito').change(() => {

	if ($('#tipoConceito').val() == 'N') {
		$('#conceitoMax').prop('required', 'true')
		$('#isRequiredConceito').show()
	} else {
		$('#conceitoMax').prop('required', 'false')
		$('#isRequiredConceito').hide()
	}
})

function showModal(ref) {
	limpaCampo();
	idProvaSelecionado = ref.getAttribute("data-id");

	$.ajax({
		url: `${url_base}/prova/${idProvaSelecionado}`,
		type: "GET",
	})
		.done(function(data) {
			const formatDate = (isoDate) => {
				if (!isoDate) return "";
				return isoDate.split("T")[0];
			};

			const ativoValue = data.ativo === "S";
			$("#provaAtivaEdit").prop("checked", ativoValue).change();

			const simuladoValue = data.ehSimuladoEdit === "S";
			$("#ehSimuladoEdit").prop("checked", simuladoValue).change();

			$("#dataDivulgacaoEdit").val(formatDate(data.dataDivulgacao));

			$("#ordemEdit").val(data.ordem);
			$("#nomeAbreviadoEdit").val(data.nomeAbreviado);
			$("#descricaoEdit").val(data.descricao);
			$("#dataAgendaProvaEdit").val(data.dataAgendaProva);
			$("#tipoConceitoEdit").val(data.tipoConceito);
			$("#conceitoMaxEdit").val(data.conceitoMax);
			$("#dataLimiteRevisaoEdit").val(data.dataLimiteRevisao);
			$("#formulaEdit").val(data.formula);

			$("#staticBackdropEdit").modal("show");
		})
		.fail(function() {
			alert("Erro ao carregar os dados da prova.");
		});
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

	$.ajax({
		url: url_base + `/prova/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
	}).then((data) => { });
}

$("#formBuscar").submit(function(e) {
	e.preventDefault();

	buscar();
});

$("#tipoConceito").on("change", function() {
	if ($(this).val() === "N") {
		$("#conceitoMax").attr("required", true);
	} else {
		$("#conceitoMax").removeAttr("required").val("");
	}
});

$("#submitForm").on("click", function(e) {
	e.preventDefault();

	const data = {
		turmaId: $('#turmaId').val(),
		nomeAbreviado: $("#nomeAbreviado").val(),
		descricao: $("#descricao").val(),
		dataDivulgacao: $("#dataDivulgacao").val(),
		dataAgendaProva: $("#dataAgendaProva").val(),
		ordem: $("#ordem").val(),
		tipoConceito: $("#tipoConceito").val(),
		conceitoMax: $("#conceitoMax").val(),
		dataLimiteRevisao: $("#dataLimiteRevisao").val(),
		ativo: $("#provaAtiva").prop("checked") ? "S" : "N",
		ehSimulado: $("#ehSimulado").prop("checked") ? "S" : "N",
		formula: $("#formula").val(),
	};

	$.ajax({
		url: url_base + "/prova",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response) {
			buscar();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			});
			$("#btnClose").click();
			limpaCampo();
		},
		error: function(erro) {
			console.log(erro);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
			$("#btnClose").click();
			limpaCampo();
		},
	});
});
$("#submitFormEdit").on("click", function(e) {
	e.preventDefault();

	const data = {
		idProva: idProvaSelecionado,
		turmaId: Number(idTurma),
		nomeAbreviado: $("#nomeAbreviadoEdit").val(),
		descricao: $("#descricaoEdit").val(),
		dataDivulgacao: $("#dataDivulgacaoEdit").val(),
		dataAgendaProva: $("#dataAgendaProvaEdit").val(),
		ordem: $("#ordemEdit").val(),
		tipoConceito: $("#tipoConceitoEdit").val(),
		conceitoMax: $("#conceitoMaxEdit").val(),
		dataLimiteRevisao: $("#dataLimiteRevisaoEdit").val(),
		ativo: $("#provaAtivaEdit").prop("checked") ? "S" : "N",
		ehSimulado: $("#ehSimuladoEdit").prop("checked") ? "S" : "N",
		formula: $("#formulaEdit").val(),
	};

	$.ajax({
		url: url_base + "/prova",
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response) {
			console.log(response);
			buscar();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			});
			$("#btnCloseEdit").click();
			limpaCampo();
		},
		error: function(erro) {
			console.log(erro);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
			$("#btnCloseEdit").click();
			limpaCampo();
		},
	});
});
