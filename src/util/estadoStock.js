// Si un artículo no define stock mínimo, se usa este valor
export const UMBRAL_STOCK_BAJO = 10

// Devuelve el texto y la clave de estado según el stock disponible
export function estadoStock(stock, stockMinimo = UMBRAL_STOCK_BAJO) {
  if (stock === 0) return { texto: 'Sin stock', clave: 'critico' }
  if (stock < stockMinimo) return { texto: 'Stock bajo', clave: 'alerta' }
  return { texto: 'Disponible', clave: 'ok' }
}
