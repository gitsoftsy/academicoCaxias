var dados = [];
const contaId = localStorage.getItem("contaId");
var nome = "";
var nome2 = "";
var nome3 = "";
var rows = 10;
var currentPage = 1;
var pagesToShow = 5;
let descricao = "";
let id = "";
var sortOrder = {};
var dadosOriginais = [];

$(document).ready(function () {
  $(".searchButton").click(function () {
    var searchInput = $(this)
      .siblings(".searchInput")
      .val()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    var columnToSearch = $(this).closest(".sortable").data("column");

    var filteredData = dadosOriginais.filter(function (item) {
      item.turnoPes = item.turno.turno;
      item.anoPeriodoPes =
        item.periodoLetivo.ano + "/" + item.periodoLetivo.periodo;
      item.disciplinaPes =
        item.gradeCurricular.disciplina.codDiscip +
        " - " +
        item.gradeCurricular.disciplina.nome;
      item.librasPes = item.libras == "S" ? "Sim" : "Não";
      item.escolaPes = item.escola.nomeEscola;

      var valueToCheck = item[columnToSearch]
        ? item[columnToSearch]
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";

      return valueToCheck.includes(searchInput);
    });

    dados = filteredData;

    updatePagination();
    showPage(1);
    listarDados(filteredData);
    $('input[data-toggle="toggle"]').bootstrapToggle();

    $(this).siblings(".searchInput").val("");
    $(this).closest(".dropdown-content-form").removeClass("show");

    $(".checkbox-toggle").each(function () {
      var status = $(this).data("status");
      if (status !== "S") {
        $(this).prop("checked", false);
      }
    });

    $('input[data-toggle="toggle"]').bootstrapToggle();
  });

  getDados();

  showPage(currentPage);
  updatePagination();

  $(".checkbox-toggle").each(function () {
    var status = $(this).data("status");
    if (status !== "S") {
      $(this).prop("checked", false);
    }
  });
});

function getDados() {
  $.ajax({
    url: url_base + "/turma",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dados = data;
      dadosOriginais = data;
      listarDados(data);
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

// limpar filtros

$("#limpa-filtros").click(function () {
  currentPage = 1;
  dados = [...dadosOriginais];

  updatePagination();
  showPage(currentPage);

  $(".searchInput").val("");
  $('input[data-toggle="toggle"]').bootstrapToggle();
});

function listarDados(dados) {
  if (dados.length > 0) {
    var html = dados
      .map((item) => {
        var libras = item.libras == "N" ? "Não" : "Sim";

        const isChecked = item.ativo === "S" ? "checked" : "";

        return (
          "<tr>" +
          "<td>" +
          item.nomeTurma +
          "</td>" +
          "<td>" +
          item.gradeCurricular.disciplina.codDiscip +
          " - " +
          item.gradeCurricular.disciplina.nome +
          "</td>" +
          "<td>" +
          item.escola.nomeEscola +
          "</td>" +
          "<td>" +
          item.gradeCurricular.curriculo.nomeCurso+
          "</td>" +
          "<td>" +
          item.gradeCurricular.curriculo.curriculo +
          "</td>" +
          "<td>" +
          item.gradeCurricular.serie.serie +
          " - " +
          item.gradeCurricular.serie.descricao +
          "</td>" +
          "<td>" +
          item.periodoLetivo.ano +
          "/" +
          item.periodoLetivo.periodo +
          "</td>" +
          "<td>" +
          item.turno.turno +
          "</td>" +
          "<td>" +
          item.vagas +
          "</td>" +
          "<td><div class='d-flex align-items-center gap-1'>" +
          '<input type="checkbox" data-status="' +
          item.ativo +
          '" data-id="' +
          item.idTurma +
          '" onChange="alteraStatus(this)" ' +
          isChecked +
          ' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
          "</div></td>" +
          '<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" title="Editar" class="btn btn-warning btn-sm" data-id="' +
          item.idTurma +
          '" onclick="showModal(this)"><i class="fa-solid fa-pen fa-lg"></i></span> ' +
          '<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" title="Avisos" class="btn btn-primary btn-sm" data-id="' +
          item.idTurma +
          '" onclick="goToAvisos(this)"><i class="fa-solid fa-bell fa-lg"></i></span>' +
          '<a href="avaliacoes?turma=' +
          item.idTurma +
          '" style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" title="Avaliações" class="btn btn-primary btn-sm"><i class="fa-solid fa-file-lines fa-lg"></i></a>' +
          '<a href="turma-matriculas?turma=' +
          item.idTurma +
          '" style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" title="Alunos da turma" class="btn btn-primary btn-sm"><i class="fa-solid fa-clipboard-list fa-lg"></i></a>' +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    $("#cola-tabela").html(html);
  }
}

function alteraStatus(element) {
  var id = element.getAttribute("data-id");
  var status = element.getAttribute("data-status");

  status = status === "S" ? "N" : "S";
  element.setAttribute("data-status", status);

  $.ajax({
    url: url_base + `/turma/${id}${status === "S" ? "/ativar" : "/desativar"}`,
    type: "PUT",
    error: function (e) {
      Swal.close();
      console.error(e);
      Swal.fire({
        icon: "error",
        title: e.responseJSON.message,
      });
    },
  }).then(() => {
    window.location.href = "turma";
  });
}

function showModal(ref) {
  limpaCampo();
  id = ref.getAttribute("data-id");
  window.location.href = "cadastro-turma?id=" + id;
}

function goToAvisos(ref) {
  limpaCampo();
  id = ref.getAttribute("data-id");
  window.location.href = "aviso?id=" + id;
}

function limpaCampo() {
  $("#escolaId").val("");
  $("#turnoId").val("");
  $("#periodoLetivoId").val("");
  $("#gradeCurricularId").val("");
  $("#nomeTurma").val("");
  $("#codTurmaInep").val("");
  $("#vagas").val("");
  $("#libras").val("");
  $("#controlaVagas").val("");
}
