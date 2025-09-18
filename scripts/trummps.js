/* 💖 JS SUPER DINÁMICO ROSA */

/* ✨ Aparición suave al hacer scroll */
const visibles = document.querySelectorAll('section, .opinion, .form-container');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:0.2});
visibles.forEach(v=>observer.observe(v));

/* 💫 Partículas al mover el mouse */
document.addEventListener('mousemove', (e)=>{
  if(Math.random() < 0.15){
    const p = document.createElement('div');
    p.className='particle';
    p.style.left = e.clientX+'px';
    p.style.top = e.clientY+'px';
    p.style.background = `hsl(${Math.random()*360},80%,85%)`;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),1000);
  }
});

/* 🖱️ Parallax suave en secciones */
document.addEventListener('mousemove', (e)=>{
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  document.querySelectorAll('section, .form-container').forEach(sec=>{
    sec.style.transform = `translate(${x}px,${y}px)`;
  });
});

/* 🌗 Botón modo oscuro/claro */
const btnModo = document.getElementById('btnModo');
btnModo.addEventListener('click', ()=>{
  document.body.classList.toggle('oscuro');
  btnModo.textContent = document.body.classList.contains('oscuro') ? '☀️' : '🌙';
  btnModo.classList.add('bounce');
  setTimeout(()=>btnModo.classList.remove('bounce'),300);
});

/* 🎉 Confeti al enviar formulario */
const form = document.getElementById('opinionForm');
if(form){
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    for(let i=0;i<25;i++){
      const c = document.createElement('div');
      c.className = 'confeti';
      c.style.left = Math.random()*window.innerWidth+'px';
      c.style.background = `hsl(${Math.random()*360},80%,70%)`;
      document.body.appendChild(c);
      setTimeout(()=>c.remove(),1500);
    }
    alert('💖 ¡Gracias por tu opinión!');
    form.reset();
  });
}

/* 📱 Ajuste responsive de fuente */
window.addEventListener('resize',()=>{
  document.body.style.fontSize = window.innerWidth<500?'15px':'16px';
});

