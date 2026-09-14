import { useNavigate } from "react-router-dom"
import "./Cart.css"
import Container from "../components/Container/Container"
import Button from "../components/Button/Button"
import { useCarrito } from "../context/useCarrito"
import { formatearPrecio } from "../utils/moneda"

const Cart = () => {
  const navigate = useNavigate()
  const { lineas, total, cambiarCantidad, quitar } = useCarrito()

  if (lineas.length === 0) {
    return (
      <section className="carrito">
        <Container>
          <div className="carrito__vacio">
            <h1 className="carrito__vacio-titulo">Tu carrito está vacío</h1>
            <p className="carrito__vacio-texto">
              Aún no hay nada. Explora nuestras colecciones y encuentra una
              pieza que valga la pena.
            </p>
            <div className="carrito__vacio-accion">
              <Button
                variant="primary"
                onClick={() => navigate("/#collections")}
              >
                Explorar colecciones
              </Button>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="carrito">
      <Container>
        <h1 className="carrito__titulo">Tu carrito</h1>
        <div className="carrito__contenido">
          <h2 className="visualmente-oculto">Artículos</h2>
          <ul className="carrito__lineas">
            {lineas.map(({ producto, cantidad }) => (
              <li key={producto.id} className="linea">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="linea__imagen"
                />
                <div className="linea__info">
                  <h3 className="linea__nombre">{producto.nombre}</h3>
                  <p className="linea__material">{producto.material}</p>
                  <button
                    className="linea__quitar"
                    onClick={() => quitar(producto.id)}
                  >
                    Quitar
                  </button>
                </div>
                <div className="linea__acciones">
                  <div className="linea__stepper">
                    <button
                      className="linea__paso"
                      onClick={() => cambiarCantidad(producto.id, cantidad - 1)}
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span className="linea__cantidad">{cantidad}</span>
                    <button
                      className="linea__paso"
                      onClick={() => cambiarCantidad(producto.id, cantidad + 1)}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <p className="linea__total">
                    {formatearPrecio(producto.precio * cantidad)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <aside className="resumen">
            <h2 className="resumen__titulo">Resumen del pedido</h2>
            <div className="resumen__fila">
              <span className="resumen__etiqueta">Subtotal</span>
              <span className="resumen__valor">{formatearPrecio(total)}</span>
            </div>
            <div className="resumen__fila">
              <span className="resumen__etiqueta">Envío</span>
              <span className="resumen__valor">De cortesía</span>
            </div>
            <div className="resumen__divisor" />
            <div className="resumen__fila resumen__fila--total">
              <span className="resumen__etiqueta">Total</span>
              <span className="resumen__total">{formatearPrecio(total)}</span>
            </div>
            <Button variant="primary" onClick={() => navigate("/checkout")}>
              Pagar
            </Button>
            <Button variant="outline" onClick={() => navigate("/#collections")}>
              Seguir comprando
            </Button>
          </aside>
        </div>
      </Container>
    </section>
  )
}

export default Cart
