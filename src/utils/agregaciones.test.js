import { describe, it, expect } from "vitest"
import {
  totalVendidoPorColeccion,
  productosMasVendidos,
  ventasPorPeriodo,
} from "./agregaciones"

// id 1 = Pomona Ring (colección 1), id 7 = Ñusta Pendant (colección 2),
// según shared/catalogo.js.
const pedidos = [
  {
    id: 1,
    fecha: "2026-06-10T00:00:00.000Z",
    total: 480000,
    items: [{ productoId: 1, cantidad: 2, importe: 480000 }],
  },
  {
    id: 2,
    fecha: "2026-07-01T00:00:00.000Z",
    total: 156000,
    items: [{ productoId: 7, cantidad: 1, importe: 156000 }],
  },
  {
    id: 3,
    fecha: "2026-08-15T00:00:00.000Z",
    total: 240000,
    items: [{ productoId: 1, cantidad: 1, importe: 240000 }],
  },
]

describe("totalVendidoPorColeccion", () => {
  it("suma el importe por colección", () => {
    const resultado = totalVendidoPorColeccion(pedidos)

    expect(resultado).toEqual(
      expect.arrayContaining([
        { coleccionId: 1, total: 720000 },
        { coleccionId: 2, total: 156000 },
      ]),
    )
  })
})

describe("productosMasVendidos", () => {
  it("devuelve la lista ordenada de mayor a menor cantidad", () => {
    const resultado = productosMasVendidos(pedidos, 5)

    expect(resultado[0]).toMatchObject({
      productoId: 1,
      nombre: "Pomona Ring",
      cantidad: 3,
      total: 720000,
    })
    expect(resultado[1]).toMatchObject({ productoId: 7, cantidad: 1 })
  })

  it("respeta el límite top", () => {
    expect(productosMasVendidos(pedidos, 1)).toHaveLength(1)
  })
})

describe("ventasPorPeriodo", () => {
  it("filtra correctamente los pedidos fuera del rango de fechas", () => {
    const resultado = ventasPorPeriodo(
      pedidos,
      "2026-07-01T00:00:00.000Z",
      "2026-08-31T23:59:59.999Z",
    )

    expect(resultado).toEqual({ totalVendido: 396000, cantidadPedidos: 2 })
  })

  it("devuelve cero pedidos si ninguno cae en el rango", () => {
    const resultado = ventasPorPeriodo(
      pedidos,
      "2026-01-01T00:00:00.000Z",
      "2026-01-31T23:59:59.999Z",
    )

    expect(resultado).toEqual({ totalVendido: 0, cantidadPedidos: 0 })
  })
})
