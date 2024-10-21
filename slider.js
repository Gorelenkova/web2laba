const sliderContainers = document.querySelectorAll('.slider-container');

function showImage(container, index) {
  const images = container.querySelectorAll('img');
  images.forEach((image, i) => {
    if (i === index) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  })
}

sliderContainers.forEach((container) => {
  let currentImageIndex = 0;

  container.querySelector('.prev-button').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(container, currentImageIndex);
  });

  container.querySelector('.next-button').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(container, currentImageIndex);
  });

  // Вызов функции для показа первого изображения в каждом слайдере
  showImage(container, 0);
});
