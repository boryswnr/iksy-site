import { mediaSlider } from "./mediaSlider.js";

const TABLET_SCREEN_SIZE = 900;

// mobile menu
const hamburger = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("small-screen-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    mobileMenu.classList.toggle("visible");
    document.body.classList.toggle("stop-scroll");
});

// bands photo slider
const photoList = document.querySelectorAll(".photo-container");

// spreading photos so they are next to each other
photoList.forEach((photo, index) => {
    photo.style.transform = `translateX(${index * 100}%)`;
});

const clipList = document.querySelectorAll(".clip-container");

clipList.forEach((clip, index) => {
    clip.style.transform = `translateX(${index * 100}%)`;
});

const photoSwitchArray = document.querySelectorAll(".switch");
const clipSwitchArray = document.querySelectorAll(".clip-switch");

const portraitSlider = new mediaSlider(photoList, photoSwitchArray);
const clipSlider = new mediaSlider(clipList, clipSwitchArray);

function clearListeners() {
    if (window.innerWidth > TABLET_SCREEN_SIZE) {
        portraitSlider.removeAllEventListeners();
        clipSlider.removeAllEventListeners();
    }
}

window.addEventListener("resize", clearListeners);
