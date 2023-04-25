const bodyEl = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let changeColor = null;

btnStart.addEventListener('click', StartClick);
btnStop.addEventListener('click', StopClick);

function StartClick() {
  btnStart.setAttribute('disabled', true);
  changeColor = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function StopClick() {
  btnStart.removeAttribute('disabled');
  clearInterval(changeColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
