var dados = [];
var dadosOriginais = [];
const contaId = localStorage.getItem('contaId');
var nome = '';
var rows = 8;
var currentPage = 1;
var pagesToShow = 5;

$(document).ready(function () {
    getDados();

    $("#inputBusca").on("input", function () {
        var valorBusca = $(this).val().toLowerCase();
        if (valorBusca === '') {
            listarDados(dados); // Exibe todos os dados
        } else {
            var dadosFiltrados = dados.filter(item =>
                item.papelPessoa.toLowerCase().includes(valorBusca)
            );
            listarDados(dadosFiltrados); // Exibe dados filtrados
        }
    });

    showPage(currentPage);
    updatePagination();
});

function getDados() {
    $.ajax({
        url: url_base + "/papelPessoa",
        type: "GET",
        async: false,
    })
    .done(function (data) {
        dados = data; // Armazena os dados globalmente
        dadosOriginais = data; // Armazena os dados globalmente
        listarDados(dados); // Exibe todos os dados
        $('input[data-toggle="toggle"]').bootstrapToggle();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
}

function listarDados(lista) {
    var html = lista.map(function (item) {
        var ativo = item.ativo === 'N'
            ? '<i style="color:#ff1f00" class="fa-solid iconeTabela fa-circle-xmark"></i> Não'
            : "<i style='color:#2eaa3a' class='fa-solid iconeTabela fa-circle-check'></i> Sim";

        return (
            "<tr>" +
            "<td>" + item.papelPessoa + "</td>" +
            '<td class="d-flex justify-content-center">' +
            '<span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" ' +
            'class="btn btn-warning btn-sm" data-id="' + item.idPapelPessoa + '" ' +
            'data-nome="' + item.papelPessoa + '" onclick="showModal(this)" ' +
            'data-bs-toggle="modal" data-bs-target="#editAto">' +
            '<i class="fa-solid fa-pen fa-lg"></i></span>' +
            "</td>" +
            "</tr>"
        );
    }).join("");

    $("#cola-tabela").html(html); 
}

function showModal(ref) {
    id = ref.getAttribute("data-id");
    nome = ref.getAttribute("data-nome");
    $('#edit-nome').val(nome);
}

function editar() {
    var objeto = {
        idPapelPessoa: Number(id),
        papelPessoa: $('#edit-nome').val(),
        contaId: contaId
    };

    $.ajax({
        url: url_base + "/papelPessoa",
        type: "PUT",
        data: JSON.stringify(objeto),
        contentType: "application/json; charset=utf-8",
        async: false,
        error: function (e) {
            console.log(e.responseJSON.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Não foi possível realizar esse comando!",
            });
        }
    })
    .done(function () {
        limpaCampo();
        getDados();
        Swal.fire({
            title: "Editado com sucesso",
            icon: "success",
        });
    });

    return false;
}

$('#formEdit').on('submit', function (e) {
    e.preventDefault();
    editar();
});

$('#formCadastro').on('submit', function (e) {
    e.preventDefault();
    cadastrar();
});

function cadastrar() {
    var objeto = {
        papelPessoa: $('#cadastro-nome').val(),
        contaId: contaId
    };

    $.ajax({
        url: url_base + "/papelPessoa",
        type: "POST",
        data: JSON.stringify(objeto),
        contentType: "application/json; charset=utf-8",
        async: false,
        error: function (e) {
            console.log(e.responseJSON.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Não foi possível realizar esse comando!",
            });
        }
    })
    .done(function () {
        limpaCampo();
        getDados();
        Swal.fire({
            title: "Cadastrado com sucesso",
            icon: "success",
        });
    });

    return false;
}

function limpaCampo() {
    $('#cadastro-nome').val('');
    $('#edit-nome').val('');
}