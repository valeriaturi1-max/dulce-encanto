/* ===============================
  trummps.js — SUPER LLAMATIVO JS
  Incluye:
  - Menú hamburguesa accesible
  - Partículas pastel en canvas (fondo)
  - Confeti y lluvia de emojis al valorar / enviar
  - Ripple en botón enviar
  - Animación elástica y brillo en estrellas
  - Toasts y mensaje "gracias"
  - Botón "subir" (back-to-top)
  - Modo oscuro toggle + sonido opcional
  - Scroll reveal ligero
  - Seguridad: chequeos de elementos existentes
  (Pegar en scripts/trummps.js)
=================================*/

/* ------------------------------
   UTIL — helper pequeño
------------------------------*/
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ------------------------------
   ELEMENTOS PRINCIPALES
------------------------------*/
const form = $('#opinionForm');
const mensajeExito = $('#mensajeExito');
const estrellas = $$('.stars label');
const nav = $('.nav-links');
const navbar = $('.navbar');
const btnSubir = document.getElementById('btnSubir');
const body = document.body;

/* ------------------------------
   MENÚ HAMBURGUESA (accesible)
------------------------------*/
(function setupHamburger() {
  // Si no existe nav, salimos
  if (!navbar || !nav) return;

  // Crear botón hamburguesa
  const burger = document.createElement('button');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Abrir menú');
  burger.className = 'hamburger';
  burger.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
  navbar.parentNode.insertBefore(burger, nav);

  burger.addEventListener('click', () => {
    const opened = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!opened));
    nav.classList.toggle('nav-open');
    burger.classList.toggle('is-active');
  });

  // Cerrar al hacer click fuera (en móvil)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      burger.classList.remove('is-active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ------------------------------
   CANVAS PARTÍCULAS PASTEL (fondo)
------------------------------*/
(function particlesCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 0;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W = (canvas.width = innerWidth);
  let H = (canvas.height = innerHeight);

  const colors = ['#fff5fb', '#ffeef6', '#ffd6ea', '#ffb8db', '#ff6aa8'];
  const particles = [];
  const maxParticles = 60;

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: rand(0, W),
        y: rand(0, H),
        r: rand(0.8, 3.5),
        vx: rand(-0.15, 0.15),
        vy: rand(0.02, 0.5),
        color: colors[Math.floor(rand(0, colors.length))]
      });
    }
  }

  function resize() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    initParticles();
  }
  addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      ctx.beginPath();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.y > H + 10) { p.y = -10; p.x = rand(0, W); }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();
})();

