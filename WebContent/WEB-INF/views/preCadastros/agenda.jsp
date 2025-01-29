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

<!-- CSS -->

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- Select 2 -->
<link
	href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
	rel="stylesheet" />

<!-- FontAwesome -->
<script charset="UTF-8" src="https://kit.fontawesome.com/3ce21ff22c.js"
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
					<i class="fa-solid fa-school fa-lg"></i> <span>Agenda</span>
				</div>
			</div>
		</section>
		<section class="pt-4 card card-table px-5 py-3 mb-4">

			<h3 id="tituloForm" class="text-start mb-5">Filtrar</h3>
			<p>Informe os dados nos filtros abaixo para realizar a busca de
				uma turma:</p>

			<div class="row">
				<div class="col-md-6 mb-3">
					<label for="periodoLetivo" class="form-label">Período
						Letivo</label> <select id="periodoLetivo" class="form-select">
						<option value="">Selecione um período letivo</option>
					</select>
				</div>

				<div class="col-md-6 mb-3">
					<label for="escola" class="form-label">Escola</label> <select
						id="escola" class="form-select">
						<option value="">Selecione uma escola</option>
					</select>
				</div>
			</div>

			<div class="row">

				<div class="col-md-5 mb-3">
					<label for="disciplina" class="form-label">Disciplina</label> <select
						id="disciplina" class="form-select">
						<option value="">Selecione uma disciplina</option>
					</select>
				</div>

				<div class="col-md-5 mb-3">
					<label for="turma" class="form-label">Turma</label> <select
						id="turma" class="form-select">
						<option value="">Selecione uma disciplina</option>
					</select>
				</div>

				<div class="col-md-2 mb-3 align-self-end">
					<button class="btn btn-warning px-5" id="btn-buscar"
						style="font-weight: 500">
						Buscar <i class="fas fa-search ms-2" style="color: #121212"></i>
					</button>
				</div>
			</div>

			<section id="textoInicial">
				<div
					class="w-100 d-flex align-items-center justify-content-center mt-2"
					style="flex: 1">
					<h2>Use os filtros acima para encontrar a turma desejada.</h2>
				</div>
			</section>

			<div id="boxAgenda">
				<div class="mt-3 mb-3"
					style="display: flex; align-items: center; justify-content: end">
					<div class="d-flex align-items-center gap-2">
						<button id="limpa-filtros" class="btn btn-sm btn-danger">
							Limpar Filtros</button>
						<button id="exportar-excel"
							class="btn btn-sm btn-success d-flex align-items-center gap-2">
							<i class="fa-solid fa-file-export"></i> Exportar
						</button>
						<button
							class="btn btn-primary btn-sm btn-new-alter px-3 py-1 ms-auto"
							data-bs-toggle="modal" onclick="limpaCampo()"
							data-bs-target="#newCadastro">Novo Cadastro</button>
					</div>
				</div>

				<div class="container-table">
					<table
						class="table tableNot tabela-cadastro table-striped table-bordered mb-0 caption-top mx-auto">
						<caption>Itens Cadastrados</caption>
						<thead>
							<tr>
								<th scope="col" class="border-end pe-2 th-sem-filtro">
									Selecionar</th>
								<th scope="col" class="sortable border-end"
									data-column="nomeEscola">
									<div
										class="d-flex align-items-center justify-content-between pe-2">
										<div
											class="col d-flex align-items-center justify-content-between">
											<span>Escola</span> <i class="fas fa-sort mx-2"
												style="color: #dddddd"></i>
										</div>
										<div class="dropdown-form">
											<div class="dropdown-toggle-form" id="dropdownButton1">
												<i class="fas fa-search" style="color: #dddddd"></i>
											</div>
											<div
												class="dropdown-content-form rounded-3 dropdown-content-left"
												id="dropdownContent1">
												<input type="text" class="form-control mb-3 searchInput"
													placeholder="Digite a Escola" />
												<button class="btn btn-sm col-12 btn-success searchButton">
													Buscar Escola</button>
											</div>
										</div>
									</div>
								</th>
								<th scope="col" class="sortable border-end" data-column="ano">
									<div
										class="d-flex align-items-center justify-content-between pe-2">
										<div
											class="col d-flex align-items-center justify-content-between">
											<span>Período</span> <i class="fas fa-sort mx-2"
												style="color: #dddddd"></i>
										</div>
									</div>
								</th>
								<th scope="col" class="sortable border-end" data-column="turno">
									<div
										class="d-flex align-items-center justify-content-between pe-2">
										<div
											class="col d-flex align-items-center justify-content-between">
											<span>Turno</span> <i class="fas fa-sort mx-2"
												style="color: #dddddd"></i>
										</div>
									</div>
								</th>
								<th scope="col" class="sortable border-end"
									data-column="nomeTurma">
									<div
										class="d-flex align-items-center justify-content-between pe-2">
										<div
											class="col d-flex align-items-center justify-content-between">
											<span>Turma</span> <i class="fas fa-sort mx-2"
												style="color: #dddddd"></i>
										</div>
										<div class="dropdown-form">
											<div class="dropdown-toggle-form" id="dropdownButton1">
												<i class="fas fa-search" style="color: #dddddd"></i>
											</div>
											<div
												class="dropdown-content-form rounded-3 dropdown-content-left"
												id="dropdownContent1">
												<input type="text" class="form-control mb-3 searchInput"
													placeholder="Digite o Nome da Turma" />
												<button class="btn btn-sm col-12 btn-success searchButton">
													Buscar Turma</button>
											</div>
										</div>
									</div>
								</th>
								<th scope="col" class="sortable border-end"
									data-column="nomeDisciplina">
									<div
										class="d-flex align-items-center justify-content-between pe-2">
										<div
											class="col d-flex align-items-center justify-content-between">
											<span>Disciplina</span> <i class="fas fa-sort mx-2"
												style="color: #dddddd"></i>
										</div>
										<div class="dropdown-form">
											<div class="dropdown-toggle-form" id="dropdownButton1">
												<i class="fas fa-search" style="color: #dddddd"></i>
											</div>
											<div
												class="dropdown-content-form rounded-3 dropdown-content-left"
												id="dropdownContent1">
												<input type="text" class="form-control mb-3 searchInput"
													placeholder="Digite a Disciplina" />
												<button class="btn btn-sm col-12 btn-success searchButton">
													Buscar Disciplina</button>
											</div>
										</div>
									</div>
								</th>

								<th scope="col" class="sortable border-end"
									data-column="dataAgenda">
									<div
										class="d-flex align-items-center justify-content-between pe-2">
										<div
											class="col d-flex align-items-center justify-content-between">
											<span>Data Agenda</span> <i class="fas fa-sort mx-2"
												style="color: #dddddd"></i>
										</div>
										<div class="dropdown-form">
											<div class="dropdown-toggle-form" id="dropdownButton1">
												<i class="fas fa-search" style="color: #dddddd"></i>
											</div>
											<div
												class="dropdown-content-form rounded-3 dropdown-content-left"
												id="dropdownContent1">
												<input type="date" class="form-control mb-3 searchInput" />
												<button class="btn btn-sm col-12 btn-success searchButton">
													Buscar</button>
											</div>
										</div>
									</div>
								</th>
								<th scope="col" class="border-end pe-2 th-sem-filtro">Hora
									Início</th>
								<th scope="col" class="border-end pe-2 th-sem-filtro">Hora
									Fim</th>
								<th scope="col" class="border-end pe-2 th-sem-filtro">Titulo
									Aula</th>
								<th scope="col" class="border-end pe-2 th-sem-filtro">Resumo</th>
								<th scope="col" class="border-end pe-2 th-sem-filtro">
									Realizada</th>
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
				</div>
			</div>

		</section>

		<section class="pt-4 card px-5 py-3" id="containerAnexos">
			<div class="mt-3 mb-3"
				style="display: flex; align-items: center; justify-content: space-between;">
				<span class="infra-title"> Anexos </span>
				<div class="d-flex align-items-center gap-2">
					<button id="exportar-excel"
						class="btn btn-sm btn-success d-flex align-items-center gap-2">
						<i class="fa-solid fa-file-export"></i> Exportar
					</button>
					<button
						class="btn btn-primary btn-sm btn-new-alter px-3 py-1 ms-auto"
						data-bs-toggle="modal" onclick="showModalAnexo()"
						data-bs-target="#newCadastroAnexo">Novo Cadastro</button>
				</div>
			</div>

			<div class="container-table contTable pt-4">
				<table
					class="table tableNot tabela-atos table-striped table-bordered mb-0 caption-top mx-auto">
					<thead>
						<tr>
							<th scope="col" class="border-end pe-2 th-sem-filtro">
								Agenda</th>
							<th scope="col" class="border-end pe-2 th-sem-filtro">Data
								de Cadastro</th>
							<th scope="col" class="border-end pe-2 th-sem-filtro">
								Descrição</th>
							<th scope="col" class="border-end pe-2 th-sem-filtro">Ativo</th>
							<th scope="col" class="border-end pe-2 th-sem-filtro">Ações</th>
						</tr>
					</thead>
					<tbody id="cola-tabela-anexo" class="table-group-divider"></tbody>
				</table>
			</div>

			<div id="pagination" class="mx-auto mt-auto">
				<button id="prev" class="btn btn-sm">
					<i class="fa-solid fa-angle-left fa-xl"></i>
				</button>
				<div id="page-numbers" class="btn-group mt-2"></div>
				<button id="next" class="btn btn-sm">
					<i class="fa-solid fa-angle-right fa-xl"></i>
				</button>
			</div>

			<div class="modal fade" id="newCadastroAnexo" tabindex="-1"
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
							<form id="formCadastroAnexo">
								<div class="col-md-12">
									<div class="mb-4">
										<label for="agendaIdAnexo" class="form-label">Agenda:<span
											class="red">*</span>
										</label><select class="form-control" aria-label="Agenda Id"
											id="agendaIdAnexo" name="agendaIdAnexo" disabled>
											<option selected disabled value="">Selecione uma
												opção</option>
										</select>
									</div>
								</div>
								<div class="col-md-12">
									<div class="mb-4">
										<label for="agendaIdAnexo" class="form-label">Descrição:
										</label> <input autocomplete="off" type="text"
											id="descricaoAnexoAgenda" name="descricaoAnexoAgenda"
											class="form-control" />
									</div>
								</div>
								<div class="col-md-12">
									<div class="mb-4">
										<label for="anexoAgenda" class="form-label">Arquivo:<span
											class="red">*</span>
										</label><input autocomplete="off" type="file" id="anexoAgenda"
											name="anexoAgenda" class="form-control" required />
									</div>
								</div>

								<div class="d-flex justify-content-end gap-2">
									<button type="button" class="btn btn-secondary"
										data-bs-dismiss="modal">Fechar</button>
									<button type="submit" data-bs-dismiss="modal"
										class="btn btn-primary">Salvar</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div class="modal fade" id="editItemAnexo" tabindex="-1"
				aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="title-edit">Editar</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form id="formEditAnexo">
								<div class="col-md-12">
									<div class="mb-4">
										<label for="agendaIdAnexoEdit" class="form-label">Agenda:<span
											class="red">*</span>
										</label><select class="form-control" aria-label="Agenda Id"
											id="agendaIdAnexoEdit" name="agendaIdEdit" disabled>
											<option selected disabled value="">Selecione uma
												opção</option>
										</select>
									</div>
								</div>

								<div class="col-md-12">
									<div class="mb-4">
										<label for="descricaoAnexoAgendaEdit" class="form-label">Descrição:
										</label> <input autocomplete="off" type="text"
											id="descricaoAnexoAgendaEdit" name="descricaoAnexoAgendaEdit"
											class="form-control" />
									</div>
								</div>

								<div class="col-md-12">
									<div class="mb-4">
										<label for="anexoAgendaEdit" class="form-label">Arquivo:<span
											class="red">*</span>
										</label><input autocomplete="off" type="file" id="anexoAgendaEdit"
											name="anexoAgendaEdit" class="form-control" required />
									</div>
								</div>

								<div class="d-flex justify-content-end gap-2">
									<button type="button" class="btn btn-secondary"
										data-bs-dismiss="modal">Fechar</button>
									<button type="submit" data-bs-dismiss="modal"
										class="btn btn-primary">Salvar</button>
								</div>
							</form>
						</div>
					</div>
				</div>
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
							<div class="mb-4">
								<label for="turmaId" class="form-label"> Turma:<span
									class="red">*</span>
								</label>
								<div class="custom-select">
									<input type="text" id="turmaSearch" class="form-control"
										placeholder="Selecione ou pesquise..." autocomplete="off" />
									<ul class="options-list" id="turmaOptions"></ul>
								</div>
								<select class="form-select" aria-label="Turma" id="turmaId"
									required name="turmaId" style="display: none">
									<option selected disabled value="">Selecione a Turma</option>
								</select>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="mb-4">
										<label for="dataAgenda" class="form-label">Data
											Agenda:<span class="red">*</span>
										</label><input autocomplete="off" type="date" id="dataAgenda"
											name="dataAgenda" class="form-control" required />
									</div>
								</div>
								<div class="col-md-6">
									<div class="mb-4">
										<label for="tituloAula" class="form-label">Titulo
											Aula: </label><input autocomplete="off" type="text" id="tituloAula"
											name="tituloAula" class="form-control" />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="mb-4">
										<label for="horaIni" class="form-label">Hora Início:<span
											class="red">*</span>
										</label><input autocomplete="off" type="time" id="horaIni"
											name="horaIni" class="form-control" required />
									</div>
								</div>
								<div class="col-md-6">
									<div class="mb-4">
										<label for="horaFim" class="form-label">Hora Fim:<span
											class="red">*</span>
										</label><input autocomplete="off" type="time" id="horaFim"
											name="horaFim" class="form-control" required />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="mb-4">
										<label for="resumo" class="form-label">Resumo: </label><input
											autocomplete="off" type="text" id="resumo" name="resumo"
											class="form-control" />
									</div>
								</div>
								<div class="col-md-6">
									<div class="mb-4">
										<label for="turmaId" class="form-label">Realizada:<span
											class="red">*</span>
										</label>
										<div class="form-control card-form-infra">
											<label for="isRealizada">Sim</label> <label class="switch">
												<input type="checkbox" id="isRealizada" name="isRealizada" />
												<span class="slider"></span>
											</label> <label for="isRealizada">Não</label>
										</div>
									</div>
								</div>
							</div>

							<div class="d-flex justify-content-end gap-2">
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">Fechar</button>
								<button type="submit" data-bs-dismiss="modal"
									class="btn btn-primary">Salvar</button>
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
							<div class="mb-4">
								<label for="turmaIdEdit" class="form-label"> Turma:<span
									class="red">*</span>
								</label>
								<div class="custom-select">
									<input type="text" id="turmaSearchEdit" class="form-control"
										placeholder="Selecione ou pesquise..." autocomplete="off" />
									<ul class="options-list" id="turmaOptionsEdit"></ul>
								</div>
								<select class="form-select" aria-label="Turma" id="turmaIdEdit"
									required name="turmaIdEdit" style="display: none">
									<option selected disabled>Selecione a Turma</option>
								</select>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="mb-4">
										<label for="dataAgendaEdit" class="form-label">Data
											Agenda:<span class="red">*</span>
										</label><input autocomplete="off" type="date" id="dataAgendaEdit"
											name="dataAgendaEdit" class="form-control" required />
									</div>
								</div>
								<div class="col-md-6">
									<div class="mb-4">
										<label for="tituloAulaEdit" class="form-label">Titulo
											Aula: </label><input autocomplete="off" type="text"
											id="tituloAulaEdit" name="tituloAulaEdit"
											class="form-control" />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="mb-4">
										<label for="horaIniEdit" class="form-label">Hora
											Início:<span class="red">*</span>
										</label><input autocomplete="off" type="time" id="horaIniEdit"
											name="horaIniEdit" class="form-control" required />
									</div>
								</div>
								<div class="col-md-6">
									<div class="mb-4">
										<label for="horaFimEdit" class="form-label">Hora Fim:<span
											class="red">*</span>
										</label><input autocomplete="off" type="time" id="horaFimEdit"
											name="horaFimEdit" class="form-control" required />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="mb-4">
										<label for="resumoEdit" class="form-label">Resumo: </label><input
											autocomplete="off" type="text" id="resumoEdit"
											name="resumoEdit" class="form-control" />
									</div>
								</div>
								<div class="col-md-6">
									<div class="mb-4">
										<label for="turmaId" class="form-label">Realizada:<span
											class="red">*</span>
										</label>
										<div class="form-control card-form-infra">
											<label for="isRealizadaEdit">Sim</label> <label
												class="switch"> <input type="checkbox"
												id="isRealizadaEdit" name="isRealizadaEdit" /> <span
												class="slider"></span>
											</label> <label for="isRealizadaEdit">Não</label>
										</div>
									</div>
								</div>
							</div>

							<div class="d-flex justify-content-end gap-2">
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">Fechar</button>
								<button type="submit" data-bs-dismiss="modal"
									class="btn btn-primary">Salvar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="anexoAgenda" tabindex="-1"
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
						<form id="formCadastroAnexo">
							<div class="col-md-12">
								<div class="mb-4">
									<label for="agendaId" class="form-label">Agenda:<span
										class="red">*</span>
									</label><select class="form-control" aria-label="Agenda Id"
										id="agendaId" name="agendaId">
										<option selected disabled value="">Selecione uma
											opção</option>
									</select>
								</div>
							</div>
							<div class="col-md-12">
								<div class="mb-4">
									<label for="anexoAgenda" class="form-label">Arquivo:<span
										class="red">*</span>
									</label><input autocomplete="off" type="file" id="anexoAgendaInput"
										name="anexoAgendaInput" class="form-control" required />
								</div>
							</div>

							<div class="d-flex justify-content-end gap-2">
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">Fechar</button>
								<button type="submit" data-bs-dismiss="modal"
									class="btn btn-primary">Salvar</button>
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
		src="<%=contextPath%>/resources/assets/js/agenda.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
