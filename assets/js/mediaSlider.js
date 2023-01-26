export class mediaSlider {
    constructor(sliderArray, switchArray) {
        this.sliderArray = sliderArray;
        this.switchArray = switchArray;
        this.currentIndex = 0;
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.addSliderEventListeners();
        this.addSwitcherEventListeners();
    }

    addSliderEventListeners = () => {
        this.sliderArray.forEach((slide, index) => {
            // const slideImage = slide.querySelector("img");
            // slideImage.addEventListener("dragstart", (e) => e.preventDefault());

            // Touch events
            slide.addEventListener("touchstart", this.touchStart(index));
            slide.addEventListener("touchend", this.touchEnd);
            slide.addEventListener("touchmove", this.touchMove);

            // Mouse events
            slide.addEventListener("mousedown", this.touchStart(index));
            slide.addEventListener("mouseup", this.touchEnd);
            slide.addEventListener("mouseleave", this.touchEnd);
            slide.addEventListener("mousemove", this.touchMove);
        });
    };

    switchClickHandler = (e) => {
        this.currentIndex = parseInt(e.target.style.cssText.split(" ")[1]) - 1;
        this.slidePhotos();
        this.switchArray.forEach((el) => {
            el.classList.remove("active");
        });
        e.target.classList.add("active");
    };

    addSwitcherEventListeners = () => {
        this.switchArray.forEach((elem) =>
            elem.addEventListener("click", (e) => this.switchClickHandler(e))
        );
    };

    slidePhotos = () => {
        this.sliderArray.forEach((slide, index) => {
            slide.style.transform = `translateX(${
                100 * (index - this.currentIndex)
            }%)`;
        });
        this.switchArray.forEach((element, index) => {
            element.classList.remove("active");
            if (index === this.currentIndex) element.classList.add("active");
        });
    };

    touchStart = (index) => {
        return (event) => {
            this.usedIndex = index;
            this.startPos = this.getPositionX(event);
            this.isDragging = true;

            // https://css-tricks.com/using-requestanimationframe/
            this.animationID = requestAnimationFrame(this.animation);
        };
    };

    setPositionByIndex = () => {
        this.currentTranslate = this.currentIndex * -window.innerWidth;
        this.prevTranslate = this.currentTranslate;
        this.slidePhotos();
    };

    touchEnd = () => {
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);

        const movedBy = this.currentTranslate - this.prevTranslate;

        if (movedBy < -100 && this.currentIndex < this.sliderArray.length - 1)
            this.currentIndex += 1;

        if (movedBy > 100 && this.currentIndex > 0) this.currentIndex -= 1;

        this.setPositionByIndex();
    };

    touchMove = (event) => {
        if (this.isDragging) {
            const currentPosition = this.getPositionX(event);
            this.currentTranslate =
                this.prevTranslate + currentPosition - this.startPos;
        }
    };

    getPositionX = (event) => {
        return event.type.includes("mouse")
            ? event.pageX
            : event.touches[0].clientX;
    };

    animation = () => {
        this.slidePhotos();
        if (this.isDragging) requestAnimationFrame(this.animation);
    };
}
