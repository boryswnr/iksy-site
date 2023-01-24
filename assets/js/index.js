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
let displayedPhoto = 1;

// spreading photos so they are next to each other,
// adjusted for -50% so the photos are centered
photoList.forEach((photo, index) => {
    photo.style.transform = `translateX(${index * 100}%)`;
});

// handling switching photos
const switchArray = document.querySelectorAll(".switch");
const switchClickHandler = (e) => {
    const multiplier = +e.target.id - 1;
    photoList.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - multiplier)}%)`;
    });
    switchArray.forEach((el) => {
        el.classList.remove("active");
    });
    e.target.classList.add("active");
};

switchArray.forEach((elem) =>
    elem.addEventListener("click", (e) => switchClickHandler(e))
);
