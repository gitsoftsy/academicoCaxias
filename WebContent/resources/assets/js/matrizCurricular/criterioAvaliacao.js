var dados = [];
const contaId = localStorage.getItem('contaId');;
var nome = '';
var nome2 = '';
var nome3 = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;
let descricao = ''
let id = ''
var sortOrder = {};
var dadosOriginais = [];

$(document).ready(function() {

	$('.dropdown-toggle-form').click(function() {
		console.log('TESTE');
		
	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		console.log("Search Input:", searchInput);

		var columnToSearch = $(this).closest('.sortable').data('column');
		console.log("Column to Search:", columnToSearch);

		var filteredData = dadosOriginais.filter(function(item) {
			item.nomeTurmaPes = item.turma.nomeTurma
			item.dataProvaPes = item.dataProva.toString()

			console.log(item)
			var valueToCheck = item[columnToSearch] ? item[columnToSearch].toString().toLowerCase() : '';
			console.log(searchInput.toLowerCase())
			return valueToCheck.toString().includes(searchInput.toLowerCase());
		});

		console.log("Filtered Data:", filteredData);
		listarDados(filteredData);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();

		$(this).siblings('.searchInput').val('');
		$(this).closest('.dropdown-content-form').removeClass('show')
		$('.checkbox-toggle').each(function() {
			var status = $(this).data('status');
			if (status !== 'S') {
				$(this).prop('checked', false);
			}
		})

		$('input[data-toggle="toggle"]').bootstrapToggle()
	});

	getDados()

	showPage(currentPage);
	updatePagination();

	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	});
});


function getDados() {
	$.ajax({
		url: url_base + "/criteriosAvaliacao",
		type: "GET",
		async: false,
	}).done(function(data) {
		dadosOriginais = data
		listarDados(data);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
		$('.searchInput').val('');
		$('.checkbox-toggle').each(function() {
			var status = $(this).data('status');
			if (status !== 'S') {
				$(this).prop('checked', false);
			}
		})

		$('input[data-toggle="toggle"]').bootstrapToggle()
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});
}

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);  $('input[data-toggle="toggle"]').bootstrapToggle();$('input[data-toggle="toggle"]').bootstrapToggle();
	$('.searchInput').val('');
	$('.checkbox-toggle').each(function() {
		var status = $(this).data('status');
		if (status !== 'S') {
			$(this).prop('checked', false);
		}
	})

	$('input[data-toggle="toggle"]').bootstrapToggle()
});

function listarDados(dados) {
	var html = dados.map(function(item) {
		var ativo;

		if (item.ativo == "N") {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não';
		} else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";
		}

		var partesData = item.dataProva.split("-");
		var dataFormatada = partesData[2] + "/" + partesData[1] + "/" + partesData[0];

		return (
			"<tr>" +

			"<td>" +
			item.turma.escola.nomeEscola +
			"</td>" +

			"<td>" +
			`${item.turma.periodoLetivo.ano}/${item.turma.periodoLetivo.periodo}` +
			"</td>" +

			"<td>" +
			item.turma.turno.turno +
			"</td>" +

			"<td>" +
			`${item.turma.nomeTurma}` +
			"</td>" +

			"<td>" +
			`${item.turma.gradeCurricular.disciplina.nome} - ${item.turma.gradeCurricular.disciplina.codDiscip}` +
			"</td>" +

			"<td>" +
			item.codCriterioAvaliacao +
			"</td>" +

			"<td>" +
			item.criterioAvaliacao +
			"</td>" +

			"<td>" +
			item.ordem +
			"</td>" +

			"<td>" +
			dataFormatada +
			"</td>" +

			"<td><div class='d-flex align-items-center gap-1'>" +
			'<input type="checkbox" data-status="' +
			item.ativo +
			'" data-id="' +
			item.idCriterioAvaliacao +
			' " onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</div></td>" +
			'<td class="d-flex justify-content-center"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
			item.idCriterioAvaliacao +
			'" onclick="showModal(this)"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
			"</tr>"
		);
	}).join("");

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

	$.ajax({
		url: url_base + `/criteriosAvaliacao/${id}${status === "S" ? '/desativar' : '/ativar'}`,
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
		getDados()
	})
}

function showModal(ref) {
	limpaCampo()
	id = ref.getAttribute("data-id");

	window.location.href = "novo-criterio-avaliacao?id=" + id
}

function limpaCampo() {
	$('#escolaId').val('')
	$('#turnoId').val('')
	$('#periodoLetivoId').val('')
	$('#gradeCurricularId').val('')
	$('#nomeTurma').val('')
	$('#codTurmaInep').val('')
	$('#vagas').val('')
	$('#libras').val('')
	$('#controlaVagas').val('')
}