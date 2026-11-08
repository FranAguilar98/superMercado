import { describe, it, expect } from 'vitest'
import { inventarioReducer } from '../src/context/inventarioReducer'

// Estado de ejemplo: 2 artículos y un carrito vacío
const crearEstado = () => ({
  articulos: [
    { id: 'a', nombre: 'Arroz', marca: 'Tucapel', tipo: 'Despensa', precio: 1000, stock: 3 },
    { id: 'b', nombre: 'Leche', marca: 'Soprole', tipo: 'Lácteos', precio: 1200, stock: 0 },
  ],
  carrito: [],
  cargando: false,
  error: null,
})

const stockDe = (estado, id) => estado.articulos.find((a) => a.id === id).stock
const cantidadDe = (estado, id) => estado.carrito.find((l) => l.id === id)?.cantidad

describe('inventarioReducer', () => {
  it('agrega al inventario un producto nuevo con la cantidad indicada', () => {
    const leche = { id: 'leche', nombre: 'Leche', marca: 'Soprole', tipo: 'Lácteos', precio: 1190 }
    const estado = inventarioReducer(crearEstado(), { type: 'AGREGAR_ARTICULO', producto: leche, cantidad: 10 })
    expect(estado.articulos).toHaveLength(3)
    expect(stockDe(estado, 'leche')).toBe(10)
  })

  it('si el producto ya existe, suma la cantidad al stock sin duplicarlo', () => {
    const arroz = { id: 'a', nombre: 'Arroz' }
    const estado = inventarioReducer(crearEstado(), { type: 'AGREGAR_ARTICULO', producto: arroz, cantidad: 7 })
    expect(estado.articulos).toHaveLength(2)
    expect(stockDe(estado, 'a')).toBe(10)
  })

  it('agregar al carrito resta 1 al stock y suma 1 a la cantidad', () => {
    let estado = inventarioReducer(crearEstado(), { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    estado = inventarioReducer(estado, { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    expect(stockDe(estado, 'a')).toBe(1)
    expect(cantidadDe(estado, 'a')).toBe(2)
  })

  it('no agrega al carrito un artículo sin stock', () => {
    const inicial = crearEstado()
    const estado = inventarioReducer(inicial, { type: 'AGREGAR_AL_CARRITO', id: 'b' })
    expect(estado).toBe(inicial)
    expect(estado.carrito).toHaveLength(0)
  })

  it('no permite superar el stock disponible', () => {
    let estado = crearEstado()
    for (let i = 0; i < 10; i++) {
      estado = inventarioReducer(estado, { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    }
    expect(cantidadDe(estado, 'a')).toBe(3)
    expect(stockDe(estado, 'a')).toBe(0)
  })

  it('quitar una unidad devuelve 1 al stock y, en la última, saca la línea del carrito', () => {
    let estado = inventarioReducer(crearEstado(), { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    estado = inventarioReducer(estado, { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    estado = inventarioReducer(estado, { type: 'QUITAR_UNIDAD', id: 'a' })
    expect(cantidadDe(estado, 'a')).toBe(1)
    expect(stockDe(estado, 'a')).toBe(2)

    estado = inventarioReducer(estado, { type: 'QUITAR_UNIDAD', id: 'a' })
    expect(estado.carrito).toHaveLength(0)
    expect(stockDe(estado, 'a')).toBe(3)
  })

  it('quitar del carrito devuelve todas las unidades al stock', () => {
    let estado = crearEstado()
    for (let i = 0; i < 3; i++) {
      estado = inventarioReducer(estado, { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    }
    estado = inventarioReducer(estado, { type: 'QUITAR_DEL_CARRITO', id: 'a' })
    expect(stockDe(estado, 'a')).toBe(3)
    expect(estado.carrito).toHaveLength(0)
  })

  it('vaciar el carrito devuelve todo al inventario', () => {
    let estado = crearEstado()
    estado = inventarioReducer(estado, { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    estado = inventarioReducer(estado, { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    estado = inventarioReducer(estado, { type: 'VACIAR_CARRITO' })
    expect(stockDe(estado, 'a')).toBe(3)
    expect(estado.carrito).toEqual([])
  })

  it('eliminar un artículo también lo saca del carrito', () => {
    let estado = inventarioReducer(crearEstado(), { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    estado = inventarioReducer(estado, { type: 'ELIMINAR_ARTICULO', id: 'a' })
    expect(estado.articulos.map((a) => a.id)).toEqual(['b'])
    expect(estado.carrito).toHaveLength(0)
  })

  it('no modifica el estado anterior (inmutabilidad)', () => {
    const inicial = crearEstado()
    inventarioReducer(inicial, { type: 'AGREGAR_AL_CARRITO', id: 'a' })
    expect(stockDe(inicial, 'a')).toBe(3)
    expect(inicial.carrito).toHaveLength(0)
  })
})
