import { useInventario } from '../hooks/useInventario'
import Cargando from '../components/Cargando'
import Aviso from '../components/Aviso'
import ListadoArticulos from '../components/ListadoArticulos'

// Página principal (home): muestra el inventario en tarjetas
function Inicio() {
  const { articulos, cargando, error } = useInventario()

  // Renderizado condicional: carga, error o inventario
  if (cargando) return <Cargando />
  if (error) return <Aviso tipo="error">⚠️ {error}</Aviso>

  return (
    <section>
      <h1 className="tw:text-3xl tw:font-bold tw:text-primario">Inventario</h1>
      <p className="tw:mb-6 tw:text-gris">Productos disponibles en el supermercado. Haz clic en uno para ver su detalle.</p>
      <ListadoArticulos articulos={articulos} />
    </section>
  )
}

export default Inicio
