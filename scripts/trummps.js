/* ================================
   🌟 EFECTOS DINÁMICOS GENERALES
   ================================ */

// 🌗 BOTÓN MODO OSCURO / CLARO
const btnModo = document.createElement("button");
btnModo.id = "btnModo";
btnModo.textContent = "🌙";
document.body.appendChild(btnModo);

if (localStorage.getItem("modo") === "oscuro") {
  document.body.classList.add("oscuro");
  btnModo.textContent = "☀️";
}

btnModo.addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  const oscuro = document.body.classList.contains("oscuro");
  localStorage.setItem("modo", oscuro ? "oscuro" : "claro");
  btnModo.textContent = oscuro ? "☀️" : "🌙";

  // animación de giro
  btnModo.style.transform = "rotate(360deg)";
  setTimeout(() => btnModo.style.transform = "rotate(0deg)", 500);

  // partículas
  for (let i = 0; i < 15; i++) {
    crearParticula(btnModo.offsetLeft + 25, btnModo.offsetTop);
  }
});

// 🌟 BOTÓN "VOLVER ARRIBA"
const btnTop = document.createElement("button");
btnTop.id = "btnTop";
btnTop.textContent = "⬆";
document.body.appendChild(btnTop);

window.addEventListener("scroll", () => {
  btnTop.style.display = window.scrollY > 300 ? "flex" : "none";
});
btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 💥 BOTONES REBOTE
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.classList.add("bounce");
    setTimeout(() => e.target.classList.remove("bounce"), 400);
  }
});

// ✨ PARTÍCULAS DECORATIVAS
function crearParticula(x, y) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = x + "px";
  p.style.top = y + "px";
  p.style.animationDuration = (2 + Math.random() * 2) + "s";
  p.style.transform = `scale(${0.5 + Math.random()})`;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 4000);
}

// 🪄 ANIMAR ENTRADA AL HACER SCROLL
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll("section, .form-container, .opinion").forEach(el => {
  observer.observe(el);
});
