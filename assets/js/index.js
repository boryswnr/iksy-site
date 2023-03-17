import { mediaSlider } from "./mediaSlider.js";

const TABLET_SCREEN_SIZE = 760;

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
        portraitSlider.currentIndex = 0;
        portraitSlider.setPositionByIndex();
        portraitSlider.removeAllEventListeners();
    } else {
        portraitSlider.addSliderEventListeners();
    }
}

const navbar = document.querySelector(".navbar");
const anchors = document.querySelectorAll(".navanchor");

function setUpAnchors() {
    anchors.forEach((anchor) => {
        anchor.style.top = `-${navbar.offsetHeight}px`;
    });
}

setUpAnchors();

const menuLinks = document.querySelectorAll(".aside-menu-link");
menuLinks.forEach((item) =>
    item.addEventListener("click", () => {
        mobileMenu.classList.toggle("visible");
        hamburger.classList.toggle("is-active");
    })
);

window.addEventListener("resize", () => {
    clearListeners();
    setUpAnchors();
});
window.addEventListener("DOMContentLoaded", clearListeners);

const overlays = document.querySelectorAll(".photo-overlay");

function removeOverlays() {
    overlays.forEach((e) => e.classList.remove("show-overlay"));
}

overlays.forEach((element) => {
    element.addEventListener("click", () => {
        removeOverlays();
        element.classList.add("show-overlay");
    });
});
document.body.addEventListener("click", (e) => {
    if (
        ![...e.target.classList, ...e.target.parentElement.classList].includes(
            "photo-overlay"
        )
    ) {
        removeOverlays();
    }
});
