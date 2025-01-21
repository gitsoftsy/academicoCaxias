var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var id = "";
var agendaId = "";
var caminhoArquivo = "";
const contaId = localStorage.getItem("contaId");

$(document).ready(function () {
  $(".container-table").hide();
  $("#btn-save").hide();

  $.ajax({
    url: url_base + "/agendas",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $.each(data, function (index, item) {
        const dataAgenda = formatarDataParaBR(item.dataAgenda);
        $("#agendaIdSelect").append(
          $("<option>", {
            value: item.idAgenda,
            text:
              item.tituloAula == null
                ? "Agenda Cadastrada em " + dataAgenda
                : item.tituloAula,
            name: item.tituloAula,
          })
        );
      });

      preencherOpcoes(data, "#agendaOptions", "#agendaId", "#agendaSearch");
      preencherOpcoes(
        data,
        "#agendaOptionsEdit",
        "#agendaIdEdit",
        "#agendaSearchEdit"
      );
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error(
        "Erro na solicitação AJAX:",
        textStatus,
        errorThrown,
        jqXHR
      );
    });

  function preencherOpcoes(
    agendas,
    optionsListId,
    selectId,
    searchId,
    agendaIdPreSelecionada = null
  ) {
    const $optionsList = $(optionsListId);
    const $agendaId = $(selectId);

    // Limpa as opções anteriores
    $optionsList.empty();
    $agendaId
      .empty()
      .append(
        '<option value="" disabled selected>Selecione uma opção</option>'
      );

    // Itera sobre as turmas retornadas pela API
    $.each(agendas, function (index, item) {
      $optionsList.append(
        `<li data-value="${item.idAgenda}">${item.tituloAula}</li>`
      );
      $agendaId.append(
        $("<option>", {
          value: item.idAgenda,
          text: item.tituloAula,
        })
      );
    });

    // Se houver um turmaId para ser pré-selecionado
    if (agendaIdPreSelecionada) {
      $turmaId.val(agendaIdPreSelecionada);
      const agendaSelecionada = $agendaId.find("option:selected").text();
      $(searchId).val(agendaSelecionada);
    }

    // Exibe as opções ao focar no campo de busca
    $(searchId).on("focus", function () {
      $optionsList.show();
    });

    // Filtra as opções conforme o usuário digita
    $(searchId).on("input", function () {
      const searchValue = $(this).val().toLowerCase();
      $optionsList.find("li").each(function () {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(searchValue));
      });
    });

    // Ao clicar em uma opção, atualiza o campo de busca e o select oculto
    $optionsList.on("click", "li", function () {
      const selectedText = $(this).text();
      const selectedValue = $(this).data("value");

      $(searchId).val(selectedText); // Preenche o campo de pesquisa
      $agendaId.val(selectedValue); // Preenche o select oculto com o ID da turma
      $optionsList.hide(); // Esconde a lista de opções
    });

    // Fecha a lista se o usuário clicar fora
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".custom-select").length) {
        $optionsList.hide();
      }
    });
  }

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {});

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

    if (columnToSearch == "tituloAula") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item.agenda.tituloAula).includes(normalizedSearchInput);
      });
    } else if (columnToSearch == "dataCadastro") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.dataCadastro.includes(searchInput);
      });
    } else if (columnToSearch == "descricao") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item.descricao).includes(normalizedSearchInput);
      });
    } else if (columnToSearch == "ativo") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item.ativo.toString()).includes(
          normalizedSearchInput
        );
      });
    } else {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(
          item[columnToSearch] ? item[columnToSearch].toString() : ""
        ).includes(normalizedSearchInput);
      });
    }

    dados = filteredData;
    showPage(1);
    updatePagination();
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
      dados = dadosOriginais;
      showPage(1);
      updatePagination();
      $('input[data-toggle="toggle"]').bootstrapToggle();
    }

    sortOrder[column] = newOrder;
  });

  function sortData(column, order) {
    var dadosOrdenados = dadosOriginais.slice();

    dadosOrdenados.sort(function (a, b) {
      switch (column) {
        case "tituloAula":
          var tituloA = a.agenda.tituloAula.toLowerCase();
          var tituloB = b.agenda.tituloAula.toLowerCase();
          return order === "asc"
            ? tituloA.localeCompare(tituloB)
            : tituloB.localeCompare(tituloA);

        case "dataCadastro":
          var dataA = new Date(a.dataCadastro);
          var dataB = new Date(b.dataCadastro);
          return order === "asc" ? dataA - dataB : dataB - dataA;

        case "descricao":
          var descricaoA = a.descricao.toLowerCase();
          var descricaoB = b.descricao.toLowerCase();
          return order === "asc"
            ? descricaoA.localeCompare(descricaoB)
            : descricaoB.localeCompare(descricaoA);

        case "ativo":
          var ativoA = a.ativo.toString().toLowerCase();
          var ativoB = b.ativo.toString().toLowerCase();
          return order === "asc"
            ? ativoA.localeCompare(ativoB)
            : ativoB.localeCompare(ativoA);

        default:
          var valueA = a[column] ? a[column].toString().toLowerCase() : "";
          var valueB = b[column] ? b[column].toString().toLowerCase() : "";
          return order === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
      }
    });

    dados = dadosOrdenados;
    showPage(1);
    updatePagination();
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
  currentPage = 1;
  dados = [...dadosOriginais];

  updatePagination();
  showPage(currentPage);
  $(".searchInput").val("");
  $('input[data-toggle="toggle"]').bootstrapToggle();
});

