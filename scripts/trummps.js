/* ============================
   🌈 Fondo degradado animado
   ============================ */
let gradPos = 0;
function animarFondo() {
  gradPos += 0.3;
  document.body.style.background = `linear-gradient(
    120deg,
    hsl(${(gradPos)%360}, 80%, 90%),
    hsl(${(gradPos+60)%360}, 80%, 90%),
    hsl(${(gradPos+120)%360}, 80%, 90%)
  )`;
  document.body.style.backgroundSize = '600% 600%';
  requestAnimationFrame(animarFondo);
}
animarFondo();

/* ============================
   🌙 Modo oscuro con guardado
   ============================ */
const btnModo = document.createElement('button');
btnModo.id = 'btnModo';
btnModo.textContent = '🌙';
btnModo.style.position = 'fixed';
btnModo.style.bottom = '20px';
btnModo.style.right = '20px';
btnModo.style.zIndex = '9999';
document.body.appendChild(btnModo);

if (localStorage.getItem('modoOscuro') === 'true') {
  document.body.classList.add('oscuro');
  btnModo.textContent = '☀️';
}

btnModo.addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
  const oscuro = document.body.classList.contains('oscuro');
  btnModo.textContent = oscuro ? '☀️' : '🌙';
  localStorage.setItem('modoOscuro', oscuro);
});

/* ============================
   🎵 Botón música ambiente
   ============================ */
const btnMusica = document.createElement('button');
btnMusica.id = 'btnMusica';
btnMusica.textContent = '🎵';
btnMusica.style.position = 'fixed';
btnMusica.style.bottom = '20px';
btnMusica.style.left = '20px';
btnMusica.style.zIndex = '9999';
document.body.appendChild(btnMusica);

const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_9a4a0d3ad4.mp3?filename=happy-ukulele-11049.mp3');
audio.loop = true;

btnMusica.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    btnMusica.textContent = '⏸️';
    mostrarToast('🎶 Música activada');
  } else {
    audio.pause();
    btnMusica.textContent = '🎵';
    mostrarToast('🔇 Música detenida');
  }
});

/* ============================
   📢 Notificación tipo "toast"
   ============================ */
function mostrarToast(texto) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = texto;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(-10px)';
  }, 50);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ============================
   ⬆️ Botón subir al inicio
   ============================ */
const btnSubir = document.getElementById('btnSubir');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnSubir.style.display = 'block';
  } else {
    btnSubir.style.display = 'none';
  }
});
btnSubir.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
