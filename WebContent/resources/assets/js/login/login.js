$(document).ready(function() {
	var logoConta = localStorage.getItem("imagemLogo");

	if (logoConta != undefined) {
		$("#logo-login").attr("src", `data:image/png;base64,${logoConta}`);
	}

	$(".reveal").on('click', function() {
		let pwd = $(".pwd");
		let icon = $(".fa-regular");
		if (pwd.attr('type') === 'password') {
			pwd.attr('type', 'text');
			icon.removeClass("fa-eye").addClass("fa-eye-slash");
		} else {
			pwd.attr('type', 'password');
			icon.removeClass("fa-eye-slash").addClass("fa-eye");
		}
	});
});
$(document).keypress(function(event) {
	if (event.which === 13) { // 13 é o código da tecla Enter
		$('#btnLogin').click(); // Dispara o clique do botão de login
	}
});

$('#btnLogin').click(function() {

	let inputEmail = $('.email')
	let inputPassword = $('.senha')


	if (inputPassword.val() == "" || inputEmail.val() == "") {
		Swal.fire({
			title: 'Erro!',
			text: 'Você deve preencher todos os campos',
			icon: 'error',
			confirmButtonText: 'Ok'
		})
	} else {
		let dados = {
			usuario: inputEmail.val(),
			senha: inputPassword.val()
		}

		$.ajax({
			url: url_base + '/login',
			type: "POST",
			data: JSON.stringify(dados),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(e)
				Swal.fire({
					title: 'Email ou senha incorretos!',
					text: 'Verifique se seu email ou senha foram digitados corretamente',
					icon: 'error',
					confirmButtonText: 'Ok'
				})
			}
		}).done(function(data) {

			localStorage.setItem('nomeConta', data.usuarioLogado.nomeCompleto)
			localStorage.setItem('usuarioId', data.usuarioLogado.idUsuario)
			sessionStorage.setItem('nomeConta', data.usuarioLogado.nomeCompleto)
			sessionStorage.setItem('usuarioId', data.usuarioLogado.idUsuario)
			localStorage.setItem("idContaAcesso", data.usuarioConta[0].contaPadraoAcessoId)

			console.log(data)
			$.ajax({
				url: url_base + '/contaPadraoAcessos/' + data.usuarioConta[0].contaPadraoAcessoId,
				type: "get",
				contentType: "application/json; charset=utf-8",
				error: function(e) {
					console.log(e)
					Swal.fire({
						title: 'Erro no sistema',
						text: 'Erro ao realizar o login, por favor tente novamente mais tarde!!',
						icon: 'error',
						confirmButtonText: 'Ok'
					})
				}
			}).done(function(responseData) {
				localStorage.removeItem('modulesStorage')
				localStorage.removeItem('transacoesStorage')


				if ($("#remeberMeCheck").checked) {
					localStorage.setItem('contaId', responseData.contaId)
				} else {
					localStorage.setItem('contaId', responseData.contaId)
				}

				Swal.fire({
					title: 'Login feito com sucesso',
					text: 'Redirecionando você...',
					icon: 'success',
					showConfirmButton: false,
				})

				$.ajax({
					url: url_base + '/conta/' + responseData.contaId,
					type: "get",
					contentType: "application/json; charset=utf-8",
					error: function(e) {
						console.log(e)
						Swal.fire({
							title: 'Erro no sistema',
							text: 'Erro ao realizar o login, por favor tente novamente mais tarde!!',
							icon: 'error',
							confirmButtonText: 'Ok'
						})
					}
				}).done((res) => {
					$.ajax({
						url: url_base + `/conta/${responseData.contaId}/logo/`,
						type: "get",
						contentType: "application/json; charset=utf-8",
						error: function(e) {
							console.log(e)
							Swal.fire({
								title: 'Erro no sistema',
								text: 'Erro ao realizar o login, por favor tente novamente mais tarde!!',
								icon: 'error',
								confirmButtonText: 'Ok'
							})
						}
					}).done((imagemLogo) => {
						localStorage.setItem('imagemLogo', imagemLogo)
						window.location.href = "acessarEscolas"
					})
				})


				/*Swal.fire({
					title: 'Login feito com sucesso',
					text: 'Redirecionando você...',
					icon: 'success',
					showConfirmButton: false,
					timer: 1500
				})*/


			})
		});
	}
});

$('#btnRecuperarSenha').click(function() {

	Swal.fire({
		title: 'Digite seu email',
		input: 'email',
		customClass: {
			validationMessage: 'my-validation-message',
		},
		preConfirm: (value) => {
			if (!value) {
				Swal.showValidationMessage('<i class="fa fa-info-circle"></i> Your name is required')
			} else {
				Swal.fire({
					icon: "success",
					title: "Email enviado com sucesso!",
					text: "Verifique se email!",
					showConfirmButton: false,
					timer: 1500
				});
			}
		},
	})

});


