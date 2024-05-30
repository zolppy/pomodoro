"use strict";
// Variáveis globais
var seconds;
var interval;
var music = new Audio("./dist/sound/music.mp3");
var play = new Audio("./dist/sound/play.wav");
var pause = new Audio("./dist/sound/pause.mp3");
var beep = new Audio("./dist/sound/beep.mp3");
music.loop = true;
beep.loop = true;
// Mapeamento de elementos do DOM
var body = document.querySelector("body");
var time = document.querySelector(".app__time");
var toggleMuteMusic = document.querySelector(".app__enable-music-btn");
var options = document.querySelectorAll(".app__option");
var startOrPause = document.querySelector(".app__btn");
// Funções
var formatSecondsToMinutes = function (seconds) {
    var date = new Date(seconds * 1000);
    var options = {
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options);
};
var handleToggleMuteMusic = function (event) {
    var element = event.target;
    var attr = element.dataset.audio === "on" ? "off" : "on";
    attr === "on" ? music.play() : music.pause();
    element.textContent = attr;
    element.dataset.audio = attr;
};
var handleStartOrPause = function (event) {
    var element = event.target;
    var timeRunningState = element.dataset.timeRunningState || "stopped";
    if (timeRunningState === "stopped") {
        element.dataset.timeRunningState = "running";
        interval = setInterval(function () {
            if (seconds > 0) {
                seconds--;
                time.textContent = formatSecondsToMinutes(seconds);
            }
            else {
                clearInterval(interval);
                element.textContent = "Iniciar";
                element.dataset.timeRunningState = "stopped";
                beep.play();
            }
        }, 1000);
        element.textContent = "Pausar";
        play.play();
    }
    else {
        clearInterval(interval);
        element.textContent = "Iniciar";
        element.dataset.timeRunningState = "stopped";
        pause.play();
    }
    beep.pause();
};
var handleChangeOption = function (option, options) {
    options.forEach(function (option) {
        if (option.classList.contains("app__option--selected")) {
            option.classList.remove("app__option--selected");
        }
    });
    option.classList.add("app__option--selected");
    body.dataset.theme = option.dataset.theme;
};
var handleChangeTime = function (option) {
    var theme = option.dataset.theme;
    if (theme === "red") {
        seconds = 60 * 25;
    }
    else if (theme === "green") {
        seconds = 60 * 5;
    }
    else {
        seconds = 60 * 15;
    }
    time.textContent = formatSecondsToMinutes(seconds);
};
// Manipulação de eventos
window.addEventListener("DOMContentLoaded", function () {
    seconds = 60 * 25;
    time.textContent = formatSecondsToMinutes(seconds);
});
toggleMuteMusic.addEventListener("click", function (event) {
    return handleToggleMuteMusic(event);
});
startOrPause.addEventListener("click", function (event) { return handleStartOrPause(event); });
options.forEach(function (itm, _, src) {
    itm.addEventListener("click", function () {
        handleChangeOption(itm, src);
        handleChangeTime(itm);
    });
});
