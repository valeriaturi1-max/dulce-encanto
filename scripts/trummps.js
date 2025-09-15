// Capturar formulario
const form = document.getElementById("opinionForm");
const mensajeExito = document.getElementById("mensajeExito");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Mostrar mensaje de éxito con rebote
  mensajeExito.style.display = "block";
  mensajeExito.style.animation = "bounceIn 0.8s ease";

  // Resetear formulario
  form.reset();

  // Ocultar mensaje después de 3 segundos
  setTimeout(() => {
    mensajeExito.style.display = "none";
  }, 3000);
});

// Animación de "pop" al seleccionar estrellas
document.querySelectorAll(".stars label").forEach((star) => {
  star.addEventListener("click", () => {
    star.style.transform = "scale(1.3)";
    setTimeout(() => {
      star.style.transform = "scale(1)";
    }, 200);
  });
});
