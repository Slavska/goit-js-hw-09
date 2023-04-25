function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const bodyEl = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let changeColor = null;

btnStart.addEventListener('click', startClick);
btnStop.addEventListener('click', stopClick);

function startClick() {
  btnStart.setAttribute('disabled', true);
  changeColor = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopClick() {
  btnStart.removeAttribute('disabled');
  clearInterval(changeColor);
}
