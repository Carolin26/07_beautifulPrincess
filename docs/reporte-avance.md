# Reporte de avance de issues

Estado del proyecto **Beautiful Princess** a partir de los issues y pull
requests del repositorio `Carolin26/07_beautifulPrincess` (fecha del reporte:
19/10/2026).

## Resumen general

| Métrica                   | Cantidad |
| ------------------------- | -------- |
| PRs mergeados             | 19       |
| Issues cerradas por su PR | 16       |
| PR cerrado sin merge      | 1        |
| **Issues abiertas**       | **0**    |

## Avance por hito

| Hito                              | Issues             | Avance |
| --------------------------------- | ------------------ | ------ |
| Hito 1 — Modelado (BPMN + datos)  | #1, #2, #3         | 3/3    |
| Hito 2 — Persistencia plana       | #4, #5, #6, #7     | 4/4    |
| Hito 3 — Consultas                | #8, #9             | 2/2    |
| Hito 4 — Reportes en línea        | #10, #11, #12, #13 | 4/4    |
| Hito 5 — Documentación de entrega | #14, #15, #16      | 3/3    |

Los 5 hitos están completos.

## Verificación técnica

- `npm run build`: compila sin errores.
- `npm test`: 25/25 tests pasan (5 archivos).
- `npm run lint` (oxlint): sin advertencias.

## PRs mergeados

| PR  | Ticket | Descripción                                                                           |
| --- | ------ | ------------------------------------------------------------------------------------- |
| #18 | #1     | Diagrama BPMN del proceso de compra                                                   |
| #19 | #2     | Modelo entidad-relación completo                                                      |
| #20 | #3     | Documentación del modelo de datos y persistencia                                      |
| #21 | #4     | `data/clientes.json` y `data/pedidos.json`                                            |
| #22 | #1     | Reemplazo del BPMN por el diagrama real de leslie (Bizagi)                            |
| #23 | #5     | Módulo de acceso a datos (leer/escribir JSON)                                         |
| #24 | #6     | Guardar el pedido al confirmar el pago                                                |
| #25 | #7     | Seed de datos de prueba (`npm run seed`)                                              |
| #26 | #8     | Ordenamiento del catálogo                                                             |
| #27 | #9     | Funciones de agregación sobre pedidos                                                 |
| #28 | #10    | Ruta base `/admin/reportes` y layout                                                  |
| #29 | #12    | Vista Productos más vendidos                                                          |
| #30 | #11    | Vista Ventas por periodo                                                              |
| #31 | #14    | Justificación de React frente a HTML5+CSS3+JS                                         |
| #32 | #13    | Vista Listado de pedidos ordenable                                                    |
| #33 | #16    | Manual de usuario para el cliente final (`docs/manual-usuario.md`)                    |
| #34 | #15    | Informe de Proyecto, Anexo 4 (`docs/informe-proyecto.md`)                             |
| #35 | #15    | Corrección de integrantes en el Informe (Ratsinller Vilchez reemplaza a Ylan Cardozo) |
| #36 | #15    | `.gitattributes`: saltos de línea fijados en LF                                       |

## Notas

- El PR #17 («Create modelo-entidad-relacion.md») se cerró sin merge; quedó
  superado por el PR #19. No representa trabajo perdido.
- El proyecto se encuentra al día en `main` (último commit mergeado `c1a3a58`).
- Para probar el pago de punta a punta hay que usar `vercel dev` con
  `STRIPE_SECRET_KEY` configurada (ver README, sección «Pagos con Stripe»);
  con `npm run dev` la API no corre y el checkout muestra «Algo salió mal».
