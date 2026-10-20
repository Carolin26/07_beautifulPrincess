import { useEffect, useState } from "react"

// Trae pedidos y clientes desde /api/pedidos para las vistas de reportes.
// Con `npm run dev` la API no corre (hace falta `vercel dev`), así que la
// petición falla y las vistas muestran el error en lugar de datos vacíos.
export function usePedidos() {
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
        const respuesta = await fetch("/api/pedidos")
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
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
  }, [])

  return estado
}