$("#btn-buscar").click(() => {
  let agendaId = $("#agendaIdSelect").val();

  if (agendaId == null) {
    Swal.fire({
      icon: "error",
      title: "Erro...",
      text: "Selecione uma agenda!",
    });
  } else {
    url = url_base + `/agendaAnexo/agenda/${agendaId}`;
    /*	url = url_base + `/professores`*/

    $.ajax({
      url: url,
      type: "GET",
      async: false,
      error: function (e) {
        console.log(url);
        console.log(e);
      },
    })
      .done(function (data) {
        $(".container-table").show();
        $("#btn-save").show();
        $("#messageInfo").addClass("none");
        dados = data;
        dadosOriginais = data;
        listarDados(data);
        $('input[data-toggle="toggle"]').bootstrapToggle();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(url);
        console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
      });
  }
});

/*function getDados() {

	$.ajax({

		url: url_base + "/agendaAnexo",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			dadosOriginais = data;
			listarDados(data);
			
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}*/

function formatarDataParaBR(data) {
  var dataISO = data;
  var dataObj = new Date(dataISO);
  var dia = String(dataObj.getUTCDate()).padStart(2, "0");
  var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
  var ano = dataObj.getUTCFullYear();
  return dia + "/" + mes + "/" + ano;
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      const dataCadastro = formatarDataParaBR(item.dataCadastro);

      return (
        "<tr>" +
        "<td>" +
        item.agenda.tituloAula +
        "</td>" +
        "<td>" +
        dataCadastro +
        "</td>" +
        "<td>" +
        item.descricao +
        "</td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        '<input type="checkbox" ' +
        (item.ativo === "S" ? "checked" : "") +
        ' data-status="' +
        item.ativo +
        '" data-id="' +
        item.idAgendaAnexo +
        '"' +
        ' onChange="alteraStatus(this)" data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
        "</div></td>" +
        '<td style="display:flex;"><span style=" margin-right: 5px; height: 31px; width: 50%; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm"' +
        ' data-id="' +
        item.idAgendaAnexo +
        '" data-caminhoArquivo="' +
        item.caminhoArquivo +
        '"data-agendaId="' +
        item.agendaId +
        '" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span>' +
        '<span style=" margin-right: 5px; height: 31px; width: 50%; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm"' +
        ' data-id="' +
        item.idAgendaAnexo +
        '" data-caminhoArquivo="' +
        item.caminhoArquivo +
        ' data-agendaId="' +
        item.agendaId +
        '" onclick="baixarAnexo(this)"><i class="fa-solid fa-file-arrow-down"></i></span></td>' +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela-anexo").html(html);
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
      `/agendaAnexo/${id}${status === "S" ? "/desativar" : "/ativar"}`,
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
    window.location.href = "agenda-anexo";
  });
}

