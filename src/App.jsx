import { Routes, Route, Navigate } from 'react-router-dom'
import Navegacion from './components/Navegacion'
import MenuInferior from './components/MenuInferior'
import Inicio from './pages/Inicio'
import QuienesSomos from './pages/QuienesSomos'
import Contacto from './pages/Contacto'
import NuevoArticulo from './pages/NuevoArticulo'
import Articulos from './pages/Articulos'
import DetalleArticulo from './pages/DetalleArticulo'
import Carrito from './pages/Carrito'

// App define las rutas del sitio: cada <Route> asocia una URL con una página
function App() {
  return (
    <div className="tw:min-h-screen">
      <Navegacion />

      <main className="tw:mx-auto tw:max-w-5xl tw:px-4 tw:pt-6 tw:pb-24">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/articulos" element={<Articulos />} />
          {/* Ruta con parámetro: ":id" es el identificador del artículo */}
          <Route path="/articulos/:id" element={<DetalleArticulo />} />
          <Route path="/agregar" element={<NuevoArticulo />} />
          <Route path="/carrito" element={<Carrito />} />
          {/* Cualquier otra URL redirige al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <MenuInferior />
    </div>
  )
}

export default App
