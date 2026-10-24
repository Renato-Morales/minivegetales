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

`index.html` referencia `styles.css?v=2`, `script.js?v=2` y
`products-data.js?v=2`. **Bumpear ese `?v=` cada vez que se edite
cualquiera de esos tres archivos.** Se agregó porque sospechamos que
proxies de datos de redes móviles (ej. Chrome Android Data Saver) pueden
servir una copia vieja cacheada ignorando `Cache-Control`, dejando
features nuevas (como la sección de flores) sin JS actualizado en
algunos celulares. No confirmado 100% como causa raíz, pero es mitigación
estándar y gratis.

## Features principales

- Hero con canvas de partículas (`#fx-canvas`), reveal-on-scroll
  (`[data-reveal]` + `IntersectionObserver`, threshold 0.15).
- Marquee infinito de 15 variedades de microgreens (`#marqueeTrack`).
- Marquee infinito de flores comestibles de temporada
  (`#marqueeTrackFlores`, clase `marquee-reverse`) — catálogo limitado,
  cambia según temporada.
- Ambos marquees pausan la animación en `:hover` (CSS, no JS) —
  ver `.marquee:hover .marquee-track` en `styles.css`.
- Modal de detalle de producto al clickear un chip: foto + descripción +
  beneficios + botón de WhatsApp con mensaje prearmado. Datos en
  `PRODUCT_DETAILS` dentro de `products-data.js`.

## Pendiente / a medio terminar

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
