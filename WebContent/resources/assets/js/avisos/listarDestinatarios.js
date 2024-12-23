let dados = [];
let dadosAviso = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 5;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";
let idAviso = params.get("id");

$(document).ready(function () {
  var selectAno = document.getElementById("anoVigenteSelect");
  var anoAtual = new Date().getFullYear();

  var anosRetroativos = anoAtual - 2000;
  var anosFuturos = 2;

  var anoInicial = anoAtual + anosFuturos;
  var anoFinal = anoAtual - anosRetroativos;

  for (var i = anoInicial; i >= anoFinal; i--) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    selectAno.appendChild(option);
  }

  getDados();

  // Dropdown de Pesquisa
  $(".dropdown-toggle-form").click(function () {});

  $(".searchButton").click(function () {
    // Função para normalizar a string (converter para minúsculas e remover acentuação)
    function normalizeString(str) {
      return str
        ? str
            .toLowerCase()
            .normalize("NFD") // Decompor caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remover marcas diacríticas
        : "";
    }

    // Captura o valor da pesquisa e normaliza
    var searchInput = normalizeString($(this).siblings(".searchInput").val());

    var columnToSearch = $(this).closest(".sortable").data("column");
    var filteredData;

    if (columnToSearch === "escolaId") {
      filteredData = dadosOriginais.filter(function (item) {
        var escola = escolas.find(function (school) {
          return school.idEscola === item.escolaId;
        });

        var nomeEscola = escola ? normalizeString(escola.nomeEscola) : "";
        return nomeEscola.includes(searchInput);
      });
    } else if (columnToSearch === "anoVigente") {
      filteredData = dadosOriginais.filter(function (item) {
        return item.anoVigente.toString() === searchInput;
      });
    } else {
      filteredData = dadosOriginais.filter(function (item) {
        var columnValue = normalizeString(
          item[columnToSearch]?.toString() || ""
        );
        return columnValue.includes(searchInput);
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
      $('input[data-toggle="toggle"]').bootstrapToggle();
    }

    sortOrder[column] = newOrder;
  });

  function sortData(column, order) {
    var dadosOrdenados = dadosOriginais.slice();

    dadosOrdenados.sort(function (a, b) {
      if (column === "anoEscolarId") {
        var valueA = a.anoEscolar.anoEscolar.toLowerCase();
        var valueB = b.anoEscolar.anoEscolar.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "turnoId") {
        var valueA = a.turno.turno.toLowerCase();
        var valueB = b.turno.turno.toLowerCase();
        if (order === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (column === "modalidadeEscolaId") {
        var valueA = a.modalidadeEscola.modalidadeEscola.toLowerCase();
        var valueB = b.modalidadeEscola.modalidadeEscola.toLowerCase();
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
    url: url_base + "/aviso/" + idAviso,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dadosAviso = data;
      carregarAviso(data);
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/avisoDestinatario/listarDestinatarios?idAviso=" + idAviso,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      dados = data.data;
      dadosOriginais = data.data;
      listarDados(data.data, dadosAviso);
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function listarDados(dadosDestinatario, dadosAviso) {
  var html = dadosDestinatario
    .map(function (item) {
      const usuarioExibido = dadosAviso.professor
        ? dadosAviso.professor.usuario
        : item.usuario;

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
        " - " +
        item.codigoCurso +
        "</td>" +
        "<td>" +
        usuarioExibido +
        "</td>" +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela").html(html);
}

function formatarData(dataISO) {
  if (!dataISO) return "Data inválida";

  const data = new Date(dataISO);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Os meses começam em 0
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  const segundos = String(data.getSeconds()).padStart(2, "0");

  return `${dia}/${mes}/${ano} `;
}

function carregarAviso(dados) {
  const dataEnvioFormatada = formatarData(dados.dataCadastro);
  const dataInicioFormatada = formatarData(dados.dataInicio);
  const dataFimFormatada = formatarData(dados.dataFim);
  $("#tituloAviso").text(`${dados.tipoAviso.descricao} - ${dados.titulo}`);
  $("#mensagemAviso").html(dados.mensagem);
  $("#dataEnvio").text(`Publicado em ${dataEnvioFormatada}`);

  if (dados.dataInicio != null) {
    $("#dataVigencia").text(
      `Disponível de ${dataInicioFormatada} até ${dataFimFormatada}`
    );
  }

  var anexosContainer = $(".d-flex.flex-wrap.gap-3");
  anexosContainer.empty();

  let avisoAnexo = dados.pathAnexo;
  if (avisoAnexo && avisoAnexo != null) {
    avisoAnexo = dados.pathAnexo.replace("/opt/tomcat9/webapps", "");
    var iconeClasse = "fa-file";
    if (dados.type === "pdf") {
      iconeClasse = "fa-file-pdf text-danger";
    } else if (dados.type === "image") {
      iconeClasse = "fa-image text-info";
    }

    var anexoCard = `
                <div class="anexo-card text-center">
                    <i class="fa-solid ${iconeClasse} fa-2x"></i>
                    <p class="mt-2 mb-1 text-truncate" title="anexo">Anexo do aviso</p>
                    <a href="http://10.40.110.2:8080${avisoAnexo}" class="btn btn-outline-primary btn-sm" download>
    					<i class="fa fa-download" style="font-size: 15px;"></i> Baixar
					</a>
                </div>
            `;
    anexosContainer.append(anexoCard);
  } else {
    anexosContainer.append(
      '<p class="text-muted">Nenhum anexo disponível.</p>'
    );
  }
}

function baixarAnexo(ref) {
  var id = parseInt(ref.getAttribute("data-id"));
  var aviso = dados.find((item) => item.idAviso === id);

  if (!aviso || !aviso.pathAnexo) {
    alert("Anexo não disponível para este aviso.");
    return;
  }

  var link = document.createElement("a");
  link.href =
    "http://10.40.110.2:8080" +
    aviso.pathAnexo.replace("/opt/tomcat9/webapps", "");
  link.download = aviso.titulo.replace(/[^a-zA-Z0-9]/g, "_") || "anexo";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Exportar Dados

$("#exportar-excel").click(function () {
  var planilha = XLSX.utils.json_to_sheet(dados);

  var livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

  XLSX.writeFile(livro, "turmas.xlsx");
});
