// hack >>

const sound1 = new Audio("../../dist/sound/play.wav");
const sound2 = new Audio("../../dist/sound/pause.mp3");

const el: HTMLElement = document.querySelector(
  ".app__btn"
) as HTMLButtonElement;

const time: HTMLElement = document.querySelector(
  ".app__time"
) as HTMLDivElement;

let interval: any;

el.addEventListener("click", () => {
  if (el.textContent === "Iniciar") {
    interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        time.textContent = formatSecondsToMinutes(seconds);
      } else {
        clearInterval(interval);
        el.textContent = "Iniciar";
      }
    }, 1000);

    el.textContent = "Pausar";
    sound1.play();
  } else {
    clearInterval(interval);
    el.textContent = "Iniciar";
    sound2.play();
  }
});

// << hack
