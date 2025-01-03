var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var id = "";
var cursos = [];
const contaId = localStorage.getItem("contaId");

$(document).ready(function() {
	$.ajax({
		url: url_base + "/cursos",
		type: "GET",
		async: false,
	}).done(function(data) {
		cursos = data;
		preencherOpcoes(cursos, "#cursoOptions", "#cursoId", "#cursoSearch");
		preencherOpcoes(
			cursos,
			"#cursoOptionsEdit",
			"#cursoIdEdit",
			"#cursoSearchEdit"
		);
	});

	// Função reutilizável para preencher o select e as opções
	function preencherOpcoes(cursos, optionsListId, selectId, searchId) {
		const $optionsList = $(optionsListId);
		const $cursoId = $(selectId);

		// Limpa as opções anteriores
		$optionsList.empty();
		$cursoId
			.empty()
			.append(
				'<option value="" disabled selected>Selecione uma opção</option>'
			);

		// Itera sobre os cursos retornados pela API
		$.each(cursos, function(index, item) {
			if (item.ativo === "S") {
				// Cria a opção da lista de sugestões
				const optionHTML = `<li data-value="${item.idCurso}">${item.nome} - ${item.codCurso}</li>`;
				$optionsList.append(optionHTML);

				// Cria a opção no select oculto
				$cursoId.append(
					$("<option>", {
						value: item.idCurso,
						text: `${item.nome} - ${item.codCurso}`,
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
			$cursoId.val(selectedValue); // Preenche o select oculto com o ID do curso
			$optionsList.hide(); // Esconde a lista de opções
		});

		// Fecha a lista se o usuário clicar fora
		$(document).on("click", function(e) {
			if (!$(e.target).closest(".custom-select").length) {
				$optionsList.hide();
			}
		});
	}

	$("#searchCurso").on("input", function() {
		const searchValue = $(this).val().toLowerCase();

		$("#cursoId option").each(function() {
			const text = $(this).text().toLowerCase();
			const isMatch = text.includes(searchValue);

			$(this).toggle(isMatch);
		});
	});
	getDados();

	$(".checkbox-toggle").each(function() {
		var status = $(this).data("status");
		if (status !== "S") {
			$(this).prop("checked", false);
		}
	});

	// Dropdown de Pesquisa
	$(".dropdown-toggle-form").click(function() {
		$(this).siblings(".dropdown-content-form").toggleClass("show");
	});

	$(".searchButton").click(function() {
		var searchInput = $(this).siblings(".searchInput").val().toLowerCase();
		var columnToSearch = $(this).closest(".sortable").data("column");
		var filteredData;

		// Filtragem para "cursoId"
		if (columnToSearch === "cursoId") {
			filteredData = dadosOriginais.filter(function(item) {
				var curso = cursos.find(function(school) {
					return school.idCurso === item.cursoId;
				});
				var nome = curso ? curso.nome.toLowerCase() : "";
				return nome.includes(searchInput);
			});
		}
		// Filtragem para "dtHomologacao" e "dtExtincao" (datas)
		else if (
			columnToSearch === "dtHomologacao" ||
			columnToSearch === "dtExtincao"
		) {
			filteredData = dadosOriginais.filter(function(item) {
				var itemDate = item[columnToSearch]
					? item[columnToSearch].split("T")[0]
					: "";
				return itemDate.includes(searchInput);
			});
		}
		// Filtragem genérica para outros campos
		else {
			filteredData = dadosOriginais.filter(function(item) {
				var value = item[columnToSearch]
					? item[columnToSearch].toString().toLowerCase()
					: "";
				return value.includes(searchInput);
			});
		}

		listarDados(filteredData);
		$('input[data-toggle="toggle"]').bootstrapToggle();

		// Limpar input e fechar dropdown
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
			$('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === "cursoId") {
				var escolaA = cursos.find(function(school) {
					return school.idCurso === a.cursoId;
				});
				var escolaB = cursos.find(function(school) {
					return school.idCurso === b.cursoId;
				});
				var nomeA = escolaA ? escolaA.nome.toLowerCase() : "";
				var nomeB = escolaB ? escolaB.nome.toLowerCase() : "";
				if (order === "asc") {
					return nomeA.localeCompare(nomeB);
				} else {
					return nomeB.localeCompare(nomeA);
				}
			} else if (column === "dtHomologacao" || column === "dtExtincao") {
				var dateA = new Date(a[column]);
				var dateB = new Date(b[column]);

				if (order === "asc") {
					return dateA - dateB;
				} else {
					return dateB - dateA;
				}
			} else if (column === "aulasPrevistas") {
				var valueA = parseFloat(a[column]);
				var valueB = parseFloat(b[column]);
				if (order === "asc") {
					return valueA - valueB;
				} else {
					return valueB - valueA;
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
		$('input[data-toggle="toggle"]').bootstrapToggle();
	}

	const dtHomologacao = $("#dtHomologacao");
	const dtExtincao = $("#dtExtincao");
	const prazoIdeal = $("#prazoIdeal");
	const prazoMax = $("#prazoMax");

	const dtHomologacaoEdit = $("#dtHomologacaoEdit");
	const dtExtincaoEdit = $("#dtExtincaoEdit");
	const prazoIdealEdit = $("#prazoIdealEdit");
	const prazoMaxEdit = $("#prazoMaxEdit");

	function displayMessage(element, messageId, messageText) {
		// Remove a mensagem existente
		$(`#${messageId}`).remove();

		// Adiciona nova mensagem
		const message = $("<p></p>")
			.attr("id", messageId)
			.text(messageText)
			.css("color", "#FF0000");
		element.after(message);
	}

	function clearMessage(messageId) {
		$(`#${messageId}`).remove();
	}

	function validateDates(dateStart, dateEnd, messageId, element) {
		const startDate = new Date(dateStart.val());
		const endDate = new Date(dateEnd.val());

		if (dateStart.val() && dateEnd.val() && startDate > endDate) {
			displayMessage(element, messageId, "A data de homologação deve ser igual ou anterior à data de extinção.");
			$("#btn-submit").prop("disabled", true)
			return false;
		} else {
			clearMessage(messageId);
			$("#btn-submit").prop("disabled", false)
		}
		return true;
	}

	function validatePrazos(idealField, maxField, messageId, element) {
		const ideal = parseInt(idealField.val(), 10);
		const max = parseInt(maxField.val(), 10);

		if (idealField.val() && maxField.val() && ideal > max) {
			displayMessage(element, messageId, "O prazo ideal deve ser igual ou menor que o prazo máximo.");
			$("#btn-submit").prop("disabled", true)
			return false;
		} else {
			clearMessage(messageId);
			$("#btn-submit").prop("disabled", false)
		}
		return true;
	}

	// Validações ao sair do foco dos campos originais
	dtHomologacao.on("change", () => validateDates(dtHomologacao, dtExtincao, "errMessageDates", dtHomologacao));
	dtExtincao.on("change", () => validateDates(dtHomologacao, dtExtincao, "errMessageDates", dtHomologacao));
	prazoIdeal.on("change", () => validatePrazos(prazoIdeal, prazoMax, "errMessagePrazos", prazoIdeal));
	prazoMax.on("change", () => validatePrazos(prazoIdeal, prazoMax, "errMessagePrazos", prazoIdeal));

	// Validações ao sair do foco dos campos editáveis
	dtHomologacaoEdit.on("change", () =>
		validateDates(dtHomologacaoEdit, dtExtincaoEdit, "errMessageDatesEdit", dtHomologacaoEdit)
	);
	dtExtincaoEdit.on("change", () =>
		validateDates(dtHomologacaoEdit, dtExtincaoEdit, "errMessageDatesEdit", dtHomologacaoEdit)
	);
	prazoIdealEdit.on("change", () =>
		validatePrazos(prazoIdealEdit, prazoMaxEdit, "errMessagePrazosEdit", prazoIdealEdit)
	);
	prazoMaxEdit.on("change", () =>
		validatePrazos(prazoIdealEdit, prazoMaxEdit, "errMessagePrazosEdit", prazoIdealEdit)
	);


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
		url: url_base + "/curriculo",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data;
			dadosOriginais = data;
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", jqXHR);
		});
}

function formatarDataParaBR(data) {
	var dataObj = new Date(data);

	var dia = String(dataObj.getUTCDate()).padStart(2, "0");
	var mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
	var ano = dataObj.getUTCFullYear();
	return dia + "/" + mes + "/" + ano;
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
			url_base + `/curriculo/${id}${status === "S" ? "/desativar" : "/ativar"}`,
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
		window.location.href = "curriculo";
	});
}

function listarDados(dados) {
	var html = dados
		.map(function(item) {
			var curso = cursos.find(function(school) {
				return school.idCurso === item.cursoId;
			});

			if (item.ativo == "N") {
				ativo =
					'<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
			} else {
				ativo =
					"<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
			}

			var nome = curso
				? `${curso.nome} - ${curso.codCurso}`
				: "Curso não encontrado";

			return (
				"<tr>" +
				"<td>" +
				nome +
				"</td>" +
				"<td>" +
				item.curriculo +
				"</td>" +
				"<td>" +
				item.descricao +
				"</td>" +
				"<td>" +
				(formatarDataParaBR(item.dtHomologacao) == "01/01/1970"
					? "Não possui"
					: formatarDataParaBR(item.dtHomologacao)) +
				"</td>" +
				"<td>" +
				(formatarDataParaBR(item.dtExtincao) == "01/01/1970"
					? "Não possui"
					: formatarDataParaBR(item.dtExtincao)) +
				"</td>" +
				"<td>" +
				item.aulasPrevistas +
				"</td>" +
				"<td><div class='d-flex align-items-center gap-1'>" +
				'<input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idCurriculo +
				' " onChange="alteraStatus(this)" ' +
				(item.ativo === "S" ? "checked" : "") +
				' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
				"</div></td>" +
				'<td><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
				item.idCurriculo +
				'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
				"</tr>"
			);
		})
		.join("");

	$("#cola-tabela").html(html);
}

// Exportar Dados

$("#exportar-excel").click(function() {
	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "curriculos.xlsx");
});

function formatarDataParaAPI(data) {
	var year = data.getFullYear();
	var month = ("0" + (data.getMonth() + 1)).slice(-2);
	var day = ("0" + data.getDate()).slice(-2);

	var hora = "23:59:59";

	return year + "-" + month + "-" + day + "T" + hora;
}

// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");

	$.ajax({
		url: url_base + "/curriculo/" + id,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		if (data.ativo == "S") {
			$(".ativar").hide();
			$(".desativar").show();
		} else {
			$(".desativar").hide();
			$(".ativar").show();
		}

		$("#cursoIdEdit").val(data.cursoId).change(); // Atualiza o valor do select oculto

		// Preenche o campo de pesquisa com o texto correspondente ao cursoId
		const cursoSelecionado = $("#cursoIdEdit option:selected").text();
		$("#cursoSearchEdit").val(cursoSelecionado);

		var dtHomologacao = data.dtHomologacao?.split("T")[0];
		var dtExtincao = data.dtExtincao?.split("T")[0];

		$("#curriculoEdit").val(data.curriculo);
		$("#dtHomologacaoEdit").val(dtHomologacao);
		$("#dtExtincaoEdit").val(dtExtincao);
		$("#prazoIdealEdit").val(data.prazoIdeal);
		$("#prazoMaxEdit").val(data.prazoMax);
		$("#creditosEdit").val(data.creditos);
		$("#aulasPrevistasEdit").val(data.aulasPrevistas);
		$("#descricaoEdit").val(data.descricao);
	});
}

// Editar

function editar() {
	var dtHomologacaoEdit = $("#dtHomologacaoEdit").val() || null;

	var data1 = new Date(dtHomologacaoEdit);

	var data1Formatada = formatarDataParaAPI(data1);

	var dtExtincaoEdit = $("#dtExtincaoEdit").val() || null;

	var data2 = new Date(dtExtincaoEdit);

	var data2Formatada = formatarDataParaAPI(data2);

	var objeto = {
		idCurriculo: id,
		contaId: contaId,
		descricao: $("#descricaoEdit").val(),
		cursoId: Number($("#cursoIdEdit").val()),
		curriculo: $("#curriculoEdit").val(),
		dtHomologacao:
			data1Formatada == "1969-12-31T23:59:59" ? null : data1Formatada,
		dtExtincao: data2Formatada == "1969-12-31T23:59:59" ? null : data2Formatada,
		prazoIdeal: Number($("#prazoIdealEdit").val()),
		prazoMax: Number($("#prazoMaxEdit").val()),
		creditos: Number($("#creditosEdit").val()),
		aulasPrevistas: Number($("#aulasPrevistasEdit").val()),
	};

	$.ajax({
		url: url_base + "/curriculo",
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
		$("#cursoIdEdit").val("");
		$("#curriculoEdit").val("");
		$("#dtHomologacaoEdit").val("");
		$("#dtExtincaoEdit").val("");
		$("#prazoIdealEdit").val("");
		$("#prazoMaxEdit").val("");
		$("#creditosEdit").val("");
		$("#aulasPrevistasEdit").val("");
		$("#descricaoEdit").val();
		getDados();
		showPage(currentPage);
		updatePagination();
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "curriculo";
		});
	});

	return false;
}

