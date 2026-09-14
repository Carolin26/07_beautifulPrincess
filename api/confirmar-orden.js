import Stripe from "stripe"
import nodemailer from "nodemailer"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const escapar = (valor) =>
  String(valor).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  )

const esCorreo = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

function numeroDeOrden(sessionId) {
  const limpio = sessionId.replace(/[^a-zA-Z0-9]/g, "")
  return `BP-${limpio.slice(-8).toUpperCase()}`
}

const plantilla = ({ nombre, numeroOrden, lineas, total }) => `
  <div style="font-family: Georgia, serif; color: #1C1A16; background: #FAF7F2; padding: 40px;">
    <h1 style="font-size: 24px; font-weight: normal;">Gracias, ${escapar(nombre)}</h1>
    <p style="color: #7A6E5F; font-size: 13px; letter-spacing: 2px;">PEDIDO ${numeroOrden}</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
      ${lineas
        .map(
          (l) => `<tr>
            <td style="padding: 8px 0;">${escapar(l.nombre)} × ${l.cantidad}</td>
            <td style="padding: 8px 0; text-align: right;">$${(l.importe / 100).toFixed(2)}</td>
          </tr>`,
        )
        .join("")}
    </table>
    <p style="font-size: 20px; margin-top: 24px;">Total $${(total / 100).toFixed(2)}</p>
  </div>
`

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { sessionId } = req.body

  if (!sessionId) {
    return res.status(400).json({ error: "Falta el identificador de sesión" })
  }

  let sesion
  try {
    sesion = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    })
  } catch {
    return res.status(400).json({ error: "Sesión desconocida" })
  }

  if (sesion.payment_status !== "paid") {
    return res.status(402).json({ error: "El pago no se completó" })
  }

  const correo = sesion.customer_details?.email
  const nombre = sesion.customer_details?.name ?? ""
  const numeroOrden = numeroDeOrden(sesion.id)

  const lineas = sesion.line_items.data.map((linea) => ({
    id: linea.id,
    nombre: linea.description,
    cantidad: linea.quantity,
    importe: linea.amount_total,
  }))
  const total = sesion.amount_total

  const resumen = { numeroOrden, correo, lineas, total }

  if (sesion.metadata?.correoEnviado === "1") {
    return res.status(200).json({ ...resumen, correoEnviado: true })
  }

  if (!esCorreo(correo)) {
    return res.status(200).json({ ...resumen, correoEnviado: false })
  }

  try {
    await transporter.sendMail({
      from: `"Beautiful Princess" <${process.env.GMAIL_USER}>`,
      to: correo,
      subject: `Tu pedido ${numeroOrden}`,
      html: plantilla({ nombre, numeroOrden, lineas, total }),
    })
  } catch (error) {
    console.error("Fallo el envio:", error.message)
    return res.status(200).json({ ...resumen, correoEnviado: false })
  }

  try {
    await stripe.checkout.sessions.update(sessionId, {
      metadata: { correoEnviado: "1" },
    })
  } catch (error) {
    console.error("No se pudo marcar la sesion:", error.message)
  }

  return res.status(200).json({ ...resumen, correoEnviado: true })
}
