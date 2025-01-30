const contaId = localStorage.getItem("contaId");
var dados = [];
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var dadosOriginais = [];
var idDescr;
const id = params.get("id");
const idUsuario = localStorage.getItem("usuarioId");

$(document).ready(function () {
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
  $.ajax({
    url: url_base + `/cursoDescr/cursos/${id}/descricoes`,
    type: "GET",
    headers: {
      idConta: contaId,
    },
    success: function (data) {
      dados = data;
      dadosOriginais = data;
      listarDados(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
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
    .map(function (item) {
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
		  data-id="${item.idCursoDescr}" 
		  data-titulo="${item.titulo}" 
		  data-descricao="${item.descricao}" 
		  data-ordem="${item.ordem}" 
		  data-bs-toggle="modal" data-bs-target="#editItem">
		  <i class="fa-solid fa-pen fa-lg"></i>
		</button>` +
        `<button class="btn btn-danger px-3 btn-sm" onclick="remover(${item.idCursoDescr})">
		  <i class="fas fa-minus fa-lg"></i>
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
  var titulo = $(button).data("titulo");
  var descricao = $(button).data("descricao");
  var ordem = $(button).data("ordem");

  $("#tituloEdit").summernote("code", titulo);
  $("#descricaoEdit").summernote("code", descricao);
  $("#ordemEdit").val(ordem);
}

function remover(id) {
  console.log("Remover descrição com ID:", id);
  // Adicione aqui a lógica de remoção
}

function limpaCampo() {
  $("#descricao").val("");
  $("#titulo").val("");
  $("#ordem").val("");
  $("#descricaoEdit").val("");
  $("#tituloEdit").val("");
  $("#ordemEdit").val("");
}

$("#formCadastro").on("submit", function (e) {
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
    cursoId: id,
    usuarioId: idUsuario,
    titulo: titulo,
    descricao: descricao,
    ordem: parseInt(ordem),
  };

  $.ajax({
    url: url_base + `/cursoDescr`,
    type: "POST",
    headers: {
      idConta: contaId,
    },
    async: false,
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: function (response) {
      Swal.fire({
        title: "Cadastrado com sucesso!",
        icon: "success",
      }).then(() => {
        $("#formCadastro")[0].reset();
        getDados();
        showPage(currentPage);
        updatePagination();
      });
    },
    error: function (error) {
      Swal.fire({
        title: error.responseJSON.error,
        text: error.responseJSON.message,
        icon: "error",
      });
    },
  });
});

$("#formEdit").on("submit", function (e) {
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
    idCursoDescr: idDescr,
    contaId: contaId,
    cursoId: id,
    usuarioId: idUsuario,
    titulo: titulo,
    descricao: descricao,
    ordem: parseInt(ordem),
  };

  $.ajax({
    url: url_base + `/cursoDescr/cursos/descricao`,
    type: "PUT",
    headers: {
      idConta: contaId,
    },
    async: false,
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: function (response) {
      Swal.fire({
        title: "Editado com sucesso!",
        icon: "success",
      }).then(() => {
        $("#formEdit")[0].reset();
        getDados();
        showPage(currentPage);
        updatePagination();
      });
    },
    error: function (error) {
      Swal.fire({
        title: error.responseJSON.error,
        text: error.responseJSON.message,
        icon: "error",
      });
    },
  });
});
