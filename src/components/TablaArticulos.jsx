import { Link } from 'react-router-dom'
import Boton from './Boton'
import { formatearPrecio } from '../util/formato'

// Tabla con los artículos recibidos (ya filtrados por la página)
function TablaArticulos({ articulos, onEliminar }) {
  return (
    <div className="tw:overflow-x-auto tw:rounded-xl tw:border-2 tw:border-lila tw:bg-white">
      <table className="tw:w-full tw:text-left">
        <thead className="tw:bg-primario tw:text-white">
          <tr>
            <th scope="col" className="tw:px-4 tw:py-3">#</th>
            <th scope="col" className="tw:px-4 tw:py-3">Nombre</th>
            <th scope="col" className="tw:px-4 tw:py-3">Marca</th>
            <th scope="col" className="tw:px-4 tw:py-3">Categoría</th>
            <th scope="col" className="tw:px-4 tw:py-3">Precio</th>
            <th scope="col" className="tw:px-4 tw:py-3">Stock</th>
            <th scope="col" className="tw:px-4 tw:py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="tw:divide-y tw:divide-lila">
          {articulos.map((articulo, indice) => (
            <tr key={articulo.id} className="tw:odd:bg-white tw:even:bg-fondo tw:hover:bg-lila-claro">
              <th scope="row" className="tw:px-4 tw:py-3 tw:font-semibold">{indice + 1}</th>
              <td className="tw:px-4 tw:py-3">
                <Link to={`/articulos/${articulo.id}`} className="tw:font-semibold tw:text-primario tw:underline">
                  {articulo.nombre}
                </Link>
              </td>
              <td className="tw:px-4 tw:py-3">{articulo.marca}</td>
              <td className="tw:px-4 tw:py-3">{articulo.tipo}</td>
              <td className="tw:px-4 tw:py-3">{formatearPrecio(articulo.precio)}</td>
              <td className="tw:px-4 tw:py-3">{articulo.stock}</td>
              <td className="tw:px-4 tw:py-3">
                <div className="tw:flex tw:gap-2">
                  <Boton to={`/articulos/${articulo.id}`} variante="suave" tamano="pequeno">
                    Ver detalle
                  </Boton>
                  <Boton
                    variante="peligro"
                    tamano="pequeno"
                    onClick={() => onEliminar(articulo)}
                    aria-label={`Eliminar ${articulo.nombre}`}
                  >
                    Eliminar
                  </Boton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaArticulos
