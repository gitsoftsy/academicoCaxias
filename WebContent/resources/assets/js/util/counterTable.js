$("caption").text(`Itens Cadastrados Total: ${dadosOriginais ? dadosOriginais.length : 0}`)

setInterval(() => {
	$("caption").text(`Itens Cadastrados Total: ${dadosOriginais ? dadosOriginais.length : 0}`)
}, 2000)
