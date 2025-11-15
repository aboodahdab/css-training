const $imgs = document.querySelectorAll(".background-img-guy");
const $pargraph = document.querySelector(".pargraph");
const $menuButton = document.querySelector(".menu-button");
const $heading = document.querySelector(".h1");

const $arrowButtons = document.querySelectorAll(".arrow-square-button");
const $buttonsCircled = document.querySelectorAll(
  ".the-dot-things-that-change-the-img"
);
const imageBtnRight = document.querySelector(".imageBtnBroRight");
const imageBtnLeft = document.querySelector(".imageBtnBroLeft");

let index = 0;
let ImageNum = 0;

let isTimeOut = null;
function changeImage(nextIndex, imgs) {
  imgs[index].style.opacity = 0;
  index = (nextIndex + $imgs.length) % imgs.length;
  imgs[index].style.opacity = 1;

  ImageNum += 1;
  changeTheAllowedButton($buttonsCircled);
  changeParagraph(ImageNum, $pargraph, $heading);
  clearTimeout(isTimeOut);
  restartAutoPlay();
}

function changeParagraph(num, p, heading) {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  if (num % 2 == 0) {
    heading.textContent = "Meet Model Y";
    p.textContent = "Electric Midsize SUV";

    if (isMobile) swtichMode("dark");
    return;
  }

  heading.textContent = "Meet Model 3";
  p.textContent = "Electric Sport Sedan";

  if (isMobile) swtichMode("light");
}
function swtichMode(mode) {
  if (mode === "dark") {
    $menuButton.classList.add("menu-dark");
    $menuButton.classList.remove("menu-light");
  }
  if (mode === "light") {
    $menuButton.classList.add("menu-light");
    $menuButton.classList.remove("menu-dark");
  }
}

function restartAutoPlay() {
  clearTimeout(isTimeOut);
  isTimeOut = setTimeout(() => {
    changeImage(index + 1, $imgs);
  }, 10000);
}
const check = ($elements) => {
  for (let i = 0; i < $elements.length; i += 1) {
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
    changeImage(index + 1, $imgs);

    changeTheAllowedButton($buttonsCircled);
  });
});

restartAutoPlay();

// splide logic

document.addEventListener("DOMContentLoaded", () => {
  let splide = new Splide("#my-carousel", {
    type: "slide",
    perPage: 1,
    focus: "center",
    gap: "2.5rem",
    drag: true,
    arrows: false,
    breakpoints: {
      1200: {
        gap: "1rem",
      },
      600: {
        gap: "1rem",
      },
    },
  }).mount();
  const slides = splide.Components.Slides.get();
  const HowMuchSlides = slides.length;

  const splidePaginationPages = document.querySelectorAll(
    ".splide__pagination__page"
  );

  splidePaginationPages.forEach((e) => {
    e.addEventListener("click", (e) => {
      const arr = [...splidePaginationPages];
      paginationIndex = arr.indexOf(e.target);

      handleSlideIndex(paginationIndex, HowMuchSlides);
    });
  });

  function handleSlideIndex(index, total) {
    const isMobile = window.matchMedia("(max-width: 1200px)").matches;

    if (isMobile) {
      imageBtnLeft.style.display = "none";
      imageBtnRight.style.display = "none";
      return false;
    }
    const isFirst = index === 0;
    const isLast = index === total - 1;

    // show/hide arrows
    imageBtnLeft.style.display = isFirst ? "none" : "flex";
    imageBtnRight.style.display = isLast ? "none" : "flex";
    return true;
  }
  window.addEventListener("resize", () => {
    handleSlideIndex(splide.index, HowMuchSlides);
  });
  if (handleSlideIndex(splide.index, HowMuchSlides)) {
    imageBtnLeft.addEventListener("click", () => {
      splide.go("-1");
      handleSlideIndex(splide.index, HowMuchSlides);
    });
    imageBtnRight.addEventListener("click", () => {
      splide.go("+1");
      handleSlideIndex(splide.index, HowMuchSlides);
    });
  }
});
