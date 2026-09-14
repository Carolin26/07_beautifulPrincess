import { productos } from "./productos.js"
import anillos from "../assets/images/coleccion-anillos.jpg"
import collares from "../assets/images/coleccion-collares.jpg"
import aretes from "../assets/images/coleccion-aretes.jpg"
import pulseras from "../assets/images/coleccion-pulseras.jpg"

function contarPiezas(coleccionId) {
  const piezas = productos.filter(
    (producto) => producto.coleccionId === coleccionId,
  )
  return `${piezas.length} piezas`
}

export const colecciones = [
  {
    id: 1,
    slug: "rings",
    titulo: "Anillos",
    descripcion:
      "Piedras engastadas a mano en oro 18k reciclado. Cada anillo se termina en nuestro taller de Lima y tarda cuatro semanas.",
    piezas: contarPiezas(1),
    imagen: anillos,
    etiqueta: "Más vendido",
  },
  {
    id: 2,
    slug: "necklaces",
    titulo: "Collares",
    descripcion:
      "Cadenas y dijes cerrados eslabón por eslabón, tallados de piedras únicas comerciadas en esta costa desde hace generaciones.",
    piezas: contarPiezas(2),
    imagen: collares,
    etiqueta: "Nuevo",
  },
  {
    id: 3,
    slug: "earrings",
    titulo: "Aretes",
    descripcion:
      "Filigrana tejida hilo por hilo en la tradición de Catacaos, tan livianos que olvidas que los llevas.",
    piezas: contarPiezas(3),
    imagen: aretes,
    etiqueta: "Edición limitada",
  },
  {
    id: 4,
    slug: "bracelets",
    titulo: "Pulseras",
    descripcion:
      "Brazaletes y aros martillados a mano hasta que la superficie guarda la luz de los Andes.",
    piezas: contarPiezas(4),
    imagen: pulseras,
    etiqueta: "Clásico",
  },
]
