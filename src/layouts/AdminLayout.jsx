import { NavLink, Outlet } from "react-router-dom"
import "./AdminLayout.css"

const enlaces = [
  { to: "/admin/reportes/ventas", etiqueta: "Ventas por periodo" },
  { to: "/admin/reportes/productos", etiqueta: "Productos más vendidos" },
  { to: "/admin/reportes/pedidos", etiqueta: "Listado de pedidos" },
]

const AdminLayout = () => {
  return (
    <div className="admin">
      <header className="admin__encabezado">
        <p className="admin__sobretitulo">Beautiful Princess</p>
        <h1 className="admin__titulo">Reportes</h1>
      </header>
      <nav className="admin__menu">
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.to}
            to={enlace.to}
            className={({ isActive }) =>
              isActive ? "admin__enlace admin__enlace--activo" : "admin__enlace"
            }
          >
            {enlace.etiqueta}
          </NavLink>
        ))}
      </nav>
      <div className="admin__contenido">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
