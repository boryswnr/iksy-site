import { mediaSlider } from "./mediaSlider.js";

// mobile menu
const hamburger = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("small-screen-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    mobileMenu.classList.toggle("visible");
    document.body.classList.toggle("stop-scroll");
});

// bands photo slider
// const portraitSlider = document.querySelector(".band-photos-wrapper");
const photoList = document.querySelectorAll(".photo-container");
let currentPortraitIndex = 0;

// spreading photos so they are next to each other
photoList.forEach((photo, index) => {
    photo.style.transform = `translateX(${index * 100}%)`;
});

const clipSlide = document.querySelector(".concerts-clip-wrapper");
const clipList = document.querySelectorAll(".clip-container");
let currentClipIndex = 0;

clipList.forEach((clip, index) => {
    clip.style.transform = `translateX(${index * 100}%)`;
});

// handling switching photos
const photoSwitchArray = document.querySelectorAll(".switch");
const clipSwitchArray = document.querySelectorAll(".clip-switch");

const portraitSlider = new mediaSlider(photoList, photoSwitchArray);
const clipSlider = new mediaSlider(clipList, clipSwitchArray);

///////////////////////////////////////
// Put a pin on that
//////////////////////////////////////

// const photoSwitchClickHandler = (e) => {
//     currentPortraitIndex = +e.target.id - 1;
//     slidePhotos(photoList, photoSwitchArray, currentPortraitIndex);
//     photoSwitchArray.forEach((el) => {
//         el.classList.remove("active");
//     });
//     e.target.classList.add("active");
// };

// photoSwitchArray.forEach((elem) =>
//     elem.addEventListener("click", (e) => photoSwitchClickHandler(e))
// );

// const clipSwitchClickHandler = (e) => {
//     const targetID = parseInt(e.target.style.cssText.split(" ")[1]);
//     currentClipIndex = targetID - 1;
//     slidePhotos(clipList, clipSwitchArray, currentClipIndex);
//     clipSwitchArray.forEach((el) => {
//         el.classList.remove("active");
//     });
//     e.target.classList.add("active");
// };

// clipSwitchArray.forEach((elem) =>
//     elem.addEventListener("click", (e) => clipSwitchClickHandler(e))
// );

// const slidePhotos = (sliderArray, switcherArray, usedIndex) => {
//     sliderArray.forEach((slide, index) => {
//         slide.style.transform = `translateX(${100 * (index - usedIndex)}%)`;
//     });
//     switcherArray.forEach((element, index) => {
//         element.classList.remove("active");
//         if (index === usedIndex) element.classList.add("active");
//     });
// };
// // switching photos with sliding

// // set up our state
// let isDragging = false,
//     startPos = 0,
//     currentTranslate = 0,
//     prevTranslate = 0,
//     animationID = 0;

// photoList.forEach((slide, index) => {
//     const slideImage = slide.querySelector("img");
//     const overlay = slide.querySelector(".photo-overlay");
//     slideImage.addEventListener("dragstart", (e) => e.preventDefault());
//     overlay.addEventListener("dragstart", (e) => e.preventDefault());

//     // Touch events
//     slide.addEventListener("touchstart", touchStart(index));
//     slide.addEventListener("touchend", touchEnd);
//     slide.addEventListener("touchmove", touchMove);

//     // Mouse events
//     slide.addEventListener("mousedown", touchStart(index));
//     slide.addEventListener("mouseup", touchEnd);
//     slide.addEventListener("mouseleave", touchEnd);
//     slide.addEventListener("mousemove", touchMove);
// });

// const addSliderEventListeners = (sliderArray, usedIndex) => {
//     sliderArray.forEach((slide, index) => {
//         const slideImage = slide.querySelector("img");
//         slideImage.addEventListener("dragstart", (e) => e.preventDefault());

//         // Touch events
//         slide.addEventListener("touchstart", touchStart(index));
//         slide.addEventListener("touchend", touchEnd(sliderArray, usedIndex));
//         slide.addEventListener("touchmove", touchMove);

//         // Mouse events
//         slide.addEventListener("mousedown", touchStart(index));
//         slide.addEventListener("mouseup", touchEnd(sliderArray, usedIndex));
//         slide.addEventListener("mouseleave", touchEnd(sliderArray, usedIndex));
//         slide.addEventListener("mousemove", touchMove);
//     });
// };

// // Disable context menu
// // window.oncontextmenu = function (event) {
// //     event.preventDefault();
// //     event.stopPropagation();
// //     return false;
// // };

// function touchStart(index) {
//     return function (event) {
//         currentPortraitIndex = index;
//         startPos = getPositionX(event);
//         isDragging = true;

//         // https://css-tricks.com/using-requestanimationframe/
//         animationID = requestAnimationFrame(animation);
//     };
// }

// function touchEnd(arrayUsed, index) {
//     isDragging = false;
//     cancelAnimationFrame(animationID);

//     const movedBy = currentTranslate - prevTranslate;

//     if (movedBy < -100 && index < arrayUsed.length - 1)
//         currentPortraitIndex += 1;

//     if (movedBy > 100 && index > 0) index -= 1;

//     setPositionByIndex();
// }

// function touchMove(event) {
//     if (isDragging) {
//         const currentPosition = getPositionX(event);
//         currentTranslate = prevTranslate + currentPosition - startPos;
//     }
// }

// function getPositionX(event) {
//     return event.type.includes("mouse")
//         ? event.pageX
//         : event.touches[0].clientX;
// }

// function animation() {
//     slidePhotos(photoList, photoSwitchArray, currentPortraitIndex);
//     if (isDragging) requestAnimationFrame(animation);
// }

// function setPositionByIndex() {
//     currentTranslate = currentPortraitIndex * -window.innerWidth;
//     prevTranslate = currentTranslate;
//     slidePhotos(photoList, photoSwitchArray, currentPortraitIndex);
// }
