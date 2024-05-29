"use strict";
// hack >>
const zzz = document.querySelector(".app__option-wrapper");
zzz === null || zzz === void 0 ? void 0 : zzz.addEventListener("click", function (event) {
    const el = event.target;
    const x = [];
    for (const elm of this.children) {
        x.push(elm);
    }
    const y = x.filter((z) => z != el);
    el.classList.add("app__option--selected");
    y.forEach((itm) => {
        itm.classList.contains("app__option--selected") &&
            itm.classList.remove("app__option--selected");
    });
    const body = document.querySelector("body");
    body.setAttribute("data-theme", el.getAttribute("data-theme"));
});
// << hack
// hack >>
let seconds = 60 * 25;
const xxx = document.querySelector(".app__option-wrapper");
xxx === null || xxx === void 0 ? void 0 : xxx.addEventListener("click", (event) => {
    const target = event.target;
    switch (target.getAttribute("data-theme")) {
        case "red":
            seconds = 60 * 25;
            break;
        case "green":
            seconds = 60 * 5;
            break;
        case "blue":
            seconds = 60 * 15;
    }
    const time = document.querySelector(".app__time");
    time.textContent = formatSecondsToMinutes(seconds);
});
window.addEventListener("DOMContentLoaded", () => {
    const target = document.querySelector(".app__option-selected");
    switch (target === null || target === void 0 ? void 0 : target.getAttribute("data-theme")) {
        case "red":
            seconds = 60 * 25;
            break;
        case "green":
            seconds = 60 * 5;
            break;
        case "blue":
            seconds = 60 * 15;
    }
    const time = document.querySelector(".app__time");
    time.textContent = formatSecondsToMinutes(seconds);
});
function formatSecondsToMinutes(seconds) {
    const date = new Date(seconds * 1000);
    const options = {
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options);
}
// << hack
// hack >>
const toggleMuteMusic = document.querySelector(".app__enable-music-btn");
const audio = new Audio("../../dist/sound/luna-rise-part-one.mp3");
audio.loop = true;
const handleToggleMuteMusic = (event) => {
    const element = event.target;
    if (element.textContent === "on") {
        audio.pause();
        element.textContent = "off";
    }
    else {
        audio.play();
        element.textContent = "on";
    }
};
toggleMuteMusic === null || toggleMuteMusic === void 0 ? void 0 : toggleMuteMusic.addEventListener("click", (event) => handleToggleMuteMusic(event));
// << hack
// hack >>
const sound1 = new Audio("../../dist/sound/play.wav");
const sound2 = new Audio("../../dist/sound/pause.mp3");
const el = document.querySelector(".app__btn");
const time = document.querySelector(".app__time");
let interval;
el.addEventListener("click", () => {
    if (el.textContent === "Iniciar") {
        interval = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                time.textContent = formatSecondsToMinutes(seconds);
            }
            else {
                clearInterval(interval);
                el.textContent = "Iniciar";
            }
        }, 1000);
        el.textContent = "Pausar";
        sound1.play();
    }
    else {
        clearInterval(interval);
        el.textContent = "Iniciar";
        sound2.play();
    }
});
// << hack
//# sourceMappingURL=script.js.map