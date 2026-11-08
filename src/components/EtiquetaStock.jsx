import { estadoStock } from '../util/estadoStock'

// Color de la etiqueta según el estado del stock
const ESTILOS = {
  ok: 'tw:bg-lila-claro tw:text-primario',
  alerta: 'tw:bg-acento tw:text-fuchsia-800',
  critico: 'tw:bg-primario-oscuro tw:text-white',
}

// Etiqueta "Disponible" / "Stock bajo" / "Sin stock"
function EtiquetaStock({ stock, stockMinimo }) {
  const { texto, clave } = estadoStock(stock, stockMinimo)

  return (
    <span className={`tw:w-fit tw:rounded-full tw:px-3 tw:py-1 tw:text-sm tw:font-semibold ${ESTILOS[clave]}`}>
      {texto}
    </span>
  )
}

export default EtiquetaStock
