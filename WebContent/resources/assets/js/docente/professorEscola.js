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
let idProfessor = null;
let idProfessorSelecionado = "";
let url = "";
var listaProfessores;
const matriculaProfessor = params.get("matricula");
const idProfessorPes = params.get("id");
const cpfPes = params.get("cpf");

$(document).ready(function () {
  $(".container-table").hide();
  $("#btn-save").hide();
  $.ajax({
    url: url_base + `/escolas/usuario/${contaId}/${usuarioId}`,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      preencherOpcoes(data, "#escolaOptions", "#escolaId", "#escolaSearch");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  if (matriculaProfessor != undefined) {
    $("#matricula").val(matriculaProfessor);
    $("#cpf").val(cpfPes);
    buscar();
    selecionarMatricula(idProfessorPes);
  }

  function preencherOpcoes(
    escolas,
    optionsListId,
    selectId,
    searchId,
  ) {
    const $optionsList = $(optionsListId);
    const $escolaId = $(selectId);

    $optionsList.empty();
    $escolaId
      .empty()
      .append(
        '<option value="" disabled selected>Selecione uma opção</option>'
      );

    $.each(escolas, function (index, item) {
      $optionsList.append(
        `<li data-value="${item.idEscola}">${item.nomeEscola}</li>`
      );
      $escolaId.append(
        $("<option>", {
          value: item.idEscola,
          text: item.nomeEscola,
        })
      );
    });

    $(searchId).on("focus", function () {
      $optionsList.show();
    });

    $(searchId).on("input", function () {
      const searchValue = $(this).val().toLowerCase();
      $optionsList.find("li").each(function () {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(searchValue));
      });
    });

    $optionsList.on("click", "li", function () {
      const selectedText = $(this).text();
      const selectedValue = $(this).data("value");

      $(searchId).val(selectedText);
      $escolaId.val(selectedValue);
      $optionsList.hide();
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest(".custom-select").length) {
        $optionsList.hide();
      }
    });
  }
});

