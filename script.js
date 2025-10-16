document.addEventListener('DOMContentLoaded', () => {
  const carouselEl = document.querySelector('.carrusel');
  if (!carouselEl) return; // seguridad
  const container = carouselEl.querySelector('.manuales-container');
  const slides = Array.from(container.querySelectorAll('.manual-card'));
  const btnLeft = carouselEl.querySelector('.flecha.izquierda');
  const btnRight = carouselEl.querySelector('.flecha.derecha');

  let index = 0;
  // si no hay slides, salir
  if (slides.length === 0) return;

  function update() {
    // ancho visible del carrusel (área que se muestra)
    const visibleWidth = carouselEl.clientWidth;
    container.style.transform = `translateX(-${index * visibleWidth}px)`;
  }

  btnRight && btnRight.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });

  btnLeft && btnLeft.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  // al redimensionar recalcular (mantiene slide actual visible)
  window.addEventListener('resize', update);

  // inicializa posición correcta
  update();
});

