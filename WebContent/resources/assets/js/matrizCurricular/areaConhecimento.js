var dados = [];
var id = '';
var nome = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
const contaId = localStorage.getItem('contaId')

$(document).ready(function() {

	getDados()

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
		url: url_base + "/areaConhecimento",
		type: "GET",
		async: false,
	})
		.done(function(data) {
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
			console.log(item)

			return (
				"<tr>" +
				"<td>" +
				item.areaConhecimento +
				"</td>" +
				'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
				item.idAreaConhecimento +
				'" data-nome="' +
				item.areaConhecimento +
				'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		}).join("");

		$("#cola-tabela").html(html);
	}
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	nome = ref.getAttribute("data-nome");
	$('#edit-nome').val(nome);
}

function editar() {

	var objeto = {
		idAreaConhecimento: Number(id),
		areaConhecimento: $('#edit-nome').val(),
		"contaId": Number(contaId)
		//dependenciaAdmId:  $('#dependenciaAdmIdEdit').val()
	}

	$.ajax({
		url: url_base + "/areaConhecimento",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(objeto)
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
		areaConhecimento: $('#cadastro-nome').val(),
		"contaId": Number(contaId)
	}

	$.ajax({
		url: url_base + "/areaConhecimento",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(objeto)
			console.log(e)
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Essa área de conhecimento já existe!",

			});
		}
	})
		.done(function(data) {
			$('#cadastro-nome').val('');
			getDados();
			showPage(currentPage);
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
	$('#edit-nome').val('');
}