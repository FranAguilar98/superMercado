// Estilos de cada tipo de aviso
const ESTILOS = {
  exito: 'tw:bg-lila-claro tw:text-primario-oscuro',
  error: 'tw:bg-acento tw:text-primario-oscuro',
  info: 'tw:border-2 tw:border-lila tw:bg-white tw:text-gris',
}

// Aviso reutilizable: tipo "exito", "error" o "info"
function Aviso({ tipo = 'info', className = '', children }) {
  return (
    <div role={tipo === 'error' ? 'alert' : 'status'} className={`tw:rounded-lg tw:p-4 ${ESTILOS[tipo]} ${className}`}>
      {children}
    </div>
  )
}

export default Aviso
