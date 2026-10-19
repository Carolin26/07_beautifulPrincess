import { describe, it, expect } from "vitest"
import handler from "./pedidos.js"

const respuestaFalsa = () => {
  const res = {}
  res.status = (codigo) => {
    res.codigo = codigo
    return res
  }
  res.json = (cuerpo) => {
    res.cuerpo = cuerpo
    return res
  }
  return res
}

describe("api/pedidos", () => {
  it("rechaza métodos distintos de GET", () => {
    const res = handler({ method: "POST" }, respuestaFalsa())
    expect(res.codigo).toBe(405)
  })

  it("devuelve pedidos y clientes como arreglos", () => {
    const res = handler({ method: "GET" }, respuestaFalsa())
    expect(res.codigo).toBe(200)
    expect(Array.isArray(res.cuerpo.pedidos)).toBe(true)
    expect(Array.isArray(res.cuerpo.clientes)).toBe(true)
  })
})
