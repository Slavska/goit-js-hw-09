import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnSubmit = document.querySelector('.form');

btnSubmit.addEventListener('submit', submitForm);

function submitForm(evt) {
  evt.preventDefault();
  let firstDelay = Number(evt.currentTarget.delay.value);
  const stepDelay = Number(evt.currentTarget.step.value);
  const amount = Number(evt.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, firstDelay);
    firstDelay += stepDelay;
  }
}

const createPromise = (position, delay) => {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
};
