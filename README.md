# SuperPlaneta – Gestión de inventario de supermercado

Sitio web de gestión de inventario para un supermercado, desarrollado con **React + Vite**, **React Router** y **Tailwind CSS**. 

## Sitio publicado

https://franaguilar98.github.io/superMercado/

## Funcionalidades

**Actividad formativa 1 (semana 1)**
- Página de inicio con el inventario en tarjetas (nombre, imagen, precio, stock y estado).
- Menú inferior con tres páginas: **Inicio**, **Quiénes somos** y **Contáctanos** (formulario demostrativo: los mensajes no se envían ni se guardan).
- Datos obtenidos con `fetch` desde DummyJSON (Custom Response): https://dummyjson.com/c/bab1-b111-455a-b2f5
- Si el servicio falla, se usa el archivo local `src/data/articulosInventario.json` como respaldo.

**Actividad formativa 2 (semana 2)**
- Menú superior con las páginas **Artículos**, **Agregar artículo** y **Carrito** (con contador de unidades).
- **Agregar artículo** (`/agregar`): se elige un producto de un **catálogo fijo** (arroz, fideos, aceite, leche, frutillas, carne magra, Sprite y cloro, cada uno con su foto, marca, tipo y precio) y se indica la cantidad de unidades. Si el producto ya está en el inventario, la cantidad se suma a su stock.
- **Artículos** (`/articulos`): tabla con todos los artículos del inventario.
- Estado global con Context API.

**Actividad sumativa 1 (semana 3)**
- **Filtro por categoría** en la lista de artículos: crea una lista derivada y **no modifica** el inventario original.
- **Detalle de artículo** (`/articulos/:id`): al hacer clic en un artículo se muestra su detalle y se puede agregar al carrito. Cada unidad agregada **resta stock** del inventario.
- **Carrito de compras** (`/carrito`): lista los artículos agregados; con **+** y **−** se cambia la cantidad y el inventario general se actualiza (al disminuir, la unidad vuelve al stock). También se puede quitar un artículo o vaciar el carrito (las unidades vuelven al inventario).
- Validaciones con expresiones regulares y todos los errores del formulario se muestran juntos.

> Las fotos de los productos están en `public/img/`; si una foto no existe, se muestra un recuadro con la inicial del producto.
>
> Los datos viven en memoria: al recargar la página el inventario y el carrito vuelven a su estado inicial.

## Tecnologías

- React 18
- Vite 5
- React Router 6 (`HashRouter`)
- Context API + `useReducer`
- Vitest y ESLint
- Tailwind CSS 4 (`@tailwindcss/vite`, prefijo `tw`)
- gh-pages

## Estructura

```
public/               favicon.svg e imágenes de los productos (img/)
src/
├── components/       Componentes reutilizables: Navegacion, MenuInferior, Aviso, Boton,
│                     CampoFormulario, Cargando, ImagenArticulo, EtiquetaStock, FiltroCategoria,
│                     ArticuloInventario, ListadoArticulos, TablaArticulos, ItemCarrito
├── context/          InventarioContext (contexto), InventarioProvider (estado y acciones),
│                     inventarioReducer (reglas del inventario y el carrito)
├── data/             articulosInventario.json (respaldo local), catalogoProductos.js (productos que se pueden agregar), tiposProducto.js (categorías)
├── hooks/            useInventario (consume el contexto), useFormulario (lógica de formularios)
├── pages/            Inicio, QuienesSomos, Contacto, NuevoArticulo, Articulos,
│                     DetalleArticulo, Carrito
├── util/             filtroInventario, validacionesInventario (regex), formato, estadoStock
├── App.jsx           Rutas del sitio
├── index.css         Estilos generales
├── tailwind.css      Tailwind y colores del tema
└── main.jsx          HashRouter + InventarioProvider
test/                 Pruebas unitarias (Vitest)
eslint.config.js      Configuración de ESLint
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/quienes-somos` | Quiénes somos |
| `/contacto` | Contáctanos |
| `/articulos` | Lista de artículos con filtro por categoría |
| `/articulos/:id` | Detalle del artículo |
| `/agregar` | Formulario para agregar artículos |
| `/carrito` | Carrito de compras |

## Estado global

El inventario y el carrito viven en un solo estado (`InventarioContext`) administrado con `useReducer`:

- `articulos`: inventario general `{ id, nombre, marca, tipo, precio, stock, ... }`.
- `carrito`: líneas `{ id, cantidad }` que apuntan al artículo.

Cada acción (agregar al carrito, quitar una unidad, quitar el artículo, vaciar) actualiza **ambas listas a la vez** dentro del reducer, de modo que el stock siempre es coherente con lo que hay en el carrito.

## Decisiones técnicas

- **`HashRouter`**: el sitio se publica en GitHub Pages, que es un alojamiento estático y no puede redirigir rutas como `/carrito` a `index.html`. Con `BrowserRouter`, recargar la página en una ruta interna produciría un error 404. `HashRouter` mantiene la ruta después del `#` (`/#/carrito`), que el servidor nunca recibe, por lo que funciona sin configuración adicional.
- **`react-router-dom` 6**: se mantiene la versión 6 del paquete, que es la instalada en el proyecto.
- **Prefijo `tw`**: todas las clases de Tailwind llevan el prefijo `tw:` (por ejemplo, `tw:flex` o `tw:md:grid-cols-2`), configurado en `tailwind.css`.
- **Validaciones**: las expresiones regulares y los mensajes están centralizados en `util/validacionesInventario.js`; el hook `useFormulario` encapsula valores, errores y validación conjunta, y se usa en los formularios de contacto y de agregar artículo.
- **Identificadores**: cada producto del catálogo tiene un identificador fijo, así el inventario sabe si un producto ya existe y suma stock en vez de duplicarlo.

## Ejecución local

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm test        # pruebas unitarias (Vitest)
npm run lint    # revisión de código (ESLint)
npm run build   # versión de producción
```

## Publicación en GitHub Pages

```bash
npm run deploy
```

Requiere que `base` en `vite.config.js` y `homepage` en `package.json` coincidan con el nombre del repositorio.


