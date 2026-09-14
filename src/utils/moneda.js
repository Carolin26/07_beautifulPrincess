const formateador = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatearPrecio(centimos) {
  return formateador.format(centimos / 100)
}
