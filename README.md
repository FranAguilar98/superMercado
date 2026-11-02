# SuperPlaneta – Gestión de inventario de supermercado

Sitio web de gestión de inventario para un supermercado, desarrollado con **React + Vite**, **React Router** y **Tailwind CSS**. 

## Funcionalidades

**Parte 1**
- Página de inicio con el inventario de la despensa en tarjetas (nombre, imagen, precio, stock y estado).
- Datos obtenidos con `fetch` desde un servicio de DummyJSON (Custom Response): https://dummyjson.com/c/6db2-3a41-4907-ae54
- Si el servicio falla, se usa el archivo local `public/productos.json` como respaldo.
- Menú inferior con tres páginas: **Inicio**, **Quiénes somos** y **Contáctanos** (formulario demostrativo: los mensajes no se envían ni se guardan).

**Parte 2**
- Nuevo menú superior con dos páginas:
  - **Agregar artículo** (`/agregar`): formulario con nombre, marca y tipo de producto.
  - **Artículos** (`/articulos`): tabla con todos los artículos del inventario.
- **Estado global** con Context API (`InventarioContext`): lista de artículos con `nombre`, `marca` y `tipo`, y la función `agregarArticulo`.
- Estilos con **Tailwind CSS v4**, con paleta de colores personalizada.

> Los artículos agregados viven en memoria: se pierden al recargar la página.

## Tecnologías

- React 18
- Vite 5
- React Router 6 (`HashRouter`, compatible con GitHub Pages)
- Context API
- Tailwind CSS 4 (`@tailwindcss/vite`)
- gh-pages

## Estructura

```
src/
├── components/
│   ├── inventario/   ListaProductos, TarjetaProducto
│   ├── layout/       Header (menú superior), MenuInferior
│   └── pages/        Inicio, QuienesSomos, Contacto, AgregarArticulo, Articulos
├── context/          InventarioContext
├── App.jsx           Rutas del sitio
├── Cargando.jsx
├── index.css         Tailwind y colores del tema
└── main.jsx          HashRouter + InventarioProvider
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/quienes-somos` | Quiénes somos |
| `/contacto` | Contáctanos |
| `/articulos` | Tabla de artículos |
| `/agregar` | Formulario para agregar artículos |

## Ejecución local

```bash
npm install
npm run dev
```

## Publicación en GitHub Pages

```bash
npm run deploy
```

Requiere que `base` en `vite.config.js` y `homepage` en `package.json` coincidan con el nombre del repositorio.

