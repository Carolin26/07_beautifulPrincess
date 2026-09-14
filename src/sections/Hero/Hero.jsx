import { useState, useEffect, useCallback } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import "./Hero.css"
import Button from "../../components/Button/Button"
import { slidesHero } from "../../data/slidesHero"

const Hero = () => {
  const [slideActual, setSlideActual] = useState(0)

  const siguienteSlide = useCallback(() => {
    setSlideActual((previo) => (previo + 1) % slidesHero.length)
  }, [])

  const slideAnterior = useCallback(() => {
    setSlideActual(
      (previo) => (previo - 1 + slidesHero.length) % slidesHero.length,
    )
  }, [])

  useEffect(() => {
    const temporizador = setInterval(siguienteSlide, 5500)
    return () => clearInterval(temporizador)
  }, [siguienteSlide])

  const slideActivo = slidesHero[slideActual]

  return (
    <section className="hero">
      {slidesHero.map((slide, indice) => (
        <div
          key={slide.id}
          className="hero__diapositiva"
          style={{ opacity: indice === slideActual ? 1 : 0 }}
          aria-hidden={indice !== slideActual}
        >
          <img src={slide.imagen} alt={slide.alt} className="hero__fondo" />
        </div>
      ))}
      <div className="hero__velo" />
      <div className="hero__contenido">
        <p className="hero__etiqueta">{slideActivo.subtitulo}</p>
        <h1 className="hero__titulo">{slideActivo.titulo}</h1>
        <p className="hero__descripcion">{slideActivo.descripcion}</p>
        <div className="hero__accion">
          <Button variant="light">{slideActivo.cta}</Button>
        </div>
      </div>
      <button
        type="button"
        className="hero__flecha hero__flecha--izquierda"
        onClick={slideAnterior}
        aria-label="Slide anterior"
      >
        <LuChevronLeft size={15} />
      </button>
      <button
        type="button"
        className="hero__flecha hero__flecha--derecha"
        onClick={siguienteSlide}
        aria-label="Siguiente slide"
      >
        <LuChevronRight size={15} />
      </button>
      <div className="hero__puntos">
        {slidesHero.map((slide, indice) => (
          <button
            key={slide.id}
            type="button"
            className={`hero__punto ${indice === slideActual ? "hero__punto--activo" : ""}`}
            onClick={() => setSlideActual(indice)}
            aria-label={`Ir al slide ${indice + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
