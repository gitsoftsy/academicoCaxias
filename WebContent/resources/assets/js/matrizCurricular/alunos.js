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
			/*item.nomeTurmaPes = item.turma.nomeTurma*/
			item.matriculaPes = item.aluno
			item.nomePes = item.pessoa.nomeCompleto
			item.cursoPes = `${item.curso.nome} - ${item.curso.codCurso}`
			item.seriePes = item.serie.serie
			item.escolaPes = item.escola.nomeEscola
			item.turnoPes = item.turno.turno
			item.emailPes = item.emailInterno
			item.situacaoAlunoPes = item.situacaoAluno.situacaoAluno
			item.cpfPes = item.pessoa.cpf

			console.log(item)
			var valueToCheck = item[columnToSearch] ? item[columnToSearch].toString().toLowerCase() : '';
			console.log(searchInput.toLowerCase())
			return valueToCheck.toString().includes(searchInput.toLowerCase());
		});

		console.log("Filtered Data:", filteredData);
		listarDados(filteredData); $('input[data-toggle="toggle"]').bootstrapToggle(); $('input[data-toggle="toggle"]').bootstrapToggle();

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
		url: url_base + "/alunos",
		type: "GET",
		async: false,
	}).done(function(data) {
		dadosOriginais = data
		dados = data
		listarDados(data); $('input[data-toggle="toggle"]').bootstrapToggle(); $('input[data-toggle="toggle"]').bootstrapToggle();
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
	listarDados(dadosOriginais); $('input[data-toggle="toggle"]').bootstrapToggle(); $('input[data-toggle="toggle"]').bootstrapToggle();
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
		
		const cpf = item.pessoa.cpf == null ? 'Não possui' : item.pessoa.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

		return (
			"<tr>" +

			"<td>" +
			item.aluno +
			"</td>" +

			"<td>" +
			item.pessoa.nomeCompleto +
			"</td>" +

			"<td>" +
			cpf +
			"</td>" +

			"<td>" +
			`${item.curso.nome} - ${item.curso.codCurso}` +
			"</td>" +


			"<td>" +
			item.serie.serie +
			"</td>" +

			"<td>" +
			item.escola.nomeEscola +
			"</td>" +

			"<td>" +
			item.turno.turno +
			"</td>" +

			"<td>" +
			(item.emailInterno || "Não possui") +
			"</td>" +

			"<td>" +
			item.situacaoAluno.situacaoAluno +
			"</td>" +

			'<td class="d-flex justify-content-center">' +
			'<span style="width:50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" ' +
			'data-id=' + item.idAluno +
			' onclick="showModal(this)"><i class="fa-solid fa-file-lines "></i></span>' +
			'<span style="width:50%; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-primary btn-sm" ' +
			'data-id=' + item.idAluno +
			' onclick="verAvisosAluno(this)"><i class="fa-solid fa-bell"></i></span>' +
			/*			'<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-id="' +
						item.idAluno +
						'" onclick="showModal(this)"><i class="fa-solid fa-pen fa-lg"></i></span>' +*/
			'</td>' +
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
	id = ref.getAttribute("data-id");

	window.location.href = "consulta-aluno?id=" + id
}

function verAvisosAluno(ref) {
	id = ref.getAttribute("data-id");

	window.location.href = "avisos?idAluno=" + id
}
