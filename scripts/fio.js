
window.addEventListener("DOMContentLoaded", () => {
    alert("¡Bienvenido a la página de 'Quiénes Somos' de Dulce Encanto!");
});


document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("activo"); 
    }
});


document.querySelectorAll(".miembro").forEach(miembro => {
    miembro.addEventListener("mouseenter", () => {
        miembro.style.transform = "scale(1.05)";
        miembro.style.transition = "transform 0.3s ease";
    });

    miembro.addEventListener("mouseleave", () => {
        miembro.style.transform = "scale(1)";
    });
});
