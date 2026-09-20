// Funciones de agregación sobre pedidos, para los reportes del Hito 4.
// Reciben el arreglo de pedidos ya cargado (no leen archivos ellas mismas).
import { catalogo } from "../../shared/catalogo.js"

// Total vendido (en centavos) por colección, sumando el importe de cada
// línea de cada pedido.
export function totalVendidoPorColeccion(pedidos) {
  const totales = new Map()

  for (const pedido of pedidos) {
    for (const item of pedido.items) {
      const producto = catalogo.find((p) => p.id === item.productoId)
      if (!producto) continue

      const acumulado = totales.get(producto.coleccionId) ?? 0
      totales.set(producto.coleccionId, acumulado + item.importe)
    }
  }

  return [...totales.entries()].map(([coleccionId, total]) => ({
    coleccionId,
    total,
  }))
}

// Los "top" productos más vendidos por cantidad, de mayor a menor.
export function productosMasVendidos(pedidos, top = 5) {
  const conteo = new Map()

  for (const pedido of pedidos) {
    for (const item of pedido.items) {
      const actual = conteo.get(item.productoId) ?? {
        productoId: item.productoId,
        nombre:
          catalogo.find((p) => p.id === item.productoId)?.nombre ??
          "Desconocido",
        cantidad: 0,
        total: 0,
      }
      actual.cantidad += item.cantidad
      actual.total += item.importe
      conteo.set(item.productoId, actual)
    }
  }

  return [...conteo.values()]
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, top)
}

// Total vendido y cantidad de pedidos con fecha entre "desde" y "hasta"
// (ambos inclusive).
export function ventasPorPeriodo(pedidos, desde, hasta) {
  const desdeMs = new Date(desde).getTime()
  const hastaMs = new Date(hasta).getTime()

  const pedidosEnRango = pedidos.filter((pedido) => {
    const fechaMs = new Date(pedido.fecha).getTime()
    return fechaMs >= desdeMs && fechaMs <= hastaMs
  })

  return {
    totalVendido: pedidosEnRango.reduce((suma, p) => suma + p.total, 0),
    cantidadPedidos: pedidosEnRango.length,
  }
}
