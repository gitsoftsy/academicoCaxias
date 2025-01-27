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
      $("#nomeTurma").val(data.nomeTurma);
      $("#escola").val(`${data.escola.codigoInep} - ${data.escola.nomeEscola}`);
      $("#disciplina").val(
        `${data.gradeCurricular.disciplina.codDiscip} - ${data.gradeCurricular.disciplina.nome}`
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
        console.log(data.data);
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
  var provas = dados[0].lstProva;

  var headerHtml =
    "<tr>" +
    `
  <th scope="col" class="sortable border-end" data-column="aluno">
    <div class="d-flex align-items-center justify-content-between pe-2">
      <div class="col d-flex align-items-center justify-content-between">
        <span>Aluno</span>
        <i class="fas fa-sort me-3" style="color: #dddddd"></i>
      </div>
      <div class="dropdown-form">
        <div class="dropdown-toggle-form" id="dropdownButtonAluno">
          <i class="fas fa-search" style="color: #dddddd"></i>
        </div>
        <div class="dropdown-content-form rounded-3 dropdown-content-left" id="dropdownContentAluno">
          <input
            type="text"
            class="form-control mb-3 searchInput"
            placeholder="Digite o nome do aluno"
            id="searchAluno"
          />
          <button class="btn btn-sm col-12 btn-success searchButton" onclick="filtrarTabela('aluno')">
            Buscar
          </button>
        </div>
      </div>
    </div>
  </th>
  <th scope="col" class="sortable border-end" data-column="nomeCompleto">
    <div class="d-flex align-items-center justify-content-between pe-2">
      <div class="col d-flex align-items-center justify-content-between">
        <span>Nome</span>
        <i class="fas fa-sort me-3" style="color: #dddddd"></i>
      </div>
      <div class="dropdown-form">
        <div class="dropdown-toggle-form" id="dropdownButtonNome">
          <i class="fas fa-search" style="color: #dddddd"></i>
        </div>
        <div class="dropdown-content-form rounded-3 dropdown-content-left" id="dropdownContentNome">
          <input
            type="text"
            class="form-control mb-3 searchInput"
            placeholder="Digite o nome completo"
            id="searchNome"
          />
          <button class="btn btn-sm col-12 btn-success searchButton" onclick="filtrarTabela('nomeCompleto')">
            Buscar
          </button>
        </div>
      </div>
    </div>
  </th>
  ${provas.map((prova) => `<th>${prova.nomeAbreviado}</th>`).join("")}
  </tr>`;

  var bodyHtml = dados
    .map(function (item) {
      var provasHtml = item.lstProva
        .map(function (prova) {
          return (
            "<td>" +
            '<input type="text" class="form-control" id="prova-' +
            prova.idProva +
            '" value="' +
            (prova.nota !== null ? prova.nota : "") +
            '" style="width: 50px;" />' +
            "</td>"
          );
        })
        .join("");

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
        provasHtml +
        "</tr>"
      );
    })
    .join("");
  $("#cola-tabela").html(headerHtml + bodyHtml);
}