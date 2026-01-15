const $logoStarSvg = document.querySelector(".icon-logo-star");
let lastScrollTop = 0;
let hasScrolledPast = false;
let isAnimating = false;
let scrollWhenPassed = null;
let lastScrollTime = Date.now(); // NEW: Track time

window.addEventListener("scroll", () => {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;
  const currentTime = Date.now(); // NEW: Current time

  const elementTop = $logoStarSvg.getBoundingClientRect().top;
  const isScrollingUp = currentScrollTop < lastScrollTop;

  // NEW: Calculate scroll speed (pixels per millisecond)
  const timeDiff = currentTime - lastScrollTime;
  const scrollDiff = Math.abs(currentScrollTop - lastScrollTop);
  const scrollSpeed = scrollDiff / timeDiff; // pixels per millisecond

  // Mark as scrolled past
  if (elementTop < 0 && scrollWhenPassed === null) {
    scrollWhenPassed = currentScrollTop;
  }

  if (scrollWhenPassed !== null && currentScrollTop >= scrollWhenPassed + 500) {
    hasScrolledPast = true;
  }

  // Animate only when scrolling up AND has scrolled past before AND scrolling fast enough
  if (
    isScrollingUp &&
    hasScrolledPast &&
    elementTop < window.innerHeight &&
    elementTop > 0 &&
    !isAnimating &&
    scrollSpeed > 1 // NEW: Minimum speed (adjust this value)
  ) {
    isAnimating = true;
    $logoStarSvg.classList.add("animation");
    console.log("Animation triggered! Speed:", scrollSpeed);

    $logoStarSvg.addEventListener(
      "animationend",
      () => {
        $logoStarSvg.classList.remove("animation");
        isAnimating = false;
      },
      { once: true }
    );
  }

  lastScrollTop = currentScrollTop;
  lastScrollTime = currentTime; // NEW: Update time
});
