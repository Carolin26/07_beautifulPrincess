import "./SectionHeading.css"

function SectionHeading({ eyebrow, children, align = "left" }) {
  return (
    <div className={`encabezado encabezado--${align}`}>
      <p className="encabezado__etiqueta">{eyebrow}</p>
      <h2 className="encabezado__titulo">{children}</h2>
    </div>
  )
}

export default SectionHeading
