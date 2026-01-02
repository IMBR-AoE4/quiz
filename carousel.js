window.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".events-carousel");
  const track = viewport?.querySelector("[data-carousel-track]");
  const btnPrev = viewport?.querySelector("[data-carousel-prev]");
  const btnNext = viewport?.querySelector("[data-carousel-next]");

  if (!viewport || !track || !btnPrev || !btnNext) return;

  // trava anti-duplo-init
  if (viewport.dataset.carouselInit === "1") return;
  viewport.dataset.carouselInit = "1";

  const slides = Array.from(track.children);
  const total = slides.length;
  if (total < 2) return;

  let index = 0;
  let slideWidth = 0;

  function measure() {
  slideWidth = viewport.clientWidth;
}

  function goTo(i, animate = true) {
    measure();
    if (!animate) track.style.transition = "none";
    else track.style.transition = "transform .35s ease";

    track.style.transform = `translateX(${-i * slideWidth}px)`;

    if (!animate) {
      track.offsetHeight; // reflow
      track.style.transition = "transform .35s ease";
    }
  }

  function next() {
    index = (index + 1) % total; // wrap
    goTo(index, true);
  }

  function prev() {
    index = (index - 1 + total) % total; // wrap
    goTo(index, true);
  }

  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  // teclado (opcional)
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
  viewport.tabIndex = 0; // permite foco pra teclado

  window.addEventListener("resize", () => goTo(index, false));

  // inicial
  goTo(0, false);
});
