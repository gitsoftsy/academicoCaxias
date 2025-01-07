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
      href="<%=contextPath%>/resources/assets/css/escolherCaminho.css"
    />

    <!-- FavIcon -->
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="<%=contextPath%>/resources/assets/img/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="<%=contextPath%>/resources/assets/img/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="<%=contextPath%>/resources/assets/img/favicon-16x16.png"
    />
    <link
      rel="manifest"
      href="<%=contextPath%>/resources/assets/favicon/site.webmanifest"
    />
  </head>

  <body>
    <header>
      <img
        class="logo"
        style="width: 15%"
        src="<%=contextPath%>/resources/assets/img/logoPrefeitura.png"
        alt="Logo Prefeitura Caxias do Sul"
      />
      <span>Cadastro de Reserva de Vaga</span>
    </header>

    <main class="container-section">
      <section class="mb-5 mt-5">
        <div class="card">
          <div class="card-body title">
            <i class="fa-regular fa-folder-open"></i>
            <span>Dados Reserva da vaga</span>
          </div>
        </div>
      </section>
      <section class="pt-4 card px-5 py-3">
        <div
          class="row text-center mt-3"
          style="
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
          "
        >
          <h5 class="card-title" style="width: auto; padding: 0">
            Número da Reserva
          </h5>
          <h1 id="reserva"></h1>
        </div>
        <div
          class="row text-center mt-3"
          style="
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
          "
        >
          <h6 class="card-title" style="width: auto">
            Reserva de vaga concluída com sucesso. Dirija-se a escola
            selecionada e informe o número acima para finalizar a matrícula.
          </h6>
        </div>

        <div class="col-md-10 mt-5 mx-auto">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center align-items-center">
              <span class="title me-2">Escola:</span>
              <span class="info-dados" id="nomeEscola"></span>
            </div>
          </div>
          <div
            class="row d-flex justify-content-center align-items-center mt-3"
          >
            <div class="d-flex justify-content-center align-items-center">
              <span class="title me-2">Curso:</span>
              <span class="info-dados" id="curso"></span>
            </div>
          </div>
          <div
            class="row d-flex justify-content-center align-items-center mt-3"
          >
            <div class="d-flex justify-content-center align-items-center">
              <span class="title me-2">Série:</span>
              <span class="info-dados" id="serie"></span>
            </div>
          </div>
          <div
            class="row d-flex justify-content-center align-items-center mt-3"
          >
            <div class="d-flex justify-content-center align-items-center">
              <span class="title me-2">Turno:</span>
              <span class="info-dados" id="turno"></span>
            </div>
          </div>
        </div>

        <div class="col-md-12 text-center mt-5">
          <a
            class="btn btn-primary btn-lg btn-new-alter px-3 py-1 ms-auto"
            style="width: 180px"
            href="reservas"
            ><i class="fa-solid fa-right-from-bracket me-2"></i>Voltar</a
          >
        </div>

        <!-- 	<div class="col-md-12 text-center mt-3">
				<button type="submit" class="btn btn-primary px-5" id="btn-submit"
					onclick="window.location.href = 'reserva-ficha' ">Preencher
					Ficha Médica</button>
			</div> -->
      </section>
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
      src="<%=contextPath%>/resources/assets/js/reservaVaga/showCodigo.js"
    ></script>

    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"
    ></script>
  </body>
</html>
