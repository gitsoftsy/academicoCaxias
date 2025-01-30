package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Cursos {

	/*
	 * @RequestMapping(value = { "cursos" }, method = RequestMethod.GET) public
	 * String cursos(HttpSession session, Model model) throws Exception {
	 * 
	 * return "cursos/cursos"; }
	 */

	@RequestMapping(value = { "cursos-serie" }, method = RequestMethod.GET)
	public String cursosSerie(HttpSession session, Model model) throws Exception {

		return "cursos/serie";
	}

	@RequestMapping(value = { "cursos-grade-curricular" }, method = RequestMethod.GET)
	public String gradeCurricular(HttpSession session, Model model) throws Exception {

		return "cursos/gradeCurricular";
	}

	@RequestMapping(value = { "curriculos" }, method = RequestMethod.GET)
	public String curriculos(HttpSession session, Model model) throws Exception {

		return "cursos/curriculos";
	}

	@RequestMapping(value = { "curso-imagem" }, method = RequestMethod.GET)
	public String cursoImagens(HttpSession session, Model model) throws Exception {

		return "cursos/cursoImagens";
	}

}
