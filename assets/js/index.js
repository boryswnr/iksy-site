// mobile menu
const hamburger = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("small-screen-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    mobileMenu.classList.toggle("visible");
    document.body.classList.toggle("stop-scroll");
});

// bands photo slider
const slider = document.querySelector(".band-photos-wrapper");
const photoList = document.querySelectorAll(".photo-container");
let currentIndex = 0;

// spreading photos so they are next to each other
photoList.forEach((photo, index) => {
    photo.style.transform = `translateX(${index * 100}%)`;
});

// handling switching photos
const switchArray = document.querySelectorAll(".switch");
const switchClickHandler = (e) => {
    currentIndex = +e.target.id - 1;
    slidePhotos();
    switchArray.forEach((el) => {
        el.classList.remove("active");
    });
    e.target.classList.add("active");
};

switchArray.forEach((elem) =>
    elem.addEventListener("click", (e) => switchClickHandler(e))
);
const slidePhotos = () => {
    photoList.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
    });
    switchArray.forEach((element, index) => {
        element.classList.remove("active");
        if (index === currentIndex) element.classList.add("active");
    });
};
// switching photos with sliding

// set up our state
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0;

photoList.forEach((slide, index) => {
    const slideImage = slide.querySelector("img");
    const overlay = slide.querySelector(".photo-overlay");
    slideImage.addEventListener("dragstart", (e) => e.preventDefault());
    overlay.addEventListener("dragstart", (e) => e.preventDefault());

    // Touch events
    slide.addEventListener("touchstart", touchStart(index));
    slide.addEventListener("touchend", touchEnd);
    slide.addEventListener("touchmove", touchMove);

    // Mouse events
    slide.addEventListener("mousedown", touchStart(index));
    slide.addEventListener("mouseup", touchEnd);
    slide.addEventListener("mouseleave", touchEnd);
    slide.addEventListener("mousemove", touchMove);
});

// Disable context menu
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

function touchStart(index) {
    return function (event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;

        // https://css-tricks.com/using-requestanimationframe/
        animationID = requestAnimationFrame(animation);
    };
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < photoList.length - 1)
        currentIndex += 1;

    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes("mouse")
        ? event.pageX
        : event.touches[0].clientX;
}

function animation() {
    slidePhotos();
    if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    slidePhotos();
}
