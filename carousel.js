window.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".events-carousel");
  const viewport = carousel?.querySelector(".events");
  const track = carousel?.querySelector("[data-carousel-track]");
  const btnPrev = carousel?.querySelector("[data-carousel-prev]");
  const btnNext = carousel?.querySelector("[data-carousel-next]");

  if (!carousel || !viewport || !track || !btnPrev || !btnNext) return;

  // evita init duplicado
  if (carousel.dataset.init === "1") return;
  carousel.dataset.init = "1";

  function getStep() {
    const card = track.children[0];
    if (!card) return 0;

    const gap = parseInt(getComputedStyle(track).gap || 0, 10);
    return card.offsetWidth + gap;
  }

  btnNext.addEventListener("click", () => {
    viewport.scrollBy({
      left: getStep(),
      behavior: "smooth"
    });
  });

  btnPrev.addEventListener("click", () => {
    viewport.scrollBy({
      left: -getStep(),
      behavior: "smooth"
    });
  });
});
