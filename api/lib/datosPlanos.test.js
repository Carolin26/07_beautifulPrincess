import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { mkdtempSync, rmSync } from "fs"
import { tmpdir } from "os"
import { join } from "path"
import { leerJSON, escribirJSON, agregarRegistro } from "./datosPlanos.js"

describe("datosPlanos", () => {
  let dir
  let ruta

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "datos-planos-"))
    ruta = join(dir, "pedidos.json")
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it("leerJSON devuelve un arreglo vacío si el archivo no existe todavía", () => {
    expect(leerJSON(ruta)).toEqual([])
  })

  it("agregarRegistro agrega dos registros seguidos sin perder ninguno", () => {
    agregarRegistro(ruta, { id: 1 })
    agregarRegistro(ruta, { id: 2 })

    expect(leerJSON(ruta)).toEqual([{ id: 1 }, { id: 2 }])
  })

  it("escribirJSON reemplaza el contenido completo del archivo", () => {
    escribirJSON(ruta, [{ id: 1 }])
    escribirJSON(ruta, [{ id: 2 }])

    expect(leerJSON(ruta)).toEqual([{ id: 2 }])
  })
})
