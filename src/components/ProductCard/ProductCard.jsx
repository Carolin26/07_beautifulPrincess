import "./ProductCard.css"
import Button from "../Button/Button"
import { formatearPrecio } from "../../utils/moneda"

function ProductCard({ imagen, nombre, material, precio, onAgregar }) {
  return (
    <div className="producto">
      <img src={imagen} alt={nombre} className="producto__imagen" />
      <h3 className="producto__nombre">{nombre}</h3>
      <p className="producto__material">{material}</p>
      <p className="producto__precio">{formatearPrecio(precio)}</p>
      <div className="producto__accion">
        <Button variant="primary" onClick={onAgregar}>
          Añadir al carrito
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
