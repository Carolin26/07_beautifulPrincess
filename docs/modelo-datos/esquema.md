# Esquema de los archivos planos

Forma exacta de los objetos en `data/clientes.json` y `data/pedidos.json`,
alineada con el [modelo entidad-relación](README.md) y con los nombres de
campo que ya usa `api/confirmar-orden.js`.

## `data/clientes.json`

Arreglo de objetos `Cliente`:

```json
[
  {
    "id": 1,
    "nombre": "Ana Torres",
    "correo": "ana@correo.com"
  }
]
```

| Campo    | Tipo     | Descripción                                             |
| -------- | -------- | ------------------------------------------------------- |
| `id`     | `number` | Identificador incremental, único en el archivo          |
| `nombre` | `string` | Nombre del cliente (de `customer_details.name`)         |
| `correo` | `string` | Correo del cliente, único (de `customer_details.email`) |

## `data/pedidos.json`

Arreglo de objetos `Pedido`, con las líneas de `DetallePedido` anidadas en
`items`:

```json
[
  {
    "id": 1,
    "numeroOrden": "BP-A1B2C3D4",
    "clienteId": 1,
    "fecha": "2026-09-19T15:30:00.000Z",
    "items": [{ "productoId": 3, "cantidad": 1, "importe": 129000 }],
    "total": 129000,
    "correoEnviado": true
  }
]
```

| Campo                | Tipo      | Descripción                                              |
| -------------------- | --------- | -------------------------------------------------------- |
| `id`                 | `number`  | Identificador incremental, único en el archivo           |
| `numeroOrden`        | `string`  | Igual al que genera `numeroDeOrden()` en confirmar-orden |
| `clienteId`          | `number`  | Referencia a `Cliente.id`                                |
| `fecha`              | `string`  | Fecha ISO 8601 en que se confirmó el pedido              |
| `items`              | `array`   | Líneas del pedido (`DetallePedido`)                      |
| `items[].productoId` | `number`  | Referencia a `Producto.id` (`shared/catalogo.js`)        |
| `items[].cantidad`   | `number`  | Cantidad de unidades de esa línea                        |
| `items[].importe`    | `number`  | Subtotal de la línea, en centavos de USD                 |
| `total`              | `number`  | Total del pedido, en centavos de USD                     |
| `correoEnviado`      | `boolean` | Si el correo de confirmación se envió correctamente      |

Nota: `items[].productoId` no existe todavía en la respuesta de Stripe (las
líneas actuales solo traen `nombre`, `cantidad` e `importe`); resolverlo
queda a cargo del ticket #6, que escribe en este archivo.
