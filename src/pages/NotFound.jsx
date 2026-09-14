import { Link } from "react-router-dom"
import "./NotFound.css"
import Container from "../components/Container/Container"
import Button from "../components/Button/Button"

const NotFound = () => {
  return (
    <section className="no-encontrado">
      <Container>
        <h1 className="no-encontrado__codigo">404</h1>
        <p className="no-encontrado__texto">La página que buscas no existe.</p>
        <Link to="/">
          <Button variant="outline">Volver al inicio</Button>
        </Link>
      </Container>
    </section>
  )
}

export default NotFound
