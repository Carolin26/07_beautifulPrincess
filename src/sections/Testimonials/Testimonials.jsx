import { useState, useEffect } from "react"
import "./Testimonials.css"
import { LuStar } from "react-icons/lu"
import SectionHeading from "../../components/SectionHeading/SectionHeading"
import { testimonios } from "../../data/testimonios"

const Testimonials = () => {
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const temporizador = setInterval(() => {
      setActual((previo) => (previo + 1) % testimonios.length)
    }, 5000)

    return () => clearInterval(temporizador)
  }, [])

  return (
    <section className="testimonios">
      <div className="testimonios__contenedor">
        <SectionHeading eyebrow="Testimonios" align="center">
          <em>Palabras de quienes nos llevan</em>
        </SectionHeading>

        <div className="testimonios__lista">
          {testimonios.map((testimonio, indice) => (
            <div
              key={testimonio.id}
              className="testimonios__item"
              aria-hidden={indice !== actual}
              style={{
                opacity: indice === actual ? 1 : 0,
                position: indice === actual ? "relative" : "absolute",
                pointerEvents: indice === actual ? "auto" : "none",
              }}
            >
              <div className="testimonios__estrellas">
                {Array(testimonio.estrellas)
                  .fill(null)
                  .map((_, i) => (
                    <LuStar
                      key={i}
                      size={11}
                      fill="var(--color-primary)"
                      color="var(--color-primary)"
                    />
                  ))}
              </div>

              <blockquote className="testimonios__cita">
                "{testimonio.cita}"
              </blockquote>

              <p className="testimonios__nombre">{testimonio.nombre}</p>
              <p className="testimonios__rol">{testimonio.rol}</p>
            </div>
          ))}
        </div>

        <div className="testimonios__puntos">
          {testimonios.map((testimonio, indice) => (
            <button
              key={testimonio.id}
              type="button"
              className={`testimonios__punto ${indice === actual ? "testimonios__punto--activo" : ""}`}
              onClick={() => setActual(indice)}
              aria-label={`Ir al testimonio ${indice + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
