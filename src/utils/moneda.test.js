import { describe, it, expect } from "vitest"
import { formatearPrecio } from "./moneda"

describe("formatearPrecio", () => {
  it("convierte céntimos a soles con el símbolo S/", () => {
    expect(formatearPrecio(45000)).toBe("S/ 450")
  })

  it("separa los miles con coma y no muestra céntimos", () => {
    expect(formatearPrecio(240000)).toBe("S/ 2,400")
    expect(formatearPrecio(12345)).toBe("S/ 123")
  })
})
