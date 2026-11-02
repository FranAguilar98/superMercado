import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// "base" debe coincidir con el nombre del repositorio en GitHub (para gh-pages)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/superMercado/',
})
