// Genera datos de ejemplo en data/clientes.json y data/pedidos.json, para
// poder probar los reportes del Hito 4 sin tener que pagar de verdad cada
// vez. Usa shared/catalogo.js (no src/data/productos.js) porque ese archivo
// importa imágenes que solo Vite sabe resolver; catalogo.js es el mismo que
// ya usan api/crear-sesion-pago.js y api/confirmar-orden.js.
//
// Reemplaza el contenido completo de ambos archivos cada vez que corre: no
// se acumula si se ejecuta más de una vez. Pensado solo para entorno de
// prueba.

import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { escribirJSON } from "../api/lib/datosPlanos.js"
import { catalogo } from "../shared/catalogo.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const RUTA_CLIENTES = join(__dirname, "..", "data", "clientes.json")
const RUTA_PEDIDOS = join(__dirname, "..", "data", "pedidos.json")

const CLIENTES_DE_PRUEBA = [
  { nombre: "Ana Torres", correo: "ana.torres@correo.com" },
  { nombre: "Bruno Salas", correo: "bruno.salas@correo.com" },
  { nombre: "Carla Injante", correo: "carla.injante@correo.com" },
  { nombre: "Diego Ramos", correo: "diego.ramos@correo.com" },
  { nombre: "Elena Quispe", correo: "elena.quispe@correo.com" },
  { nombre: "Fabricio Núñez", correo: "fabricio.nunez@correo.com" },
]

const CANTIDAD_PEDIDOS = 15
const DIAS_HACIA_ATRAS = 90 // ~3 meses

function numeroDeOrdenAleatorio() {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let codigo = ""
  for (let i = 0; i < 8; i++) {
    codigo += caracteres[Math.floor(Math.random() * caracteres.length)]
  }
  return `BP-${codigo}`
}

function fechaAleatoria() {
  const haceMs =
    Math.floor(Math.random() * DIAS_HACIA_ATRAS) * 24 * 60 * 60 * 1000
  return new Date(Date.now() - haceMs).toISOString()
}

function elegirAlAzar(lista, cantidad) {
  const copia = [...lista]
  const elegidos = []
  for (let i = 0; i < cantidad && copia.length > 0; i++) {
    const indice = Math.floor(Math.random() * copia.length)
    elegidos.push(copia.splice(indice, 1)[0])
  }
  return elegidos
}

function armarPedido(id, clienteId) {
  const productos = elegirAlAzar(catalogo, 1 + Math.floor(Math.random() * 3))
  const items = productos.map((producto) => {
    const cantidad = 1 + Math.floor(Math.random() * 2)
    return {
      productoId: producto.id,
      cantidad,
      importe: producto.precio * cantidad,
    }
  })
  const total = items.reduce((suma, item) => suma + item.importe, 0)

  return {
    id,
    numeroOrden: numeroDeOrdenAleatorio(),
    clienteId,
    fecha: fechaAleatoria(),
    items,
    total,
    correoEnviado: true,
  }
}

function main() {
  const clientes = CLIENTES_DE_PRUEBA.map((cliente, indice) => ({
    id: indice + 1,
    ...cliente,
  }))

  const pedidos = Array.from({ length: CANTIDAD_PEDIDOS }, (_, indice) =>
    armarPedido(indice + 1, clientes[indice % clientes.length].id),
  )

  escribirJSON(RUTA_CLIENTES, clientes)
  escribirJSON(RUTA_PEDIDOS, pedidos)

  console.log(
    `Sembrados ${clientes.length} clientes y ${pedidos.length} pedidos en data/.`,
  )
}

main()
