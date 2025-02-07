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
let containerPrincipal = "#step1"
let lastContainer = "#step1"; 
$(document).ready(function () {
	// Começa no primeiro passo

    $(".btnStep").click(function () {
        // Esconde o container atual e guarda seu ID
        let currentContainer = $(this).closest(".container-form");
        lastContainer = "#" + currentContainer.attr("id");
        currentContainer.addClass("d-none");

        // Exibe o próximo passo
        if (currentContainer.is("#formFisica")) {
            $("#step3").removeClass("d-none");
        } else if (currentContainer.is("#formJuridica")) {
            $("#step3").removeClass("d-none");
        }
    });

    $(".btnVoltar").click(function () {
        // Esconde o container atual e volta para o anterior
        $(this).closest(".container-form").addClass("d-none");
        
        
        if(lastContainer == "#formFisica" || lastContainer == "#formJuridica"){
			$(lastContainer).removeClass("d-none");
			lastContainer = "#step1"
		}else{
			$(containerPrincipal).removeClass("d-none");
		}
    });

    // Botões para escolher o tipo de parceiro
    $("#btnFisica").click(function () {
        $("#step1").addClass("d-none");
        $("#formFisica").removeClass("d-none");
        lastContainer = "#step1";
    });

    $("#btnJuridica").click(function () {
        $("#step1").addClass("d-none");
        $("#formJuridica").removeClass("d-none");
        lastContainer = "#step1";
    });
});
