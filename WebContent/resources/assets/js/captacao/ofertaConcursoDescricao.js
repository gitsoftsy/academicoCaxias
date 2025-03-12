var dadosOriginais = [];
const contaId = localStorage.getItem("contaId");
var dados = [];
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var dados = [];
var idDescr;
const queryStringURL = window.location.search;
const parametros = new URLSearchParams(queryStringURL)
const id = parametros.get("id");
const idUsuario = localStorage.getItem("usuarioId");

$(document).ready(function() {
	$("#titulo, #descricao, #tituloEdit, #descricaoEdit").summernote({
		height: 50,
		placeholder: "Digite aqui...",
		toolbar: [
			["style", ["bold", "italic", "underline", "clear"]],
			["para", ["ul", "ol", "paragraph"]],
			["insert", ["link"]],
		],
	});

	getDados();
	showPage(currentPage);
	updatePagination();
});

function getDados() {
	console.log(`/ofertaConcursoDescr/ofertas/${id}/descricoes`)
	$.ajax({
		url: url_base + `/ofertaConcursoDescr/ofertas/${id}/descricoes`,
		type: "GET",
		headers: {
			idConta: contaId,
		},
		success: function(data) {
			console.log(data)
			dados = data;
			dadosOriginais = data;
			listarDados(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", jqXHR);
			Swal.fire({
				title: "Falha na requisição.",
				icon: "error",
			});
		},
	});
}

function listarDados(dados) {
	dados.sort((a, b) => a.ordem - b.ordem);

	var html = dados
		.map(function(item) {
			var descricao = item.descricao.replace(/<\/?[^>]+(>|$)/g, "");
			descricao =
				descricao.length > 50 ? descricao.substring(0, 50) + "..." : descricao;
			var titulo = item.titulo.replace(/<\/?[^>]+(>|$)/g, "");
			titulo = titulo.length > 50 ? titulo.substring(0, 50) + "..." : titulo;

			return (
				`<tr>` +
				`<td>${item.ordem}</td>` +
				`<td>${titulo}</td>` +
				`<td>${descricao}</td>` +
				`<td class="d-flex justify-content-center">` +
				`<button onclick="editar(this)" class="btn btn-warning px-3 btn-sm me-2 btn-editar" 
		  data-id="${item.idOfertaConcursoDescr}" 
		  data-bs-toggle="modal" data-bs-target="#editItem">
		  <i class="fa-solid fa-pen fa-lg"></i>
		</button>` +
				`<button class="btn btn-danger px-3 btn-sm" onclick="removerDescricao(${item.idOfertaConcursoDescr})">
		  <i class="fas fa-trash fa-lg"></i>
		</button>` +
				`</td>` +
				`</tr>`
			);
		})
		.join("");

	$("#cola-tabela").html(html);
}

function editar(button) {
	limpaCampo();
	idDescr = $(button).data("id");

	$.ajax({
		url: url_base + `/ofertaConcursoDescr/ofertas/descricoes/${idDescr}`,
		type: "GET",
		headers: {
			idConta: contaId,
		},
		success: function(data) {
			$("#tituloEdit").summernote("code", data.titulo);
			$("#descricaoEdit").summernote("code", data.descricao);
			$("#ordemEdit").val(data.ordem);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", jqXHR);
			Swal.fire({
				title: "Falha na requisição.",
				icon: "error",
			});
		},
	});


}

function removerDescricao(id) {
	$.ajax({
		url: url_base + `/ofertaConcursoDescr/ofertas/descricao/${id}`,
		type: "DELETE",
		headers: {
			idConta: contaId,
		},
		async: false,
		success: function(response) {
			Swal.fire({
				title: "Removido com sucesso!",
				icon: "success",
			}).then(() => {
				getDados();
				showPage(currentPage);
				updatePagination();
			});
		},
		error: function(error) {
			Swal.fire({
				title: error.responseJSON.error,
				text: error.responseJSON.message,
				icon: "error",
			});
		},
	});
}

function limpaCampo() {
	$("#descricao").summernote("code", "");
	$("#titulo").summernote("code", "");
	$("#ordem").val("");
	$("#descricaoEdit").summernote("code", "");
	$("#tituloEdit").summernote("code", "");
	$("#ordemEdit").val("");
}

$("#formCadastro").on("submit", function(e) {
	e.preventDefault();
	let titulo = $("#titulo").summernote("code");
	let descricao = $("#descricao").summernote("code");
	let ordem = $("#ordem").val();

	if (!titulo || !descricao || !ordem) {
		Swal.fire({
			title: "Erro!",
			text: "Todos os campos são obrigatórios.",
			icon: "error",
		});
		return;
	}

	let formData = {
		contaId: contaId,
		ofertaConcursoId: id,
		usuarioId: idUsuario,
		titulo: titulo,
		descricao: descricao,
		ordem: parseInt(ordem),
	};

	$.ajax({
		url: url_base + `/ofertaConcursoDescr`,
		type: "POST",
		headers: {
			idConta: contaId,
		},
		async: false,
		contentType: "application/json",
		data: JSON.stringify(formData),
		success: function(response) {
			Swal.fire({
				title: "Cadastrado com sucesso!",
				icon: "success",
			}).then(() => {
				$("#formCadastro")[0].reset();
				getDados();
				showPage(currentPage);
				updatePagination();
			});
			limpaCampo()
		},
		error: function(error) {
			console.log(error)
			Swal.fire({
				title: error.responseJSON.error,
				text: error.responseJSON.message,
				icon: "error",
			});
			limpaCampo()
		},
	});
});

$("#formEdit").on("submit", function(e) {
	e.preventDefault();
	let titulo = $("#tituloEdit").summernote("code");
	let descricao = $("#descricaoEdit").summernote("code");
	let ordem = $("#ordemEdit").val();

	if (!titulo || !descricao || !ordem) {
		Swal.fire({
			title: "Erro!",
			text: "Todos os campos são obrigatórios.",
			icon: "error",
		});
		return;
	}

	let formData = {
		idOfertaConcursoDescr: idDescr,
		contaId: contaId,
		ofertaConcursoId: id,
		usuarioId: idUsuario,
		titulo: titulo,
		descricao: descricao,
		ordem: parseInt(ordem),
	};

	$.ajax({
		url: url_base + `/ofertaConcursoDescr/ofertas/descricao`,
		type: "PUT",
		headers: {
			idConta: contaId,
		},
		async: false,
		contentType: "application/json",
		data: JSON.stringify(formData),
		success: function(response) {
			Swal.fire({
				title: "Editado com sucesso!",
				icon: "success",
			}).then(() => {
				$("#formEdit")[0].reset();
				getDados();
				showPage(currentPage);
				updatePagination();
			});
			limpaCampo()
		},
		error: function(error) {
			Swal.fire({
				title: error.responseJSON.error,
				text: error.responseJSON.message,
				icon: "error",
			});
			limpaCampo()
		},
	});
});
