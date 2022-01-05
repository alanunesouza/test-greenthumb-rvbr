function currencyPtBr(value) {
  return new Intl.NumberFormat('pt-BR', {currency: 'BRL', style: 'currency'}).format(value)
}

export default currencyPtBr;