import { describe, it, expect } from "vitest"
import {
  totalVendidoPorColeccion,
  productosMasVendidos,
  ventasPorPeriodo,
} from "./agregaciones"

const pedidos = [
  {
    id: 1,
    numeroOrden: "BP-AAAA1111",
    clienteId: 1,
    fecha: "2026-01-10T15:30:00.000Z",
    items: [
      { productoId: 1, cantidad: 2, importe: 480000 },
      { productoId: 7, cantidad: 1, importe: 156000 },
    ],
    total: 636000,
    correoEnviado: true,
  },
  {
    id: 2,
    numeroOrden: "BP-AAAA2222",
    clienteId: 1,
    fecha: "2026-02-20T10:00:00.000Z",
    items: [
      { productoId: 1, cantidad: 2, importe: 480000 },
      { productoId: 13, cantidad: 3, importe: 246000 },
    ],
    total: 726000,
    correoEnviado: true,
  },
  {
    id: 3,
    numeroOrden: "BP-AAAA3333",
    clienteId: 2,
    fecha: "2026-03-05T09:00:00.000Z",
    items: [
      { productoId: 7, cantidad: 1, importe: 156000 },
      { productoId: 19, cantidad: 2, importe: 344000 },
    ],
    total: 500000,
    correoEnviado: true,
  },
]

describe("totalVendidoPorColeccion", () => {
  it("suma el importe de cada línea agrupado por colección", () => {
    const resultado = totalVendidoPorColeccion(pedidos)

    expect(resultado).toEqual([
      { coleccionId: 1, total: 960000 },
      { coleccionId: 4, total: 344000 },
      { coleccionId: 2, total: 312000 },
      { coleccionId: 3, total: 246000 },
    ])
  })

  it("ignora las líneas cuyo producto no está en el catálogo", () => {
    const pedido = {
      id: 9,
      numeroOrden: "BP-AAAA9999",
      clienteId: 3,
      fecha: "2026-04-01T10:00:00.000Z",
      items: [
        { productoId: 1, cantidad: 1, importe: 240000 },
        { productoId: 999, cantidad: 1, importe: 999999 },
      ],
      total: 1239999,
      correoEnviado: true,
    }

    expect(totalVendidoPorColeccion([pedido])).toEqual([
      { coleccionId: 1, total: 240000 },
    ])
  })
})

describe("productosMasVendidos", () => {
  it("devuelve el top ordenado de mayor a menor cantidad de unidades", () => {
    const resultado = productosMasVendidos(pedidos)

    expect(resultado.map((p) => p.unidades)).toEqual([4, 3, 2, 2])
    expect(resultado.map((p) => p.productoId)).toEqual([1, 13, 7, 19])
  })

  it("incluye el nombre del producto para poder mostrarlo", () => {
    const [primero] = productosMasVendidos(pedidos)

    expect(primero.nombre).toBe("Pomona Ring")
  })

  it("respeta el límite top", () => {
    const resultado = productosMasVendidos(pedidos, 2)

    expect(resultado).toHaveLength(2)
    expect(resultado.map((p) => p.productoId)).toEqual([1, 13])
  })
})

describe("ventasPorPeriodo", () => {
  it("filtra los pedidos fuera del rango de fechas", () => {
    const resultado = ventasPorPeriodo(
      pedidos,
      "2026-02-01",
      "2026-02-28T23:59:59.999Z",
    )

    expect(resultado.map((p) => p.id)).toEqual([2])
  })

  it("incluye los extremos del rango", () => {
    const resultado = ventasPorPeriodo(pedidos, "2026-01-10", "2026-03-05")

    expect(resultado).toHaveLength(3)
  })

  it("en una fecha suelta incluye el día completo de hasta", () => {
    const resultado = ventasPorPeriodo(pedidos, "2026-03-05", "2026-03-05")

    expect(resultado.map((p) => p.id)).toEqual([3])
  })

  it("devuelve un arreglo vacío cuando no hay pedidos en el periodo", () => {
    const resultado = ventasPorPeriodo(pedidos, "2027-01-01", "2027-01-31")

    expect(resultado).toEqual([])
  })
})
