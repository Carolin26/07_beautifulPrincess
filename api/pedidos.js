import { join } from "path"
import { leerJSON } from "./lib/datosPlanos.js"

const RUTA_CLIENTES = join(process.cwd(), "data", "clientes.json")
const RUTA_PEDIDOS = join(process.cwd(), "data", "pedidos.json")

// Devuelve pedidos y clientes para las vistas de /admin/reportes. Se leen
// en cada petición (y no con un import en el frontend) para que los reportes
// muestren los pedidos guardados después del último build, y para que los
// datos de los clientes no queden incrustados en el JS público del sitio.
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    return res.status(200).json({
      pedidos: leerJSON(RUTA_PEDIDOS),
      clientes: leerJSON(RUTA_CLIENTES),
    })
  } catch (error) {
    console.error("No se pudieron leer los pedidos:", error.message)
    return res.status(500).json({ error: "No se pudieron leer los pedidos" })
  }
}
