import { describe, it, expect, beforeEach, afterEach } from "vitest"
import handler, { tokenValido } from "./pedidos.js"

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

const peticion = (authorization) => ({
  method: "GET",
  headers: authorization ? { authorization } : {},
})

describe("api/pedidos", () => {
  let tokenOriginal

  beforeEach(() => {
    tokenOriginal = process.env.ADMIN_TOKEN
    process.env.ADMIN_TOKEN = "secreto-de-prueba"
  })

  afterEach(() => {
    if (tokenOriginal === undefined) delete process.env.ADMIN_TOKEN
    else process.env.ADMIN_TOKEN = tokenOriginal
  })

  it("rechaza métodos distintos de GET", () => {
    const res = handler({ method: "POST", headers: {} }, respuestaFalsa())
    expect(res.codigo).toBe(405)
  })

  it("niega todo si ADMIN_TOKEN no está configurado", () => {
    delete process.env.ADMIN_TOKEN
    const res = handler(peticion("Bearer cualquiera"), respuestaFalsa())
    expect(res.codigo).toBe(503)
  })

  it("responde 401 sin token o con un token incorrecto", () => {
    expect(handler(peticion(), respuestaFalsa()).codigo).toBe(401)
    expect(handler(peticion("Bearer otro"), respuestaFalsa()).codigo).toBe(401)
  })

  it("devuelve pedidos y clientes con el token correcto", () => {
    const res = handler(peticion("Bearer secreto-de-prueba"), respuestaFalsa())
    expect(res.codigo).toBe(200)
    expect(Array.isArray(res.cuerpo.pedidos)).toBe(true)
    expect(Array.isArray(res.cuerpo.clientes)).toBe(true)
  })

  it("tokenValido exige el esquema Bearer", () => {
    expect(tokenValido("secreto", "secreto")).toBe(false)
    expect(tokenValido("Basic secreto", "secreto")).toBe(false)
    expect(tokenValido("Bearer secreto", "secreto")).toBe(true)
    expect(tokenValido("Bearer secreto", undefined)).toBe(false)
  })
})
