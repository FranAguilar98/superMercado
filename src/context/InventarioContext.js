import { createContext } from 'react'

// Contexto global del inventario y el carrito.
// El Provider está en InventarioProvider.jsx y el hook para usarlo en hooks/useInventario.js
export const InventarioContext = createContext(null)
