var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 10;
var currentPage = 1;
var pagesToShow = 5;
var id = "";
var dataFeriado = "";
var descricao = "";

const contaId = localStorage.getItem("contaId");

$(document).ready(function () {
  getDados();

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {});

  $(".searchButton").click(function () {
    var searchInput = $(this).siblings(".searchInput").val().toLowerCase();
    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    function removeAccents(str) {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }

    filteredData = dadosOriginais.filter(function (item) {
      var itemValue = item[columnToSearch]
        ? item[columnToSearch].toString()
        : "";
      return removeAccents(itemValue).includes(removeAccents(searchInput));
    });
    dados = filteredData;
    showPage(1);
    updatePagination();
    $('input[data-toggle="toggle"]').bootstrapToggle();
    $(this).siblings(".searchInput").val("");
    $(this).closest(".dropdown-content-form").removeClass("show");
  });


  $(".checkbox-toggle").each(function () {
    var status = $(this).data("status");
    if (status !== "S") {
      $(this).prop("checked", false);
    }
  });

  showPage(currentPage);
  updatePagination();
});

$("#limpa-filtros").click(function () {
  listarDados(dadosOriginais);
  $('input[data-toggle="toggle"]').bootstrapToggle();
  $('input[data-toggle="toggle"]').bootstrapToggle();

  $(".searchInput").val("");
});

function getDados() {
  $.ajax({
    url: url_base + "/feriadosConta",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dados = data;
      dadosOriginais = data;
      listarDados(data);
      $('input[data-toggle="toggle"]').bootstrapToggle();
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      // Formatar a data
      const dataFeriado = item.dataFeriado;
      const [ano, mes, dia] = dataFeriado.split("-");
      const dataFormatada = `${dia}/${mes}/${ano}`;

      // Definir o estado inicial do checkbox
      const isChecked = item.ativo === "S" ? "checked" : "";

      return (
        "<tr>" +
        "<td>" +
        dataFormatada +
        "</td>" +
        "<td>" +
        item.descricao +
        "</td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        '<input type="checkbox" data-status="' +
        item.ativo +
        '" data-id="' +
        item.idFeriadoConta +
        '" onChange="alteraStatus(this)" ' +
        isChecked +
        ' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
        "</div></td>" +
        '<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm"' +
        ' data-id="' +
        item.idFeriadoConta +
        '" data-descricao="' +
        item.descricao +
        '" data-dataFeriado="' +
        item.dataFeriado +
        '" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
        "</tr>"
      );
    })
    .join("");

  // Inserir o HTML gerado na tabela
  $("#cola-tabela").html(html);

  // Reaplicar a estilização do toggle
}

function alteraStatus(element) {
  var id = element.getAttribute("data-id");
  var status = element.getAttribute("data-status");

  if (status === "S") {
    element.setAttribute("data-status", "N");
  } else {
    element.setAttribute("data-status", "S");
  }

  $.ajax({
    url:
      url_base +
      `/feriadosConta/${id}${status === "S" ? "/desativar" : "/ativar"}`,
    type: "put",
    error: function (e) {
      Swal.close();
      console.log(e.responseJSON);
      Swal.fire({
        icon: "error",
        title: e.responseJSON.message,
      });
    },
  }).then((data) => {
    window.location.href = "feriado-conta";
  });
}

// Exportar Dados

$("#exportar-excel").click(function () {
  var planilha = XLSX.utils.json_to_sheet(dados);

  var livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

  XLSX.writeFile(livro, "diasSemana.xlsx");
});

// Abrir modal

function showModal(ref) {
  id = ref.getAttribute("data-id");
  dataFeriado = ref.getAttribute("data-dataFeriado");
  descricao = ref.getAttribute("data-descricao");

  $("#dataFeriadoEdit").val(dataFeriado);
  $("#descricaoEdit").val(descricao);
}

function formatarDataParaAPI(data) {
  // Usar UTC para evitar problemas de fuso horário
  var year = data.getUTCFullYear();
  var month = ("0" + (data.getUTCMonth() + 1)).slice(-2);
  var day = ("0" + data.getUTCDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

// Editar

function editar() {
  const dataFeriado = new Date($("#dataFeriadoEdit").val());

  const dataFormatada = formatarDataParaAPI(dataFeriado);

  var objeto = {
    idFeriadoConta: id,
    descricao: $("#descricaoEdit").val(),
    contaId: contaId,
    dataFeriado: dataFormatada,
  };

  console.log(objeto);

  $.ajax({
    url: url_base + "/feriadosConta",
    type: "PUT",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível realizar esse comando!",
      });
    },
  }).done(function (data) {
    $("#dataFeriadoEdit").val("");
    $("#descricaoEdit").val("");

    getDados();
    showPage(currentPage);
    updatePagination();
    Swal.fire({
      title: "Editado com sucesso",
      icon: "success",
    }).then(() => {
      window.location.href = "feriado-conta";
    });
  });

  return false;
}

$("#formEdit").on("submit", function (e) {
  e.preventDefault();
  editar();
  return false;
});

// Cadastrar

function cadastrar() {
  const dataFeriado = new Date($("#dataFeriado").val());

  const dataFormatada = formatarDataParaAPI(dataFeriado);

  var objeto = {
    descricao: $("#descricao").val(),
    contaId: contaId,
    dataFeriado: dataFormatada,
  };

  console.log(objeto);

  $.ajax({
    url: url_base + "/feriadosConta",
    type: "POST",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível realizar esse comando!",
      });
    },
  }).done(function () {
    $("#turmaId").val("");
    $("#horaInicio").val("");
    $("#horaFim").val("");
    $("#diaSemana").val("");
    getDados();
    showPage(currentPage);
    updatePagination();
    Swal.fire({
      title: "Cadastrado com sucesso",
      icon: "success",
    }).then(() => {
      window.location.href = "feriado-conta";
    });
  });
  return false;
}

$("#formCadastro").on("submit", function (e) {
  e.preventDefault();
  cadastrar();
  return false;
});

// Limpa input

function limpaCampo() {
  $("#descricao").val("");
  $("#dataFeriado").val("");
}
