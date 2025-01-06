var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;

$(document).ready(function () {
  getDados();

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {
    $(this).siblings(".dropdown-content-form").toggleClass("show");
  });

  $(".searchButton").click(function () {
    var searchInput = $(this)
      .siblings(".searchInput")
      .val()
      .toLowerCase()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, ""); 

    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    if (columnToSearch === "turma") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.turma.numTurma
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchInput);
      });
    } else if (columnToSearch === "disciplina") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.disciplina.nome
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchInput);
      });
    } else if (columnToSearch === "curso") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.curso.nome
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchInput);
      });
    } else {
      filteredData = dadosOriginais.filter(function (item) {
        var value = item[columnToSearch]
          ? item[columnToSearch].toString().toLowerCase()
          : "";
        return value
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchInput);
      });
    }

    listarDados(filteredData);
    $('input[data-toggle="toggle"]').bootstrapToggle();
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
      if (column === "curso") {
        var valueA = a.curso.nome.toLowerCase();
        var valueB = b.curso.nome.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "curso") {
        var valueA = a.curso.nome.toLowerCase();
        var valueB = b.curso.nome.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "disciplina") {
        var valueA = a.disciplina.nome.toLowerCase();
        var valueB = b.disciplina.nome.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "turma") {
        var valueA = a.turma.numTurma.toLowerCase();
        var valueB = b.turma.numTurma.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "serie") {
        var valueA = parseFloat(a[column]);
        var valueB = parseFloat(b[column]);
        if (order === "asc") {
          return valueA - valueB;
        } else {
          return valueB - valueA;
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
    url: url_base + "/turmaDisciplina",
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
      console.error("Erro na solicitação AJAX:", jqXHR);
    });
}

function formatarDataParaBR(data) {
  var dataObj = new Date(data);
  var dia = String(dataObj.getDate()).padStart(2, "0");
  var mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  var ano = dataObj.getFullYear();
  return dia + "/" + mes + "/" + ano;
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      var ativo = "";

      if (item.ativo == "N") {
        ativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      return (
        "<tr>" +
        "<td>" +
        item.turma.numTurma +
        "</td>" +
        "<td>" +
        item.disciplina.nome +
        "</td>" +
        "<td>" +
        item.serie +
        "º série" +
        "</td>" +
        "<td>" +
        `${item.curso.nome} - ${item.curso.codCurso}` +
        "</td>" +
        "<td>" +
        item.situacao +
        "</td>" +
        "<td>" +
        item.nivelPresenca +
        "</td>" +
        "<td>" +
        ativo +
        "</td>" +
        '<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
        item.idTurmaDisciplina +
        '" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela").html(html);
}

// Exportar Dados

$("#exportar-excel").click(function () {
  var planilha = XLSX.utils.json_to_sheet(dados);

  var livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

  XLSX.writeFile(livro, "turmaDisciplina.xlsx");
});

// redirect para edicao
function editar(ref) {
  id = ref.getAttribute("data-id");
  window.location.href = "turmas-editar-disciplina?id=" + id;
}
