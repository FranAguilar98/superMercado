import { useState } from 'react'
import { useInventario } from '../hooks/useInventario'
import { useFormulario } from '../hooks/useFormulario'
import { CATALOGO } from '../data/catalogoProductos'
import { validarProducto, validarCantidad } from '../util/validacionesInventario'
import { formatearPrecio } from '../util/formato'
import Aviso from '../components/Aviso'
import Boton from '../components/Boton'
import CampoFormulario from '../components/CampoFormulario'
import ImagenArticulo from '../components/ImagenArticulo'

const VALORES_INICIALES = { producto: '', cantidad: '' }

// Cada campo se valida con una función de util/validacionesInventario.js
const VALIDADORES = {
  producto: validarProducto,
  cantidad: validarCantidad,
}

// Página para agregar artículos al inventario: se elige un producto del catálogo fijo
function NuevoArticulo() {
  const { articulos, agregarArticulo } = useInventario()
  const { valores, errores, manejarCambio, validar, reiniciar } = useFormulario(
    VALORES_INICIALES,
    VALIDADORES,
  )
  const [agregado, setAgregado] = useState(null)

  // Producto elegido en el selector y, si ya existe, su registro en el inventario
  const elegido = CATALOGO.find((producto) => String(producto.id) === valores.producto)
  const enInventario = elegido ? articulos.find((articulo) => articulo.id === elegido.id) : null

  const manejarEnvio = (e) => {
    e.preventDefault() // evita que el formulario recargue la página
    setAgregado(null)

    // Valida todos los campos y muestra todos los errores juntos
    if (!validar()) return

    const cantidad = Number(valores.cantidad)
    agregarArticulo(elegido, cantidad)
    setAgregado({ nombre: elegido.nombre, cantidad })
    reiniciar()
  }

  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Agregar artículo</h1>
      <p className="tw:mb-6 tw:text-gris">
        Elige un producto del catálogo e indica cuántas unidades ingresan al inventario.
      </p>

      {agregado && (
        <Aviso tipo="exito" className="tw:mb-4 tw:max-w-xl">
          Se {agregado.cantidad === 1 ? 'agregó 1 unidad' : `agregaron ${agregado.cantidad} unidades`} de
          "{agregado.nombre}" al inventario.{' '}
          <Boton to="/articulos" variante="suave" tamano="pequeno">
            Ver inventario
          </Boton>
        </Aviso>
      )}

      <form
        onSubmit={manejarEnvio}
        noValidate
        className="tw:flex tw:max-w-xl tw:flex-col tw:gap-4 tw:rounded-xl tw:border-2 tw:border-lila tw:bg-white tw:p-6"
      >
        <CampoFormulario
          como="select"
          etiqueta="Producto"
          nombre="producto"
          value={valores.producto}
          onChange={manejarCambio}
          error={errores.producto}
        >
          <option value="">Selecciona un producto</option>
          {CATALOGO.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre} — {producto.marca}
            </option>
          ))}
        </CampoFormulario>

        {/* Datos fijos del producto elegido */}
        {elegido && (
          <div
            className="tw:flex tw:gap-4 tw:rounded-lg tw:border tw:border-lila tw:bg-fondo tw:p-3"
            aria-live="polite"
          >
            <ImagenArticulo
              imagen={elegido.imagen}
              nombre={elegido.nombre}
              className="tw:size-24 tw:shrink-0 tw:rounded-lg"
            />
            <div className="tw:text-sm tw:text-gris">
              <p className="tw:text-base tw:font-bold tw:text-texto">{elegido.nombre}</p>
              <p>Marca: {elegido.marca}</p>
              <p>Tipo: {elegido.tipo}</p>
              <p>Precio: {formatearPrecio(elegido.precio)}</p>
              <p className="tw:mt-1 tw:font-semibold tw:text-primario">
                {enInventario
                  ? `Ya está en el inventario (${enInventario.stock} unidades): se sumarán a las existentes.`
                  : 'Aún no está en el inventario.'}
              </p>
            </div>
          </div>
        )}

        <CampoFormulario
          etiqueta="Cantidad (unidades)"
          nombre="cantidad"
          type="number"
          min="1"
          step="1"
          placeholder="Ej: 20"
          value={valores.cantidad}
          onChange={manejarCambio}
          error={errores.cantidad}
        />

        <Boton type="submit" className="tw:self-start">
          Agregar artículo
        </Boton>
      </form>
    </section>
  )
}

export default NuevoArticulo
