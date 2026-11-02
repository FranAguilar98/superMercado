import { useState } from 'react'

// Clases reutilizadas por el formulario y los bloques
const claseBloque = 'tw:rounded-lg tw:border-2 tw:border-lila tw:bg-white tw:p-5'
const claseSubtitulo = 'tw:mb-3 tw:text-lg tw:font-bold tw:text-primario'
const claseCampo =
  'tw:w-full tw:rounded-lg tw:border tw:border-lila tw:bg-white tw:px-3 tw:py-2 focus:tw:border-secundario focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-secundario/40'
const claseError = 'tw:text-sm tw:font-normal tw:text-red-700'
const claseCampoError = 'tw:border-red-600'
const claseBoton =
  'tw:rounded-lg tw:bg-primario tw:px-5 tw:py-2.5 tw:font-semibold tw:text-white tw:transition-colors hover:tw:bg-secundario focus:tw:outline-none focus:tw:ring-4 focus:tw:ring-secundario/40'

// Página 3: Contáctanos (datos de contacto + formulario de demostración)
function Contacto() {
  const [formulario, setFormulario] = useState({ nombre: '', correo: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  // Errores de validación: un mensaje por cada campo con problemas
  const [errores, setErrores] = useState({})

  // Revisa todos los campos a la vez y devuelve los errores encontrados
  const validar = () => {
    const nuevos = {}
    if (!formulario.nombre.trim()) nuevos.nombre = 'Ingresa tu nombre.'
    if (!formulario.correo.trim()) {
      nuevos.correo = 'Ingresa tu correo.'
    } else if (!/^\S+@\S+\.\S+$/.test(formulario.correo.trim())) {
      nuevos.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
    }
    if (!formulario.mensaje.trim()) nuevos.mensaje = 'Escribe tu mensaje.'
    return nuevos
  }

  // Actualiza solo el campo que cambió y borra el error de ese campo
  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: undefined })
  }

  const manejarEnvio = (e) => {
    e.preventDefault() // evita que el formulario recargue la página
    const nuevos = validar()
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return // hay errores: no se envía

    setEnviado(true)
    setFormulario({ nombre: '', correo: '', mensaje: '' })
  }

  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Contáctanos</h1>
      <p className="tw:mb-6 tw:text-gris">
        ¿Tienes dudas o necesitas ayuda con el sistema? Escríbenos.
      </p>

      <div className="tw:grid tw:gap-4 md:tw:grid-cols-2">
        <article className={claseBloque}>
          <h2 className={claseSubtitulo}>📍 Datos de contacto</h2>
          <p className="tw:mb-2">Av. Providencia 1234, Santiago, Chile</p>
          <p className="tw:mb-2">📞 +56 2 2345 6789</p>
          <p className="tw:mb-2">✉️ contacto@superplaneta.cl</p>
          <p>🕘 Lunes a sábado, 9:00 a 20:00 hrs</p>
        </article>

        <article className={claseBloque}>
          <h2 className={claseSubtitulo}>💬 Envíanos un mensaje</h2>
          <p className="tw:mb-3 tw:text-sm tw:text-gris">
            Este formulario es demostrativo: los mensajes no se envían ni se guardan.
          </p>

          {/* Renderizado condicional: confirmación o formulario */}
          {enviado ? (
            <div className="tw:rounded-lg tw:bg-lila-claro tw:p-4 tw:text-primario-oscuro">
              <p className="tw:mb-3">
                ✅ Formulario de demostración: tu mensaje no fue enviado ni almacenado.
              </p>
              <button className={claseBoton} onClick={() => setEnviado(false)}>
                Volver al formulario
              </button>
            </div>
          ) : (
            <form onSubmit={manejarEnvio} noValidate className="tw:flex tw:flex-col tw:gap-3">
              <label className="tw:flex tw:flex-col tw:gap-1 tw:text-sm tw:font-semibold">
                Nombre
                <input
                  type="text"
                  name="nombre"
                  className={`${claseCampo} ${errores.nombre ? claseCampoError : ''}`}
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  aria-invalid={Boolean(errores.nombre)}
                />
                {errores.nombre && <span className={claseError}>{errores.nombre}</span>}
              </label>
              <label className="tw:flex tw:flex-col tw:gap-1 tw:text-sm tw:font-semibold">
                Correo
                <input
                  type="email"
                  name="correo"
                  className={`${claseCampo} ${errores.correo ? claseCampoError : ''}`}
                  value={formulario.correo}
                  onChange={manejarCambio}
                  aria-invalid={Boolean(errores.correo)}
                />
                {errores.correo && <span className={claseError}>{errores.correo}</span>}
              </label>
              <label className="tw:flex tw:flex-col tw:gap-1 tw:text-sm tw:font-semibold">
                Mensaje
                <textarea
                  name="mensaje"
                  rows="4"
                  className={`${claseCampo} ${errores.mensaje ? claseCampoError : ''}`}
                  value={formulario.mensaje}
                  onChange={manejarCambio}
                  aria-invalid={Boolean(errores.mensaje)}
                ></textarea>
                {errores.mensaje && <span className={claseError}>{errores.mensaje}</span>}
              </label>
              <button type="submit" className={`${claseBoton} tw:self-start`}>
                Enviar
              </button>
            </form>
          )}
        </article>
      </div>
    </section>
  )
}

export default Contacto
