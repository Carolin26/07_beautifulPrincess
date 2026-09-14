import { Link } from "react-router-dom"
import "./CheckoutCancelled.css"
import Container from "../components/Container/Container"
import Button from "../components/Button/Button"

const CheckoutCancelled = () => {
  return (
    <section className="cancelado">
      <Container>
        <p className="cancelado__eyebrow">Pago</p>
        <h1 className="cancelado__titulo">Pago cancelado</h1>
        <p className="cancelado__texto">
          No se realizó ningún cargo. Tu carrito está exactamente como lo
          dejaste.
        </p>
        <div className="cancelado__acciones">
          <Link to="/cart">
            <Button variant="primary">Volver al carrito</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Seguir comprando</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default CheckoutCancelled
