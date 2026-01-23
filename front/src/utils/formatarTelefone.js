function formatarEChecarCelularBR(telefone) {
  const apenasDigitos = telefone.replace(/\D/g, '')
  
  const regexValidacao = /^[1-9]{2}9[0-9]{8}$/;
  const valido = regexValidacao.test(apenasDigitos)
  
  return {
    numero: valido ? apenasDigitos : null,
  }
}

export default formatarEChecarCelularBR