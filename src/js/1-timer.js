import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('.start-btn');
const textInput = document.querySelector('#datetime-picker');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        color: 'red',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr('#datetime-picker', options);

let intervalId;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  textInput.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = new Date();
    const differTime = userSelectedDate - currentTime;

    if (differTime <= 0) {
      clearInterval(intervalId);
      textInput.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(differTime);

    daysSpan.textContent = String(days).padStart(2, '0');
    hoursSpan.textContent = String(hours).padStart(2, '0');
    minutesSpan.textContent = String(minutes).padStart(2, '0');
    secondsSpan.textContent = String(seconds).padStart(2, '0');
  }, 1000);
});

function convertMs(differTime) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(differTime / day);
  const hours = Math.floor((differTime % day) / hour);
  const minutes = Math.floor(((differTime % day) % hour) / minute);
  const seconds = Math.floor((((differTime % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
