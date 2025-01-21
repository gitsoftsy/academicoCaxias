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
			<div class="card card-title">
				<div class="card-body title">
					<i class="fa-solid fa-cogs fa-lg"></i> <span>Período Letivo</span>
				</div>
				<div class="info">
					<div class="tooltiptext">Usado na área da educação para se
						referir ao período o qual as aulas são ministradas e os alunos
						estão matriculados em instituições de ensino, como escolas,
						faculdades ou universidades</div>
					<i class="fa-solid fa-info"></i>
				</div>
			</div>
		</section>
		<section class="pt-4 card card-table px-5 py-3">
			<div class="mt-3 mb-3"
				style="display: flex; align-items: center; justify-content: end">
				<div class="d-flex align-items-center gap-2">
					<button id="limpa-filtros" class="btn btn-sm btn-danger">
						Limpar Filtros</button>
					<button id="exportar-excel"
						class="btn btn-sm btn-success d-flex align-items-center gap-2">
						<i class="fa-solid fa-file-export"></i>Exportar
					</button>
					<button
						class="btn btn-primary btn-sm btn-new-alter px-3 py-1 ms-auto"
						data-bs-toggle="modal" onclick="limpaCampo()"
						data-bs-target="#newCadastro">Novo Cadastro</button>
				</div>
			</div>

			<table
				class="table tabela-cadastro table-striped table-bordered mb-0 caption-top mx-auto">
				<caption>Itens Cadastrados</caption>
				<thead>
					<tr>
						<th scope="col" class="sortable border-end" data-column="ano">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Ano</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton1">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent1">
										<input type="number" class="form-control mb-3 searchInput"
											placeholder="Digite o nome do usuário" />
										<button class="btn btn-sm col-12 btn-success searchButton">
											Buscar</button>
									</div>
								</div>
							</div>
						</th>
						
						<th scope="col" class="sortable border-end" data-column="periodo">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Período</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton1">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent1">
										<input type="number" class="form-control mb-3 searchInput"
											placeholder="Digite o nome do usuário" />
										<button class="btn btn-sm col-12 btn-success searchButton">
											Buscar</button>
									</div>
								</div>
							</div>
						</th>
						<th scope="col" class="sortable border-end" data-column="tipoPeriodicidade">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Tipo de Periodicidade</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
							</div>
						</th>
						<th scope="col" class="sortable border-end" data-column="dtInicio">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Data início</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton4">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent4">
										<input max="2999-01-01" type="date"
											class="form-control mb-3 searchInput" />
										<button class="btn btn-sm col-12 btn-success searchButton">
											Buscar</button>
									</div>
								</div>
							</div>
						</th>
						<th scope="col" class="sortable border-end" data-column="dtFim">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Data fim</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton5">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent5">
										<input max="2999-01-01" type="date"
											class="form-control mb-3 searchInput" />
										<button class="btn btn-sm col-12 btn-success searchButton">
											Buscar</button>
									</div>
								</div>
							</div>
						</th>
						<th scope="col" class="sortable border-end" data-column="descricao">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Descrição</span><i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
							</div>
						</th>
						<th scope="col" class="border-end pe-2 th-sem-filtro">Ativo</th>
						<th scope="col" class="border-end pe-2 th-sem-filtro">Ações</th>
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
		</section>
		<div class="modal fade" id="newCadastro" tabindex="-1"
			data-bs-backdrop="static" data-bs-keyboard="false"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="title-novo-ato">Novo
							Cadastro</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form id="formCadastro">

							<div class="row mb-4">
								<div class="col-6">
									<label for="ano" class="form-label">Ano:<span
										class="red">*</span>
									</label> <select class="form-select" aria-label="ano" id="ano" required
										name="ano">
										<option selected disabled value="">Selecione o ano</option>
									</select>
								</div>
								<div class="col-6">
									<label for="periodo" class="form-label">Período:<span
										class="red">*</span>
									</label> <select class="form-select" aria-label="periodo" id="periodo"
										required name="periodo">
										<option selected disabled value="">Selecione uma
											opção</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>
								</div>
							</div>
							<div class="row mb-4">
								<div class="col-6">
									<label for="dtInicio" class="form-label">Data início:<span
										class="red">*</span>
									</label> <input max="2999-01-01" autocomplete="off" type="date"
										id="dtInicio" required name="dtInicio" class="form-control" />
								</div>
								<div class="col-6">
									<label for="dtFim" class="form-label">Data fim:<span
										class="red">*</span>
									</label> <input max="2999-01-01" autocomplete="off" type="date"
										id="dtFim" required name="dtFim" class="form-control" />
								</div>
							</div>
							<div class="mb-4">
								<label for="descricao" class="form-label">Descrição:<span
									class="red">*</span>
								</label> <input type="text" class="form-control" id="descricao"
									name="descricao" required aria-describedby="Descrição"
									autocomplete="off" />
							</div>
							<div class="mb-4">
								<label for="tipoPeriodicidade" class="form-label">Tipo
									da periodicidade:<span class="red">*</span>
								</label> <select class="form-select" aria-label="Tipo da periodicidade"
									id="tipoPeriodicidade" required name="tipoPeriodicidade">
									<option selected disabled value="">Selecione uma opção
									</option>
									<option value="A">Anual</option>
									<option value="B">Bimestral</option>
									<option value="T">Trimestral</option>
									<option value="S">Semestral</option>
								</select>
							</div>
							<div class="d-flex justify-content-end gap-2">
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">Fechar</button>
								<button type="submit" data-bs-dismiss="modal"
									class="btn btn-primary px-4">Salvar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		-
		<div class="modal fade" id="editItem" tabindex="-1"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="title-edit">Editar</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form id="formEdit">

							<div class="row mb-4">
								<div class="col-6">
									<label for="anoEdit" class="form-label">Ano:<span
										class="red">*</span>
									</label> <select class="form-select" aria-label="anoEdit" id="anoEdit"
										required name="anoEdit">
										<option selected disabled value="">Selecione o ano</option>
									</select>
								</div>
								<div class="col-6">
									<label for="periodoEdit" class="form-label">Período:<span
										class="red">*</span>
									</label> <select class="form-select" aria-label="periodoEdit"
										id="periodoEdit" required name="periodoEdit">
										<option selected disabled value="">Selecione uma
											opção</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>
								</div>
							</div>
							<div class="row mb-4">
								<div class="col-6">
									<label for="dtInicioEdit" class="form-label">Data
										início:<span class="red">*</span>
									</label> <input max="2999-01-01" autocomplete="off" type="date"
										id="dtInicioEdit" required name="dtInicioEdit"
										class="form-control" />
								</div>
								<div class="col-6">
									<label for="dtFimEdit" class="form-label">Data fim:<span
										class="red">*</span>
									</label> <input max="2999-01-01" autocomplete="off" type="date"
										id="dtFimEdit" required name="dtFimEdit" class="form-control" />
								</div>
							</div>
							<div class="mb-4">
								<label for="descricaoEdit" class="form-label">Descrição:<span
									class="red">*</span>
								</label> <input type="text" class="form-control" id="descricaoEdit"
									name="descricaoEdit" required aria-describedby="Descrição"
									autocomplete="off" />
							</div>
							<div class="mb-4">
								<label for="tipoPeriodicidadeEdit" class="form-label">Tipo
									da periodicidade:<span class="red">*</span>
								</label> <select class="form-select" aria-label="Tipo da periodicidade"
									id="tipoPeriodicidadeEdit" required
									name="tipoPeriodicidadeEdit">
									<option selected disabled value="">Selecione uma opção
									</option>
									<option value="A">Anual</option>
									<option value="B">Bimestral</option>
									<option value="T">Trimestral</option>
									<option value="S">Semestral</option>
								</select>
							</div>

							<div class="d-flex justify-content-end gap-2">
								<button type="button" onclick='ativar("periodoletivo")'
									class="ativar btn btn-secondary" data-bs-dismiss="modal">
									Ativar</button>
								<button type="button" onclick='desativar("periodoletivo")'
									class="desativar btn btn-secondary" data-bs-dismiss="modal">
									Desativar</button>
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">Fechar</button>
								<button type="submit" data-bs-dismiss="modal"
									class="btn btn-primary px-4">Salvar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</main>

	<script charset="UTF-8"
		src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>

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
		src="<%=contextPath%>/resources/assets/js/periodoLetivo.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
