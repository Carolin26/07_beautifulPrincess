// Agregaciones sobre pedidos para los reportes del Hito 4. Reciben el
// arreglo de pedidos ya cargado (ver docs/modelo-datos/esquema.md) y
// resuelven la colección de cada línea con shared/catalogo.js.
import { catalogo } from "../../shared/catalogo.js"

const productosPorId = new Map(
  catalogo.map((producto) => [producto.id, producto]),
)

function inicioDelDia(fecha) {
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha)
    ? new Date(`${fecha}T00:00:00.000Z`)
    : new Date(fecha)
}

function finDelDia(fecha) {
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha)
    ? new Date(`${fecha}T23:59:59.999Z`)
    : new Date(fecha)
}

// Agrupa el importe de cada línea por colección. Las líneas cuyo producto no
// está en el catálogo se ignoran porque no se pueden atribuir a ninguna
// colección. Devuelve [{ coleccionId, total }] ordenado de mayor a menor.
export function totalVendidoPorColeccion(pedidos) {
  const totales = new Map()

  for (const pedido of pedidos) {
    for (const item of pedido.items ?? []) {
      const producto = productosPorId.get(item.productoId)
      if (!producto) continue
      const acumulado = totales.get(producto.coleccionId) ?? 0
      totales.set(producto.coleccionId, acumulado + item.importe)
    }
  }

  return [...totales.entries()]
    .map(([coleccionId, total]) => ({ coleccionId, total }))
    .sort((a, b) => b.total - a.total)
}

// Suma las unidades de cada producto y devuelve el top (por defecto 5)
// ordenado de mayor a menor: [{ productoId, nombre, unidades }].
export function productosMasVendidos(pedidos, top = 5) {
  const unidades = new Map()

  for (const pedido of pedidos) {
    for (const item of pedido.items ?? []) {
      if (typeof item.productoId !== "number") continue
      const acumulado = unidades.get(item.productoId) ?? 0
      unidades.set(item.productoId, acumulado + item.cantidad)
    }
  }

  return [...unidades.entries()]
    .map(([productoId, cantidad]) => ({
      productoId,
      nombre:
        productosPorId.get(productoId)?.nombre ?? `Producto ${productoId}`,
      unidades: cantidad,
    }))
    .sort((a, b) => b.unidades - a.unidades)
    .slice(0, top)
}

// Filtra los pedidos cuya fecha cae dentro de [desde, hasta], ambos
// inclusive. desde y hasta aceptan "YYYY-MM-DD" (incluye el día completo)
// o un timestamp ISO.
export function ventasPorPeriodo(pedidos, desde, hasta) {
  const dondeEmpieza = inicioDelDia(desde).getTime()
  const dondeTermina = finDelDia(hasta).getTime()

  return pedidos.filter((pedido) => {
    const momento = new Date(pedido.fecha).getTime()
    return momento >= dondeEmpieza && momento <= dondeTermina
  })
}
