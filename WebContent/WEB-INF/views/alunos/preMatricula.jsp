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
	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-cogs fa-lg"></i> <span>Alunos</span>
				</div>
			</div>
		</section>
		<section class="pt-4 card card-table px-5 py-3">
			<h3 id="tituloForm" class="text-start mb-5">Filtrar</h3>
			<p>Informe ao menos um dos campos abaixo para poder filtrar e
				encontrar o aluno desejado:</p>

			<div class="row">
				<div class="col-md-4 mb-3">
					<label for="matricula" class="form-label">Matrícula</label> <input
						type="text" id="matricula" class="form-control"
						placeholder="Matrícula" />
				</div>

				<div class="col-md-4 mb-3">
					<label for="nome" class="form-label">Nome</label> <input
						type="text" id="nome" class="form-control" placeholder="Nome" />
				</div>

				<div class="col-md-4 mb-3">
					<label for="cpf" class="form-label">CPF</label> <input type="text"
						id="cpf" class="form-control" placeholder="CPF" />
				</div>
			</div>

			<div class="row">
				<div class="col-md-4 mb-3">
					<label for="escola" class="form-label">Escola</label> <select
						id="escola" class="form-select">
						<option value="">Selecione uma escola</option>
					</select>
				</div>

				<div class="col-md-4 mb-3">
					<label for="curso" class="form-label">Curso</label> <select
						id="curso" class="form-select">
						<option value="">Selecione um curso</option>
					</select>
				</div>

				<div class="col-md-3 mb-3 align-self-end">
					<button class="btn btn-warning px-5" id="btn-buscar"
						style="font-weight: 500">
						Buscar <i class="fas fa-search ms-2" style="color: #121212"></i>
					</button>
				</div>
			</div>

			<div class="w-100 d-flex align-items-center justify-content-center"
				style="flex: 1">
				<h2 id="textoInicial">Use os filtros acima para encontrar o
					aluno desejado.</h2>
			</div>
			<div id="tableAlunos">
				<div class="mt-3 mb-3"
					style="display: flex; align-items: center; justify-content: end">
					<div class="d-flex align-items-center gap-2">
						<button id="limpa-filtros" class="btn btn-sm btn-danger">
							Limpar Filtros</button>
					</div>
				</div>
				<table
					class="table tabela-atos table-striped table-bordered mb-0 caption-top mx-auto">
					<caption>Itens Cadastrados</caption>
					<thead>
						<tr>
							<th class='text-center th-sem-filtro border-end' scope="col"
								width="10%">Acessar</th>
							<th scope="col" class="sortable border-end"
								data-column="matriculaPes">Matricula</th>
							<th scope="col" class="sortable border-end" data-column="nomePes">
								<div
									class="d-flex align-items-center justify-content-between pe-2">
									<div
										class="col d-flex align-items-center justify-content-between">
										<span>Nome</span> <i class="fas fa-sort me-2 ms-2"
											style="color: #dddddd"></i>
									</div>
								</div>
							</th>
							<th scope="col" class="sortable border-end" data-column="cpfPes">CPF</th>
							<th scope="col" class="sortable border-end"
								data-column="cursoPes">Curso</th>
							<th scope="col" class="sortable border-end"
								data-column="seriePes">Série</th>
							<th scope="col" class="sortable border-end"
								data-column="escolaPes">Escola</th>
							<th scope="col" class="sortable border-end"
								data-column="turnoPes">Turno</th>
							<th scope="col" class="sortable border-end"
								data-column="emailPes">Email Estudantil</th>
							<th scope="col" class="sortable border-end"
								data-column="situacaoAlunoPes">Situação Aluno</th>
						</tr>
					</thead>
					<tbody id="cola-tabela" class="table-group-divider"></tbody>
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
		src="<%=contextPath%>/resources/assets/js/alunos/preMatricula.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
