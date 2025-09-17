// Mensaje de bienvenida
window.addEventListener("DOMContentLoaded", () => {
  Swal.fire("🍰 ¡Bienvenido a Dulce Encanto! Esperamos que disfrutes nuestros postres.");
});

// Resaltar enlace activo del menú
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("activo");
  }

  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("activo"));
    link.classList.add("activo");
  });
});

// Cambiar fondo de la tabla al pasar el mouse
const tabla = document.querySelector(".postres-table");
tabla.addEventListener("mouseenter", () => {
  tabla.style.backgroundColor = "#fff0f5";
});
tabla.addEventListener("mouseleave", () => {
  tabla.style.backgroundColor = "white";
});

// Alerta al hacer clic en una tarjeta de postre
const tarjetas = document.querySelectorAll(".postre-card");
tarjetas.forEach(card => {
  card.addEventListener("click", () => {
    const nombre = card.querySelector("h3").innerText;
    Swal.fire(`😋 ¡Has seleccionado el postre: ${nombre}!`);
  });

  // Efecto visual al pasar el cursor
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
    card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    card.style.transition = "all 0.3s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "none";
  });
});
