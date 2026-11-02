import { useState, useEffect } from 'react'
import Cargando from '../../Cargando'
import ListaProductos from '../inventario/ListaProductos'

// Datos desde DummyJSON (Custom Response); si falla, se usa el archivo local
const URL_API = 'https://dummyjson.com/c/6db2-3a41-4907-ae54'
const URL_LOCAL = `${import.meta.env.BASE_URL}productos.json`

function pedirProductos(url) {
  return fetch(url).then((respuesta) => {
    if (!respuesta.ok) throw new Error('No se pudo cargar el inventario')
    return respuesta.json()
  })
}

// Página principal (home): carga el inventario y lo muestra en tarjetas
function Inicio() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // useEffect con [] se ejecuta una sola vez al montar el componente
  useEffect(() => {
    pedirProductos(URL_API)
      .catch(() => pedirProductos(URL_LOCAL))
      .then((datos) => {
        setProductos(datos)
        setCargando(false)
      })
      .catch((err) => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  // Renderizado condicional: carga, error o inventario
  if (cargando) return <Cargando />
  if (error) {
    return <p className="tw:rounded-lg tw:bg-acento tw:p-4 tw:text-primario-oscuro">⚠️ {error}</p>
  }

  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Inventario</h1>
      <p className="tw:mb-6 tw:text-gris">Despensa: productos disponibles en el supermercado.</p>
      <ListaProductos productos={productos} />
    </section>
  )
}

export default Inicio
