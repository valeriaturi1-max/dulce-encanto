Swal.fire("Bienvenido a la pagina de Dulce encanto");
document.addEventListener("DOMContentLoaded", () => {
  const descripciones = {
    fiorella: "Fiorella es nuestra chef repostera principal. Su pasión por los sabores únicos y la perfección en cada pastel hacen que cada postre sea inolvidable.",
    fabiana: "Fabiana tiene un talento especial para la decoración. Cada detalle visual que ves en nuestros postres lleva su toque creativo.",
    rosa: "Rosa es la mente estratégica detrás del negocio. Lidera con amor y visión todo lo que hacemos.",
    valentina: "Valentina es experta en técnicas modernas de repostería y siempre está innovando con nuevas recetas deliciosas."
  };

  const miembros = document.querySelectorAll(".miembro"); 

  miembros.forEach((miembro) => {
    miembro.addEventListener("click", () => {
      const clave = miembro.getAttribute("data-miembro");
      const nombre = miembro.querySelector(".nombre").textContent;

      Swal.fire({
        title: nombre,
        text: descripciones[clave] || "Descripción no disponible.",
        icon: "info",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#d04679",
        background: "#fff0f5"
      });
    });
  });
});
