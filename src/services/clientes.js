import { get } from './api.js'

export function buscarClientes() {
  return get('/customers.json')
}
