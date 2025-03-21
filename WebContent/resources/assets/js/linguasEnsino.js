var id = '';
var nome = '';
var isIndigena = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var valorIndigena = '';
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
		url: url_base + `/linguaEnsino/conta/${contaId}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			listarDados(data);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function listarDados(dados) {
	var html = dados.map(function(item) {
		if (item.ativo == 'N') {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}
		if (item.linguaIndigena == 'N') {
			isIndigena = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			isIndigena = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}
		return (


			"<tr>" +
			"<td>" +
			item.linguaEnsino +
			"</td>" +
			"<td>" +
			isIndigena +
			"</td>" +
			"<td>" +
			ativo +
			"</td>" +
			'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idLinguaEnsino +
			'" data-nome="' +
			item.linguaEnsino +
			'" data-indigena="' +
			item.linguaIndigena +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html); 
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	nome = ref.getAttribute("data-nome");
	valorIndigena = ref.getAttribute("data-indigena");
	console.log(valorIndigena)
	if (valorIndigena === 'S') {
		$('#editIsIndigenaS').prop('checked', true);
	} else if (valorIndigena === 'N') {
		$('#editIsIndigenaN').prop('checked', true);
	}

	$.ajax({
		url: url_base + "/linguaEnsino/" + id,
		type: "GET",
		async: false,
	}).done(function(data) {
		if (data.ativo == "S") {
			$(".ativar").hide();
			$(".desativar").show()
		}
		else {
			$(".desativar").hide();
			$(".ativar").show();
		}


		$('#edit-nome').val(nome);
	})
}


function editar() {
	var objeto = {
		idLinguaEnsino: Number(id),
		linguaEnsino: $('#edit-nome').val(),
		linguaIndigena: $('input[name="editIsIndigena"]:checked').val(),
		contaId: contaId
	}

	$.ajax({
		url: url_base + "/linguaEnsino",
		type: "PUT",
		data: JSON.stringify(objeto),
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
	})
		.done(function(data) {
			$('#edit-nome').val('');
			$('input[name="editIsIndigena"]').prop('checked', false);
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
		linguaEnsino: $('#cadastro-nome').val(),
		linguaIndigena: $('input[name="isIndigena"]:checked').val(),
		contaId: contaId
	}
		

	$.ajax({
		url: url_base + "/linguaEnsino",
		type: "POST",
		data: JSON.stringify(objeto),
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
	})
		.done(function(data) {
			$('#cadastro-nome').val('');
			$('input[name="isIndigena"]').prop('checked', false);
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
	$('input[name="isIndigena"]').prop('checked', false);
}