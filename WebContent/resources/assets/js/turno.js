var dados = [];
var dadosOriginais = [];
var ufs = [];
const contaId = localStorage.getItem("contaId");
var nome = "";
var nome2 = "";
var horaIni = "";
var horaFim = "";
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let turnos = [];

$(document).ready(function() {
	getDados();

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		if (valorBusca === '') {
			dados = dadosOriginais
			listarDados(dadosOriginais); // Exibe todos os dados
			showPage(currentPage);
			updatePagination();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		} else {
			var dadosFiltrados = dados.filter(item =>
				item.turno.toLowerCase().includes(valorBusca)
			);
			dados = dadosFiltrados
			listarDados(dados);
			showPage(currentPage);
			updatePagination();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		}
	});

	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});

	showPage(currentPage);
	updatePagination();
});

function getDados() {
	$.ajax({
		url: url_base + "/turno",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			turnos = data;
			dados = data
			dadosOriginais = data
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function listarDados(dados) {
	var html = dados
		.map(function(item) {
			var horaInicioFormatada = item.horaInicio.substring(0, 5);
			var horaFimFormatada = item.horaFim.substring(0, 5);

			var ativo;

			if (item.ativo == "N") {
				ativo =
					'<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
			} else {
				ativo =
					"<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
			}

			return (
				"<tr>" +
				"<td>" +
				item.turno +
				"</td>" +
				"<td>" +
				item.mnemonico +
				"</td>" +
				"<td>" +
				horaInicioFormatada +
				"</td>" +
				"<td>" +
				horaFimFormatada +
				"</td>" +
				"<td><div class='d-flex align-items-center gap-1'>" +
				'<input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idTurno +
				'" onChange="alteraStatus(this)" ' +
				(item.ativo == "S" ? "checked" : "") +
				' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
				"</div></td>" +
				'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
				item.idTurno +
				'" data-nome="' +
				item.turno +
				'" data-nome2="' +
				item.mnemonico +
				'" data-horaIni="' +
				item.horaInicio +
				'" data-horaFim="' +
				item.horaFim +
				'" data-ativo="' +
				item.ativo +
				'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela-turnos").html(html);
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

	console.log(id);
	console.log(status);

	$.ajax({
		url: url_base + `/turno/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
	}).then((data) => {
		window.location.href = "turnos";
	});
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	nome = ref.getAttribute("data-nome");
	nome2 = ref.getAttribute("data-nome2");
	horaIni = ref.getAttribute("data-horaIni");
	horaFim = ref.getAttribute("data-horaFim");
	isAtivo = ref.getAttribute("data-ativo");

	if (isAtivo == "S") {
		$(".ativar").hide();
		$(".desativar").show();
	} else {
		$(".desativar").hide();
		$(".ativar").show();
	}

	$("#edit-nome").val(nome);
	$("#edit-nome2").val(nome2);
	$("#horaInicioEdit").val(horaIni);
	$("#horaFimEdit").val(horaFim);
}

function formatarHoraParaAPI(hora) {
	if (/^\d{2}:\d{2}$/.test(hora)) {
		return hora + ":00";
	}
	return hora;
}

function converterHoraParaMinutos(hora) {
	var partes = hora.split(":");
	return parseInt(partes[0]) * 60 + parseInt(partes[1]);
}

function editar() {
	var objeto = {
		idTurno: Number(id),
		turno: $("#edit-nome").val(),
		mnemonico: $("#edit-nome2").val(),
		horaInicio: formatarHoraParaAPI($("#horaInicioEdit").val()),
		horaFim: formatarHoraParaAPI($("#horaFimEdit").val()),
		contaId: contaId,
	};

	var minutosInicio = converterHoraParaMinutos(objeto.horaInicio);
	var minutosFim = converterHoraParaMinutos(objeto.horaFim);

	if (minutosFim < minutosInicio) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "A hora de fim não pode ser menor que a hora de início.",
		});

		return
	}

	$.ajax({
		url: url_base + "/turno",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		$("#edit-nome").val("");
		$("#edit-nome2").val("");
		$("#horaInicioEdit").val("");
		$("#horaFimEdit").val("");
		getDados();
		showPage(currentPage);
		updatePagination();
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "turnos";
		});
	});
	return false;
}
$("#formEdit").on("submit", function(e) {
	e.preventDefault();
	editar();
	return false;
});
$("#formCadastro").on("submit", function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

function cadastrar() {
	var objeto = {
		turno: $("#cadastro-nome").val(),
		mnemonico: $("#cadastro-nome2").val(),
		horaInicio: formatarHoraParaAPI($("#horaInicio").val()),
		horaFim: formatarHoraParaAPI($("#horaFim").val()),
		contaId: contaId,
	};


	var minutosInicio = converterHoraParaMinutos(objeto.horaInicio);
	var minutosFim = converterHoraParaMinutos(objeto.horaFim);

	if (minutosFim < minutosInicio) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "A hora de fim não pode ser menor que a hora de início.",
		});

		return
	}

	$.ajax({
		url: url_base + "/turno",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		$("#cadastro-nome").val("");
		$("#cadastro-nome2").val("");
		$("#horaInicio").val("");
		$("#horaFim").val("");
		getDados();
		showPage(currentPage);
		updatePagination();
		showPage(currentPage);
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "turnos";
		});
	});
	return false;
}

function limpaCampo() {
	$("#cadastro-nome").val("");
	$("#cadastro-nome2").val("");
	$("#horaInicio").val("");
	$("#horaFim").val("");
}
