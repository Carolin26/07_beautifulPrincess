import { useState } from "react"
import { usePedidos } from "../../hooks/usePedidos"
import { formatearPrecio } from "../../utils/moneda"
import EstadoCarga from "./EstadoCarga"

// El esquema de pedidos.json no tiene campo "estado" (un pedido solo se
// guarda si el pago fue aprobado, ver ticket #6), así que se muestra
// "Correo enviado" en su lugar, el campo más parecido que existe.
const EXTRACTORES = {
  fecha: (pedido) => new Date(pedido.fecha).getTime(),
  total: (pedido) => pedido.total,
}

const nombreDeCliente = (clientes, clienteId) =>
  clientes.find((cliente) => cliente.id === clienteId)?.nombre ?? "Desconocido"

const ListadoPedidos = () => {
  const [columna, setColumna] = useState("fecha")
  const [direccion, setDireccion] = useState("desc")
  const { pedidos, clientes, cargando, error } = usePedidos()

  const alternarOrden = (columnaClic) => {
    if (columnaClic === columna) {
      setDireccion((actual) => (actual === "asc" ? "desc" : "asc"))
    } else {
      setColumna(columnaClic)
      setDireccion("asc")
    }
  }

  const pedidosOrdenados = [...pedidos].sort((a, b) => {
    const valorA = EXTRACTORES[columna](a)
    const valorB = EXTRACTORES[columna](b)
    return direccion === "asc" ? valorA - valorB : valorB - valorA
  })

  const flecha = (columnaEncabezado) => {
    if (columnaEncabezado !== columna) return ""
    return direccion === "asc" ? " ▲" : " ▼"
  }

  return (
    <section>
      <h2>Listado de pedidos</h2>
      {cargando || error ? (
        <EstadoCarga error={error} />
      ) : pedidos.length === 0 ? (
        <p>Todavía no hay pedidos registrados.</p>
      ) : (
        <table className="admin__tabla">
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  className="admin__orden-columna"
                  onClick={() => alternarOrden("fecha")}
                >
                  Fecha{flecha("fecha")}
                </button>
              </th>
              <th>Cliente</th>
              <th>
                <button
                  type="button"
                  className="admin__orden-columna"
                  onClick={() => alternarOrden("total")}
                >
                  Total{flecha("total")}
                </button>
              </th>
              <th>Correo enviado</th>
            </tr>
          </thead>
          <tbody>
            {pedidosOrdenados.map((pedido) => (
              <tr key={pedido.id}>
                <td>{new Date(pedido.fecha).toLocaleDateString("es-PE")}</td>
                <td>{nombreDeCliente(clientes, pedido.clienteId)}</td>
                <td>{formatearPrecio(pedido.total)}</td>
                <td>{pedido.correoEnviado ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default ListadoPedidos
