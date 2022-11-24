"use Strict";

const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const time = document.querySelector(".timer");
const dashArray = document.getElementById("base-timer-path-remaining");
const timerCounter = document.querySelector(".timer__counter");
const remainingTime = document.querySelector(".remaining-time");
const startTimer = document.querySelector(".start_timer");

let num = 0;
let seconds, timer, mins, hours;

const timerFormat = function (num) {
  seconds = num % 60;
  const remainingSecs = num - seconds;
  const Calmins = remainingSecs / 60;
  mins = Calmins % 60;
  const Calchours = Calmins - mins;
  hours = Calchours / 60;

  return {
    hours,
    mins,
    seconds,
  };
};

const timeString = function (h, m, s) {
  return `${String(h).padStart(2, 0)}:${String(m).padStart(2, 0)}:${String(
    s
  ).padStart(2, 0)}`;
};

startBtn.addEventListener("click", function () {
  timer = setInterval(() => {
    num++;
    const { hours, mins, seconds } = timerFormat(num);
    time.textContent = timeString(hours, mins, seconds);
  }, 100);
});

stopBtn.addEventListener("click", function () {
  clearInterval(timer);
});

resetBtn.addEventListener("click", function () {
  clearInterval(timer);

  num = 0;
  hours = mins = seconds = 0;

  time.textContent = `${String(hours).padStart(2, 0)}:${String(mins).padStart(
    2,
    0
  )}:${String(seconds).padStart(2, 0)}`;
});

//time fraction

let timeInSecs = 0;
let timeLeft = 0;

const timeFraction = function () {
  const rawTimeFraction = timeLeft / timeInSecs;
  return rawTimeFraction - (1 / timeInSecs) * (1 - rawTimeFraction);
};

//stroke dash array

const calcDashArray = function () {
  const dashArrayValue = `${(+timeFraction() * 283).toFixed(0)} 283`;

  if (timeLeft / timeInSecs < 0.4) {
    dashArray.classList.add("warning");
  }
  if (timeLeft / timeInSecs < 0.2) {
    dashArray.classList.add("alert");
  }
  if (timeLeft / timeInSecs < 0.01) {
    dashArray.classList.remove("alert");
    dashArray.classList.remove("warning");
  }

  dashArray.setAttribute("stroke-dasharray", dashArrayValue);
};

//timer counter

startTimer.addEventListener("click", function () {
  const time = timerCounter.value;
  const splitTime = time.split(":");
  const hours = +splitTime[0] * 60 * 60;
  const mins = +splitTime[1] * 60;
  const secs = +splitTime[2];
  timeInSecs = hours + mins + secs;

  timeLeft = timeInSecs;
  const counter = setInterval(() => {
    timeLeft--;
    calcDashArray();
    const { hours: hr, mins: min, seconds } = timerFormat(timeLeft);
    remainingTime.textContent = timeString(hr, min, seconds);
    if (timeLeft <= 0) {
      clearInterval(counter);
      remainingTime.textContent = "Time's Up  ";
    }
  }, 1000);

  timerCounter.value = "00:00";
});
