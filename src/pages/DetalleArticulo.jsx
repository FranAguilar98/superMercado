import { Link, useParams } from 'react-router-dom'
import { useInventario } from '../hooks/useInventario'
import Cargando from '../components/Cargando'
import Aviso from '../components/Aviso'
import Boton from '../components/Boton'
import ImagenArticulo from '../components/ImagenArticulo'
import EtiquetaStock from '../components/EtiquetaStock'
import { formatearPrecio } from '../util/formato'

// Detalle de un artículo: se llega desde la lista (ruta /articulos/:id)
function DetalleArticulo() {
  const { id } = useParams() // parámetro de la URL
  const { articulos, carrito, cargando, agregarAlCarrito } = useInventario()

  if (cargando) return <Cargando />

  const articulo = articulos.find((a) => String(a.id) === id)

  // Si el id no existe (por ejemplo, el artículo fue eliminado)
  if (!articulo) {
    return (
      <section className="tw:flex tw:flex-col tw:items-start tw:gap-4">
        <Aviso tipo="error">No encontramos el artículo solicitado.</Aviso>
        <Boton to="/articulos">Volver al listado</Boton>
      </section>
    )
  }

  const { nombre, marca, tipo, precio, stock, stockMinimo, imagen } = articulo
  const enCarrito = carrito.find((linea) => linea.id === articulo.id)?.cantidad ?? 0

  return (
    <section>
      <Link to="/articulos" className="tw:mb-4 tw:inline-block tw:text-sm tw:font-semibold tw:text-primario tw:underline">
        ← Volver al listado
      </Link>

      <article className="tw:grid tw:gap-6 tw:rounded-xl tw:border-2 tw:border-lila tw:bg-white tw:p-6 tw:md:grid-cols-2">
        <ImagenArticulo imagen={imagen} nombre={nombre} className="tw:h-72 tw:w-full tw:rounded-lg" />

        <div className="tw:flex tw:flex-col tw:gap-3">
          <span className="tw:text-sm tw:text-gris">{tipo}</span>
          <h1 className="tw:text-3xl tw:font-bold tw:text-texto">{nombre}</h1>
          <p className="tw:text-gris">
            Marca: <span className="tw:font-semibold tw:text-texto">{marca}</span>
          </p>
          <p className="tw:text-3xl tw:font-bold tw:text-primario">{formatearPrecio(precio)}</p>

          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
            <EtiquetaStock stock={stock} stockMinimo={stockMinimo} />
            <p className="tw:text-gris" aria-live="polite">
              Stock disponible: {stock} unidades
            </p>
          </div>

          {enCarrito > 0 && (
            <p className="tw:text-sm tw:font-semibold tw:text-primario" aria-live="polite">
              En tu carrito: {enCarrito}
            </p>
          )}

          <div className="tw:mt-2 tw:flex tw:flex-wrap tw:gap-3">
            <Boton onClick={() => agregarAlCarrito(articulo.id)} disabled={stock === 0}>
              {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </Boton>
            <Boton to="/carrito" variante="suave">
              Ver carrito
            </Boton>
          </div>
        </div>
      </article>
    </section>
  )
}

export default DetalleArticulo
