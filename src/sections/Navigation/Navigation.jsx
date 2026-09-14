import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { LuMenu, LuShoppingBag, LuX } from "react-icons/lu"
import { useCarrito } from "../../context/useCarrito"
import { enlacesNavegacion as enlaces } from "../../data/enlacesNavegacion"
import "./Navigation.css"

const Navigation = () => {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const [conScroll, setConScroll] = useState(false)

  const { pathname } = useLocation()
  const esHome = pathname === "/"

  const { totalUnidades } = useCarrito()

  useEffect(() => {
    const alScrollear = () => setConScroll(window.scrollY > 80)
    alScrollear()
    window.addEventListener("scroll", alScrollear)
    return () => window.removeEventListener("scroll", alScrollear)
  }, [])

  useEffect(() => {
    if (!menuAbierto) return
    const alTecla = (evento) => {
      if (evento.key === "Escape") {
        setMenuAbierto(false)
      }
    }
    document.addEventListener("keydown", alTecla)
    return () => document.removeEventListener("keydown", alTecla)
  }, [menuAbierto])

  const etiquetaCarrito =
    totalUnidades > 0
      ? `${totalUnidades} ${totalUnidades === 1 ? "artículo" : "artículos"} en el carrito`
      : "Carrito"

  const clases = ["navigation"]
  if (conScroll) {
    clases.push("navigation--con-scroll")
  }
  if (!esHome) {
    clases.push("navigation--interior")
  }

  return (
    <header className={clases.join(" ")}>
      <Link
        to="/"
        className="navigation__logo"
        onClick={() => setMenuAbierto(false)}
      >
        BEAUTIFUL PRINCESS
      </Link>

      <nav className="navigation__enlaces">
        {enlaces.map((enlace) =>
          enlace.destino ? (
            <Link
              key={enlace.texto}
              to={enlace.destino}
              className="navigation__link"
            >
              {enlace.texto}
            </Link>
          ) : (
            <a key={enlace.texto} href="#" className="navigation__link">
              {enlace.texto}
            </a>
          ),
        )}
      </nav>

      <Link
        to="/cart"
        className="navigation__carrito"
        aria-label={etiquetaCarrito}
        onClick={() => setMenuAbierto(false)}
      >
        <LuShoppingBag size={24} />
        {totalUnidades > 0 && (
          <span className="navigation__contador">{totalUnidades}</span>
        )}
      </Link>

      <button
        className="navigation__hamburguesa"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuAbierto}
      >
        {menuAbierto ? <LuX size={20} /> : <LuMenu size={20} />}
      </button>

      {menuAbierto && (
        <div className="navigation__panel-movil">
          {enlaces.map((enlace) =>
            enlace.destino ? (
              <Link
                key={enlace.texto}
                to={enlace.destino}
                className="navigation__link-movil"
                onClick={() => setMenuAbierto(false)}
              >
                {enlace.texto}
              </Link>
            ) : (
              <a
                key={enlace.texto}
                href="#"
                className="navigation__link-movil"
                onClick={() => setMenuAbierto(false)}
              >
                {enlace.texto}
              </a>
            ),
          )}
        </div>
      )}
    </header>
  )
}

export default Navigation
