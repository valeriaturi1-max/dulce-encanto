/* 💖 JS SUPER ATRACTIVO Y DINÁMICO */

/* ✨ Aparición suave de elementos */
const elementos = document.querySelectorAll('section, .opinion, .form-container');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });
elementos.forEach(el => observer.observe(el));

/* 💫 Estrellitas flotantes al mover el mouse */
document.addEventListener('mousemove', (e) => {
  if (Math.random() < 0.15) {
    const estrella = document.createElement('div');
    estrella.className = 'particle';
    estrella.textContent = '★';
    estrella.style.position = 'fixed';
    estrella.style.left = e.clientX + 'px';
    estrella.style.top = e.clientY + 'px';
    estrella.style.fontSize = '16px';
    estrella.style.color = `hsl(${Math.random() * 360}, 80%, 75%)`;
    estrella.style.opacity = 0.8;
    estrella.style.pointerEvents = 'none';
    estrella.style.animation = 'floatUp 1s linear forwards';
    document.body.appendChild(estrella);
    setTimeout(() => estrella.remove(), 1000);
  }
});

/* 🌗 Botón modo oscuro/claro */
const btnModo = document.createElement('button');
btnModo.id = 'btnModo';
btnModo.textContent = '🌙';
document.body.appendChild(btnModo);

btnModo.addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
  btnModo.textContent = document.body.classList.contains('oscuro') ? '☀️' : '🌙';
  btnModo.style.transform = 'scale(1.2)';
  setTimeout(() => btnModo.style.transform = 'scale(1)', 300);
});

/* ⬆ Botón para volver arriba */
const btnArriba = document.createElement('button');
btnArriba.id = 'btnTop';
btnArriba.textContent = '⬆';
document.body.appendChild(btnArriba);

window.addEventListener('scroll', () => {
  btnArriba.style.display = window.scrollY > 300 ? 'block' : 'none';
});
btnArriba.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* 🎉 Confeti al enviar formulario */
const form = document.getElementById('opinionForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const mensaje = document.getElementById('mensajeExito');
  mensaje.style.display = 'block';
  lanzarConfeti();
  setTimeout(() => form.reset(), 500);
});

/* 🌈 Función confeti */
function lanzarConfeti() {
  for (let i = 0; i < 25; i++) {
    const confeti = document.createElement('div');
    confeti.className = 'confeti';
    confeti.style.left = Math.random() * window.innerWidth + 'px';
    confeti.style.background = `hsl(${Math.random() * 360}, 80%, 70%)`;
    confeti.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
    document.body.appendChild(confeti);
    setTimeout(() => confeti.remove(), 2000);
  }
}

/* 📱 Ajuste de fuente en pantallas pequeñas */
window.addEventListener('resize', () => {
  document.body.style.fontSize = window.innerWidth < 500 ? '15px' : '16px';
});
