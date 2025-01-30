var dados = [];
const contaId = localStorage.getItem('contaId');;
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = ''
let id = ''

$(document).ready(function() {
	
	

	getDados()

	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});

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


	showPage(currentPage);
	updatePagination();

});


function getDados() {
	$.ajax({
		url: url_base + "/serie/conta/" + contaId,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dadosOriginais = data
			dados = data
			listarDados(data); $('input[data-toggle="toggle"]').bootstrapToggle(); $('input[data-toggle="toggle"]').bootstrapToggle();
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
				item.serie +
				"</td>" +
				"<td>" +
				item.descricao +
				"</td>" +
				"<td>" +
				'<input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idSerie +
				' " onChange="alteraStatus(this)" ' + (item.ativo === "S" ? "checked" : "") + ' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
				"</td>" +
				'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
				item.idSerie +
				'" data-nomeSerie="' +
				item.serie +
				'" data-descricao="' +
				item.descricao +
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

	$.ajax({
		url: url_base + `/serie/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e);
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).then(data => {
		getDados()
		showPage(currentPage)
		updatePagination()
	})
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	descricao = ref.getAttribute("data-descricao");

	console.log(ref.getAttribute("data-nomeSerie"))
	console.log(descricao)

	$('#nomeSerieEdit').val(ref.getAttribute("data-nomeSerie"));
	$('#descricaoEdit').val(descricao);
}

function editar() {
	var objeto = {
		idSerie: Number(id),
		serie: $('#nomeSerieEdit').val(),
		descricao: $('#descricaoEdit').val(),
		contaId: contaId
	}

	$.ajax({
		url: url_base + "/serie",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			}).then(result => {
				window.location.href = 'serie-matriz-curricular'
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
		serie: $('#nomeSerie').val(),
		descricao: $('#descricao').val(),
		contaId: contaId
	}

	$.ajax({
		url: url_base + "/serie",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			}).then(result => {
				window.location.href = 'serie-matriz-curricular'
			})
		})
	return false;
}

function limpaCampo() {
	$('#nomeSerie').val('');
	$('#descricao').val('');
}