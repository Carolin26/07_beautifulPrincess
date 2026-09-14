import "./CollectionCard.css"
import { Link } from "react-router-dom"
import Tag from "../Tag/Tag"
import Button from "../Button/Button"

function CollectionCard({ imagen, titulo, piezas, etiqueta, enlace }) {
  return (
    <div className="tarjeta">
      <div className="tarjeta__imagen-contenedor">
        <img src={imagen} alt={titulo} className="tarjeta__imagen" />
        <div className="tarjeta__etiqueta">
          <Tag>{etiqueta}</Tag>
        </div>
        <div className="tarjeta__accion">
          <Link to={enlace} className="tarjeta__enlace">
            <Button variant="light">Explorar</Button>
          </Link>
        </div>
      </div>
      <h3 className="tarjeta__titulo">{titulo}</h3>
      <p className="tarjeta__piezas">{piezas}</p>
    </div>
  )
}

export default CollectionCard
