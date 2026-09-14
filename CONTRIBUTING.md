# Convenciones

Guía de cómo trabajamos en el proyecto. Léela antes de tu primer PR.

## Stack

- React 19 + Vite, plantilla `react`. Los archivos son `.jsx`.
- CSS puro con variables nativas.
- Sin librería de componentes: `<Button>`, `<Tag>`, `<Container>`, etc. se
  escriben a mano.
- Única dependencia extra para UI: `react-icons` (pack `lu`, los mismos
  iconos de Lucide).
- Rutas con `react-router-dom`: `App.jsx` declara las rutas y
  `layouts/RootLayout.jsx` pone la navegación y el footer que se repiten en
  todas las páginas. Cada página vive en `src/pages/`.

## Nombres

- Los nombres de componentes van en inglés: `<CollectionCard>`, `<Button>`.
- Todo lo demás va en español: variables, funciones, props y clases CSS.
  Por ejemplo `correo`, `setCorreo`, `manejarEnvio`, `slideActual`, y props
  como `imagen`, `titulo`, `piezas`, `etiqueta`.
- El texto visible de la página va en inglés ("Discover Now", "Join Now"):
  es la copy del diseño, no se traduce.
- Un componente por carpeta: `components/Boton/Boton.jsx` + `Boton.css`.
- Los componentes van con `export default`. Se pueden declarar como
  `function Nombre() {}` o como arrow function, a gusto de cada quien.

```jsx
// declaración
function Boton() {
  return <button className="boton">Discover Now</button>
}

export default Boton
```

```jsx
// arrow function
const Boton = () => {
  return <button className="boton">Discover Now</button>
}

export default Boton
```

## Clases CSS: BEM en español

Usamos BEM (Bloque, Elemento, Modificador) y prefijamos siempre con el nombre
del componente. Cada componente estila solo sus propias clases.

- **Bloque**: el componente. `.tarjeta`
- **Elemento**: una parte del bloque, con `__`. `.tarjeta__imagen`,
  `.tarjeta__titulo`
- **Modificador**: una variante, con `--`. `.boton--light`, `.tarjeta--destacada`

Ejemplo:

```jsx
function Tarjeta() {
  return (
    <article className="tarjeta">
      <img className="tarjeta__imagen" src={imagen} alt={titulo} />
      <h3 className="tarjeta__titulo">{titulo}</h3>
    </article>
  )
}
```

```css
.tarjeta {
}

.tarjeta__imagen {
}

.tarjeta__titulo {
}

/* modificador */
.tarjeta--destacada {
}
```

Mal (sin prefijo, no se sabe de qué componente es):

```css
.imagen {
}
.titulo {
}
```

## Estilos

- Cada componente tiene su propio `.css`, importado desde su `.jsx`.
- **Cero colores hardcodeados.** Todo sale de `src/styles/variables.css`. Si un
  valor no existe, se agrega ahí primero.
- `border-radius: 0` en todo el sitio: nada tiene esquinas redondeadas.

## Datos

Los datos de cada sección van en `src/data/` (por ejemplo `slidesHero.js`,
`colecciones.js`), no incrustados en el JSX.

## Responsive

Trabajamos desktop-first con `@media (max-width: ...)`.

- Móvil hasta 767px · Tablet 768–1023px · Escritorio desde 1024px
- Anchos a probar: 375, 768, 1024, 1440
- En móvil el padding lateral baja de 56px a 24px
- Lo más importante a 375px: que no haya scroll horizontal

## Accesibilidad

- Un solo `<h1>` (el título del hero). Secciones `<h2>`, tarjetas `<h3>`, sin
  saltar niveles.
- Etiquetas reales: `<nav>`, `<main>`, `<section>`, `<footer>`.
- Todo botón sin texto lleva `aria-label` (flechas, puntos, hamburguesa, redes).
- `alt` descriptivo en cada imagen; `alt=""` si es decorativa.

## Flujo de trabajo

- Cada issue es una rama y un PR. El PR cierra su issue con `Closes #N`.
- Nunca trabajar sobre `main`. Rama nueva desde `main` actualizado.
- **Nombre de rama: `feature/` + el número del issue.** El #1 va en `feature/1`,
  el #22 en `feature/22`. Sin sufijos.
- Antes de abrir el PR: `npm run build` pasa y la consola del navegador está
  limpia.
- Al abrir el PR, GitHub muestra la plantilla automáticamente: complétala
  (qué hace, link al nodo de Figma, captura y checklist).
