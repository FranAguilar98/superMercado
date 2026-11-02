import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/layout/Header'
import MenuInferior from './components/layout/MenuInferior'
import Inicio from './components/pages/Inicio'
import QuienesSomos from './components/pages/QuienesSomos'
import Contacto from './components/pages/Contacto'
import AgregarArticulo from './components/pages/AgregarArticulo'
import Articulos from './components/pages/Articulos'

// App define las rutas del sitio: cada <Route> asocia una URL con una página
function App() {
  return (
    <div className="tw:min-h-screen">
      <Header />

      <main className="tw:mx-auto tw:max-w-5xl tw:px-4 tw:pt-6 tw:pb-24">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/agregar" element={<AgregarArticulo />} />
          {/* Cualquier otra URL redirige al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <MenuInferior />
    </div>
  )
}

export default App
