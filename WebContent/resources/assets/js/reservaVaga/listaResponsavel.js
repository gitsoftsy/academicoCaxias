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
const candidatoId = localStorage.getItem("idCandidato");

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
      .replace(/[\u0300-\u036f]/g, ""); // Remove os sinais diacríticos (acentos)

    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    if (columnToSearch === "dependenciaAdm") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.dependenciaAdm.dependenciaAdministrativa
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchInput);
      });
    } else if (columnToSearch === "escolaId") {
      filteredData = dadosOriginais.filter(function (item) {
        var escola = escolas.find(function (school) {
          return school.idEscola === item.escolaId;
        });
        var nomeEscola = escola ? escola.nomeEscola.toLowerCase() : "";
        return nomeEscola
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

function getDados() {
  $.ajax({
    url: url_base + "/responsavel/candidato/" + candidatoId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $(".bg-loading").addClass("none");

      // Verifique se a resposta é um array
      if (Array.isArray(data)) {
        dadosOriginais = data;
        dados = data;
        listarDados(dados);
      } else {
        console.error("A resposta não é um array:", data);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function listarDados(dados) {
  if (!Array.isArray(dados)) {
    console.error(
      "listarDados espera um array como argumento, mas recebeu:",
      dados
    );
    return;
  }

  var html = dados
    .map(function (item) {
      return (
        "<tr>" +
        "<td>" +
        item.pessoa.nomeCompleto +
        "</td>" +
        "<td>" +
        item.papelPessoa +
        "</td>" +
        "<td>" +
        item.pessoa.telefone +
        "</td>" +
        "<td>" +
        item.pessoa.celular +
        "</td>" +
        "<td>" +
        item.pessoa.email +
        "</td>" +
        '<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" onClick="window.location.href=\'dadosResponsavel?id=' +
        item.pessoa.idPessoa +
        '\'" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela").html(html);
}

$("#btnNext").click(() => {
  Swal.fire({
    title: "Informe a vaga desejada:",
    color: "#1a1a1a",
    icon: "success",
    iconColor: "#053872",
    padding: "2rem",
    showDenyButton: true,
    confirmButtonColor: "#053872",
    denyButtonColor: "#053872",
    confirmButtonText:
      "Escolher pela Escola primeiro e depois verificar o horário disponível na escola.",
    denyButtonText:
      "Escolher o horário primeiro e depois verificar as escolas disponíveis.",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "vagaDesejadaEscola";
    } else if (result.isDenied) {
      window.location.href = "vagaDesejadaTurno";
    }
  });
});
