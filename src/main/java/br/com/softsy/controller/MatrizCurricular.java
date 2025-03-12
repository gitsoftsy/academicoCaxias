package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

//import br.com.softsy.model.UsuarioInternoVO;
//import br.com.softsy.utils.LoginUtils;

@Controller
public class MatrizCurricular {

	@RequestMapping(value = { "area-conhecimento" }, method = RequestMethod.GET)
	public String areaConhecimento(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/areaConhecimento";
	}

	@RequestMapping(value = { "disciplinas" }, method = RequestMethod.GET)
	public String disciplinas(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/disciplinas";
	}

	@RequestMapping(value = { "nova-disciplina" }, method = RequestMethod.GET)
	public String novaDisciplina(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/novaDisciplina";
	}

	@RequestMapping(value = { "editar-disciplina" }, method = RequestMethod.GET)
	public String editarDisciplina(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/editarDisciplina";
	}

	@RequestMapping(value = { "curso" }, method = RequestMethod.GET)
	public String curso(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/cursos";
	}

	@RequestMapping(value = { "curso-descricao" }, method = RequestMethod.GET)
	public String cursoDescricao(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/cursoDescricao";
	}

	@RequestMapping(value = { "novo-curso" }, method = RequestMethod.GET)
	public String novoCurso(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/novoCurso";
	}

	@RequestMapping(value = { "editar-curso" }, method = RequestMethod.GET)
	public String editarCurso(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/editarCurso";
	}

	@RequestMapping(value = { "curriculo" }, method = RequestMethod.GET)
	public String curriculo(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/curriculo";
	}

	@RequestMapping(value = { "novo-curriculo" }, method = RequestMethod.GET)
	public String novoCurriculo(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/novoCurriculo";
	}

	@RequestMapping(value = { "serie-matriz-curricular" }, method = RequestMethod.GET)
	public String serieMatrizCurricular(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/serie";
	}

	@RequestMapping(value = { "turma" }, method = RequestMethod.GET)
	public String turmaMatrizCurricular(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/turma";
	}

	@RequestMapping(value = { "criterio-avaliacao" }, method = RequestMethod.GET)
	public String criterioAvaliacao(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/criterioAvaliacao";
	}

	@RequestMapping(value = { "novo-criterio-avaliacao" }, method = RequestMethod.GET)
	public String novoCriterioAvaliacao(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/novoCriterioAvaliacao";
	}

	@RequestMapping(value = { "situacao-aluno" }, method = RequestMethod.GET)
	public String situacaoAluno(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/situacaoAluno";
	}

	@RequestMapping(value = { "alunos" }, method = RequestMethod.GET)
	public String alunos(HttpSession session, Model model) throws Exception {

		return "alunos/alunos";
	}

	@RequestMapping(value = { "consulta-aluno" }, method = RequestMethod.GET)
	public String dadosAlunoCandidato(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/dadosAluno";
	}

	@RequestMapping(value = { "novo-aluno" }, method = RequestMethod.GET)
	public String novoAluno(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/novoAluno";
	}

	@RequestMapping(value = { "cadastro-turma" }, method = RequestMethod.GET)
	public String novaTurmaMatrizCurricular(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/novaTurma";
	}

	@RequestMapping(value = { "grade-curricular" }, method = RequestMethod.GET)
	public String gradeCurricularMatrizCurricular(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/gradeCurricular";
	}

	@RequestMapping(value = { "professores" }, method = RequestMethod.GET)
	public String professores(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/professores";
	}

	@RequestMapping(value = { "matricula" }, method = RequestMethod.GET)
	public String matricula(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/matricula";
	}

	@RequestMapping(value = { "pre-matricula-disciplina" }, method = RequestMethod.GET)
	public String preMatriculaDisciplina(HttpSession session, Model model) throws Exception {

		return "alunos/preMatriculaDisciplina";
	}

	@RequestMapping(value = { "nova-pre-matricula" }, method = RequestMethod.GET)
	public String preMatriculaCadastro(HttpSession session, Model model) throws Exception {

		return "alunos/alunos";
	}

	@RequestMapping(value = { "disciplina-turma" }, method = RequestMethod.GET)
	public String DisciplinaTurma(HttpSession session, Model model) throws Exception {

		return "matrizCurricular/disciplinaTurma";
	}
}
