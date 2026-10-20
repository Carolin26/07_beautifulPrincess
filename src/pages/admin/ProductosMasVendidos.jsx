import { usePedidos } from "../../hooks/usePedidos"
import { productosMasVendidos } from "../../utils/agregaciones"
import { formatearPrecio } from "../../utils/moneda"
import EstadoCarga from "./EstadoCarga"

const ProductosMasVendidos = () => {
  const { pedidos, cargando, error } = usePedidos()
  const top = productosMasVendidos(pedidos, 5)

  return (
    <section>
      <h2>Productos más vendidos</h2>
      {cargando || error ? (
        <EstadoCarga error={error} />
      ) : top.length === 0 ? (
        <p>Todavía no hay pedidos registrados.</p>
      ) : (
        <table className="admin__tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad vendida</th>
              <th>Total generado</th>
            </tr>
          </thead>
          <tbody>
            {top.map((item) => (
              <tr key={item.productoId}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{formatearPrecio(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default ProductosMasVendidos
