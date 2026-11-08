import { useState } from 'react'
import { useInventario } from '../hooks/useInventario'
import { TODAS } from '../data/tiposProducto'
import { filtrarPorCategoria, obtenerCategorias } from '../util/filtroInventario'
import Cargando from '../components/Cargando'
import Aviso from '../components/Aviso'
import Boton from '../components/Boton'
import FiltroCategoria from '../components/FiltroCategoria'
import TablaArticulos from '../components/TablaArticulos'

// Página que lista en una tabla los artículos del inventario, con filtro por categoría
function Articulos() {
  const { articulos, cargando, eliminarArticulo } = useInventario()
  const [categoria, setCategoria] = useState(TODAS)

  if (cargando) return <Cargando />

  // El filtro NO modifica "articulos" (inventario original): crea una lista nueva
  const visibles = filtrarPorCategoria(articulos, categoria)
  const categorias = obtenerCategorias(articulos)

  // Pide confirmación antes de eliminar
  const manejarEliminar = (articulo) => {
    if (window.confirm(`¿Eliminar "${articulo.nombre}" del inventario?`)) {
      eliminarArticulo(articulo.id)
    }
  }

  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Artículos en inventario</h1>
      <p className="tw:mb-6 tw:text-gris" aria-live="polite">
        Mostrando {visibles.length} de {articulos.length} artículos.
      </p>

      {articulos.length === 0 ? (
        <Aviso>
          No hay artículos en el inventario.{' '}
          <Boton to="/agregar" variante="suave" tamano="pequeno">
            Agrega el primero
          </Boton>
        </Aviso>
      ) : (
        <>
          <FiltroCategoria categorias={categorias} valor={categoria} onCambio={setCategoria} />
          {visibles.length === 0 ? (
            <Aviso>No hay artículos en la categoría "{categoria}".</Aviso>
          ) : (
            <TablaArticulos articulos={visibles} onEliminar={manejarEliminar} />
          )}
        </>
      )}
    </section>
  )
}

export default Articulos
