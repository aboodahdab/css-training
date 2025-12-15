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
const findMeButton = document.querySelector(".find-me-button");
const arrowMapButton = document.querySelector(".expand-btn");
const hiddenBtns = document.querySelectorAll(".hidden-btn");
const zoomInBtn = document.querySelector(".plus-btn");
const zoomOutBtn = document.querySelector(".minus-btn");
const moveRightBtn = document.querySelector(".right-btn");
const moveLeftBtn = document.querySelector(".left-btn");
const moveDownBtn = document.querySelector(".down-btn");
const moveUpBtn = document.querySelector(".up-btn");
let index = 0;
let ImageNum = 0;
let howMuchTimesExpandIsPressed = 0;
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
    padding: { left: "2rem", right: "2rem" },
    drag: true,
    arrows: false,
    breakpoints: {
      1200: {
        gap: "1rem",
      },
      600: {
        padding: { left: "0.8rem", right: "0.8rem" },

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

const map = L.map("map", {
  zoomControl: false,
}).setView([34.64980615432917, -99.32743667338804], 4.5);

// Gray Tesla-like map background
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 8,
  minZoom: 4,
}).addTo(map);

// Tesla-style dot icon
const teslaDot = L.divIcon({
  className: "tesla-dot",
  iconSize: [6, 6],
  iconAnchor: [5, 5], // center it
});
zoomInBtn.addEventListener("click", () => {
  map.zoomIn();
});

zoomOutBtn.addEventListener("click", () => {
  map.zoomOut();
});

const teslaDotGray = L.divIcon({
  className: "tesla-dot-gray",

  iconSize: [6, 6],
  iconAnchor: [5, 5], // center it
});
const locations = [
  { name: "New York City", coords: [40.7128, -74.006] },
  { name: "Boston", coords: [42.3601, -71.0589] },
  { name: "Philadelphia", coords: [39.9526, -75.1652] },
  { name: "Washington DC", coords: [38.9072, -77.0369] },
  { name: "Baltimore", coords: [39.2904, -76.6122] },
  { name: "Miami", coords: [25.7617, -80.1918] },
  { name: "Atlanta", coords: [33.749, -84.388] },
  { name: "Orlando", coords: [28.5383, -81.3792] },
  { name: "Charlotte", coords: [35.2271, -80.8431] },
  { name: "Nashville", coords: [36.1627, -86.7816] },
  { name: "New Orleans", coords: [29.9511, -90.0715] },
  { name: "Chicago", coords: [41.8781, -87.6298] },
  { name: "Detroit", coords: [42.3314, -83.0458] },
  { name: "Minneapolis", coords: [44.9778, -93.265] },
  { name: "St. Louis", coords: [38.627, -90.1994] },
  { name: "Kansas City", coords: [39.0997, -94.5786] },
  { name: "Cleveland", coords: [41.4993, -81.6944] },
  { name: "Indianapolis", coords: [39.7684, -86.1581] },
  { name: "Houston", coords: [29.7604, -95.3698] },
  { name: "Dallas", coords: [32.7767, -96.797] },
  { name: "Austin", coords: [30.2672, -97.7431] },
  { name: "San Antonio", coords: [29.4241, -98.4936] },
  { name: "Phoenix", coords: [33.4484, -112.074] },
  { name: "Las Vegas", coords: [36.1699, -115.1398] },
  { name: "Albuquerque", coords: [35.0844, -106.6504] },
  { name: "Los Angeles", coords: [34.0522, -118.2437] },
  { name: "San Francisco", coords: [37.7749, -122.4194] },
  { name: "San Diego", coords: [32.7157, -117.1611] },
  { name: "Seattle", coords: [47.6062, -122.3321] },
  { name: "Portland", coords: [45.5152, -122.6784] },
  { name: "Sacramento", coords: [38.5816, -121.4944] },
  { name: "Denver", coords: [39.7392, -104.9903] },
  { name: "Salt Lake City", coords: [40.7608, -111.891] },
  { name: "Boise", coords: [43.615, -116.2023] },
  { name: "Tucson", coords: [32.2226, -110.9747] },
];

