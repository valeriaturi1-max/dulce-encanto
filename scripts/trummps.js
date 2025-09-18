// 🔹 Botones que flotan y giran al pasar el cursor
const botones = document.querySelectorAll('button');
botones.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.2) rotate(-5deg)';
    btn.style.boxShadow = '0 10px 20px rgba(255,105,180,0.5)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1) rotate(0deg)';
    btn.style.boxShadow = '0 5px 15px rgba(255,182,193,0.3)';
  });
});

// 🔹 Estrellas que brillan y saltan
const estrellas = document.querySelectorAll('.stars label');
estrellas.forEach((estrella, index) => {
  estrella.addEventListener('mouseenter', () => {
    estrella.style.transform = 'scale(1.4) rotate(15deg)';
    estrella.style.color = '#ff1493';
  });
  estrella.addEventListener('mouseleave', () => {
    estrella.style.transform = 'scale(1) rotate(0deg)';
    const radio = estrella.previousElementSibling;
    if (!radio.checked) estrella.style.color = '#ccc';
  });
  estrella.addEventListener('click', () => {
    estrella.style.color = '#ff69b4';
    estrella.style.transform = 'scale(1.5) rotate(20deg)';
    setTimeout(() => {
      estrella.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  });
});

// 🔹 Secciones que rebotan y cambian sombra
const secciones = document.querySelectorAll('section, main');
secciones.forEach(sec => {
  sec.addEventListener('mouseenter', () => {
    sec.style.transform = 'translateY(-15px) rotate(-2deg)';
    sec.style.boxShadow = '0 20px 30px rgba(255,182,193,0.5)';
  });
  sec.addEventListener('mouseleave', () => {
    sec.style.transform = 'translateY(0) rotate(0deg)';
    sec.style.boxShadow = '0 10px 20px rgba(255,182,193,0.3)';
  });
});

// 🔹 Mensaje de éxito que parpadea y vibra
const form = document.getElementById('opinionForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const mensaje = document.getElementById('mensajeExito');
  mensaje.style.display = 'block';
  mensaje.style.transform = 'scale(1.3)';
  mensaje.style.color = '#ff69b4';
  mensaje.style.transition = 'transform 0.3s, color 0.3s';
  let i = 0;
  const vibra = setInterval(() => {
    mensaje.style.transform = `scale(1.3) rotate(${i % 2 === 0 ? 5 : -5}deg)`;
    i++;
    if (i > 5) {
      clearInterval(vibra);
      mensaje.style.transform = 'scale(1) rotate(0deg)';
    }
  }, 100);
  form.reset();
});

// 🔹 Cursor deja rastro de corazones
document.addEventListener('mousemove', e => {
  const corazon = document.createElement('div');
  corazon.textContent = '💖';
  corazon.style.position = 'absolute';
  corazon.style.left = e.pageX + 'px';
  corazon.style.top = e.pageY + 'px';
  corazon.style.fontSize = '1.2rem';
  corazon.style.pointerEvents = 'none';
  corazon.style.transition = 'all 0.8s ease-out';
  document.body.appendChild(corazon);
  setTimeout(() => {
    corazon.style.top = e.pageY - 20 + 'px';
    corazon.style.opacity = '0';
  }, 50);
  setTimeout(() => {
    corazon.remove();
  }, 800);
});
