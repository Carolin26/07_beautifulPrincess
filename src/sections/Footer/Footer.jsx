import "./Footer.css"
import { FaInstagram, FaFacebookF } from "react-icons/fa"
import Container from "../../components/Container/Container"
import { enlacesFooter } from "../../data/enlacesFooter"
import { enlacesLegales } from "../../data/enlacesLegales"

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__columnas">
          <div className="footer__marca">
            <p className="footer__marca-nombre">Beautiful Princess</p>
            <p className="footer__marca-descripcion">
              Joyería hecha a mano para quienes valoran la intención por encima
              del exceso. Hecha en el Perú desde 2016.
            </p>
            <div className="footer__redes">
              <a href="#" aria-label="Instagram" className="footer__red">
                <FaInstagram size={15} />
              </a>
              <a href="#" aria-label="Facebook" className="footer__red">
                <FaFacebookF size={15} />
              </a>
            </div>
          </div>
          {enlacesFooter.map((columna) => (
            <div className="footer__columna" key={columna.titulo}>
              <h3 className="footer__columna-titulo">{columna.titulo}</h3>
              <ul className="footer__enlaces">
                {columna.enlaces.map((enlace) => (
                  <li key={enlace}>
                    <a href="#" className="footer__enlace">
                      {enlace}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__inferior">
          <p className="footer__copyright">
            © 2026 Beautiful Princess. Todos los derechos reservados.
          </p>
          <ul className="footer__legales">
            {enlacesLegales.map((enlace) => (
              <li key={enlace}>
                <a href="#" className="footer__enlace-legal">
                  {enlace}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
