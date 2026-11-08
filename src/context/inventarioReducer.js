// Reducer del inventario: concentra TODAS las reglas que cambian el estado.
// El estado tiene dos listas relacionadas:
//   articulos: inventario general  [{ id, nombre, marca, tipo, precio, stock, ... }]
//   carrito:   líneas del carrito  [{ id, cantidad }]  (el id es el del artículo)
// Cada acción actualiza ambas listas juntas, así el stock siempre es coherente.

export const estadoInicial = {
  articulos: [],
  carrito: [],
  cargando: true,
  error: null,
}

// Devuelve el inventario sumando "cantidad" unidades de stock al artículo "id"
const sumarStock = (articulos, id, cantidad) =>
  articulos.map((a) => (a.id === id ? { ...a, stock: a.stock + cantidad } : a))

export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case 'CARGA_OK':
      return { ...estado, articulos: accion.articulos, cargando: false, error: null }

    case 'CARGA_ERROR':
      return { ...estado, cargando: false, error: accion.mensaje }

    // Agrega un producto del catálogo: si ya está en el inventario suma al stock,
    // y si no, lo crea con la cantidad indicada
    case 'AGREGAR_ARTICULO': {
      const { producto, cantidad } = accion
      const yaExiste = estado.articulos.some((a) => a.id === producto.id)
      const articulos = yaExiste
        ? sumarStock(estado.articulos, producto.id, cantidad)
        : [...estado.articulos, { ...producto, stock: cantidad }]
      return { ...estado, articulos }
    }

    case 'ELIMINAR_ARTICULO':
      return {
        ...estado,
        articulos: estado.articulos.filter((a) => a.id !== accion.id),
        carrito: estado.carrito.filter((linea) => linea.id !== accion.id),
      }

    // Agregar al carrito (o aumentar la cantidad): resta 1 al stock
    case 'AGREGAR_AL_CARRITO': {
      const articulo = estado.articulos.find((a) => a.id === accion.id)
      if (!articulo || articulo.stock <= 0) return estado // no hay stock

      const enCarrito = estado.carrito.some((linea) => linea.id === accion.id)
      const carrito = enCarrito
        ? estado.carrito.map((l) => (l.id === accion.id ? { ...l, cantidad: l.cantidad + 1 } : l))
        : [...estado.carrito, { id: accion.id, cantidad: 1 }]

      return { ...estado, carrito, articulos: sumarStock(estado.articulos, accion.id, -1) }
    }

    // Disminuir la cantidad: devuelve 1 al stock (si llega a 0, sale del carrito)
    case 'QUITAR_UNIDAD': {
      const linea = estado.carrito.find((l) => l.id === accion.id)
      if (!linea) return estado

      const carrito =
        linea.cantidad <= 1
          ? estado.carrito.filter((l) => l.id !== accion.id)
          : estado.carrito.map((l) => (l.id === accion.id ? { ...l, cantidad: l.cantidad - 1 } : l))

      return { ...estado, carrito, articulos: sumarStock(estado.articulos, accion.id, 1) }
    }

    // Quitar el artículo completo: devuelve todas sus unidades al stock
    case 'QUITAR_DEL_CARRITO': {
      const linea = estado.carrito.find((l) => l.id === accion.id)
      if (!linea) return estado

      return {
        ...estado,
        carrito: estado.carrito.filter((l) => l.id !== accion.id),
        articulos: sumarStock(estado.articulos, accion.id, linea.cantidad),
      }
    }

    // Vaciar el carrito: devuelve todo al inventario
    case 'VACIAR_CARRITO': {
      const articulos = estado.carrito.reduce(
        (lista, linea) => sumarStock(lista, linea.id, linea.cantidad),
        estado.articulos,
      )
      return { ...estado, carrito: [], articulos }
    }

    default:
      return estado
  }
}
