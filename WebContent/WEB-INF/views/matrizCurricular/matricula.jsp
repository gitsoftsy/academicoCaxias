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
<!-- TinyMCE Script -->
<script
	src="https://cdn.tiny.cloud/1/ybbnp45uwmaxy2afou9tc84m31aga7qy1w24rc7lno1h4ekl/tinymce/6/tinymce.min.js"
	referrerpolicy="origin"></script>


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
<link
	href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
	rel="stylesheet" />
<script charset="UTF-8"
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

<!-- CSS -->

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
	<header id="menu"></header>
	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-school-circle-check fa-lg"></i><span
						id="span-title">Matricula</span>
				</div>
			</div>
		</section>

		<section id="containerInfoTurma" class="mb-3">
			<div class="card p-3">
				<div class="title mb-3">
					<i class="fa-solid fa-people-roof" style="font-size: 24px"></i> <span>Informações
						da Turma</span>
				</div>

				<div class="row mb-3">
					<div class="row mt-3">
						<div class="col-md-6">
							<label for="nomeTurma" class="form-label">Nome: </label> <input
								type="text" id="nomeTurma" autocomplete="off" name="nomeTurma"
								class="form-control" disabled />
						</div>

						<div class="col-md-6">
							<label for="disciplina" class="form-label">Disciplina: </label> <input
								type="text" id="disciplina" autocomplete="off" name="disciplina"
								class="form-control" disabled />
						</div>
					</div>


					<div class="row mt-3">
						<div class="col-md-6">
							<label for="escola" class="form-label">Escola: </label> <input
								type="text" id="escola" autocomplete="off" name="escola"
								class="form-control" disabled />
						</div>
						<div class="col-md-6">
							<label for="curso" class="form-label">Curso: </label> <input
								type="text" id="curso" autocomplete="off" name="curso"
								class="form-control" disabled />
						</div>
						
					</div>
					
					<div class="row mt-3">

						<div class="col-md-6">
							<label for="curriculo" class="form-label">Curriculo: </label> <input
								type="text" id="curriculo" autocomplete="off" name="curriculo"
								class="form-control" disabled />
						</div>

						<div class="col-md-6">
							<label for="serie" class="form-label">Série: </label> <input
								type="text" id="serie" autocomplete="off" name="serie"
								class="form-control" disabled />
						</div>
					</div>
					<div class="row mt-3">
						<div class="col-md-6">
							<label for="anoPeriodo" class="form-label">Ano/Período: </label>
							<input type="text" id="anoPeriodo" autocomplete="off"
								name="anoPeriodo" class="form-control" disabled />
						</div>


						<div class="col-md-6">
							<label for="turno" class="form-label">Turno: </label> <input
								type="text" id="turno" autocomplete="off" name="turno"
								class="form-control" disabled />
						</div>
					</div>
					
					<div class="row mt-3">

						<div class="col-md-6">
							<label for="vagas" class="form-label">Vagas: </label> <input
								type="text" id="vagas" autocomplete="off" name="vagas"
								class="form-control" disabled />
						</div>
						
					</div>

					</div>
				</div>
		</section>
		<section class="pt-4">


			<form id="formNovoCadastro"
				class="card form p-5 col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center">




				<h3 id="tituloForm" class="text-start mt-3 mb-5">Selecione os alunos</h3>

				<table
					class="table tabela-atos table-striped table-bordered mb-0 caption-top mx-auto">
					<thead>
						<tr>
							<th scope="col" width="25px"><input class="form-check-input"
								type="checkbox" value="" id="checkAll"></th>
							<th scope="col">Matrícula</th>
							<th scope="col">Nome</th>
							<th scope="col">Email</th>
						</tr>
					</thead>
					<tbody id="cola-tabela" class="table-group-divider">

					</tbody>
				</table>
				<div id="pagination" class="mx-auto mt-auto">
					 <button id="prev" class="btn btn-sm">
						<i class="fa-solid fa-angle-left fa-xl"></i>
					</button>
					<div id="page-numbers" class="btn-group mt-2"></div>
					<button id="next" class="btn btn-sm">
						<i class="fa-solid fa-angle-right fa-xl"></i>
					</button>                         
				</div>
				<!-- 
				<div class="container-table contTable mb-3">
					<table
						class="table tableNot tabela-atos table-striped table-bordered mb-0 caption-top mx-auto">
						<thead>
							<tr>
								<th scope="col">Turma</th>
								<th scope="col">Escola</th>
								<th scope="col">Ano/Período</th>
								<th scope="col">Turno</th>
								<th scope="col" width="10%">Série</th>
								<th scope="col">Disciplina</th>
								<th scope="col" width="10%">Obrigatória</th>
								<th scope="col" width="10%">Retém Aluno</th>
								<th scope="col" width="10%">Ações</th>
							</tr>
						</thead>
						<tbody id="cola-tabela-turma" class="table-group-divider"></tbody>
					</table>
					<div id="pagination" class="mx-auto mt-auto">
						<button id="prev" class="btn btn-sm">
						<i class="fa-solid fa-angle-left fa-xl"></i>
					</button>
					<div id="page-numbers" class="btn-group mt-2"></div>
					<button id="next" class="btn btn-sm">
						<i class="fa-solid fa-angle-right fa-xl"></i>
					</button>
					</div>
				</div> -->
				
				<div class="col-md-6">
					<label for="tipoMatriculaId" class="form-label">Tipo Matricula:<span
						class="red">*</span></label> <select class="form-select"
						aria-label="tipoMatriculaId" id="tipoMatriculaId" required
						name="tipoMatriculaId">
						<option value="" selected disabled>Selecione o Concurso</option>
					</select>
				</div>
				

				<div class="col-md-12 text-center mt-3">
					<button type="submit" class="btn btn-primary px-5" id="btn-save">
						Matricular</button>
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
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/matrizCurricular/matricula.js"></script>

	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
