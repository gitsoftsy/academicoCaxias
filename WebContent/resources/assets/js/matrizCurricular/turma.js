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

$(document).ready(function() {
	$(".searchbutton").click(function() {
		var searchinput = $(this)
			.siblings(".searchinput")
			.val()
			.tolowercase()
			.normalize("nfd")
			.replace(/[\u0300-\u036f]/g, "");

		var columntosearch = $(this).closest(".sortable").data("column");

		var filtereddata = dadosoriginais.filter(function(item) {
			item.turnopes = item.turno.turno;
			item.anoperiodopes =
				item.periodoletivo.ano + "/" + item.periodoletivo.periodo;
			item.disciplinapes =
				item.gradecurricular.disciplina.coddiscip +
				" - " +
				item.gradecurricular.disciplina.nome;
			item.libraspes = item.libras == "s" ? "sim" : "não";
			item.escolapes = item.escola.nomeescola;
			item.cursopes = `${item.gradecurricular.curriculo.nomecurso} - ${item.gradecurricular.curriculo.codcurso}`
			item.curriculopes = `${item.gradecurricular.curriculo.curriculo}`
			item.seriepes = item.gradecurricular.serie.serie + " - " + item.gradecurricular.serie.descricao

			var valuetocheck = item[columntosearch]
				? item[columntosearch]
					.tostring()
					.tolowercase()
					.normalize("nfd")
					.replace(/[\u0300-\u036f]/g, "")
				: "";

			return valuetocheck.includes(searchinput);
		});

		dados = filtereddata;


		listardados(dados);
		updatepagination();
		showpage(1);
		$('input[data-toggle="toggle"]').bootstraptoggle();

		$(this).siblings(".searchinput").val("");
		$(this).closest(".dropdown-content-form").removeclass("show");

		$(".checkbox-toggle").each(function() {
			var status = $(this).data("status");
			if (status !== "s") {
				$(this).prop("checked", false);
			}
		});

		$('input[data-toggle="toggle"]').bootstraptoggle();
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
			dados = dadosOriginais;
			showPage(1);
			updatePagination();
			$('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			var valueA, valueB;

			switch (column) {
				case "nomeTurma":
					valueA = a.nomeTurma ? a.nomeTurma.toString().toLowerCase() : "";
					valueB = b.nomeTurma ? b.nomeTurma.toString().toLowerCase() : "";
					break;
				case "disciplinaPes":
					valueA = a.gradeCurricular && a.gradeCurricular.disciplina
						? (a.gradeCurricular.disciplina.codDiscip + " - " + a.gradeCurricular.disciplina.nome).toLowerCase()
						: "";
					valueB = b.gradeCurricular && b.gradeCurricular.disciplina
						? (b.gradeCurricular.disciplina.codDiscip + " - " + b.gradeCurricular.disciplina.nome).toLowerCase()
						: "";
					break;
				case "escolaPes":
					valueA = a.escola ? a.escola.nomeEscola.toString().toLowerCase() : "";
					valueB = b.escola ? b.escola.nomeEscola.toString().toLowerCase() : "";
					break;
				case "cursoPes":
					valueA = a.gradeCurricular && a.gradeCurricular.curriculo && a.gradeCurricular.curriculo.nomeCurso
						? a.gradeCurricular.curriculo.nomeCurso.toString().toLowerCase()
						: "";
					valueB = b.gradeCurricular && b.gradeCurricular.curriculo && b.gradeCurricular.curriculo.nomeCurso
						? b.gradeCurricular.curriculo.nomeCurso.toString().toLowerCase()
						: "";
					break;

				case "curriculoPes":
					valueA = a.gradeCurricular && a.gradeCurricular.curriculo && a.gradeCurricular.curriculo.curriculo
						? a.gradeCurricular.curriculo.curriculo.toString().toLowerCase()
						: "";
					valueB = b.gradeCurricular && b.gradeCurricular.curriculo && b.gradeCurricular.curriculo.curriculo
						? b.gradeCurricular.curriculo.curriculo.toString().toLowerCase()
						: "";
					break;
				case "seriePes":
					valueA = a.gradeCurricular && a.gradeCurricular.serie && a.gradeCurricular.serie.serie && a.gradeCurricular.serie.descricao
						? (a.gradeCurricular.serie.serie + " - " + a.gradeCurricular.serie.descricao).toLowerCase()
						: "";
					valueB = b.gradeCurricular && b.gradeCurricular.serie && b.gradeCurricular.serie.serie && b.gradeCurricular.serie.descricao
						? (b.gradeCurricular.serie.serie + " - " + b.gradeCurricular.serie.descricao).toLowerCase()
						: "";
					break;
				case "anoPeriodoPes":
					valueA = a.periodoLetivo && a.periodoLetivo.ano && a.periodoLetivo.periodo
						? (a.periodoLetivo.ano + "/" + a.periodoLetivo.periodo).toLowerCase()
						: "";
					valueB = b.periodoLetivo && b.periodoLetivo.ano && b.periodoLetivo.periodo
						? (b.periodoLetivo.ano + "/" + b.periodoLetivo.periodo).toLowerCase()
						: "";
					break;
				case "turnoPes":
					valueA = a.turno && a.turno.turno
						? a.turno.turno.toString().toLowerCase()
						: "";
					valueB = b.turno && b.turno.turno
						? b.turno.turno.toString().toLowerCase()
						: "";
					break;
				case "vagas":
					valueA = a.vagas ? a.vagas.toString().toLowerCase() : "";
					valueB = b.vagas ? b.vagas.toString().toLowerCase() : "";
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


	getDados();

	showPage(currentPage);
	updatePagination();

	$(".checkbox-toggle").each(function() {
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
		.done(function(data) {
			dados = data;
			dadosOriginais = data;
			listarDados(data);
			console.log(data)
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

// limpar filtros

$("#limpa-filtros").click(function() {
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
					`${item.gradeCurricular.curriculo.nomeCurso} - ${item.gradeCurricular.curriculo.codCurso}` +
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
					'" style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" title="Alunos da turma" class="btn btn-primary btn-sm"><i class="fa-solid fa-users fa-lg"></i></a>' +
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
		error: function(e) {
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
