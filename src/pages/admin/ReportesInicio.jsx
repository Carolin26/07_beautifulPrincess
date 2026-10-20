import { usePedidos } from "../../hooks/usePedidos"
import { resumenGeneral } from "../../utils/agregaciones"
import { formatearPrecio } from "../../utils/moneda"
import EstadoCarga from "./EstadoCarga"

// Portada de /admin/reportes: un resumen de todos los pedidos registrados,
// para tener el panorama antes de entrar a un reporte en detalle.
const ReportesInicio = () => {
  const { pedidos, cargando, error } = usePedidos()
  const { totalVendido, cantidadPedidos, ticketPromedio, ultimoPedido } =
    resumenGeneral(pedidos)

  return (
    <section>
      <h2>Resumen general</h2>
      {cargando || error ? (
        <EstadoCarga error={error} />
      ) : cantidadPedidos === 0 ? (
        <p>Todavía no hay pedidos registrados.</p>
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
          <div>
            <dt>Ticket promedio</dt>
            <dd>{formatearPrecio(ticketPromedio)}</dd>
          </div>
          <div>
            <dt>Último pedido</dt>
            <dd>{new Date(ultimoPedido).toLocaleDateString("es-PE")}</dd>
          </div>
        </dl>
      )}
      <p className="admin__nota">
        Elige un reporte del menú para ver el detalle.
      </p>
    </section>
  )
}

export default ReportesInicio
