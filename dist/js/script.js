"use strict";
var THEMES = ["red", "green", "blue"];
var FOCUS_MINUTES = 25;
var SHORT_BREAK_MINUTES = 5;
var LONG_BREAK_MINUTES = 15;
var theme = "red";
var interval;
var timeRunning = false;
var musicOn = false;
var beepOn = false;
var seconds;
var beepAudio = new Audio("dist/audio/beep.mp3");
var musicAudio = new Audio("dist/audio/music.mp3");
var pauseAudio = new Audio("dist/audio/pause.mp3");
var playAudio = new Audio("dist/audio/play.mp3");
var enableMusicButton = document.querySelector(".app__enable-music-btn");
var options = document.querySelectorAll(".app__option");
var startButton = document.querySelector(".app__btn");
var formatSecondsToMinutes = function (seconds) {
    var date = new Date(seconds * 1000);
    var options = {
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options);
};
var enableMusic = function () {
    musicOn = true;
    enableMusicButton.textContent = "on";
    musicAudio.loop = true;
    musicAudio.play();
};
var disableMusic = function () {
    musicOn = false;
    enableMusicButton.textContent = "off";
    musicAudio.loop = false;
    musicAudio.pause();
};
var toggleEnableMusic = function () {
    !musicOn ? enableMusic() : disableMusic();
};
var enableBeep = function () {
    beepOn = true;
    beepAudio.loop = true;
    beepAudio.play();
};
var disableBeep = function () {
    beepOn = false;
    beepAudio.loop = false;
    beepAudio.pause();
};
var updateTheme = function (theme) {
    var body = document.querySelector("body");
    var startButton = document.querySelector(".app__btn");
    var enableMusicButton = document.querySelector(".app__enable-music-btn");
    body.dataset.theme = theme;
    startButton.dataset.theme = theme;
    enableMusicButton.dataset.theme = theme;
};
var changeTime = function (theme) {
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
var updateTime = function (seconds) {
    var appTime = document.querySelector(".app__time");
    appTime.textContent = formatSecondsToMinutes(seconds);
};
var startPomodoro = function () {
    playAudio.play();
    timeRunning = true;
    startButton.textContent = "Pausar";
    interval = setInterval(function () {
        if (seconds--) {
            updateTime(seconds);
        }
        else {
            clearInterval(interval);
            disableMusic();
            enableBeep();
            startButton.textContent = "Restaurar";
            timeRunning = false;
        }
    }, 1000);
};
var pausePomodoro = function () {
    pauseAudio.play();
    startButton.textContent = "Retomar";
    timeRunning = false;
    clearInterval(interval);
};
var resetPomodoro = function () {
    disableMusic();
    disableBeep();
    changeTime(theme);
    updateTime(seconds);
    timeRunning = false;
    clearInterval(interval);
    startButton.textContent = "Iniciar";
};
options.forEach(function (option, index, options) {
    option.addEventListener("click", function () {
        options.forEach(function (option) {
            option.classList.remove("app__option--selected");
        });
        option.classList.add("app__option--selected");
        theme = THEMES[index];
        updateTheme(theme);
        resetPomodoro();
    });
});
enableMusicButton.addEventListener("click", toggleEnableMusic);
window.addEventListener("DOMContentLoaded", function () {
    changeTime(theme);
    updateTime(seconds);
});
startButton.addEventListener("click", function () {
    if (this.textContent === "Pausar") {
        pausePomodoro();
    }
    else if (this.textContent === "Iniciar" || this.textContent === "Retomar") {
        startPomodoro();
    }
    else {
        resetPomodoro();
    }
});
//# sourceMappingURL=script.js.map