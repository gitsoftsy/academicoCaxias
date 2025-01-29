var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 10;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";
const turmaId = params.get("turma");

$(document).ready(function () {
  $('input[type="text"]').each(function () {
    $(this).data("original-value", $(this).val());
  });
  getDados();

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {});

  $(".searchButton").click(function () {
    var searchInput = $(this)
      .siblings(".searchInput")
      .val()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    function normalizeAndCompare(value) {
      return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchInput);
    }

    filteredData = dadosOriginais.filter(function (item) {
      var columnValue = item[columnToSearch]
        ? item[columnToSearch].toString()
        : "";
      return normalizeAndCompare(columnValue);
    });

    listarDados(filteredData);
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
    }

    sortOrder[column] = newOrder;
  });

  function sortData(column, order) {
    var dadosOrdenados = dadosOriginais.slice();

    dadosOrdenados.sort(function (a, b) {
      var valueA = a[column].toString().toLowerCase();
      var valueB = b[column].toString().toLowerCase();
      if (order === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    listarDados(dadosOrdenados);
  }

  updatePagination();
  showPage(currentPage);
});

$("#limpa-filtros").click(function () {
  currentPage = 1;
  dados = [...dadosOriginais];

  updatePagination();
  showPage(currentPage);

  $(".searchInput").val("");
});

function getDados() {
  $.ajax({
    url: url_base + "/turma/" + turmaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $("#nomeTurma").val(data.nomeTurma);
      $("#escola").val(`${data.escola.codigoInep} - ${data.escola.nomeEscola}`);
      $("#disciplina").val(
        `${data.gradeCurricular.disciplina.codDiscip} - ${data.gradeCurricular.disciplina.nome}`
      );
      $("#periodoLetivo").val(
        `${data.periodoLetivo.periodo} - ${data.periodoLetivo.descricao}`
      );
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/alunos/prova/listarAluno?idTurma=" + turmaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      if (
        data.message !=
        "Nenhum resultado encontrado para os parâmetros informados."
      ) {
        dados = data.data;
        dadosOriginais = data.data;
        console.log(data.data);
        listarDados(data.data);
      } else {
        Swal.fire({
          title: "Nenhum aluno está matriculado a essa turma",
          icon: "info",
          confirmButtonText: `
    						 Matricular Alunos
  					`,
        }).then(() => {
          window.location.href = "matricula?turma=" + turmaId;
        });
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function listarDados(dados) {
  var provas = dados[0].lstProva;

  var headerHtml =
    "<tr>" +
    ` 
  <th scope="col" class="sortable border-end" data-column="aluno">
    <div class="d-flex align-items-center justify-content-between pe-2">
      <div class="col d-flex align-items-center justify-content-between">
        <span>Aluno</span>
        <i class="fas fa-sort me-3" style="color: #dddddd"></i>
      </div>
    </div>
  </th>
  <th scope="col" class="sortable border-end" data-column="nomeCompleto">
    <div class="d-flex align-items-center justify-content-between pe-2">
      <div class="col d-flex align-items-center justify-content-between">
        <span>Nome</span>
        <i class="fas fa-sort me-3" style="color: #dddddd"></i>
      </div>
    </div>
  </th>
  ${provas.map((prova) => `<th>${prova.nomeAbreviado}</th>`).join("")}
  </tr>`;

  var bodyHtml = dados
    .map(function (item) {
      var provasHtml = item.lstProva
        .map(function (prova) {
          return (
            "<td>" +
            '<input type="text" class="form-control py-1" id="prova-' +
            prova.idProva +
            '" value="' +
            (prova.nota !== null ? prova.nota : "") +
            '" style="width: 50px;" ' +
            'data-id="' +
            prova.idProva +
            '" ' +
            'data-id-nota="' +
            (prova.idNota !== null ? prova.idNota : "") +
            '" ' +
            'data-tipo-conceito="' +
            prova.tipoConceito +
            '" ' +
            'data-conceito-max="' +
            prova.conceitoMax +
            '" ' +
            'data-original-value="' +
            (prova.nota !== null ? prova.nota : "") +
            '" ' +
            'oninput="validarNota(this)" />' +
            "</td>"
          );
        })
        .join("");

      return (
        "<tr>" +
        "<td style='cursor: pointer;'>" +
        '<a href="consulta-aluno?id=' +
        item.idAluno +
        '" style="text-decoration: underline;">' +
        item.aluno +
        "</a>" +
        "</td>" +
        "<td>" +
        item.nomeCompleto +
        "</td>" +
        provasHtml +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela").html(headerHtml + bodyHtml);
}

function validarNota(input) {
  var nota = input.value;
  var tipoConceito = input.getAttribute("data-tipo-conceito");
  var conceitoMax = input.getAttribute("data-conceito-max");

  if (tipoConceito === "N") {
    if (isNaN(nota)) {
      input.setCustomValidity("A nota deve ser um número.");
      input.reportValidity();
      document.getElementById("btnSave").disabled = true;
      return;
    } else if (parseFloat(nota) > parseFloat(conceitoMax)) {
      input.setCustomValidity(`A nota não pode ser maior que ${conceitoMax}.`);
      input.reportValidity();
      document.getElementById("btnSave").disabled = true;
      return;
    } else {
      input.setCustomValidity("");
      document.getElementById("btnSave").disabled = false;
    }
  } else if (tipoConceito === "A") {
    if (/\d/.test(nota)) {
      input.setCustomValidity("A nota não pode conter números.");
      input.reportValidity();
      document.getElementById("btnSave").disabled = true;
      return;
    } else {
      input.setCustomValidity("");
      document.getElementById("btnSave").disabled = false;
    }
  }
}

function salvarNotas() {
  let erroValidacao = false;

  $("tr").each(function () {
    const row = $(this);
    const idAluno = row
      .find('a[href*="consulta-aluno"]')
      .attr("href")
      ?.split("=")[1];

    if (idAluno) {
      row.find('input[type="text"]').each(function () {
        const inputValidate = $(this)[0];

        if (!inputValidate.checkValidity()) {
          erroValidacao = true;
          return;
        }

        const input = $(this);
        const idProva = input.data("id");
        const idNota = input.data("id-nota");
        const nota = input.val();

        if (nota !== undefined && nota.trim() !== "") {
          const notaObjPost = {
            alunoId: parseInt(idAluno),
            provaId: parseInt(idProva),
            nota: nota,
            usuarioId: usuarioId,
            compareceu: "S",
          };
          const notaObjPut = {
            idNota: idNota,
            provaId: parseInt(idProva),
            alunoId: parseInt(idAluno),
            nota: nota,
            usuarioId: usuarioId,
            compareceu: "S",
          };

          const method = idNota ? "PUT" : "POST";
          const objetoNota = idNota ? notaObjPut : notaObjPost;

          $.ajax({
            url: `${url_base}/nota`,
            type: method,
            async: false,
            contentType: "application/json",
            data: JSON.stringify(objetoNota),
            error: function (e) {
              console.error(e);
              Swal.fire({
                icon: "error",
                title: "Erro ao salvar",
                text: `Não foi possível alterar todas as notas.`,
              });
              return;
            },
          });
        }
      });
    }
  });

  if (erroValidacao) {
    Swal.fire({
      icon: "error",
      title: "Erro na validação",
      text: "Algumas notas não atendem os critérios.",
    });
    return;
  }

  document.getElementById("btnSave").disabled = false;
  Swal.fire({
    icon: "success",
    title: "Alterado com sucesso!",
  });

  getAlunos();
  updatePagination();
  showPage(currentPage);
}

function getAlunos() {
  $.ajax({
    url: url_base + "/alunos/prova/listarAluno?idTurma=" + turmaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      if (
        data.message !=
        "Nenhum resultado encontrado para os parâmetros informados."
      ) {
        console.log(data.data);
        dados = data.data;
        dadosOriginais = data.data;
        listarDados(data.data);
      } else {
        Swal.fire({
          title: "Nenhum aluno está matriculado a essa turma",
          icon: "info",
          confirmButtonText: `
    						 Matricular Alunos
  					`,
        }).then(() => {
          window.location.href = "matricula?turma=" + turmaId;
        });
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}