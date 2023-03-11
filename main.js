import './style.css';

const leftHandle = document.querySelector('.left-handle');

const rightHandle = document.querySelector('.right-handle');

leftHandle.addEventListener('click', () => {
  onHandleClick('left');
});

rightHandle.addEventListener('click', () => {
  onHandleClick('right');
});

function onHandleClick(direction) {
  // console.log('direction', direction);

  const slider = document.querySelector('.slider');
  // console.log('slider', slider);

  const sliderIdx = getComputedStyle(slider).getPropertyValue('--slider-index');
  // console.log('sliderIdx', sliderIdx);

  if (direction === 'left') {
    slider.style.setProperty('--slider-index', Number(sliderIdx) - 1);
  }

  if (direction === 'right') {
    slider.style.setProperty('--slider-index', Number(sliderIdx) + 1);
  }
}
