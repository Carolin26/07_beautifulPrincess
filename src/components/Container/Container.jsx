import "./Container.css"

function Container({ children, className = "" }) {
  return <div className={`contenedor ${className}`}>{children}</div>
}

export default Container
