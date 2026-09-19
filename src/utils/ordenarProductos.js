// Devuelve una copia de "productos" ordenada según "criterio". No modifica
// el arreglo original.
export function ordenarProductos(productos, criterio) {
  const copia = [...productos]

  switch (criterio) {
    case "precio-asc":
      return copia.sort((a, b) => a.precio - b.precio)
    case "precio-desc":
      return copia.sort((a, b) => b.precio - a.precio)
    case "nombre-asc":
      return copia.sort((a, b) => a.nombre.localeCompare(b.nombre))
    default:
      return copia
  }
}
