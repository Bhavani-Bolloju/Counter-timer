"use Strict";

const dashArray = document.getElementById("base-timer-path-remaining");
const timerCounter = document.querySelector(".timer__counter");
const remainingTime = document.querySelector(".remaining-time");
const startTimer = document.querySelector(".start_timer");
const displayTimer = document.querySelector(".counter");
const resetTimer = document.querySelector(".reset_timer");
const svgPath = document.querySelector(".base-timer__path-remaining");

//...........................................//

let timeLimit, time;

const timeInSeconds = function (time) {
  const splitTime = time.split(":");
  const hours = +splitTime[0] * 60 * 60;
  const mins = +splitTime[1] * 60;
  const secs = +splitTime[2];

  return hours + mins + secs;
};

const timeReset = function () {
  timerCounter.value = `00:00:00`;
  timerCounter.classList.remove("hidden");
  displayTimer.classList.add("hidden");
  dashArray.classList.remove("warning");
};

const timer = function (num) {
  const seconds = num % 60;
  const remainingTimeMins = (num - seconds) / 60;
  const mins = remainingTimeMins % 60;
  const hours = Math.floor(remainingTimeMins / 60);

  return num < 3600
    ? `${String(mins).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`
    : `${String(hours).padStart(2, 0)}:${String(mins).padStart(2, 0)}:${String(
        seconds
      ).padStart(2, 0)}`;
};

//fraction of time left

const calcTimeFraction = function () {
  const rawTimeFraction = time / timeLimit;
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
};

//updating dash array value

const setCircleDashArray = function () {
  const dashArrayValue = `${(+calcTimeFraction() * 283).toFixed(0)} 283`;
  dashArray.setAttribute("stroke-dasharray", dashArrayValue);
};

//starting timer
startTimer.addEventListener("click", function () {
  value = timerCounter.value;
  timeLimit = timeInSeconds(value);
  time = timeLimit;

  counter = setInterval(() => {
    timerCounter.classList.add("hidden");
    displayTimer.classList.remove("hidden");
    time--;
    const displayCounter = timer(time);
    displayTimer.textContent = displayCounter;

    setCircleDashArray();

    if (time / timeLimit < 0.5 && time / timeLimit > 0.2) {
      dashArray.classList.add("alert");
    }
    if (time / timeLimit < 0.2) {
      dashArray.classList.remove("alert");
      dashArray.classList.add("warning");
    }

    if (time <= 0) {
      clearInterval(counter);
      timeReset();
    }
  }, 1000);
});

//resetting the timer
resetTimer.addEventListener("click", function () {
  clearInterval(counter);
  timeLimit = time = 0;
  setCircleDashArray();
  timeReset();
});
