import "./Marquee.css"
import { mensajesMarquee } from "../../data/mensajesMarquee"

const Marquee = () => {
  return (
    <section className="marquee">
      <div className="marquee__pista">
        {Array(8)
          .fill(null)
          .map((_, indice) => (
            <span className="marquee__grupo" key={indice}>
              {mensajesMarquee.map((mensaje) => (
                <span className="marquee__mensaje" key={mensaje}>
                  {mensaje}
                  <span className="marquee__rombo">◆</span>
                </span>
              ))}
            </span>
          ))}
      </div>
    </section>
  )
}

export default Marquee
