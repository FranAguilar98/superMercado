import { useState } from 'react'
import { useFormulario } from '../hooks/useFormulario'
import { validarNombrePersona, validarCorreo, validarMensaje } from '../util/validacionesInventario'
import Aviso from '../components/Aviso'
import Boton from '../components/Boton'
import CampoFormulario from '../components/CampoFormulario'

// Clases reutilizadas por los bloques de la página
const claseBloque = 'tw:rounded-lg tw:border-2 tw:border-lila tw:bg-white tw:p-5'
const claseSubtitulo = 'tw:mb-3 tw:text-lg tw:font-bold tw:text-primario'

const VALORES_INICIALES = { nombre: '', correo: '', mensaje: '' }
const VALIDADORES = {
  nombre: validarNombrePersona,
  correo: validarCorreo,
  mensaje: validarMensaje,
}

// Página 3: Contáctanos (datos de contacto + formulario de demostración)
function Contacto() {
  const { valores, errores, manejarCambio, validar, reiniciar } = useFormulario(
    VALORES_INICIALES,
    VALIDADORES,
  )
  const [enviado, setEnviado] = useState(false)

  const manejarEnvio = (e) => {
    e.preventDefault() // evita que el formulario recargue la página
    if (!validar()) return // hay errores: se muestran todos juntos

    setEnviado(true)
    reiniciar()
  }

  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Contáctanos</h1>
      <p className="tw:mb-6 tw:text-gris">¿Tienes dudas o necesitas ayuda con el sistema? Escríbenos.</p>

      <div className="tw:grid tw:gap-4 tw:md:grid-cols-2">
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
            <Aviso tipo="exito">
              <p className="tw:mb-3">
                ✅ Formulario de demostración: tu mensaje no fue enviado ni almacenado.
              </p>
              <Boton onClick={() => setEnviado(false)}>Volver al formulario</Boton>
            </Aviso>
          ) : (
            <form onSubmit={manejarEnvio} noValidate className="tw:flex tw:flex-col tw:gap-3">
              <CampoFormulario
                etiqueta="Nombre"
                nombre="nombre"
                value={valores.nombre}
                onChange={manejarCambio}
                error={errores.nombre}
              />
              <CampoFormulario
                etiqueta="Correo"
                nombre="correo"
                type="email"
                value={valores.correo}
                onChange={manejarCambio}
                error={errores.correo}
              />
              <CampoFormulario
                como="textarea"
                etiqueta="Mensaje"
                nombre="mensaje"
                rows="4"
                value={valores.mensaje}
                onChange={manejarCambio}
                error={errores.mensaje}
              />
              <Boton type="submit" className="tw:self-start">
                Enviar
              </Boton>
            </form>
          )}
        </article>
      </div>
    </section>
  )
}

export default Contacto
