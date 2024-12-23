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
let idDisciplina;
const matriculaProfessor = params.get("matricula");
const idProfessorPes = params.get("id");
const cpfPes = params.get("cpf");

$(document).ready(function () {
  $(".container-table").hide();
  $("#btn-save").hide();
  $.ajax({
    url: url_base + "/areaConhecimento/conta/" + contaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      console.log("Dados de Área de Conhecimento:", data);
      preencherOpcoes(
        data,
        "#areaConhecimentoOption",
        "#areaConhecimentoId",
        "#areaConhecimentoSearch"
      );
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  $.ajax({
    url: url_base + "/disciplina/conta/" + contaId,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      console.log(data);

      $.each(data, function (index, item) {
        preencherOpcoes(
          data,
          "#disciplinaOptions",
          "#disciplinaId",
          "#disciplinaSearch"
        );
      });
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

  $("#areaConhecimentoOption").click(() => {
    $("#disciplinaId").empty();
    $("#disciplinaOption").empty();
    $("#disciplinaId").removeAttr("disabled");
    $("#disciplinaId").append(
      `<option value='0' selected disabled>Selecione a disciplina</option>`
    );

    let area = $("#areaConhecimentoId").val();
    $.ajax({
      url: url_base + "/disciplina/areaConhecimento/" + area,
      type: "GET",
      async: false,
    })
      .done(function (data) {
        preencherOpcoes(
          data,
          "#disciplinaOptions",
          "#disciplinaId",
          "#disciplinaSearch"
        );
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
      });
  });

  function preencherOpcoes(dados, optionsListId, selectId, searchId) {
    const $optionsList = $(optionsListId);
    const $escolaId = $(selectId);

    $optionsList.empty();
    $escolaId
      .empty()
      .append(
        '<option value="" disabled selected>Selecione uma opção</option>'
      );

    $.each(dados, function (index, item) {
      const optionText =
        item.codDiscip && item.nome
          ? `${item.codDiscip} - ${item.nome}`
          : item.areaConhecimento
          ? `${item.areaConhecimento}`
          : "Opção Inválida";
      $optionsList.append(
        `<li data-value="${
          item.idDisciplina || item.idAreaConhecimento
        }">${optionText}</li>`
      );
      $escolaId.append(
        $("<option>", {
          value: item.idAreaConhecimento ?? item.idDisciplina ?? "",
          text: optionText || "Valor Inválido",
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

function listarDisciplinas(dados) {
  var html = dados
    .map(function (item) {
      var ativo;

      if (item.ativo == "N") {
        ativo =
          '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
      } else {
        ativo =
          "<i  style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
      }

      return (
        "<tr>" +
        "<td>" +
        item.nome +
        "</td>" +
        "<td>" +
        "<a href='disciplinas'>" +
        item.codDiscip +
        " - " +
        item.nome +
        "</a>" +
        "</td>" +
        "<td>" +
        item.horasAno +
        "</td>" +
        "<td>" +
        item.horasSemanal +
        "</td>" +
        "<td><div class='d-flex align-items-center gap-1'>" +
        '<input type="checkbox" data-status="' +
        item.ativoProfessorDisciplina +
        '" data-id="' +
        item.idProfessorDisciplina +
        ' " onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
        "</div></td>" +
        "</tr>"
      );
    })
    .join("");

  $("#cola-tabela-disciplina").html(html);
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
      `/professorDisciplina/${id}${status === "S" ? "/desativar" : "/ativar"}`,
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
    console.log(data);
    getDisciplinas();
  });
}

/*const removerDisciplina = (element) => {
	idDisciplina = element.getAttribute("data-id")
	Swal.fire({
		title: "Deseja tirar essa disciplina do professor?",
		icon: "warning",
		showCancelButton: true,
		showConfirmButton: false,
		showDenyButton: true,
		denyButtonText: 'Retirar',
		cancelButtonText: 'Cancelar'
	}).then(result => {
		if (result.isDenied) {
			$.ajax({
				url: url_base + "/contaPadraoAcessos/" + Number(id),
				type: "delete",
				contentType: "application/json; charset=utf-8",
				async: false,
				error: function(e) {
					console.log(e)
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Não foi possível realizar esse comando!"

					});
				}
			}).done(function(data) {
				Swal.fire({
					title: "Deletado com sucesso",
					icon: "success",
				}).then((data) => {
					window.location.href = 'padraoAcesso'
				})
			})
		} else if (result.isCanceled) { }
	})
}*/

const selecionar = (element) => {
  idProfessorSelecionado = element.getAttribute("data-id");
  listarProfessores(listaProfessores);
  $('input[data-toggle="toggle"]').bootstrapToggle();
  getDisciplinas();
};

const selecionarMatricula = (id) => {
  idProfessorSelecionado = id;
  listarProfessores(listaProfessores);
  $('input[data-toggle="toggle"]').bootstrapToggle();
  getDisciplinas();
};

const getDisciplinas = () => {
  $.ajax({
    url:
      url_base +
      "/professores/disciplinas?idProfessor=" +
      idProfessorSelecionado,
    type: "GET",
    async: false,
    error: function (e) {
      console.log(url);
      console.log(e);
    },
  })
    .done(function (data) {
      console.log(data);

      listarDisciplinas(data.data);
      $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(url);
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
};

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
        console.log(data);
        listaProfessores = data.data;
        listarProfessores(data.data);
        $('input[data-toggle="toggle"]').bootstrapToggle();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(url);
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
};

const adicionar = () => {
  let objeto = {
    professorId: idProfessorSelecionado,
    disciplinaId: $("#disciplinaId").val(),
  };

  if (idProfessorSelecionado == "") {
  } else {
    $.ajax({
      url: url_base + "/professorDisciplina",
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
              text: "Essa disciplina já foi adicionada para esse professor!",
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
        $("#disciplinaId").val("");
        getDisciplinas();
      });
    });
  }
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
