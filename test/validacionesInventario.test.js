import { describe, it, expect } from 'vitest'
import {
  validarNombrePersona,
  validarCorreo,
  validarCantidad,
  validarProducto,
  validarMensaje,
} from '../src/util/validacionesInventario'

describe('validaciones', () => {
  it('nombre de persona: solo letras y espacios', () => {
    expect(validarNombrePersona('María José')).toBe('')
    expect(validarNombrePersona('Fran123')).not.toBe('')
    expect(validarNombrePersona('   ')).not.toBe('')
  })

  it('correo: exige formato válido', () => {
    expect(validarCorreo('nombre@correo.cl')).toBe('')
    expect(validarCorreo('nombre@correo')).not.toBe('')
    expect(validarCorreo('')).not.toBe('')
  })

  it('cantidad: entero mayor que 0', () => {
    expect(validarCantidad('20')).toBe('')
    expect(validarCantidad('0')).not.toBe('')
    expect(validarCantidad('-5')).not.toBe('')
    expect(validarCantidad('12.5')).not.toBe('')
    expect(validarCantidad('')).not.toBe('')
  })

  it('producto: debe seleccionarse uno', () => {
    expect(validarProducto('')).not.toBe('')
    expect(validarProducto('leche')).toBe('')
  })

  it('mensaje: mínimo 10 caracteres', () => {
    expect(validarMensaje('corto')).not.toBe('')
    expect(validarMensaje('Un mensaje suficientemente largo')).toBe('')
  })
})
