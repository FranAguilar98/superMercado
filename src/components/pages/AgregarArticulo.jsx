import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInventario } from '../../context/InventarioContext'

// Tipos de producto disponibles en el formulario
const TIPOS = ['Despensa', 'Lácteos', 'Frutas y verduras', 'Carnes', 'Bebidas', 'Limpieza']

const FORMULARIO_VACIO = { nombre: '', marca: '', tipo: '' }

// Clases reutilizadas por el formulario
const claseEtiqueta = 'tw:mb-1 tw:block tw:text-sm tw:font-semibold'
const claseCampo =
  'tw:w-full tw:rounded-lg tw:border tw:border-lila tw:bg-white tw:px-3 tw:py-2 focus:tw:border-secundario focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-secundario/40'

// Clases del aviso según su tipo
const CLASES_AVISO = {
  success: 'tw:bg-lila-claro tw:text-primario-oscuro',
  danger: 'tw:bg-acento tw:text-primario-oscuro',
}

// Página para agregar artículos nuevos al estado global
function AgregarArticulo() {
  const { agregarArticulo } = useInventario()
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO)
  const [mensaje, setMensaje] = useState(null)

  // Actualiza solo el campo que cambió, usando el atributo "name" del input
  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
    setMensaje(null)
  }

  const manejarEnvio = (e) => {
    e.preventDefault() // evita que el formulario recargue la página
    const nombre = formulario.nombre.trim()
    const marca = formulario.marca.trim()

    // Evita guardar campos que solo tengan espacios
    if (!nombre || !marca || !formulario.tipo) {
      setMensaje({ clase: 'danger', texto: 'Completa todos los campos del formulario.' })
      return
    }

    agregarArticulo({ nombre, marca, tipo: formulario.tipo })
    setMensaje({ clase: 'success', texto: `"${nombre}" se agregó al inventario.` })
    setFormulario(FORMULARIO_VACIO)
  }

  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Agregar artículo</h1>
      <p className="tw:mb-6 tw:text-gris">Ingresa un nuevo artículo al inventario del supermercado.</p>

      {/* Renderizado condicional: aviso de éxito o de error */}
      {mensaje && (
        <div className={`tw:mb-4 tw:max-w-xl tw:rounded-lg tw:p-4 ${CLASES_AVISO[mensaje.clase]}`} role="alert">
          {mensaje.texto}{' '}
          {mensaje.clase === 'success' && (
            <Link to="/articulos" className="tw:font-bold tw:underline">
              Ver inventario
            </Link>
          )}
        </div>
      )}

      <form
        onSubmit={manejarEnvio}
        className="tw:flex tw:max-w-xl tw:flex-col tw:gap-4 tw:rounded-xl tw:border-2 tw:border-lila tw:bg-white tw:p-6"
      >
        <div>
          <label htmlFor="nombre" className={claseEtiqueta}>Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className={claseCampo}
            placeholder="Ej: Galletas de agua"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />
        </div>

        <div>
          <label htmlFor="marca" className={claseEtiqueta}>Marca</label>
          <input
            id="marca"
            name="marca"
            type="text"
            className={claseCampo}
            placeholder="Ej: Costa"
            value={formulario.marca}
            onChange={manejarCambio}
            required
          />
        </div>

        <div>
          <label htmlFor="tipo" className={claseEtiqueta}>Tipo de producto</label>
          <select
            id="tipo"
            name="tipo"
            className={claseCampo}
            value={formulario.tipo}
            onChange={manejarCambio}
            required
          >
            <option value="">Selecciona un tipo</option>
            {TIPOS.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="tw:self-start tw:rounded-lg tw:bg-primario tw:px-5 tw:py-2.5 tw:font-semibold tw:text-white tw:transition-colors hover:tw:bg-secundario focus:tw:outline-none focus:tw:ring-4 focus:tw:ring-secundario/40"
        >
          Agregar artículo
        </button>
      </form>
    </section>
  )
}

export default AgregarArticulo
