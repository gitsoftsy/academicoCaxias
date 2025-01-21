var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var turmas = [];
var id = "";
var idTurma = "";
var horaIni = "";
var horaFim = "";
var diaSemana = "";
var permiteChoqueHorario = "";

$(document).ready(function() {
	$.ajax({
		url: url_base + "/turma",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			turmas = data;
			preencherOpcoes(turmas, "#turmaOptions", "#turmaId", "#turmaSearch");
			preencherOpcoes(
				turmas,
				"#turmaOptionsEdit",
				"#turmaIdEdit",
				"#turmaSearchEdit"
			);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
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
		$.each(turmas, function(index, item) {
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
			$turmaId.val(selectedValue); // Preenche o select oculto com o ID da turma
			$optionsList.hide(); // Esconde a lista de opções
		});

		// Fecha a lista se o usuário clicar fora
		$(document).on("click", function(e) {
			if (!$(e.target).closest(".custom-select").length) {
				$optionsList.hide();
			}
		});
	}

	getDados();

	// Dropdown de Pesquisa
	$(".dropdown-toggle-form").click(function() {
		$(this).siblings(".dropdown-content-form").toggleClass("show");
	});

	$(".searchButton").click(function() {
		const searchInput = $(this).siblings(".searchInput").val().toLowerCase().trim();
		const columnToSearch = $(this).closest(".sortable").data("column");
		let filteredData;

		if (searchInput) {
			if (columnToSearch === "nomeTurma") {
				filteredData = dadosOriginais.filter(item =>
					item.turma?.nomeTurma?.toLowerCase() === searchInput
				);
			} else if (columnToSearch === "diaSemana") {
				filteredData = dadosOriginais.filter(item =>
					item.diaSemana?.toString() === searchInput
				);
			} else {
				filteredData = dadosOriginais.filter(item =>
					item[columnToSearch]?.toString().toLowerCase().includes(searchInput)
				);
			}
		} else {
			// Caso o campo de pesquisa esteja vazio, retorna os dados originais.
			filteredData = dadosOriginais;
		}

		dados = filteredData
		listarDados(filteredData);
		showPage(currentPage);
		updatePagination();

		$('input[data-toggle="toggle"]').bootstrapToggle();

		// Limpa o campo de pesquisa e fecha o dropdown
		$(this).siblings(".searchInput").val("");
		$(this).closest(".dropdown-content-form").removeClass("show");
	});


	$(document).on("click", ".sortable .col", function() {
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

		dadosOrdenados.sort(function(a, b) {
			if (column === "turmaId") {
				var turmaA = turmas.find(function(school) {
					return school.idTurma === a.turmaId;
				});
				var turmaB = turmas.find(function(school) {
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
		
		dados = dadosOrdenados
		listarDados(dadosOrdenados);
		showPage(currentPage);
		updatePagination();

		$('input[data-toggle="toggle"]').bootstrapToggle();
	}

	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});

	showPage(currentPage);
	updatePagination();
});

$("#limpa-filtros").click(function() {
	currentPage = 1;
	dados = [...dadosOriginais];

	updatePagination();
	showPage(currentPage);

	$(".searchInput").val("");
	$('input[data-toggle="toggle"]').bootstrapToggle();
});


function getDados() {
	$.ajax({
		url: url_base + "/turmaDiaSemana",
		type: "GET",
		async: false,
	})
		.done(function(data) {

			console.log(data)
			dados = data;
			dadosOriginais = data;
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function obterNomeDiaSemana(numeroDia) {
	const diasSemana = [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	];
	return diasSemana[numeroDia - 1];
}

function listarDados(dados) {
	var html = dados
		.map(function(item) {
			var chequeHorario = item.permiteChoqueHorario != "N" ? "Sim" : "Não";

			var horaInicioFormatada = item.horaInicio.substring(0, 5);
			var horaFimFormatada = item.horaFim.substring(0, 5);

			var nomeDiaSemana = obterNomeDiaSemana(item.diaSemana);

			return (
				"<tr>" +
				"<td>" +
				item.turma.nomeTurma +
				"</td>" +
				"<td>" +
				nomeDiaSemana +
				"</td>" +
				"<td>" +
				"Às " +
				horaInicioFormatada +
				"</td>" +
				"<td>" +
				"Às " +
				horaFimFormatada +
				"</td>" +
				"<td>" +
				chequeHorario +
				"</td>" +
				"<td><div class='d-flex align-items-center gap-1'>" +
				'<input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idTurmaDiaSemana +
				' " onChange="alteraStatus(this)" ' +
				`${item.ativo === "S" ? "checked" : ""}` +
				' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
				"</div></td>" +
				'<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idTurma="' +
				item.turmaId +
				'" data-id="' +
				item.idTurmaDiaSemana +
				'" data-permitechoquehorario="' +
				item.permiteChoqueHorario +
				'" data-horaIni="' +
				item.horaInicio +
				'" data-horaFim="' +
				item.horaFim +
				'" data-diaSemana="' +
				item.diaSemana +
				'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela").html(html);
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
			`/turmaDiaSemana/${id}${status === "S" ? "/desativar" : "/ativar"}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
	}).then((data) => {
		window.location.href = "turma-dia-semana";
	});
}

// Exportar Dados

$("#exportar-excel").click(function() {
	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "diasSemana.xlsx");
});

function getAswer(input) {
	if ($(input).is(":checked")) {
		return "S";
	} else {
		return "N";
	}
}

// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");
	const idTurma = ref.getAttribute("data-idTurma");
	const horaIni = ref.getAttribute("data-horaIni");
	const horaFim = ref.getAttribute("data-horaFim");
	const diaSemana = ref.getAttribute("data-diaSemana");
	const permiteChoqueHorario = ref.getAttribute("data-permitechoquehorario");

	$("#turmaSearchEdit").val(""); // Limpa o campo de busca
	$("#turmaOptionsEdit").hide();

	$("#turmaIdEdit").val(idTurma).change(); // Atualiza o valor do select oculto
	const turmaSelecionada = $("#turmaIdEdit option:selected").text();
	$("#turmaSearchEdit").val(turmaSelecionada); // Preenche o campo de pesquisa

	$("#horaInicioEdit").val(horaIni);
	$("#horaFimEdit").val(horaFim);
	$("#diaSemanaEdit").val(diaSemana).attr("selected", true);
	if (permiteChoqueHorario == "S") {
		$("#permiteChoqueHorarioEdit").attr("checked", true);
	} else {
		$("#permiteChoqueHorarioEdit").attr("checked", false);
	}
}

function formatarHoraParaAPI(hora) {
	if (/^\d{2}:\d{2}$/.test(hora)) {
		return hora + ":00";
	}
	return hora;
}

// Editar

function editar() {
	var objeto = {
		idTurmaDiaSemana: id,
		turmaId: Number($("#turmaIdEdit").val()),
		horaInicio: formatarHoraParaAPI($("#horaInicioEdit").val()),
		horaFim: formatarHoraParaAPI($("#horaFimEdit").val()),
		diaSemana: $("#diaSemanaEdit").val(),
		permiteChoqueHorario: getAswer("#permiteChoqueHorarioEdit"),
	};

	console.log(objeto);

	$.ajax({
		url: url_base + "/turmaDiaSemana",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		$("#turmaIdEdit").val("");
		$("#horaInicioEdit").val("");
		$("#horaFimEdit").val("");
		$("#diaSemanaEdit").val("");
		getDados();
		showPage(currentPage);
		updatePagination();
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "turma-dia-semana";
		});
	});

	return false;
}

$("#formEdit").on("submit", function(e) {
	e.preventDefault();
	editar();
	return false;
});

// Cadastrar

function cadastrar() {
	var objeto = {
		turmaId: Number($("#turmaId").val()),
		horaInicio: formatarHoraParaAPI($("#horaInicio").val()),
		horaFim: formatarHoraParaAPI($("#horaFim").val()),
		diaSemana: $("#diaSemana").val(),
		permiteChoqueHorario: getAswer("#choqueHorario"),
	};

	$.ajax({
		url: url_base + "/turmaDiaSemana",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function() {
		$("#turmaId").val("");
		$("#horaInicio").val("");
		$("#horaFim").val("");
		$("#diaSemana").val("");
		getDados();
		showPage(currentPage);
		updatePagination();
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "turma-dia-semana";
		});
	});
	return false;
}

$("#formCadastro").on("submit", function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

// Limpa input

function limpaCampo() {
	$("#turmaId").val("");
	$("#turmaSearch").val("");
	$("#horaInicio").val("");
	$("#horaFim").val("");
	$("#diaSemana").val("");
}
