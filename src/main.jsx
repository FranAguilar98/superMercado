import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { InventarioProvider } from './context/InventarioProvider.jsx'

// Estilos generales
import './index.css'

// Tailwind
import './tailwind.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <InventarioProvider>
        <App />
      </InventarioProvider>
    </HashRouter>
  </StrictMode>,
)
