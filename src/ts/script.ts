// Variáveis globais
let seconds: number;
let interval: number;
const music: HTMLAudioElement = new Audio("../sound/music.mp3");
const play: HTMLAudioElement = new Audio("../sound/play.wav");
const pause: HTMLAudioElement = new Audio("../sound/pause.mp3");
const beep: HTMLAudioElement = new Audio("../sound/beep.mp3");

music.loop = true;
beep.loop = true;

// Mapeamento de elementos do DOM
const body = document.querySelector("body") as HTMLBodyElement;
const time = document.querySelector(".app__time") as HTMLDivElement;
const toggleMuteMusic = document.querySelector(
  ".app__enable-music-btn"
) as HTMLButtonElement;
const options = document.querySelectorAll(
  ".app__option"
) as NodeListOf<HTMLButtonElement>;
const startOrPause: HTMLElement = document.querySelector(
  ".app__btn"
) as HTMLButtonElement;

// Funções
const formatSecondsToMinutes = (seconds: number): string => {
  const date = new Date(seconds * 1000);
  const options: Intl.DateTimeFormatOptions = {
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };

  return date.toLocaleString("en-US", options);
};

const handleToggleMuteMusic = (event: MouseEvent) => {
  const element = event.target as HTMLButtonElement;
  const attr: string = element.dataset.audio === "on" ? "off" : "on";

  attr === "on" ? music.play() : music.pause();

  element.textContent = attr;
  element.dataset.audio = attr;
};

const handleStartOrPause = (event: MouseEvent) => {
  const element = event.target as HTMLButtonElement;
  const timeRunningState = element.dataset.timeRunningState || "stopped";

  if (timeRunningState === "stopped") {
    element.dataset.timeRunningState = "running";

    interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        time.textContent = formatSecondsToMinutes(seconds);
      } else {
        clearInterval(interval);
        element.textContent = "Iniciar";
        element.dataset.timeRunningState = "stopped";
        beep.play();
      }
    }, 1000);

    element.textContent = "Pausar";
    play.play();
  } else {
    clearInterval(interval);
    element.textContent = "Iniciar";
    element.dataset.timeRunningState = "stopped";
    pause.play();
  }

  beep.pause();
};

const handleChangeOption = (
  option: HTMLButtonElement,
  options: NodeListOf<HTMLButtonElement>
) => {
  options.forEach((option) => {
    if (option.classList.contains("app__option--selected")) {
      option.classList.remove("app__option--selected");
    }
  });

  option.classList.add("app__option--selected");
  body.dataset.theme = option.dataset.theme;
};

const handleChangeTime = (option: HTMLButtonElement) => {
  const theme = option.dataset.theme as string;

  if (theme === "red") {
    seconds = 60 * 25;
  } else if (theme === "green") {
    seconds = 60 * 5;
  } else {
    seconds = 60 * 15;
  }

  time.textContent = formatSecondsToMinutes(seconds);
};

// Manipulação de eventos
window.addEventListener("DOMContentLoaded", () => {
  seconds = 60 * 25;
  time.textContent = formatSecondsToMinutes(seconds);
});

toggleMuteMusic.addEventListener("click", (event) =>
  handleToggleMuteMusic(event)
);

startOrPause.addEventListener("click", (event) => handleStartOrPause(event));

options.forEach((itm, _, src) => {
  itm.addEventListener("click", () => {
    handleChangeOption(itm, src);
    handleChangeTime(itm);
  });
});
