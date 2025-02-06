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
let concurso = ""
$(document).ready(function() {
	// Ao clicar no botão "Pessoa Física"
	$('#btnFisica').click(function() {
		$('#step1').hide();  // Esconde os botões iniciais
		$('#formFisica').removeClass('d-none'); // Mostra o formulário de Pessoa Física
	});

	// Ao clicar no botão "Pessoa Jurídica"
	$('#btnJuridica').click(function() {
		$('#step1').hide();
		$('#formJuridica').removeClass('d-none');
	});

	// Botão "Voltar"
	$('.btnVoltar').click(function() {
		$('#formFisica, #formJuridica').addClass('d-none'); // Esconde todos os formulários
		$('#step1').show(); // Volta para a escolha inicial
	});
});