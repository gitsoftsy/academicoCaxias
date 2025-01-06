var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idProfessor = "";
var professores = "";

$(document).ready(function () {
  $.ajax({
    url: url_base + "/escolas",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      escolas = data;
      $.each(data, function (index, item) {
        $("#escolaIdEdit").append(
          $("<option>", {
            value: item.idEscola,
            text: item.nomeEscola,
            name: item.nomeEscola,
          })
        );
      });
      $.each(data, function (index, item) {
        $("#escolaId").append(
          $("<option>", {
            value: item.idEscola,
            text: item.nomeEscola,
            name: item.nomeEscola,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", jqXHR);
    });

  $.ajax({
    url: url_base + "/professores",
    type: "get",
    async: false,
  }).done(function (data) {
    professores = data;
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
  });

  $.ajax({
    url: url_base + "/turnoProfessor",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#turnoProfessorId").append(
        $("<option>", {
          value: item.idTurnoProfessor,
          text: item.turnoProfessor,
          name: item.turnoProfessor,
        })
      );
    });
    $.each(data, function (index, item) {
      $("#turnoProfessorIdEdit").append(
        $("<option>", {
          value: item.idTurnoProfessor,
          text: item.turnoProfessor,
          name: item.turnoProfessor,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/cargoProfessor",
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#cargoProfessorId").append(
        $("<option>", {
          value: item.idCargoProfessor,
          text: item.cargoProfessor,
          name: item.cargoProfessor,
        })
      );
    });
    $.each(data, function (index, item) {
      $("#cargoProfessorIdEdit").append(
        $("<option>", {
          value: item.idCargoProfessor,
          text: item.cargoProfessor,
          name: item.cargoProfessor,
        })
      );
    });
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

    if (columnToSearch === "dtNomenclatura") {
      // A data será manipulada para remover a parte após o 'T'
      searchInput = searchInput.split("T")[0];
      filteredData = dadosOriginais.filter(function (item) {
        var itemDate = item[columnToSearch].split("T")[0];
        return itemDate.includes(searchInput);
      });
    } else if (columnToSearch === "turnoProfessor") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.turnoProfessor.turnoProfessor
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchInput);
      });
    } else if (columnToSearch === "cargoProfessor") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.cargoProfessor.cargoProfessor
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
      if (column === "dtNomenclatura") {
        var dateA = new Date(a[column]);
        var dateB = new Date(b[column]);

        if (order === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      } else if (column === "turnoProfessor") {
        var valueA = a.turnoProfessor.turnoProfessor.toLowerCase();
        var valueB = b.turnoProfessor.turnoProfessor.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "cargoProfessor") {
        var valueA = a.cargoProfessor.cargoProfessor.toLowerCase();
        var valueB = b.cargoProfessor.cargoProfessor.toLowerCase();
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
      } else if (column === "professorId") {
        var itemA = professores.find(function (school) {
          return school.idProfessor === a.professorId;
        });
        var itemB = professores.find(function (school) {
          return school.idProfessor === b.professorId;
        });
        var nomeA = itemA ? itemA.pessoa.nome.toLowerCase() : "";
        var nomeB = itemB ? itemB.pessoa.nome.toLowerCase() : "";
        if (order === "asc") {
          return nomeA.localeCompare(nomeB);
        } else {
          return nomeB.localeCompare(nomeA);
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
function intParaData(intData) {
  const dataString = intData.toString();
  const ano = dataString.slice(0, 4);
  const mes = dataString.slice(4, 6);
  const dia = dataString.slice(6, 8);

  return ano + "-" + mes + "-" + dia;
}

function getDados() {
  $.ajax({
    url: url_base + "/professorEscola",
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

// Formatar data
function formatarDataParaBR(data) {
  var partesData = data.split("-");

  var dataObj = new Date(
    Date.UTC(
      parseInt(partesData[0]),
      parseInt(partesData[1]) - 1,
      parseInt(partesData[2])
    )
  );

  var dia = String(dataObj.getUTCDate()).padStart(2, "0");
  var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
  var ano = dataObj.getUTCFullYear();

  return dia + "/" + mes + "/" + ano;
}

function dataParaInt(data) {
  const [ano, mes, dia] = data.split("-");
  return parseInt(ano + mes + dia);
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      var escola = escolas.find(function (school) {
        return school.idEscola === item.escolaId;
      });

      var nomeEscola = escola ? escola.nomeEscola : "Escola não encontrada";

      var professor = professores.find(function (school) {
        return school.idProfessor === item.professorId;
      });

      var nomeProf = professor
        ? professor.pessoa.nome
        : "professor não encontrado";

      if (item.ativo == "N") {
        ativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      var dataApi = intParaData(item.dtNomenclatura);
      var dataBR = formatarDataParaBR(dataApi);

      return (
        "<tr>" +
        "<td>" +
        nomeProf +
        "</td>" +
        "<td>" +
        nomeEscola +
        "</td>" +
        "<td>" +
        item.turnoProfessor.turnoProfessor +
        "</td>" +
        "<td>" +
        item.cargoProfessor.cargoProfessor +
        "</td>" +
        "<td>" +
        dataBR +
        "</td>" +
        "<td>" +
        ativo +
        "</td>" +
        '<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idProfessor="' +
        item.professorId +
        '" data-id="' +
        item.idProfessorEscola +
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

  XLSX.writeFile(livro, "professoresEscola.xlsx");
});

// Abrir modal

function showModal(ref) {
  id = ref.getAttribute("data-id");
  idProfessor = ref.getAttribute("data-idProfessor");

  $("#professorIdEdit").val(idProfessor).attr("selected", true);

  $.ajax({
    url: url_base + "/professorEscola/professor/" + idProfessor,
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
    if (data.ativo == "S") {
      $(".ativar").hide();
      $(".desativar").show();
    } else {
      $(".desativar").hide();
      $(".ativar").show();
    }

    var dataApi = data[0].dtNomenclatura.split("T")[0];
    $("#dtNomenclaturaEdit").val(dataApi);
    $("#escolaIdEdit").val(data[0].escolaId).attr("selected", true);
    $("#turnoProfessorEdit")
      .val(data[0].turnoProfessor.idTurnoProfessor)
      .attr("selected", true);
    $("#cargoProfessorEdit")
      .val(data[0].cargoProfessor.idCargoProfessor)
      .attr("selected", true);
  });
}

// Editar

function editar() {
  var dataInputEdit = $("#dtNomenclaturaEdit").val();
  var dataIntEdit = dataParaInt(dataInputEdit);

  var objeto = {
    idProfessorEscola: id,
    professorId: Number($("#professorIdEdit").val()),
    escolaId: $("#escolaIdEdit").val(),
    turnoProfessorId: Number($("#turnoProfessorIdEdit").val()),
    cargoProfessorId: Number($("#cargoProfessorIdEdit").val()),
    dtNomenclatura: dataIntEdit,
  };

  $.ajax({
    url: url_base + "/professorEscola",
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
    $("#professorIdEdit").val("");
    $("#escolaIdEdit").val("");
    $("#turnoProfessorIdEdit").val("");
    $("#cargoProfessorIdEdit").val("");
    $("#dtNomenclaturaEdit").val("");
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
  var dataInput = $("#dtNomenclatura").val();
  var dataInt = dataParaInt(dataInput);

  var objeto = {
    professorId: Number($("#professorId").val()),
    escolaId: $("#escolaId").val(),
    turnoProfessorId: Number($("#turnoProfessorId").val()),
    cargoProfessorId: Number($("#cargoProfessorId").val()),
    dtNomenclatura: dataInt,
  };

  $.ajax({
    url: url_base + "/professorEscola",
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
    $("#escolaId").val("");
    $("#turnoProfessorId").val("");
    $("#cargoProfessorId").val("");
    $("#dtNomenclatura").val("");
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
  $("#escolaId").val("");
  $("#turnoProfessorId").val("");
  $("#cargoProfessorId").val("");
  $("#dtNomenclatura").val("");
}
