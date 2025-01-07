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
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-graduation-cap fa-lg"></i> <span>Currículos</span>
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
					<button class="btn btn-primary btn-sm px-3 py-1 ms-auto"
						data-bs-toggle="modal" onclick="limpaCampo()"
						data-bs-target="#newCadastro">Novo Cadastro
					</button>
				</div>
			</div>

			<table
				class="table tabela-cadastro table-striped table-bordered mb-0 caption-top mx-auto">
				<caption>Itens Cadastrados</caption>
				<thead>
					<tr>
						<th scope="col" class="sortable border-end" data-column="cursoId">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Curso</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton2">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent2">
										<input type="text" class="form-control mb-3 searchInput"
											placeholder="Digite aqui..." />
										<button class="btn btn-sm col-12 btn-success searchButton">
											Buscar</button>
									</div>
								</div>
							</div>
						</th>

						<th scope="col" class="sortable border-end"
							data-column="curriculo">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Currículo</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton7">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent7">
										<input type="text" class="form-control mb-3 searchInput"
											placeholder="Digite aqui..." />
										<button class="btn btn-sm col-12 btn-success searchButton">
											Buscar</button>
									</div>
								</div>
							</div>
						</th>

						<th scope="col" class="sortable border-end"
							data-column="curriculo">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Descrição</span> <i class="fas fa-sort me-3"
										style="color: #dddddd"></i>
								</div>
								<div class="dropdown-form">
									<div class="dropdown-toggle-form" id="dropdownButton7">
										<i class="fas fa-search" style="color: #dddddd"></i>
									</div>
									<div
										class="dropdown-content-form rounded-3 dropdown-content-left"
										id="dropdownContent7">
										<input type="text" class="form-control mb-3 searchInput"
											placeholder="Digite aqui..." />
										<button class="btn btn-sm col-12 btn-success searchButton">
											Buscar</button>
									</div>
								</div>
							</div>
						</th>

						<th scope="col" class="sortable border-end"
							data-column="dtHomologacao">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Data de homologação</span> <i class="fas fa-sort me-3"
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

						<th scope="col" class="sortable border-end"
							data-column="dtExtincao">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Data de extinção</span> <i class="fas fa-sort me-3"
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

						<th scope="col" class="sortable border-end"
							data-column="aulasPrevistas">
							<div
								class="d-flex align-items-center justify-content-between pe-2">
								<div
									class="col d-flex align-items-center justify-content-between">
									<span>Aulas previstas</span> <i class="fas fa-sort me-3"
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
							<div class="custom-select-container mb-4">
								<label for="cursoSearch" class="form-label">Curso:<span
									class="red">*</span></label>

								<div class="custom-select">
									<input type="text" id="cursoSearch" class="form-control"
										placeholder="Selecione ou pesquise..." autocomplete="off" />
									<ul class="options-list" id="cursoOptions"></ul>
								</div>

								
								<select id="cursoId" name="cursoId" class="form-select"
									hidden required>
									<option value="" selected disabled>Selecione uma opção
									</option>
								</select>
							</div>

							<div class="mb-4" id="cardCurriculo">
								<label for="curriculo" class="form-label">Currículo:<span
									class="red">*</span>
								</label> <input type="text" class="form-control" id="curriculoNew"
									name="curriculo" required aria-describedby="Currículo"
									autocomplete="off" />
							</div>

							<div class="mb-4">
								<label for="descricao" class="form-label">Descrição:<span
									class="red">*</span>
								</label> <input type="text" class="form-control" id="descricao"
									name="descricao" required aria-describedby="Descrição"
									autocomplete="off" />
							</div>

							<div class="row mb-4">
								<div class="col-6">
									<label for="dtHomologacao" class="form-label">Data
										de homologação: </label> <input max="2999-01-01" autocomplete="off"
										type="date" id="dtHomologacao" name="dtHomologacao"
										class="form-control" />
								</div>
								<div class="col-6">
									<label for="dtExtincao" class="form-label">Data
										de extinção: </label> <input max="2999-01-01" autocomplete="off"
										type="date" id="dtExtincao" name="dtExtincao"
										class="form-control" />
								</div>
							</div>

							<div class="row mb-4">
								<div class="col-6">
									<label for="prazoIdeal" class="form-label">Prazo
										ideal: </label> <input autocomplete="off" type="number"
										id="prazoIdeal" name="prazoIdeal" class="form-control" />
								</div>
								<div class="col-6">
									<label for="prazoMax" class="form-label">Prazo
										máximo: </label> <input autocomplete="off" type="number" id="prazoMax"
										name="prazoMax" class="form-control" />
								</div>
							</div>

							<div class="row mb-4">
								<div class="col-6">
									<label for="creditos" class="form-label">Créditos: </label> <input
										autocomplete="off" type="number" id="creditos" name="creditos"
										class="form-control" />
								</div>
								<div class="col-6">
									<label for="aulasPrevistas" class="form-label">Aulas
										previstas: </label> <input autocomplete="off" type="number"
										id="aulasPrevistas" name="aulasPrevistas" class="form-control" />
								</div>
							</div>

							<div class="d-flex justify-content-end gap-2">
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">Fechar</button>
								<button type="submit" class="btn btn-primary px-4" id="btn-submit">
									Salvar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
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
							<div class="custom-select-container mb-4">
								<label for="cursoSearchEdit" class="form-label">Curso:<span
									class="red">*</span></label>
								<div class="custom-select">
									<input type="text" id="cursoSearchEdit" class="form-control"
										placeholder="Selecione ou pesquise..." autocomplete="off" />
									<ul class="options-list" id="cursoOptionsEdit"></ul>
								</div>

								<!-- Select oculto para armazenar o valor selecionado -->
								<select id="cursoIdEdit" name="cursoIdEdit" class="form-select"
									hidden required>
									<option value="" selected disabled>Selecione uma opção
									</option>
								</select>
							</div>

							<div class="mb-4" id="cardCurriculoEdit">
								<label for="curriculoEdit" class="form-label">Currículo:<span
									class="red">*</span>
								</label> <input type="text" class="form-control" id="curriculoEdit"
									name="curriculoEdit" required aria-describedby="Currículo"
									autocomplete="off" />
							</div>

							<div class="mb-4">
								<label for="descricaoEdit" class="form-label">Descrição:<span
									class="red">*</span>
								</label> <input type="text" class="form-control" id="descricaoEdit"
									name="descricaoEdit" required aria-describedby="Descrição"
									autocomplete="off" />
							</div>

							<div class="row mb-4">
								<div class="col-6">
									<label for="dtHomologacaoEdit" class="form-label">Data
										de homologação: </label> <input max="2999-01-01" autocomplete="off"
										type="date" id="dtHomologacaoEdit" name="dtHomologacaoEdit"
										class="form-control" />
								</div>
								<div class="col-6">
									<label for="dtExtincaoEdit" class="form-label">Data
										de extinção: </label> <input max="2999-01-01" autocomplete="off"
										type="date" id="dtExtincaoEdit" name="dtExtincaoEdit"
										class="form-control" />
								</div>
							</div>

							<div class="row mb-4">
								<div class="col-6">
									<label for="prazoIdealEdit" class="form-label">Prazo
										ideal: </label> <input autocomplete="off" type="number"
										id="prazoIdealEdit" name="prazoIdealEdit" class="form-control" />
								</div>
								<div class="col-6">
									<label for="prazoMaxEdit" class="form-label">Prazo
										máximo: </label> <input autocomplete="off" type="number"
										id="prazoMaxEdit" name="prazoMaxEdit" class="form-control" />
								</div>
							</div>

							<div class="row mb-4">
								<div class="col-6">
									<label for="creditosEdit" class="form-label">Créditos:
									</label> <input autocomplete="off" type="number" id="creditosEdit"
										name="creditosEdit" class="form-control" />
								</div>
								<div class="col-6">
									<label for="aulasPrevistasEdit" class="form-label">Aulas
										previstas: </label> <input autocomplete="off" type="number"
										id="aulasPrevistasEdit" name="aulasPrevistasEdit"
										class="form-control" />
								</div>
							</div>

							<div class="d-flex justify-content-end gap-2">
								<button type="button" onclick='ativar("curriculo")'
									class="ativar btn btn-secondary" data-bs-dismiss="modal">
									Ativar</button>
								<button type="button" onclick='desativar("curriculo")'
									class="desativar btn btn-secondary" data-bs-dismiss="modal">
									Desativar</button>
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">Fechar</button>
								<button type="submit" data-bs-dismiss="modal"
									class="btn btn-primary px-4" id="btn-editar">
									Salvar</button>
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
		src="<%=contextPath%>/resources/assets/js/matrizCurricular/curriculo.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
