var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 10;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";
const turmaId = params.get("turma");

$(document).ready(function () {
  getDados();

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {});

  $(".searchButton").click(function () {
    var searchInput = $(this)
      .siblings(".searchInput")
      .val()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    function normalizeAndCompare(value) {
      return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchInput);
    }

    filteredData = dadosOriginais.filter(function (item) {
      var columnValue = item[columnToSearch]
        ? item[columnToSearch].toString()
        : "";
      return normalizeAndCompare(columnValue);
    });

    listarDados(filteredData);
    $('input[data-toggle="toggle"]').bootstrapToggle();
    $(this).siblings(".searchInput").val("");
    $(this).closest(".dropdown-content-form").removeClass("show");
  });

  $(document).on("click", ".sortable .col", function () {
    var column = $(this).closest("th").data("column");
    var currentOrder = sortOrder[column] || "vazio";
    var newOrder;

    if (currentOrder === "vazio") {
      newOrder = "asc";
    } else if (currentOrder === "asc") {
      newOrder = "desc";
    } else {
      newOrder = "vazio";
    }

    $(".sortable span").removeClass("asc desc");
    $(this).find("span").addClass(newOrder);

    var icon = $(this).find("i");
    icon.removeClass("fa-sort-up fa-sort-down fa-sort");

    if (newOrder === "asc") {
      icon.addClass("fa-sort-up");
      sortData(column, newOrder);
    } else if (newOrder === "desc") {
      icon.addClass("fa-sort-down");
      sortData(column, newOrder);
    } else {
      icon.addClass("fa-sort");
      listarDados(dadosOriginais);
      $('input[data-toggle="toggle"]').bootstrapToggle();
      $('input[data-toggle="toggle"]').bootstrapToggle();
    }

    sortOrder[column] = newOrder;
  });

  function sortData(column, order) {
    var dadosOrdenados = dadosOriginais.slice();

    dadosOrdenados.sort(function (a, b) {
      var valueA = a[column].toString().toLowerCase();
      var valueB = b[column].toString().toLowerCase();
      if (order === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    listarDados(dadosOrdenados);
    $('input[data-toggle="toggle"]').bootstrapToggle();
  }

  showPage(currentPage);
  updatePagination();
});

$("#limpa-filtros").click(function () {
  currentPage = 1;
  dados = [...dadosOriginais];

  updatePagination();
  showPage(currentPage);

  $(".searchInput").val("");
  $('input[data-toggle="toggle"]').bootstrapToggle();
});

function getDados() {
  $.ajax({
    url: url_base + "/turma/" + turmaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      console.log(data)
      $("#nomeTurma").val(data.nomeTurma);
      $("#escola").val(`${data.codigoInep} - ${data.escola.nomeEscola}`);
      $("#disciplina").val(
        `${data.codDiscip} - ${data.gradeCurricular.disciplina.nome}`
      );
      $("#periodoLetivo").val(
        `${data.periodoLetivo.periodo} - ${data.periodoLetivo.descricao}`
      );
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/alunos/prova/listarAluno?idTurma=" + turmaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      if (
        data.message !=
        "Nenhum resultado encontrado para os parâmetros informados."
      ) {
        dados = data.data;
        dadosOriginais = data.data;
        listarDados(data.data);
        $('input[data-toggle="toggle"]').bootstrapToggle();
      } else {
        Swal.fire({
          title: "Nenhum aluno está matriculado a essa turma",
          icon: "info",
          confirmButtonText: `
    						 Matricular Alunos
  					`,
        }).then(() => {
          window.location.href = "matricula?turma=" + turmaId;
        });
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      return (
        "<tr>" +
        "<td style='cursor: pointer;'>" +
        '<a href="consulta-aluno?id=' +
        item.idAluno +
        '" style="text-decoration: underline;">' +
        item.aluno +
        "</a>" +
        "</td>" +
        "<td>" +
        item.nomeCompleto +
        "</td>" +
        "<td>" +
        item.nomeAbreviado +
        "</td>" +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela").html(html);
}