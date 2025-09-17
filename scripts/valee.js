document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------
     Botón Subir
  ------------------------- */
  const btnSubir = document.getElementById("btnSubir");

  const toggleBtnSubir = () => {
    btnSubir.style.display = window.scrollY > 200 ? "block" : "none";
  };

  btnSubir.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleBtnSubir);
  toggleBtnSubir();

  /* -------------------------
     Animación de Reglas
  ------------------------- */
  const reglas = document.querySelectorAll(".reglas li");

  const mostrarReglas = () => {
    reglas.forEach((regla) => {
      if (regla.getBoundingClientRect().top < window.innerHeight - 50) {
        regla.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", mostrarReglas);
  mostrarReglas();

  /* -------------------------
     Mensaje de Bienvenida
  ------------------------- */
  setTimeout(() => {
    const mensaje = document.createElement("div");
    mensaje.textContent =
      "¡Bienvenido a Dulce Encanto! 🧁 Gracias por visitarnos.";
    mensaje.style.position = "fixed";
    mensaje.style.top = "20px";
    mensaje.style.right = "20px";
    mensaje.style.background = "#d04679";
    mensaje.style.color = "#fff";
    mensaje.style.padding = "12px 18px";
    mensaje.style.borderRadius = "10px";
    mensaje.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    mensaje.style.zIndex = "1000";
    mensaje.style.opacity = "0";
    mensaje.style.transition = "opacity 0.8s ease";

    document.body.appendChild(mensaje);

    setTimeout(() => (mensaje.style.opacity = "1"), 100);
    setTimeout(() => (mensaje.style.opacity = "0"), 4000);
    setTimeout(() => mensaje.remove(), 5000);
  }, 800);

  /* -------------------------
     Botón Modo Claro / Oscuro
  ------------------------- */
  const btnModo = document.createElement("button");
  btnModo.id = "btnModo";
  btnModo.textContent = "🌙";
  document.body.appendChild(btnModo);

  btnModo.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
    btnModo.textContent = document.body.classList.contains("oscuro") ? "☀️" : "🌙";
  });

  /* -------------------------
     Contador de Reglas
  ------------------------- */
  const contador = document.createElement("p");
  contador.textContent = `Total de reglas: ${reglas.length}`;
  contador.style.textAlign = "center";
  contador.style.marginTop = "20px";
  contador.style.fontWeight = "bold";
  contador.style.color = "#b84c74";
  document.querySelector(".reglas").appendChild(contador);

  /* -------------------------
     Hover Interactivo
  ------------------------- */
  reglas.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "scale(1.02)";
      item.style.transition = "transform 0.3s ease";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1)";
    });
  });

  /* -------------------------
     Mostrar / Ocultar Info
  ------------------------- */
  const flechas = document.querySelectorAll(".flecha");
  flechas.forEach((flecha) => {
    flecha.addEventListener("click", () => {
      const info = flecha.nextElementSibling;
      if (info.style.display === "block") {
        info.style.display = "none";
      } else {
        info.style.display = "block";
      }
    });
  });
});

