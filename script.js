// ===== Mini Vegetales landing — interactions =====
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Mobile menu toggle ----
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("is-open"));
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll("[data-reveal]");
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

// ---- Animated stat counters ----
const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach((el) => counterObserver.observe(el));

// ---- Variedades data + marquee render ----
const VARIEDADES = [
  { name: "Amaranto", color: "#ff6b6b" },
  { name: "Rucula", color: "#6fe84f" },
  { name: "Betarraga", color: "#9b6bff" },
  { name: "Mostaza Amarilla-Negra", color: "#ffd93d" },
  { name: "Maiz Dulce", color: "#ffb84d" },
  { name: "Lentejas", color: "#4defd0" },
  { name: "Repollo", color: "#c76bff" },
  { name: "Rabano", color: "#ff5d9e" },
  { name: "Arvejas", color: "#8bff6b" },
  { name: "Cilantro", color: "#7ee87e" },
  { name: "Acelga Roja", color: "#ff7676" },
  { name: "Girasol", color: "#ffe14d" },
  { name: "Ajo Chino", color: "#d6ff6b" },
  { name: "Zanahoria", color: "#ff9a4d" },
  { name: "Albahaca", color: "#4de1a6" },
];

// Flores comestibles de temporada -- catalogo limitado, disponibilidad estacional
const FLORES = [
  { name: "Pensamientos", color: "#9b6bff" },
  { name: "Mini Violas", color: "#8a4fff" },
  { name: "Calendulas", color: "#ffcc33" },
  { name: "Capuchinas", color: "#ff7a45" },
  { name: "Claveles Japoneses", color: "#ff6ec4" },
  { name: "Mini Clavel", color: "#ff4d8d" },
  { name: "Gypsophillas", color: "#f3e8ff" },
];

function chip(v) {
  const el = document.createElement("div");
  el.className = "variety-chip";
  el.innerHTML = `<span class="swatch" style="background:${v.color}; box-shadow:0 0 8px ${v.color}"></span>${v.name}`;
  return el;
}

// duplicate each list so the CSS marquee (translateX -50%) loops seamlessly
function renderMarquee(trackId, items) {
  const track = document.getElementById(trackId);
  if (!track) return;
  [...items, ...items].forEach((v) => track.appendChild(chip(v)));
}

renderMarquee("marqueeTrack", VARIEDADES);
renderMarquee("marqueeTrackFlores", FLORES);

// ---- Navbar background on scroll ----
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.background = window.scrollY > 40
    ? "rgba(6, 10, 8, 0.85)"
    : "rgba(6, 10, 8, 0.55)";
});

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

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion) {
  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
}
