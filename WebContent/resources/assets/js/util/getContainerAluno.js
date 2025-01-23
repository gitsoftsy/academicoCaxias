const getContainerAluno = () => {
	$.ajax({
		url: url_base + "/alunos/" + idAluno,
		type: "GET",
		async: false,
		error: function(e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(res) {
		$("#matricula").val(res.aluno);
		$("#nomeAluno").val(res.pessoa.nomeCompleto);
	})
}