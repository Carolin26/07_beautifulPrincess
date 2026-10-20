// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import AdminLayout from "../../layouts/AdminLayout"
import ReportesInicio from "./ReportesInicio"
import VentasPorPeriodo from "./VentasPorPeriodo"
import ProductosMasVendidos from "./ProductosMasVendidos"
import ListadoPedidos from "./ListadoPedidos"

const DIA = 24 * 60 * 60 * 1000
const haceDias = (dias) => new Date(Date.now() - dias * DIA).toISOString()

// id 1 = Pomona Ring ($2,400), id 7 = Ñusta Pendant ($1,560), según
// shared/catalogo.js. El pedido 3 queda fuera de los 90 días que Ventas por
// periodo muestra por defecto.
const pedidos = [
  {
    id: 1,
    clienteId: 1,
    fecha: haceDias(1),
    total: 480000,
    items: [{ productoId: 1, cantidad: 2, importe: 480000 }],
    correoEnviado: true,
  },
  {
    id: 2,
    clienteId: 2,
    fecha: haceDias(10),
    total: 156000,
    items: [{ productoId: 7, cantidad: 1, importe: 156000 }],
    correoEnviado: false,
  },
  {
    id: 3,
    clienteId: 1,
    fecha: haceDias(200),
    total: 240000,
    items: [{ productoId: 1, cantidad: 1, importe: 240000 }],
    correoEnviado: true,
  },
]

const clientes = [
  { id: 1, nombre: "Ana Torres", correo: "ana@correo.com" },
  { id: 2, nombre: "Luis Quispe", correo: "luis@correo.com" },
]

const respuesta = (status, cuerpo) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(cuerpo),
  })

const renderAdmin = (ruta = "/admin/reportes") =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/admin/reportes" element={<AdminLayout />}>
          <Route index element={<ReportesInicio />} />
          <Route path="ventas" element={<VentasPorPeriodo />} />
          <Route path="productos" element={<ProductosMasVendidos />} />
          <Route path="pedidos" element={<ListadoPedidos />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

let fetchFalso

beforeEach(() => {
  fetchFalso = vi.fn(() => respuesta(200, { pedidos, clientes }))
  vi.stubGlobal("fetch", fetchFalso)
  sessionStorage.clear()
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe("acceso a /admin/reportes", () => {
  it("pide la clave y no consulta la API sin ella", () => {
    renderAdmin()

    expect(screen.getByLabelText("Clave de administrador")).toBeTruthy()
    expect(screen.queryByText("Resumen general")).toBeNull()
    expect(fetchFalso).not.toHaveBeenCalled()
  })

  it("envía la clave como Bearer y la recuerda en la pestaña", async () => {
    renderAdmin()

    fireEvent.change(screen.getByLabelText("Clave de administrador"), {
      target: { value: "secreto" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }))

    expect(await screen.findByText("Resumen general")).toBeTruthy()
    expect(fetchFalso).toHaveBeenCalledWith("/api/pedidos", {
      headers: { Authorization: "Bearer secreto" },
    })
    expect(sessionStorage.getItem("bp-admin-token")).toBe("secreto")
  })

  it("vuelve al formulario si la API responde 401", async () => {
    sessionStorage.setItem("bp-admin-token", "incorrecta")
    fetchFalso.mockImplementation(() =>
      respuesta(401, { error: "No autorizado" }),
    )
    renderAdmin()

    expect(await screen.findByText("Clave incorrecta.")).toBeTruthy()
    expect(screen.getByLabelText("Clave de administrador")).toBeTruthy()
    expect(sessionStorage.getItem("bp-admin-token")).toBeNull()
  })

  it("«Salir» borra la clave y vuelve al formulario", async () => {
    sessionStorage.setItem("bp-admin-token", "secreto")
    renderAdmin()
    await screen.findByText("Resumen general")

    fireEvent.click(screen.getByRole("button", { name: "Salir" }))

    expect(screen.getByLabelText("Clave de administrador")).toBeTruthy()
    expect(sessionStorage.getItem("bp-admin-token")).toBeNull()
  })

  it("muestra el error de la API, p. ej. si falta ADMIN_TOKEN", async () => {
    sessionStorage.setItem("bp-admin-token", "secreto")
    fetchFalso.mockImplementation(() =>
      respuesta(503, { error: "Falta configurar ADMIN_TOKEN" }),
    )
    renderAdmin()

    const alerta = await screen.findByRole("alert")
    expect(alerta.textContent).toContain("Falta configurar ADMIN_TOKEN")
  })
})

describe("vistas de reportes", () => {
  beforeEach(() => {
    sessionStorage.setItem("bp-admin-token", "secreto")
  })

  it("Resumen general suma todos los pedidos", async () => {
    renderAdmin()

    const resumen = (await screen.findByText("Total vendido")).closest("dl")
    const valor = (etiqueta) =>
      within(resumen).getByText(etiqueta).nextElementSibling.textContent

    expect(valor("Total vendido")).toBe("$8,760")
    expect(valor("Pedidos")).toBe("3")
    expect(valor("Ticket promedio")).toBe("$2,920")
  })

  it("Resumen general avisa si no hay pedidos", async () => {
    fetchFalso.mockImplementation(() =>
      respuesta(200, { pedidos: [], clientes: [] }),
    )
    renderAdmin()

    expect(
      await screen.findByText("Todavía no hay pedidos registrados."),
    ).toBeTruthy()
  })

  it("Ventas por periodo usa los últimos 90 días y responde al filtro", async () => {
    renderAdmin("/admin/reportes/ventas")

    const resumen = (await screen.findByText("Total vendido")).closest("dl")
    expect(within(resumen).getByText("$6,360")).toBeTruthy()
    expect(within(resumen).getByText("2")).toBeTruthy()

    // Desde hace 5 días: solo queda el pedido de ayer.
    fireEvent.change(screen.getByLabelText("Desde"), {
      target: { value: haceDias(5).slice(0, 10) },
    })
    expect(within(resumen).getByText("$4,800")).toBeTruthy()
    expect(within(resumen).getByText("1")).toBeTruthy()
  })

  it("Productos más vendidos ordena por cantidad", async () => {
    renderAdmin("/admin/reportes/productos")

    await screen.findByRole("table")
    const filas = screen.getAllByRole("row").slice(1)
    expect(within(filas[0]).getByText("Pomona Ring")).toBeTruthy()
    expect(within(filas[0]).getByText("3")).toBeTruthy()
    expect(within(filas[1]).getByText("Ñusta Pendant")).toBeTruthy()
  })

  it("Listado de pedidos muestra el cliente y ordena por total", async () => {
    renderAdmin("/admin/reportes/pedidos")

    await screen.findByRole("table")
    const totales = () =>
      screen
        .getAllByRole("row")
        .slice(1)
        .map((fila) => fila.children[2].textContent)

    // Por defecto: fecha descendente (el más reciente primero).
    expect(totales()).toEqual(["$4,800", "$1,560", "$2,400"])
    expect(screen.getByText("Luis Quispe")).toBeTruthy()

    fireEvent.click(screen.getByRole("button", { name: /Total/ }))
    expect(totales()).toEqual(["$1,560", "$2,400", "$4,800"])

    fireEvent.click(screen.getByRole("button", { name: /Total/ }))
    expect(totales()).toEqual(["$4,800", "$2,400", "$1,560"])
  })
})
