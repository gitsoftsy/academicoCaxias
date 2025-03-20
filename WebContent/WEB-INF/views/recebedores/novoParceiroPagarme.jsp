<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%
String contextPath = request.getContextPath();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />

<title>Softsy - Educacional</title>
<!-- Bootstrap -->
<!-- Bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
	crossorigin="anonymous" />
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
	crossorigin="anonymous"></script>

<!-- Select 2 -->
<link
	href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
	rel="stylesheet" />

<script
	src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

<!-- FontAwesome -->
<script charset="UTF-8"
	src="
https://kit.fontawesome.com/3ce21ff22c.js"
	crossorigin="anonymous"></script>

<!-- Css -->
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/style.css?v=<%=(int) (Math.random() * 10000)%>" />

</head>

<body>
	<div class="bg-loading">
		<div class="spinner">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
		</div>
	</div>
	<header id="menu"> </header>


	<main class="container-res py-4">


		<section class="mb-5">
			<div class="card card-title">
				<div class="card-body title">
					<i class="fa-solid fa-cogs fa-lg"></i> <span>Cadastro de
						Parceiro</span>
				</div>
				<div class="info">
					<div class="tooltiptext">O cadastro de parceiro habilita uma
						empresa ou uma pessoa a receber valores em parceria com sua
						Instituição. O cadastro é iniciado por esse formulário e
						finalizado pelo parceiro após recebimento de e-mail. Informe ao
						lado o tipo de parceiro que deseja cadastrar.</div>
					<i class="fa-solid fa-info"></i>
				</div>
			</div>
		</section>


		<section class="pt-4 card card-table px-5 py-3" style="height: 680px">
			<div
				class="container-form d-flex justify-content-center h-100 align-items-center">


				<!-- Passo 1: Escolha do Tipo de Parceiro -->
				<div id="step1"
					class="container-form w-100 d-flex  justify-content-center align-items-center">
					<button class="btn btn-info text-white me-2" id="btnFisica">Pessoa
						Física</button>
					<button class="btn btn-primary" id="btnJuridica">Pessoa
						Jurídica</button>
				</div>


				<!-- Passo 2: Formulário para Pessoa Física -->
				<div id="containerFisica" class="container-form d-none w-100">
					<h2>Cadastro - Pessoa Física</h2>
					<form id="formFisica">
						<div class="row mb-3">
							<div class="col-md-6">
								<label for="nome" class="form-label">Nome Completo <span
									class="red">*</span></label> <input type="text" class="form-control"
									id="nome" required>
							</div>
							<div class="col-md-6">
								<div class="mb-3">
									<label for="cpf" class="form-label">CPF <span
										class="red">*</span></label> <input type="text" class="form-control"
										id="cpf" required>
									<div id="cpfErro" class="text-danger mt-1"
										style="display: none;"></div>
								</div>
							</div>

						</div>
						<div class="row mb-3">
							<div class="col-md-6">
								<label for="email" class="form-label">E-mail<span
									class="red">*</span></label> <input
									type="text" class="form-control" id="email" required>
								<div id="emailErro" class="text-danger mt-1"
									style="display: none;"></div>
							</div>
						</div>


						<button type="button" class="btn  btn-secondary btnVoltar">Voltar</button>
						<button type="submit" class="btn btnStep btn-success">Próximo</button>
					</form>
				</div>

				<!-- Passo 2: Formulário para Pessoa Jurídica -->
				<div id="containerJuridica" class="container-form d-none w-100">
					<h2>Cadastro - Pessoa Jurídica</h2>
					<form id="formJuridica">



						<div class=" row mb-3">
							<div class="col-md-6">
								<label for="nomeFantasia" class="form-label">Nome Fantasia<span
									class="red">*</span></label> <input type="text" class="form-control"
									id="nomeFantasia" required>
							</div>

							<div class="col-md-6">
								<label for="cnpj" class="form-label">CNPJ<span
									class="red">*</span></label> <input type="text" class="form-control"
									id="cnpj" required>
								<div id="cnpjErro" class="text-danger mt-1"
									style="display: none;"></div>
							</div>
						</div>




						<div class=" row mb-3">
							<div class="col-md-6">
								<label for="emailCnpj" class="form-label">E-mail<span
									class="red">*</span></label> <input
									type="text" class="form-control" id="emailCnpj" required>
								<div id="emailCnpjErro" class="text-danger mt-1"
									style="display: none;"></div>
							</div>

						</div>
						<button type="button" class="btn  btn-secondary btnVoltar">Voltar</button>
						<button type="submit" class="btn  btnStep btn-success">Próximo</button>
					</form>
				</div>


				<!-- Passo 3: Forma de Recebimento-->
				<div id="step3" class="container-form d-none w-100">
					<h2>Forma de Recebimento</h2>
					<form>



						<div class=" row mb-3">
							<div class="col-md-6">
								<label for="tranferencia" class="form-label">A
									transferênncia será: <span class="red">*</span>
								</label> <select class="form-select" aria-label="Transferencia"
									id="tranferencia" name="tranferencia">
									<option selected disabled>Selecione uma opção</option>
									<option value="M">Mensal</option>
									<option value="S">Semanal</option>
									<option value="D">Diária</option>
								</select>
							</div>

							<div class="col-md-3">
								<label for="antecipacaAut" class="form-label">Antecipação
									Automatica<span class="red">*</span>
								</label>
								<div class="form-control card-form-infra">
									<label for="antecipacaAut">Sim</label> <label class="switch">
										<input type="checkbox" id="antecipacaAut" name="antecipacaAut">
										<span class="slider"></span>
									</label> <label for="antecipacaAut">Não</label>

								</div>
							</div>
						</div>
						<button type="button" class="btn btn-secondary btnVoltar">Voltar</button>
						<button type="submit" id="btnNovoCadastro" class="btn btn-success">Cadastrar</button>
					</form>
				</div>
			</div>
		</section>

	</main>

	<script charset="UTF-8" src="https://code.jquery.com/jquery-3.7.1.js"
		integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
		crossorigin="anonymous"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
		integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
		crossorigin="anonymous"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
		integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
		crossorigin="anonymous"></script>
	<script charset="UTF-8"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/recebedores/novoParceiroPagarme.js"></script>

	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>

	<script
		src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
</body>
</html>