function baixarAnexo(ref) {
  const caminhoArquivo = ref.getAttribute("data-caminhoArquivo");
  const link = document.createElement("a");
  link.href = caminhoArquivo;
  link.download = ""; // Deixe em branco para usar o nome do arquivo original
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
      `/agendaAnexo/${id}${status === "S" ? "/desativar" : "/ativar"}`,
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
    window.location.href = "agenda-anexo";
  });
}

// Exportar Dados

$("#exportar-excel").click(function () {
  var planilha = XLSX.utils.json_to_sheet(dados);

  var livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

  XLSX.writeFile(livro, "diasSemana.xlsx");
});

// Abrir modal

function showModal(ref) {
  id = ref.getAttribute("data-id");
  agendaId = ref.getAttribute("data-agendaId");
  caminhoArquivo = ref.getAttribute("data-caminhoArquivo");

  $("#agendaSearchEdit").val(""); // Limpa o campo de busca
  $("#agendaOptionsEdit").hide();

  $("#agendaIdEdit").val(agendaId).change(); // Atualiza o valor do select oculto
  const turmaSelecionada = $("#agendaIdEdit option:selected").text();
  $("#agendaSearchEdit").val(turmaSelecionada); // Preenche o campo de pesquisa

  $("#anexoAgendaEdit").val(caminhoArquivo);
}

function formatarDataParaAPI(data) {
  // Usar UTC para evitar problemas de fuso horário
  var year = data.getUTCFullYear();
  var month = ("0" + (data.getUTCMonth() + 1)).slice(-2);
  var day = ("0" + data.getUTCDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

// Editar

function editar() {
  const dataFeriado = new Date($("#dataFeriadoEdit").val());
  function convertToBase64(file, callback) {
    var reader = new FileReader();
    reader.onload = function (event) {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  let anexoAgendaFile = $("#anexoAgendaEdit")[0].files[0];
  convertToBase64(anexoAgendaFile, function (base64String) {
    // Pegue apenas a parte base64 da string
    var base64Data = base64String.split(",")[1];

    var dadosFormulario = {
      idAgendaAnexo: id,
      agendaId: $("#agendaIdEdit").val(),
      caminhoArquivo: base64Data, // Envie a string base64 diretamente
    };

    console.log(dadosFormulario);

    $.ajax({
      url: url_base + "/agendaAnexo",
      type: "PUT",
      data: JSON.stringify(dadosFormulario),
      contentType: "application/json; charset=utf-8",
      error: function (e) {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Não foi possível cadastrar o anexo!",
        });
      },
    }).done(function (data) {
      Swal.fire({
        title: "Editado com sucesso",
        icon: "success",
      });
      window.location.href = "agenda-anexo";
    });
  });
}

$("#formEdit").on("submit", function (e) {
  e.preventDefault();
  editar();
  return false;
});

function getAswer(input) {
  if ($(input).is(":checked")) {
    return "S";
  } else {
    return "N";
  }
}

// Cadastrar

function cadastrar() {
  function convertToBase64(file, callback) {
    var reader = new FileReader();
    reader.onload = function (event) {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  let anexoAgendaFile = $("#anexoAgenda")[0].files[0];
  convertToBase64(anexoAgendaFile, function (base64String) {
    // Pegue apenas a parte base64 da string
    var base64Data = base64String.split(",")[1];

    var dadosFormulario = {
      agendaId: $("#agendaId").val(),
      caminhoArquivo: base64Data, // Envie a string base64 diretamente
    };

    console.log(dadosFormulario);

    $.ajax({
      url: url_base + "/agendaAnexo",
      type: "POST",
      data: JSON.stringify(dadosFormulario),
      contentType: "application/json; charset=utf-8",
      error: function (e) {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Não foi possível cadastrar a escola!",
        });
      },
    }).done(function (data) {
      Swal.fire({
        title: "Cadastrado com sucesso",
        icon: "success",
      });
      window.location.href = "agenda-anexo";
    });
  });
}

$("#formCadastro").on("submit", function (e) {
  e.preventDefault();
  cadastrar();
  return false;
});

// Limpa input

function limpaCampo() {
  $("#agendaId").val($("#agendaIdSelect").val());
  $("#anexoAgenda").empty();
}
