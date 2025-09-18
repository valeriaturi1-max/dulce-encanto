/* trummps.js — JS SUPER ANIMADO, ROSADO Y AMIGABLE
   - Fondo de partículas con canvas
   - Partículas/estrellitas al mover el mouse
   - Parallax suave en secciones
   - Confeti + toast + sonido al enviar formulario
   - Botón modo claro/oscuro
   - Botón "volver arriba"
   - Protecciones si elementos faltan
*/

(() => {
  'use strict';

  // ---------- UTIL ----------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ---------- CANVAS PARTÍCULAS (fondo) ----------
  function startCanvasParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-particles';
    canvas.style.position = 'fixed';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 0;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W = canvas.width = innerWidth;
    let H = canvas.height = innerHeight;
    const colors = ['#fff0f6', '#ffe6f2', '#ffd4ea', '#ffc1e0', '#ffb0d6'];
    const particles = [];
    const N = Math.round((W * H) / 90000); // density scales with screen

    function rand(a, b) { return Math.random() * (b - a) + a; }

    function init() {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          x: rand(0, W),
          y: rand(0, H),
          r: rand(0.8, 3.5),
          vx: rand(-0.2, 0.2),
          vy: rand(0.02, 0.6),
          color: colors[Math.floor(rand(0, colors.length))],
          a: rand(0.3, 0.9)
        });
      }
    }
    init();

    function resize() {
      W = canvas.width = innerWidth;
      H = canvas.height = innerHeight;
      init();
    }
    addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.globalAlpha = p.a;
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
    draw();
  }

  // ---------- CURSOR PARTICLES (estrellitas al mover) ----------
  function setupCursorParticles() {
    let last = 0;
    document.addEventListener('mousemove', (e) => {
      // throttle
      const now = performance.now();
      if (now - last < 80) return;
      last = now;

      const el = document.createElement('div');
      el.className = 'temp-star';
      el.style.position = 'fixed';
      el.style.left = `${e.clientX - 6}px`;
      el.style.top = `${e.clientY - 6}px`;
      el.style.pointerEvents = 'none';
      el.style.zIndex = 1500;
      el.style.fontSize = `${8 + Math.random() * 14}px`;
      el.style.opacity = '1';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      el.textContent = Math.random() > 0.6 ? '★' : '✦';
      el.style.color = `hsl(${310 + Math.random()*40}deg,70%,75%)`;
      document.body.appendChild(el);
      el.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: `translateY(-36px) scale(0.6)`, opacity: 0 }
      ], { duration: 800 + Math.random()*300, easing: 'cubic-bezier(.2,.9,.2,1)'});
      setTimeout(() => el.remove(), 1200);
    });
  }

  // ---------- PARALLAX SUAVE (secciones) ----------
  function setupParallax() {
    const layers = $$('section, .form-container, .opinion');
    if (!layers.length) return;
    document.addEventListener('mousemove', (e) => {
      const cx = e.clientX / innerWidth - 0.5;
      const cy = e.clientY / innerHeight - 0.5;
      layers.forEach((el, i) => {
        const depth = 6 + (i % 4);
        const tx = cx * depth;
        const ty = cy * depth;
        // use transform with small translation to maintain CSS entry animation
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        // subtle rotation
        el.style.transition = 'transform 0.12s linear';
      });
    });
    // reset transform when mouse leaves window
    document.addEventListener('mouseleave', () => {
      layers.forEach(el => el.style.transform = '');
    });
  }

  // ---------- CONFETI (al enviar) ----------
  function launchConfetti(amount = 28) {
    for (let i = 0; i < amount; i++) {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.position = 'fixed';
      c.style.left = `${Math.random() * innerWidth}px`;
      c.style.top = `${-10 - Math.random() * 60}px`;
      c.style.width = `${6 + Math.random() * 8}px`;
      c.style.height = `${6 + Math.random() * 8}px`;
      c.style.background = `hsl(${300 + Math.random()*60},70%,70%)`;
      c.style.zIndex = 2000;
      c.style.opacity = 1;
      c.style.borderRadius = Math.random() > 0.5 ? '2px' : '50%';
      document.body.appendChild(c);

      const dx = (Math.random() - 0.5) * innerWidth * 0.6;
      const dy = innerHeight + 200 + Math.random() * 200;
      const rotate = (Math.random() - 0.5) * 720;

      c.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`, opacity: 0.02 }
      ], {
        duration: 1000 + Math.random() * 1200,
        easing: 'cubic-bezier(.2,.8,.2,1)'
      });
      setTimeout(() => c.remove(), 2500);
    }
  }

  // ---------- TOAST + SONIDO (al enviar) ----------
  function playConfirmTone() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 880; // A5
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      // ramp up and down
      g.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.02);
      g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      setTimeout(()=>{ o.stop(); ctx.close(); }, 220);
    } catch (err) {
      // audio may be blocked by browser, ignore gracefully
    }
  }

  function showToast(message = '✅ ¡Gracias!') {
    let toast = $('#__trummps_toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = '__trummps_toast';
      toast.style.position = 'fixed';
      toast.style.left = '50%';
      toast.style.bottom = '28px';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      toast.style.background = 'linear-gradient(90deg,#fff0f6,#ffd6ea)';
      toast.style.color = '#6b0046';
      toast.style.padding = '12px 18px';
      toast.style.borderRadius = '12px';
      toast.style.boxShadow = '0 10px 30px rgba(255,105,180,0.15)';
      toast.style.zIndex = 2200;
      toast.style.opacity = '0';
      toast.style.fontWeight = '700';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    // animate in
    toast.animate([
      { transform: 'translateX(-50%) translateY(20px)', opacity: 0 },
      { transform: 'translateX(-50%) translateY(0)', opacity: 1 }
    ], { duration: 360, easing: 'cubic-bezier(.2,.9,.2,1)'});
    toast.style.opacity = '1';

    setTimeout(() => {
      // animate out
      const a = toast.animate([
        { transform: 'translateX(-50%) translateY(0)', opacity: 1 },
        { transform: 'translateX(-50%) translateY(20px)', opacity: 0 }
      ], { duration: 380, easing: 'ease' });
      a.onfinish = () => { toast.style.opacity = '0'; };
    }, 2200);
  }

  // ---------- MODO OSCURO (toggle) ----------
  function setupModeToggle() {
    const btn = document.createElement('button');
    btn.id = 'trummps_mode';
    btn.title = 'Cambiar modo';
    btn.innerHTML = '🌙';
    Object.assign(btn.style, {
      position: 'fixed',
      right: '18px',
      bottom: '86px',
      zIndex: 2100,
      border: 'none',
      padding: '12px 14px',
      borderRadius: '50%',
      cursor: 'pointer',
      background: 'linear-gradient(90deg,#ffb6d9,#ff6fae)',
      color: '#fff',
      boxShadow: '0 8px 20px rgba(255,105,180,0.18)',
      fontSize: '18px'
    });
    document.body.appendChild(btn);

    // load saved preference
    if (localStorage.getItem('trummps_mode') === 'dark') {
      document.body.classList.add('oscuro');
      btn.innerHTML = '☀️';
    }

    btn.addEventListener('click', () => {
      const on = document.body.classList.toggle('oscuro');
      btn.innerHTML = on ? '☀️' : '🌙';
      localStorage.setItem('trummps_mode', on ? 'dark' : 'light');
      // quick particle burst to celebrate mode change
      for (let i = 0; i < 10; i++) {
        const el = document.createElement('div');
        el.className = 'temp-star';
        el.style.position = 'fixed';
        el.style.left = (innerWidth - 60) + 'px';
        el.style.top = (innerHeight - 140 - i*6) + 'px';
        el.style.fontSize = '12px';
        el.style.color = `hsl(${320 + Math.random()*20},80%,70%)`;
        document.body.appendChild(el);
        el.animate([
          { transform: 'translateY(0) scale(1)', opacity: 1 },
          { transform: `translateY(-40px) scale(.6)`, opacity: 0 }
        ], { duration: 900, easing: 'cubic-bezier(.2,.9,.2,1)'});
        setTimeout(()=>el.remove(), 1000);
      }
    });
  }

  // ---------- BOTÓN "VOLVER ARRIBA" ----------
  function setupBackTop() {
    const btn = document.createElement('button');
    btn.id = 'trummps_backtop';
    btn.title = 'Subir';
    btn.textContent = '⬆';
    Object.assign(btn.style, {
      position: 'fixed',
      right: '18px',
      bottom: '18px',
      zIndex: 2100,
      border: 'none',
      padding: '12px 14px',
      borderRadius: '50%',
      cursor: 'pointer',
      background: '#ff6fae',
      color: '#fff',
      boxShadow: '0 8px 20px rgba(255,105,180,0.18)',
      fontSize: '18px',
      display: 'none'
    });
    document.body.appendChild(btn);

    addEventListener('scroll', () => {
      btn.style.display = scrollY > innerHeight * 0.5 ? 'block' : 'none';
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---------- FORM SUBMIT HANDLER (confeti + toast + sound + mailto fallback) ----------
  function setupForm() {
    const form = $('#opinionForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // get data
      let rating = form.rating?.value || (() => {
        const r = form.querySelector('input[name="rating"]:checked');
        return r ? r.value : 'N/A';
      })();
      const comentario = form.comentarios?.value || '';

      // show toast + confetti + sound
      showToast('✅ ¡Gracias por tu opinión!');
      launchConfetti(36);
      playConfirmTone();

      // open mail client as graceful fallback (user can change the email)
      const asunto = encodeURIComponent('Opinión - Dulce Encanto');
      const cuerpo = encodeURIComponent(`Puntuación: ${rating}\n\nComentario:\n${comentario}`);
      // open mailto in a short delay so visual feedback appears
      setTimeout(() => {
        window.location.href = `mailto:tucorreo@ejemplo.com?subject=${asunto}&body=${cuerpo}`;
      }, 500);

      form.reset();
    });
  }

  // ---------- INJECT MINIMAL STYLES NEEDED ----------
  function injectStyles() {
    const css = `
      /* minimal elements for temp items */
      .temp-star { pointer-events:none; z-index:2000; user-select:none; }
      .confetti-piece { pointer-events:none; z-index:2000; }
      .temp-star, .confetti-piece { will-change: transform, opacity; }
      /* toast handled inline in JS */
      body.oscuro { filter: invert(0.02) hue-rotate(200deg) saturate(0.9); }
    `;
    const s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---------- BOOT ----------
  function init() {
    injectStyles();
    startCanvasParticles();
    setupCursorParticles();
    setupParallax();
    setupModeToggle();
    setupBackTop();
    setupForm();
    setupCursorAccessibility();
  }

  // Optional: make cursor effects quieter on touch devices
  function setupCursorAccessibility() {
    if ('ontouchstart' in window) {
      // remove some mouse-driven behavior for touch devices
      // remove parallax for better perf on mobile
      document.removeEventListener('mousemove', null);
    }
  }

  // expose a smaller confetti function
  function launchConfetti(count = 28) { launchConfettiInner(count); }
  function launchConfettiInner(amount) { launchConfetti; } // placeholder to keep lint happy

  // Run init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
