<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>

<% String contextPath = request.getContextPath(); %> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%> <%@ taglib
uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />

    <title>Softsy - Educacional</title>
    <!-- Bootstrap -->
    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <!-- Sweetalert -->
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
    ></script>
    <script charset="UTF-8" src="sweetalert2.all.min.js"></script>

    <!-- FontAwesome -->
    <script
      charset="UTF-8"
      src="
https://kit.fontawesome.com/3ce21ff22c.js"
      crossorigin="anonymous"
    ></script>

    <!-- Css -->
    <link
      rel="stylesheet"
      href="<%=contextPath%>/resources/assets/css/style.css?v=<%=(int)(Math.random()*10000)%>"
    />
    <link
      rel="stylesheet"
      href="<%=contextPath%>/resources/assets/css/login.css"
    />
  </head>

  <body>
    <header>
      <img
        class="logo"
        style="width: 15%"
        src="<%=contextPath%>/resources/assets/img/logo-sumare.png"
        alt="Logo Prefeitura Caxias do Sul"
      />
    </header>

    <main class="container-section">
      <form class="container-section pb-5" id="formSubmit">
        <section class="mb-5">
          <div class="card">
            <div class="card-body title d-flex align-items-center gap-2">
              <i class="fa-solid fa-clipboard" style="font-size: 36px"></i>
              <h1 class="pt-2" id="tituloForm">Informe a vaga desejada</h1>
            </div>
          </div>
        </section>
        <section
          class="mb-5 p-5 card col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center"
        >
          <h2 id="tituloDados" class="mb-5">Dados</h2>
          <input
            type="text"
            id="usuarioCadastro"
            hidden
            value="${funcionario.idUsuario}"
          />

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="curso" class="form-label">Curso: </label>
              <select
                class="form-select"
                aria-label="País de Nascimento"
                id="curso"
                required
                name="paisNascimentoId"
              >
                <option selected disabled value="0">Selecione uma opção</option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="turno" class="form-label">Turno: </label>
              <select
                class="form-select"
                aria-label="Turno"
                id="turno"
                required
                name="turno"
                disabled
              >
                <option selected disabled value="0">Selecione uma opção</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="serie" class="form-label">Série: </label>
              <select
                class="form-select"
                aria-label="Serie"
                id="serie"
                required
                name="serie"
                disabled
              >
                <option selected disabled value="0">Selecione uma opção</option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="escola" class="form-label">Escola: </label>
              <select
                class="form-select"
                aria-label="UF de Nascimento"
                id="escola"
                required
                name="ufNascimentoId"
                disabled
              >
                <option selected disabled value="0">Selecione uma opção</option>
              </select>
            </div>
          </div>

          <div class="col-md-12 text-center mt-3">
            <button type="submit" class="btn btn-primary px-5" id="btn-submit">
              Próximo
            </button>
          </div>
        </section>
      </form>
    </main>

    <script
      charset="UTF-8"
      src="https://code.jquery.com/jquery-3.7.1.js"
      integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
      crossorigin="anonymous"
    ></script>
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
      crossorigin="anonymous"
    ></script>
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
      crossorigin="anonymous"
    ></script>
    <script
      charset="UTF-8"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"
    ></script>
    <script
      charset="UTF-8"
      src="<%=contextPath%>/resources/assets/js/comum.js"
    ></script>
    <script
      charset="UTF-8"
      src="<%=contextPath%>/resources/assets/js/reservaVaga/vagaDesejadaTurno.js"
    ></script>
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"
    ></script>
  </body>
</html>
