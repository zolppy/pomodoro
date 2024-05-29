// hack >>

const zzz: HTMLDivElement | null = document.querySelector(
  ".app__option-wrapper"
);

zzz?.addEventListener("click", function (event) {
  const el: HTMLElement = event.target as HTMLButtonElement;
  const x: any = [];

  for (const elm of this.children) {
    x.push(elm);
  }

  const y = x.filter((z: any) => z != el);

  el.classList.add("app__option--selected");
  y.forEach((itm: any) => {
    itm.classList.contains("app__option--selected") &&
      itm.classList.remove("app__option--selected");
  });

  const body: any = document.querySelector("body");

  body.setAttribute("data-theme", el.getAttribute("data-theme"));
});

// << hack
