export const estadoInicial = []

export function carritoReducer(estado, accion) {
  switch (accion.tipo) {
    case "AGREGAR": {
      const yaEsta = estado.some(
        (linea) => linea.productoId === accion.productoId,
      )
      if (yaEsta) {
        return estado.map((linea) =>
          linea.productoId === accion.productoId
            ? { ...linea, cantidad: linea.cantidad + 1 }
            : linea,
        )
      }
      return [...estado, { productoId: accion.productoId, cantidad: 1 }]
    }
    case "QUITAR":
      return estado.filter((linea) => linea.productoId !== accion.productoId)
    case "CAMBIAR_CANTIDAD": {
      const cantidad = Number(accion.cantidad)
      if (!Number.isInteger(cantidad) || cantidad <= 0) {
        return estado.filter((linea) => linea.productoId !== accion.productoId)
      }
      return estado.map((linea) =>
        linea.productoId === accion.productoId ? { ...linea, cantidad } : linea,
      )
    }
    case "VACIAR":
      return estadoInicial
    default:
      return estado
  }
}
