import { LuArrowRight } from "react-icons/lu"
import "./Craftsmanship.css"
import Container from "../../components/Container/Container"
import SectionHeading from "../../components/SectionHeading/SectionHeading"
import artesano from "../../assets/images/artesano.jpg"
import { estadisticas } from "../../data/estadisticas"
import { historia } from "../../data/historia"

const Craftsmanship = () => {
  return (
    <section className="craftsmanship" id="craftsmanship">
      <Container>
        <div className="craftsmanship__grid">
          <div className="craftsmanship__columna-imagen">
            <div className="craftsmanship__imagen-contenedor">
              <img
                src={artesano}
                alt="Artesano tallando a mano una pieza de joyería"
                className="craftsmanship__imagen"
              />
            </div>
            <div className="craftsmanship__insignia">
              <span className="craftsmanship__insignia-numero">
                {historia.insignia}
              </span>
              <span className="craftsmanship__insignia-texto">
                {historia.insigniaLinea1}
                <br />
                {historia.insigniaLinea2}
              </span>
            </div>
          </div>
          <div className="craftsmanship__columna-texto">
            <SectionHeading eyebrow="Nuestra historia">
              Hecho con intención,
              <br />
              <em>usado con sentido</em>
            </SectionHeading>
            <p className="craftsmanship__parrafo">{historia.parrafo1}</p>
            <p className="craftsmanship__parrafo">{historia.parrafo2}</p>
            <div className="craftsmanship__estadisticas">
              {estadisticas.map((estadistica) => (
                <div
                  className="craftsmanship__estadistica"
                  key={estadistica.etiqueta}
                >
                  <span className="craftsmanship__estadistica-numero">
                    {estadistica.numero}
                  </span>
                  <span className="craftsmanship__estadistica-etiqueta">
                    {estadistica.etiqueta}
                  </span>
                </div>
              ))}
            </div>
            <a href="#" className="craftsmanship__enlace">
              Nuestro manifiesto
              <LuArrowRight size={12} className="craftsmanship__enlace-icono" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Craftsmanship
