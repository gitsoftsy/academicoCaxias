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
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
	crossorigin="anonymous" />
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
	crossorigin="anonymous"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />
<link
	href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
	rel="stylesheet">
<script charset="UTF-8"
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
<script charset="UTF-8"
	src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script charset="UTF-8"
	src="https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.3/pako.min.js"></script>
<script charset="UTF-8"
	src="https://cdnjs.cloudflare.com/ajax/libs/bs58/4.0.1/bs58.min.js"></script>
<!-- CSS -->

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- FontAwesome -->
<script charset="UTF-8"
	src="
https://kit.fontawesome.com/3ce21ff22c.js"
	crossorigin="anonymous"></script>
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


	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-plus fa-lg"></i><span>Novo Cadastro</span>
				</div>
			</div>
		</section>

		<section class="pt-4">
			<form id="formNovoCadastro"
				class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">
				<h1 id="tituloForm" class="text-center mb-5">Cadastrar Escola</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="nome" class="form-label">Nome:<span
							class="red">*</span></label> <input required autocomplete="off"
							type="text" id="nome" name="nome" class="form-control "
							maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="logoEscola" class="form-label">Logo:</label> <input
							class="form-control " type="file" id="logoEscola"
							name="logoEscola">
					</div>
				</div>

				<div class="row mb-3">

					<div class="col-md-6">
						<label for="codigoInep" class="form-label">Código Inep:<span
							class="red">*</span></label> <input type="number" id="codigoInep"
							required autocomplete="off" name="codigoInep"
							class="form-control" min='0'
							oninput="this.value = Math.abs(this.value)" />
					</div>

					<div class="col-md-6" id="cardCNPJ">
						<label for="cnpj" class="form-label">CNPJ:</label> <input
							type="tel" id="cnpj" autocomplete="off" name="cnpj"
							class="form-control " data-mask="00.000.000/0000-00" />
					</div>

				</div>
				<div class="row mb-3">

					<div class="col-md-6">
						<label for="email" class="form-label">Email:<span
							class="red">*</span></label> <input type="email" id="email" required
							autocomplete="off" name="email" class="form-control " />
					</div>


					<div class="col-md-6">
						<label for="tipoEscola" class="form-label">Tipo Escola:<span
							class="red">*</span></label> <select class="form-select"
							aria-label="Tipo Escola" id="tipoEscola" required
							name="tipoEscola">
							<option selected value='' disabled>Selecione o tipo</option>
							<option value="PU">Pública</option>
							<option value="PV">Privada</option>
						</select>
					</div>

				</div>
				<!-- 
					<div class="col-md-6">
						<label for="zoneamentoId" class="form-label">Zoneamento:<span
							class="red">*</span>
						</label> <select class="form-select" aria-label="Zoneamento"
							id="zoneamentoId" required name="zoneamentoId">
							<option value='' selected disabled>Selecione o
								Zoneamento</option>
						</select>
					</div>

				

				<div class="row mb-3" hidden>


					<div class="col-md-6">
						<label for="isIndigena" class="form-label">Educação
							Indígena:<span class="red">*</span>
						</label>
						<div class="form-control">
							<label for="isIndigena">Sim</label> <label class="switch">
								<input type="checkbox" id="isIndigena" name="isIndigena">
								<span class="slider"></span>
							</label> <label for="isIndigena">Não</label>
						</div>
					</div>

					<div class="col-md-6">
						<label for="exameSelecao" class="form-label">Exame
							Seleção:<span class="red">*</span>
						</label>
						<div class="form-control">
							<label for="exameSelecao">Sim</label> <label class="switch">
								<input type="checkbox" id="exameSelecao" name="exameSelecao">
								<span class="slider"></span>
							</label> <label for="exameSelecao">Não</label>
						</div>
					</div>
				</div>

				<div class="row mb-3" hidden>

					<div class="col-md-6">
						<label for="compartilhaEspaco" class="form-label">Compartilha
							Espaço:<span class="red">*</span>
						</label>
						<div class="form-control">
							<label for="compartilhaEspaco">Sim</label> <label class="switch">
								<input type="checkbox" id="compartilhaEspaco"
								name="compartilhaEspaco"> <span class="slider"></span>
							</label> <label for="compartilhaEspaco">Não</label>
						</div>
					</div>

					<div class="col-md-6">
						<label for="usaEspacoEntornoEscolar" class="form-label">Usa
							Espaço Entorno Escolar:<span class="red">*</span>
						</label>
						<div class="form-control">
							<label for="usaEspacoEntornoEscolar">Sim</label> <label
								class="switch"> <input type="checkbox"
								id="usaEspacoEntornoEscolar" name="usaEspacoEntornoEscolar">
								<span class="slider"></span>
							</label> <label for="usaEspacoEntornoEscolar">Não</label>
						</div>
					</div>
				</div>



				<div class="row mb-3" hidden>



					<div class="col-md-6">
						<label for="pppAtualizado12Meses" class="form-label">PPP
							Atualizado (12 Meses):<span class="red">*</span>
						</label>
						<div class="form-control card-form">
							<label for="pppAtualizado12Meses">Sim</label> <label
								class="switch"> <input type="checkbox"
								id="pppAtualizado12Meses" name="pppAtualizado12Meses"> <span
								class="slider"></span>
							</label> <label for="pppAtualizado12Meses">Não</label>
						</div>
					</div>

					<div class="col-md-6">
						<label for="numCME" class="form-label">Nº do cadastro:<span
							class="red">*</span></label> <input type="number" id="numCME" required
							autocomplete="off" name="numCME" class="form-control " min='0'
							oninput="this.value = Math.abs(this.value)" />
					</div>

				</div>

				<div class="row mb-3" hidden>


					<div class="col-md-6">
						<label for="numParecerCME" class="form-label">Nº do
							Parecer:<span class="red">*</span>
						</label> <input type="number" id="numParecerCME" required
							autocomplete="off" name="numParecerCME" class="form-control"
							min='0' oninput="this.value = Math.abs(this.value)" />
					</div>


					<div class="col-md-6">
						<label for="dependenciaAdmId" class="form-label">Dependência
							Administrativa:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Dependência Administrativa" id="dependenciaAdmId"
							required name="dependenciaAdmId">
							<option selected value='' disabled>Selecione a
								Dependência</option>
						</select>
					</div>
				</div>

				<div class="row mb-3" hidden>
					<div class="col-md-6">
						<label for="situacaoFuncionamentoId" class="form-label">Situação
							de Funcionamento:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Situação de Funcionamento"
							id="situacaoFuncionamentoId" name="situacaoFuncionamentoId">
							<option selected disabled>Selecione a Situação</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="formaOcupacaoPredioId" class="form-label">Forma
							de Ocupação do Prédio:<span class="red">*</span>
						</label> <select class="form-select"
							aria-label="Forma de Ocupação do Prédio"
							id="formaOcupacaoPredioId" required name="formaOcupacaoPredioId">
							<option selected value='' disabled>Selecione a Forma de
								Ocupação</option>
						</select>
					</div>
				</div>
 -->
				

				<!--
					<div class="col-md-6" hidden>
						<label for="categoriaEscolaPrivadaId" class="form-label">Categoria
							Escola Privada:<span class="red">*</span>
						</label> <select class="form-select" aria-label="Categoria Escola Privada"
							id="categoriaEscolaPrivadaId" required
							name="categoriaEscolaPrivadaId">
							<option selected value='' disabled>Selecione a Categoria</option>
						</select>
					</div>
				</div>

				<div class="row mb-3" hidden>
					<div class="col-md-6">
						<label for="entidadeSuperiorId" class="form-label">Entidade
							Superior:<span class="red">*</span>
						</label> <select class="form-select" aria-label="Entidade Superior"
							id="entidadeSuperiorId" required name="entidadeSuperiorId">
							<option selected value='' disabled>Selecione a Entidade</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="orgaoPublicoId" class="form-label">Orgão
							Público:<span class="red">*</span>
						</label> <select class="form-select" aria-label="Orgão Público"
							id="orgaoPublicoId" required name="orgaoPublicoId">
							<option selected value='' disabled>Selecione o Orgão</option>
						</select>
					</div>
				</div>
 -->
				<hr>
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="localizacaoId" class="form-label">Tipo de
							Localização:<span class="red">*</span>
						</label> <select class="form-select" aria-label="Tipo de Localização"
							id="localizacaoId" required name="localizacaoId">
							<option selected disabled value="">Selecione o Tipo</option>
						</select>
					</div>

					<div class="col-md-6">
						<label for="cep" class="form-label">CEP:<span class="red">*</span></label>
						<input type='tel' class="form-control" id="cep"
							data-mask="00000-000" name="cep" required />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="uf" class="form-label">UF:<span class="red">*</span></label>
						<input type='text' class="form-control" maxlength="10" id="uf"
							disabled name="uf" required />
					</div>
					<div class="col-md-6">
						<label for="municipio" class="form-label">Município:<span
							class="red">*</span></label> <input type='tel' class="form-control"
							id="municipio" disabled name="municipio" required />
					</div>


				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="bairro" class="form-label">Bairro:<span
							class="red">*</span></label> <input type='text' class="form-control"
							id="bairro" disabled name="bairro" />
					</div>
					<div class="col-md-6">
						<label for="endereco" class="form-label">Endereço:<span
							class="red">*</span></label> <input type='text' class="form-control"
							id="endereco" disabled name="endereco" required />
					</div>


				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="numero" class="form-label">Número:</label> <input
							type='text' class="form-control" id="numero" name="numero" />
					</div>
					<div class="col-md-6">
						<label for="complemento" class="form-label">Complemento:</label> <input
							type='text' class="form-control" id="complemento"
							name="complemento" />
					</div>


				</div>
				<div class="row mb-3">
					<div class="col-md-6">
						<label for="latitude" class="form-label">Latitude:<span
							class="red">*</span></label> <input type='number' class="form-control"
							id="latitude" disabled name="latitude" />
					</div>
					<div class="col-md-6">
						<label for="longitude" class="form-label">Longitude:<span
							class="red">*</span></label> <input type='number' class="form-control"
							id="longitude" disabled name="longitude" />
					</div>
				</div>



				<div class="col-md-12 text-center mt-3">
					<button type="submit" class='btn btn-primary px-5' id='btn-submit'>Cadastrar</button>
				</div>
			</form>
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
		src="<%=contextPath%>/resources/assets/js/cadastros/novaEscola.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>


</body>
</html>
