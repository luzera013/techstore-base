export function normalizarPreco(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return 0
  }

  if (typeof valor === 'number' && Number.isFinite(valor)) {
    const numero = Math.abs(valor)

    if (Number.isInteger(valor) && numero >= 1000 && numero <= 1000000) {
      return valor / 100
    }

    return valor
  }

  let texto = String(valor)
    .trim()
    .replace(/\s+/g, '')
    .replace(/^R\$/i, '')

  if (!texto) {
    return 0
  }

  const textoSemSimbolos = texto.replace(/[^\d,.-]/g, '')

  if (!textoSemSimbolos) {
    return 0
  }

  if (textoSemSimbolos.includes(',') && textoSemSimbolos.includes('.')) {
    texto = textoSemSimbolos.replace(/\./g, '').replace(',', '.')
  } else if (textoSemSimbolos.includes(',')) {
    texto = textoSemSimbolos.replace(',', '.')
  } else if (/^\d+\.\d{3}$/.test(textoSemSimbolos) && textoSemSimbolos.split('.')[1].length === 3) {
    texto = textoSemSimbolos.replace(/\./g, '')
  } else {
    texto = textoSemSimbolos
  }

  const numero = Number.parseFloat(texto)

  if (!Number.isFinite(numero)) {
    return 0
  }

  const absoluto = Math.abs(numero)
  if (Number.isInteger(numero) && absoluto >= 1000 && absoluto <= 1000000) {
    return numero / 100
  }

  return numero
}

export function normalizarProduto(produto) {
  if (!produto || typeof produto !== 'object') {
    return produto
  }

  const precoNormalizado = normalizarPreco(produto.price)
  const precoOriginalNormalizado = produto.precoOriginal !== undefined
    ? normalizarPreco(produto.precoOriginal)
    : undefined

  return {
    ...produto,
    price: precoNormalizado === 0 && precoOriginalNormalizado > 0 ? precoOriginalNormalizado : precoNormalizado,
    ...(precoOriginalNormalizado !== undefined && {
      precoOriginal: precoOriginalNormalizado,
    }),
  }
}

export function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(normalizarPreco(valor))
}
