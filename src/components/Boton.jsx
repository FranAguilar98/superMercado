import { Link } from 'react-router-dom'

// Clases comunes y variantes de color / tamaño
const BASE =
  'tw:inline-block tw:cursor-pointer tw:rounded-lg tw:font-semibold tw:transition-colors tw:focus:outline-none tw:focus:ring-4 tw:focus:ring-secundario/40 tw:disabled:cursor-not-allowed tw:disabled:opacity-50'

const VARIANTES = {
  primario: 'tw:bg-primario tw:text-white tw:hover:bg-secundario',
  suave: 'tw:bg-lila-claro tw:text-primario tw:hover:bg-lila',
  peligro: 'tw:bg-acento tw:text-primario-oscuro tw:hover:bg-primario tw:hover:text-white',
}

const TAMANOS = {
  normal: 'tw:px-5 tw:py-2.5',
  pequeno: 'tw:px-3 tw:py-1 tw:text-sm',
}

// Botón reutilizable. Si recibe "to", se muestra como enlace (Link) con el mismo estilo.
function Boton({ variante = 'primario', tamano = 'normal', to, className = '', children, ...resto }) {
  const clases = `${BASE} ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`

  if (to) {
    return (
      <Link to={to} className={clases} {...resto}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={clases} {...resto}>
      {children}
    </button>
  )
}

export default Boton
