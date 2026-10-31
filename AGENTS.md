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

`index.html` referencia `styles.css?v=13`, `script.js?v=6` y `products-data.js?v=4`.
**Bumpear ese `?v=` cada vez que se edite cualquiera de esos tres archivos** (mitigación contra
proxies de datos móviles que sirven copias viejas).

## Rediseño (rama `rediseno`)

Mezcla de tres direcciones: **porcelana** (base clara, catálogo), **berenjena** (sección de flores)
y **caléndula** (dorado para toda acción: botones, CTA). Tipografía: Gloock (títulos) + Figtree (texto).

- **Estructura**: hero → cifras → "cultivamos para" → catálogo de microvegetales (filtro por sabor)
  → flores de temporada → para chefs (con "Cómo pedir") → la granja → preguntas → CTA → contacto.
- **Pedido por WhatsApp**: cada tarjeta tiene "Agregar"; la barra inferior (`#orderBar`) muestra
  "Revisar y enviar" y abre `#orderDialog`, que arma el mensaje (agrupado en microvegetales / flores
  + notas) y lo manda a `wa.me`. La lista se guarda en `localStorage` (clave `mv-pedido`) solo como
  comodidad. Sin precios ni carrito a propósito: se coordina por WhatsApp.
- **Diálogos**: `<dialog>` nativo con `showModal()` y `closedby="any"` (más respaldo en `script.js`
  para Safari). Foco y Escape los maneja el navegador.
- **Sabor de cada producto**: texto corto (`.product-flavor`) y `data-tags` (picante, dulce, herbal,
  suave) escritos en `index.html`; los usa el filtro. Descripción y "Ideal para" siguen en
  `products-data.js`.
- `index.html` se edita a mano (las 22 tarjetas son HTML estático, funciona sin JS). Para agregar un
  producto: copiar una `<li class="product">` y agregar su entrada en `PRODUCT_DETAILS`.
- Se eliminaron el canvas de partículas y los contadores animados.

## Design tokens (styles.css, bloque `:root`)

Todo valor repetido es un token; no hardcodear colores ni medidas nuevas.

- **Colores**: canales `--ink-rgb`, `--forest-rgb`, `--aubergine-rgb`, `--gold-rgb`, `--cream-rgb`,
  `--rose-rgb`, `--porcelain-rgb`, `--white-rgb` para transparencias (`rgb(var(--ink-rgb) / .12)`);
  colores plenos `--ink`, `--forest`, `--gold`, `--rose`, etc.; `--muted`, `--line`, `--on-forest`,
  `--on-aubergine` para textos secundarios. `--focus` cambia a dorado dentro de secciones oscuras.
- **Tipografía**: `--font-display`, `--font-body`, escala `--fs-xs … --fs-2xl`, `--fs-h2`, `--fs-display`.
- **Espaciado**: grilla de 4 px, `--sp-N` = N × 4 px. **Radios**: `--radius-sm / --radius / --radius-lg / --radius-pill`.
- **Sombras**: `--shadow-card`, `--shadow-pop`, `--shadow-bar`. **Movimiento**: `--dur-fast/base/slow`, `--ease`.
- Botones: `.btn` + `-gold | -ink | -outline | -outline-light`, tamaños `-sm | -lg`, con estados
  hover, active y disabled.

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
