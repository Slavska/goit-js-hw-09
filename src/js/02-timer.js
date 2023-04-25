import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const fieldEl = document.querySelectorAll('.field');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const labelEl = document.querySelectorAll('.label');
const valueEl = document.querySelectorAll('.value');

btnStart.setAttribute('disabled', true);
let counterInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      btnStart.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    if (selectedDates[0] > new Date()) {
      btnStart.removeAttribute('disabled');
    }

    btnStart.addEventListener('click', () => {
      counterInterval = setInterval(() => {
        const timeInterval = selectedDates[0] - new Date();

        if (timeInterval < 1000) {
          clearInterval(counterInterval);
        } else {
          const result = convertMs(timeInterval);
          addResult(result);
        }
      }, 1000);
    });
  },
};

flatpickr(inputDate, options);

function addResult({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

for (let i = 0; i < fieldEl.length; i++) {
  valueEl[i].style.fontSize = '50px';
  labelEl[i].style.textTransform = 'uppercase';
  fieldEl[i].style.display = 'inline-flex';
  fieldEl[i].style.flexDirection = 'column';
  fieldEl[i].style.alignItems = 'center';
  fieldEl[i].style.marginRight = '20px';
}
