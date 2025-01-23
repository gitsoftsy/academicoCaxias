var url_base = "http://10.40.110.2:8080/api-educacional-dev";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const path_base = $(location).attr("origin") + "/" + $(location).attr("pathname").split("/")[1] + "/resources/menu";
const nomeConta = localStorage.getItem("nomeConta")
const usuarioId = localStorage.getItem("usuarioId");
const contaPadraoAcessoId = localStorage.getItem("idContaAcesso");


$('#escolaIdStyle').css('display', 'none')
$('#escolaIdStyleEdit').css('display', 'none')
$(document).ready(function() {
	
	$('<script/>',{type:'text/javascript', src:'/front-educacional-caxias/resources/assets/js/util/getContainerAluno.js'}).appendTo('head');

	// Fechar dropdowns quando clicar fora deles
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.dropdown-form').length) {
			$('.dropdown-content-form').hide(); // Esconde todos os dropdowns
		}
	});

	// Abrir/fechar dropdown específico
	$('.dropdown-toggle-form').on('click', function() {
		$('.dropdown-content-form').not($(this).next()).hide();
		$(this).next('.dropdown-content-form').toggle();
	});
	
	 $('.searchButton').click(function() {
        $(this).closest('.dropdown-content-form').slideUp();
    });
	
	// Caminho base para os favicons
	var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf('/', 1));

	// Array de favicons para adicionar
	var favicons = [
		{ rel: 'apple-touch-icon', sizes: '180x180', href: `${contextPath}/resources/assets/img/apple-touch-icon.png` },
		{ rel: 'icon', type: 'image/png', sizes: '32x32', href: `${contextPath}/resources/assets/img/favicon-32x32.png` },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', href: `${contextPath}/resources/assets/img/favicon-16x16.png` }
	];

	// Loop para criar e adicionar cada favicon
	$.each(favicons, function(index, favicon) {
		var link = $('<link>', {
			rel: favicon.rel,
			sizes: favicon.sizes,
			href: favicon.href
		});

		// Se o favicon tiver um tipo, adiciona ao link
		if (favicon.type) {
			link.attr('type', favicon.type);
		}

		// Adiciona o link ao <head> do documento
		$('head').append(link);
	})

	/*	const links = [
			{ rel: "apple-touch-icon", sizes: "180x180", href: "<%=contextPath%>/resources/assets/img/apple-touch-icon.png" },
			{ rel: "icon", type: "image/png", sizes: "32x32", href: "<%=contextPath%>/resources/assets/img/favicon-32x32.png" },
			{ rel: "icon", type: "image/png", sizes: "16x16", href: "<%=contextPath%>/resources/assets/img/favicon-16x16.png" },
			{ rel: "manifest", href: "<%=contextPath%>/resources/assets/favicon/site.webmanifest" }
		];
	
		links.forEach(linkData => {
			const link = document.createElement('link');
			Object.keys(linkData).forEach(attr => {
				link.setAttribute(attr, linkData[attr]);
			});
			document.head.appendChild(link);
		});*/

	sessionStorage.setItem('nomeConta', nomeConta)
	sessionStorage.setItem('usuarioId', usuarioId)

	/*// Função para adicionar ou atualizar um segmento na URL
	function atualizarSegmentoURL(novoSegmento) {
		var parametro = 'id=' + novoSegmento;
		var novaUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + parametro;
		history.pushState({ path: novaUrl }, '', novaUrl);
	}
	*/
	containerResponsivo();

	$(".desativar").toggleClass("btn-secondary btn-danger")
	$(".ativar").toggleClass("btn-secondary btn-success")



	const url = window.location.pathname
	if (url.includes('login') == false && url.includes('cadastroConta') == false) {
		const contaId = localStorage.getItem('contaId')
		sessionStorage.setItem('contaId', contaId)

		let transacao = "/" + $(location).attr('href').split("/")[$(location).attr('href').split("/").length - 1];
		

		if (transacao.includes('?')) {
			let pathUrl = transacao
			
			transacao = pathUrl.split('?')[0]
			
		}

		$.ajax({
			url: url_base + `/transacoes/acessos/${usuarioId}?url=${transacao}`,
			type: "get",
			error: function(e) {
				
				if (e.responseText == "Nenhum acesso encontrado para o usuário ou transação informado.") {
					console.log(e.responseText)
					
				}
			}
		}).then(data => {
			
			if (data[0].acessa == 'N') {
				Swal.fire({
					title: "Acesso não autorizado.",
					icon: "info",
				}).then(result => {
					if (result) {
						window.location.href = "acessar-escolas"
					}
				})
			}

			if (data[0].altera == 'N') {
				$('.edit-val').css('cursor', 'pointer').attr('disabled', true);
				$('.edit-val').wrap('<div class="box-edit-val" title="Seu usuário não tem autorização"></div>');

				$('.btn-new-alter').css('cursor', 'pointer').attr('disabled', true);
				$('.btn-new-alter').wrap('<div class="box-edit-val px-3 py-1 ms-auto" title="Seu usuário não tem autorização"></div>');

				$('.checkbox-toggle').css('cursor', 'pointer').attr('disabled', true);
				$('.checkbox-toggle').wrap('<div class="box-edit-val" onclick="notAccess()" title="Seu usuário não tem autorização"></div>');

				$('.statusAprovacao').css('cursor', 'pointer').attr('disabled', true);
				$('.statusAprovacao').wrap('<div class="box-edit-val" title="Seu usuário não tem autorização"></div>');

				$('.toggle-group').click(() => notAccess())

				$('span:has(i.fa-pen)').each(function() {
					var $span = $(this);

					var $button = $('<button>', {
						html: $span.html(),
						class: $span.attr('class') + ' edit-table',
						id: $span.attr('id'),
						style: $span.attr('style')
					});

					$.each($span.data(), function(name, value) {
						$button.attr('data-' + name, value);
					});

					$button.on('click', function() {
						$span.trigger('click');
					});

					$span.replaceWith($button);
				});

				$('.edit-table').css('width', '100%').attr('disabled', true);
				$('.edit-table').wrap('<div class="box-edit-val" style="width:50%; display: flex; align-items:center; justify-content:center" title="Seu usuário não tem autorização"></div>');

				// Inicializar tooltips
				var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
				var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
					return new bootstrap.Tooltip(tooltipTriggerEl);
				});
			}
		})

		if (isNaN(contaId) || contaId == 0 || contaId == "" || contaId == undefined) {
			Swal.fire({
				title: "Nenhum usuário localizado, logue novamente",
				icon: "info",
			}).then(result => {
				if (result) {
					window.location.href = "login"
				}
			})
		}
	}
	
	const perfilEscola = sessionStorage.getItem("perfil")
	if (window.location.pathname.includes('escola') && !(window.location.toString().includes("acessar")) && !(window.location.toString().includes("nova-escola")) && !(window.location.toString().includes("editar-escola"))) {

		if (perfilEscola == undefined || perfilEscola == null) {
			Swal.fire({
				html: `<h3>Nenhuma escola selecionada. Clique em 
    <span class="btn btn-warning btn-sm">
      <i class="fa-solid fa-right-to-bracket fa-lg"></i>
    </span> para selecionar.</h3>`,
				icon: "info",
			}).then(result => {
				if (result) {
					window.location.href = "acessar-escolas"
				}
			})
		}
	}
})

