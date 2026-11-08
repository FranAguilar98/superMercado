import { TIPOS, TODAS } from '../data/tiposProducto'

// Devuelve una lista NUEVA con los artículos de la categoría indicada.
// No modifica la lista original del inventario.
export function filtrarPorCategoria(articulos, categoria) {
  if (categoria === TODAS) return articulos
  return articulos.filter((articulo) => articulo.tipo === categoria)
}

// Categorías para el selector: las predefinidas más cualquier otra que exista en el inventario
export function obtenerCategorias(articulos) {
  return [...new Set([...TIPOS, ...articulos.map((articulo) => articulo.tipo)])]
}
