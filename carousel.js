window.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".events-carousel");
  const track = viewport?.querySelector("[data-carousel-track]");
  const btnPrev = viewport?.querySelector("[data-carousel-prev]");
  const btnNext = viewport?.querySelector("[data-carousel-next]");
  const view = viewport?.querySelector(".events"); // a “janela” visível dos cards

  if (!viewport || !track || !btnPrev || !btnNext || !view) return;

  if (viewport.dataset.carouselInit === "1") return;
  viewport.dataset.carouselInit = "1";

  const slides = Array.from(track.children);
  const total = slides.length;
  if (total < 2) return;

  let index = 0;
  let step = 0;
  let maxIndex = 0;

  function measure() {
    const first = slides[0];
    const gap = parseInt(getComputedStyle(track).gap || 0, 10);
    step = first.offsetWidth + gap;

    // quantos cards CABEM inteiros na janela
    const visibleCount = Math.max(1, Math.floor((view.clientWidth + gap) / step));

    // último índice que ainda mostra cards inteiros (sem “vazio” no final)
    maxIndex = Math.max(0, total - visibleCount);

    // garante index válido depois de resize
    index = Math.min(Math.max(index, 0), maxIndex);
  }

  function updateButtons() {
    btnPrev.disabled = index <= 0;
    btnNext.disabled = index >= maxIndex;

    // estilo “Apple” quando desabilitado (se quiser)
    btnPrev.style.opacity = btnPrev.disabled ? "0.35" : "1";
    btnNext.style.opacity = btnNext.disabled ? "0.35" : "1";
    btnPrev.style.pointerEvents = btnPrev.disabled ? "none" : "auto";
    btnNext.style.pointerEvents = btnNext.disabled ? "none" : "auto";
  }

  function goTo(i, animate = true) {
    measure();

    index = Math.min(Math.max(i, 0), maxIndex);

    track.style.transition = animate ? "transform .35s ease" : "none";
    track.style.transform = `translateX(${-index * step}px)`;

    if (!animate) {
      track.offsetHeight; // reflow
      track.style.transition = "transform .35s ease";
    }

    updateButtons();
  }

  function next() { goTo(index + 1, true); }
  function prev() { goTo(index - 1, true); }

  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
  viewport.tabIndex = 0;

  window.addEventListener("resize", () => goTo(index, false));

  goTo(0, false);
});
