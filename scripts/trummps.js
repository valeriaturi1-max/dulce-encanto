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
   Interacciones atractivas ✨
   =============================== */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('opinionForm');
  const mensajeExito = document.getElementById('mensajeExito');
  const opinionesCont = document.querySelector('.opiniones');
  const btnSubir = document.getElementById('btnSubir');
  const estrellas = form.querySelectorAll('.stars input');
  const labels = form.querySelectorAll('.stars label');
  const comentarios = document.getElementById('comentarios');
  const STORAGE_KEY = 'dulce_encanto_opiniones_v1';

  /* 🌟 Efecto estrellas brillante */
  labels.forEach((label, i) => {
    label.style.transition = 'transform .25s ease, color .25s ease, text-shadow .25s ease';
    label.addEventListener('mouseenter', () => {
      labels.forEach((l, j) => {
        l.style.color = j <= i ? 'var(--pink-500)' : 'var(--pink-300)';
        if (j <= i) {
          l.style.transform = 'scale(1.3) rotate(-10deg)';
          l.style.textShadow = '0 0 8px rgba(255,100,160,.6)';
        }
      });
    });
    label.addEventListener('mouseleave', () => {
      labels.forEach(l => {
        l.style.transform = 'scale(1) rotate(0)';
        l.style.textShadow = 'none';
        const checked = form.querySelector('.stars input:checked');
        if (checked) pintarSeleccionadas(checked.value);
        else l.style.color = 'var(--pink-300)';
      });
    });
    label.addEventListener('click', () => {
      estrellas[i].checked = true;
      pintarSeleccionadas(estrellas[i].value);
      destello(label); // 🌟
    });
  });

  function pintarSeleccionadas(valor) {
    labels.forEach((l, j) => {
      l.style.color = j < valor ? 'var(--pink-500)' : 'var(--pink-300)';
    });
  }

  /* ✨ Efecto destello */
  function destello(label) {
    const spark = document.createElement('span');
    spark.textContent = '✨';
    spark.style.position = 'absolute';
    const rect = label.getBoundingClientRect();
    spark.style.left = rect.left + rect.width/2 + 'px';
    spark.style.top = rect.top - 10 + 'px';
    spark.style.fontSize = '1.2rem';
    spark.style.pointerEvents = 'none';
    spark.style.animation = 'sparkle 1s ease forwards';
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1000);
  }

  /* 💌 Validación visual de comentarios */
  comentarios.addEventListener('input', () => {
    comentarios.style.border = comentarios.value.trim().length >= 5
      ? '2px solid #8BC34A'
      : '2px solid #f44336';
  });

  /* ✍️ Envío del formulario */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const rating = form.rating.value;
    const texto = comentarios.value.trim();

    if (!rating || texto.length < 5) {
      alert('Selecciona una puntuación y escribe al menos 5 caracteres ✍️');
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

    // Insertar
    insertarOpinion(opinion);

    // Reset
    form.reset();
    labels.forEach(l => { l.style.color = 'var(--pink-300)'; l.style.transform = 'scale(1)'; });
    comentarios.style.border = '1px solid #ddd';

    // Mostrar mensaje + confeti
    mostrarExito();
    lanzarConfeti();
  });

  /* 📦 Insertar opiniones animadas */
  function insertarOpinion(op) {
    const div = document.createElement('div');
    div.className = 'opinion';
    div.style.opacity = '0';
    div.style.transform = 'translateY(20px) scale(0.95)';
    div.style.transition = 'all .6s ease';
    div.innerHTML = `⭐️`.repeat(op.rating) + ` (${op.fecha})<br>${op.texto}`;
    opinionesCont.appendChild(div);
    setTimeout(() => {
      div.style.opacity = '1';
      div.style.transform = 'translateY(0) scale(1)';
    }, 50);
  }

  /* ✅ Mensaje de éxito animado */
  function mostrarExito() {
    mensajeExito.style.display = 'block';
    mensajeExito.style.opacity = '0';
    mensajeExito.style.transform = 'scale(0.5)';
    mensajeExito.style.transition = 'all .4s ease';
    setTimeout(() => {
      mensajeExito.style.opacity = '1';
      mensajeExito.style.transform = 'scale(1.2)';
    }, 50);
    setTimeout(() => {
      mensajeExito.style.transform = 'scale(1)';
    }, 500);
    setTimeout(() => {
      mensajeExito.style.opacity = '0';
      setTimeout(() => mensajeExito.style.display = 'none', 400);
    }, 3000);
  }

  /* 🎉 Confeti divertido */
  function lanzarConfeti() {
    for (let i = 0; i < 15; i++) {
      const c = document.createElement('div');
      c.textContent = '🎉';
      c.style.position = 'fixed';
      c.style.left = Math.random() * window.innerWidth + 'px';
      c.style.top = '-20px';
      c.style.fontSize = '1.2rem';
      c.style.zIndex = '9999';
      c.style.pointerEvents = 'none';
      document.body.appendChild(c);
      const dur = 2000 + Math.random()*1000;
      c.animate([
        { transform: 'translateY(0) rotate(0)' },
        { transform: `translateY(${window.innerHeight+50}px) rotate(${360+Math.random()*360}deg)` }
      ], { duration: dur, easing: 'ease-out' });
      setTimeout(() => c.remove(), dur);
    }
  }

  /* ⬆ Botón subir con fade */
  window.addEventListener('scroll', () => {
    btnSubir.style.transition = 'opacity .4s';
    btnSubir.style.opacity = window.scrollY > 200 ? '1' : '0';
    btnSubir.style.display = window.scrollY > 200 ? 'block' : 'none';
  });
  btnSubir.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* 📝 Renderizar guardadas */
  const existentes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  existentes.forEach(op => insertarOpinion(op));
});
