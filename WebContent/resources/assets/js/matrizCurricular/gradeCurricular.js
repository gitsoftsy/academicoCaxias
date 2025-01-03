var dados = [];
const contaId = localStorage.getItem('contaId');;
const curriculoIdSession = sessionStorage.getItem("curriculoId")
const cursoIdSession = sessionStorage.getItem("cursoId")
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = ''
let id = ''

function getAswer(input) {
	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}
}

$(document).ready(function() {
	$(".container-table").hide()
	if (curriculoIdSession !== null && curriculoIdSession !== undefined && curriculoIdSession !== 0) {
		$('#curriculoIdLista').removeAttr('disabled');
		$("#cotainerNewCadastro").removeClass("none");
		$(".container-table").show();

		$.ajax({
			url: url_base + `/curriculo/curso/${cursoIdSession}`,
			type: "get",
			async: false,
		}).done(function(data) {
			console.log(data)
			$.each(data, function(index, item) {
				$('#curriculoIdLista').append($('<option>', {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo
				}));
			});
		});

		$('#curriculoIdLista').val(curriculoIdSession).select2();
		$('#cursoIdLista').val(cursoIdSession).select2();
		getDados(curriculoIdSession);
	}



	$.ajax({
		url: url_base + "/cursos/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			if (item.ativo == "S") {
				$("#cursoIdLista").append(
					$("<option>", {
						value: item.idCurso,
						text: `${item.nome} - ${item.codCurso}`,
						name: item.nome,
					})
				);
			}

		});

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$('#areaConhecimentoOption').click(() => {
		console.log('Click area')
		$('#disciplinaId').empty()
		$('#disciplinaOption').empty()
		$('#disciplinaId').removeAttr('disabled');
		$('#disciplinaId').append(`<option value='0' selected disabled>Selecione a disciplina</option>`)

		let area = $('#areaConhecimentoId').val()
		console.log(area)
		$.ajax({
			url: url_base + "/disciplina/areaConhecimento/" + area,
			type: "GET",
			async: false,
		}).done(function(data) {

			preencherOpcoes(
				data,
				"#disciplinaOption",
				"#disciplinaId",
				"#disciplinaSearch"
			);

		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
	});

	$('#cursoIdLista').change(() => {

		$('#curriculoIdLista').empty()
		$('#curriculoIdLista').removeAttr('disabled');
		$('#curriculoIdLista').append(`<option value='0' selected disabled>Selecione o currículo</option>`)

		let curso = $('#cursoIdLista').val()
		$.ajax({
			url: url_base + `/curriculo/curso/${curso}`,
			type: "get",
			async: false,
		}).done(function(data) {
			console.log(data)
			$.each(data, function(index, item) {
				$('#curriculoIdLista').append($('<option>', {
					value: item.idCurriculo,
					text: item.curriculo,
					name: item.curriculo
				}));
			});

		})
	});


	$.ajax({
		url: url_base + "/curriculo",
		type: "GET",
		async: false,
	}).done(function(data) {
		preencherOpcoes(
			data,
			"#curriculoOption",
			"#curriculoId",
			"#curriculoSearch"
		);

		preencherOpcoes(
			data,
			"#curriculoOptionEdit",
			"#curriculoIdEdit",
			"#curriculoSearchEdit"
		);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/serie",
		type: "GET",
		async: false,
	}).done(function(data) {
		preencherOpcoes(
			data,
			"#serieOption",
			"#serieId",
			"#serieSearch"
		)

		preencherOpcoes(
			data,
			"#serieOptionEdit",
			"#serieIdEdit",
			"#serieSearchEdit"
		)
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});

	$.ajax({
		url: url_base + "/areaConhecimento/conta/" + contaId,
		type: "GET",
		async: false,
	}).done(function(data) {
		console.log("Dados de Área de Conhecimento:", data); // Log para verificar o retorno
		preencherOpcoes(
			data,
			"#areaConhecimentoOption",
			"#areaConhecimentoId",
			"#areaConhecimentoSearch"
		);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});



	$.ajax({
		url: url_base + "/disciplina",
		type: "GET",
		async: false,
	}).done(function(data) {
		preencherOpcoes(
			data,
			"#disciplinaOption",
			"#disciplinaId",
			"#disciplinaSearch"
		);

		preencherOpcoes(
			data,
			"#disciplinaOptionEdit",
			"#disciplinaIdEdit",
			"#disciplinaSearchEdit"
		);

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});



	$("#inputBusca").on("keyup", function() {
		var valorBusca = $(this).val().toLowerCase();

		if (valorBusca === '') {
			busca()
			$("#cola-tabela tr").show();
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
			}).show();
		}
	});

	$("#inputBusca").on("input", function() {
		var valorBusca = $(this).val().toLowerCase();
		realizarBusca(valorBusca);
	});

	function realizarBusca(valorInput) {
		if (valorInput === '') {
			showPage(currentPage);
		} else {
			$("#cola-tabela tr").hide().filter(function() {
				return $(this).text().toLowerCase().indexOf(valorInput) > -1;
			}).show();
		}
	}

	$('#curriculoIdLista').select2()
	$('#cursoIdLista').select2()



	showPage(currentPage);
	updatePagination();


});

