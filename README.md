# 07_joyeria

![Captura del sitio](docs/captura.png)

**[Ver el sitio en vivo →](https://joyeria-eight.vercel.app/)**

Landing de joyería artesanal hecha con React + Vite. La home tiene las
secciones de hero, colecciones, pieza destacada, artesanía, testimonios y
newsletter, y la tienda vive en sus propias rutas. Proyecto del curso de
Cibertec.

## Tecnologías

| Tecnología   | Para qué                                                                |
| ------------ | ----------------------------------------------------------------------- |
| React 19     | La UI se arma con componentes reutilizables (Button, Tag, Container...) |
| Vite         | Servidor de desarrollo y build, con recarga instantánea al guardar      |
| React Router | Rutas de la tienda (carrito, checkout, detalle) sin recargar la página  |
| CSS puro     | Variables nativas en `variables.css`, sin Tailwind ni preprocesador     |
| react-icons  | Set de iconos SVG ya hechos, en vez de dibujar cada uno a mano          |
| Stripe       | Pasarela de pago del checkout, en modo prueba                           |
| Nodemailer   | Envía el correo de confirmación desde una función serverless            |

## Requisitos

- Node.js 18 o superior
- npm (viene con Node)

## Instalación

```bash
git clone https://github.com/jadx2/07_joyeria.git
cd 07_joyeria
npm install
```

## Comandos

```bash
npm run dev
```

Levanta el servidor de desarrollo (Vite) en `http://localhost:5173`.

```bash
npm run build
```

Genera la versión de producción en `dist/`.

```bash
npm run preview
```

Sirve el `dist/` ya construido para revisarlo en local.

```bash
npm run lint
```

Pasa oxlint sobre el código.

```bash
npm run format
```

Formatea todo con Prettier.

## Pagos con Stripe (modo prueba)

El checkout crea una sesión de pago en una función serverless
(`api/crear-sesion-pago.js`) y redirige a la página de pago que hospeda Stripe.
Todo corre en **modo prueba**: la mecánica es real, el dinero es de mentira.

### Para maquetar: `npm run dev`

Para trabajar la UI, con Vite basta (`npm run dev`). Pero Vite **no ejecuta la
carpeta `api/`**, así que el botón _Pay with Card_ responde 404. Para probar el
pago de punta a punta necesitas la CLI de Vercel, que sirve el sitio y las
funciones juntas.

### Para probar el pago: `vercel dev`

1. Consigue una clave de prueba de Stripe: crea una cuenta en
   `dashboard.stripe.com`, deja **Test mode** encendido y en
   _Developers → API keys_ copia la **Secret key** (`sk_test_…`). La
   _Publishable key_ no se usa.

2. Instala la CLI de Vercel e inicia sesión (una sola vez):

   ```bash
   npm i -g vercel
   vercel login
   ```

3. Enlaza el proyecto. Elige tu **cuenta personal** (plan Hobby, gratis) como
   scope, no un team:

   ```bash
   vercel link
   ```

4. Guarda la clave en el proyecto, en el entorno Development. Es de ahí de donde
   `vercel dev` la lee: una `STRIPE_SECRET_KEY` puesta a mano en `.env.local`
   **no** le llega a la función.

   ```bash
   vercel env add STRIPE_SECRET_KEY development
   ```

   Pega el `sk_test_…` cuando lo pida.

5. Levanta todo:

   ```bash
   vercel dev
   ```

   Abre la URL que te dé (normalmente `http://localhost:3000`), agrega una pieza
   al carrito, ve a _Checkout_ y paga con la tarjeta `4242 4242 4242 4242`,
   cualquier fecha futura y cualquier CVC.

### Notas

- `.env.local` está en `.gitignore` y no se sube nunca; lo gestiona la CLI
  (`vercel env pull` lo regenera desde el proyecto). La clave **no** lleva el
  prefijo `VITE_`, o Vite la publicaría en el bundle del navegador.
- Para el despliegue, agrega la misma clave al entorno Production:
  `vercel env add STRIPE_SECRET_KEY production`, o desde _Settings → Environment
  Variables_ en el dashboard.
- Otras tarjetas de prueba: `4000 0000 0000 0002` rechaza ·
  `4000 0025 0000 3155` pide 3D Secure.
- Si al pagar sale el error de Stripe "Neither apiKey … provided", falta la
  clave en el proyecto: repite el paso 4 y reinicia `vercel dev`.

## Correo de confirmación

Cuando el pago sale bien, la página de confirmación llama a la función
`api/confirmar-orden.js`, que le pregunta a Stripe si esa sesión está pagada y,
si lo está, envía el correo del pedido. El correo sale por SMTP desde una cuenta
de Gmail (SPF y DKIM ya en regla), así que llega a cualquier dirección sin
necesitar un dominio verificado.

Hace falta una contraseña de aplicación de Gmail (no la contraseña normal):

1. Activa la verificación en dos pasos en la cuenta que vaya a enviar.
2. Genera una contraseña de aplicación en
   [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. Guárdala en el proyecto junto con el correo de la cuenta:

   ```bash
   vercel env add GMAIL_USER development
   vercel env add GMAIL_APP_PASSWORD development
   ```

   Igual que la clave de Stripe, estas variables las lee `vercel dev` desde el
   proyecto; ponerlas a mano en `.env.local` no le llega a la función. Para el
   despliegue, repite los dos `vercel env add` con `production`.

### No hay webhooks (a propósito)

El correo se dispara cuando el cliente vuelve a la página de confirmación. Si
paga y cierra la pestaña antes de volver, el correo no sale. Para un proyecto de
curso es aceptable; en producción se escucharía el evento
`checkout.session.completed` de Stripe para enviarlo siempre.

## Estructura

```
src/
  main.jsx              punto de entrada, importa los estilos
  App.jsx               declara las rutas
  layouts/RootLayout    navegación y footer comunes a todas las páginas
  pages/                una página por ruta (Home, Cart, Checkout...)
  components/           componentes reutilizables (Button, Tag, Container...)
  sections/             cada sección de la landing
  data/                 los datos de cada sección (slides, colecciones...)
  assets/images/        las imágenes locales
  styles/               reset.css, variables.css, global.css
```

## Sistema de diseño

Todos los estilos usan variables CSS definidas en `src/styles/variables.css`.
No hardcodear colores ni tamaños: si falta un valor, se agrega ahí primero.

### Colores

| Muestra                                                   | Variable             | Valor                       | Uso                           |
| ---------------------------------------------------------- | -------------------- | --------------------------- | ----------------------------- |
| ![#faf7f2](https://placehold.co/15x15/faf7f2/faf7f2.png)  | `--color-bg`         | `#faf7f2`                   | Fondo general, marfil         |
| ![#efe7d6](https://placehold.co/15x15/efe7d6/efe7d6.png)  | `--color-bg-alt`     | `#efe7d6`                   | Fondo de secciones alternas   |
| ![#1c1a16](https://placehold.co/15x15/1c1a16/1c1a16.png)  | `--color-text`       | `#1c1a16`                   | Texto principal, casi negro   |
| ![#7a6e5f](https://placehold.co/15x15/7a6e5f/7a6e5f.png)  | `--color-text-muted` | `#7a6e5f`                   | Texto secundario, gris cálido |
| ![#b8976a](https://placehold.co/15x15/b8976a/b8976a.png)  | `--color-primary`    | `#b8976a`                   | Oro principal                 |
| ![#c9a96e](https://placehold.co/15x15/c9a96e/c9a96e.png)  | `--color-accent`     | `#c9a96e`                   | Oro claro, para detalles      |
| ![#faf7f2](https://placehold.co/15x15/faf7f2/faf7f2.png)  | `--color-light`      | `#faf7f2`                   | Texto sobre fondo oscuro      |
| ![#b8976a](https://placehold.co/15x15/b8976a/b8976a.png)  | `--color-border`     | `rgba(184, 151, 106, 0.25)` | Bordes sutiles                |

### Tipografías

| Variable         | Fuente           | Uso                        |
| ---------------- | ---------------- | -------------------------- |
| `--font-display` | Playfair Display | Títulos (`h1`, `h2`, `h3`) |
| `--font-body`    | Jost             | Todo el resto del texto    |

### Espaciados

| Variable      | Valor   | Uso                        |
| ------------- | ------- | -------------------------- |
| `--space-xs`  | `8px`   | Espaciado mínimo           |
| `--space-sm`  | `16px`  | Espaciado pequeño          |
| `--space-md`  | `24px`  | Espaciado medio            |
| `--space-lg`  | `40px`  | Espaciado grande           |
| `--space-xl`  | `64px`  | Espaciado extra            |
| `--space-2xl` | `144px` | Separación entre secciones |

### Layout y otros

| Variable          | Valor        | Uso                                                 |
| ----------------- | ------------ | --------------------------------------------------- |
| `--container-max` | `1135px`     | Ancho total (1023 de contenido + 2 × 56 de padding) |
| `--container-pad` | `56px`       | Padding lateral                                     |
| `--transition`    | `300ms ease` | Transición base de la interfaz                      |

## Componentes

| Componente         | Props                                                                        | Dónde se usa                                                                                    |
| ------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `<Button>`         | `variant` (`primary` \| `light`), `onClick`, `type`, `disabled`, `className` | Hero, FeaturedPiece, Newsletter, Cart, Checkout, CheckoutCancelled, NotFound, OrderConfirmation |
| `<Container>`      | `className`                                                                  | Casi todas las secciones y páginas — centra el contenido a 1023px                               |
| `<SectionHeading>` | `eyebrow`, `align` (`left` \| `center`)                                      | Collections, Craftsmanship, Newsletter, Testimonials                                            |
| `<Tag>`            | solo `children`                                                              | CollectionCard                                                                                  |
| `<CollectionCard>` | `imagen`, `titulo`, `piezas`, `etiqueta`, `enlace`                           | Collections                                                                                     |
| `<ProductCard>`    | `imagen`, `nombre`, `material`, `precio`, `onAgregar`                        | CollectionDetail                                                                                |

## Créditos

- **Fotos:** todas de [Unsplash](https://unsplash.com), bajo su licencia de uso
  gratuito. Detalle por foto y autor en
  [`src/assets/images/CREDITOS.md`](src/assets/images/CREDITOS.md).
- **Iconos:** [react-icons](https://react-icons.github.io/react-icons/).
- **Diseño:** wireframe de Figma del curso ("Jewelry HiFi Wireframe").

## Cómo contribuir

Antes de escribir código, lee [CONTRIBUTING.md](CONTRIBUTING.md): convenciones
de nombres, BEM, y el flujo de ramas y PRs.

## Integrantes

| Integrante           | GitHub                                               | Aporte                                                                                                                                                                                                          |
| -------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jaim Delmar (líder)  | [@jadx2](https://github.com/jadx2)                   | Setup del proyecto, sistema de diseño, rutas, estado del carrito, pagos con Stripe, correo de confirmación y despliegue — [issues](https://github.com/jadx2/07_joyeria/issues?q=is%3Aissue+assignee%3Ajadx2)    |
| Joy Carolin Narro Garcia    | [@Carolin26](https://github.com/Carolin26)           | Componentes Tag, SectionHeading y Container, imágenes del proyecto, testimonios y responsive de la tienda — [issues](https://github.com/jadx2/07_joyeria/issues?q=is%3Aissue+assignee%3ACarolin26)              |
| Ratsinller Franco Vilchez   | [@vilchez-lan](https://github.com/vilchez-lan)       | Navegación de escritorio y menú móvil, responsive de navegación, hero y colecciones — [issues](https://github.com/jadx2/07_joyeria/issues?q=is%3Aissue+assignee%3Avilchez-lan)                                  |
| Grace Kelly Davila Santa Cruz | [@GraceKelly1993](https://github.com/GraceKelly1993) | Componentes Button y CollectionCard, Hero, Featured Piece, Footer, Newsletter y responsive del resto de secciones — [issues](https://github.com/jadx2/07_joyeria/issues?q=is%3Aissue+assignee%3AGraceKelly1993) |
| Bethzy Mamani Incahuanaco   | [@Bethzy1994](https://github.com/Bethzy1994)         | Accesibilidad básica y consistencia de hovers y transiciones — [issues](https://github.com/jadx2/07_joyeria/issues?q=is%3Aissue+assignee%3ABethzy1994)                                                          |
