import { useState } from 'react'

// Las imágenes de public/ llevan la ruta base del sitio; las subidas por el usuario (data:) o
// las de internet (http) se usan tal cual
const origenImagen = (imagen) =>
  /^(data:|https?:)/.test(imagen) ? imagen : `${import.meta.env.BASE_URL}${imagen}`

// Imagen del artículo; si no tiene imagen o no se puede cargar, muestra un recuadro con su inicial
function ImagenArticulo({ imagen, nombre, className = '' }) {
  const [imagenConError, setImagenConError] = useState(null)

  if (!imagen || imagenConError === imagen) {
    return (
      <div
        role="img"
        aria-label={`Sin imagen: ${nombre}`}
        className={`tw:flex tw:items-center tw:justify-center tw:bg-lila-claro tw:text-5xl tw:font-bold tw:text-primario ${className}`}
      >
        {nombre.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={origenImagen(imagen)}
      alt={nombre}
      onError={() => setImagenConError(imagen)}
      className={`tw:bg-lila-claro tw:object-contain ${className}`}
    />
  )
}

export default ImagenArticulo
