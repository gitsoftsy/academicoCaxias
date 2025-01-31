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

    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote-lite.min.css"
      rel="stylesheet"
    />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
      rel="stylesheet"
    />
    <script
      charset="UTF-8"
      src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"
    ></script>

    <!-- Sweetalert -->
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
    ></script>
    <script charset="UTF-8" src="sweetalert2.all.min.js"></script>

    <!-- Select 2 -->
    <link
      href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
      rel="stylesheet"
    />

    <!-- CSS -->

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <!-- FontAwesome -->
    <script
      charset="UTF-8"
      src="
https://kit.fontawesome.com/3ce21ff22c.js"
      crossorigin="anonymous"
    ></script>
    <link
      rel="stylesheet"
      href="<%=contextPath%>/resources/assets/css/style.css?v=<%=(int) (Math.random() * 10000)%>"
    />
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
      <section class="mb-5">
        <div class="card">
          <div class="card-body title">
            <i class="fa-solid fa-graduation-cap fa-lg"></i>
            <span>Descrições do Curso</span>
          </div>
        </div>
      </section>
      <section class="pt-4 card px-5 py-3">
        <div
          class="mt-1"
          style="
            display: flex;
            align-items: center;
            justify-content: end;
          "
        >
          <button
            class="btn btn-primary px-4"
            data-bs-toggle="modal"
            onclick="limpaCampo()"
            data-bs-target="#newCadastro"
          >
            Novo
          </button>
        </div>
        
        <div id="tableMatriculas" class="container-table">
          <table
            class="table tableNot tabela-atos table-striped table-bordered mb-0 caption-top mx-auto"
          >
            <caption>
              Itens Cadastrados
            </caption>
            <thead>
              <tr>
                <th scope="col">Ordem</th>
                <th scope="col">Título</th>
                <th scope="col">Descrição</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="cola-tabela" class="table-group-divider"></tbody>
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
      </section>
    </main>

    <div
      class="modal fade"
      id="newCadastro"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="title-novo-ato">
              Cadastro de Descrição
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="formCadastro">
              <div class="mb-4">
                <label for="ordem" class="form-label"
                  >Ordem:<span class="red">*</span></label
                >
                <input
                  type="number"
                  class="form-control"
                  id="ordem"
                  required
                  aria-describedby="Ordem"
                  autocomplete="off"
                />
              </div>
              <div class="mb-4">
                <label for="titulo" class="form-label"
                  >Título:<span class="red">*</span></label
                >
                <div id="titulo" class="form-control"></div>
              </div>
              <div class="mb-4">
                <label for="descricao" class="form-label"
                  >Descrição:<span class="red">*</span></label
                >
                <div id="descricao" class="form-control"></div>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  class="btn btn-primary"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editItem"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="title-novo-ato">
              Alterar Descrição
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="formEdit">
              <div class="mb-4">
                <label for="ordemEdit" class="form-label"
                  >Ordem:<span class="red">*</span></label
                >
                <input
                  type="number"
                  class="form-control"
                  id="ordemEdit"
                  required
                  aria-describedby="Ordem"
                  autocomplete="off"
                />
              </div>
              <div class="mb-4">
                <label for="tituloEdit" class="form-label"
                  >Título:<span class="red">*</span></label
                >
                <div id="tituloEdit" class="form-control"></div>
              </div>
              <div class="mb-4">
                <label for="descricaoEdit" class="form-label"
                  >Descrição:<span class="red">*</span></label
                >
                <div id="descricaoEdit" class="form-control"></div>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  class="btn btn-primary"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

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
      src="<%=contextPath%>/resources/assets/js/matrizCurricular/cursoDescricao.js"
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote-lite.min.js"></script>
  </body>
</html>
