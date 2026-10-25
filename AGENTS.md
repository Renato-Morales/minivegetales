# Mini Vegetales — landing page: contexto para agentes IA

Notas vivas del proyecto para que cualquier sesión de Code Puppy (u otro
agente IA) retome contexto rápido sin tener que redescubrir todo de cero.
Actualizar esto cuando algo cambie de forma relevante.

## Qué es esto

Landing estática (sin build step, sin framework) para **Mini Vegetales**,
granja vertical de microgreens en Santiago, La Reina. Sin carrito — el
flujo de venta es "escribinos por WhatsApp".

- **Stack**: HTML/CSS/JS vanilla puro. Nada de npm/bundlers para el sitio
  en sí (sí existe wrangler como devDependency de Cloudflare, ver abajo).
- **Archivos clave**: `index.html`, `styles.css`, `script.js`,
  `products-data.js` (datos de productos, separado de `script.js` para
  mantenerlo legible), `assets/` (imágenes).

## Deploy — IMPORTANTE, dos repos de verdad

- **GitHub**: `github.com/Renato-Morales/minivegetales` (rama `main`).
- **Cloudflare Pages**: proyecto `minivegetales`, dominio
  `minivegetales.pages.dev`.
- Desde el **23/oct/2026 quedó conectado Git → Cloudflare Pages**
  (auto-deploy). Antes de esa fecha el deploy era 100% manual vía
  `npx wrangler pages deploy .` y pushear a GitHub no hacía nada en
  producción (nos comimos ese error una vez — confirmar con
  `npx wrangler pages project list`, columna "Git Provider" debe decir
  `Yes`).
- Flujo actual: `git push origin main` alcanza. Cloudflare buildea solo.
- Si alguna vez la columna "Git Provider" vuelve a decir `No`, hay que
  hacer `npx wrangler pages deploy .` a mano además del push.
- **Siempre verificar el deploy comparando bytes** entre lo local y lo
  público antes de dar algo por "ya está arriba":
  `curl -s https://minivegetales.pages.dev/index.html | diff - index.html`
  (y lo mismo para los assets nuevos — revisar `content-type` de la
  respuesta, Cloudflare Pages devuelve 200 con `text/html` de fallback
  para rutas que NO existen, así que un 200 no siempre significa éxito).

## Cache-busting

`index.html` referencia `styles.css?v=3`, `script.js?v=3` y
`products-data.js?v=3`. **Bumpear ese `?v=` cada vez que se edite
cualquiera de esos tres archivos.** Se agregó porque sospechamos que
proxies de datos de redes móviles (ej. Chrome Android Data Saver) pueden
servir una copia vieja cacheada ignorando `Cache-Control`, dejando
features nuevas (como la sección de flores) sin JS actualizado en
algunos celulares. No confirmado 100% como causa raíz, pero es mitigación
estándar y gratis.

## Features principales

- Hero con canvas de partículas (`#fx-canvas`, se apaga con `prefers-reduced-motion`),
  reveal-on-scroll (`[data-reveal]` + `IntersectionObserver`). El CSS solo oculta
  `[data-reveal]` si `<html>` tiene la clase `js` (la agrega un script inline en el
  `<head>`), así el contenido nunca queda invisible si el JS falla o queda en caché viejo.
- Catálogo: cuadrículas estáticas de tarjetas con foto (`.catalog-grid` > `button.product-card`
  con `data-product`), escritas directo en `index.html` (sin depender de JS para verse).
  Reemplazan los antiguos marquees. Productos sin foto (`"image": null`) muestran un
  recuadro de color (`--swatch`).
- Modal de detalle de producto al tocar una tarjeta: foto + descripción + "Ideal para" +
  botón de WhatsApp con mensaje prearmado. Datos en `PRODUCT_DETAILS` (`products-data.js`),
  con `label` (nombre con tildes), `description`, `uses` e `image`. Foco atrapado dentro
  del modal mientras está abierto.
- Se quitaron los claims de salud de las descripciones (riesgo legal y poco serio para
  cocinas profesionales); ahora hablan de sabor, color y usos en el plato.

## Design tokens (styles.css, bloque `:root`)

Todo valor visual repetido vive como variable CSS; no hardcodear colores ni medidas nuevas.

- **Colores**: canales `--lime-rgb`, `--pink-rgb`, `--cyan-rgb`, `--violet-rgb`, `--bg-rgb`,
  `--white-rgb` para transparencias: `rgb(var(--lime-rgb) / 0.35)`. `--lime`, `--bg`, etc. son
  el color pleno. Pendiente: renombrar por rol (`--accent`, `--accent-2`, `--flowers`).
- **Tipografía**: escala `--fs-xs … --fs-3xl`, más `--fs-h2` y `--fs-display` (fluidos).
- **Espaciado**: grilla de 4 px, `--sp-N` = N × 4 px (p. ej. `--sp-6` = 24 px).
- **Radios**: `--radius-xs / -sm / --radius / -lg / -pill / -round`.
- **Sombras y brillos**: `--glow-md`, `--glow-lg`, `--glow-ambient`, `--shadow-modal`,
  `--text-glow-lime`, `--text-glow-pink`, `--overlay`. Los brillos de puntos decorativos
  (3 o 4) quedan literales a propósito.
- **Movimiento**: `--dur-fast` (.25 s), `--dur-base` (.3 s), `--dur-slow` (.7 s).
- `script.js` dibuja las partículas con el lima en `rgba(166, 255, 77, …)` literal (canvas no
  lee variables CSS); si cambia el acento, actualizarlo ahí también.

## Pendiente / a medio terminar

- **Productos sin foto o con foto equivocada** (`"image": null`): Acelga roja y Albahaca
  (antes usaban la foto del rábano), y las flores de abajo.
- **Flores sin foto real todavía** (quedan con placeholder de color en
  el modal, `"image": null` en `products-data.js`):
  - Pensamientos
  - Mini Violas
  - Gypsophillas
  - (Ya tienen foto: Calendulas, Capuchinas, Claveles Japoneses, Mini
    Clavel — ver `assets/flores/`)
- Si llegan fotos nuevas: convertir a JPG optimizado (`PIL`, calidad
  ~82, max 1200px de lado mayor — mismo criterio usado para las que ya
  están), guardarlas en `assets/flores/` con nombre kebab-case, y setear
  el campo `"image"` correspondiente en `products-data.js`.

## Convenciones

- Nombres de archivo de assets: kebab-case, sin espacios ni mayúsculas.
- Mantener `products-data.js` separado de `script.js` (datos vs.
  comportamiento).
- Sin frameworks, sin dependencias nuevas sin preguntar primero — el
  sitio es chico a propósito (YAGNI).
