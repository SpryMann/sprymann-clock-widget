function formatAMPM(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "pm" : "am";
  let dayOfTheWeek = weekdays[date.getDay()];
  hours = hours % 12;
  hours = hours ? hours : "12";
  hours = hours < 10 ? `0${hours}` : hours.toString();
  minutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  seconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  return [hours, minutes, seconds, ampm, dayOfTheWeek];
}

function updateSegmentValue(segment, value) {
  segment.querySelector(".overlay").classList.add("flip");
  segment.querySelector(".score__top").textContent = value;
  setTimeout(() => {
    segment.querySelector(".overlay__bottom").textContent = value;
  }, 400);

  function finishAnimation() {
    segment.querySelector(".overlay").classList.remove("flip");
    segment.querySelector(".overlay__top").textContent = value;
    segment.querySelector(".score__bottom").textContent = value;

    segment
      .querySelector(".overlay")
      .addEventListener("animationend", finishAnimation);
  }

  segment
    .querySelector(".overlay")
    .addEventListener("animationend", finishAnimation);
}

function updateClock() {
  const clock = document.querySelector(".clock");
  const clockHours = clock.querySelector("#hours");
  const clockMinutes = clock.querySelector("#minutes");
  const clockSeconds = clock.querySelector("#seconds");
  const [hours, minutes, seconds, ampm, dayOfTheWeek] = formatAMPM(new Date());

  if (clockHours.querySelector(".score__top").innerHTML !== hours) {
    updateSegmentValue(clockHours, hours);
  }

  if (clockMinutes.querySelector(".score__top").innerHTML !== minutes) {
    updateSegmentValue(clockMinutes, minutes);
  }

  if (clockSeconds.querySelector(".score__top").innerHTML !== seconds) {
    updateSegmentValue(clockSeconds, seconds);
  }
}

function initClock() {
  const clock = document.querySelector(".clock");
  const clockHours = clock.querySelector("#hours");
  const clockMinutes = clock.querySelector("#minutes");
  const clockSeconds = clock.querySelector("#seconds");
  const [hours, minutes, seconds, ampm, dayOfTheWeek] = formatAMPM(new Date());

  updateSegmentValue(clockHours, hours);
  updateSegmentValue(clockMinutes, minutes);
  updateSegmentValue(clockSeconds, seconds);
}

window.addEventListener("DOMContentLoaded", () => {
  initClock();

  const intervalId = setInterval(() => {
    let complete = false;

    updateClock();

    if (complete) {
      clearInterval(intervalId);
    }
  }, 1000);
});
