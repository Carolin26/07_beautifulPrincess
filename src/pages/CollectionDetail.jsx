import { useParams } from "react-router-dom"
import "./CollectionDetail.css"
import Container from "../components/Container/Container"
import ProductCard from "../components/ProductCard/ProductCard"
import { colecciones } from "../data/colecciones"
import { productos } from "../data/productos"
import { useCarrito } from "../context/useCarrito"
import NotFound from "./NotFound"

const CollectionDetail = () => {
  const { coleccionId } = useParams()
  const { agregar } = useCarrito()

  const id = Number(coleccionId)
  const coleccion = colecciones.find((coleccion) => coleccion.id === id)

  if (!coleccion) {
    return <NotFound />
  }

  const piezas = productos.filter((producto) => producto.coleccionId === id)

  return (
    <section className="coleccion">
      <Container>
        <header className="coleccion__encabezado">
          <p className="coleccion__sobretitulo">Colección</p>
          <h1 className="coleccion__titulo">{coleccion.titulo}</h1>
          <p className="coleccion__descripcion">{coleccion.descripcion}</p>
          <p className="coleccion__conteo">{coleccion.piezas}</p>
        </header>
        <h2 className="visualmente-oculto">Piezas</h2>
        <div className="coleccion__grilla">
          {piezas.map((producto) => (
            <ProductCard
              key={producto.id}
              imagen={producto.imagen}
              nombre={producto.nombre}
              material={producto.material}
              precio={producto.precio}
              onAgregar={() => agregar(producto.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default CollectionDetail
