
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Date"%>

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
		<section class="pt-4 card card-table px-5 py-3"
			style="min-height: auto !important">

			<div>
				<h3 id="tituloForm" class="text-start mb-5">Disciplinas
					enturmadas</h3>
				<p>Disciplinas que estão pré matriculadas em uma turma</p>

				<hr>

				<div class="row">

					<table
						class="table tableNot  table-striped table-bordered mb-0 caption-top mx-auto">
						<thead>
							<tr>
								<th scope="col">Turma</th>
								<th scope="col">Disciplina</th>
								<th scope="col">Ano</th>
								<th scope="col">Periodo</th>
								<th scope="col">Status Matrícula</th>
								<th scope="col">Tipo Matrícula</th>
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody id="cola-tabela-matricula" class="table-group-divider"></tbody>
					</table>
					<div id="pagination" class="mx-auto mt-auto"></div>
				</div>

			</div>

		</section>


		<section class="mt-5 pt-4 card card-table px-5 py-3"
			style="min-height: auto !important">


			<div>

				<h3 id="tituloForm" class="text-start mb-5">Disciplinas não
					confirmadas</h3>
				<p>Disciplinas que estão pré matriculadas e não possuem turmas</p>

				<hr>


				<div class="row">

					<table
						class="table tableNot table-striped table-bordered mb-0 caption-top mx-auto">
						<thead>
							<tr>
								<th scope="col">Turma</th>
								<th scope="col">Disciplina</th>
								<th scope="col">Ano</th>
								<th scope="col">Periodo</th>
								<th scope="col">Status Matrícula</th>
								<th scope="col">Tipo Matrícula</th>
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody id="cola-tabela-disciplina" class="table-group-divider"></tbody>
					</table>
					<div id="pagination" class="mx-auto mt-auto"></div>

				</div>
			</div>

		</section>

		<div class="modal fade" id="matricularDisciplina" tabindex="-1"
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
		src="<%=contextPath%>/resources/assets/js/comum.js?ver=<%=new Date().getTime()%>"></script>

	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/matrizCurricular/matricularDisciplina.js?ver=<%=new Date().getTime()%>"></script>


	<script
		src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