function getDados(idCurriculo) {
	$.ajax({
		url: url_base + "/gradeCurricular/curriculo/" + idCurriculo,
		type: "GET",
		async: false,
	}).done(function(data) {
		if (data.length > 0) {
			console.log(data)
			dados = data
			listarDados(data)
			$('input[data-toggle="toggle"]').bootstrapToggle();
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não existe nenhuma grade vinculada a este currículo!"
			}).then();
			$("#cola-tabela tbody").empty()
		}

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
}
function listarDados(dados) {
	var html = dados.map(function(item) {
		var obrigatorio = item.obrigatoria == "N" ? "Não" : "Sim";
		var retemAluno = item.retemSerie == "N" ? "Não" : "Sim";

		return (
			"<tr>" +
			"<td>" + `${item.serie.serie} - ${item.serie.descricao}` + "</td>" +
			"<td>" + `${item.disciplina.codDiscip} - ${item.disciplina.nome}` + "</td>" +
			"<td>" + obrigatorio + "</td>" +
			"<td>" + item.curriculo.aulasPrevistas + "</td>" +
			"<td>" + retemAluno + "</td>" +
			"<td>" +
			'<input type="checkbox" data-status="' + item.ativo + '" data-id="' + item.idGradeCurricular + '" onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' + item.idGradeCurricular + '" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editAto"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

	$("#cola-tabela").html(html);

	// Inicializar o toggle
	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});

	// Certifique-se de que o Bootstrap Toggle esteja inicializado corretamente

}



$("#btnModalCadastrar").click(() => {
	$("#curriculoId").val($("#curriculoIdLista").val())
})

function preencherOpcoes(items, optionsListId, selectId, searchId) {
	const $optionsList = $(optionsListId);
	const $selectElement = $(selectId);

	$optionsList.empty();
	$selectElement
		.empty()
		.append(
			'<option value="" disabled selected>Selecione uma opção</option>'
		);

	$.each(items, function(index, item) {



		// Primeiro, verifica se o item está ativo, caso exista a chave "ativo"
		if (item.ativo === "S" || item.areaConhecimento) {
			const optionText =
				item.curriculo
					? `${item.curriculo}`
					: item.serie && item.descricao
						? `${item.serie} - ${item.descricao}`
						: item.codDiscip && item.nome
							? `${item.codDiscip} - ${item.nome}`
							: item.areaConhecimento
								? `${item.areaConhecimento}`
								: "Opção Inválida";




			$optionsList.append(
				`<li data-value="${item.idCurriculo || item.idSerie || item.idAreaConhecimento || item.idDisciplina
				}">${optionText}</li>`
			);
			$selectElement.append(
				$("<option>", {
					value: item.idCurriculo ?? item.idSerie ?? item.idAreaConhecimento ?? item.idDisciplina ?? '',
					text: optionText || 'Valor Inválido',
				})
			);

		}


	});

	// Exibe as opções ao focar no campo de busca
	$(searchId).on("focus", function() {
		$optionsList.show();
	});

	// Filtra as opções conforme o usuário digita
	$(searchId).on("input", function() {
		const searchValue = $(this).val().toLowerCase();
		$optionsList.find("li").each(function() {
			const text = $(this).text().toLowerCase();
			$(this).toggle(text.includes(searchValue));
		});
	});

	// Ao clicar em uma opção, atualiza o campo de busca e o select oculto
	$optionsList.on("click", "li", function() {
		const selectedText = $(this).text();
		const selectedValue = $(this).data("value");

		$(searchId).val(selectedText); // Preenche o campo de pesquisa
		$selectElement.val(selectedValue); // Preenche o select oculto com o ID
		$optionsList.hide(); // Esconde a lista de opções
	});

	// Fecha a lista se o usuário clicar fora
	$(document).on("click", function(e) {
		if (!$(e.target).closest(".custom-select").length) {
			$optionsList.hide();
		}
	});
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

	console.log(id)

	$.ajax({
		url: url_base + `/gradeCurricular/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e);
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).then(data => {
		window.location.href = 'grade-curricular'
	})
}

function showModal(ref) {
	id = ref.getAttribute("data-id");

	$.ajax({
		url: url_base + "/gradeCurricular/" + id,
		type: "GET",
		async: false,
	}).done(function(data) {

		preecherSwitch('#obrigatoriaEdit', data.obrigatoria)
		preecherSwitch('#retemSerieEdit', data.retemSerie)

		preencherCampoBusca(
			"#serieSearchEdit",
			"#serieOptionEdit",
			"#serieIdEdit",
			data.serie.idSerie
		);

		preencherCampoBusca(
			"#curriculoSearchEdit",
			"#curriculoOptionEdit",
			"#curriculoIdEdit",
			data.curriculo.idCurriculo
		);

		preencherCampoBusca(
			"#disciplinaSearchEdit",
			"#disciplinaOptionEdit",
			"#disciplinaIdEdit",
			data.disciplina.idDisciplina
		);

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
}

function preecherSwitch(switchId, valor) {
	if (valor === "S") {
		$(switchId).prop("checked", true)
	} else {
		$(switchId).prop("checked", false)
	}
}

function preencherCampoBusca(searchId, optionsListId, selectId, valorId) {
	$(selectId).val(valorId).change(); // Atualiza o valor do select
	const textoSelecionado = $(selectId + " option:selected").text(); // Texto do select
	$(searchId).val(textoSelecionado); // Preenche o campo de pesquisa
	$(optionsListId).hide(); // Esconde a lista de opções
}

function listarGrade() {
	const idCurriculo = $("#curriculoIdLista").val()
	console.log(idCurriculo)

	if (idCurriculo != null && idCurriculo != undefined && idCurriculo != 0) {
		$("#cotainerNewCadastro").removeClass("none");
		$(".container-table").show();
		$("#messageInfo").addClass("none")
		getDados(idCurriculo)
		showPage(1);
		updatePagination();
	} else {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Você deve preencher os dois campos antes de listar as grades!",
		});
	}

}

function editar() {
	var objeto = {
		idGradeCurricular: id,
		serieId: $('#serieIdEdit').val(),
		disciplinaId: $('#disciplinaIdEdit').val(),
		curriculoId: $('#curriculoIdEdit').val(),
		obrigatoria: getAswer('#obrigatoriaEdit'),
		retemSerie: getAswer('#retemSerieEdit')
	}

	$.ajax({
		url: url_base + "/gradeCurricular",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			}).then(result => {
				sessionStorage.setItem("cursoId", $("#cursoIdLista").val())
				sessionStorage.setItem("curriculoId", $("#curriculoIdLista").val())
				getDados($("#curriculoIdLista").val())
			})
		})
	return false;
}
$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});
$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

function cadastrar() {
	var objeto = {
		serieId: $('#serieId').val(),
		disciplinaId: $('#disciplinaId').val(),
		curriculoId: $('#curriculoIdLista').val(),
		obrigatoria: getAswer('#obrigatoria'),
		retemSerie: getAswer('#retemSerie'),
	}

	$.ajax({
		url: url_base + "/gradeCurricular",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e)
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			Swal.close()
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			}).then(result => {
				sessionStorage.setItem("cursoId", $("#cursoIdLista").val())
				sessionStorage.setItem("curriculoId", $("#curriculoIdLista").val())
				getDados($("#curriculoIdLista").val())
			})
		})
	return false;
}

function limpaCampo() {
	preencherCampoBusca(
		"#curriculoSearch",
		"#curriculoOption",
		"#curriculoId",
		$('#curriculoIdLista').val()
	);
	$('#nomeSerie').val('');
	$('#descricao').val('');
}