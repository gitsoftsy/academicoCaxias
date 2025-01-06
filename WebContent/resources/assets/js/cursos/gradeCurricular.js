var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var cursos = [];
var id = "";
var ativo = "";
var retemSerie = "";
var obrigatoria = "";

$(document).ready(function () {
  $.ajax({
    url: url_base + "/cursoSerie",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $.each(data, function (index, item) {
        $("#cursoSerieIdEdit").append(
          $("<option>", {
            value: item.idCursoSerie,
            text: item.serie + "º série",
            name: item.serie,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#cursoSerieId").append(
          $("<option>", {
            value: item.idCursoSerie,
            text: item.serie + "º série",
            name: item.serie,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/turno",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $.each(data, function (index, item) {
        $("#turnoIdEdit").append(
          $("<option>", {
            value: item.idTurno,
            text: item.turno,
            name: item.turno,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#turnoId").append(
          $("<option>", {
            value: item.idTurno,
            text: item.turno,
            name: item.turno,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/disciplina",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $.each(data, function (index, item) {
        $("#disciplinaIdEdit").append(
          $("<option>", {
            value: item.idDisciplina,
            text: item.nome,
            name: item.nome,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#disciplinaId").append(
          $("<option>", {
            value: item.idDisciplina,
            text: item.nome,
            name: item.nome,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/curriculo",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $.each(data, function (index, item) {
        $("#curriculoIdEdit").append(
          $("<option>", {
            value: item.idCurriculo,
            text: item.curriculo,
            name: item.curriculo,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#curriculoId").append(
          $("<option>", {
            value: item.idCurriculo,
            text: item.curriculo,
            name: item.curriculo,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  getDados();

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {
    $(this).siblings(".dropdown-content-form").toggleClass("show");
  });

  $(".searchButton").click(function () {
    function normalizeString(str) {
      return str
        ? str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";
    }

    // Captura o valor da pesquisa e normaliza
    var searchInput = normalizeString($(this).siblings(".searchInput").val());

    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    if (columnToSearch === "disciplina") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item.disciplina.nome).includes(searchInput);
      });
    } else if (columnToSearch === "curriculo") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item.curriculo.curriculo).includes(searchInput);
      });
    } else {
      filteredData = dadosOriginais.filter(function (item) {
        var columnValue = normalizeString(
          item[columnToSearch]?.toString() || ""
        );
        return columnValue.includes(searchInput);
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
      if (column === "turno") {
        var valueA = a.turno.turno.toLowerCase();
        var valueB = b.turno.turno.toLowerCase();
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
      } else if (column === "curriculo") {
        var valueA = a.curriculo.curriculo.toLowerCase();
        var valueB = b.curriculo.curriculo.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "cursoSerie") {
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
    url: url_base + "/gradeCurricular",
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
      if (item.ativo == "N") {
        ativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      if (item.retemSerie == "N") {
        retemSerie =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        retemSerie =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      if (item.obrigatoria == "N") {
        obrigatoria =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        obrigatoria =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      return (
        "<tr>" +
        "<td>" +
        item.cursoSerie.serie +
        "º série" +
        "</td>" +
        "<td>" +
        item.turno.turno +
        "</td>" +
        "<td>" +
        item.disciplina.nome +
        "</td>" +
        "<td>" +
        item.curriculo.curriculo +
        "</td>" +
        "<td>" +
        obrigatoria +
        "</td>" +
        "<td>" +
        retemSerie +
        "</td>" +
        "<td>" +
        ativo +
        "</td>" +
        '<td class="d-flex justify-content-center"><span style="width: 80%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
        item.idGradeCurricular +
        '" data-ativo="' +
        item.ativo +
        '"  onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
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

  XLSX.writeFile(livro, "gradeCurricular.xlsx");
});

// Abrir modal
function showModal(ref) {
  id = ref.getAttribute("data-id");
  ativo = ref.getAttribute("data-ativo");

  if (ativo == "S") {
    $(".ativar").hide();
    $(".desativar").show();
  } else {
    $(".desativar").hide();
    $(".ativar").show();
  }

  $.ajax({
    url: url_base + "/gradeCurricular/" + id,
    type: "GET",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#cursoSerieIdEdit")
      .val(data.cursoSerie.idCursoSerie)
      .attr("selected", true);
    $("#turnoIdEdit").val(data.turno.idTurno).attr("selected", true);
    $("#disciplinaIdEdit")
      .val(data.disciplina.idDisciplina)
      .attr("selected", true);
    $("#curriculoIdEdit")
      .val(data.curriculo.idCurriculo)
      .attr("selected", true);

    if (data.obrigatoria === "S") {
      $('input[id="obrigatoriaSEdit"]').prop("checked", true);
    } else {
      $('input[id="obrigatoriaNEdit"]').prop("checked", true);
    }

    if (data.retemSerie === "S") {
      $('input[id="retemSerieSEdit"]').prop("checked", true);
    } else {
      $('input[id="retemSerieNEdit"]').prop("checked", true);
    }
  });
}

// Editar

function editar() {
  var objeto = {
    idGradeCurricular: id,
    cursoSerieId: $("#cursoSerieIdEdit").val(),
    turnoId: $("#turnoIdEdit").val(),
    disciplinaId: $("#disciplinaIdEdit").val(),
    curriculoId: $("#curriculoIdEdit").val(),
    obrigatoria: $('input[name="obrigatoriaEdit"]:checked').val(),
    retemSerie: $('input[name="retemSerieEdit"]:checked').val(),
  };

  $.ajax({
    url: url_base + "/gradeCurricular",
    type: "PUT",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#cursoSerieIdEdit").val("");
    $("#turnoIdEdit").val("");
    $("#disciplinaIdEdit").val("");
    $("#curriculoIdEdit").val("");
    $('input[name="obrigatoriaEdit"]:checked').prop("checked", false);
    $('input[name="retemSerieEdit"]:checked').prop("checked", false);

    getDados();
    showPage(currentPage);
    updatePagination();
    alert("Editado com Sucesso!");
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
  var objeto = {
    cursoSerieId: $("#cursoSerieId").val(),
    turnoId: $("#turnoId").val(),
    disciplinaId: $("#disciplinaId").val(),
    curriculoId: $("#curriculoId").val(),
    obrigatoria: $('input[name="obrigatoria"]:checked').val(),
    retemSerie: $('input[name="retemSerie"]:checked').val(),
  };

  $.ajax({
    url: url_base + "/gradeCurricular",
    type: "POST",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    $("#cursoSerieId").val("");
    $("#turnoId").val("");
    $("#disciplinaId").val("");
    $("#curriculoId").val("");
    $('input[name="obrigatoria"]').prop("checked", false);
    $('input[name="retemSerie"]').prop("checked", false);
    getDados();
    showPage(currentPage);
    updatePagination();
    alert("Cadastrado com Sucesso!");
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
  $("#cursoSerieId").val("");
  $("#turnoId").val("");
  $("#disciplinaId").val("");
  $("#curriculoId").val("");
  $('input[name="obrigatoria"]').prop("checked", false);
  $('input[name="retemSerie"]').prop("checked", false);
}
