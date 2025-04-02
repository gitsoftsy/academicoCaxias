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
  </head>

  <body>
    <header>
      <img class="logoSumare" style="width: 15%"
			src="<%=contextPath%>/resources/assets/img/logo-softsy.png"
			alt="Logo da Softsy" />
      <span>Cadastro de Reserva de Vaga</span>
    </header>

    <main class="container-section">
      <section class="mb-5 mt-5">
        <div class="card">
          <div class="card-body title">
            <i class="fa-regular fa-folder-open"></i>
            <span>Selecione umas das opções</span>
          </div>
        </div>
      </section>
      <section class="pt-4 card card-table px-5 py-3">
        <div class="row gap-5 mt-3 row-cards">
          <div class="mb-3 card-caminho">
            <div class="card-body">
              <h5 class="card-title">Nova Reserva</h5>
              <p class="card-text">Começe uma nova reserva de vaga!</p>
              <a href="dados-aluno" class="btn btn-primary">Clique aqui!</a>
            </div>
          </div>
          <div class="mb-3 card-caminho">
            <div class="card-body">
              <h5 class="card-title">Continue sua reserva</h5>
              <p class="card-text">Continue sua reserva de onde parou.</p>
              <a id="continueReserva" class="btn btn-primary">Clique aqui!</a>
            </div>
          </div>
        </div>
        <div
          class="col-md-12 text-center"
          style="display: none"
          id="containerContinuarRes"
        >
          <form action="">
            <div
              class="row text-center mt-3"
              style="
                display: flex;
                width: 100%;
                justify-content: center;
                align-items: center;
              "
            >
              <h5 class="card-title" style="width: auto">
                Continue sua reserva
              </h5>
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
              <div class="col-md-6 mt-4">
                <select
                  class="form-control"
                  aria-label="typeDigitado"
                  id="reserva"
                  name="tipo"
                >
                  <option selected disabled>Selecione uma opção</option>
                  <option value="1">CPF</option>
                  <option value="2">Número da reserva</option>
                  <option value="3">RG</option>
                  <option value="4">Certidão de Nascimento</option>
                  <option value="5">Certidão de Casamento</option>
                </select>
              </div>
              <div class="col-md-6 mt-4">
                <input
                  type="text"
                  id="typeDigitado"
                  autocomplete="off"
                  name="reserva"
                  class="form-control"
                  placeholder="Digite aqui"
                />
              </div>

              <div class="col-md-6 mt-4">
                <button type="submit" id="btn-submit" class="btn btn-primary">
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
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
      src="<%=contextPath%>/resources/assets/js/reservaVaga/selecionarCaminho.js"
    ></script>

    <script
      charset="UTF-8"
      src="<%=contextPath%>/resources/assets/js/comum.js"
    ></script>

    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"
    ></script>
  </body>
</html>
