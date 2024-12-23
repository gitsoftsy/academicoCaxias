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

<!-- Sweetalert -->
    <script charset="UTF-8"  src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script charset="UTF-8"  src="sweetalert2.all.min.js"></script>
    
<!-- CSS -->

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- FontAwesome -->
<script charset="UTF-8" src="
https://kit.fontawesome.com/3ce21ff22c.js"
	crossorigin="anonymous"></script>
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/style.css?v=<%=(int)(Math.random()*10000)%>" />

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
					<i class="fa-solid fa-bars-staggered fa-lg"></i> <span>Turmas Matricula</span>
				</div>
			</div>
		</section>
		
		<section id="containerInfoAluno" class="mb-5">
			<div class="card p-3 ">

				<div class="title mb-3">
					<i class="fa-solid fa-people-roof fa-lg"></i> <span>Informações
						da Turma</span>
				</div>

				<div class="row mb-3">

					<div class=" col-md-6">
						<label for="obsAprovacao" class="form-label">Escola: </label> <input
							type="text" id="escola" autocomplete="off" name="obsAprovacao"
							class="form-control" disabled />
					</div>

					<div class="col-md-6">
						<label for="obsAprovacao" class="form-label">Nome da Turma: </label> <input
							type="text" id="nomeTurma" autocomplete="off" name="obsAprovacao"
							class="form-control" disabled />
					</div>

				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="obsAprovacao" class="form-label">Periodo Letivo: </label> <input
							type="text" id="periodoLetivo" autocomplete="off"
							name="obsAprovacao" class="form-control" disabled />
					</div>

					<div class=" col-md-6">
						<label for="obsAprovacao" class="form-label">Turno: </label> <input
							type="text" id="turno" autocomplete="off"
							name="obsAprovacao" class="form-control" disabled />
					</div>
					
				</div>
				
				<div class="row mb-3">
				
				<div class=" col-md-6">
						<label for="obsAprovacao" class="form-label">Disciplina: </label> <input
							type="text" id="disciplina" autocomplete="off"
							name="obsAprovacao" class="form-control" disabled />
					</div>
				</div>
				
				



			</div>

		</section>
		<section class="pt-4 card card-table px-5 py-3">

			<table
				class="table tabela-cadastro table-striped table-bordered mb-0 caption-top mx-auto">
				<caption>Alunos</caption>
				<thead>
					<tr>
						<th scope="col" class="sortable border-end" data-column="matricula">
							<div
								class='d-flex align-items-center justify-content-between pe-2'>
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Matricula</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton1">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent1">
										<input type="text" class='form-control mb-3 searchInput'
											placeholder="Digite o nome da escola">
										<button class='btn btn-sm col-12 btn-success searchButton'>Buscar</button>
									</div>
								</div>
							</div>
						</th>
						<th scope="col" class="sortable border-end" data-column="nomeCompleto">
							<div
								class='d-flex align-items-center justify-content-between pe-2'>
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Nome</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton3">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent3">
										<input type="text" class='form-control mb-3 searchInput'
											placeholder="Digite aqui..">
										<button class='btn btn-sm col-12 btn-success searchButton'>Buscar</button>
									</div>
								</div>
							</div>
						</th>
					
						<th scope="col" class="sortable border-end" data-column="tipoIngresso">
							<div
								class='d-flex align-items-center justify-content-between pe-2'>
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Situação</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton3">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent3">
										<input type="text" class='form-control mb-3 searchInput'
											placeholder="Digite aqui..">
										<button class='btn btn-sm col-12 btn-success searchButton'>Buscar</button>
									</div>
								</div>
							</div>
						</th>
						<th scope="col" class="sortable border-end" data-column="tipoIngresso">
							<div
								class='d-flex align-items-center justify-content-between pe-2'>
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Tipo Ingresso</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton3">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent3">
										<input type="text" class='form-control mb-3 searchInput'
											placeholder="Digite aqui..">
										<button class='btn btn-sm col-12 btn-success searchButton'>Buscar</button>
									</div>
								</div>
							</div>
						</th>

						<th scope="col" class="border-end pe-2 th-sem-filtro">Ações</th>
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
		</section>

	</main>


	<script charset="UTF-8" 
		src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>

	<script charset="UTF-8"  src="https://code.jquery.com/jquery-3.7.1.js"
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
	<script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8"  src="<%=contextPath%>/resources/assets/js/turmas/turmaMatricula.js"></script>
	
	<script charset="UTF-8" 
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
