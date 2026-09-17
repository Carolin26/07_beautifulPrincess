# Modelo Entidad-Relación

Modelo de datos de **Beautiful Princess**: el catálogo, los clientes y los
pedidos de la tienda en línea de joyería.

![Modelo Entidad-Relación](modelo-entidad-relacion.png)

## Archivos incluidos

- [`modelo-entidad-relacion.png`](modelo-entidad-relacion.png) — diagrama
  exportado, listo para ver o imprimir.
- [`modelo-entidad-relacion.svg`](modelo-entidad-relacion.svg) — versión
  editable (vectorial) del mismo diagrama.
- [`er.dbml`](er.dbml) — fuente editable para
  [dbdiagram.io](https://dbdiagram.io) o [draw.io](https://draw.io).

## Entidades

Son 5: **Colección**, **Producto**, **Cliente**, **Pedido** y
**DetallePedido**.

### Colección

| Campo        | Tipo           | Restricción   | Descripción                       |
| ------------ | -------------- | ------------- | --------------------------------- |
| `id`         | `int`          | **PK**, auto  | Identificador de la colección     |
| `slug`       | `varchar(50)`  | `UNIQUE`      | Identificador de URL (`rings`)    |
| `titulo`     | `varchar(100)` | `NOT NULL`    | Nombre visible (`Anillos`)        |
| `descripcion`| `text`         |               | Texto descriptivo de la colección |
| `etiqueta`   | `varchar(60)`  |               | Etiqueta (`Más vendido`, `Nuevo`) |
| `imagen`     | `varchar(255)` | `NOT NULL`    | Ruta o URL de la imagen           |

### Producto

| Campo         | Tipo           | Restricción | Descripción                              |
| ------------- | -------------- | ----------- | ---------------------------------------- |
| `id`          | `int`          | **PK**, auto | Identificador del producto            |
| `nombre`      | `varchar(120)` | `NOT NULL`  | Nombre comercial (`Pomona Ring`)         |
| `precio`      | `int`          | `NOT NULL`  | Precio en **centavos de USD** (`240000`) |
| `descripcion` | `text`         |             | Texto descriptivo del producto           |
| `material`    | `varchar(100)` |             | Material (`Oro 18k, rubí`)               |
| `coleccionId` | `int`          | **FK**      | → `Coleccion.id`                         |
| `imagen`      | `varchar(255)` | `NOT NULL`  | Ruta o URL de la imagen                  |

### Cliente

| Campo    | Tipo           | Restricción   | Descripción             |
| -------- | -------------- | ------------- | ----------------------- |
| `id`     | `int`          | **PK**, auto  | Identificador del cliente |
| `nombre` | `varchar(120)` | `NOT NULL`    | Nombre del cliente      |
| `correo` | `varchar(160)` | `NOT NULL`, `UNIQUE` | Correo del cliente |

### Pedido

| Campo           | Tipo           | Restricción | Descripción                                   |
| --------------- | -------------- | ----------- | --------------------------------------------- |
| `id`            | `int`          | **PK**, auto | Identificador del pedido                   |
| `numeroOrden`   | `varchar(16)`  | `NOT NULL`, `UNIQUE` | Número legible (`BP-XXXXXXXX`)    |
| `clienteId`     | `int`          | **FK**      | → `Cliente.id`                                |
| `fecha`         | `datetime`     | `NOT NULL`  | Fecha y hora del pedido                       |
| `total`         | `int`          | `NOT NULL`  | Total del pedido en centavos de USD           |
| `correoEnviado` | `boolean`      | `NOT NULL`, `default: false` | Si se envió el correo de confirmación |

### DetallePedido

| Campo        | Tipo   | Restricción       | Descripción                                   |
| ------------ | ------ | ----------------- | --------------------------------------------- |
| `pedidoId`   | `int`  | **PK** (compuesta) + **FK** | → `Pedido.id`                      |
| `productoId` | `int`  | **PK** (compuesta) + **FK** | → `Producto.id`                    |
| `cantidad`   | `int`  | `NOT NULL`        | Cantidad de unidades de esa línea             |
| `importe`    | `int`  | `NOT NULL`        | Subtotal de la línea en centavos de USD       |

La clave primaria de `DetallePedido` es **compuesta**: `(pedidoId, productoId)`.

## Integridad referencial

| Relación                                | Tipo                 | Descripción                                        |
| --------------------------------------- | -------------------- | -------------------------------------------------- |
| `Coleccion.id` → `Producto.coleccionId` | 1 a N               | Una colección contiene muchos productos             |
| `Cliente.id` → `Pedido.clienteId`       | 1 a N               | Un cliente genera muchos pedidos                    |
| `Pedido.id` → `DetallePedido.pedidoId`  | 1 a N               | Un pedido tiene muchas líneas de detalle            |
| `Producto.id` → `DetallePedido.productoId` | 1 a N            | Un producto aparece en muchas líneas de detalle     |

## Correlación con los JSON del Hito 2

Los nombres de campo del modelo son exactamente las claves que ya usan los
datos del proyecto, para que los JSON del Hito 2 no tengan que inventar nada:

| Entidad | Campos                                         | Origen en el código                                      |
| ------- | ---------------------------------------------- | -------------------------------------------------------- |
| Colección | `id`, `slug`, `titulo`, `descripcion`, `etiqueta`, `imagen` | `src/data/colecciones.js` |
| Producto | `id`, `nombre`, `precio`, `descripcion`, `material`, `coleccionId`, `imagen` | `shared/catalogo.js` |
| Cliente  | `nombre`, `correo`                             | Checkout: `Checkout.jsx`, `crear-sesion-pago.js`        |
| Pedido   | `numeroOrden`, `clienteId`, `total`, `correoEnviado` | `api/confirmar-orden.js` (`numeroOrden`, `total`, `correoEnviado`) |
| DetallePedido | `productoId`, `cantidad`, `importe`             | Confirmación de orden (`lineas`: `cantidad`, `importe`) |

Nota: los precios y totales se guardan en **centavos de USD** (`int`), tal como
los maneja Stripe y `formatearPrecio` (`importe / 100`).