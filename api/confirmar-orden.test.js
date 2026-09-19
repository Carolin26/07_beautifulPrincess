import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { mkdtempSync, rmSync } from "fs"
import { tmpdir } from "os"
import { join } from "path"
import { leerJSON } from "./lib/datosPlanos.js"

// El módulo crea el cliente de Stripe al importarse, y falla si no hay
// API key. En los tests no llamamos a Stripe de verdad, así que basta con
// una key de prueba para que el import no explote.
process.env.STRIPE_SECRET_KEY ??= "sk_test_dummy"

const { guardarPedido, numeroDeOrden } = await import("./confirmar-orden.js")

describe("confirmar-orden", () => {
  let dir
  let rutaClientes
  let rutaPedidos

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "confirmar-orden-"))
    rutaClientes = join(dir, "clientes.json")
    rutaPedidos = join(dir, "pedidos.json")
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  const pedidoDePrueba = (overrides = {}) => ({
    correo: "ana@correo.com",
    nombre: "Ana Torres",
    numeroOrden: "BP-TEST0001",
    lineas: [
      { id: "li_1", nombre: "Pomona Ring", cantidad: 1, importe: 240000 },
    ],
    total: 240000,
    correoEnviado: true,
    ...overrides,
  })

  it("guarda un pedido nuevo con todos los campos, resolviendo el productoId por nombre", () => {
    guardarPedido(pedidoDePrueba(), { rutaClientes, rutaPedidos })

    const pedidos = leerJSON(rutaPedidos)
    expect(pedidos).toHaveLength(1)
    expect(pedidos[0]).toMatchObject({
      numeroOrden: "BP-TEST0001",
      total: 240000,
      correoEnviado: true,
      items: [{ productoId: 1, cantidad: 1, importe: 240000 }],
    })

    expect(leerJSON(rutaClientes)).toEqual([
      { id: 1, nombre: "Ana Torres", correo: "ana@correo.com" },
    ])
  })

  it("no duplica el pedido si se llama dos veces con el mismo numeroOrden", () => {
    guardarPedido(pedidoDePrueba({ correoEnviado: false }), {
      rutaClientes,
      rutaPedidos,
    })
    guardarPedido(pedidoDePrueba({ correoEnviado: true }), {
      rutaClientes,
      rutaPedidos,
    })

    const pedidos = leerJSON(rutaPedidos)
    expect(pedidos).toHaveLength(1)
    expect(pedidos[0].correoEnviado).toBe(true)
  })

  it("reusa el mismo cliente si el correo ya existe", () => {
    guardarPedido(pedidoDePrueba({ numeroOrden: "BP-TEST0001" }), {
      rutaClientes,
      rutaPedidos,
    })
    guardarPedido(pedidoDePrueba({ numeroOrden: "BP-TEST0002" }), {
      rutaClientes,
      rutaPedidos,
    })

    expect(leerJSON(rutaClientes)).toHaveLength(1)
    expect(leerJSON(rutaPedidos)).toHaveLength(2)
  })

  it("numeroDeOrden genera un código BP- de 8 caracteres en mayúscula", () => {
    expect(numeroDeOrden("cs_test_abc123XYZ")).toMatch(/^BP-[A-Z0-9]{8}$/)
  })
})
