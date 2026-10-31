# Mini Vegetales — landing page: contexto para agentes IA

Notas vivas del proyecto para que cualquier sesión de Code Puppy (u otro
agente IA) retome contexto rápido sin tener que redescubrir todo de cero.
Actualizar esto cuando algo cambie de forma relevante.

## Qué es esto

Landing estática (sin build step, sin framework) para **Mini Vegetales**,
granja vertical de microgreens en Santiago, Puente Alto. Sin carrito — el
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

`index.html` referencia `styles.css?v=15`, `script.js?v=8` y `products-data.js?v=4`.
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

## Estado actual (actualizar al cerrar cada sesión)

- `rediseno` (preview: `rediseno.minivegetales.pages.dev`) va por delante de `main` y es la versión
  vigente. **Decisión del dueño: todavía NO mergear a `main`.** No mergear hasta que lo pida.
- Direccion vigente: Pasaje Río Petrohue 4783, Puente Alto (antes La Reina). Si cambia, buscar en
  `index.html`, JSON-LD, `AGENTS.md` y regenerar `assets/og-image.jpg` (lleva la comuna dibujada).
- Video de la sala de cultivo: `assets/video/granja.mp4` (sin audio, faststart) en la sección "La granja".
  Corre solo mientras se ve; con "reducir movimiento" no se autorreproduce.
- Los archivos del dueño en Windows están en `/mnt/c/Users/Spider.cl/Downloads` (`~/Downloads` está vacía).

## Pendiente / a medio terminar

Producción y dominio:
- Mergear `rediseno` a `main`, borrar las 5 ramas sobrantes (`actual-tokens`, `actual-corregida`,
  `porcelana`, `berenjena`, `calendula`), subir `?v=` y comparar bytes contra producción.
- Conectar `minivegetales.cl` a Cloudflare Pages (hoy muestra el sitio viejo). Hasta entonces el SEO,
  que apunta a ese dominio, no rinde. Después cambiar la firma del pedido en `script.js`
  ("Pedido armado en minivegetales.pages.dev").

Contenido:
- Sin foto real (tarjeta con degradado, `"image": null`): Acelga roja, Albahaca, Pensamientos,
  Mini Violas y Gypsophillas. Van al final de su grilla. Si llegan fotos: JPG optimizado (`PIL`,
  calidad ~82, max 1200 px), `assets/variedades/` o `assets/flores/` en kebab-case, y setear `"image"`.
- Confirmar la grafía de la calle ("Petrohue" o "Petrohué") y si la zona de reparto cambió.

Diseño y rendimiento:
- Texto chico y de bajo contraste: línea de estado del filtro (13 px), copyright del footer.
- En móvil la barra de pedido tapa los botones "Agregar" de la fila inferior (falta padding al final).
- En tablet (~1000 px) el header parte "Para chefs" y "La granja" en dos líneas.
- La foto del hero es neón y de aspecto IA; choca con las fotos de producto. Decisión de gusto.
- Pasar `hero-farm.jpg` (684 KB) y `microgreens-macro.jpg` (787 KB) a WebP. Las fuentes vienen de
  Google Fonts (dependencia externa).
- No probado: Escape cerrando diálogos con tecla real, menú hamburguesa, autoplay en Safari/iOS real.

Fuera del repo (lo hace el dueño): Search Console, Google Business Profile, actualizar la dirección
en Instagram, Facebook y LinkedIn.

## Convenciones

- Nombres de archivo de assets: kebab-case, sin espacios ni mayúsculas.
- Mantener `products-data.js` separado de `script.js` (datos vs.
  comportamiento).
- Sin frameworks, sin dependencias nuevas sin preguntar primero — el
  sitio es chico a propósito (YAGNI).

## SEO
- El dominio final es `https://minivegetales.cl`: va en `canonical`, `og:*`, `twitter:*`, JSON-LD,
  `robots.txt` y `sitemap.xml`. Si cambia, buscar y reemplazar en esos archivos (`grep -rn minivegetales.cl`).
- `_headers` pone `X-Robots-Tag: noindex` a todo `*.pages.dev` (produccion y previews) para no duplicar
  contenido. El dominio propio no se ve afectado. No borrar ese archivo.
- `assets/og-image.jpg` (1200x630) es la imagen al compartir; `favicon.svg/.ico` y `apple-touch-icon.png`
  estan en la raiz. Title <= 65 y description <= 160 caracteres.
- El JSON-LD lleva `geo` y `hasMap` tomados de la ficha real de Google Maps ("Microgreens Minivegetales",
  `https://maps.app.goo.gl/K3FoAZ9bpMvW95E18`). No se agregaron horarios ni precios porque no se conocen: no inventarlos.
