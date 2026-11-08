// Validaciones compartidas por los formularios.
// Cada validador recibe el valor del campo y devuelve un mensaje de error
// o una cadena vacía ('') si el valor es correcto.

// Expresiones regulares
export const REGEX_NOMBRE_PERSONA = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{1,59}$/
export const REGEX_CANTIDAD = /^[1-9]\d{0,5}$/
export const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Crea un validador de texto: exige valor y que cumpla la expresión regular
function crearValidadorTexto(mensajeVacio, mensajeInvalido, regex) {
  return (valor) => {
    const texto = valor.trim()
    if (!texto) return mensajeVacio
    if (!regex.test(texto)) return mensajeInvalido
    return ''
  }
}

export const validarNombrePersona = crearValidadorTexto(
  'Ingresa tu nombre.',
  'Usa solo letras y espacios (de 2 a 60 caracteres).',
  REGEX_NOMBRE_PERSONA,
)

export const validarCorreo = crearValidadorTexto(
  'Ingresa tu correo.',
  'Ingresa un correo válido, por ejemplo nombre@correo.cl.',
  REGEX_CORREO,
)

export function validarMensaje(valor) {
  const texto = valor.trim()
  if (!texto) return 'Escribe tu mensaje.'
  if (texto.length < 10) return 'El mensaje debe tener al menos 10 caracteres.'
  return ''
}

export const validarCantidad = crearValidadorTexto(
  'Ingresa la cantidad.',
  'La cantidad debe ser un número entero mayor que 0.',
  REGEX_CANTIDAD,
)

export const validarProducto = (valor) => (valor ? '' : 'Selecciona un producto.')
