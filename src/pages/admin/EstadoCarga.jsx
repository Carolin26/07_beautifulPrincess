// Mensaje común a los reportes mientras se cargan los pedidos o si falla
// la petición a /api/pedidos.
const EstadoCarga = ({ error }) => {
  if (error) {
    return (
      <p role="alert">
        No se pudieron cargar los pedidos ({error}). Si estás en local, levanta
        el proyecto con <code>vercel dev</code>: con <code>npm run dev</code> la
        API no corre.
      </p>
    )
  }
  return <p>Cargando pedidos…</p>
}

export default EstadoCarga
