import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

// Trae pedidos y clientes desde /api/pedidos para las vistas de reportes,
// con la clave que AdminLayout guarda en el contexto del Outlet. Con
// `npm run dev` la API no corre (hace falta `vercel dev`), así que la
// petición falla y las vistas muestran el error en lugar de datos vacíos.
export function usePedidos() {
  const { token, cerrarSesion } = useOutletContext()
  const [estado, setEstado] = useState({
    pedidos: [],
    clientes: [],
    cargando: true,
    error: null,
  })

  useEffect(() => {
    let cancelado = false

    const cargar = async () => {
      try {
        const respuesta = await fetch("/api/pedidos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (respuesta.status === 401) {
          if (!cancelado) cerrarSesion("Clave incorrecta.")
          return
        }
        if (!respuesta.ok) {
          const { error } = await respuesta.json().catch(() => ({}))
          throw new Error(error ?? `HTTP ${respuesta.status}`)
        }
        const { pedidos, clientes } = await respuesta.json()
        if (!cancelado) {
          setEstado({ pedidos, clientes, cargando: false, error: null })
        }
      } catch (error) {
        if (!cancelado) {
          setEstado((actual) => ({
            ...actual,
            cargando: false,
            error: error.message,
          }))
        }
      }
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [token, cerrarSesion])

  return estado
}
