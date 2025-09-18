// 🌗 Botón modo oscuro
const btnModo = document.createElement("button");
btnModo.id="btnModo"; btnModo.textContent="🌙";
document.body.appendChild(btnModo);

if(localStorage.getItem("modo")==="oscuro"){
  document.body.classList.add("oscuro"); btnModo.textContent="☀️";
}
btnModo.onclick=()=>{
  document.body.classList.toggle("oscuro");
  const oscuro=document.body.classList.contains("oscuro");
  btnModo.textContent = oscuro?"☀️":"🌙";
  localStorage.setItem("modo", oscuro?"oscuro":"claro");
};

// ⬆ Botón subir
const btnTop = document.createElement("button");
btnTop.id="btnTop"; btnTop.textContent="⬆";
document.body.appendChild(btnTop);

window.addEventListener("scroll",()=>{
  btnTop.style.display = window.scrollY>300?"flex":"none";
});
btnTop.onclick=()=>window.scrollTo({top:0,behavior:"smooth"});

// ✨ Aparición de secciones al hacer scroll
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("visible");
  });
},{threshold:0.2});
document.querySelectorAll("section,.form-container,.opinion")
.forEach(el=>obs.observe(el));

// 💖 Partículas flotantes
setInterval(()=>{
  const p=document.createElement("div");
  p.className="particle";
  p.style.left = Math.random()*window.innerWidth+"px";
  p.style.top = (window.scrollY+window.innerHeight)+"px";
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),4000);
},300);
