var dados = [];
var id = "";
var nome = "";
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;

var dados = [];
var sortOrder = {};
var dadosOriginais = [];

var idSelect = "";
var isAtivo = "";
let modalidades = [];
const contaId = Number(localStorage.getItem("contaId"));

$(document).ready(function () {
  $.ajax({
    url: url_base + "/dependenciaAdministrativa",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#dependenciaAdmId").append(
        $("<option>", {
          value: item.idDependenciaAdministrativa,
          text: item.dependenciaAdministrativa,
          name: item.dependenciaAdministrativa,
        })
      );
    });
    $.each(data, function (index, item) {
      $("#dependenciaAdmIdEdit").append(
        $("<option>", {
          value: item.idDependenciaAdministrativa,
          text: item.dependenciaAdministrativa,
          name: item.dependenciaAdministrativa,
        })
      );
    });
  });

  getDados();

  $(".checkbox-toggle").each(function () {
    var status = $(this).data("status");
    if (status !== "S") {
      $(this).prop("checked", false);
    }
  });

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {
    $(this).siblings(".dropdown-content-form").toggleClass("show");
  });

  $(".searchButton").click(function () {
    var searchInput = $(this).siblings(".searchInput").val();
    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    function normalizeString(str) {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }

    var normalizedSearchInput = normalizeString(searchInput);

    if (columnToSearch === "dependenciaAdm") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(
          item.dependenciaAdm.dependenciaAdministrativa
        ).includes(normalizedSearchInput);
      });
    } else if (columnToSearch === "escolaId") {
      filteredData = dadosOriginais.filter(function (item) {
        var escola = escolas.find(function (school) {
          return school.idEscola === item.escolaId;
        });
        var nomeEscola = escola ? normalizeString(escola.nomeEscola) : "";
        return nomeEscola.includes(normalizedSearchInput);
      });
    } else {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item["modalidadeEscola"].toString()).includes(
          normalizedSearchInput
        );
      });
    }

    // Garantir que filteredData tenha busca indefinida, se necessário
    if (filteredData.length > 0) {
      filteredData[0].busca = undefined;
    } else {
      filteredData.push({ busca: undefined });
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
      dadosOriginais.length > 0
        ? (dadosOriginais[0].busca = undefined)
        : dadosOriginais.push({ busca: undefined });
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
    dadosOrdenados.length > 0
      ? (dadosOrdenados[0].busca = undefined)
      : dadosOrdenados.push({ busca: undefined });
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
    url: url_base + "/modalidadeEscola/conta/" + contaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      turnos = data;
      dadosOriginais = data;
      dadosOriginais.length > 0
        ? (dadosOriginais[0].busca = undefined)
        : dadosOriginais.push({ busca: undefined });
      listarDados(dadosOriginais);
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function listarDados(dados) {
  console.log(dados);

  var html = dados
    .map(function (item) {
      console.log(item);
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
        item.modalidadeEscola +
        "</td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        '<input type="checkbox" data-status="' +
        item.ativo +
        '" data-id="' +
        item.idModalidadeEscola +
        ' " onChange="alteraStatus(this)" ' +
        `${item.ativo === "S" ? "checked" : ""}` +
        ' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
        "</div></td>" +
        '<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
        item.idModalidadeEscola +
        '" data-nome="' +
        item.modalidadeEscola +
        '" data-ativo="' +
        item.ativo +
        '" data-idSelect="' +
        item.contaId +
        '" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
        "</tr>"
      );
    })
    .join("");

  if (dados.length > 0 || dados[0].busca) {
    $("#cola-tabela-modalidades").html(
      dados[0].modalidadeEscola == undefined ? "" : html
    );
  }
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
      `/modalidadeEscola/${id}${status === "S" ? "/desativar" : "/ativar"}`,
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
    window.location.href = "modalidades";
  });
}

function showModal(ref) {
  id = ref.getAttribute("data-id");
  nome = ref.getAttribute("data-nome");
  idSelect = ref.getAttribute("data-idSelect");
  isAtivo = ref.getAttribute("data-ativo");

  if (isAtivo == "S") {
    $(".ativar").hide();
    $(".desativar").show();
  } else {
    $(".desativar").hide();
    $(".ativar").show();
  }

  $("#edit-nome").val(nome);
  $("#dependenciaAdmIdEdit").val(idSelect).attr("selected", true);
}

function editar() {
  var objeto = {
    idModalidadeEscola: Number(id),
    modalidadeEscola: $("#edit-nome").val(),
    dependenciaAdmId: $("#dependenciaAdmIdEdit").val(),
    contaId: contaId,
  };

  $.ajax({
    url: url_base + "/modalidadeEscola",
    type: "PUT",
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
    $("#edit-nome").val("");
    $("#dependenciaAdmIdEdit").val("");
    getDados();
    showPage(currentPage);
    updatePagination();
    Swal.fire({
      title: "Editado com sucesso",
      icon: "success",
    }).then(() => {
      window.location.href = "modalidades";
    });
  });
  return false;
}
$("#formEdit").on("submit", function (e) {
  e.preventDefault();
  editar();
  return false;
});
$("#formCadastro").on("submit", function (e) {
  e.preventDefault();
  cadastrar();
  return false;
});

function cadastrar() {
  var objeto = {
    modalidadeEscola: $("#cadastro-nome").val(),
    contaId: contaId,
  };

  $.ajax({
    url: url_base + "/modalidadeEscola",
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
    $("#cadastro-nome").val("");
    $("#dependenciaAdmId").val("");
    getDados();
    showPage(currentPage);
    updatePagination();
    showPage(currentPage);
    Swal.fire({
      title: "Cadastrado com sucesso",
      icon: "success",
    }).then(() => {
      window.location.href = "modalidades";
    });
  });
  return false;
}

function limpaCampo() {
  $("#cadastro-nome").val("");
  $("#dependenciaAdmId").val("");
}
