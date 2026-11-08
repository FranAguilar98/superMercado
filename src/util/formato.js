// Muestra un número como precio en pesos chilenos: 1590 -> $1.590
export const formatearPrecio = (precio) => `$${precio.toLocaleString('es-CL')}`
