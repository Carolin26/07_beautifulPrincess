import pedidos from "../../../data/pedidos.json"
import { productosMasVendidos } from "../../utils/agregaciones"
import { formatearPrecio } from "../../utils/moneda"

const ProductosMasVendidos = () => {
  const top = productosMasVendidos(pedidos, 5)

  return (
    <section>
      <h2>Productos más vendidos</h2>
      {top.length === 0 ? (
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
