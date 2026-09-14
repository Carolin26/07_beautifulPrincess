import { Link } from "react-router-dom"
import "./FeaturedPiece.css"
import Button from "../../components/Button/Button"
import destacadoPomona from "../../assets/images/destacado-pomona.jpg"
import { piezaDestacada } from "../../data/piezaDestacada"
import { productos } from "../../data/productos"
import { formatearPrecio } from "../../utils/moneda"
import { useCarrito } from "../../context/useCarrito"

const FeaturedPiece = () => {
  const { agregar } = useCarrito()
  const producto = productos.find((p) => p.id === piezaDestacada.productoId)

  return (
    <section className="featured-piece">
      <img
        src={destacadoPomona}
        alt="Anillo Pomona Ring, un anillo de oro 18k con un rubí, sobre una granada"
        className="featured-piece__fondo"
      />
      <div className="featured-piece__velo" />
      <div className="featured-piece__contenido">
        <div className="featured-piece__texto">
          <p className="featured-piece__etiqueta">{piezaDestacada.etiqueta}</p>
          <h2 className="featured-piece__titulo">{producto.nombre}</h2>
          <p className="featured-piece__descripcion">
            {piezaDestacada.descripcion}
          </p>
          <p className="featured-piece__precio">
            {formatearPrecio(producto.precio)}
          </p>
          <div className="featured-piece__acciones">
            <Button
              variant="primary"
              onClick={() => agregar(piezaDestacada.productoId)}
            >
              {piezaDestacada.textoAccion}
            </Button>
            <Link to={`/collections/${producto.coleccionId}`}>
              <Button variant="outline">
                {piezaDestacada.textoSecundario}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPiece
