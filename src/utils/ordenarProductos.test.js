import { describe, it, expect } from "vitest"
import { ordenarProductos } from "./ordenarProductos"

const productos = [
  { id: 1, nombre: "Zafiro", precio: 300 },
  { id: 2, nombre: "Amaru", precio: 100 },
  { id: 3, nombre: "Luna", precio: 200 },
]

describe("ordenarProductos", () => {
  it("ordena por precio ascendente", () => {
    const resultado = ordenarProductos(productos, "precio-asc")
    expect(resultado.map((p) => p.id)).toEqual([2, 3, 1])
  })

  it("ordena por precio descendente", () => {
    const resultado = ordenarProductos(productos, "precio-desc")
    expect(resultado.map((p) => p.id)).toEqual([1, 3, 2])
  })

  it("ordena por nombre A-Z", () => {
    const resultado = ordenarProductos(productos, "nombre-asc")
    expect(resultado.map((p) => p.id)).toEqual([2, 3, 1])
  })

  it("no modifica el arreglo original", () => {
    const original = productos.map((p) => p.id)
    ordenarProductos(productos, "precio-asc")
    expect(productos.map((p) => p.id)).toEqual(original)
  })
})
