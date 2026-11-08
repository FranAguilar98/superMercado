import { useEffect, useReducer } from 'react'
import { InventarioContext } from './InventarioContext'
import { estadoInicial, inventarioReducer } from './inventarioReducer'
import articulosLocales from '../data/articulosInventario.json'

// Datos desde DummyJSON (Custom Response); si falla, se usa el archivo local
const URL_API = 'https://dummyjson.com/c/bab1-b111-455a-b2f5'

function pedirArticulos(url) {
  return fetch(url).then((respuesta) => {
    if (!respuesta.ok) throw new Error('No se pudo cargar el inventario')
    return respuesta.json()
  })
}

// Deja todos los artículos con la misma forma, aunque falten algunos datos
const normalizar = (articulo) => ({
  id: articulo.id,
  nombre: articulo.nombre,
  marca: articulo.marca ?? 'Sin marca',
  tipo: articulo.tipo ?? articulo.categoria ?? 'Sin categoría',
  precio: Number(articulo.precio) || 0,
  stock: Number(articulo.stock) || 0,
  stockMinimo: articulo.stockMinimo,
  imagen: articulo.imagen,
})

// Provider: envuelve la app y entrega el estado a todos los componentes
export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(inventarioReducer, estadoInicial)

  // Al iniciar, carga el inventario (una sola vez)
  useEffect(() => {
    pedirArticulos(URL_API)
      .catch(() => articulosLocales) // respaldo: src/data/articulosInventario.json
      .then((datos) => dispatch({ type: 'CARGA_OK', articulos: datos.map(normalizar) }))
      .catch((err) => dispatch({ type: 'CARGA_ERROR', mensaje: err.message }))
  }, [])

  // Acciones que usan las páginas
  const agregarArticulo = (producto, cantidad) =>
    dispatch({ type: 'AGREGAR_ARTICULO', producto, cantidad })
  const eliminarArticulo = (id) => dispatch({ type: 'ELIMINAR_ARTICULO', id })
  const agregarAlCarrito = (id) => dispatch({ type: 'AGREGAR_AL_CARRITO', id })
  const quitarUnidad = (id) => dispatch({ type: 'QUITAR_UNIDAD', id })
  const quitarDelCarrito = (id) => dispatch({ type: 'QUITAR_DEL_CARRITO', id })
  const vaciarCarrito = () => dispatch({ type: 'VACIAR_CARRITO' })

  // Datos derivados del carrito: cada línea trae los datos completos del artículo
  const lineasCarrito = estado.carrito.map((linea) => ({
    ...estado.articulos.find((a) => a.id === linea.id),
    cantidad: linea.cantidad,
  }))
  const totalUnidades = lineasCarrito.reduce((suma, l) => suma + l.cantidad, 0)
  const totalPrecio = lineasCarrito.reduce((suma, l) => suma + l.cantidad * l.precio, 0)

  const valor = {
    articulos: estado.articulos,
    carrito: estado.carrito,
    cargando: estado.cargando,
    error: estado.error,
    lineasCarrito,
    totalUnidades,
    totalPrecio,
    agregarArticulo,
    eliminarArticulo,
    agregarAlCarrito,
    quitarUnidad,
    quitarDelCarrito,
    vaciarCarrito,
  }

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>
}
