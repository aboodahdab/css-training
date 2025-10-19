imgs = document.querySelectorAll(".background-img-guy");

$arrowButtons = document.querySelectorAll(".arrow-square-button");
$buttonsCircled = document.querySelectorAll(
  " .the-dot-things-that-change-the-img"
);
imageToAdd =
  "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Promo-Meet-Model-Y-Desktop.jpg";
index = 0;
thing = false;
function changeImage(nextIndex) {
  imgs[index].style.opacity = 0;
  index = (nextIndex + imgs.length) % imgs.length;
  imgs[index].style.opacity = 1;
}

function recurison(index) {
  timeout = setTimeout(() => {
    changeImage(index + 1);
    recurison(index);
  }, 10000);
  if (thing == true) {
    clearTimeout(timeout);
  }
}

$buttonsCircled.forEach((circle) => {
  circle.addEventListener("click", () => {
    thing = true;
    changeImage(index + 1);
  });
});
$arrowButtons.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    thing = true;
    changeImage(index + 1);
  });
});
recurison(index);
