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

    <!-- CSS -->
    <!-- Select 2 -->
    <link
      href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
      rel="stylesheet"
    />

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>

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
      src="https://kit.fontawesome.com/3ce21ff22c.js"
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
    <main class="py-4 container-res">
      <section class="mb-5">
        <div class="card">
          <div class="card-body title">
            <i class="fa-solid fa-circle-info" style="font-size: 24px"></i>
            <span>Dados Aluno</span>
          </div>
        </div>
      </section>

      <section id="containerInfoAluno" class="mb-5">
        <div class="card p-3">
          <div class="title mb-3">
            <i class="fa-solid fa-user-graduate" style="font-size: 24px"></i>
            <span>Informações do Aluno</span>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="obsAprovacao" class="form-label">Matricula: </label>
              <input
                type="text"
                id="matricula"
                autocomplete="off"
                name="obsAprovacao"
                class="form-control"
                disabled
              />
            </div>

            <div class="col-md-6">
              <label for="obsAprovacao" class="form-label">Nome: </label>
              <input
                type="text"
                id="nomeAluno"
                autocomplete="off"
                name="obsAprovacao"
                class="form-control"
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      <section
        class="p-5 card col-12 animate__animated animate__bounceInUp d-flex flex-column justify-content-center"
      >
        <nav>
          <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-dados-pessoais-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-dados-pessoais"
              type="button"
              role="tab"
              aria-controls="nav-dados-pessoais"
              aria-selected="true"
            >
              Dados Pessoais
            </button>
            <button
              class="nav-link"
              id="nav-acad-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-acad"
              type="button"
              role="tab"
              aria-controls="nav-acad"
              aria-selected="false"
            >
              Dados Acadêmicos
            </button>
            <button
              class="nav-link"
              id="nav-notas-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-notas"
              type="button"
              role="tab"
              aria-controls="nav-notas"
              aria-selected="false"
            >
              Notas e Faltas
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active mb-4"
            id="nav-dados-pessoais"
            role="tabpanel"
            aria-labelledby="nav-dados-pessoais-tab"
            tabindex="0"
          >
            <div class="d-flex align-items-center justify-content-between">
              <h2 id="tituloDados" class="mb-3">Dados Pessoais</h2>
              <button
                type="submit"
                id="editarCandidato"
                class="btn btn-primary d-flex gap-2 h-50 align-items-center edit-val"
                onclick="editarAluno()"
              >
                <i class="fa-solid fa-pen"></i> <span>Editar Aluno</span>
              </button>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="nomeCompleto" class="form-label"
                  >Nome Completo:<span class="red">*</span>
                </label>
                <input
                  type="text"
                  id="nomeCompleto"
                  required
                  autocomplete="off"
                  name="nomeCompleto"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label for="nomeSocial" class="form-label"
                  >Nome Social:<span class="red">*</span>
                </label>
                <input
                  type="text"
                  id="nomeSocial"
                  required
                  autocomplete="off"
                  name="nomeSocial"
                  class="form-control"
                />
              </div>
              <!-- <div class="col-md-6">
							<label for="tipoIngressoId" class="form-label">Tipo
								Ingresso: </label> <select class="form-select"
								aria-label="Tipo Ingresso" id="tipoIngressoId"
								name="tipoIngressoId">
								<option selected disabled>Selecione uma opção</option>
							</select>
						</div> -->
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="nomeMae" class="form-label">Nome da Mãe: </label>
                <input
                  type="text"
                  id="nomeMae"
                  autocomplete="off"
                  name="nomeMae"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label for="nomePai" class="form-label">Nome do Pai: </label>
                <input
                  type="text"
                  id="nomePai"
                  autocomplete="off"
                  name="nomePai"
                  class="form-control"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="sexo" class="form-label"
                  >Sexo:<span class="red">*</span></label
                >
                <div class="form-control">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sexo"
                      id="feminino"
                      value="F"
                      required
                    />
                    <label class="form-check-label" for="feminino"
                      >Feminino</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sexo"
                      id="masculino"
                      value="M"
                      required
                    />
                    <label class="form-check-label" for="masculino"
                      >Masculino</label
                    >
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <label for="dtNascimento" class="form-label"
                  >Data de Nascimento:<span class="red">*</span>
                </label>
                <input
                  type="date"
                  id="dtNascimento"
                  required
                  autocomplete="off"
                  name="dtNascimento"
                  class="form-control"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6" id="cardCpf">
                <label for="cpf" class="form-label">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  autocomplete="off"
                  data-mask="000.000.000-00"
                  name="cpf"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label for="racaId" class="form-label">Raça:</label>
                <select
                  class="form-select"
                  aria-label="Raça"
                  id="racaId"
                  name="racaId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="paisNascimentoId" class="form-label"
                  >País de Nascimento:</label
                >
                <select
                  class="form-select"
                  aria-label="País de Nascimento"
                  id="paisNascimentoId"
                  required
                  name="paisNascimentoId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="ufNascimentoId" class="form-label"
                  >UF de Nascimento:
                </label>
                <select
                  class="form-select"
                  aria-label="UF de Nascimento"
                  id="ufNascimentoId"
                  required
                  name="ufNascimentoId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div
                class="col-md-6"
                style="display: flex; flex-direction: column"
              >
                <label for="municipioNascimentoId" class="form-label"
                  >Município de Nascimento:
                </label>
                <select
                  class="form-select"
                  aria-label="Município de Nascimento"
                  id="municipioNascimentoId"
                  required
                  disabled
                  name="municipioNascimentoId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="nacionalidadeId" class="form-label"
                  >Nacionalidade:</label
                >
                <select
                  class="form-select"
                  aria-label="Município de Nascimento"
                  id="nacionalidadeId"
                  required
                  name="nacionalidadeId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="estadoCivil" class="form-label"
                  >Estado Civil:</label
                >
                <div class="form-control">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="estadoCivil"
                      id="estadoCivil"
                      value="so"
                    />
                    <label class="form-check-label" for="solteiro"
                      >Solteiro(a)</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="estadoCivil"
                      id="estadoCivil"
                      value="ca"
                    />
                    <label class="form-check-label" for="casado"
                      >Casado(a)</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="estadoCivil"
                      id="estadoCivil"
                      value="vi"
                    />
                    <label class="form-check-label" for="viuvo">Viúvo(a)</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="estadoCivil"
                      id="estadoCivil"
                      value="di"
                    />
                    <label class="form-check-label" for="divorciado"
                      >Divorciado(a)</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-5">
              <div class="col-md-6" style="display: none" id="rne">
                <label for="isRne" class="form-label"
                  >Possui Rne?<span class="red">*</span>
                </label>
                <div class="form-control card-form">
                  <label for="isRne">Sim</label>
                  <label class="switch">
                    <input type="checkbox" id="isRne" name="isRne" />
                    <span class="slider"></span>
                  </label>
                  <label for="isRne">Não</label>
                </div>
              </div>
            </div>

            <h2 id="tituloCasamento" class="mb-3">RG</h2>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="rgNumero" class="form-label">RG:</label>
                <input
                  type="text"
                  id="rgNumero"
                  autocomplete="off"
                  data-mask="00.000.000-0"
                  name="rgNumero"
                  class="form-control"
                />
              </div>

              <div class="col-md-6" id="rgDataExpedicaoDiv">
                <label for="rgDataExpedicao" class="form-label"
                  >RG Data de Expedição:</label
                >
                <input
                  type="date"
                  id="rgDataExpedicao"
                  autocomplete="off"
                  name="rgDataExpedicao"
                  class="form-control"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="rgOrgaoExpedidor" class="form-label"
                  >Órgão Expedidor-RG:</label
                >
                <input
                  type="text"
                  id="rgOrgaoExpedidor"
                  autocomplete="off"
                  name="rgOrgaoExpedidor"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label for="rgUfEmissorId" class="form-label"
                  >UF Emissor - RG:</label
                >
                <select
                  class="form-select"
                  aria-label="RG UF Emissor"
                  id="rgUfEmissorId"
                  name="rgUfEmissorId"
                >
                  <option selected disabled value="0">
                    Selecione uma opção
                  </option>
                </select>
              </div>
            </div>

            <div class="row mb-3 mt-3" id="boxQualPreencher">
              <label for="qualPreencher" class="form-label"
                >Qual deseja preencher?<span class="red">*</span>
              </label>
              <div class="form-control w-100 card-form qualPreencherSwitch">
                <label for="qualPreencher">Certidão de Nascimento</label>
                <label class="switch">
                  <input
                    type="checkbox"
                    id="qualPreencher"
                    name="qualPreencher"
                  />
                  <span class="slider slider-certidao"></span>
                </label>
                <label for="qualPreencher">Certidão de Casamento</label>
              </div>

              <div class="form-control qualPreencher">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="qualPreencherCheck"
                    id="isCertidaoNascimento"
                    value="s"
                  />
                  <label class="form-check-label" for="qualPreencherCheck"
                    >Certidão de Nascimento</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="qualPreencherCheck"
                    id="isCertidaoCasamento"
                    value="c"
                  />
                  <label class="form-check-label" for="qualPreencherCheck"
                    >Certidão de Casamento</label
                  >
                </div>
              </div>
            </div>

            <div id="certidaoNascimento" class="mt-5">
              <h2 id="titulonNascimento" class="mb-3">
                Certidão de Nascimento
              </h2>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="certidaoNascimentoNumero" class="form-label"
                    >Número:</label
                  >
                  <input
                    type="text"
                    id="certidaoNascimentoNumero"
                    autocomplete="off"
                    name="certidaoNascimentoNumero"
                    class="form-control"
                  />
                </div>

                <div class="col-md-6">
                  <label for="certidaoNascimentoCartorio" class="form-label"
                    >Cartório de registro:</label
                  >
                  <input
                    type="text"
                    id="certidaoNascimentoCartorio"
                    autocomplete="off"
                    name="certidaoNascimentoCartorio"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="certidaoNascimentoUfCartorioId" class="form-label"
                    >UF do cartório:</label
                  >
                  <select
                    class="form-select"
                    aria-label="Certidão de Nascimento UF Cartório"
                    id="certidaoNascimentoUfCartorioId"
                    name="certidaoNascimentoUfCartorioId"
                  >
                    <option selected value="0" disabled>
                      Selecione uma opção
                    </option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label
                    for="certidaoNascimentoCidadeCartorio"
                    class="form-label"
                    >Cidade do cartório:</label
                  >
                  <select
                    class="form-select"
                    aria-label="Certidão de Nascimento UF Cartório"
                    id="certidaoNascimentoMunicipioCartorioId"
                    name="certidaoNascimentoMunicipioCartorioId"
                    disabled
                  >
                    <option selected value="0" disabled>
                      Selecione uma opção
                    </option>
                  </select>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6" id="certidaoNascimentoDataEmissaoDiv">
                  <label for="certidaoNascimentoDataEmissao" class="form-label"
                    >Data de emissão:</label
                  >
                  <input
                    type="date"
                    id="certidaoNascimentoDataEmissao"
                    autocomplete="off"
                    name="certidaoNascimentoDataEmissao"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label for="certidaoNascimentoFolha" class="form-label"
                    >Folha:</label
                  >
                  <input
                    type="text"
                    id="certidaoNascimentoFolha"
                    autocomplete="off"
                    name="certidaoNascimentoFolha"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="certidaoNascimentoLivro" class="form-label"
                    >Livro:</label
                  >
                  <input
                    type="text"
                    id="certidaoNascimentoLivro"
                    autocomplete="off"
                    name="certidaoNascimentoLivro"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label for="certidaoNascimentoOrdem" class="form-label"
                    >Ordem:</label
                  >
                  <input
                    type="text"
                    id="certidaoNascimentoOrdem"
                    autocomplete="off"
                    name="certidaoNascimentoOrdem"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div id="certidaoCasamento" class="mt-5">
              <h2 id="tituloCasamento" class="mb-3">Certidão de Casamento</h2>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="certidaoCasamentoNumero" class="form-label"
                    >Número:</label
                  >
                  <input
                    type="text"
                    id="certidaoCasamentoNumero"
                    autocomplete="off"
                    name="certidaoCasamentoNumero"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label for="certidaoCasamentoCartorio" class="form-label"
                    >Cartório de registro:</label
                  >
                  <input
                    type="text"
                    id="certidaoCasamentoCartorio"
                    autocomplete="off"
                    name="certidaoCasamentoCartorio"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="certidaoCasamentoUfCartorioId" class="form-label"
                    >UF do cartório:</label
                  >
                  <select
                    class="form-select"
                    aria-label="Certidão de Casamento UF Cartório"
                    id="certidaoCasamentoUfCartorioId"
                    name="certidaoCasamentoUfCartorioId"
                  >
                    <option selected disabled value="">
                      Selecione uma opção
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label
                    for="certidaoCasamentoCidadeCartorioId"
                    class="form-label"
                    >UF do cartório:</label
                  >
                  <select
                    class="form-select"
                    aria-label="Certidão de Casamento UF Cartório"
                    id="certidaoCasamentoCidadeCartorioId"
                    name="certidaoCasamentoCidadeCartorioId"
                    disabled
                  >
                    <option selected disabled value="">
                      Selecione uma opção
                    </option>
                  </select>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="certidaoCasamentoFolha" class="form-label"
                    >Folha:</label
                  >
                  <input
                    type="text"
                    id="certidaoCasamentoFolha"
                    autocomplete="off"
                    name="certidaoCasamentoFolha"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label for="certidaoCasamentoLivro" class="form-label"
                    >Livro:</label
                  >
                  <input
                    type="text"
                    id="certidaoCasamentoLivro"
                    autocomplete="off"
                    name="certidaoCasamentoLivro"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="certidaoCasamentoOrdem" class="form-label"
                    >Ordem:</label
                  >
                  <input
                    type="text"
                    id="certidaoCasamentoOrdem"
                    autocomplete="off"
                    name="certidaoCasamentoOrdem"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6" id="certidaoCasamentoDataEmissaoDiv">
                  <label for="certidaoCasamentoDataEmissao" class="form-label"
                    >Data de emissão:</label
                  >
                  <input
                    type="date"
                    id="certidaoCasamentoDataEmissao"
                    autocomplete="off"
                    name="certidaoCasamentoDataEmissao"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade mb-5"
            id="nav-det-ficha"
            role="tabpanel"
            aria-labelledby="nav-det-ficha-tab"
            tabindex="0"
          >
            <div class="d-flex align-items-center justify-content-between">
              <h2 id="tituloDados" class="mb-3">Ficha</h2>
              <button
                type="submit"
                id="editarCandidato"
                class="btn btn-primary d-flex gap-2 h-50 align-items-center edit-val"
                onclick="showFichaMedica()"
              >
                <i class="fa-solid fa-pen"></i> <span>Editar</span>
              </button>
            </div>
          </div>

          <div
            class="tab-pane fade mb-5"
            id="nav-acad"
            role="tabpanel"
            aria-labelledby="nav-acad-tab"
            tabindex="0"
          >
            <div class="d-flex align-items-center justify-content-between">
              <h2 id="tituloDados" class="mb-3">Dados Acadêmicos</h2>
              <button
                type="submit"
                id="editarCandidato"
                class="btn btn-primary d-flex gap-2 h-50 align-items-center edit-val"
                onclick="editarAluno()"
              >
                <i class="fa-solid fa-pen"></i> <span>Editar Aluno</span>
              </button>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="escolaId" class="form-label">Escola: </label>
                <select
                  class="form-select"
                  aria-label="Escola"
                  id="escolaId"
                  name="escolaId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="cursoId" class="form-label">Curso: </label>
                <select
                  class="form-select"
                  aria-label="Curso"
                  id="cursoId"
                  name="cursoId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="turnoId" class="form-label">Turno: </label>
                <select
                  class="form-select"
                  aria-label="Turno"
                  id="turnoId"
                  name="turnoId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="serieId" class="form-label">Série: </label>
                <select
                  class="form-select"
                  aria-label="Serie"
                  id="serieId"
                  name="serieId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="situacaoAlunoId" class="form-label"
                  >Situação Aluno:
                </label>
                <select
                  class="form-select"
                  aria-label="Turno"
                  id="situacaoAlunoId"
                  name="situacaoAlunoId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="aluno" class="form-label">Matricula:</label>
                <input
                  type="text"
                  id="aluno"
                  autocomplete="off"
                  name="aluno"
                  class="form-control"
                />
              </div>
            </div>

            <div class="row mb-5">
              <div class="col-md-6">
                <label for="emailInterno" class="form-label"
                  >Email interno:</label
                >
                <input
                  type="text"
                  id="emailInterno"
                  autocomplete="off"
                  name="emailInterno"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label for="tipoIngressoId" class="form-label"
                  >Tipo Ingresso:
                </label>
                <select
                  class="form-select"
                  aria-label="Tipo Ingresso"
                  id="tipoIngressoId"
                  name="tipoIngressoId"
                >
                  <option selected disabled>Selecione uma opção</option>
                </select>
              </div>
            </div>

            <table
              class="table tabela-atos table-striped table-bordered mb-0 caption-top mx-auto"
            >
              <thead>
                <tr>
                  <th scope="col">Turma</th>
                  <th scope="col">Disciplina</th>
                  <th scope="col">Ano</th>
                  <th scope="col">Periodo</th>
                  <th scope="col">Status Matrícula</th>
                  <th scope="col">Tipo Matrícula</th>
                </tr>
              </thead>
              <tbody
                id="cola-tabela-matricula"
                class="table-group-divider"
              ></tbody>
            </table>
            <div id="pagination" class="mx-auto mt-auto"></div>
          </div>

          <div
            class="tab-pane fade"
            id="nav-notas"
            role="tabpanel"
            aria-labelledby="nav-notas-tab"
            tabindex="0"
          >
            <div class="d-flex align-items-center justify-content-between">
              <h2 id="tituloDados" class="mb-3">Notas e Faltas</h2>
            </div>
            <div class="container-table">
              <table
                class="table tableNot table-striped table-bordered mb-0 caption-top mx-auto"
              >
                <thead>
                  <tr>
                    <th scope="col">Disciplina</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Período Letivo</th>
                    <th scope="col">Descrição da Prova</th>
                    <th scope="col">Código</th>
                    <th scope="col">Data da Prova</th>
                    <th scope="col">Nota</th>
                    <th scope="col">Nota Máxima</th>
                    <th scope="col">Comparecimento</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody
                  id="cola-tabela-notas"
                  class="table-group-divider"
                ></tbody>
              </table>

              <div id="pagination" class="mx-auto mt-auto"></div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div
      class="modal fade"
      id="modalNota"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Alterar Nota
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <table
              class="table tableNot table-striped mb-0 mx-auto"
            >
              <thead>
                <tr>
                  <th scope="col">Prova</th>
                  <th scope="col">Nota</th>
                </tr>
              </thead>
              <tbody id="cola-tabela-editNota" class="table-group-divider"></tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              id="btnCloseEdit"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button
              type="button"
              class="btn btn-primary px-4"
              id="submitFormEdit"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>

    <script
      charset="UTF-8"
      src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"
    ></script>

    <script
      charset="UTF-8"
      src="https://code.jquery.com/jquery-3.7.1.js"
      integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
      crossorigin="anonymous"
    ></script>
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.inet/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
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
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script
      charset="UTF-8"
      src="<%=contextPath%>/resources/assets/js/comum.js"
    ></script>
    <script
      charset="UTF-8"
      src="<%=contextPath%>/resources/assets/js/matrizCurricular/dadosAluno.js"
    ></script>

    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"
    ></script>
  </body>
</html>
