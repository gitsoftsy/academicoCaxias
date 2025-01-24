package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Turmas {

	@RequestMapping(value = { "turmas-lancar-notas" }, method = RequestMethod.GET)
	public String turmasLancarNotas(HttpSession session, Model model) throws Exception {

		return "turmas/lancarNotas";
	}

	@RequestMapping(value = { "lancar-notas-aluno" }, method = RequestMethod.GET)
	public String lancarNotasAluno(HttpSession session, Model model) throws Exception {

		return "turmas/lancarNotasAlunos";
	}
	
	@RequestMapping(value = { "avaliacoes" }, method = RequestMethod.GET)
	public String avaliacoesTurma(HttpSession session, Model model) throws Exception {

		return "turmas/avaliacoesTurma";
	}
	
	@RequestMapping(value = { "turmas-editar-turma" }, method = RequestMethod.GET)
	public String turmasEditarTurma(HttpSession session, Model model) throws Exception {
		
		return "turmas/editarTurma";
	}
	
	@RequestMapping(value = { "turmas-nova-turma" }, method = RequestMethod.GET)
	public String turmasNovaTurma(HttpSession session, Model model) throws Exception {
		
		return "turmas/novaTurma";
	}
	
	@RequestMapping(value = { "escolas-turmas" }, method = RequestMethod.GET)
	public String turmas(HttpSession session, Model model) throws Exception {
		
		return "turmas/turmas";
	}
	
	@RequestMapping(value = { "turmas-areas-conhecimento" }, method = RequestMethod.GET)
	public String turmasAreaConhecimento(HttpSession session, Model model) throws Exception {
		
		return "turmas/areaConhecimento";
	}
	
	@RequestMapping(value = { "turmas-componentes-curriculares" }, method = RequestMethod.GET)
	public String turmasComponentesCurriculares(HttpSession session, Model model) throws Exception {
		
		return "turmas/componentesCurriculares";
	}
	
	@RequestMapping(value = { "turma-dia-semana" }, method = RequestMethod.GET)
	public String turmasDiasSemana(HttpSession session, Model model) throws Exception {
		
		return "turmas/diasSemana";
	}

	@RequestMapping(value = { "turmas-professores" }, method = RequestMethod.GET)
	public String turmasProfessores(HttpSession session, Model model) throws Exception {
		
		return "turmas/professores";
	}

	@RequestMapping(value = { "turmas-disciplina" }, method = RequestMethod.GET)
	public String turmasDisciplina(HttpSession session, Model model) throws Exception {
		
		return "turmas/disciplina";
	}

	@RequestMapping(value = { "turmas-nova-disciplina" }, method = RequestMethod.GET)
	public String turmasNovaDisciplina(HttpSession session, Model model) throws Exception {
		
		return "turmas/novaDisciplina";
	}

	@RequestMapping(value = { "turmas-editar-disciplina" }, method = RequestMethod.GET)
	public String turmasEditarDisciplina(HttpSession session, Model model) throws Exception {
		
		return "turmas/editarDisciplina";
	}
	
	@RequestMapping(value = { "turmas-disciplina-professor" }, method = RequestMethod.GET)
	public String turmaDisciplinaProfessor(HttpSession session, Model model) throws Exception {
		
		return "turmas/turmaDisciplinaProfessor";
	}
	
	@RequestMapping(value = { "aviso" }, method = RequestMethod.GET)
	public String avisos(HttpSession session, Model model) throws Exception {
		
		return "turmas/avisos";
	}
	
	@RequestMapping(value = { "avisos" }, method = RequestMethod.GET)
	public String listarAvisos(HttpSession session, Model model) throws Exception {
		
		return "avisos/listarAvisos";
	}
	
	@RequestMapping(value = { "destinatarios" }, method = RequestMethod.GET)
	public String listarDestinatarios(HttpSession session, Model model) throws Exception {
		
		return "avisos/listarDestinatarios";
	}
	
	@RequestMapping(value = { "novo-aviso-aluno" }, method = RequestMethod.GET)
	public String novoAvisoAluno(HttpSession session, Model model) throws Exception {
		
		return "avisos/novoAvisoAluno";
	}
	
	@RequestMapping(value = { "turma-matriculas" }, method = RequestMethod.GET)
	public String turmaMatriculas(HttpSession session, Model model) throws Exception {

		return "turmas/turmaMatricula";
	}
	
}
