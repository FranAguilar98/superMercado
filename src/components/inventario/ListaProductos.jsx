import TarjetaProducto from './TarjetaProducto'

// Recorre la lista y muestra una tarjeta por cada producto
function ListaProductos({ productos }) {
  return (
    <div className="tw:grid tw:gap-6 sm:tw:grid-cols-2 lg:tw:grid-cols-3">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default ListaProductos
