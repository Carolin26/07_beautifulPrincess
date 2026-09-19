import { useParams } from "react-router-dom"
import { useState } from "react"
import "./CollectionDetail.css"
import Container from "../components/Container/Container"
import ProductCard from "../components/ProductCard/ProductCard"
import { colecciones } from "../data/colecciones"
import { productos } from "../data/productos"
import { useCarrito } from "../context/useCarrito"
import { ordenarProductos } from "../utils/ordenarProductos"
import NotFound from "./NotFound"

const CollectionDetail = () => {
  const { coleccionId } = useParams()
  const { agregar } = useCarrito()
  const [orden, setOrden] = useState("precio-asc")

  const id = Number(coleccionId)
  const coleccion = colecciones.find((coleccion) => coleccion.id === id)

  if (!coleccion) {
    return <NotFound />
  }

  const piezas = ordenarProductos(
    productos.filter((producto) => producto.coleccionId === id),
    orden,
  )

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
        <div className="coleccion__barra">
          <label className="coleccion__orden">
            Ordenar por
            <select
              className="coleccion__orden-select"
              value={orden}
              onChange={(evento) => setOrden(evento.target.value)}
            >
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre-asc">Nombre: A-Z</option>
            </select>
          </label>
        </div>
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
