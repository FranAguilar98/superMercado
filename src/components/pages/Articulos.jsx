import { Link } from 'react-router-dom'
import { useInventario } from '../../context/InventarioContext'

// Página que lista en una tabla todos los artículos del inventario
function Articulos() {
  const { articulos, eliminarArticulo } = useInventario()

  // Pide confirmación antes de eliminar
  const manejarEliminar = (articulo) => {
    if (window.confirm(`¿Eliminar "${articulo.nombre}" del inventario?`)) {
      eliminarArticulo(articulo.id)
    }
  }

  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Artículos en inventario</h1>
      <p className="tw:mb-6 tw:text-gris">Total: {articulos.length} artículos.</p>

      {/* Renderizado condicional: sin artículos o con tabla */}
      {articulos.length === 0 ? (
        <div className="tw:rounded-lg tw:bg-lila-claro tw:p-4 tw:text-primario-oscuro" role="alert">
          No hay artículos en el inventario.{' '}
          <Link to="/agregar" className="tw:font-bold tw:underline">
            Agrega el primero
          </Link>
        </div>
      ) : (
        <div className="tw:overflow-x-auto tw:rounded-xl tw:border-2 tw:border-lila tw:bg-white">
          <table className="tw:w-full tw:text-left">
            <thead className="tw:bg-primario tw:text-white">
              <tr>
                <th scope="col" className="tw:px-4 tw:py-3">#</th>
                <th scope="col" className="tw:px-4 tw:py-3">Nombre</th>
                <th scope="col" className="tw:px-4 tw:py-3">Marca</th>
                <th scope="col" className="tw:px-4 tw:py-3">Tipo</th>
                <th scope="col" className="tw:px-4 tw:py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="tw:divide-y tw:divide-lila">
              {articulos.map((articulo, indice) => (
                <tr key={articulo.id} className="odd:tw:bg-white even:tw:bg-fondo hover:tw:bg-lila-claro">
                  <th scope="row" className="tw:px-4 tw:py-3 tw:font-semibold">{indice + 1}</th>
                  <td className="tw:px-4 tw:py-3">{articulo.nombre}</td>
                  <td className="tw:px-4 tw:py-3">{articulo.marca}</td>
                  <td className="tw:px-4 tw:py-3">{articulo.tipo}</td>
                  <td className="tw:px-4 tw:py-3">
                    <button
                      type="button"
                      onClick={() => manejarEliminar(articulo)}
                      aria-label={`Eliminar ${articulo.nombre}`}
                      className="tw:cursor-pointer tw:rounded-lg tw:bg-acento tw:px-3 tw:py-1 tw:text-sm tw:font-semibold tw:text-primario-oscuro tw:transition-colors hover:tw:bg-primario hover:tw:text-white focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-secundario/40"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Articulos