# Modelo Entidad-Relación

## Cliente

| Campo | Tipo | Restricción | Descripción |
|---------|---------|---------|---------|
| id | integer | PK | Identificador único del cliente |
| nombre | varchar | NOT NULL | Nombre del cliente |
| email | varchar | UNIQUE | Correo electrónico |
| telefono | varchar | | Número telefónico |

---

## Coleccion

| Campo | Tipo | Restricción | Descripción |
|---------|---------|---------|---------|
| id | integer | PK | Identificador único |
| nombre | varchar | NOT NULL | Nombre de la colección |
| descripcion | text | | Descripción de la colección |

---

## Producto

| Campo | Tipo | Restricción | Descripción |
|---------|---------|---------|---------|
| id | integer | PK | Identificador único |
| coleccionId | integer | FK → Coleccion.id | Colección a la que pertenece |
| nombre | varchar | NOT NULL | Nombre del producto |
| descripcion | text | | Descripción del producto |
| precio | decimal | NOT NULL | Precio de venta |
| stock | integer | | Cantidad disponible |

---

## Pedido

| Campo | Tipo | Restricción | Descripción |
|---------|---------|---------|---------|
| id | integer | PK | Identificador único |
| numeroOrden | varchar | NOT NULL | Código de orden |
| fecha | timestamp | | Fecha del pedido |
| clienteId | integer | FK → Cliente.id | Cliente que realizó la compra |
| total | decimal | | Importe total |
| estado | varchar | | Estado del pedido |

---

## DetallePedido

| Campo | Tipo | Restricción | Descripción |
|---------|---------|---------|---------|
| id | integer | PK | Identificador único |
| pedidoId | integer | FK → Pedido.id | Pedido asociado |
| productoId | integer | FK → Producto.id | Producto comprado |
| cantidad | integer | | Cantidad solicitada |
| precioUnitario | decimal | | Precio del producto al momento de la compra |

---

# Relaciones

- Pedido.clienteId → Cliente.id
- Producto.coleccionId → Coleccion.id
- DetallePedido.pedidoId → Pedido.id
- DetallePedido.productoId → Producto.id

# Cardinalidades

- Cliente (1) → (N) Pedido
- Coleccion (1) → (N) Producto
- Pedido (1) → (N) DetallePedido
- Producto (1) → (N) DetallePedido
