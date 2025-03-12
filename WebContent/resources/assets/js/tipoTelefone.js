var dados = [];
const contaId = localStorage.getItem("contaId");
var nome = "";
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
var dadosOriginais = [];

$(document).ready(function () {
  // Carrega os dados ao iniciar a página
  $.ajax({
    url: url_base + "/tipoTelefone",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dados = data; // Armazena os dados na variável global
      dadosOriginais = data;	  
      listarDados(dados); // Lista todos os dados inicialmente
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  // Escuta o evento de input para busca
  $("#inputBusca").on("input", function () {
    var valorBusca = $(this).val().toLowerCase();
    realizarBusca(valorBusca);
  });

  showPage(currentPage); // Exibe a página inicial
  updatePagination(); // Atualiza a paginação
});

function realizarBusca(valorInput) {
  if (valorInput === "") {
    listarDados(dados); // Se não houver busca, exibe todos os dados
    showPage(currentPage); // Volta para a página atual
  } else {
    // Filtra os dados em memória com base no input de busca
    var resultadosFiltrados = dados.filter(function (item) {
      return item.tipoTelefone.toLowerCase().includes(valorInput);
    });
    listarDados(resultadosFiltrados); // Exibe os resultados filtrados
  }
}

// Função para listar os dados na tabela
function listarDados(data) {
  var html = data
    .map(function (item) {
      var ativo = item.ativo === "N"
        ? '<i style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
        : '<i style="color:#2eaa3a" class="fa-solid iconeTabela fa-circle-check"></i> Sim';

      return (
        `<tr>
          <td>${item.tipoTelefone}</td>
          <td class="d-flex justify-content-center">
            <span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" 
              class="btn btn-warning btn-sm" 
              data-id="${item.idTipoTelefone}" 
              data-nome="${item.tipoTelefone}" 
              onclick="showModal(this)" 
              data-bs-toggle="modal" 
              data-bs-target="#editAto">
              <i class="fa-solid fa-pen fa-lg"></i>
            </span>
          </td>
        </tr>`
      );
    })
    .join("");

  $("#cola-tabela").html(html); // Atualiza a tabela com os dados
}

function showModal(ref) {
  id = ref.getAttribute("data-id");
  nome = ref.getAttribute("data-nome");
  $("#edit-nome").val(nome);
}

// Função para editar um item
function editar() {
  var objeto = {
    idTipoTelefone: Number(id),
    tipoTelefone: $("#edit-nome").val(),
    contaId: contaId,
  };

  $.ajax({
    url: url_base + "/tipoTelefone",
    type: "PUT",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível realizar esse comando!",
      });
    },
  }).done(function (data) {
    $("#edit-nome").val("");
    recarregarDados();
    showPage(currentPage);
    updatePagination();
    Swal.fire({
      title: "Editado com sucesso",
      icon: "success",
    });
  });
  return false;
}

// Evento para submissão do formulário de edição
$("#formEdit").on("submit", function (e) {
  e.preventDefault();
  editar();
  return false;
});

// Evento para submissão do formulário de cadastro
$("#formCadastro").on("submit", function (e) {
  e.preventDefault();
  cadastrar();
  return false;
});

// Função para cadastrar um novo item
function cadastrar() {
  var objeto = {
    tipoTelefone: $("#cadastro-nome").val(),
    contaId: contaId,
  };

  $.ajax({
    url: url_base + "/tipoTelefone",
    type: "POST",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível realizar esse comando!",
      });
    },
  }).done(function (data) {
    $("#cadastro-nome").val("");
    recarregarDados();
    showPage(currentPage);
    updatePagination();
    Swal.fire({
      title: "Cadastrado com sucesso",
      icon: "success",
    });
  });
  return false;
}

// Função para recarregar os dados após edição ou cadastro
function recarregarDados() {
  $.ajax({
    url: url_base + "/tipoTelefone",
    type: "GET",
    async: false,
  }).done(function (data) {
    dados = data; // Atualiza os dados em memória
    dadosOriginais = data	
    listarDados(dados); // Exibe os dados atualizados
    showPage(currentPage); // Volta para a página atual
    updatePagination(); // Atualiza a paginação
    $('input[data-toggle="toggle"]').bootstrapToggle();
  });
}

// Função para limpar campos de entrada
function limpaCampo() {
  $("#cadastro-nome").val("");
  $("#edit-nome").val("");
}
