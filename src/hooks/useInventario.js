import { useContext } from 'react'
import { InventarioContext } from '../context/InventarioContext'

// Hook para usar el estado global desde cualquier página o componente
export function useInventario() {
  const contexto = useContext(InventarioContext)
  if (!contexto) {
    throw new Error('useInventario debe usarse dentro de InventarioProvider')
  }
  return contexto
}
