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
const btnModo = document.getElementById('btnModo') || document.createElement('button');
btnModo.id = 'btnModo';
btnModo.textContent = '🌙';
btnModo.style.position = 'fixed';
btnModo.style.bottom = '20px';
btnModo.style.right = '20px';
btnModo.style.zIndex = '9999';
btnModo.style.borderRadius = '50%';
btnModo.style.padding = '10px';
btnModo.style.border = 'none';
btnModo.style.background = '#fff';
btnModo.style.cursor = 'pointer';
btnModo.style.boxShadow = '0 0 8px rgba(0,0,0,0.2)';
document.body.appendChild(btnModo);

// Restaurar estado anterior
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
btnMusica.style.borderRadius = '50%';
btnMusica.style.padding = '10px';
btnMusica.style.border = 'none';
btnMusica.style.background = '#fff';
btnMusica.style.cursor = 'pointer';
btnMusica.style.boxShadow = '0 0 8px rgba(0,0,0,0.2)';
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
  toast.textContent = texto;
  toast.style.position = 'fixed';
  toast.style.bottom = '80px';
  toast.style.right = '20px';
  toast.style.background = '#ff9ecd';
  toast.style.color = '#4a004a';
  toast.style.padding = '10px 15px';
  toast.style.borderRadius = '12px';
  toast.style.fontWeight = '600';
  toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity .4s ease, transform .4s ease';
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