$("#formEdit").on("submit", function(e) {
	e.preventDefault();
	 const isValidEdit =
        validateDates(dtHomologacaoEdit, dtExtincaoEdit, "errMessageDatesEdit", dtHomologacaoEdit) &
        validatePrazos(prazoIdealEdit, prazoMaxEdit, "errMessagePrazosEdit", prazoIdealEdit);
	if(!isValidEdit) editar();
	return false;
});

$("#curriculoNew").on("blur", () => {
	const curriculoNew = $("#curriculoNew");

	if (curriculoNew.val().length > 10) {
		const message = $("<p id='errMessageCharacter'></p>")
			.text("Apenas digite no máximo 10 caracteres")
			.css("color", "#FF0000");
		if ($("#cardCurriculo").find("#errMessageCharacter").length > 0) {
			$("#errMessageCharacter").remove();
		}
		$("#btn-submit").attr("disabled", "disabled");
		curriculoNew.addClass("err-message");
		$("#cardCurriculo").append(message);
		message.show();
	} else {
		$("#btn-submit").removeAttr("disabled");
		curriculoNew.removeClass("err-message");
		$("#errMessageCharacter").css("display", "none");
	}
});

$("#curriculoEdit").on("blur", () => {
	const curriculoNew = $("#curriculoEdit");

	if (curriculoNew.val().length > 10) {
		const message = $("<p id='errMessageCharacterEdit'></p>")
			.text("Apenas digite no máximo 10 caracteres")
			.css("color", "#FF0000");
		if ($("#cardCurriculoEdit").find("#errMessageCharacterEdit").length > 0) {
			$("#errMessageCharacterEdit").remove();
		}
		$("#btn-editar").attr("disabled", "disabled");
		curriculoNew.addClass("err-message");
		$("#cardCurriculoEdit").append(message);
		message.show();
	} else {
		$("#btn-editar").removeAttr("disabled");
		curriculoNew.removeClass("err-message");
		$("#errMessageCharacterEdit").css("display", "none");
	}
});

