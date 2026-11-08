import ArticuloInventario from './ArticuloInventario'

// Recorre la lista y muestra una tarjeta por cada artículo
function ListadoArticulos({ articulos }) {
  return (
    <div className="tw:grid tw:gap-6 tw:sm:grid-cols-2 tw:lg:grid-cols-3">
      {articulos.map((articulo) => (
        <ArticuloInventario key={articulo.id} articulo={articulo} />
      ))}
    </div>
  )
}

export default ListadoArticulos
