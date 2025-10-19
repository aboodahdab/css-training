const mediaQuery = window.matchMedia("(max-width: 600px)");

function handleScreenChange(e) {
  if (e.matches) {
    console.log("Now small screen");
  } else {
    console.log("Now large screen");
  }
}

mediaQuery.addEventListener("change", handleScreenChange);