const superchargers = [
  { name: "madrid", coords: [40.4166909, -3.7003454] },

  { name: "Station 1", coords: [34.0522, -118.2437] }, // Los Angeles
  { name: "Station 2", coords: [36.1699, -115.1398] }, // Las Vegas
  { name: "Station 3", coords: [40.7128, -74.006] }, // NYC
  { name: "Station 4", coords: [33.8781, -86.6298] }, // Chicago
  { name: "Station 5", coords: [29.7604, -95.3698] }, // Houston
  { name: "Station 6", coords: [33.4484, -112.074] }, // Phoenix
  { name: "Station 7", coords: [32.7157, -117.1611] }, // San Diego
  { name: "Station 8", coords: [47.6062, -122.3321] }, // Seattle
  { name: "Station 9", coords: [39.7392, -104.9903] }, // Denver
  { name: "Station 10", coords: [25.7617, -80.1918] }, // Miami
  { name: "Station 11", coords: [42.3601, -71.0589] }, // Boston
  { name: "Station 12", coords: [45.5152, -122.6784] }, // Portland
  { name: "Station 13", coords: [35.2271, -80.8431] }, // Charlotte
  { name: "Station 14", coords: [38.9072, -77.0369] }, // Washington DC
  { name: "Station 15", coords: [39.9526, -75.1652] }, // Philadelphia
  { name: "Station 16", coords: [33.749, -84.388] }, // Atlanta
  { name: "Station 17", coords: [30.2672, -97.7431] }, // Austin
  { name: "Station 18", coords: [44.9778, -93.265] }, // Minneapolis
  { name: "Station 19", coords: [39.7684, -86.1581] }, // Indianapolis
  { name: "Station 20", coords: [36.1627, -86.7816] }, // Nashville
  { name: "Station 21", coords: [29.9511, -90.0715] }, // New Orleans
  { name: "Station 22", coords: [32.7767, -96.797] }, // Dallas
  { name: "Station 23", coords: [37.7749, -122.4194] }, // San Francisco
  { name: "Station 24", coords: [34.0007, -81.0348] }, // Columbia
  { name: "Station 25", coords: [40.7608, -111.891] }, // Salt Lake City
  { name: "Station 26", coords: [43.0389, -87.9065] }, // Milwaukee
  { name: "Station 27", coords: [39.1031, -84.512] }, // Cincinnati
  { name: "Station 28", coords: [36.1699, -94.1579] }, // Fayetteville
  { name: "Station 29", coords: [35.0844, -106.6504] }, // Albuquerque
  { name: "Station 30", coords: [31.7619, -106.485] }, // El Paso
  { name: "Station 31", coords: [27.9506, -82.4572] }, // Tampa
  { name: "Station 32", coords: [33.5207, -86.8025] }, // Birmingham
  { name: "Station 33", coords: [39.9612, -82.9988] }, // Columbus
  { name: "Station 34", coords: [40.01499, -105.27055] }, // Boulder
  { name: "Station 35", coords: [46.8772, -96.7898] }, // Fargo
  { name: "Station 36", coords: [44.0121, -92.4802] }, // Rochester
  { name: "Station 37", coords: [21.3069, -157.8583] }, // Honolulu
  { name: "Station 38", coords: [64.8378, -147.7164] }, // Fairbanks
  { name: "Station 39", coords: [61.2181, -149.9003] }, // Anchorage
  { name: "Station 40", coords: [35.994, -78.8986] }, // Durham
  { name: "Station 41", coords: [27.8006, -97.3964] }, // Corpus Christi
  { name: "Station 42", coords: [37.5407, -77.436] }, // Richmond
  { name: "Station 43", coords: [41.2565, -95.9345] }, // Omaha
  { name: "Station 44", coords: [42.3314, -83.0458] }, // Detroit
  { name: "Station 45", coords: [43.615, -116.2023] }, // Boise
  { name: "Station 46", coords: [36.7378, -119.7871] }, // Fresno
  { name: "Station 47", coords: [35.1983, -111.6513] }, // Flagstaff
  { name: "Station 48", coords: [33.1581, -117.3506] }, // Encinitas
  { name: "Station 49", coords: [28.5383, -81.3792] }, // Orlando
  { name: "Station 50", coords: [40.8258, -96.6852] }, // Lincoln
];
superchargers.forEach((s) => {
  L.marker(s.coords, { icon: teslaDot }).addTo(map);
});
locations.forEach((location) => {
  L.marker(location.coords, { icon: teslaDotGray }).addTo(map);
});
moveRightBtn.addEventListener("click", () => {
  const offset = new L.Point(500, 0);
  map.panBy(offset);
});
moveLeftBtn.addEventListener("click", () => {
  const offset = new L.Point(-500, 0);
  map.panBy(offset);
});
moveUpBtn.addEventListener("click", () => {
  const offset = new L.Point(0, -500);
  map.panBy(offset);
});
moveDownBtn.addEventListener("click", () => {
  const offset = new L.Point(0, 500);
  map.panBy(offset);
});
// let osmLayer = L.tileLayer(
//   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//   {
//     attribution:
//       '&copy; <a href="www.openstreetmap.org">OpenStreetMap</a> contributors',
//   }
// ).addTo(map);

// let satLayer = L.tileLayer(
//   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//   {
//     attribution:
//       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, GetMapping, Aerogrid, IGN, IGP, Topo, &",
//     maxZoom: 29,
//   }
// );

// 4. Create a layers control object
// let baseMaps = {
//   OpenStreetMap: osmLayer,
//   Satellite: satLayer,
// };

// L.control.layers(baseMaps).addTo(map);
let user_location = null;
findMeButton.addEventListener("click", () => {
  // Define the location success handler

  function onLocationFound(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    if (user_location && map.hasLayer(user_location)) {
      console.log("sorry there is a marker already");
      return;
    }

    console.log("Found location! Latitude:");

    // Clear the listeners after finding the location
    map.off("locationfound", onLocationFound);
    map.off("locationerror", onLocationError);
    user_location = L.marker([lat, lng])
      .addTo(map)
      .bindPopup("Your Location")
      .openPopup();
    console.log(map.hasLayer([lat, lng]));
  }

  // Define the error handler
  function onLocationError(e) {
    alert("Location access failed: " + e.message);
    map.off("locationfound", onLocationFound);
    map.off("locationerror", onLocationError);
  }

  // Attach the handlers to the correct map instance
  map.on("locationfound", onLocationFound);
  map.on("locationerror", onLocationError);
  console.log("Attempting to locate user...");
  map.locate({
    setView: true,
    maxZoom: 16,
  });
});

arrowMapButton.addEventListener("click", () => {
  howMuchTimesExpandIsPressed += 1;
  if (howMuchTimesExpandIsPressed % 2 == 0) {
    hiddenBtns.forEach((ele) => {
      ele.style.display = "none";
    });
  }
  if (howMuchTimesExpandIsPressed % 2 !== 0) {
    hiddenBtns.forEach((ele) => {
      ele.style.display = "block";
    });
  }
});
