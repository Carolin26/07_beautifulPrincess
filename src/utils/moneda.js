// Soles peruanos, p. ej. "S/ 450". El espacio tras "S/" es no separable
// (U+00A0), así que el símbolo nunca queda solo al final de una línea.
const formateador = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatearPrecio(centimos) {
  return formateador.format(centimos / 100)
}
