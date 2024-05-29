// hack >>

let seconds: number = 60 * 25;

const xxx: HTMLDivElement | null = document.querySelector(
  ".app__option-wrapper"
);

xxx?.addEventListener("click", (event: any) => {
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

  const time: HTMLElement = document.querySelector(
    ".app__time"
  ) as HTMLDivElement;

  time.textContent = formatSecondsToMinutes(seconds);
});

window.addEventListener("DOMContentLoaded", () => {
  const target: HTMLButtonElement | null = document.querySelector(
    ".app__option-selected"
  );

  switch (target?.getAttribute("data-theme")) {
    case "red":
      seconds = 60 * 25;
      break;
    case "green":
      seconds = 60 * 5;
      break;
    case "blue":
      seconds = 60 * 15;
  }

  const time: HTMLElement = document.querySelector(
    ".app__time"
  ) as HTMLDivElement;

  time.textContent = formatSecondsToMinutes(seconds);
});

function formatSecondsToMinutes(seconds: number): string {
  const date = new Date(seconds * 1000);
  const options: Intl.DateTimeFormatOptions = {
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };

  return date.toLocaleString("en-US", options);
}

// << hack
