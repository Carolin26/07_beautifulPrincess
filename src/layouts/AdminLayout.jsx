import { useCallback, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import "./AdminLayout.css"

const enlaces = [
  { to: "/admin/reportes/ventas", etiqueta: "Ventas por periodo" },
  { to: "/admin/reportes/productos", etiqueta: "Productos más vendidos" },
  { to: "/admin/reportes/pedidos", etiqueta: "Listado de pedidos" },
]

// La clave se guarda solo durante la pestaña (sessionStorage). Puede no
// estar disponible (modo privado, almacenamiento bloqueado): en ese caso se
// vuelve a pedir en cada recarga.
const CLAVE_STORAGE = "bp-admin-token"

const leerToken = () => {
  try {
    return sessionStorage.getItem(CLAVE_STORAGE) ?? ""
  } catch {
    return ""
  }
}

const guardarToken = (token) => {
  try {
    if (token) sessionStorage.setItem(CLAVE_STORAGE, token)
    else sessionStorage.removeItem(CLAVE_STORAGE)
  } catch {
    // Sin storage la sesión dura lo que dure el estado de React.
  }
}

const AdminLayout = () => {
  const [token, setToken] = useState(leerToken)
  const [aviso, setAviso] = useState("")
  const [clave, setClave] = useState("")

  const iniciarSesion = (evento) => {
    evento.preventDefault()
    const limpia = clave.trim()
    if (!limpia) return
    guardarToken(limpia)
    setToken(limpia)
    setClave("")
    setAviso("")
  }

  // Los reportes la llaman si la API responde 401 (clave incorrecta).
  // useCallback: usePedidos la tiene como dependencia de su efecto.
  const cerrarSesion = useCallback((mensaje = "") => {
    guardarToken("")
    setToken("")
    setAviso(mensaje)
  }, [])

  return (
    <div className="admin">
      <header className="admin__encabezado">
        <p className="admin__sobretitulo">Beautiful Princess</p>
        <h1 className="admin__titulo">Reportes</h1>
      </header>
      {!token ? (
        <form className="admin__acceso" onSubmit={iniciarSesion}>
          <label className="admin__campo">
            Clave de administrador
            <input
              type="password"
              autoComplete="current-password"
              value={clave}
              onChange={(evento) => setClave(evento.target.value)}
              autoFocus
            />
          </label>
          <button type="submit" className="admin__boton">
            Entrar
          </button>
          {aviso && (
            <p className="admin__aviso" role="alert">
              {aviso}
            </p>
          )}
        </form>
      ) : (
        <>
          <nav className="admin__menu">
            {enlaces.map((enlace) => (
              <NavLink
                key={enlace.to}
                to={enlace.to}
                className={({ isActive }) =>
                  isActive
                    ? "admin__enlace admin__enlace--activo"
                    : "admin__enlace"
                }
              >
                {enlace.etiqueta}
              </NavLink>
            ))}
            <button
              type="button"
              className="admin__enlace admin__salir"
              onClick={() => cerrarSesion()}
            >
              Salir
            </button>
          </nav>
          <div className="admin__contenido">
            <Outlet context={{ token, cerrarSesion }} />
          </div>
        </>
      )}
    </div>
  )
}

export default AdminLayout
