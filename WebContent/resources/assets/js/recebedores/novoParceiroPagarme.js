var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var escolas = [];
var id = "";
var idEscola = "";
var ativo = "";
const contaId = localStorage.getItem("contaId");
const escolaId = sessionStorage.getItem("escolaId");
const idUsuario = sessionStorage.getItem("usuarioId");
let idCandidato = "";
let concurso = "";
let containerPrincipal = "#step1"
let lastContainer = "#step1";
let dadosFormulario = {}
$(document).ready(function() {
	// Começa no primeiro passo

	$("#formFisica").on("submit", function(e) {

		e.preventDefault();
		
		dadosFormulario = {
			"tipoPessoa": "PF",
			"nome": $("#nome").val(),
			"documento": $("#cpf").val().replace(/\D/g, ""),
			"email": $("#email").val(),
		}

		let currentContainer = $(this).closest(".container-form");
		lastContainer = "#" + currentContainer.attr("id");
		currentContainer.addClass("d-none");

		
		$("#step3").removeClass("d-none");
	});

	$("#formJuridica").on("submit", function(e) {

		e.preventDefault();

		dadosFormulario = {
			"tipoPessoa": "PJ",
			"nome": $("#nomeFantasia").val(),
			"documento": $("#cnpj").val().replace(/\D/g, ""),
			"email": $("#emailCnpj").val(),
		}

		// Esconde o container atual e guarda seu ID
		let currentContainer = $(this).closest(".container-form");
		lastContainer = "#" + currentContainer.attr("id");
		currentContainer.addClass("d-none");
		
		$("#step3").removeClass("d-none");
	});



	$(".btnVoltar").click(function() {
		// Esconde o container atual e volta para o anterior
		$(this).closest(".container-form").addClass("d-none");


		if (lastContainer == "#containerFisica" || lastContainer == "#containerJuridica") {
			$(lastContainer).removeClass("d-none");
			lastContainer = "#step1"
		} else {
			$(containerPrincipal).removeClass("d-none");
		}
	});

	// Botões para escolher o tipo de parceiro
	$("#btnFisica").click(function() {
		$("#step1").addClass("d-none");
		$("#containerFisica").removeClass("d-none");
		lastContainer = "#step1";
	});

	$("#btnJuridica").click(function() {
		$("#step1").addClass("d-none");
		$("#containerJuridica").removeClass("d-none");
		lastContainer = "#step1";
	});
});


function getAswer(input) {

	if ($(input).is(':checked')) {
		return 'S'
	} else {
		return 'N'
	}

}


$("#cpf").on("blur", function() {
	let cpf = $(this).val().replace(/\D/g, ""); // Remove caracteres não numéricos
	if (cpf != "") {
		if (cpf.length !== 11) {
			$("#cpfErro").text("CPF inválido!").show();
			return;
		}

		$.ajax({
			url: url_pagarme + "/recebedoresPf/existByCpf?cpf=" + cpf, // Substitua pela URL correta
			type: "GET",
			contentType: "application/json; charset=utf-8",
			headers: {
				'idConta': contaId
			},
			beforeSend: function() {
				$("#cpfErro").hide();
			},
			success: function(response) {
				console.log(response)
				if (response.encontrado) {
				
					$("#cpf").val(""); // Limpa o campo CPF
					Swal.fire({
						icon: "error",
						title: "CPF já cadastrado!",
						text: "Por favor, utilize outro CPF.",
						confirmButtonText: "OK"
					});
				} else {
					$("#cpfErro").hide();
				}
			},
			error: function(error) {

				console.log(error)

				if (error.responseJSON.mensagem != "CPF não encontrado em nenhuma tabela.") {
					Swal.fire({
						icon: "error",
						title: "Erro!",
						text: "Não foi possível verificar o CPF.",
						confirmButtonText: "OK"
					});
				}

			}
		});
	} else {
		return;
	}
});


$("#cnpj").on("blur", function() {
	let cnpj = $(this).val().replace(/\D/g, "");

	if (cnpj != "") {
		if (cnpj.length !== 14) { // CNPJ tem 14 dígitos
			$("#cnpjErro").text("CNPJ inválido!").show();
			return;
		}

		$.ajax({
			url: url_pagarme + "/recebedorPj/recebedores/existByCnpj?cnpj=" + cnpj,
			type: "GET",
			contentType: "application/json; charset=utf-8",
			headers: {
				'idConta': contaId
			},
			beforeSend: function() {
				$("#cnpjErro").hide();
				$("#cnpj").prop("disabled", true);
			},
			success: function(response) {
				console.log(response)
				if (response.encontrado) {
					$("#cnpj").val("").prop("disabled", false);

					Swal.fire({
						icon: "error",
						title: "CNPJ já cadastrado!",
						text: "Por favor, utilize outro CNPJ.",
						confirmButtonText: "OK"
					});
				} else {
					$("#cnpjErro").hide();
				}
			},
			error: function(error) {
				
				if (error.responseJSON.mensagem != "CNPJ não encontrado em nenhuma tabela." && error.responseJSON.mensagem != "ID da conta não encontrado em nenhuma tabela de recebedores.") {
					console.log(error)
					Swal.fire({
						icon: "error",
						title: "Erro!",
						text: "Não foi possível verificar o CNPJ.",
						confirmButtonText: "OK"
					});
				}else{
					
				}

			},
			complete: function() {
				$("#cnpj").prop("disabled", false); // Reativa o campo após a requisição
			}
		});
	} else {
		return;
	}
});


$("#email, #emailCnpj").on("blur", function() {
	let email = $(this).val().trim();
	let campoErro = $(this).attr("id") === "email" ? "#emailErro" : "#emailCnpjErro"; // Define o seletor do erro correto

	if (!email || !validarEmail(email)) {
		$(campoErro).text("E-mail inválido!").show();
		return;
	}

	$.ajax({
		url: url_pagarme + "/pagarmeRecebedor/recebedores/existByEmail?email=" + encodeURIComponent(email), // Melhorado para evitar problemas de caracteres especiais
		type: "GET",
		headers: {
			'idConta': contaId
		},
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			$(campoErro).hide();
		},
		success: function(response) {
			console.log(response);
			if (response.encontrado) {
				$(`#${$(this).attr("id")}`).val(""); // Limpa o campo correto
				Swal.fire({
					icon: "error",
					title: "E-mail já cadastrado!",
					text: "Por favor, utilize outro e-mail.",
					confirmButtonText: "OK"
				});
			} else {
				$(campoErro).hide();
			}
		},
		error: function() {
			Swal.fire({
				icon: "error",
				title: "Erro!",
				text: "Não foi possível verificar o e-mail.",
				confirmButtonText: "OK"
			});
		}
	});
});


function validarEmail(email) {
	let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

$("#btnNovoCadastro").click(async function(e) {
	e.preventDefault();

	
	dadosFormulario.idUsuario = usuarioId
	dadosFormulario.transfIntervalo = $("#tranferencia").val()
	dadosFormulario.antecipAut = getAswer("#antecipacaAut")

	console.log(dadosFormulario);

	$.ajax({
		url: url_pagarme + '/recebedorTemp',
		type: "POST",
		headers: {
			'idConta': contaId
		},
		data: JSON.stringify(dadosFormulario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			console.error(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível cadastrar o novo parceiro! Verifique seus campos novamente!",
			});
		}
	}).done(function(data) {

		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then(() => {
			window.location.href = "parceiros"
		});

	});
});

