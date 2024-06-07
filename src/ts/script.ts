// Constantes globais
const THEMES: string[] = ["red", "green", "blue"];
const FOCUS_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;

// Variáveis globais
let theme: string = "red";
let interval: number;
let timeRunning: boolean = false;
let musicOn: boolean = false;
let beepOn: boolean = false;
let seconds: number;

// Objetos globais
const beepAudio = new Audio("dist/audio/beep.mp3");
const musicAudio = new Audio("dist/audio/music.mp3");
const pauseAudio = new Audio("dist/audio/pause.mp3");
const playAudio = new Audio("dist/audio/play.mp3");

// Mapeamento de elementos do DOM
const enableMusicButton = document.querySelector(
  ".app__enable-music-btn"
) as HTMLButtonElement;
const options = document.querySelectorAll(
  ".app__option"
) as NodeListOf<HTMLButtonElement>;
const startButton = document.querySelector(".app__btn") as HTMLButtonElement;

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

const enableMusic = () => {
  musicOn = true;
  enableMusicButton.textContent = "on";
  musicAudio.loop = true;
  musicAudio.play();
};

const disableMusic = () => {
  musicOn = false;
  enableMusicButton.textContent = "off";
  musicAudio.loop = false;
  musicAudio.pause();
};

const toggleEnableMusic = () => {
  !musicOn ? enableMusic() : disableMusic();
};

const enableBeep = () => {
  beepOn = true;
  beepAudio.loop = true;
  beepAudio.play();
};

const disableBeep = () => {
  beepOn = false;
  beepAudio.loop = false;
  beepAudio.pause();
};

const updateTheme = (theme: string) => {
  const body = document.querySelector("body") as HTMLBodyElement;
  const startButton = document.querySelector(".app__btn") as HTMLButtonElement;
  const enableMusicButton = document.querySelector(
    ".app__enable-music-btn"
  ) as HTMLButtonElement;

  body.dataset.theme = theme;
  startButton.dataset.theme = theme;
  enableMusicButton.dataset.theme = theme;
};

const changeTime = (theme: string) => {
  switch (theme) {
    case "red":
      seconds = 60 * FOCUS_MINUTES;
      break;
    case "green":
      seconds = 60 * SHORT_BREAK_MINUTES;
      break;
    case "blue":
      seconds = 60 * LONG_BREAK_MINUTES;
  }
};

const updateTime = (seconds: number) => {
  const appTime = document.querySelector(".app__time") as HTMLDivElement;

  appTime.textContent = formatSecondsToMinutes(seconds);
};

const startPomodoro = () => {
  playAudio.play();
  timeRunning = true;
  startButton.textContent = "Pausar";

  interval = setInterval(() => {
    if (seconds--) {
      updateTime(seconds);
    } else {
      clearInterval(interval);
      disableMusic();
      enableBeep();
      startButton.textContent = "Restaurar";
      timeRunning = false;
    }
  }, 1000);
};

const pausePomodoro = () => {
  pauseAudio.play();
  startButton.textContent = "Retomar";
  timeRunning = false;
  clearInterval(interval);
};

const resetPomodoro = () => {
  disableBeep();
  changeTime(theme);
  updateTime(seconds);
  startButton.textContent = "Iniciar";
};

// Manipulação de eventos
options.forEach((option, index, options) => {
  option.addEventListener("click", () => {
    options.forEach((option) => {
      option.classList.remove("app__option--selected");
    });

    option.classList.add("app__option--selected");
    theme = THEMES[index];
    updateTheme(theme);
    changeTime(theme);
    updateTime(seconds);
    clearInterval(interval);
    timeRunning = false;
  });
});

enableMusicButton.addEventListener("click", toggleEnableMusic);

window.addEventListener("DOMContentLoaded", () => {
  changeTime(theme);
  updateTime(seconds);
});

startButton.addEventListener("click", function () {
  if (this.textContent === "Pausar") {
    pausePomodoro();
  } else if (this.textContent === "Iniciar" || this.textContent === "Retomar") {
    startPomodoro();
  } else {
    resetPomodoro();
  }
});