function listarProfessores(dados) {
  var html = dados
    .map(function (item) {
      var ativo;

      if (item.ativo == "N") {
        ativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      let colorBtn = "btn-warning";

      if (idProfessorSelecionado == item.idProfessor) {
        colorBtn = "btn-primary";
      }

      return (
        "<tr>" +
        '<td class="d-flex justify-content-center"><span style="width: 50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn ' +
        colorBtn +
        ' btn-sm" data-id="' +
        item.idProfessor +
        '" data-nome="' +
        item.nomeCompleto +
        '"onclick="selecionar(this)"><i class="fa-solid fa-right-to-bracket fa-lg"></i></span></td>' +
        "<td>" +
        item.nomeCompleto +
        "</td>" +
        "<td>" +
        item.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") +
        "</td>" +
        "<td>" +
        item.matricula +
        "</td>" +
        "<td>" +
        item.emailInstitucional +
        "</td>" +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela-professor").html(html);
}

const selecionar = (element) => {
  idProfessorSelecionado = element.getAttribute("data-id");
  listarProfessores(listaProfessores);
  getEscolas();
  $('input[data-toggle="toggle"]').bootstrapToggle();
};

const selecionarMatricula = (id) => {
  idProfessorSelecionado = id;
  listarProfessores(listaProfessores);
  getEscolas();
};

const getEscolas = () => {
  $.ajax({
    url:
      url_base + "/professores/escolas?idProfessor=" + idProfessorSelecionado,
    type: "GET",
    async: false,
    error: function (e) {
      console.log(url);
      console.log(e);
    },
  })
    .done(function (data) {
      console.log(data.data);

      listarEscolas(data.data);
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(url);
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
};

function listarEscolas(dados) {
  var html;

  if (dados.length > 0) {
    html = dados
      .map(function (item) {
        var tipoEscola;
        var cnpj =
          item.cnpj !== null
            ? item.cnpj.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                "$1.$2.$3/$4-$5"
              )
            : "Não possui CNPJ";

        if ((item.tipoEscola = "PV")) {
          tipoEscola = "Privada";
        } else {
          tipoEscola = "Publica";
        }

        return (
          "<tr>" +
          "<td>" +
          item.nomeEscola +
          "</td>" +
          "<td>" +
          tipoEscola +
          "</td>" +
          "<td>" +
          item.email +
          "</td>" +
          "<td>" +
          cnpj +
          "</td>" +
          "<td><div class='d-flex align-items-center gap-1'>" +
          '<input type="checkbox" data-status="' +
          item.ativoProfessorEscola +
          '" data-id="' +
          item.idProfessorEscola +
          ' " onChange="alteraStatus(this)" ' +
          `${item.ativo === "S" ? "checked" : ""}` +
          ' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
          "</div></td>" +
          "</tr>"
        );
      })
      .join("");
  } else {
    html = "<tr>" + "</tr>";
  }

  $("#cola-tabela-escola").html(html);
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

  console.log(id);
  console.log(status);

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

  $.ajax({
    url:
      url_base +
      `/professorEscola/${id}${status === "S" ? "/desativar" : "/ativar"}`,
    type: "put",
    error: function (e) {
      Swal.close();
      console.log(e);
      console.log(e.responseJSON);
      Swal.fire({
        icon: "error",
        title:
          "Não foi possivel desativar no momento! Tente novamente após alguns instantes.",
      });
    },
  }).then((data) => {
    console.log("Funfou");
    console.log(data);
    getDisciplinas();
  });
}

$("#btn-buscar").click(() => {
  buscar();
});

const buscar = () => {
  let nome = $("#nomeProfessor").val();
  let cpf = $("#cpf")
    .val()
    .replace(/[^\d]+/g, "");
  let matricula = $("#matricula").val();

  /*let url = url_base + `/professores/filtrar?cpf${cpf}=&nome=${nome}&matricula=${matricula}`*/
  let cpfPath = cpf != "" ? `cpf=${cpf}&` : "";
  let nomePath = nome != "" ? `nome=${nome}&` : "";
  let matriculaPath = matricula != "" ? `matricula=${matricula}&` : "";

  url = url_base + `/professores/filtrar?` + cpfPath + nomePath + matriculaPath;

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
      if (data.data.length <= 0) {
        Swal.fire({
          text: "Nenhuma informação encontrada para os filtros informados.",
          icon: "info",
        }).then((result) => {
          $("#nomeProfessor").val("");
          $("#cpf").val("");
          $("#matricula").val("");
        });
      } else {
        $(".container-table").show();
        $("#btn-save").show();
        $("#messageInfo").addClass("none");
        listaProfessores = data.data;
        listarProfessores(data.data);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
};

const adicionar = () => {
  let objeto = {
    professorId: idProfessorSelecionado,
    escolaId: $("#escolaId").val(),
  };

  $.ajax({
    url: url_base + "/professorEscola",
    type: "POST",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    async: false,
    beforeSend: function () {
      Swal.showLoading();
    },
    error: function (e) {
      Swal.close();
      console.log(e);
      if (e.responseJSON != undefined) {
        if (e.responseJSON.error == "Duplicidade de registro") {
          Swal.fire({
            icon: "error",
            title: "Erro de duplicidade",
            text: "Essa escola já foi adicionada para esse professor!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Não foi possível realizar esse comando!",
        });
      }
    },
  }).done(function (data) {
    Swal.close();
    Swal.fire({
      title: "Adicionado com sucesso",
      icon: "success",
    }).then((result) => {
      $("#escolaId").val("");
      getEscolas();
      $('input[data-toggle="toggle"]').bootstrapToggle();
    });
  });
};

$("#editItem").on("submit", function (e) {
  e.preventDefault();

  if (idProfessorSelecionado != null) {
    adicionar();
  } else {
    Swal.fire({
      title: "Selecione um professor!!",
      icon: "info",
    });
  }
  return false;
});
