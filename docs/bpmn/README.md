# Modelado de Procesos (BPMN)

Proceso de negocio: **Compra en línea de joyería**.

![Diagrama BPMN del proceso de compra](proceso-compra.png)

## Archivos incluidos

- [`proceso-compra.png`](proceso-compra.png) — diagrama exportado, listo para ver o imprimir.
- [`proceso-compra.bpm`](proceso-compra.bpm) — archivo fuente editable en [Bizagi Modeler](https://www.bizagi.com/es/plataforma/modeler).

## Carriles

- **Cliente**: accede a la aplicación, explora el catálogo, selecciona productos y los agrega al carrito, revisa su selección (con opción de editarla), ingresa sus datos y paga (o elige un método de pago alternativo si el primero es rechazado).
- **Sistema**: registra el pedido una vez que el pago fue aprobado.
- **Pasarela de pago**: procesa el pago y evalúa si fue aprobado.
- **Servicio de correo**: envía el correo de confirmación al finalizar.

## Compuertas de decisión

- **¿Desea otro producto?**: si el cliente quiere seguir comprando, vuelve a explorar el catálogo antes de revisar su selección.
- **¿Es conforme?**: si el cliente no está conforme con su selección, puede editarla antes de continuar.
- **¿Pago aprobado?**: si el pago es rechazado, el cliente puede ingresar un método de pago alternativo y reintentar; si es aprobado, el sistema registra el pedido y el correo de confirmación cierra el proceso.
