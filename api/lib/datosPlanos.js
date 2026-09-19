// Utilidades para leer y escribir los archivos planos (JSON) que persisten
// clientes y pedidos (ver docs/modelo-datos/esquema.md).
//
// Las funciones son síncronas a propósito: Node corre en un solo hilo, así
// que un fs.readFileSync/writeFileSync no se interpone con otra llamada a
// estas mismas funciones dentro del mismo proceso, lo que evita que dos
// escrituras seguidas se pisen entre sí.
//
// Límite conocido: en un despliegue serverless (Vercel) cada invocación
// puede correr en una instancia distinta, así que esto no protege contra
// escrituras concurrentes entre procesos separados. Para el alcance de este
// proyecto de curso alcanza.

import { readFileSync, writeFileSync } from "fs"

// Lee y parsea un archivo JSON. Si el archivo no existe todavía, devuelve
// un arreglo vacío en vez de fallar.
export function leerJSON(ruta) {
  try {
    return JSON.parse(readFileSync(ruta, "utf-8"))
  } catch (error) {
    if (error.code === "ENOENT") {
      return []
    }
    throw error
  }
}

// Escribe el arreglo completo en el archivo, reemplazando su contenido.
export function escribirJSON(ruta, datos) {
  writeFileSync(ruta, JSON.stringify(datos, null, 2) + "\n")
}

// Agrega un registro al arreglo del archivo: lee, agrega y vuelve a escribir
// en una sola operación síncrona para que dos llamadas seguidas no se pisen.
export function agregarRegistro(ruta, registro) {
  const datos = leerJSON(ruta)
  datos.push(registro)
  escribirJSON(ruta, datos)
  return datos
}
