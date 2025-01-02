var dados = [];
var id = '';
var nome = '';
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
const contaId = localStorage.getItem('contaId')
const reserva = localStorage.getItem('numeroReserva')

$(document).ready(function() {


	$("#reserva").text(reserva)

	console.log(contaId)

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

	$.ajax({
		url: url_base + "/candidatos/reservaFinal?candidato=" + reserva,
		type: "GET",
		async: false,
	}).done(function(data) {
		listarDados(data.data);  
		$('input[data-toggle="toggle"]').bootstrapToggle();
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	})


	showPage(currentPage);
	updatePagination();

});


function listarDados(dados) {
	console.log(dados)
	dados.map(function(item) {
		$("#nomeEscola").text(item.nomeEscola)
		$("#turno").text(item.turno)
		$("#serie").text(item.serie)
		$("#curso").text(item.nomeCurso)
	})
}
