import { get } from './api.js'

// Formato dos produtos documentado em docs/api.md
export function buscarProdutos() {
  return get('/products.json')
}
