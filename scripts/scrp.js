
  document.addEventListener("DOMContentLoaded", function () {
    // 1. Mensaje de bienvenida
    Swal.fire({
      title: "¡Bienvenido a Dulce Encanto!",
      text: "¿Listo para ordenar tu postre favorito? 🍰",
      icon: "info",
      confirmButtonText: "Sí, claro"
    });

    // 2. Confirmación al hacer clic en redes sociales
    const socialLinks = document.querySelectorAll('.redes-sociales a');

    socialLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevenir navegación por ahora
        const red = this.getAttribute('aria-label');

        Swal.fire({
          title: `¿Quieres ir a ${red}?`,
          text: "Serás redirigido a una nueva pestaña.",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, llévame",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(this.href, '_blank'); // Abrir en nueva pestaña
          }
        });
      });
    });

    // 3. Efecto hover en los datos de contacto
    const boxes = document.querySelectorAll('.styles-demo .box');

    boxes.forEach(box => {
      box.addEventListener('mouseenter', function () {
        this.style.backgroundColor = '#fff0f5'; // Rosa claro
        this.style.transition = '0.3s';
        this.style.transform = 'scale(1.02)';
      });

      box.addEventListener('mouseleave', function () {
        this.style.backgroundColor = ''; // Reset
        this.style.transform = 'scale(1)';
      });
    });

    // 4. Aviso al intentar salir (opcional)
    // window.addEventListener("beforeunload", function (e) {
    //   e.preventDefault();
    //   e.returnValue = "¿Seguro que quieres salir de la página de contacto?";
    // });
  });

