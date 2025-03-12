var dados = [];
const contaId = localStorage.getItem("contaId");
var nome = "";
var nome2 = "";
var nome3 = "";
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = "";
let id = "";
var sortOrder = {};
var dadosOriginais = [];

$(document).ready(function () {
  $("#tableTurma").hide();
  $("select").select2();

  $(".searchButton").click(function () {
    var searchInput = $(this)
      .siblings(".searchInput")
      .val()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    var columnToSearch = $(this).closest(".sortable").data("column");

    function cleanCPF(cpf) {
      return cpf ? cpf.replace(/[^\d]/g, "") : "";
    }

    var filteredData = dadosOriginais.filter(function (item) {
      item.matriculaPes = item.aluno;
      item.nomePes = item.pessoa.nomeCompleto;
      item.cursoPes = `${item.curso.nome} - ${item.curso.codCurso}`;
      item.seriePes = item.serie.serie;
      item.escolaPes = item.escola.nomeEscola;
      item.turnoPes = item.turno.turno;
      item.emailPes = item.emailInterno;
      item.situacaoAlunoPes = item.situacaoAluno.situacaoAluno;
      item.cpfPes = cleanCPF(item.pessoa.cpf);

      var valueToCheck = item[columnToSearch]
        ? item[columnToSearch]
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";

      if (columnToSearch === "cpfPes") {
        valueToCheck = valueToCheck.replace(/[^\d]/g, "");
        searchInput = searchInput.replace(/[^\d]/g, "");
      }

      return valueToCheck.includes(searchInput);
    });

    dados = filteredData;

    showPage(1);
    updatePagination();
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
      $('input[data-toggle="toggle"]').bootstrapToggle();
    }

    sortOrder[column] = newOrder;
  });

  $.ajax({
    url: url_base + "/escolas/ativos/conta/" + contaId,
    type: "get",
    async: false,
  }).done(function (data) {
    $.each(data, function (index, item) {
      $("#escola").append(
        $("<option>", {
          value: item.idEscola,
          text: item.nomeEscola,
          name: item.nomeEscola,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/periodoletivo/conta/" + contaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $.each(data, function (index, item) {
        let tipoPeriodicidade;

        switch (item.tipoPeriodicidade) {
          case "A":
            tipoPeriodicidade = "Anual";
          case "B":
            tipoPeriodicidade = "Bimestral";
          case "T":
            tipoPeriodicidade = "Trimestral";
          case "S":
            tipoPeriodicidade = "Semestral";
        }

        $("#periodoLetivo").append(
          $("<option>", {
            value: item.idPeriodoLetivo,
            text: `${item.ano}/${item.periodo} - ${tipoPeriodicidade}`,
            name: item.periodo,
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/cursos/ativos/" + contaId,
    type: "get",
    async: false,
    error: function (e) {
      console.log(e);
    },
  }).done(function (data) {
    $.each(data, function (index, item) {
     
        $("#curso").append(
          $("<option>", {
            value: item.idCurso,
            text: `${item.nome} - ${item.codCurso}`,
            name: item.nome,
          })
        );
      
    });
  });

  function sortData(column, order) {
    var dadosOrdenados = dadosOriginais.slice();

    dadosOrdenados.sort(function (a, b) {
      var valueA, valueB;

      switch (column) {
        case "matriculaPes":
          valueA = a.aluno;
          valueB = b.aluno;
          break;
        case "nomePes":
          valueA = a.pessoa.nomeCompleto
            ? a.pessoa.nomeCompleto.toString().toLowerCase()
            : "";
          valueB = b.pessoa.nomeCompleto
            ? b.pessoa.nomeCompleto.toString().toLowerCase()
            : "";
          break;
        case "cpfPes":
          valueA = a.pessoa.cpf ? a.pessoa.cpf.toString().toLowerCase() : "";
          valueB = b.pessoa.cpf ? b.pessoa.cpf.toString().toLowerCase() : "";
          break;
        case "cursoPes":
          valueA =
            a.curso && a.curso.nome
              ? a.curso.nome.toString().toLowerCase()
              : "";
          valueB =
            b.curso && b.curso.nome
              ? b.curso.nome.toString().toLowerCase()
              : "";
          break;
        case "seriePes":
          valueA = a.serie ? a.serie.serie.toString().toLowerCase() : "";
          valueB = b.serie ? b.serie.serie.toString().toLowerCase() : "";
          break;
        case "escolaPes":
          valueA = a.escola ? a.escola.nomeEscola.toString().toLowerCase() : "";
          valueB = b.escola ? b.escola.nomeEscola.toString().toLowerCase() : "";
          break;
        case "turnoPes":
          valueA = a.turno ? a.turno.turno.toString().toLowerCase() : "";
          valueB = b.turno ? b.turno.turno.toString().toLowerCase() : "";
          break;
        case "emailPes":
          valueA = a.emailInterno
            ? a.emailInterno.toString().toLowerCase()
            : "";
          valueB = b.emailInterno
            ? b.emailInterno.toString().toLowerCase()
            : "";
          break;
        case "situacaoAlunoPes":
          valueA = a.situacaoAluno
            ? a.situacaoAluno.situacaoAluno.toString().toLowerCase()
            : "";
          valueB = b.situacaoAluno
            ? b.situacaoAluno.situacaoAluno.toString().toLowerCase()
            : "";
          break;
        default:
          valueA = "";
          valueB = "";
      }

      if (order === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
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

  $("select").select2();
});

$("#btn-buscar").on("click", function () {
  const matricula = $("#matricula").val();
  const nome = $("#nome").val();
  const cpf = $("#cpf").val();
  const escola = $("#escola").val();
  const curso = $("#curso").val();

  if (!matricula && !nome && !cpf && !escola && !curso) {
    Swal.fire({
      icon: "error",
      title: "Preencha ao menos um filtro",
      text: "Por favor, informe ao menos um filtro para realizar a busca.",
    });
    return;
  }

  const filtros = {
    matricula: matricula || "",
    nome: nome || "",
    cpf: cpf || "",
    idEscola: escola || "",
    idCurso: curso || "",
  };

  getDados(filtros);
  showPage(currentPage);
  updatePagination();
});

function getDados(filtros) {
  const queryParams = Object.entries(filtros)
    .filter(
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const fullUrl = `${url_base}/alunos/${contaId}/filtrar?${queryParams}`;

  $.ajax({
    url: fullUrl,
    type: "GET",
    async: false,
  })
    .done(function (response) {
      if (response && response.data.length > 0) {
        dadosOriginais = response.data;
        dados = response.data;
        listarDados(response.data);
        $(".checkbox-toggle").each(function () {
          var status = $(this).data("status");
          if (status !== "S") {
            $(this).prop("checked", false);
          }
        });
        $('input[data-toggle="toggle"]').bootstrapToggle();
      } else {
        Swal.fire({
          icon: "error",
          title: "Não foram encontrados dados para os filtros informados.",
          text: "Verifique os valores e tente novamente.",
        });
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      Swal.fire({
        icon: "error",
        title: "Erro na solicitação",
        text: errorThrown || "Não foi possível buscar os dados.",
      });
      console.error("Erro na solicitação AJAX:", jqXHR);
    });
}

$("#limpa-filtros").click(function () {
  currentPage = 1;
  dados = [...dadosOriginais];

  updatePagination();
  showPage(currentPage);

  $(".searchInput").val("");
  $('input[data-toggle="toggle"]').bootstrapToggle();
});

function listarDados(dados) {
  var html = dados
    .map(function (item) {
      return (
        "<tr>" +
        "<td>" +
        item.aluno +
        "</td>" +
        "<td>" +
        item.nomeCompleto +
        "</td>" +
        "<td>" +
        item.nomeCurso +
        "</td>" +
        "<td>" +
        item.serie +
        "</td>" +
        "<td>" +
        item.nomeEscola +
        "</td>" +
        "<td>" +
        item.turno +
        "</td>" +
        "<td>" +
        (item.emailInterno || "Não possui") +
        "</td>" +
        "<td>" +
        item.situacaoAluno +
        "</td>" +
        "</tr>"
      );
    })
    .join("");

  $("#tableTurma").show();
  $("#textoInicial").hide();
  $("#cola-tabela").html(html);
}
