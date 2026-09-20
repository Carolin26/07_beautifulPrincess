# Justificación del stack: React frente a "HTML5 + CSS3 + JS"

El temario de EFSRT — Desarrollo de Entornos Web pide explícitamente
"aplicando html5 + css3 + js". Beautiful Princess está construido con
React 19 + Vite en vez de HTML5/CSS3/JS "planos", así que vale la pena
dejar explícita la relación entre ambos.

## JSX transpila a HTML5, CSS3 y JavaScript estándar

React no reemplaza a HTML5, CSS3 y JavaScript: los genera. El código JSX
que se escribe en los componentes (`src/components/`, `src/sections/`,
`src/pages/`) se transpila (vía Vite) a llamadas de JavaScript estándar,
que en tiempo de ejecución arman el DOM — el mismo HTML5 que produciría
cualquier página escrita a mano. El navegador nunca ejecuta JSX
directamente: ejecuta el JavaScript resultante, que renderiza HTML5 real.

Lo mismo pasa en el build de producción (`npm run build`): Vite genera un
`index.html`, un bundle `.js` y un bundle `.css` (ver `dist/`), exactamente
los tres archivos que pedía el enunciado — solo que generados por una
herramienta en vez de escritos a mano.

## No se usó ningún framework de CSS

Todo el proyecto usa CSS puro (`src/styles/`, y un archivo `.css` por
componente), con variables nativas definidas en `src/styles/variables.css`
(colores, tipografías, espaciados). No se usó Tailwind, Bootstrap, ni
ningún preprocesador (Sass, Less) — el CSS3 que llega al navegador es el
mismo que se escribió, sin generarse desde una capa de utilidades.

## En síntesis

React + Vite es una forma de organizar y generar HTML5, CSS3 y
JavaScript — no una tecnología distinta a esas tres. Se eligió por:

- Reutilización de componentes (`Button`, `Tag`, `ProductCard`...) en vez
  de repetir el mismo HTML en cada página.
- Manejo de estado (carrito, filtros de los reportes) sin manipular el
  DOM a mano.
- Enrutamiento (React Router) sin recargar la página en cada navegación.

Ninguna de estas ventajas cambia lo que finalmente corre en el
navegador: HTML5, CSS3 y JavaScript, tal como pide el enunciado.
