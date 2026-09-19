import { NavLink, Outlet } from "react-router-dom"
import "./AdminLayout.css"

const reportes = [
  { ruta: "ventas", etiqueta: "Ventas por periodo" },
  { ruta: "productos", etiqueta: "Productos más vendidos" },
  { ruta: "pedidos", etiqueta: "Listado de pedidos" },
]

const AdminLayout = () => {
  return (
    <div className="admin">
      <aside className="admin__menu">
        <p className="admin__marca">Reportes</p>
        <nav aria-label="Reportes de administración">
          {reportes.map((reporte) => (
            <NavLink
              key={reporte.ruta}
              to={reporte.ruta}
              className={({ isActive }) =>
                isActive
                  ? "admin__enlace admin__enlace--activo"
                  : "admin__enlace"
              }
            >
              {reporte.etiqueta}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="admin__contenido">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
