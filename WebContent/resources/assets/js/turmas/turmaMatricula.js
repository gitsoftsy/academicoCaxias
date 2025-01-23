var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
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

    // Função para normalizar e comparar valores
    function normalizeAndCompare(value) {
      return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchInput);
    }

    if (columnToSearch === "escolaId") {
      filteredData = dadosOriginais.filter(function (item) {
        var escola = escolas.find(function (school) {
          return school.idEscola === item.escolaId;
        });

        var nomeEscola = escola ? escola.nomeEscola : "";
        return normalizeAndCompare(nomeEscola);
      });
    } else if (columnToSearch === "anoVigente") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.anoVigente.toString() === searchInput;
      });
    } else {
      filteredData = dadosOriginais.filter(function (item) {
        var columnValue = item[columnToSearch]
          ? item[columnToSearch].toString()
          : "";
        return normalizeAndCompare(columnValue);
      });
    }

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
      if (column === "anoEscolarId") {
        var valueA = a.anoEscolar.anoEscolar.toLowerCase();
        var valueB = b.anoEscolar.anoEscolar.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "turnoId") {
        var valueA = a.turno.turno.toLowerCase();
        var valueB = b.turno.turno.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "modalidadeEscolaId") {
        var valueA = a.modalidadeEscola.modalidadeEscola.toLowerCase();
        var valueB = b.modalidadeEscola.modalidadeEscola.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "escolaId") {
        var escolaA = escolas.find(function (school) {
          return school.idEscola === a.escolaId;
        });
        var escolaB = escolas.find(function (school) {
          return school.idEscola === b.escolaId;
        });
        var nomeEscolaA = escolaA ? escolaA.nomeEscola.toLowerCase() : "";
        var nomeEscolaB = escolaB ? escolaB.nomeEscola.toLowerCase() : "";
        if (order === "asc") {
          return nomeEscolaA.localeCompare(nomeEscolaB);
        } else {
          return nomeEscolaB.localeCompare(nomeEscolaA);
        }
      } else {
        var valueA = a[column].toString().toLowerCase();
        var valueB = b[column].toString().toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
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
      $("#escola").val(data.escola.nomeEscola);
      $("#nomeTurma").val(data.nomeTurma);
      $("#periodoLetivo").val(
        `${data.periodoLetivo.periodo} - ${data.periodoLetivo.descricao}`
      );
      $("#turno").val(data.turno.turno);
      $("#disciplina").val(data.gradeCurricular.disciplina.nome);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
  $.ajax({
    url: url_base + "/turma/alunos?idTurma=" + turmaId,
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
        item.nomeCurso +
        "</td>" +
        "<td>" +
        item.situacaoAluno +
        "</td>" +
        "<td>" +
        item.tipoIngresso +
        "</td>" +
        "<td>" +
        item.tipoMatricula +
        "</td>" +
        '<td class="d-flex justify-content-center">' +
        '<span style="width:50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" ' +
        "data-id=" +
        item.idAluno +
        ' onclick="showModal(this)"><i class="fa-solid fa-gear"></i></span>' +
        " </td>" +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela").html(html);
}

function showModal(ref) {
  id = ref.getAttribute("data-id");
  window.location.href = "consulta-aluno?id=" + id;
}

// Exportar Dados

$("#exportar-excel").click(function () {
  var planilha = XLSX.utils.json_to_sheet(dados);

  var livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

  XLSX.writeFile(livro, "turmas.xlsx");
});

$("#btnMatricular").click(function () {
  window.location.href = "matricula?turma=" + turmaId;
});

