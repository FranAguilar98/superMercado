// Mensaje que se muestra mientras se cargan los datos
function Cargando() {
  return (
    <div className="tw:py-16 tw:text-center tw:text-gris" role="status">
      <div className="tw:mx-auto tw:mb-4 tw:size-10 tw:animate-spin tw:rounded-full tw:border-4 tw:border-lila tw:border-t-primario"></div>
      <p>Cargando inventario...</p>
    </div>
  )
}

export default Cargando
