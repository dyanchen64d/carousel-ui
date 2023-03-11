import './style.css';

const leftHandle = document.querySelector('.left-handle');

const rightHandle = document.querySelector('.right-handle');

const slider = document.querySelector('.slider');

const progressBar = document.querySelector('.progress-bar');

leftHandle.addEventListener('click', () => {
  onHandleClick('left');
});

rightHandle.addEventListener('click', () => {
  onHandleClick('right');
});

function onHandleClick(direction) {
  const sliderIdx = getComputedStyle(slider).getPropertyValue('--slider-index');
  // console.log('sliderIdx', sliderIdx);

  if (direction === 'left') {
    slider.style.setProperty('--slider-index', Number(sliderIdx) - 1);
  }

  if (direction === 'right') {
    slider.style.setProperty('--slider-index', Number(sliderIdx) + 1);
  }

  calcProgressBar(progressBar);
}

function calcProgressBar(pb) {
  pb.innerHTML = '';
  const itemCount = slider.children.length;

  const itemPerScreen =
    getComputedStyle(slider).getPropertyValue('--items-per-screen');

  const progressBarItemCount = Math.ceil(itemCount / itemPerScreen);

  const sliderIdx = getComputedStyle(slider).getPropertyValue('--slider-index');

  for (let i = 0; i < progressBarItemCount; i++) {
    pb.innerHTML += `
      <div class="progress-item ${i === Number(sliderIdx) ? 'active' : ''}" />
    `;
  }
}

calcProgressBar(progressBar);
