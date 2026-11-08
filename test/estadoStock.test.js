import { describe, it, expect } from 'vitest'
import { estadoStock } from '../src/util/estadoStock'
import { formatearPrecio } from '../src/util/formato'

describe('estadoStock', () => {
  it('sin stock cuando es 0', () => {
    expect(estadoStock(0, 10).clave).toBe('critico')
  })
  it('stock bajo cuando está bajo el mínimo', () => {
    expect(estadoStock(5, 10).clave).toBe('alerta')
  })
  it('disponible cuando alcanza el mínimo', () => {
    expect(estadoStock(10, 10).clave).toBe('ok')
  })
  it('usa un mínimo por defecto si no se indica', () => {
    expect(estadoStock(3).clave).toBe('alerta')
  })
})

describe('formatearPrecio', () => {
  it('usa el formato chileno', () => {
    expect(formatearPrecio(1590)).toBe('$1.590')
  })
})
