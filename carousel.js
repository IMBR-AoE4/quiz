(() => {
  const track = document.querySelector(".events-carousel .events");
  if (!track) return;

  const slides = Array.from(track.children);
  const total = slides.length;
  let index = 0;

  // clona primeiro e último para loop infinito
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[total - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = Array.from(track.children);
  let slideWidth = slides[0].getBoundingClientRect().width;

  let position = -slideWidth;
  track.style.transform = `translateX(${position}px)`;

  function updateWidth(){
    slideWidth = slides[0].getBoundingClientRect().width;
    position = -(index + 1) * slideWidth;
    track.style.transition = "none";
    track.style.transform = `translateX(${position}px)`;
  }

  window.addEventListener("resize", updateWidth);

  function moveNext(){
    index++;
    track.style.transition = "transform .6s ease";
    track.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;

    if (index === total){
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;
      }, 650);
    }
  }

  setInterval(moveNext, 5000);
})();
