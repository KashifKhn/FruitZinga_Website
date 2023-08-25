// ********************** Company Logo carousel *********************************
const brandCarouselWrapper = document.querySelector("[data-brand-carousel-wrapper]");
const brandCarousel = document.querySelector("[data-brand-carousel]");
const brandCarouselFirstCardWidth = brandCarousel.querySelector("[data-brand-carousel-card]").offsetWidth;
const brandCarouselChildrens = [...brandCarousel.children];

let brandCarouselIsDragging = false;
let brandCarouselIsAutoPlay = true;
let brandCarouselStartX;
let brandCarouselStartScrollLeft;
let brandCarouselTimeoutId;

let brandCarouselCardPerView = Math.round(brandCarousel.offsetWidth / brandCarouselFirstCardWidth);
brandCarouselChildrens.slice(-brandCarouselCardPerView).reverse().forEach(card => {
    brandCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

brandCarouselChildrens.slice(0, brandCarouselCardPerView).forEach(card => {
    brandCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

brandCarousel.classList.add("carousel-no-transition");
brandCarousel.scrollLeft = brandCarousel.offsetWidth;
brandCarousel.classList.remove("carousel-no-transition");

const brandCarouselDragStart = (e) => {
    brandCarouselIsDragging = true;
    brandCarousel.classList.add("carousel-dragging");
    brandCarouselStartX = e.pageX;
    brandCarouselStartScrollLeft = brandCarousel.scrollLeft;
}

const brandCarouselDragging = (e) => {
    if (!brandCarouselIsDragging) return;
    brandCarousel.scrollLeft = brandCarouselStartScrollLeft - (e.pageX - brandCarouselStartX);
}

const brandCarouselDragStop = () => {
    brandCarouselIsDragging = false;
    brandCarousel.classList.remove("carousel-dragging");
}

const brandCarouselInfiniteScroll = () => {
    if (brandCarousel.scrollLeft === 0) {
        brandCarousel.classList.add("carousel-no-transition");
        brandCarousel.scrollLeft = brandCarousel.scrollWidth - (2 * brandCarousel.offsetWidth);
        brandCarousel.classList.remove("carousel-no-transition");
    }
    else if (Math.ceil(brandCarousel.scrollLeft) === brandCarousel.scrollWidth - brandCarousel.offsetWidth) {
        brandCarousel.classList.add("carousel-no-transition");
        brandCarousel.scrollLeft = brandCarousel.offsetWidth;
        brandCarousel.classList.remove("carousel-no-transition");
    }
    clearTimeout(brandCarouselTimeoutId);
    if (!brandCarouselWrapper.matches(":hover")) brandCarouselAutoPlay();
}

const brandCarouselAutoPlay = () => {
    if (!brandCarouselIsAutoPlay) return;
    brandCarouselTimeoutId = setTimeout(() => brandCarousel.scrollLeft += brandCarouselFirstCardWidth, 1500);
}
brandCarouselAutoPlay();
brandCarousel.addEventListener("mousedown", brandCarouselDragStart);
brandCarousel.addEventListener("mousemove", brandCarouselDragging);
document.addEventListener("mouseup", brandCarouselDragStop);
brandCarousel.addEventListener("scroll", brandCarouselInfiniteScroll);
brandCarouselWrapper.addEventListener("mouseenter", () => clearTimeout(brandCarouselTimeoutId));
brandCarouselWrapper.addEventListener("mouseleave", brandCarouselAutoPlay);
