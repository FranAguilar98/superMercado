import { useState } from 'react'

// Hook que encapsula la lógica de un formulario controlado:
// valores, errores por campo, validación conjunta y reinicio.
//   valoresIniciales: objeto con el valor inicial de cada campo
//   validadores: objeto { campo: funcionValidadora } (ver utils/validaciones.js)
export function useFormulario(valoresIniciales, validadores) {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})

  // Actualiza solo el campo que cambió y limpia su error
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: '' }))
  }

  // Valida todos los campos a la vez; devuelve true si no hay errores
  const validar = () => {
    const nuevos = {}
    Object.keys(validadores).forEach((campo) => {
      const mensaje = validadores[campo](valores[campo])
      if (mensaje) nuevos[campo] = mensaje
    })
    setErrores(nuevos)
    return Object.keys(nuevos).length === 0
  }

  const reiniciar = () => {
    setValores(valoresIniciales)
    setErrores({})
  }

  return { valores, errores, manejarCambio, validar, reiniciar }
}
