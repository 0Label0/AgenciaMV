const carousel = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');

let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  carousel.classList.add('active');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // velocidad del drag
  carousel.scrollLeft = scrollLeft - walk;
});

const slides = Array.from(track.children);
const dots = Array.from(document.querySelectorAll('.dot'));
const totalSlides = slides.length;

let currentIndex = 0;

// Función para actualizar estado de las slides + dots
function updateCarousel(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    slide.classList.add('inactive');
    if (i === index) {
      slide.classList.add('active');
      slide.classList.remove('inactive');
    }
  });

  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

// Función para ir a una slide concreta
function goToSlide(index) {
  // limitar índice entre 0 y totalSlides - 1
  index = Math.max(0, Math.min(index, totalSlides - 1));

  const slideWidth = slides[0].getBoundingClientRect().width;
  carousel.scrollTo({
    left: slideWidth * index,
    behavior: "smooth"
  });

  currentIndex = index;
  updateCarousel(index);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
});

// Detectar movimiento del carrusel y actualizar los dots + slides
carousel.addEventListener('scroll', () => {
  const slideWidth = slides[0].getBoundingClientRect().width;
  let index = Math.round(carousel.scrollLeft / slideWidth);

  // limitar índice
  index = Math.max(0, Math.min(index, totalSlides - 1));

  if (index !== currentIndex) {
    currentIndex = index;
    updateCarousel(index);
  }
});

updateCarousel(currentIndex);