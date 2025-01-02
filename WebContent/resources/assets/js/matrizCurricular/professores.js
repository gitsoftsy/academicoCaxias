var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";
var ativo = "";
const contaId = localStorage.getItem("contaId");
const escolaId = sessionStorage.getItem("escolaId");
let idProfessor = "";
let matriculaProfessor = "";

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
      .normalize("NFD") // Decomposição de caracteres acentuados
      .replace(/[\u0300-\u036f]/g, ""); // Remove os sinais diacríticos (acentos)

    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    console.log("Coluna de busca:", columnToSearch);

    filteredData = dadosOriginais.filter(function (item) {
      // Acesse a propriedade correta no objeto 'pessoa'
      var value = item.pessoa ? item.pessoa[columnToSearch] : undefined;

      // Verifique se o valor existe e é uma string
      if (value === undefined || value === null) {
        return false; // Ou true, dependendo da lógica desejada
      }

      // Normalize e remova acentuação da propriedade para comparações mais precisas
      return value
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchInput);
    });

    listarDados(filteredData);
    $('input[data-toggle="toggle"]').bootstrapToggle();

    // Limpe o campo de pesquisa
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
      if (column === "dependenciaAdm") {
        var valueA = a.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
        var valueB = b.dependenciaAdm.dependenciaAdministrativa.toLowerCase();
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
  $(".searchInput").val("");
});

function getDados() {
  $.ajax({
    url: url_base + "/professores/conta/" + contaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dados = data;
      dadosOriginais = data;
      console.log(data);
      listarDados(data);
      $('input[data-toggle="toggle"]').bootstrapToggle();
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function editar(candidato) {
  var idCandidato = candidato.getAttribute("data-id");
  window.location.href = "dados-aluno?id=" + idCandidato;
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      var codigoInep =
        item.codigoInep === null ? "Não possui" : item.codigoInep;

      var email =
        item.emailInstitucional === "" ? "Não possui" : item.emailInstitucional;

      return (
        "<tr>" +
        "<td>" +
        item.pessoa.nomeCompleto +
        "</td>" +
        "<td>" +
        codigoInep +
        "</td>" +
        "<td>" +
        item.matricula +
        "</td>" +
        "<td>" +
        email +
        "</td>" +
        "<td>" +
        '<input type="checkbox" data-status="' +
        item.ativo +
        '" data-id="' +
        item.idProfessor +
        ' " onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
        "</td>" +
        '<td class="d-flex justify-content-center">' +
        '<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
        item.idProfessor +
        '" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span>' +
        '<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" data-matricula="' +
        item.matricula +
        '" data-id="' +
        item.idProfessor +
        '" data-cpf="' +
        item.pessoa.cpf +
        '" onclick="showProfessorEscola(this)" title="Vincular Escola" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-school"></i></span>' +
        '<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" data-matricula="' +
        item.matricula +
        '" data-id="' +
        item.idProfessor +
        '" data-cpf="' +
        item.pessoa.cpf +
        '" onclick="showProfessorDisciplina(this)" title="Vincular Disciplina" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-book"></i></span>' +
        '<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" data-matricula="' +
        item.matricula +
        '" data-id="' +
        item.idProfessor +
        '" data-cpf="' +
        item.pessoa.cpf +
        '" onclick="showProfessorTurma(this)" title="Vincular Turma" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-users-between-lines"></i></span>' +
        "</td>" +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela").html(html);

  $(".checkbox-toggle").each(function () {
    var status = $(this).data("status");
    if (status !== "S") {
      $(this).prop("checked", false);
    }
  });
}

function alteraStatus(element) {
  var id = element.getAttribute("data-id");
  var status = element.getAttribute("data-status");

  const button = $(element).closest("tr").find(".btn-status");
  if (status === "S") {
    button.removeClass("btn-success").addClass("btn-danger");
    button.find("i").removeClass("fa-check").addClass("fa-xmark");
    element.setAttribute("data-status", "N");
  } else {
    button.removeClass("btn-danger").addClass("btn-success");
    button.find("i").removeClass("fa-xmark").addClass("fa-check");
    element.setAttribute("data-status", "S");
  }

  console.log(id);
  console.log(status);
  $.ajax({
    url:
      url_base +
      `/professores/${id}${status === "S" ? "/desativar" : "/ativar"}`,
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
    window.location.href = "professores";
  });
}

const showProfessorTurma = (ref) => {
  matriculaProfessor = ref.getAttribute("data-matricula");
  let id = ref.getAttribute("data-id");
  let cpf = ref.getAttribute("data-cpf");
  window.location.href =
    "turmas-disciplina-professor?matricula=" +
    matriculaProfessor +
    "&id=" +
    id +
    "&cpf=" +
    cpf;
};

const showProfessorEscola = (ref) => {
  matriculaProfessor = ref.getAttribute("data-matricula");
  let id = ref.getAttribute("data-id");
  let cpf = ref.getAttribute("data-cpf");
  window.location.href =
    "professorEscola?matricula=" +
    matriculaProfessor +
    "&id=" +
    id +
    "&cpf=" +
    cpf;
};

const showProfessorDisciplina = (ref) => {
  matriculaProfessor = ref.getAttribute("data-matricula");
  let id = ref.getAttribute("data-id");
  let cpf = ref.getAttribute("data-cpf");
  window.location.href =
    "professorDisciplina?matricula=" +
    matriculaProfessor +
    "&id=" +
    id +
    "&cpf=" +
    cpf;
};

function showModal(ref) {
  idProfessor = ref.getAttribute("data-id");

  window.location.href = "editar-professor?id=" + idProfessor;
}

// Exportar Dados
$("#exportar-excel").click(function () {
  var planilha = XLSX.utils.json_to_sheet(dados);

  var livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

  XLSX.writeFile(livro, "reservas.xlsx");
});
