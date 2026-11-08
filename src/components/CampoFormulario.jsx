// Clases comunes de los campos
const CLASE_CAMPO =
  'tw:w-full tw:rounded-lg tw:border tw:bg-white tw:px-3 tw:py-2 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-secundario/40'

// Campo de formulario reutilizable: etiqueta + control + mensaje de error.
// "como" puede ser 'input' (por defecto), 'textarea' o 'select'.
function CampoFormulario({ etiqueta, nombre, como = 'input', error, children, ...resto }) {
  const Control = como
  const idError = `${nombre}-error`

  return (
    <div>
      <label htmlFor={nombre} className="tw:mb-1 tw:block tw:text-sm tw:font-semibold">
        {etiqueta}
      </label>
      <Control
        id={nombre}
        name={nombre}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? idError : undefined}
        className={`${CLASE_CAMPO} ${error ? 'tw:border-red-600' : 'tw:border-lila tw:focus:border-secundario'}`}
        {...resto}
      >
        {children}
      </Control>
      {error && (
        <p id={idError} className="tw:mt-1 tw:text-sm tw:text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export default CampoFormulario
