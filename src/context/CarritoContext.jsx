import { useEffect, useMemo, useReducer } from "react"
import { productos } from "../data/productos"
import { carritoReducer, estadoInicial } from "./carritoReducer"
import { CarritoContext } from "./useCarrito"

const CLAVE_CARRITO = "carrito"

function buscarProducto(productoId) {
  return productos.find((producto) => producto.id === productoId)
}

function leerAlmacenamiento() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO)
    if (!guardado) {
      return estadoInicial
    }
    const lineas = JSON.parse(guardado)
    if (!Array.isArray(lineas)) {
      return estadoInicial
    }
    return lineas.filter(
      (linea) =>
        buscarProducto(linea.productoId) &&
        Number.isInteger(linea.cantidad) &&
        linea.cantidad > 0,
    )
  } catch {
    return estadoInicial
  }
}

function CarritoProvider({ children }) {
  const [lineas, despachar] = useReducer(
    carritoReducer,
    undefined,
    leerAlmacenamiento,
  )

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lineas))
    } catch {
    }
  }, [lineas])

  const valor = useMemo(() => {
    const lineasConProducto = lineas
      .map((linea) => ({
        ...linea,
        producto: buscarProducto(linea.productoId),
      }))
      .filter((linea) => linea.producto)

    return {
      lineas: lineasConProducto,
      totalUnidades: lineasConProducto.reduce(
        (suma, linea) => suma + linea.cantidad,
        0,
      ),
      total: lineasConProducto.reduce(
        (suma, linea) => suma + linea.producto.precio * linea.cantidad,
        0,
      ),
      agregar: (productoId) => despachar({ tipo: "AGREGAR", productoId }),
      quitar: (productoId) => despachar({ tipo: "QUITAR", productoId }),
      cambiarCantidad: (productoId, cantidad) =>
        despachar({ tipo: "CAMBIAR_CANTIDAD", productoId, cantidad }),
      vaciar: () => despachar({ tipo: "VACIAR" }),
    }
  }, [lineas])

  return (
    <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
  )
}

export default CarritoProvider
