"use Strict";

const startBtn = document.querySelector(".timer__start");
const stopBtn = document.querySelector(".timer__pause");
const resetBtn = document.querySelector(".timer__reset");

const hoursContainer = document.querySelector(".timer__text-hours");
const minutesContainer = document.querySelector(".timer__text-mins");
const secondsContainer = document.querySelector(".timer__text-secs");

const onesText = document.querySelectorAll(".ones");
const tensText = document.querySelectorAll(".tens");

let num = 0;
let seconds, timer, mins, hours;

const timerFormat = function (value, section, container, animation = true) {
  const [tensValue, onesValue] = String(value).padStart(2, 0).split("");
  const html = `
  <span class="${section}">
    <span class='tens ${section}_tens ${
    animation && onesValue == 0 ? "tens-animate" : ""
  }'>${tensValue}</span>
    <span class="ones ${section}_ones ${
    animation && "ones-animate"
  }">${onesValue}</span>
  </span>`;

  container.innerHTML = "";
  container.insertAdjacentHTML("afterbegin", html);
};

const secsTimer = function (value) {
  timerFormat(value, "secs", secondsContainer);
};

const minsTimer = function (value) {
  timerFormat(value, "mins", minutesContainer);
};

const hoursTimer = function (value) {
  timerFormat(value, "hrs", hoursContainer);
};

let start = true;

startBtn.addEventListener("click", function () {
  if (start) {
    timer = setInterval(() => {
      num++;
      seconds = num % 60;
      const remainingTimeMins = (num - seconds) / 60;
      mins = remainingTimeMins % 60;
      hours = remainingTimeMins / 60;
      secsTimer(seconds);
      if (seconds === 0) {
        minsTimer(mins);
      }
      if (mins === 0 && seconds === 0) {
        hoursTimer(hours);
      }
    }, 1000);
  }

  start = !start;

  if (!start) {
    startBtn.textContent = "Pause";
  }

  if (start) {
    startBtn.textContent = "Start";
    clearInterval(timer);
  }
});

resetBtn.addEventListener("click", function () {
  clearInterval(timer);
  num = 0;
  timerFormat(0, "hrs", hoursContainer, false);
  timerFormat(0, "mins", minutesContainer, false);
  timerFormat(0, "secs", secondsContainer, false);
});
