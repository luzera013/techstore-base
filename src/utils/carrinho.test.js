import test from 'node:test'
import assert from 'node:assert/strict'

import { calcularTotal } from './carrinho.js'
import { formatarPreco, normalizarPreco } from './formatarPreco.js'

test('calcularTotal soma preços em formato numérico e monetário', () => {
    const total = calcularTotal([
        { price: 'R$ 189,90' },
        { price: 89.9 },
        { price: '49,90' },
    ])

    assert.equal(total, 329.7)
})

test('normalizarPreco corrige preços em centavos e formatados com milhares', () => {
    assert.equal(normalizarPreco(18990), 189.9)
    assert.equal(normalizarPreco('R$ 5.990,00'), 59.9)
    assert.equal(normalizarPreco('R$ 6.990,00'), 69.9)
    assert.equal(normalizarPreco('R$ 189,00'), 189)
})

test('formatarPreco não devolve NaN para valores em moeda brasileira', () => {
    const valor = formatarPreco('R$ 189,90')

    assert.ok(valor.includes('189,90'))
    assert.ok(!valor.includes('NaN'))
})
