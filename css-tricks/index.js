const $logoStarSvg = document.querySelector(".icon-logo-star");
let lastScrollTop = 0;
let hasScrolledPast = false;

window.addEventListener("scroll", () => {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;

  const elementTop = $logoStarSvg.getBoundingClientRect().top;
  const isScrollingUp = currentScrollTop < lastScrollTop;

  // Mark as scrolled past
  if (elementTop < 0) {
    hasScrolledPast = true;
  }

  // Animate only when scrolling up AND has scrolled past before
  if (
    isScrollingUp &&
    hasScrolledPast &&
    elementTop < window.innerHeight &&
    elementTop > 0
  ) {
    $logoStarSvg.classList.add("animation");
    // $logoStarSvg.addEventListener("animated", () => {
    //   $logoStarSvg.classList.remove("animated-icon-star");
    // });

    animated = false;
  }
  setTimeout(() => {
    $logoStarSvg.classList.remove("animation");
  }, 2000);

  lastScrollTop = currentScrollTop;
});
