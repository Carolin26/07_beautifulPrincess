import { describe, it, expect } from "vitest"
import { carritoReducer, estadoInicial } from "./carritoReducer"

describe("carritoReducer", () => {
  it("agrega un producto a un carrito vacío", () => {
    const estado = carritoReducer(estadoInicial, {
      tipo: "AGREGAR",
      productoId: 1,
    })

    expect(estado).toEqual([{ productoId: 1, cantidad: 1 }])
  })

  it("sube la cantidad de un producto que ya está en vez de duplicar la línea", () => {
    const inicial = [{ productoId: 1, cantidad: 1 }]

    const estado = carritoReducer(inicial, {
      tipo: "AGREGAR",
      productoId: 1,
    })

    expect(estado).toEqual([{ productoId: 1, cantidad: 2 }])
  })

  it("cambia la cantidad de una línea", () => {
    const inicial = [{ productoId: 1, cantidad: 1 }]

    const estado = carritoReducer(inicial, {
      tipo: "CAMBIAR_CANTIDAD",
      productoId: 1,
      cantidad: 4,
    })

    expect(estado).toEqual([{ productoId: 1, cantidad: 4 }])
  })

  it("elimina la línea al bajar la cantidad a 0", () => {
    const inicial = [
      { productoId: 1, cantidad: 2 },
      { productoId: 2, cantidad: 1 },
    ]

    const estado = carritoReducer(inicial, {
      tipo: "CAMBIAR_CANTIDAD",
      productoId: 1,
      cantidad: 0,
    })

    expect(estado).toEqual([{ productoId: 2, cantidad: 1 }])
  })

  it("quita una línea del carrito", () => {
    const inicial = [
      { productoId: 1, cantidad: 2 },
      { productoId: 2, cantidad: 1 },
    ]

    const estado = carritoReducer(inicial, {
      tipo: "QUITAR",
      productoId: 1,
    })

    expect(estado).toEqual([{ productoId: 2, cantidad: 1 }])
  })

  it("vacía el carrito", () => {
    const inicial = [
      { productoId: 1, cantidad: 2 },
      { productoId: 2, cantidad: 1 },
    ]

    const estado = carritoReducer(inicial, { tipo: "VACIAR" })

    expect(estado).toEqual([])
  })

  it("devuelve el mismo estado ante una acción desconocida", () => {
    const inicial = [{ productoId: 1, cantidad: 1 }]

    const estado = carritoReducer(inicial, { tipo: "OTRA_COSA" })

    expect(estado).toBe(inicial)
  })

  it("no muta el estado que recibe al agregar", () => {
    const inicial = [{ productoId: 1, cantidad: 1 }]

    carritoReducer(inicial, { tipo: "AGREGAR", productoId: 1 })

    expect(inicial).toEqual([{ productoId: 1, cantidad: 1 }])
  })
})
