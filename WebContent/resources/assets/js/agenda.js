var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var id = "";
var dataAgenda = "";
var horaInicio = "";
var horaFim = "";
var realizada = "";
var tituloAula = "";
var resumoAula = "";
var turmaId = "";
var idAgendaAnexo;
var idAgendaSelecionada;
var listaAgenda;
var descricaoAgendaAnexo = "";
const contaId = localStorage.getItem("contaId");

$(document).ready(function () {
  $("#containerAnexos").hide();
  getDados();

  $.ajax({
    url: url_base + "/agendas",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      turmas = data;

      $.each(data, function (index, item) {
        const dataAgenda = formatarDataParaBR(item.dataAgenda);
        $("#agendaIdAnexo").append(
          $("<option>", {
            value: item.idAgenda,
            text:
              item.tituloAula == null
                ? "Agenda Cadastrada em " + dataAgenda
                : item.tituloAula,
            name: item.tituloAula,
          })
        );

        $("#agendaIdAnexoEdit").append(
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
    turmas,
    optionsListId,
    selectId,
    searchId,
    turmaIdPreSelecionada = null
  ) {
    const $optionsList = $(optionsListId);
    const $turmaId = $(selectId);

    // Limpa as opções anteriores
    $optionsList.empty();
    $turmaId
      .empty()
      .append(
        '<option value="" disabled selected>Selecione uma opção</option>'
      );

    // Itera sobre as turmas retornadas pela API
    $.each(turmas, function (index, item) {
      $optionsList.append(
        `<li data-value="${item.idTurma}">${item.nomeTurma}</li>`
      );
      $turmaId.append(
        $("<option>", {
          value: item.idTurma,
          text: item.nomeTurma,
        })
      );
    });

    // Se houver um turmaId para ser pré-selecionado
    if (turmaIdPreSelecionada) {
      $turmaId.val(turmaIdPreSelecionada);
      const turmaSelecionada = $turmaId.find("option:selected").text();
      $(searchId).val(turmaSelecionada);
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
      $turmaId.val(selectedValue); // Preenche o select oculto com o ID da turma
      $optionsList.hide(); // Esconde a lista de opções
    });

    // Fecha a lista se o usuário clicar fora
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".custom-select").length) {
        $optionsList.hide();
      }
    });
  }

  $.ajax({
    url: url_base + "/turma",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      turmas = data;
      preencherOpcoes(turmas, "#turmaOptions", "#turmaId", "#turmaSearch");
      preencherOpcoes(
        turmas,
        "#turmaOptionsEdit",
        "#turmaIdEdit",
        "#turmaSearchEdit"
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

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {});

  $(".searchButton").click(function () {
    var searchInput = $(this).siblings(".searchInput").val().toLowerCase();
    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    function normalizeString(str) {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }

    var normalizedSearchInput = normalizeString(searchInput);

    if (columnToSearch == "nomeTurma") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item.turma.nomeTurma).includes(
          normalizedSearchInput
        );
      });
    } else if (columnToSearch == "nomeEscola") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item.turma.escola.nomeEscola).includes(
          normalizedSearchInput
        );
      });
    } else if (columnToSearch == "ano") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(
          item.turma.periodoLetivo.ano.toString()
        ).includes(normalizedSearchInput);
      });
    } else if (columnToSearch == "turno") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item.turma.turno.turno).includes(
          normalizedSearchInput
        );
      });
    } else if (columnToSearch == "nomeDisciplina") {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(
          item.turma.gradeCurricular.disciplina.nome
        ).includes(normalizedSearchInput);
      });
    } else if (columnToSearch == "dataAgenda") {
      filteredData = dadosOriginais.filter(function (item) {
        const dataAgenda = item.dataAgenda;
        const horaInicioFormatada = formatarHoraParaAMPM(item.horaInicio);
        const horaFimFormatada = formatarHoraParaAMPM(item.horaFim);
        const realizada = item.realizada === "S" ? "Sim" : "Não";

        // Dividir a string nos componentes ano, mês e dia
        const [ano, mes, dia] = dataAgenda.split("-");
        // Formatar a data no formato "dd/mm/aaaa"
        const dataFormatada = `${dia}/${mes}/${ano}`;

        return normalizeString(dataFormatada).includes(normalizedSearchInput);
      });
    } else {
      filteredData = dadosOriginais.filter(function (item) {
        return normalizeString(item[columnToSearch].toString()).includes(
          normalizedSearchInput
        );
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
    }

    sortOrder[column] = newOrder;
  });

  function sortData(column, order) {
    var dadosOrdenados = dadosOriginais.slice();

    dadosOrdenados.sort(function (a, b) {
      if (column === "turmaId") {
        var turmaA = turmas.find(function (school) {
          return school.idTurma === a.turmaId;
        });
        var turmaB = turmas.find(function (school) {
          return school.idTurma === b.turmaId;
        });
        var nomeTurmaA = turmaA ? turmaA.numTurma.toLowerCase() : "";
        var nomeTurmaB = turmaB ? turmaB.numTurma.toLowerCase() : "";
        if (order === "asc") {
          return nomeTurmaA.localeCompare(nomeTurmaB);
        } else {
          return nomeTurmaB.localeCompare(nomeTurmaA);
        }
      } else if (column === "horaInicio" || column === "horaFim") {
        var timeA = a[column]
          .split(":")
          .reduce((acc, val, i) => acc + val * Math.pow(60, -i), 0);
        var timeB = b[column]
          .split(":")
          .reduce((acc, val, i) => acc + val * Math.pow(60, -i), 0);
        if (order === "asc") {
          return timeA - timeB;
        } else {
          return timeB - timeA;
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
    url: url_base + "/agendas",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dados = data;
      dadosOriginais = data;
      listarDados(data);
      $('input[data-toggle="toggle"]').bootstrapToggle();
      listaAgenda = data;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function formatarHoraParaAMPM(hora) {
  if (!hora) {
    console.error("Hora não está definida ou é inválida:", hora);
    return ""; // Ou algum valor padrão, como "00:00 AM"
  }

  let [horas, minutos, segundos] = hora.split(":");
  horas = parseInt(horas, 10);
  const periodo = horas >= 12 ? "PM" : "AM";
  horas = horas % 12 || 12;
  return `${("0" + horas).slice(-2)}:${minutos} ${periodo}`;
}

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      const dataAgenda = item.dataAgenda;

      const horaInicioFormatada = formatarHoraParaAMPM(item.horaInicio);
      const horaFimFormatada = formatarHoraParaAMPM(item.horaFim);
      const realizada = item.realizada === "S" ? "Sim" : "Não";
      // Dividir a string nos componentes ano, mês e dia
      const [ano, mes, dia] = dataAgenda.split("-");

      // Formatar a data no formato "dd/mm/aaaa"
      const dataFormatada = `${dia}/${mes}/${ano}`;

      const tituloAulaArrumado =
        item.tituloAula == null ? "Não preenchido" : item.tituloAula;

      const resumoAulaArrumado =
        item.resumoAula == null ? "Não preenchido" : item.resumoAula;

      let colorBtn = "btn-warning";

      if (idAgendaSelecionada == item.idAgenda) {
        colorBtn = "btn-primary";
      }
      console.log(dataFormatada); // Saída: "01/01/2024"

      return (
        "<tr>" +
        '<td class="d-flex justify-content-center"><span style="width: 50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn ' +
        colorBtn +
        ' btn-sm" data-id="' +
        item.idAgenda +
        '" onclick="selecionar(this)"><i class="fa-solid fa-right-to-bracket fa-lg"></i></span></td>' +
        "<td>" +
        item.turma.escola.nomeEscola +
        "</td>" +
        "<td>" +
        item.turma.periodoLetivo.ano +
        "/" +
        item.turma.periodoLetivo.periodo +
        "</td>" +
        "<td>" +
        item.turma.turno.turno +
        "</td>" +
        "<td>" +
        item.turma.nomeTurma +
        "</td>" +
        "<td>" +
        item.turma.gradeCurricular.disciplina.nome +
        "</td>" +
        "<td>" +
        dataFormatada +
        "</td>" +
        "<td>" +
        horaInicioFormatada +
        "</td>" +
        "<td>" +
        horaFimFormatada +
        "</td>" +
        "<td>" +
        tituloAulaArrumado +
        "</td>" +
        "<td>" +
        resumoAulaArrumado +
        "</td>" +
        "<td>" +
        realizada +
        "</td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        '<input type="checkbox" data-status="' +
        item.ativo +
        '" data-id="' +
        item.idAgenda +
        ' " onChange="alteraStatus(this)" ' +
        `${item.ativo === "S" ? "checked" : ""}` +
        ' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
        "</div></td>" +
        '<td><span style=" height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm"' +
        ' data-id="' +
        item.idAgenda +
        '" data-turmaId="' +
        item.turmaId +
        '" data-horaInicioFormatada="' +
        item.horaInicio +
        '" data-horaFimFormatada="' +
        item.horaFim +
        '" data-realizada="' +
        item.realizada +
        '" data-tituloAula="' +
        item.tituloAula +
        '" data-resumoAula="' +
        item.resumoAula +
        '" data-dataAgenda="' +
        item.dataAgenda +
        '" data-realizada="' +
        realizada +
        '" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span> </tr>'
      );
    })
    .join("");

  $("#cola-tabela").html(html);
}

const selecionar = (element) => {
  idAgendaSelecionada = element.getAttribute("data-id");
  listarDados(listaAgenda);
  getAnexos();
};

function formatarDataParaBR(data) {
  var dataISO = data;
  var dataObj = new Date(dataISO);
  var dia = String(dataObj.getUTCDate()).padStart(2, "0");
  var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
  var ano = dataObj.getUTCFullYear();
  return dia + "/" + mes + "/" + ano;
}

const getAnexos = () => {
  $.ajax({
    url: url_base + "/agendaAnexo/agenda/" + idAgendaSelecionada,
    type: "GET",
    async: false,
    error: function (e) {
      console.log(url);
      console.log(e);
    },
  })
    .done(function (data) {
      if (data.length != 0) {
        console.log(data);
        $("#containerAnexos").show();
        listarAnexos(data);
        $('input[data-toggle="toggle"]').bootstrapToggle();
      } else {
        Swal.fire({
          icon: "info",
          title: "Essa agenda não possui nenhum anexo!",
        });
        listarAnexos(data);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(url);
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
};

function listarAnexos(dados) {
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
        (item.descricao == null ? "Sem descrição" : item.descricao) +
        "</td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        '<input type="checkbox" ' +
        (item.ativo === "S" ? "checked" : "") +
        ' data-status="' +
        item.ativo +
        '" data-id="' +
        item.idAgendaAnexo +
        '"' +
        ' onChange="alteraStatusAgendaAnexo(this)" data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
        "</div></td>" +
        '<td style="display:flex;"><span style=" margin-right: 5px; height: 31px; width: 50%; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm"' +
        ' data-id="' +
        item.idAgendaAnexo +
        '" data-caminhoArquivo="' +
        item.caminhoArquivo +
        '" data-descricao="' +
        item.descricao +
        '"data-agendaId="' +
        item.agendaId +
        '" onclick="showModalAnexoEdit(this)" data-bs-toggle="modal" data-bs-target="#editItemAnexo"><i class="fa-solid fa-pen fa-lg"></i></span>' +
        '<span style=" margin-right: 5px; height: 31px; width: 50%; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm"' +
        ' data-id="' +
        item.idAgendaAnexo +
        '" data-caminhoArquivo="' +
        item.caminhoArquivo +
        '" data-agendaId="' +
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
      url_base + `/agendas/${id}${status === "S" ? "/desativar" : "/ativar"}`,
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
    window.location.href = "agenda";
  });
}

function alteraStatusAgendaAnexo(element) {
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
    window.location.href = "agenda";
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
  turmaId = ref.getAttribute("data-turmaId");
  horaInicio = ref.getAttribute("data-horaInicioFormatada");
  horaFim = ref.getAttribute("data-horaFimFormatada");
  tituloAula = ref.getAttribute("data-tituloAula");
  resumoAula = ref.getAttribute("data-resumoAula");
  dataAgenda = ref.getAttribute("data-dataAgenda");
  realizada = ref.getAttribute("data-realizada");

  $("#turmaSearchEdit").val(""); // Limpa o campo de busca
  $("#turmaOptionsEdit").hide();

  $("#turmaIdEdit").val(turmaId).change(); // Atualiza o valor do select oculto
  const turmaSelecionada = $("#turmaIdEdit option:selected").text();
  $("#turmaSearchEdit").val(turmaSelecionada); // Preenche o campo de pesquisa

  $("#turmaIdEdit").val(turmaId);
  $("#dataAgendaEdit").val(dataAgenda);
  $("#tituloAulaEdit").val(tituloAula);
  $("#horaIniEdit").val(horaInicio);
  $("#horaFimEdit").val(horaFim);
  $("#resumoEdit").val(resumoAula);

  if (realizada == "S") {
    $("#isRealizadaEdit").attr("checked", true);
  } else {
    $("#isRealizadaEdit").attr("checked", false);
  }
}

function showModalAnexo(ref) {
  limpaCampoAnexo();

  $("#agendaIdAnexo").val(idAgendaSelecionada);
  $("#agendaIdAnexoEdit").val(idAgendaSelecionada);
}

function showModalAnexoEdit(ref) {
  idAgendaAnexo = ref.getAttribute("data-id");
  descricaoAgendaAnexo = ref.getAttribute("data-descricao");
  limpaCampoAnexo();

  $("#descricaoAnexoAgendaEdit").val(descricaoAgendaAnexo);
  $("#agendaIdAnexoEdit").val(idAgendaSelecionada);
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

  const dataFormatada = formatarDataParaAPI(dataFeriado);

  const tituloAulaFormatado =
    $("#tituloAulaEdit").val() === "" ? null : $("#tituloAulaEdit").val();

  const resumoAulaFormatado =
    $("#resumoEdit").val() === "" ? null : $("#resumoEdit").val();

  var objeto = {
    idAgenda: id,
    turmaId: $("#turmaIdEdit").val(),
    dataAgenda: $("#dataAgendaEdit").val(),
    horaInicio: $("#horaIniEdit").val(),
    horaFim: $("#horaFimEdit").val(),
    realizada: getAswer("#isRealizadaEdit"),
    tituloAula: tituloAulaFormatado,
    resumoAula: resumoAulaFormatado,
  };

  console.log(objeto);

  $.ajax({
    url: url_base + "/agendas",
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
    $("#dataFeriadoEdit").val("");
    $("#descricaoEdit").val("");

    getDados();
    showPage(currentPage);
    updatePagination();
    Swal.fire({
      title: "Editado com sucesso",
      icon: "success",
    }).then(() => {
      window.location.href = "agenda";
    });
  });

  return false;
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
  const dataAgenda = new Date($("#dataAgenda").val());

  const dataFormatada = formatarDataParaAPI(dataAgenda);

  const tituloAulaFormatado =
    $("#tituloAula").val() === "" ? null : $("#tituloAula").val();

  const resumoAulaFormatado =
    $("#resumo").val() === "" ? null : $("#resumo").val();

  var objeto = {
    turmaId: $("#turmaId").val(),
    dataAgenda: dataFormatada,
    horaInicio: $("#horaIni").val(),
    horaFim: $("#horaFim").val(),
    realizada: getAswer("#isRealizada"),
    tituloAula: tituloAulaFormatado,
    resumoAula: resumoAulaFormatado,
  };
  console.log(objeto);

  $.ajax({
    url: url_base + "/agendas",
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
  }).done(function () {
    getDados();
    showPage(currentPage);
    updatePagination();
    Swal.fire({
      title: "Cadastrado com sucesso",
      icon: "success",
    }).then(() => {
      window.location.href = "agenda";
    });
  });
  return false;
}

function cadastrarAnexo() {
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
      agendaId: $("#agendaIdAnexo").val(),
      descricao:
        $("#descricaoAnexoAgenda").val() == ""
          ? null
          : $("#descricaoAnexoAgenda").val(),
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
          text: "Não foi possível cadastrar o anexo!",
        });
      },
    }).done(function (data) {
      Swal.fire({
        title: "Anexo cadastrado com sucesso",
        icon: "success",
      });
      window.location.href = "agenda";
    });
  });
}

function editarAnexo() {
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
      idAgendaAnexo: idAgendaAnexo,
      agendaId: $("#agendaIdAnexoEdit").val(),
      descricao:
        $("#descricaoAnexoAgendaEdit").val() == ""
          ? null
          : $("#descricaoAnexoAgendaEdit").val(),
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
          text: "Não foi possível editar o anexo!",
        });
      },
    }).done(function (data) {
      Swal.fire({
        title: "Editado com sucesso",
        icon: "success",
      });
      window.location.href = "agenda";
    });
  });
}

$("#formCadastro").on("submit", function (e) {
  e.preventDefault();
  cadastrar();
  return false;
});

$("#formCadastroAnexo").on("submit", function (e) {
  e.preventDefault();
  cadastrarAnexo();
  return false;
});

$("#formEditAnexo").on("submit", function (e) {
  e.preventDefault();
  editarAnexo();
  return false;
});

// Limpa input

function limpaCampo() {
  $("#descricao").val("");
  $("#anexoAgendaInput").val("");
}

function limpaCampoAnexo() {
  $("#agendaIdAnexo").val("");
  $("#anexoAgenda").empty();
}
