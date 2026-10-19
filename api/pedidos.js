import { createHash, timingSafeEqual } from "crypto"
import { join } from "path"
import { leerJSON } from "./lib/datosPlanos.js"

const RUTA_CLIENTES = join(process.cwd(), "data", "clientes.json")
const RUTA_PEDIDOS = join(process.cwd(), "data", "pedidos.json")

// Compara los hashes en vez de los textos: timingSafeEqual exige largos
// iguales y así no se filtra el largo del token por el tiempo de respuesta.
const hash = (texto) => createHash("sha256").update(texto).digest()

export function tokenValido(cabecera, esperado) {
  if (!esperado || typeof cabecera !== "string") return false
  const [tipo, token] = cabecera.split(" ")
  if (tipo !== "Bearer" || !token) return false
  return timingSafeEqual(hash(token), hash(esperado))
}

// Devuelve pedidos y clientes para las vistas de /admin/reportes. Se leen
// en cada petición (y no con un import en el frontend) para que los reportes
// muestren los pedidos guardados después del último build, y para que los
// datos de los clientes no queden incrustados en el JS público del sitio.
// Exige "Authorization: Bearer <ADMIN_TOKEN>".
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // Sin ADMIN_TOKEN configurado se niega todo, en vez de dejar los datos
  // abiertos por olvido.
  if (!process.env.ADMIN_TOKEN) {
    return res.status(503).json({ error: "Falta configurar ADMIN_TOKEN" })
  }

  if (!tokenValido(req.headers.authorization, process.env.ADMIN_TOKEN)) {
    return res.status(401).json({ error: "No autorizado" })
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
