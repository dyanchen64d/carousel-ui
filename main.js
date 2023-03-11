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

  const itemCount = slider.children.length;
  const itemPerScreen =
    getComputedStyle(slider).getPropertyValue('--items-per-screen');
  const progressBarItemCount = Math.ceil(itemCount / itemPerScreen);

  if (direction === 'left') {
    if (sliderIdx > 0) {
      slider.style.setProperty('--slider-index', Number(sliderIdx) - 1);
    } else {
      slider.style.setProperty('--slider-index', progressBarItemCount - 1);
    }
  }

  if (direction === 'right') {
    if (sliderIdx < progressBarItemCount - 1) {
      slider.style.setProperty('--slider-index', Number(sliderIdx) + 1);
    } else {
      slider.style.setProperty('--slider-index', 0);
    }
  }

  calcProgressBar(progressBar);
}

// addEventListener('resize', calcProgressBar);
const throttleCalcProgressBar = throttle(calcProgressBar, 500);
addEventListener('resize', () => {
  throttleCalcProgressBar(progressBar);
});

function calcProgressBar(pb) {
  pb.innerHTML = '';
  const itemCount = slider.children.length;

  const itemPerScreen =
    getComputedStyle(slider).getPropertyValue('--items-per-screen');

  const progressBarItemCount = Math.ceil(itemCount / itemPerScreen);

  let sliderIdx = getComputedStyle(slider).getPropertyValue('--slider-index');

  // console.log('sliderIdx', sliderIdx);
  console.log('progressBarItemCount', progressBarItemCount);

  if (Number(sliderIdx) >= progressBarItemCount) {
    slider.style.setProperty('--slider-index', progressBarItemCount - 1);
    sliderIdx = progressBarItemCount - 1;
  }

  for (let i = 0; i < progressBarItemCount; i++) {
    pb.innerHTML += `
      <div class="progress-item ${i === Number(sliderIdx) ? 'active' : ''}" />
    `;
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;

  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}

calcProgressBar(progressBar);
