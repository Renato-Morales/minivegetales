// ===== Mini Vegetales — interacciones =====
// Datos de producto en PRODUCT_DETAILS (products-data.js). El catálogo ya viene escrito en
// index.html: este script solo agrega filtros, pedido, diálogos y animaciones.
const WHATSAPP = "56979886031";
const STORAGE_KEY = "mv-pedido";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Menú móvil ----------
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
function setMenu(open) {
  navLinks.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}
burger.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
    setMenu(false);
    burger.focus();
  }
});

// ---------- Aparición al hacer scroll ----------
// El CSS solo oculta [data-reveal] si <html> tiene la clase "js"; si algo falla, se muestra todo.
const revealEls = document.querySelectorAll("[data-reveal]");
function showAll() {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
try {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }
} catch (err) {
  showAll();
}

// ---------- Utilidades ----------
function labelOf(key) {
  const d = PRODUCT_DETAILS[key];
  return (d && d.label) || key;
}
function waLink(text) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}
// Dentro de un <dialog> modal, clic en el fondo = cerrar (respaldo para navegadores sin `closedby`)
function enableLightDismiss(dialog) {
  if ("closedBy" in HTMLDialogElement.prototype) return;
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    const inside =
      r.top <= event.clientY && event.clientY <= r.bottom &&
      r.left <= event.clientX && event.clientX <= r.right;
    if (!inside) dialog.close();
  });
}
function wireClose(dialog) {
  dialog.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", () => dialog.close()));
  enableLightDismiss(dialog);
}

// ---------- Estado del pedido ----------
// Map clave -> tipo ("micro" | "flor"). Se guarda en localStorage solo como comodidad
// (si falla o está bloqueado, el pedido sigue funcionando en memoria).
const order = new Map();
const knownKeys = new Map();
document.querySelectorAll("[data-add]").forEach((btn) => knownKeys.set(btn.dataset.add, btn.dataset.kind));

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  saved.forEach((key) => { if (knownKeys.has(key)) order.set(key, knownKeys.get(key)); });
} catch (err) { /* sin almacenamiento: seguimos en memoria */ }

const orderBar = document.getElementById("orderBar");
const orderBarText = document.getElementById("orderBarText");
const orderBarWhatsapp = document.getElementById("orderBarWhatsapp");
const orderBarReview = document.getElementById("orderBarReview");
const orderStatus = document.getElementById("orderStatus");
const orderDialog = document.getElementById("orderDialog");
const orderGroups = document.getElementById("orderGroups");
const orderEmpty = document.getElementById("orderEmpty");
const orderNotes = document.getElementById("orderNotes");
const orderSend = document.getElementById("orderSend");
const orderClear = document.getElementById("orderClear");

function orderMessage() {
  const lines = ["Hola Mini Vegetales, quiero cotizar este pedido:"];
  const micro = [...order].filter(([, kind]) => kind === "micro").map(([k]) => labelOf(k));
  const flores = [...order].filter(([, kind]) => kind === "flor").map(([k]) => labelOf(k));
  if (micro.length) lines.push("", "Microvegetales:", ...micro.map((n) => `- ${n}`));
  if (flores.length) lines.push("", "Flores de temporada:", ...flores.map((n) => `- ${n}`));
  const notes = orderNotes.value.trim();
  if (notes) lines.push("", `Notas: ${notes}`);
  lines.push("", "(Pedido armado en minivegetales.pages.dev)");
  return lines.join("\n");
}

// Sin productos, la barra solo ofrece "Escríbenos": sobre el hero compite con sus propios botones,
// así que se esconde mientras el hero está a la vista. Con productos siempre se ve.
let heroInView = true;
function syncOrderBarVisibility() {
  const away = heroInView && order.size === 0;
  orderBar.classList.toggle("is-away", away);
  orderBar.inert = away;
}
const heroEl = document.querySelector(".hero");
if (heroEl && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    heroInView = entry.isIntersecting;
    syncOrderBarVisibility();
  }, { threshold: 0.35 }).observe(heroEl);
}

function renderOrder(announce) {
  const count = order.size;

  // Botones "Agregar" de las tarjetas: la etiqueta dice qué hará el siguiente toque (no usan
  // aria-pressed: con la etiqueta cambiando sería un doble estado confuso en lectores de pantalla).
  document.querySelectorAll("[data-add]").forEach((btn) => {
    const key = btn.dataset.add;
    const inOrder = order.has(key);
    btn.classList.toggle("is-added", inOrder);
    btn.querySelector(".add-label").textContent = inOrder ? "Quitar" : "Agregar";
    btn.querySelector(".add-sr").textContent = ` ${labelOf(key)} ${inOrder ? "del" : "al"} pedido`;
  });
  syncProductAddButton();

  // Barra inferior: vacía -> WhatsApp directo; con productos -> revisar y enviar
  orderBar.classList.toggle("has-items", count > 0);
  syncOrderBarVisibility();
  orderBarWhatsapp.hidden = count > 0;
  orderBarReview.hidden = count === 0;
  orderBarText.textContent = count === 0 ? "¿Hablamos?" : count === 1 ? "1 producto en tu pedido" : `${count} productos en tu pedido`;

  // Lista dentro del diálogo de pedido
  orderGroups.innerHTML = "";
  [["micro", "Microvegetales"], ["flor", "Flores de temporada"]].forEach(([kind, title]) => {
    const items = [...order].filter(([, k]) => k === kind).map(([key]) => key);
    if (!items.length) return;
    const group = document.createElement("div");
    group.className = "order-group";
    const h = document.createElement("h4");
    h.textContent = title;
    group.appendChild(h);
    const ul = document.createElement("ul");
    items.forEach((key) => {
      const li = document.createElement("li");
      li.className = "order-item";
      const name = document.createElement("span");
      name.textContent = labelOf(key);
      const rm = document.createElement("button");
      rm.type = "button";
      rm.className = "order-remove";
      rm.textContent = "Quitar";
      rm.setAttribute("aria-label", `Quitar ${labelOf(key)} del pedido`);
      rm.addEventListener("click", () => {
        toggleOrder(key);
        if (!order.size) orderDialog.close();
      });
      li.append(name, rm);
      ul.appendChild(li);
    });
    group.appendChild(ul);
    orderGroups.appendChild(group);
  });
  orderEmpty.hidden = count > 0;
  orderSend.hidden = count === 0;
  orderClear.hidden = count === 0;
  orderSend.href = count ? waLink(orderMessage()) : `https://wa.me/${WHATSAPP}`;

  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...order.keys()])); } catch (err) { /* ok */ }
  if (announce) orderStatus.textContent = announce;
}

