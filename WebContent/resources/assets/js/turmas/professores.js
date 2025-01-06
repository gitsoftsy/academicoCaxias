var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var itens = [];
var id = "";
var idDisciplina = "";
var idProfessor = "";

$(document).ready(function () {
  $.ajax({
    url: url_base + "/professores",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      itens = data;
      $.each(data, function (index, item) {
        $("#professorId").append(
          $("<option>", {
            value: item.idProfessor,
            text: item.pessoa.nome,
            name: item.pessoa.nome,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#professorIdEdit").append(
          $("<option>", {
            value: item.idProfessor,
            text: item.pessoa.nome,
            name: item.pessoa.nome,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/turmaDisciplina",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $.each(data, function (index, item) {
        $("#turmaDisciplinaId").append(
          $("<option>", {
            value: item.idTurmaDisciplina,
            text: item.disciplina.nome,
            name: item.disciplina.nome,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#turmaDisciplinaIdEdit").append(
          $("<option>", {
            value: item.idTurmaDisciplina,
            text: item.disciplina.nome,
            name: item.disciplina.nome,
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
    var searchInput = $(this)
      .siblings(".searchInput")
      .val()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remove os sinais diacríticos (acentos)

    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    if (columnToSearch === "turmaDisciplina") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.turmaDisciplina.disciplina.nome
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchInput);
      });
    } else if (columnToSearch === "professorId") {
      filteredData = dadosOriginais.filter(function (item) {
        var nome1 = itens.find(function (school) {
          return school.idProfessor === item.professorId;
        });
        var nomeItem = nome1 ? nome1.pessoa.nome.toLowerCase() : "";
        return nomeItem
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
      if (column === "turmaDisciplina") {
        var valueA = a.turmaDisciplina.disciplina.nome.toLowerCase();
        var valueB = b.turmaDisciplina.disciplina.nome.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "professorId") {
        var escolaA = itens.find(function (school) {
          return school.idProfessor === a.professorId;
        });
        var escolaB = itens.find(function (school) {
          return school.idProfessor === b.professorId;
        });
        var nomeEscolaA = escolaA ? escolaA.pessoa.nome.toLowerCase() : "";
        var nomeEscolaB = escolaB ? escolaB.pessoa.nome.toLowerCase() : "";
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
    url: url_base + "/turmaProfessor",
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
      var professor = itens.find(function (ref) {
        return ref.idProfessor === item.professorId;
      });

      var nomeProf = professor
        ? professor.pessoa.nome
        : "Professor não encontrado";
      var tipoP = "";
      var tipoV = "";

      if (item.tipoProfessor == "T") {
        tipoP = "Titular";
      } else {
        tipoP = "Assistente";
      }

      if (item.tipoProfessor == "T") {
        tipoV = "Titular";
      } else {
        tipoV = "Assistente";
      }

      return (
        "<tr>" +
        "<td>" +
        item.turmaDisciplina.disciplina.nome +
        "</td>" +
        "<td>" +
        nomeProf +
        "</td>" +
        "<td>" +
        tipoP +
        "</td>" +
        "<td>" +
        tipoV +
        "</td>" +
        '<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id2="' +
        item.professorId +
        '" data-id="' +
        item.idTurmaProfessor +
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

  XLSX.writeFile(livro, "professores.xlsx");
});

// Abrir modal
function showModal(ref) {
  id = ref.getAttribute("data-id");
  idProfessor = ref.getAttribute("data-id2");

  $.ajax({
    url: url_base + "/turmaProfessor/professor/" + idProfessor,
    type: "GET",
    async: false,
    error: function (e) {
      console.log(e.responseJSON.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível realizar esse comando!",
      });
    },
  }).done(function (ref) {
    $("#turmaDisciplinaIdEdit")
      .val(ref[0].turmaDisciplina.disciplina.idDisciplina)
      .attr("selected", true);
    $("#professorIdEdit").val(ref[0].professorId).attr("selected", true);
    $("#tipoProfessorEdit").val(ref[0].tipoProfessor).attr("selected", true);
    $("#tipoVagaEdit").val(ref[0].tipoVaga).attr("selected", true);
  });
}

// Editar
function editar() {
  var objeto = {
    idTurmaProfessor: id,
    turmaDisciplinaId: $("#turmaDisciplinaIdEdit").val(),
    professorId: $("#professorIdEdit").val(),
    tipoProfessor: $("#tipoProfessorEdit").val(),
    tipoVaga: $("#tipoVagaEdit").val(),
  };

  $.ajax({
    url: url_base + "/turmaProfessor",
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
    $("#turmaDisciplinaIdEdit").val(""),
      $("#professorIdEdit").val(""),
      $("#tipoProfessorEdit").val(""),
      $("#tipoVagaEdit").val("");
    getDados();
    showPage(currentPage);
    updatePagination();
    Swal.fire({
      title: "Editado com sucesso",
      icon: "success",
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
  var objeto = {
    turmaDisciplinaId: $("#turmaDisciplinaId").val(),
    professorId: $("#professorId").val(),
    tipoProfessor: $("#tipoProfessor").val(),
    tipoVaga: $("#tipoVaga").val(),
  };

  $.ajax({
    url: url_base + "/turmaProfessor",
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
    getDados();
    showPage(currentPage);
    updatePagination();
    Swal.fire({
      title: "Cadastrado com sucesso",
      icon: "success",
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
  $("#turmaDisciplinaId").val("");
  $("#professorId").val("");
  $("#tipoProfessor").val("");
  $("#tipoVaga").val("");
}
