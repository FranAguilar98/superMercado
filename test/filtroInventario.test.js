import { describe, it, expect } from 'vitest'
import { filtrarPorCategoria, obtenerCategorias } from '../src/util/filtroInventario'
import { TODAS } from '../src/data/tiposProducto'

const articulos = [
  { id: 1, nombre: 'Arroz', tipo: 'Despensa' },
  { id: 2, nombre: 'Fideos', tipo: 'Despensa' },
  { id: 3, nombre: 'Leche', tipo: 'Lácteos' },
]

describe('filtroInventario', () => {
  it('filtra por la categoría seleccionada', () => {
    const resultado = filtrarPorCategoria(articulos, 'Despensa')
    expect(resultado.map((a) => a.nombre)).toEqual(['Arroz', 'Fideos'])
  })

  it('con "Todas" devuelve todos los artículos', () => {
    expect(filtrarPorCategoria(articulos, TODAS)).toHaveLength(3)
  })

  it('devuelve lista vacía si no hay artículos en la categoría', () => {
    expect(filtrarPorCategoria(articulos, 'Carnes')).toEqual([])
  })

  it('no modifica la lista original', () => {
    const copia = [...articulos]
    filtrarPorCategoria(articulos, 'Lácteos')
    expect(articulos).toEqual(copia)
  })

  it('las categorías incluyen las predefinidas y las que existan en el inventario', () => {
    const categorias = obtenerCategorias([...articulos, { id: 4, tipo: 'Panadería' }])
    expect(categorias).toContain('Despensa')
    expect(categorias).toContain('Panadería')
    expect(new Set(categorias).size).toBe(categorias.length)
  })
})