function toggleOrder(key) {
  const kind = knownKeys.get(key);
  if (!kind) return;
  const had = order.has(key);
  if (had) order.delete(key); else order.set(key, kind);
  const n = order.size;
  const total = n === 1 ? "1 producto en tu pedido" : `${n} productos en tu pedido`;
  renderOrder(`${labelOf(key)} ${had ? "quitado del" : "agregado al"} pedido. ${total}.`);
}

document.querySelectorAll("[data-add]").forEach((btn) => {
  btn.addEventListener("click", () => toggleOrder(btn.dataset.add));
});
orderBarReview.addEventListener("click", () => orderDialog.showModal());
orderNotes.addEventListener("input", () => { if (order.size) orderSend.href = waLink(orderMessage()); });
orderClear.addEventListener("click", () => {
  order.clear();
  renderOrder("Pedido vaciado.");
  orderDialog.close();
});
wireClose(orderDialog);

// ---------- Diálogo de producto ----------
const productDialog = document.getElementById("productDialog");
const productMedia = document.getElementById("productMedia");
const productKind = document.getElementById("productKind");
const productTitle = document.getElementById("productTitle");
const productFlavor = document.getElementById("productFlavor");
const productDescription = document.getElementById("productDescription");
const productUsesWrap = document.getElementById("productUsesWrap");
const productUses = document.getElementById("productUses");
const productAdd = document.getElementById("productAdd");
const productWhatsapp = document.getElementById("productWhatsapp");
let currentKey = null;

function syncProductAddButton() {
  if (!currentKey) return;
  // Este botón cambia de texto (no usa aria-pressed): el propio texto dice qué hará al tocarlo.
  const inOrder = order.has(currentKey);
  productAdd.classList.toggle("is-added", inOrder);
  productAdd.textContent = inOrder ? "Quitar del pedido" : "Agregar al pedido";
}

function openProduct(btn) {
  const key = btn.dataset.product;
  const d = PRODUCT_DETAILS[key] || {};
  const label = d.label || key;
  currentKey = key;

  productKind.textContent = btn.dataset.kind === "flor" ? "Flor comestible de temporada" : "Microvegetal";
  productTitle.textContent = label;
  const flavor = btn.querySelector(".product-flavor");
  productFlavor.textContent = flavor ? flavor.textContent : "";
  productDescription.textContent = d.description || "Pronto vamos a sumar el detalle completo de este producto.";

  productUses.innerHTML = "";
  (d.uses || []).forEach((use) => {
    const li = document.createElement("li");
    li.textContent = use;
    productUses.appendChild(li);
  });
  productUsesWrap.hidden = !(d.uses && d.uses.length);

  productMedia.innerHTML = "";
  if (d.image) {
    const img = document.createElement("img");
    img.src = d.image;
    img.alt = label;
    productMedia.appendChild(img);
  } else {
    const swatch = btn.querySelector(".product-media-empty");
    const fill = document.createElement("div");
    fill.className = "media-fill";
    if (swatch) fill.style.setProperty("--swatch", swatch.style.getPropertyValue("--swatch"));
    productMedia.appendChild(fill);
  }

  productWhatsapp.href = waLink(`Hola Mini Vegetales, quiero consultar por ${label}`);
  syncProductAddButton();
  productDialog.showModal();
}

document.querySelectorAll(".product-open").forEach((btn) => btn.addEventListener("click", () => openProduct(btn)));
productAdd.addEventListener("click", () => { if (currentKey) toggleOrder(currentKey); });
productDialog.addEventListener("close", () => { currentKey = null; });
wireClose(productDialog);

// ---------- Filtro por sabor ----------
const chips = document.querySelectorAll(".chip");
const microCards = document.querySelectorAll("#microGrid .product");
const filterStatus = document.getElementById("filterStatus");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    let shown = 0;
    microCards.forEach((card) => {
      const match = f === "todos" || (card.dataset.tags || "").split(" ").includes(f);
      card.hidden = !match;
      if (match) shown += 1;
    });
    filterStatus.textContent =
      f === "todos" ? `Mostrando las ${shown} variedades` : `Mostrando ${shown} variedades de sabor ${f}`;
  });
});

renderOrder();
