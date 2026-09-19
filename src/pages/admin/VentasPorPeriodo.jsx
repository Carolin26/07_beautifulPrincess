import { useState } from "react"
import { ventasPorPeriodo } from "../../utils/agregaciones"
import { formatearPrecio } from "../../utils/moneda"
import pedidos from "../../../data/pedidos.json"
import "./VentasPorPeriodo.css"

function rangoInicial() {
  const hoy = new Date().toISOString().slice(0, 10)
  if (pedidos.length === 0) return { desde: hoy, hasta: hoy }

  const fechas = [...pedidos.map((p) => p.fecha.slice(0, 10))].sort()
  return { desde: fechas[0], hasta: hoy }
}

const VentasPorPeriodo = () => {
  const [desde, setDesde] = useState(() => rangoInicial().desde)
  const [hasta, setHasta] = useState(() => rangoInicial().hasta)

  if (pedidos.length === 0) {
    return (
      <section className="reporte">
        <h1 className="reporte__titulo">Ventas totales por periodo</h1>
        <p className="ventas-periodo__vacio">
          Todavía no hay pedidos cargados.
        </p>
      </section>
    )
  }

  const enRango = ventasPorPeriodo(pedidos, desde, hasta)
  const total = enRango.reduce((suma, pedido) => suma + pedido.total, 0)

  return (
    <section className="reporte">
      <h1 className="reporte__titulo">Ventas totales por periodo</h1>

      <div className="ventas-periodo__filtros">
        <label className="ventas-periodo__campo">
          <span className="ventas-periodo__etiqueta">Desde</span>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
          />
        </label>
        <label className="ventas-periodo__campo">
          <span className="ventas-periodo__etiqueta">Hasta</span>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
          />
        </label>
      </div>

      {enRango.length === 0 ? (
        <p className="ventas-periodo__vacio">
          No hay ventas en el rango seleccionado.
        </p>
      ) : (
        <div className="ventas-periodo__resumen">
          <p className="ventas-periodo__dato">
            <span className="ventas-periodo__dato-titulo">Total vendido</span>
            <strong className="ventas-periodo__dato-valor">
              {formatearPrecio(total)}
            </strong>
          </p>
          <p className="ventas-periodo__dato">
            <span className="ventas-periodo__dato-titulo">Pedidos</span>
            <strong className="ventas-periodo__dato-valor">
              {enRango.length}
            </strong>
          </p>
        </div>
      )}
    </section>
  )
}

export default VentasPorPeriodo
