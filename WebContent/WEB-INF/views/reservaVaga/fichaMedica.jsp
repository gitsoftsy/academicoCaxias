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
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
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
	crossorigin="anonymous">
	
</script>

<!-- Css -->
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/style.css?v=<%=(int)(Math.random()*10000)%>" />
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/login.css">

</head>

<body>
	<header>
	<img class="logoSumare" style="width: 15%"
			src="<%=contextPath%>/resources/assets/img/logo-softsy.png"
			alt="Logo da Softsy" />
	</header>

	<main class="container-section">
		<form class="container-section pb-5" id="formSubmit">
			<section class="mb-5">
				<div class="card">
					<div class="card-body title d-flex align-items-center gap-2">
						<i class="fa-solid fa-clipboard" style="font-size: 26px"></i>
						<h3 class="pt-2" id="tituloForm">Ficha Médica do Candidato</h3>
					</div>
				</div>
			</section>
			<section
				class="mb-5 p-5 card col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h2 id="tituloDados" class="mb-5">Ficha</h2>

				<!-- <input type="text" id="usuarioCadastro" hidden name="usuarioCadastro" value="${funcionario.idUsuario}" /> -->

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="responsavelEmergencia" class="form-label">Qual
							o responsável de emergência?<span class="text-danger">*</span>
						</label> <select class="form-select"
							aria-label="Responsável de Emergência" id="responsavelEmergencia"
							required name="responsavelEmergencia">
							<option selected disabled value="0">Selecione
								uma opção</option>
						</select>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="peso" class="form-label">Peso:<span
							class="text-danger">*</span></label> <input type="number" id="peso"
							required autocomplete="off" name="peso" class="form-control"
							min="0" oninput="this.value = Math.abs(this.value)">
					</div>
					<div class="col-md-6">
						<label for="altura" class="form-label">Altura (Em cm):<span
							class="text-danger">*</span></label> <input type="number" id="altura"
							required autocomplete="off" name="altura" class="form-control"
							min="0">
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="tipoSanguineo" class="form-label">Tipo
							Sanguíneo:</label> <select class="form-select"
							aria-label="Tipo Sanguíneo" id="tipoSanguineo"
							name="tipoSanguineo">
							<option selected disabled value="0">Selecione uma opção</option>
							<option value="O+">O+</option>
							<option value="O-">O-</option>
							<option value="A+">A+</option>
							<option value="A-">A-</option>
							<option value="B+">B+</option>
							<option value="B-">B-</option>
							<option value="AB+">AB+</option>
							<option value="AB-">AB-</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="transfusao" class="form-label">Aceita
							transfusão de Sangue?<span class="text-danger">*</span>
						</label>
						<div class="form-control card-form">
							<label for="transfusao">Sim</label> <label class="switch">
								<input type="checkbox" id="transfusao" name="transfusao">
								<span class="slider"></span>
							</label> <label for="transfusao">Não</label>
						</div>
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="numeroSUS" class="form-label">Número SUS:</label> <input
							type="text" id="numeroSUS" autocomplete="off" name="numeroSUS"
							class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="planoSaude" class="form-label">Plano de Saúde:</label>
						<input type="text" id="planoSaude" autocomplete="off"
							name="planoSaude" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6" id="cardCpf">
						<label for="numCarterinha" class="form-label">Número da
							Carteirinha:</label> <input type="text" id="numCarterinha"
							autocomplete="off" name="numCarterinha" class="form-control" />
					</div>
				</div>

				<span class="infra-title">Dados Hospital/Clínica</span>
				<hr>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="lugarEmergencia" class="form-label">Em caso de
							emergência, encaminhar o aluno para qual Hospital/Clínica?</label> <input
							type="text" id="lugarEmergencia" required autocomplete="off"
							name="lugarEmergencia" class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="telefone" class="form-label">Telefone:<span
							class="text-danger">*</span></label> <input type="tel" id="telefone"
							data-mask="(00) 0000-0000" autocomplete="off" name="telefone"
							class="form-control" required />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="cep" class="form-label">CEP:<span
							class="text-danger">*</span></label> <input type="text" id="cep"
							data-mask="00000-000" name="cep" class="form-control" required />
					</div>
					<div class="col-md-6">
						<label for="endereco" class="form-label">Endereço:<span
							class="text-danger">*</span></label> <input type="text" id="endereco"
							autocomplete="off" name="endereco" class="form-control" required />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="numero" class="form-label">Número:</label> <input
							type="text" id="numero" autocomplete="off" name="numero"
							class="form-control" />
					</div>
					<div class="col-md-6">
						<label for="complemento" class="form-label">Complemento:</label> <input
							type="text" id="complemento" autocomplete="off"
							name="complemento" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="bairro" class="form-label">Bairro:<span
							class="text-danger">*</span></label> <input type="text" id="bairro"
							autocomplete="off" name="bairro" class="form-control" required />
					</div>
					<div class="col-md-6">
						<label for="municipio" class="form-label">Município:<span
							class="text-danger">*</span></label> <input type="text" id="municipio"
							autocomplete="off" name="municipio" class="form-control" required />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="uf" class="form-label">UF:<span
							class="text-danger">*</span></label> <input type="text" id="uf"
							autocomplete="off" name="uf" class="form-control" required />
					</div>
				</div>

				<hr>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="isAlergico" class="form-label">O aluno é
							alérgico a algum tipo de medicamento tópico, oral ou injetável?<span
							class="text-danger">*</span>
						</label>
						<div class="form-control card-form">
							<label for="isAlergico">Sim</label> <label class="switch">
								<input type="checkbox" id="isAlergico" name="isAlergico"
								required> <span class="slider"></span>
							</label> <label for="isAlergico">Não</label>
						</div>
					</div>
					<div class="col-md-6" style="display: none" id="divDescIsAlergico">
						<label for="descIsAlergico" class="form-label">Especifique:<span
							class="text-danger">*</span></label> <input type="text"
							id="descIsAlergico" autocomplete="off" name="descIsAlergico"
							class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="tratamentoMedico" class="form-label">Faz
							tratamento médico?<span class="text-danger">*</span>
						</label>
						<div class="form-control card-form">
							<label for="tratamentoMedico">Sim</label> <label class="switch">
								<input type="checkbox" id="tratamentoMedico"
								name="tratamentoMedico" required> <span class="slider"></span>
							</label> <label for="tratamentoMedico">Não</label>
						</div>
					</div>
					<div class="col-md-6" style="display: none"
						id="divDescTratamentoMedico">
						<label for="descTratamentoMedico" class="form-label">Especifique:</label>
						<input type="text" id="descTratamentoMedico" autocomplete="off"
							name="descTratamentoMedico" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="possuiDoenca" class="form-label">Possui
							doenças/comorbidades?<span class="text-danger">*</span>
						</label>
						<div class="form-control card-form">
							<label for="possuiDoenca">Sim</label> <label class="switch">
								<input type="checkbox" id="possuiDoenca" name="possuiDoenca"
								required> <span class="slider"></span>
							</label> <label for="possuiDoenca">Não</label>
						</div>
					</div>
					<div class="col-md-6" style="display: none" id="divDescDoenca">
						<label for="descDoenca" class="form-label">Especifique:<span
							class="text-danger">*</span></label> <input type="text" id="descDoenca"
							autocomplete="off" name="descDoenca" class="form-control" />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6" style="display: none" id="divOutrasDoencas">
						<label for="outrasDoencas" class="form-label">Possui
							outras doenças?<span class="text-danger">*</span>
						</label> <input type="text" id="outrasDoencas" autocomplete="off"
							name="outrasDoencas" class="form-control" />
					</div>
				</div>

				<div class="col-md-12 text-center">
					<button type="submit" class="btn btn-primary px-5" id="btn-submit">Próximo</button>
				</div>
			</section>
		</form>
	</main>
</body>





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
	src="<%=contextPath%>/resources/assets/js/reservaVaga/fichaMedica.js"></script>

<script charset="UTF-8"
	src="<%=contextPath%>/resources/assets/js/comum.js"></script>
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>

<script
	src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>


</body>
</html>