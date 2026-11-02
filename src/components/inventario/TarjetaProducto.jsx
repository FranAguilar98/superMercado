// Clases de la etiqueta según el estado del stock
const ETIQUETAS = {
  ok: 'tw:bg-lila-claro tw:text-primario',
  alerta: 'tw:bg-acento tw:text-fuchsia-800',
  critico: 'tw:bg-primario-oscuro tw:text-white',
}

// Tarjeta de un producto con su imagen, precio y estado de stock
function TarjetaProducto({ producto }) {
  const { nombre, categoria, precio, stock, stockMinimo, imagen } = producto

  // El estado se calcula según el stock disponible
  let estado = 'Disponible'
  let clase = 'ok'
  if (stock === 0) {
    estado = 'Sin stock'
    clase = 'critico'
  } else if (stock < stockMinimo) {
    estado = 'Stock bajo'
    clase = 'alerta'
  }

  return (
    <article className="tw:flex tw:flex-col tw:gap-2 tw:rounded-xl tw:border-2 tw:border-lila tw:bg-white tw:p-5">
      <img
        src={`${import.meta.env.BASE_URL}${imagen}`}
        alt={nombre}
        className="tw:h-60 tw:w-full tw:rounded-lg tw:bg-lila-claro tw:object-contain"
      />
      <span className="tw:text-sm tw:text-gris">{categoria}</span>
      <h3 className="tw:text-xl tw:font-bold tw:text-texto">{nombre}</h3>
      <p className="tw:text-2xl tw:font-bold tw:text-primario">${precio.toLocaleString('es-CL')}</p>
      <p className="tw:text-gris">Stock: {stock} unidades</p>
      <p className={`tw:w-fit tw:rounded-full tw:px-3 tw:py-1 tw:text-sm tw:font-semibold ${ETIQUETAS[clase]}`}>
        {estado}
      </p>
    </article>
  )
}

export default TarjetaProducto
