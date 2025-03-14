package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Alunos {
	
	@RequestMapping(value = { "pre-matricula" }, method = RequestMethod.GET)
	public String preMatricula(HttpSession session, Model model) throws Exception {
		
		return "alunos/alunos";
	}
	
	@RequestMapping(value = { "descricao-oferta-concurso" }, method = RequestMethod.GET)
	public String descricaoOfertaConcurso(HttpSession session, Model model) throws Exception {

		return "captacao/ofertaConcursoDescricao";
	}
	
	@RequestMapping(value = { "imagem-oferta-concurso" }, method = RequestMethod.GET)
	public String imagemOfertaConcurso(HttpSession session, Model model) throws Exception {

		return "captacao/ofertaConcursoImagens";
	}
	
	
	@RequestMapping(value = { "matricular-disciplina" }, method = RequestMethod.GET)
	public String matricularDisciplina(HttpSession session, Model model) throws Exception {
		
		return "matrizCurricular/matricularDisciplina";
	}
}
