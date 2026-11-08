import { Link } from 'react-router-dom'
import ImagenArticulo from './ImagenArticulo'
import EtiquetaStock from './EtiquetaStock'
import { formatearPrecio } from '../util/formato'

// Tarjeta de un artículo: al hacer clic lleva a su detalle
function ArticuloInventario({ articulo }) {
  const { id, nombre, marca, tipo, precio, stock, stockMinimo, imagen } = articulo

  return (
    <Link
      to={`/articulos/${id}`}
      className="tw:flex tw:flex-col tw:gap-2 tw:rounded-xl tw:border-2 tw:border-lila tw:bg-white tw:p-5 tw:transition-colors tw:hover:border-secundario"
    >
      <ImagenArticulo imagen={imagen} nombre={nombre} className="tw:h-60 tw:w-full tw:rounded-lg" />
      <span className="tw:text-sm tw:text-gris">{tipo} · {marca}</span>
      <h3 className="tw:text-xl tw:font-bold tw:text-texto">{nombre}</h3>
      <p className="tw:text-2xl tw:font-bold tw:text-primario">{formatearPrecio(precio)}</p>
      <p className="tw:text-gris">Stock: {stock} unidades</p>
      <EtiquetaStock stock={stock} stockMinimo={stockMinimo} />
    </Link>
  )
}

export default ArticuloInventario
