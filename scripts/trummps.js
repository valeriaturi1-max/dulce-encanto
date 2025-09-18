/* 💖 JS SUPER DINÁMICO PASTEL */

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
  if(Math.random() < 0.2){
    const p = document.createElement('div');
    p.className='particle';
    p.style.left = e.clientX+'px';
    p.style.top = e.clientY+'px';
    p.style.background = `hsl(${Math.random()*360},80%,80%)`;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),1000);
  }
});

/* 🌗 Botón modo oscuro/claro */
const btnModo = document.getElementById('btnModo');
btnModo.addEventListener('click', ()=>{
  document.body.classList.toggle('oscuro');
  btnModo.textContent = document.body.classList.contains('oscuro') ? '☀️' : '🌙';
  btnModo.classList.add('bounce');
  setTimeout(()=>btnModo.classList.remove('bounce'),300);
});

/* ⬆ Aparecer botón subir */
const btnSubir = document.getElementById('btnSubir');
window.addEventListener('scroll',()=>{
  btnSubir.style.display = window.scrollY>300?'block':'none';
});
btnSubir.addEventListener('click',()=>{
  window.scrollTo({top:0,behavior:'smooth'});
});

/* 📱 Ajustes responsive automáticos */
window.addEventListener('resize',()=>{
  document.body.style.fontSize = window.innerWidth<500?'15px':'16px';
});
