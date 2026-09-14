import { useState } from "react"
import "./Checkout.css"
import Container from "../components/Container/Container"
import Button from "../components/Button/Button"
import { useCarrito } from "../context/useCarrito"
import { formatearPrecio } from "../utils/moneda"

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Checkout = () => {
  const { lineas, total } = useCarrito()
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)

  function validar() {
    const nuevos = {}
    if (!nombre.trim()) {
      nuevos.nombre = "Ingresa tu nombre completo"
    }
    if (!correo.trim()) {
      nuevos.correo = "Ingresa tu correo electrónico"
    } else if (!CORREO_VALIDO.test(correo)) {
      nuevos.correo = "Ingresa un correo electrónico válido"
    }
    return nuevos
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevos = validar()
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) {
      return
    }
    setEnviando(true)
    const items = lineas.map(({ producto, cantidad }) => ({
      productoId: producto.id,
      cantidad,
    }))
    try {
      const respuesta = await fetch("/api/crear-sesion-pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, correo }),
      })
      if (!respuesta.ok) {
        throw new Error("payment session failed")
      }
      const { url } = await respuesta.json()
      window.location = url
    } catch {
      setEnviando(false)
      setErrores({ envio: "Algo salió mal. Inténtalo de nuevo." })
    }
  }

  return (
    <section className="pago">
      <Container>
        <div className="pago__banner">
          <span className="pago__banner-modo">Modo demo</span>
          <span className="pago__banner-texto">
            No se procesa un pago real. Usa la tarjeta de prueba 4242 4242 4242
            4242 con cualquier fecha futura y cualquier CVC.
          </span>
        </div>
        <h1 className="pago__titulo">Pagar</h1>
        <div className="pago__contenido">
          <form className="pago__formulario" onSubmit={manejarEnvio} noValidate>
            <p className="pago__eyebrow">Contacto</p>
            <div className="campo">
              <label className="campo__etiqueta" htmlFor="nombre">
                Nombre completo
              </label>
              <input
                id="nombre"
                type="text"
                className={`campo__input${
                  errores.nombre ? " campo__input--error" : ""
                }`}
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
                aria-invalid={errores.nombre ? "true" : undefined}
                aria-describedby={errores.nombre ? "nombre-error" : undefined}
              />
              {errores.nombre && (
                <p className="campo__error" id="nombre-error">
                  {errores.nombre}
                </p>
              )}
            </div>
            <div className="campo">
              <label className="campo__etiqueta" htmlFor="correo">
                Correo
              </label>
              <input
                id="correo"
                type="email"
                className={`campo__input${
                  errores.correo ? " campo__input--error" : ""
                }`}
                value={correo}
                onChange={(evento) => setCorreo(evento.target.value)}
                aria-invalid={errores.correo ? "true" : undefined}
                aria-describedby={errores.correo ? "correo-error" : undefined}
              />
              {errores.correo && (
                <p className="campo__error" id="correo-error">
                  {errores.correo}
                </p>
              )}
            </div>
            {errores.envio && (
              <p className="campo__error" id="envio-error">
                {errores.envio}
              </p>
            )}
            <Button
              variant="primary"
              className="pago__enviar"
              disabled={enviando}
            >
              {enviando ? "Redirigiendo…" : "Pagar con tarjeta"}
            </Button>
          </form>
          <aside className="pago__resumen">
            <p className="pago__eyebrow">Resumen del pedido</p>
            {lineas.map(({ producto, cantidad }) => (
              <div className="pago__fila" key={producto.id}>
                <span className="pago__fila-etiqueta">
                  {producto.nombre} × {cantidad}
                </span>
                <span className="pago__fila-valor">
                  {formatearPrecio(producto.precio * cantidad)}
                </span>
              </div>
            ))}
            <div className="pago__fila">
              <span className="pago__fila-etiqueta">Envío</span>
              <span className="pago__fila-valor">De cortesía</span>
            </div>
            <div className="pago__divisor" />
            <div className="pago__fila pago__fila--total">
              <span className="pago__fila-etiqueta">Total</span>
              <span className="pago__total">{formatearPrecio(total)}</span>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}

export default Checkout
