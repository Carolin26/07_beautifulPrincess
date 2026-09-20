import { useState } from "react"
import pedidos from "../../../data/pedidos.json"
import { ventasPorPeriodo } from "../../utils/agregaciones"
import { formatearPrecio } from "../../utils/moneda"

const hoy = () => new Date().toISOString().slice(0, 10)
const haceDias = (dias) =>
  new Date(Date.now() - dias * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

const VentasPorPeriodo = () => {
  const [desde, setDesde] = useState(haceDias(90))
  const [hasta, setHasta] = useState(hoy())

  // "hasta" es una fecha sin hora (input type="date"); se extiende al final
  // del día para no excluir pedidos hechos ese mismo día.
  const { totalVendido, cantidadPedidos } = ventasPorPeriodo(
    pedidos,
    desde,
    `${hasta}T23:59:59.999`,
  )

  return (
    <section>
      <h2>Ventas por periodo</h2>
      <div className="admin__filtros">
        <label className="admin__campo">
          Desde
          <input
            type="date"
            value={desde}
            max={hasta}
            onChange={(evento) => setDesde(evento.target.value)}
          />
        </label>
        <label className="admin__campo">
          Hasta
          <input
            type="date"
            value={hasta}
            min={desde}
            onChange={(evento) => setHasta(evento.target.value)}
          />
        </label>
      </div>
      {cantidadPedidos === 0 ? (
        <p>No hay pedidos en ese rango de fechas.</p>
      ) : (
        <dl className="admin__resumen">
          <div>
            <dt>Total vendido</dt>
            <dd>{formatearPrecio(totalVendido)}</dd>
          </div>
          <div>
            <dt>Pedidos</dt>
            <dd>{cantidadPedidos}</dd>
          </div>
        </dl>
      )}
    </section>
  )
}

export default VentasPorPeriodo
