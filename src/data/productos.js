import { catalogo } from "../../shared/catalogo.js"
import pomonaRing from "../assets/images/producto-01-pomona-ring.jpg"
import sillarBand from "../assets/images/producto-02-sillar-band.jpg"
import amaruSignet from "../assets/images/producto-03-amaru-signet.jpg"
import quillaSolitaire from "../assets/images/producto-04-quilla-solitaire.jpg"
import intiDomeRing from "../assets/images/producto-05-inti-dome-ring.jpg"
import cordilleraStackingRing from "../assets/images/producto-06-cordillera-stacking-ring.jpg"
import nustaPendant from "../assets/images/producto-07-nusta-pendant.jpg"
import paracasChain from "../assets/images/producto-08-paracas-chain.jpg"
import chakanaLocket from "../assets/images/producto-09-chakana-locket.jpg"
import vicunaCollar from "../assets/images/producto-10-vicuna-collar.jpg"
import lunaNuevaPendant from "../assets/images/producto-11-luna-nueva-pendant.jpg"
import spondylusStrand from "../assets/images/producto-12-spondylus-strand.jpg"
import killaHoops from "../assets/images/producto-13-killa-hoops.jpg"
import filigranaDrops from "../assets/images/producto-14-filigrana-drops.jpg"
import catacaosStuds from "../assets/images/producto-15-catacaos-studs.jpg"
import nazcaDrops from "../assets/images/producto-16-nazca-drops.jpg"
import rodocrositaStuds from "../assets/images/producto-17-rodocrosita-studs.jpg"
import espigaClimbers from "../assets/images/producto-18-espiga-climbers.jpg"
import cuscoCuff from "../assets/images/producto-19-cusco-cuff.jpg"
import urubambaBangle from "../assets/images/producto-20-urubamba-bangle.jpg"
import trenzaBracelet from "../assets/images/producto-21-trenza-bracelet.jpg"
import colcaChainBracelet from "../assets/images/producto-22-colca-chain-bracelet.jpg"
import qeroBeadedBracelet from "../assets/images/producto-23-qero-beaded-bracelet.jpg"
import ayniLinkBracelet from "../assets/images/producto-24-ayni-link-bracelet.jpg"

const imagenesPorProducto = {
  1: pomonaRing,
  2: sillarBand,
  3: amaruSignet,
  4: quillaSolitaire,
  5: intiDomeRing,
  6: cordilleraStackingRing,
  7: nustaPendant,
  8: paracasChain,
  9: chakanaLocket,
  10: vicunaCollar,
  11: lunaNuevaPendant,
  12: spondylusStrand,
  13: killaHoops,
  14: filigranaDrops,
  15: catacaosStuds,
  16: nazcaDrops,
  17: rodocrositaStuds,
  18: espigaClimbers,
  19: cuscoCuff,
  20: urubambaBangle,
  21: trenzaBracelet,
  22: colcaChainBracelet,
  23: qeroBeadedBracelet,
  24: ayniLinkBracelet,
}

export const productos = catalogo.map((producto) => ({
  ...producto,
  imagen: imagenesPorProducto[producto.id],
}))
