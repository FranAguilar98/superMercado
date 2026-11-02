import { Link, NavLink } from 'react-router-dom'

// NavLink entrega "isActive": lo usamos para resaltar la opción actual
const claseEnlace = ({ isActive }) =>
  `tw:whitespace-nowrap tw:border-b-4 tw:px-2 tw:py-1 tw:text-sm tw:transition-colors sm:tw:text-base ${
    isActive
      ? 'tw:border-acento tw:font-bold tw:text-white'
      : 'tw:border-transparent tw:text-white/70 hover:tw:text-white'
  }`

// Barra superior: logo + menú de artículos
function Header() {
  return (
    <header className="tw:sticky tw:top-0 tw:z-10 tw:bg-primario">
      <nav
        className="tw:mx-auto tw:flex tw:max-w-5xl tw:flex-wrap tw:items-center tw:justify-between tw:gap-x-4 tw:gap-y-1 tw:px-4 tw:py-3"
        aria-label="Menú de artículos"
      >
        <Link to="/" className="tw:text-xl tw:font-bold tw:text-white">
          SuperPlaneta
        </Link>
        <div className="tw:flex tw:gap-2">
          <NavLink to="/articulos" className={claseEnlace}>
            Artículos
          </NavLink>
          <NavLink to="/agregar" className={claseEnlace}>
            Agregar artículo
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header