// Cadastrar

function cadastrar() {
	var dtHomologacao = $("#dtHomologacao").val() || null;

	var data1 = new Date(dtHomologacao);

	var data1Formatada = formatarDataParaAPI(data1);

	var dtExtincao = $("#dtExtincao").val() || null;

	var data2 = new Date(dtExtincao);

	var data2Formatada = formatarDataParaAPI(data2);

	var objeto = {
		contaId: contaId,
		descricao: $("#descricao").val(),
		cursoId: Number($("#cursoId").val()),
		curriculo: $("#curriculoNew").val(),
		dtHomologacao:
			data1Formatada == "1969-12-31T23:59:59" ? null : data1Formatada,
		dtExtincao: data2Formatada == "1969-12-31T23:59:59" ? null : data2Formatada,
		prazoIdeal: Number($("#prazoIdeal").val()),
		prazoMax: Number($("#prazoMax").val()),
		creditos: Number($("#creditos").val()),
		aulasPrevistas: Number($("#aulasPrevistas").val()),
	};

	console.log(objeto);

	$.ajax({
		url: url_base + "/curriculo",
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
	}).done(function(data) {
		$("#cursoId").val("");
		$("#curriculo").val("");
		$("#dtHomologacao").val("");
		$("#dtExtincao").val("");
		$("#prazoIdeal").val("");
		$("#prazoMax").val("");
		$("#creditos").val("");
		$("#aulasPrevistas").val("");
		getDados();
		showPage(currentPage);
		updatePagination();
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "curriculo";
		});
	});

	return false;
}

$("#formCadastro").on("submit", function(e) {
	e.preventDefault();
	const isValidOriginal =
		validateDates(dtHomologacao, dtExtincao, "errMessageDates", dtHomologacao) &
		validatePrazos(prazoIdeal, prazoMax, "errMessagePrazos", prazoIdeal);
	if (!isValidOriginal) cadastrar();
	return false;
});

// Limpa input

function limpaCampo() {
	$("#cursoId").val("");
	$("#curriculo").val("");
	$("#dtHomologacao").val("");
	$("#dtExtincao").val("");
	$("#prazoIdeal").val("");
	$("#prazoMax").val("");
	$("#creditos").val("");
	$("#aulasPrevistas").val("");
}
