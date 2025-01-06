var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var professores = [];
var id = "";
var idProfessor = "";

$(document).ready(function () {
  var anoConclusaoEdit = document.getElementById("anoConclusaoEdit");
  var anoConclusao = document.getElementById("anoConclusao");
  var anoAtual = new Date().getFullYear();

  var anosRetroativos = anoAtual - 2000;
  var anosFuturos = 0;

  var anoInicial = anoAtual + anosFuturos;
  var anoFinal = anoAtual - anosRetroativos;

  for (var i = anoInicial; i >= anoFinal; i--) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    anoConclusao.appendChild(option);
  }
  for (var i = anoInicial; i >= anoFinal; i--) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    anoConclusaoEdit.appendChild(option);
  }

  $.ajax({
    url: url_base + "/professores",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      professores = data;
      $.each(data, function (index, item) {
        $("#professorIdEdit").append(
          $("<option>", {
            value: item.idProfessor,
            text: item.pessoa.nome,
            name: item.pessoa.nome,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#professorId").append(
          $("<option>", {
            value: item.idProfessor,
            text: item.pessoa.nome,
            name: item.pessoa.nome,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", jqXHR);
    });

  $.ajax({
    url: url_base + "/modalidadeEscola",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $.each(data, function (index, item) {
        $("#modalidadeEscolaId").append(
          $("<option>", {
            value: item.idModalidadeEscola,
            text: item.modalidadeEscola,
            name: item.modalidadeEscola,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#modalidadeEscolaIdEdit").append(
          $("<option>", {
            value: item.idModalidadeEscola,
            text: item.modalidadeEscola,
            name: item.modalidadeEscola,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", jqXHR);
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
      .replace(/[\u0300-\u036f]/g, "");

    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    if (columnToSearch === "modalidadeEscola") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.modalidadeEscola.modalidadeEscola
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchInput);
      });
    } else if (columnToSearch === "professorId") {
      filteredData = dadosOriginais.filter(function (item) {
        var professor = professores.find(function (school) {
          return school.idProfessor === item.professorId;
        });
        var nome = professor ? professor.pessoa.nome.toLowerCase() : "";
        return nome
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
      if (column === "modalidadeEscola") {
        var valueA = a.modalidadeEscola.modalidadeEscola.toLowerCase();
        var valueB = b.modalidadeEscola.modalidadeEscola.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "professorId") {
        var escolaA = professores.find(function (school) {
          return school.idProfessor === a.professorId;
        });
        var escolaB = professores.find(function (school) {
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
  listarDados(dadosOriginais);
  $('input[data-toggle="toggle"]').bootstrapToggle();
  $('input[data-toggle="toggle"]').bootstrapToggle();
  $(".searchInput").val("");
});

function getDados() {
  $.ajax({
    url: url_base + "/professorFormacao",
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

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      var professor = professores.find(function (school) {
        return school.idProfessor === item.professorId;
      });

      var nome = professor ? professor.pessoa.nome : "Professor não encontrado";

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
        nome +
        "</td>" +
        "<td>" +
        item.modalidadeEscola.modalidadeEscola +
        "</td>" +
        "<td>" +
        item.nomeCurso +
        "</td>" +
        "<td>" +
        item.ies +
        "</td>" +
        "<td>" +
        item.anoConclusao +
        "</td>" +
        "<td>" +
        ativo +
        "</td>" +
        '<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idProfessor="' +
        item.professorId +
        '" data-id="' +
        item.idProfessorFormacao +
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

  XLSX.writeFile(livro, "formacaoProfessor.xlsx");
});

// Abrir modal

function showModal(ref) {
  id = ref.getAttribute("data-id");
  idProfessor = ref.getAttribute("data-idProfessor");

  $("#professorIdEdit").val(idProfessor).attr("selected", true);

  $.ajax({
    url: url_base + "/professorFormacao/professor/" + idProfessor,
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
  }).done(function (data) {
    if (data[0].ativo == "S") {
      $(".ativar").hide();
      $(".desativar").show();
    } else {
      $(".desativar").hide();
      $(".ativar").show();
    }

    $("#nomeCursoEdit").val(data[0].nomeCurso);
    $("#anoConclusaoEdit").val(data[0].anoConclusao);
    $("#iesEdit").val(data[0].ies);
    $("#modalidadeEscolaIdEdit").val(
      data[0].modalidadeEscola.idModalidadeEscola
    );
  });
}

// Editar

function editar() {
  var objeto = {
    idProfessorFormacao: id,
    professorId: Number($("#professorIdEdit").val()),
    modalidadeEscolaId: $("#modalidadeEscolaIdEdit").val(),
    nomeCurso: $("#nomeCursoEdit").val(),
    ies: $("#iesEdit").val(),
    anoConclusao: $("#anoConclusaoEdit").val(),
  };

  $.ajax({
    url: url_base + "/professorFormacao",
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
    $("#professorIdEdit").val(""),
      $("#modalidadeEscolaIdEdit").val(""),
      $("#nomeCursoEdit").val(""),
      $("#iesEdit").val(""),
      $("#anoConclusaoEdit").val(""),
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
    professorId: Number($("#professorId").val()),
    modalidadeEscolaId: $("#modalidadeEscolaId").val(),
    nomeCurso: $("#nomeCurso").val(),
    ies: $("#ies").val(),
    anoConclusao: $("#anoConclusao").val(),
  };

  $.ajax({
    url: url_base + "/professorFormacao",
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
  }).done(function (data) {
    $("#professorId").val("");
    $("#modalidadeEscolaId").val("");
    $("#nomeCurso").val("");
    $("#ies").val("");
    $("#anoConclusao").val("");
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
  $("#professorId").val("");
  $("#modalidadeEscolaId").val("");
  $("#nomeCurso").val("");
  $("#ies").val("");
  $("#anoConclusao").val("");
}
