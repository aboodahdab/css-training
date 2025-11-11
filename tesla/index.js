const $imgs = document.querySelectorAll(".background-img-guy");
const $pargraph = document.querySelector(".pargraph");
const $menuButton = document.querySelector(".menu-button");
const $heading = document.querySelector(".h1");
const $arrowButtons = document.querySelectorAll(".arrow-square-button");
const $buttonsCircled = document.querySelectorAll(
  ".the-dot-things-that-change-the-img"
);
let index = 0;
let num = 0;

let thing = false;
let timeout = null;
function changeImage(nextIndex, imgs) {
  imgs[index].style.opacity = 0;
  index = (nextIndex + $imgs.length) % imgs.length;
  imgs[index].style.opacity = 1;

  num += 1;
  changeTheAllowedButton($buttonsCircled);
  changeParagraph(num, $pargraph, $heading);
  clearTimeout(timeout);
  recurison();
}
function changeParagraph(num, p, heading) {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  if (num % 2 == 0) {
    heading.textContent = "Meet Model Y";
    p.textContent = "Electric Midsize SUV";

    if (isMobile) {
      $menuButton.classList.add("menu-dark");
      $menuButton.classList.remove("menu-light");
    }
    return;
  }

  heading.textContent = "Meet Model 3";
  p.textContent = "Electric Sport Sedan";

  if (isMobile) {
    $menuButton.classList.add("menu-light");
    $menuButton.classList.remove("menu-dark");
  }
}

function recurison() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    changeImage(index + 1, $imgs);
  }, 10000);
}
const check = ($elements) => {
  for (i = 0; i < $elements.length; i += 1) {
    if ($elements[i].id === "active") {
      $elements[i].id = "";
    }
  }
};
$buttonsCircled.forEach((circle) => {
  circle.addEventListener("click", () => {
    if (circle == document.getElementById("active")) {
      return;
    }
    thing = true;
    changeImage(index + 1, $imgs);
    check($buttonsCircled);
    circle.id = "active";
  });
});

function changeTheAllowedButton(ele) {
  ele.forEach((circle, i) => {
    circle.id = i === index ? "active" : "";
  });
}

$arrowButtons.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    thing = true;
    changeImage(index + 1, $imgs);

    changeTheAllowedButton($buttonsCircled);
  });
});

recurison();
document.addEventListener("DOMContentLoaded", () => {
  new Splide("#my-carousel", {
    type: "slide",
    perPage: 1,
    focus: "center",
    gap: "3rem",
    drag: true,
    breakpoints: {
      1200: {
        gap: "1rem",
      },
    },
  }).mount();
});
