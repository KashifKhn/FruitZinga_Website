// ********************** carousel testimonial *********************************
const testimonialCarouselWrapper = document.querySelector("[data-testimonial-carousel-wrapper]");
const testimonialCarousel = document.querySelector("[data-testimonial-carousel]");
const testimonialCarouselFirstCardWidth = testimonialCarousel.querySelector("[data-testimonial-carousel-card]").offsetWidth;
const testimonialCarouselChildrens = [...testimonialCarousel.children];

let isDraggingTestimonialCarousel = false;
let isAutoPlayTestimonialCarousel = true;
let testimonialCarouselStartX;
let testimonialCarouselStartScrollLeft;
let testimonialCarouselTimeoutId;

let testimonialCarouselCardPerView = Math.round(testimonialCarousel.offsetWidth / testimonialCarouselFirstCardWidth);
testimonialCarouselChildrens.slice(-testimonialCarouselCardPerView).reverse().forEach(card => {
    testimonialCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
testimonialCarouselChildrens.slice(0, testimonialCarouselCardPerView).forEach(card => {
    testimonialCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
testimonialCarousel.classList.add("carousel-no-transition");
testimonialCarousel.scrollLeft = testimonialCarousel.offsetWidth;
testimonialCarousel.classList.remove("carousel-no-transition");
const testimonialCarouselDragStart = (e) => {
    isDraggingTestimonialCarousel = true;
    testimonialCarousel.classList.add("carousel-dragging");
    testimonialCarouselStartX = e.pageX;
    testimonialCarouselStartScrollLeft = testimonialCarousel.scrollLeft;
}
const testimonialCarouselDragging = (e) => {
    if (!isDraggingTestimonialCarousel) return;
    testimonialCarousel.scrollLeft = testimonialCarouselStartScrollLeft - (e.pageX - testimonialCarouselStartX);
}
const testimonialCarouselDragStop = () => {
    isDraggingTestimonialCarousel = false;
    testimonialCarousel.classList.remove("carousel-dragging");
}
const testimonialCarouselInfiniteScroll = () => {
    if (testimonialCarousel.scrollLeft === 0) {
        testimonialCarousel.classList.add("carousel-no-transition");
        testimonialCarousel.scrollLeft = testimonialCarousel.scrollWidth - (2 * testimonialCarousel.offsetWidth);
        testimonialCarousel.classList.remove("carousel-no-transition");
    }
    else if (Math.ceil(testimonialCarousel.scrollLeft) === testimonialCarousel.scrollWidth - testimonialCarousel.offsetWidth) {
        testimonialCarousel.classList.add("carousel-no-transition");
        testimonialCarousel.scrollLeft = testimonialCarousel.offsetWidth;
        testimonialCarousel.classList.remove("carousel-no-transition");
    }
    clearTimeout(testimonialCarouselTimeoutId);
    if (!testimonialCarouselWrapper.matches(":hover"))
        testimonialCarouselAutoPlay();
}
const testimonialCarouselAutoPlay = () => {
    if (!isAutoPlayTestimonialCarousel) return;
    testimonialCarouselTimeoutId = setTimeout(() => testimonialCarousel.scrollLeft += testimonialCarouselFirstCardWidth, 2500);
}
testimonialCarouselAutoPlay();
testimonialCarousel.addEventListener("mousedown", testimonialCarouselDragStart);
testimonialCarousel.addEventListener("mousemove", testimonialCarouselDragging);
document.addEventListener("mouseup", testimonialCarouselDragStop);
testimonialCarousel.addEventListener("scroll", testimonialCarouselInfiniteScroll);
testimonialCarouselWrapper.addEventListener("mouseenter", () => clearTimeout(testimonialCarouselTimeoutId));
testimonialCarouselWrapper.addEventListener("mouseleave", testimonialCarouselAutoPlay);
