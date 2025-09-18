// Botón Subir
 
  const btnSubir = document.getElementById("btnSubir");

  const toggleBtnSubir = () => {
    btnSubir.style.display = window.scrollY > 200 ? "block" : "none";
  };

  btnSubir.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleBtnSubir);
  toggleBtnSubir();
  // Botón Modo Claro / Oscuro

  const btnModo = document.createElement("button");
  btnModo.id = "btnModo";
  btnModo.textContent = "🌙";
  document.body.appendChild(btnModo);

  btnModo.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
    btnModo.textContent = document.body.classList.contains("oscuro") ? "☀️" : "🌙";
  });
  /* ===============================
   scripts/valee.js
   JS interactivo y atractivo ✨
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('opinionForm');
  const mensajeExito = document.getElementById('mensajeExito');
  const opinionesCont = document.querySelector('.opiniones');
  const btnSubir = document.getElementById('btnSubir');
  const estrellas = form.querySelectorAll('.stars input');
  const comentarios = document.getElementById('comentarios');
  const STORAGE_KEY = 'dulce_encanto_opiniones_v1';

  /* ---------- Animación estrellas ---------- */
  const estrellasLabels = form.querySelectorAll('.stars label');
  estrellasLabels.forEach((label, index) => {
    label.addEventListener('mouseenter', () => {
      estrellasLabels.forEach((l, i) => {
        l.style.color = i <= index ? 'var(--pink-500)' : 'var(--pink-300)';
        l.style.transform = i <= index ? 'scale(1.3)' : 'scale(1)';
      });
    });
    label.addEventListener('mouseleave', () => {
      estrellasLabels.forEach(l => {
        l.style.color = 'var(--pink-300)';
        l.style.transform = 'scale(1)';
      });
      const checked = form.querySelector('.stars input:checked');
      if (checked) pintarSeleccionadas(checked.value);
    });
    label.addEventListener('click', () => {
      estrellas[index].checked = true;
      pintarSeleccionadas(estrellas[index].value);
    });
  });

  function pintarSeleccionadas(valor) {
    estrellasLabels.forEach((l, i) => {
      l.style.color = i < valor ? 'var(--pink-500)' : 'var(--pink-300)';
      l.style.transform = i < valor ? 'scale(1.3)' : 'scale(1)';
    });
  }

  /* ---------- Validación visual ---------- */
  comentarios.addEventListener('input', () => {
    if (comentarios.value.trim().length >= 5) {
      comentarios.style.border = '2px solid #8BC34A'; // verde suave
    } else {
      comentarios.style.border = '2px solid #f44336'; // rojo suave
    }
  });

  /* ---------- Guardar y mostrar opiniones ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rating = form.rating.value;
    const texto = comentarios.value.trim();

    if (!rating || texto.length < 5) {
      alert('Por favor selecciona una puntuación y escribe al menos 5 caracteres.');
      return;
    }

    const opinion = {
      rating: Number(rating),
      texto,
      fecha: new Date().toLocaleString()
    };

    // Guardar
    const guardadas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    guardadas.unshift(opinion);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guardadas));

    // Insertar con animación
    insertarOpinion(opinion);

    // Reset
    form.reset();
    estrellasLabels.forEach(l => { l.style.color = 'var(--pink-300)'; l.style.transform = 'scale(1)'; });
    comentarios.style.border = '1px solid #ddd';

    // Mostrar mensaje éxito
    mostrarExito();
  });

  function insertarOpinion(op) {
    const div = document.createElement('div');
    div.className = 'opinion';
    div.style.opacity = '0';
    div.style.transform = 'translateY(20px)';
    div.innerHTML = `⭐️`.repeat(op.rating) + ` (${op.fecha}) - ${op.texto}`;
    opinionesCont.appendChild(div);

    // animación de entrada suave
    setTimeout(() => {
      div.style.transition = 'all 0.6s ease';
      div.style.opacity = '1';
      div.style.transform = 'translateY(0)';
    }, 50);
  }

  function mostrarExito() {
    mensajeExito.style.display = 'block';
    mensajeExito.style.opacity = '0';
    mensajeExito.style.transform = 'scale(0.8)';
    setTimeout(() => {
      mensajeExito.style.transition = 'all 0.5s ease';
      mensajeExito.style.opacity = '1';
      mensajeExito.style.transform = 'scale(1)';
    }, 50);
    setTimeout(() => {
      mensajeExito.style.opacity = '0';
      mensajeExito.style.transform = 'scale(0.8)';
      setTimeout(() => mensajeExito.style.display = 'none', 500);
    }, 3500);
  }

  /* ---------- Mostrar botón Subir ---------- */
  window.addEventListener('scroll', () => {
    btnSubir.style.display = window.scrollY > 250 ? 'block' : 'none';
  });
  btnSubir.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Renderizar opiniones guardadas al cargar ---------- */
  const existentes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  existentes.forEach(op => insertarOpinion(op));
});