var str = localStorage.getItem('nomeConta').toLowerCase();
str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
	return letter.toUpperCase();
});

const notAccess = () => {
	Swal.fire({
		title: "Seu usuário não tem permissão para essa ação",
		icon: "info",
	}).then(result => {
		if (result) {
		}
	})
}

window.addEventListener("load", function() {
	$("#menu").load(path_base + "/menu.html");
	const loader = document.querySelector(".bg-loading");
	loader.parentElement.removeChild(loader);
	$(".bg-loading").addClass("none");
	$(".bg-loading").fadeOut();

});


function getValorSelects() {
	const contaId = localStorage.getItem('contaId')
	$.ajax({
		url: url_base + '/dependenciaAdministrativa',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#dependenciaAdmId').append($('<option>', {
				value: item.idDependenciaAdministrativa,
				text: item.dependenciaAdministrativa,
				name: item.dependenciaAdministrativa
			}));
		});
	})

	$.ajax({
		url: url_base + '/situacaoFuncionamento',
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#situacaoFuncionamentoId').append($('<option>', {
				value: item.idSituacaoFuncionamento,
				text: item.situacaoFuncionamento,
				name: item.situacaoFuncionamento
			}));
		});
	})

	$.ajax({
		url: url_base + `/formaOcupacaoPredio/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#formaOcupacaoPredioId').append($('<option>', {
				value: item.idFormaOcupacaoPredio,
				text: item.formaOcupacaoPredio,
				name: item.formaOcupacaoPredio
			}));
		});
	})

	$.ajax({
		url: url_base + `/orgaoPublico/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#orgaoPublicoId').append($('<option>', {
				value: item.idOrgaoPublico,
				text: item.orgaoPublico,
				name: item.orgaoPublico
			}));
		});
	})
	$.ajax({
		url: url_base + `/zoneamento/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#zoneamentoId').append($('<option>', {
				value: item.idZoneamento,
				text: item.zoneamento,
				name: item.zoneamento
			}));
		});
	})
	$.ajax({
		url: url_base + `/categoriaEscolaPrivada/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#categoriaEscolaPrivadaId').append($('<option>', {
				value: item.idCategoriaEscolaPrivada,
				text: item.categoriaEscolaPrivada,
				name: item.categoriaEscolaPrivada
			}));
		});
	})
	$.ajax({
		url: url_base + `/entidadeSuperior/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#entidadeSuperiorId').append($('<option>', {
				value: item.idEntidadeSuperior,
				text: item.entidadeSuperior,
				name: item.entidadeSuperior
			}));
		});
	})

	$.ajax({
		url: url_base + `/localizacao/conta/${contaId}`,
		type: "get",
		async: false,
	}).done(function(data) {
		$.each(data, function(index, item) {
			$('#localizacaoId').append($('<option>', {
				value: item.idLocalizacao,
				text: item.localizacao,
				name: item.localizacao
			}));
		});
	})
}


function getSearchParams(k) {
	var p = {};
	location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, key, value) {
		p[key] = value;
	});
	return k ? p[k] : p;
}

function desativar(endpoint) {
	$.ajax({
		url: url_base + `/${endpoint}/${id}/desativar`,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			$('#edit-nome').val('');
			getDados();
			Swal.fire({
				title: "Desativado com sucesso",
				icon: "success",
			})
		})
	return false;
}

function ativar(endpoint) {
	$.ajax({
		url: url_base + `/${endpoint}/${id}/ativar`,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON.message)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",

			});
		}
	})
		.done(function(data) {
			$('#edit-nome').val('');
			getDados();
			Swal.fire({
				title: "Ativado com sucesso",
				icon: "success",
			})
		})
	return false;
}

function remover(endpoint) {
	$.ajax({
		url: url_base + `/${endpoint}/${id}`,
		type: "DELETE",
		contentType: "application/json; charset=utf-8",
		async: false,
		error: function(e) {
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Falha na requisição"
			});
		}
	})
		.done(function(data) {
			getDados();
			showPage(currentPage);
			updatePagination();
			Swal.fire({
				title: "Removido com sucesso!",
				icon: "success",
			})
		})
	return false;
}


function containerResponsivo() {
	let container = $('<div>')
	container.addClass('container-table')
	container.append($('.table').not('.tableNot'))
	$('#pagination').before(container)
}



function showPage(page) {
	currentPage = page;
	const start = (page - 1) * rows;
	const end = start + rows;
	const paginatedData = dados.slice(start, end);

	listarDados(paginatedData);
	$('input[data-toggle="toggle"]').bootstrapToggle();
	updatePagination(); // Atualiza os botões da paginação
}

// Função para atualizar os números de página e controlar os botões 'Prev' e 'Next'
function updatePagination() {
	totalPages = Math.ceil(dados.length / rows);
	let paginationHTML = "";

	// Gera os botões de número de página dinamicamente
	for (let i = 1; i <= totalPages; i++) {
		paginationHTML += `
            <button class="btn btn-sm page-number" data-page="${i}">
                ${i}
            </button>`;
	}

	$("#page-numbers").html(paginationHTML);

	// Habilita ou desabilita os botões de 'Prev' e 'Next'
	$("#prev").prop("disabled", currentPage === 1);
	$("#next").prop("disabled", currentPage === totalPages);
}

// Evento de clique nos números de página
$(document).on("click", ".page-number", function() {
	const selectedPage = parseInt($(this).data("page"));
	showPage(selectedPage);
});

// Evento de clique no botão 'Prev'
$("#prev").click(function() {
	if (currentPage > 1) {
		showPage(currentPage - 1);
	}
});

// Evento de clique no botão 'Next'
$("#next").click(function() {
	if (currentPage < totalPages) {
		showPage(currentPage + 1);
	}
});




