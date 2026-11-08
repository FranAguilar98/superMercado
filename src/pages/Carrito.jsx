import { useInventario } from '../hooks/useInventario'
import Aviso from '../components/Aviso'
import Boton from '../components/Boton'
import ItemCarrito from '../components/ItemCarrito'
import { formatearPrecio } from '../util/formato'

// Carrito de compras: aumentar o disminuir la cantidad actualiza el inventario general
function Carrito() {
  const {
    lineasCarrito,
    totalUnidades,
    totalPrecio,
    agregarAlCarrito,
    quitarUnidad,
    quitarDelCarrito,
    vaciarCarrito,
  } = useInventario()

  // Pide confirmación antes de vaciar (las unidades vuelven al inventario)
  const manejarVaciar = () => {
    if (window.confirm('¿Vaciar el carrito? Las unidades volverán al inventario.')) {
      vaciarCarrito()
    }
  }

  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Carrito de compras</h1>
      <p className="tw:mb-6 tw:text-gris">Revisa los artículos que agregaste y ajusta sus cantidades.</p>

      {lineasCarrito.length === 0 ? (
        <div className="tw:flex tw:flex-col tw:items-start tw:gap-4">
          <Aviso>Tu carrito está vacío.</Aviso>
          <Boton to="/articulos">Ver artículos</Boton>
        </div>
      ) : (
        <>
          <ul className="tw:flex tw:flex-col tw:gap-4">
            {lineasCarrito.map((linea) => (
              <ItemCarrito
                key={linea.id}
                linea={linea}
                onMas={() => agregarAlCarrito(linea.id)}
                onMenos={() => quitarUnidad(linea.id)}
                onQuitar={() => quitarDelCarrito(linea.id)}
              />
            ))}
          </ul>

          <div className="tw:mt-6 tw:flex tw:flex-col tw:gap-3 tw:rounded-xl tw:border-2 tw:border-lila tw:bg-white tw:p-5 tw:sm:flex-row tw:sm:items-center tw:sm:justify-between">
            <div>
              <p className="tw:text-gris">Unidades: {totalUnidades}</p>
              <p className="tw:text-2xl tw:font-bold tw:text-primario">Total: {formatearPrecio(totalPrecio)}</p>
            </div>
            <Boton variante="peligro" onClick={manejarVaciar}>
              Vaciar carrito
            </Boton>
          </div>
        </>
      )}
    </section>
  )
}

export default Carrito
