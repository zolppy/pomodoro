// hack >>

const toggleMuteMusic: HTMLButtonElement | null = document.querySelector(
  ".app__enable-music-btn"
);

const audio = new Audio("../../dist/sound/luna-rise-part-one.mp3");

audio.loop = true;

const handleToggleMuteMusic = (event: MouseEvent) => {
  const element: any = event.target;

  if (element.textContent === "on") {
    audio.pause();
    element.textContent = "off";
  } else {
    audio.play();
    element.textContent = "on";
  }
};

toggleMuteMusic?.addEventListener("click", (event) =>
  handleToggleMuteMusic(event)
);

// << hack
