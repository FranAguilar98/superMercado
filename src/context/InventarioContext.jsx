import { createContext, useContext, useState } from 'react'

// Contexto global: guarda la lista de artículos del inventario
const InventarioContext = createContext(null)

// Artículos iniciales (nombre, marca y tipo de producto)
const ARTICULOS_INICIALES = [
  { id: 1, nombre: 'Arroz grado 1 (1 kg)', marca: 'Tucapel', tipo: 'Despensa' },
  { id: 2, nombre: 'Fideos espagueti (400 g)', marca: 'Carozzi', tipo: 'Despensa' },
  { id: 3, nombre: 'Aceite de maravilla (1 L)', marca: 'Chef', tipo: 'Despensa' },
  { id: 4, nombre: 'Leche entera (1 L)', marca: 'Soprole', tipo: 'Lácteos' },
  { id: 5, nombre: 'Bebida cola (2 L)', marca: 'Coca-Cola', tipo: 'Bebidas' },
]

// Provider: envuelve la app y entrega el estado a todos los componentes
export function InventarioProvider({ children }) {
  const [articulos, setArticulos] = useState(ARTICULOS_INICIALES)

  // Agrega un artículo nuevo al final de la lista
  const agregarArticulo = (articulo) => {
    setArticulos((actuales) => [...actuales, { ...articulo, id: Date.now() }])
  }

  // Quita de la lista el artículo que tenga ese id
  const eliminarArticulo = (id) => {
    setArticulos((actuales) => actuales.filter((articulo) => articulo.id !== id))
  }

  return (
    <InventarioContext.Provider value={{ articulos, agregarArticulo, eliminarArticulo }}>
      {children}
    </InventarioContext.Provider>
  )
}

// Hook para usar el estado global desde cualquier página
export function useInventario() {
  const contexto = useContext(InventarioContext)
  if (!contexto) {
    throw new Error('useInventario debe usarse dentro de InventarioProvider')
  }
  return contexto
}