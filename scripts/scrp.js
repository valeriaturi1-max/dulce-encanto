
  // Mostrar mensaje de bienvenida al cargar la página
  window.addEventListener('DOMContentLoaded', () => {
    Swal.fire('¡Bienvenido a la página de contacto de Dulce Encanto! 🍰');
  });

  // Alerta al hacer clic en los íconos de redes sociales
  const redes = document.querySelectorAll('.links-section a');
  redes.forEach(icono => {
    icono.addEventListener('click', (e) => {
      e.preventDefault(); // Evita que redirija (por ahora)
      Swal.fire('Pronto podrás seguirnos en nuestras redes sociales.');
    });
  });

