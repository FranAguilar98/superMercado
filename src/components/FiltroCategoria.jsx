import CampoFormulario from './CampoFormulario'
import { TODAS } from '../data/tiposProducto'

// Selector para filtrar la lista por categoría
function FiltroCategoria({ categorias, valor, onCambio }) {
  return (
    <div className="tw:mb-4 tw:max-w-xs">
      <CampoFormulario
        como="select"
        nombre="filtro-categoria"
        etiqueta="Filtrar por categoría"
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
      >
        <option value={TODAS}>Todas las categorías</option>
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </CampoFormulario>
    </div>
  )
}

export default FiltroCategoria
