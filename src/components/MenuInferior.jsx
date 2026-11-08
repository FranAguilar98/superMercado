import { NavLink } from 'react-router-dom'

// Menú fijo en la parte inferior
const opciones = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/quienes-somos', texto: 'Quiénes somos' },
  { ruta: '/contacto', texto: 'Contáctanos' },
]

const claseItem = ({ isActive }) =>
  `tw:flex-1 tw:border-t-4 tw:py-4 tw:text-center tw:text-base tw:transition-colors ${
    isActive
      ? 'tw:border-secundario tw:bg-lila-claro tw:font-bold tw:text-primario'
      : 'tw:border-transparent tw:text-gris tw:hover:bg-lila-claro'
  }`

function MenuInferior() {
  return (
    <nav
      className="tw:fixed tw:inset-x-0 tw:bottom-0 tw:z-10 tw:flex tw:border-t-2 tw:border-lila tw:bg-white"
      aria-label="Navegación principal"
    >
      {opciones.map((op) => (
        <NavLink key={op.ruta} to={op.ruta} end={op.ruta === '/'} className={claseItem}>
          {op.texto}
        </NavLink>
      ))}
    </nav>
  )
}

export default MenuInferior
