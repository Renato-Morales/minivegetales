// ===== Mini Vegetales landing — interactions =====
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.getElementById("year").textContent = new Date().getFullYear();

// ---- Mobile menu toggle ----
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
function setMenu(open) {
  navLinks.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}
burger.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
    setMenu(false);
    burger.focus();
  }
});

// ---- Scroll reveal ----
// El CSS solo oculta [data-reveal] cuando <html> tiene la clase "js"; si algo falla
// aquí, todo se muestra igual (ver el bloque try/catch y el fallback de abajo).
const revealEls = document.querySelectorAll("[data-reveal]");
function showAll() {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
try {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }
} catch (err) {
  showAll();
}

// ---- Animated stat counters (el HTML ya trae el valor final; esto solo lo anima) ----
const counters = document.querySelectorAll("[data-count]");
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.floor(progress * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));
}

// ---- Product detail modal ----
// Las tarjetas del catálogo ya vienen en el HTML (botones .product-card con data-product);
// aquí solo se les conecta el modal. Datos en PRODUCT_DETAILS (products-data.js).
const modalOverlay = document.getElementById("productModal");
const modalMedia = document.getElementById("modalMedia");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalBenefits = document.getElementById("modalBenefits");
const modalCta = document.getElementById("modalCta");
const modalClose = document.getElementById("modalClose");
let lastFocusedCard = null;

function openProductModal(key, card) {
  const details = PRODUCT_DETAILS[key] || {};
  const label = details.label || key;

  modalTitle.textContent = label;
  modalDescription.textContent =
    details.description || "Pronto vamos a sumar el detalle completo de este producto.";

  modalBenefits.innerHTML = "";
  (details.uses || []).forEach((use) => {
    const li = document.createElement("li");
    li.textContent = use;
    modalBenefits.appendChild(li);
  });
  modalBenefits.previousElementSibling.hidden = !(details.uses && details.uses.length);

  modalMedia.innerHTML = "";
  if (details.image) {
    const img = document.createElement("img");
    img.src = details.image;
    img.alt = label;
    modalMedia.appendChild(img);
  } else {
    const swatch = card.querySelector(".product-media-empty");
    const color = swatch ? getComputedStyle(swatch).getPropertyValue("--swatch").trim() : "#a6ff4d";
    const dot = document.createElement("span");
    dot.className = "modal-media-fallback";
    dot.style.background = color;
    dot.style.color = color;
    modalMedia.appendChild(dot);
  }

  const message = encodeURIComponent(`Hola Mini Vegetales, quiero consultar por ${label}`);
  modalCta.href = `https://wa.me/56979886031?text=${message}`;

  modalOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeProductModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = "";
  if (lastFocusedCard) lastFocusedCard.focus();
}

modalClose.addEventListener("click", closeProductModal);
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) closeProductModal();
});
document.addEventListener("keydown", (event) => {
  if (modalOverlay.hidden) return;
  if (event.key === "Escape") {
    closeProductModal();
    return;
  }
  // Mantener el foco dentro del modal mientras está abierto
  if (event.key === "Tab") {
    const focusables = modalOverlay.querySelectorAll("a[href], button:not([disabled])");
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    lastFocusedCard = card;
    openProductModal(card.dataset.product, card);
  });
});

// ---- Navbar background on scroll ----
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.background = window.scrollY > 40
    ? "rgba(6, 10, 8, 0.85)"
    : "rgba(6, 10, 8, 0.55)";
}, { passive: true });

// ---- Ambient particle canvas (lightweight, pure vanilla) ----
const canvas = document.getElementById("fx-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  const count = Math.min(70, Math.floor(window.innerWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    vy: Math.random() * 0.25 + 0.05,
    vx: (Math.random() - 0.5) * 0.15,
    alpha: Math.random() * 0.5 + 0.2,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.y -= p.vy;
    p.x += p.vx;
    if (p.y < -10) p.y = canvas.height + 10;
    if (p.x < -10) p.x = canvas.width + 10;
    if (p.x > canvas.width + 10) p.x = -10;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(166, 255, 77, ${p.alpha})`;
    ctx.shadowColor = "rgba(166, 255, 77, 0.8)";
    ctx.shadowBlur = 6;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

if (!prefersReducedMotion) {
  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
}