/* ------------------------------
   CONFETI + LLUVIA DE EMOJIS
   -> se usa en estrellas y en envío
------------------------------*/
function spawnParticles(x, y, opts = {}) {
  const count = opts.count || 16;
  const shapes = opts.shapes || ['dot']; // 'dot' or 'emoji'
  const colors = opts.colors || ['#ffb6c1', '#ffc0cb', '#ff9ec5', '#ffe4ec'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'temp-particle';
    if (Math.random() > 0.5 && shapes.includes('emoji') && opts.emoji) {
      el.textContent = opts.emoji[Math.floor(Math.random() * opts.emoji.length)];
      el.style.fontSize = `${Math.floor(Math.random() * 18) + 12}px`;
    } else {
      el.style.width = el.style.height = `${Math.random() * 10 + 6}px`;
      el.style.borderRadius = `${Math.random() > 0.5 ? '50%' : '2px'}`;
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
    el.style.position = 'fixed';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = 9999;
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * (opts.dist || 120) + 30;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - (opts.lift || 20);

    el.animate(
      [
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.6)`, opacity: 0 }
      ],
      { duration: 1200 + Math.random() * 600, easing: 'cubic-bezier(.2,.8,.2,1)' }
    );

    setTimeout(() => el.remove(), 2000);
  }
}

/* ------------------------------
   ESTRELLAS — efecto elástico + confeti
------------------------------*/
(function starEffects() {
  if (!estrellas.length) return;
  const emojiPool = ['🌸','💖','🍰','✨','🎀'];

  estrellas.forEach((star) => {
    star.addEventListener('click', (e) => {
      // pop + glow class
      star.classList.add('pop-glow');
      setTimeout(() => star.classList.remove('pop-glow'), 500);

      // confetti + emojis at star center
      const rect = e.currentTarget.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, {
        count: 18,
        shapes: ['dot','emoji'],
        emoji: emojiPool,
        dist: 110,
        lift: 30
      });
    });
  });
})();

/* ------------------------------
   RIPPLE (botón enviar)
------------------------------*/
(function rippleSubmit() {
  if (!form) return;
  const submit = form.querySelector('button[type="submit"]');
  if (!submit) return;

  submit.addEventListener('click', function (e) {
    const rect = submit.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    submit.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
})();

/* ------------------------------
   TOAST + FORM SUBMIT mejorado
------------------------------*/
(function formSubmit() {
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // si hay validación nativa, se respeta; aquí solo mostramos animación
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // toast + mensaje flotante
    if (mensajeExito) {
      mensajeExito.textContent = '✅ ¡Gracias! Tu opinión llegó con cariño 💖';
      mensajeExito.style.display = 'block';
      mensajeExito.classList.remove('toast-show');
      void mensajeExito.offsetWidth;
      mensajeExito.classList.add('toast-show');
    } else {
      // fallback simple toast
      const t = document.createElement('div');
      t.className = 'toast temp-toast';
      t.textContent = '✅ ¡Gracias por tu opinión!';
      document.body.appendChild(t);
      requestAnimationFrame(() => (t.style.opacity = 1));
      setTimeout(() => {
        t.style.opacity = 0;
        setTimeout(()=>t.remove(), 600);
      }, 2500);
    }

    // lluvia de emojis desde el botón submit
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const r = submitBtn.getBoundingClientRect();
      spawnParticles(r.left + r.width / 2, r.top + r.height / 2, {
        count: 26,
        shapes: ['emoji', 'dot'],
        emoji: ['🌸','💖','🍰','✨'],
        dist: 160,
        lift: 50
      });
    }

    form.reset();
  });
})();

/* ------------------------------
   BOTÓN SUBIR (back-to-top)
------------------------------*/
(function backToTop() {
  if (!btnSubir) return;
  // Mostrar cuando se baja
  window.addEventListener('scroll', () => {
    if (scrollY > innerHeight * 0.6) {
      btnSubir.style.display = 'block';
      btnSubir.classList.add('visible-cta');
    } else {
      btnSubir.classList.remove('visible-cta');
      btnSubir.style.display = 'none';
    }
  });

  btnSubir.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // pequeño efecto
    spawnParticles(innerWidth - 80, innerHeight - 80, { count: 12, shapes: ['dot'], dist: 80 });
  });
})();

/* ------------------------------
   MODO OSCURO TOGGLE + SONIDO OPCIONAL
------------------------------*/
(function darkModeAndSound() {
  // Crear botones rápidos si no existen
  let btnModo = $('#btnModo');
  if (!btnModo) {
    btnModo = document.createElement('button');
    btnModo.id = 'btnModo';
    btnModo.title = 'Modo oscuro';
    btnModo.innerHTML = '🌓';
    document.body.appendChild(btnModo);
    btnModo.style.position = 'fixed';
    btnModo.style.right = '20px';
    btnModo.style.bottom = '90px';
    btnModo.style.zIndex = 1001;
  }

  let btnMusica = $('#btnMusica');
  if (!btnMusica) {
    btnMusica = document.createElement('button');
    btnMusica.id = 'btnMusica';
    btnMusica.title = 'Tono';
    btnMusica.innerHTML = '🎵';
    document.body.appendChild(btnMusica);
    btnMusica.style.position = 'fixed';
    btnMusica.style.right = '20px';
    btnMusica.style.bottom = '140px';
    btnMusica.style.zIndex = 1001;
  }

  // Persistencia simple con localStorage
  const stored = localStorage.getItem('modoOscuro') === '1';
  if (stored) document.body.classList.add('oscuro');

  btnModo.addEventListener('click', () => {
    const on = document.body.classList.toggle('oscuro');
    localStorage.setItem('modoOscuro', on ? '1' : '0');
    // feedback visual
    spawnParticles(innerWidth - 60, innerHeight - 140, { count: 8, shapes: ['dot'] });
  });

  // Sonido opcional (pequeño click musical)
  let audioEnabled = false;
  let audio = null;
  btnMusica.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    btnMusica.style.transform = audioEnabled ? 'scale(1.05)' : 'scale(1)';
    if (audioEnabled) {
      // tono corto sintetizado (WebAudio)
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(880, ctx.currentTime);
        g.gain.setValueAtTime(0.02, ctx.currentTime);
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        setTimeout(() => { o.stop(); ctx.close(); }, 160);
      } catch (err) {
        // noop
      }
    }
  });
})();

/* ------------------------------
   SCROLL REVEAL LIGERO
------------------------------*/
(function scrollReveal() {
  const items = $$('.producto, .opiniones, .form-container, .opinion, .logo');
  function reveal() {
    const offset = innerHeight * 0.85;
    items.forEach((it, i) => {
      const r = it.getBoundingClientRect();
      if (r.top < offset) it.classList.add('sc-visible');
    });
  }
  addEventListener('scroll', reveal);
  addEventListener('load', reveal);
})();

/* ------------------------------
   CURSOR TRAIL (opcional, suave)
------------------------------*/
(function cursorTrail() {
  const enabled = true;
  if (!enabled) return;
  const trailPool = [];
  const max = 20;

  function makeDot(x,y) {
    const d = document.createElement('div');
    d.className = 'cursor-dot';
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    d.style.position = 'fixed';
    d.style.pointerEvents = 'none';
    d.style.zIndex = 9999;
    d.style.width = d.style.height = '6px';
    d.style.borderRadius = '50%';
    d.style.background = 'rgba(255,106,166,0.95)';
    d.style.opacity = '0.9';
    document.body.appendChild(d);
    trailPool.push(d);
    if (trailPool.length > max) {
      const rem = trailPool.shift();
      rem.remove();
    }
    d.animate([
      { transform: 'translateY(0) scale(1)', opacity: 1 },
      { transform: 'translateY(-18px) scale(0.6)', opacity: 0 }
    ], { duration: 800, easing: 'cubic-bezier(.2,.9,.2,1)' });
    setTimeout(()=>d.remove(), 900);
  }

  addEventListener('mousemove', (e) => {
    // pequeñísima probabilidad para no sobrecargar
    if (Math.random() > 0.3) return;
    makeDot(e.clientX, e.clientY);
  });
})();

/* ------------------------------
   FIN: estilos temporales necesarios
   (Insertar dinámicamente CSS mínimo para los elementos creados)
------------------------------*/
(function injectTinyStyles() {
  const css = `
  /* hamburger */
  .hamburger { background: var(--pink-300); border: none; padding:8px 10px; border-radius:10px; cursor:pointer; display:flex; align-items:center; gap:6px; z-index:1001; }
  .hamburger .bar { display:block; width:18px; height:2px; background:#fff; border-radius:2px; }
  .hamburger.is-active .bar:nth-child(2) { opacity: 0; }
  .hamburger.is-active .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .hamburger.is-active .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
  .nav-open { display:flex !important; flex-direction:column; gap:8px; width:100%; }

  /* temp particle */
  .temp-particle { will-change: transform, opacity; display:flex; align-items:center; justify-content:center; }

  /* ripple */
  .ripple { position:absolute; width:18px; height:18px; background: rgba(255,255,255,0.6); border-radius:50%; transform: translate(-50%, -50%); pointer-events:none; }

  /* toast */
  .toast-show { animation: toastIn .5s ease forwards; }
  @keyframes toastIn { from { transform: translateY(10px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

  /* popup clases */
  .pop-glow { animation: starPop 0.45s cubic-bezier(.2,.9,.2,1); color: var(--pink-500) !important; text-shadow: 0 0 12px rgba(255,105,180,0.4); }
  @keyframes starPop { 0% { transform: scale(1); } 40% { transform: scale(1.45); } 70% { transform: scale(0.85);} 100%{ transform: scale(1);} }

  /* visible */
  .sc-visible { opacity: 1 !important; transform: translateY(0) !important; transition: all .6s cubic-bezier(.2,.9,.2,1); }

  /* cursor dots handled inline but style following for safety */
  .cursor-dot { pointer-events:none; }

  /* visible call-to-action */
  .visible-cta { transform: translateY(0); opacity:1; transition: all .3s ease; }
  `;
  const s = document.createElement('style');
  s.innerHTML = css;
  document.head.appendChild(s);
})();
