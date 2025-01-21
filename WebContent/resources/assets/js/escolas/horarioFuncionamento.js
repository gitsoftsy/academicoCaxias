var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = '';
var idEscola = '';
var horaIni = '';
var horaFim = '';
var descricao = '';
var diaSemana = '';
var ativo = '';
const contaId = Number(localStorage.getItem('contaId'))
var idEscola = sessionStorage.getItem("escolaId");
var pefilEscola = sessionStorage.getItem("perfil")
var escola = JSON.parse(pefilEscola)
var nomeEscola = escola.nome

$(document).ready(function() {

	$("#divAnexoEdit").hide();

	$.ajax({
		url: url_base + `/escolas/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		escolas = data;
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
	});


	getDados()

	// Dropdown de Pesquisa
	$('.dropdown-toggle-form').click(function() {

	});

	$('.searchButton').click(function() {
		var searchInput = $(this).siblings('.searchInput').val().toLowerCase();
		var columnToSearch = $(this).closest('.sortable').data('column');
		var filteredData;

		if (columnToSearch === 'escolaId') {
			filteredData = dadosOriginais.filter(function(item) {
				var escola = escolas.find(function(school) {
					return school.idEscola === item.escolaId;
				});
				var nomeEscola = escola ? escola.nomeEscola.toLowerCase() : "";
				return nomeEscola.includes(searchInput);
			});
		} else if (columnToSearch === 'diaSemana') {
			var filteredData = dadosOriginais.filter(function(item) {
				return item.diaSemana == searchInput;
			});
		} else {
			filteredData = dadosOriginais.filter(function(item) {
				return item[columnToSearch].toString().toLowerCase().includes(searchInput);
			});
		}

		listarDados(filteredData); $('input[data-toggle="toggle"]').bootstrapToggle(); $('input[data-toggle="toggle"]').bootstrapToggle();

		$(this).siblings('.searchInput').val('');
		$(this).closest('.dropdown-content-form').removeClass('show');
	});

	$(document).on('click', '.sortable .col', function() {
		var column = $(this).closest('th').data("column");
		var currentOrder = sortOrder[column] || 'vazio';
		var newOrder;

		if (currentOrder === 'vazio') {
			newOrder = 'asc';
		} else if (currentOrder === 'asc') {
			newOrder = 'desc';
		} else {
			newOrder = 'vazio';
		}

		$(".sortable span").removeClass("asc desc");
		$(this).find('span').addClass(newOrder);

		var icon = $(this).find("i");
		icon.removeClass("fa-sort-up fa-sort-down fa-sort");

		if (newOrder === 'asc') {
			icon.addClass("fa-sort-up");
			sortData(column, newOrder);
		} else if (newOrder === 'desc') {
			icon.addClass("fa-sort-down");
			sortData(column, newOrder);
		} else {
			icon.addClass("fa-sort");
			listarDados(dadosOriginais); $('input[data-toggle="toggle"]').bootstrapToggle(); $('input[data-toggle="toggle"]').bootstrapToggle();
		}

		sortOrder[column] = newOrder;
	});

	function sortData(column, order) {
		var dadosOrdenados = dadosOriginais.slice();

		dadosOrdenados.sort(function(a, b) {
			if (column === 'escolaId') {
				var escolaA = escolas.find(function(school) {
					return school.idEscola === a.escolaId;
				});
				var escolaB = escolas.find(function(school) {
					return school.idEscola === b.escolaId;
				});
				var nomeEscolaA = escolaA ? escolaA.nomeEscola.toLowerCase() : "";
				var nomeEscolaB = escolaB ? escolaB.nomeEscola.toLowerCase() : "";
				if (order === 'asc') {
					return nomeEscolaA.localeCompare(nomeEscolaB);
				} else {
					return nomeEscolaB.localeCompare(nomeEscolaA);
				}
			} else if (column === 'horaInicio' || column === 'horaFim') {
				var timeA = a[column].split(':').reduce((acc, val, i) => acc + val * Math.pow(60, -i), 0);
				var timeB = b[column].split(':').reduce((acc, val, i) => acc + val * Math.pow(60, -i), 0);
				if (order === 'asc') {
					return timeA - timeB;
				} else {
					return timeB - timeA;
				}
			} else {
				var valueA = a[column].toString().toLowerCase();
				var valueB = b[column].toString().toLowerCase();
				if (order === 'asc') {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			}

		});
		listarDados(dadosOrdenados);
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


$("#horaFim").on('blur', function() {
	var horaInicioFormatada = parseInt($("#horaInicio").val())
	var horaFimFormatada = parseInt($("#horaFim").val())

	if (horaFimFormatada < horaInicioFormatada) {
		Swal.fire({
			title: "A hora fim é maior que a hora início",
			confirmButtonText: "Ok",
			icon: 'error'
		}).then((result) => {
			$("#horaFim").val('')
		});
	}
})

$('#limpa-filtros').click(function() {
	listarDados(dadosOriginais);
	$('input[data-toggle="toggle"]').bootstrapToggle();
	$('.searchInput').val('');
});

function getDados() {

	$.ajax({

		url: url_base + `/escolaHorarioFuncionamento/escola/${idEscola}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			dados = data
			dadosOriginais = data;
			listarDados(data);
			$('input[data-toggle="toggle"]').bootstrapToggle();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});
}

function obterNomeDiaSemana(numeroDia) {
	const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Segunda a Sexta"];
	return diasSemana[numeroDia - 1];
}

function listarDados(dados) {
	var html = dados.map(function(item) {

		var escola = escolas.find(function(school) {
			return school.idEscola === item.escolaId;
		});
		if (item.ativo == 'N') {
			ativo = '<i  style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
		}
		else {
			ativo = "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim"
		}

		var horaInicioFormatada = item.horaInicio.substring(0, 5);
		var horaFimFormatada = item.horaFim.substring(0, 5);

		var nomeDiaSemana = obterNomeDiaSemana(item.diaSemana);

		var nomeEscola = escola
			? escola.nomeEscola
			: "Escola não encontrada";

		console.log(item)

		return (
			"<tr>" +
			"<td>" +
			nomeDiaSemana +
			"</td>" +
			"<td>" +
			'Às ' +
			horaInicioFormatada
			+
			"</td>" +
			"<td>" +
			'Às ' +
			horaFimFormatada
			+
			"</td>" +
			"<td>" +
			item.descricao
			+
			"</td>" +
			"<td><div class='d-flex align-items-center gap-1'>" +
			'<input type="checkbox" data-status="' +
			item.ativo +
			'" data-id="' +
			item.idEscolaHorarioFuncionamento +
			' " onChange="alteraStatus(this)" ' +
			(item.ativo === "S" ? "checked" : "") +
			' data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-on="Sim" data-off="Não" data-width="63" class="checkbox-toggle" data-size="sm">' +
			"</div></td>" +
			'<td class="d-flex justify-content-center"><span style=" margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-idEscola="' +
			item.escolaId +
			'" data-id="' +
			item.idEscolaHorarioFuncionamento +
			'" data-horaIni="' +
			item.horaInicio +
			'" data-horaFim="' +
			item.horaFim +
			'" data-diaSemana="' +
			item.diaSemana +
			'" data-ativo="' +
			item.ativo +
			'" data-desc="' +
			item.descricao +
			'" onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span></td>' +
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

	console.log(id)
	console.log(status)

	$.ajax({
		url: url_base + `/escolaHorarioFuncionamento/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).then(data => {
		window.location.href = 'escola-horario-funcionamento'
	})
}

// Exportar Dados

$('#exportar-excel').click(function() {

	var planilha = XLSX.utils.json_to_sheet(dados);

	var livro = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");

	XLSX.writeFile(livro, "horariosFuncionamento.xlsx");
});


// Abrir modal

function showModal(ref) {
	id = ref.getAttribute("data-id");
	idEscola = ref.getAttribute("data-idEscola");
	horaIni = ref.getAttribute("data-horaIni");
	horaFim = ref.getAttribute("data-horaFim");
	diaSemana = ref.getAttribute("data-diaSemana");
	ativo = ref.getAttribute("data-ativo");
	descricao = ref.getAttribute("data-desc")

	$("#escolaIdEdit").val(idEscola).attr('selected', true);
	$("#horaInicioEdit").val(horaIni);
	$("#horaFimEdit").val(horaFim);
	$("#diaSemanaEdit").val(diaSemana).attr('selected', true);
	$("#descricaoEdit").val(descricao)


	if (ativo == "S") {
		$(".ativar").hide();
		$(".desativar").show()
	}
	else {
		$(".desativar").hide();
		$(".ativar").show();
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
		idEscolaHorarioFuncionamento: id,
		escolaId: Number(idEscola),
		horaInicio: formatarHoraParaAPI($("#horaInicioEdit").val()),
		horaFim: formatarHoraParaAPI($("#horaFimEdit").val()),
		diaSemana: $("#diaSemanaEdit").val(),
		descricao: $("#descricaoEdit").val()
	};

	console.log(objeto)

	$.ajax({
		url: url_base + "/escolaHorarioFuncionamento",
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
		}
	})
		.done(function(data) {
			$("#escolaIdEdit").val('');
			$("#horaInicioEdit").val('');
			$("#horaFimEdit").val('');
			$("#diaSemanaEdit").val('');
			$("#descricaoEdit").val('');
			mudarAnexo = false;
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			}).then(() => {
				window.location.href = "escola-horario-funcionamento"
			})
		});

	return false;
}

$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});


// Cadastrar


function cadastrar() {

	var objeto = {
		escolaId: Number(idEscola),
		horaInicio: formatarHoraParaAPI($("#horaInicio").val()),
		horaFim: formatarHoraParaAPI($("#horaFim").val()),
		diaSemana: $("#diaSemana").val(),
		descricao: $("#descricao").val()
	};
	console.log(objeto)

	$.ajax({
		url: url_base + "/escolaHorarioFuncionamento",
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
		}
	})
		.done(function() {
			$("#escolaId").val('');
			$("#horaInicio").val('');
			$("#horaFim").val('');
			$("#diaSemana").val('');
			$("#descricaoEdit").val('');
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Cadastrado com sucesso",
				icon: "success",
			})
		});
	return false;
}

$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});


// Limpa input

function limpaCampo() {
	$("#escolaId").val('');
	$("#horaInicio").val('');
	$("#horaFim").val('');
	$("#diaSemana").val('');
	$("#descricaoEdit").val('');
}
