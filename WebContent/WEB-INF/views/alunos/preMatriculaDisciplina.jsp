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
	rel="stylesheet" />
<script charset="UTF-8"
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

<!-- Select 2 -->
<link
	href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
	rel="stylesheet" />

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
	<main class="py-1 mb-4 container-res">
		<section id="containerInfoAluno" class="mb-5">
			<div class="card p-3">
				<div class="title mb-3">
					<i class="fa-solid fa-user-graduate" style="font-size: 24px"></i> <span>Informações
						do Aluno</span>
				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="obsAprovacao" class="form-label">Matricula: </label> <input
							type="text" id="matricula" autocomplete="off" name="obsAprovacao"
							class="form-control" disabled />
					</div>

					<div class="col-md-6">
						<label for="obsAprovacao" class="form-label">Nome: </label> <input
							type="text" id="nomeAluno" autocomplete="off" name="obsAprovacao"
							class="form-control" disabled />
					</div>
				</div>
			</div>
		</section>

		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-cogs fa-lg"></i> <span>Pré-Matrícula</span>
				</div>
			</div>
		</section>
		<section class="pt-4 card px-5 py-3">
			<h3 id="tituloForm" class="text-start">Disciplinas já
				matrículadas</h3>
			<hr style="margin: 0px; margin-top: 0px; margin-bottom: 6px" />
			<p>Abaixo está a relação de disciplinas já na matrícula do aluno:</p>
			<h4 class="text-center w-100" id="notFound">Não foram
				encontradas disciplinas na pré-matrícula para o aluno selecionado.</h4>

			<div id="tableMatriculas" class="container-table">
				<table
					class="table tableNot tabela-atos table-striped table-bordered mb-0 caption-top mx-auto">
					<caption>Itens Cadastrados</caption>
					<thead>
						<tr>
							<th scope="col" class="sortable border-end">Periodo Letivo</th>
							<th scope="col" class="sortable border-end">Turma</th>
							<th scope="col" class="sortable border-end">Disciplina</th>
							<th scope="col" class="sortable border-end">Tipo</th>
							<th scope="col" class="sortable border-end">Status</th>
							<th scope="col" class="sortable border-end">Ação</th>
						</tr>
					</thead>
					<tbody id="cola-tabela-matriculas" class="table-group-divider"></tbody>
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
			</div>
		</section>
		<section class="pt-4 card px-5 py-3 mt-4">
			<h3 id="tituloForm" class="text-start">Disciplinas disponíveis
				para Pré-Matrícula</h3>
			<hr style="margin: 0px; margin-top: 0px; margin-bottom: 6px" />
			<p>Selecione ao menos os campos Ano, Semestre e Série que deseja
				verificar as disciplinas disponíveis para Pré-Matricular o aluno e
				clique em buscar:</p>

			<div class="row">
				<div class="col-md-4 mb-3">
					<label for="serie" class="form-label">Série</label><span
						class="text-danger">*</span> <select id="serie"
						class="form-select">
						<option value="">Selecione uma escola</option>
					</select>
				</div>

				<div class="col-md-4 mb-3">
					<label for="periodoLetivo" class="form-label">Período
						Letivo<span class="text-danger">*</span>
					</label> <select id="periodoLetivo" class="form-select">
						<option value="">Selecione um curso</option>
					</select>
				</div>

				<div class="col-md-4 mb-3">
					<label for="tiposMatricula" class="form-label">Tipo
						Matrícula<span class="text-danger">*</span>
					</label> <select id="tiposMatricula" class="form-select">
						<option value="">Selecione um curso</option>
					</select>
				</div>
			</div>

			<div class="row">
				<div class="col-md-4 mb-3">
					<label for="escola" class="form-label">Escola </label> <select
						id="escola" class="form-select">
						<option value="">Selecione uma escola</option>
					</select>
				</div>

				<div class="col-md-3 mb-3 align-self-end">
					<button class="btn btn-warning px-5" id="btn-buscar"
						style="font-weight: 500">
						Buscar <i class="fas fa-search ms-2" style="color: #121212"></i>
					</button>
				</div>
			</div>
			<div id="tablePreMatriculas" class="container-table">
				<table
					class="table tableNot tabela-atos table-striped table-bordered mb-0 caption-top mx-auto">
					<caption>Itens Cadastrados</caption>
					<thead>
						<tr>
							<th scope="col" class="sortable border-end">Escola</th>
							<th scope="col" class="sortable border-end">Turma</th>
							<th scope="col" class="sortable border-end">Disciplina</th>
							<th scope="col" class="sortable border-end">Ação</th>
						</tr>
					</thead>
					<tbody id="cola-tabela-pre-matricula" class="table-group-divider"></tbody>
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
		src="<%=contextPath%>/resources/assets/js/alunos/preMatriculaDisciplina.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
