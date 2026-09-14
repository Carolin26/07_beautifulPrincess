import Stripe from "stripe"
import { catalogo } from "../shared/catalogo.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { items, correo } = req.body

  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return res.status(400).json({ error: "Carrito inválido" })
  }

  const lineItems = []
  for (const { productoId, cantidad } of items) {
    const producto = catalogo.find((p) => p.id === productoId)
    if (!producto) {
      return res.status(400).json({ error: "Producto desconocido" })
    }
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 10) {
      return res.status(400).json({ error: "Cantidad inválida" })
    }
    lineItems.push({
      quantity: cantidad,
      price_data: {
        currency: "usd",
        unit_amount: producto.precio,
        product_data: { name: producto.nombre },
      },
    })
  }

  const origen = req.headers.origin

  try {
    const sesion = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: correo,
      success_url: `${origen}/order/confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origen}/checkout/cancelado`,
    })

    return res.status(200).json({ url: sesion.url })
  } catch (error) {
    console.error("No se pudo crear la sesión de pago:", error.message)
    return res.status(500).json({ error: "No se pudo crear la sesión de pago" })
  }
}
