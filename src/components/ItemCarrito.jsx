import { Link } from 'react-router-dom'
import Boton from './Boton'
import ImagenArticulo from './ImagenArticulo'
import { formatearPrecio } from '../util/formato'

// Una línea del carrito: datos del artículo, cantidad con + y −, subtotal
function ItemCarrito({ linea, onMas, onMenos, onQuitar }) {
  const { id, nombre, marca, precio, stock, imagen, cantidad } = linea

  return (
    <li className="tw:flex tw:flex-col tw:gap-4 tw:rounded-xl tw:border-2 tw:border-lila tw:bg-white tw:p-4 tw:sm:flex-row tw:sm:items-center">
      <ImagenArticulo imagen={imagen} nombre={nombre} className="tw:h-24 tw:w-full tw:rounded-lg tw:sm:w-32" />

      <div className="tw:flex-1">
        <h2 className="tw:text-lg tw:font-bold tw:text-texto">
          <Link to={`/articulos/${id}`} className="tw:hover:underline">
            {nombre}
          </Link>
        </h2>
        <p className="tw:text-sm tw:text-gris">
          {marca} · {formatearPrecio(precio)} c/u
        </p>
        <p className="tw:text-sm tw:text-gris" aria-live="polite">
          Disponibles en inventario: {stock}
        </p>
      </div>

      <div className="tw:flex tw:items-center tw:gap-2" role="group" aria-label={`Cantidad de ${nombre}`}>
        <Boton variante="suave" tamano="pequeno" onClick={onMenos} aria-label={`Disminuir cantidad de ${nombre}`}>
          −
        </Boton>
        <span className="tw:min-w-8 tw:text-center tw:text-lg tw:font-bold" aria-live="polite">
          {cantidad}
        </span>
        <Boton
          variante="suave"
          tamano="pequeno"
          onClick={onMas}
          disabled={stock === 0}
          aria-label={`Aumentar cantidad de ${nombre}`}
        >
          +
        </Boton>
      </div>

      <p className="tw:text-lg tw:font-bold tw:text-primario tw:sm:w-28 tw:sm:text-right">
        {formatearPrecio(precio * cantidad)}
      </p>

      <Boton variante="peligro" tamano="pequeno" onClick={onQuitar} aria-label={`Quitar ${nombre} del carrito`}>
        Quitar
      </Boton>
    </li>
  )
}

export default ItemCarrito
