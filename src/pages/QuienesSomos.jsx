// Clases reutilizadas por los bloques de la página
const claseBloque = 'tw:rounded-lg tw:border-2 tw:border-lila tw:bg-white tw:p-5'
const claseSubtitulo = 'tw:mb-2 tw:text-lg tw:font-bold tw:text-primario'

// Página 2: información de la empresa
function QuienesSomos() {
  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Quiénes somos</h1>
      <p className="tw:mb-6 tw:text-gris">
        SuperPlaneta es un supermercado con su propio sistema de gestión de
        inventario, creado para que nuestras tiendas siempre tengan sus
        productos en orden.
      </p>

      <div className="tw:grid tw:gap-4 tw:md:grid-cols-3">
        <article className={claseBloque}>
          <h2 className={claseSubtitulo}>Qué hacemos</h2>
          <p>
            Vendemos productos de despensa y, además, ofrecemos un sistema de
            gestión de inventario para que los comercios locales mantengan sus
            productos organizados y disponibles para sus clientes.
          </p>
        </article>
        <article className={claseBloque}>
          <h2 className={claseSubtitulo}>Visión</h2>
          <p>
            Ser la herramienta de inventario preferida por los comercios
            locales de Chile, con información clara y en tiempo real.
          </p>
        </article>
        <article className={claseBloque}>
          <h2 className={claseSubtitulo}>Valores</h2>
          <p>
            Transparencia, orden, compromiso con el cliente y mejora continua
            en cada proceso de nuestra operación.
          </p>
        </article>
      </div>
    </section>
  )
}

export default QuienesSomos
