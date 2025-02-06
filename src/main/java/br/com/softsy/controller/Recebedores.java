package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class Recebedores {
	
	@RequestMapping(value = { "parceiros" }, method = RequestMethod.GET)
	public String parceiros(HttpSession session, Model model) throws Exception {
		
		return "recebedores/parceiros";
	}
	
	@RequestMapping(value = { "novo-parceiro" }, method = RequestMethod.GET)
	public String novoParceiro(HttpSession session, Model model) throws Exception {
		
		return "recebedores/novoParceiroPagarme";
	}

}
