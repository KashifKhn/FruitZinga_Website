// **************** sticky Nav bar ********************
const primaryNav = document.querySelector(".primary-navigation");
const navSticky = primaryNav.offsetTop;
window.addEventListener('scroll', () => {
    if (window.scrollY > navSticky)
        primaryNav.classList.add("nav-sticky");
    else
        primaryNav.classList.remove("nav-sticky");
});

// ************************ hamburger menu  *********************
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hamburgerIcon = hamburgerBtn.querySelector(".hamburger-icon");
const navLinks = document.querySelector(".nav-links");
const subNavPlusBtns = document.querySelectorAll(".plus-btn");
const subNavLinks = document.querySelectorAll(".sub-nav-links");
hamburgerBtn.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("rotate");
    navLinks.classList.toggle("mobile-active");
    if (!navLinks.classList.contains("mobile-active")) {
        subNavLinks.forEach((subNav) => {
            subNav.classList.remove("active-sub-nav-link");
            const subNavPlus = subNav.previousElementSibling.querySelector(".fa-solid");
            subNavPlus.className = "fa-solid fa-plus";
        });
    }
});
subNavPlusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const subNav = btn.nextElementSibling;
        const subNavPlus = btn.querySelector(".fa-solid");
        subNavPlusBtns.forEach((otherBtn) => {
            if (otherBtn !== btn) {
                const otherSubNav = otherBtn.nextElementSibling;
                const otherSubNavPlus = otherBtn.querySelector(".fa-solid");
                otherSubNav.classList.remove("active-sub-nav-link");
                otherSubNavPlus.className = "fa-solid fa-plus";
            }
        });
        subNav.classList.toggle("active-sub-nav-link");
        if (subNav.classList.contains("active-sub-nav-link")) 
            subNavPlus.className = "fa-solid fa-minus";
         else 
            subNavPlus.className = "fa-solid fa-plus";
    });
});


// ********************** active Links ********************************* 
// const activePage = window.location.pathname;
// const navLinks = document.querySelectorAll("nav a");
// // navLinks.forEach(link => {
// //     if(link.href.includes('${activePage}'))
// //         console.log('${activePage}');
// // })
// navLinks.forEach(link => {
//     if(link.href === window.location.origin + activePage)
//         link.classList.add('active-Link');
// });

// ********************** Search Menu *********************************
const searchCloseBtn = document.querySelector(".search-close-btn");
const searchMenu = document.querySelector(".search-section");
const searchOpenBtn = document.querySelector(".search-open-btn");
searchCloseBtn.addEventListener('click', () => {
    if (searchMenu.classList.contains("search-section-active"))
        searchMenu.classList.remove("search-section-active");
});

searchOpenBtn.addEventListener('click', () => {
    if (!searchMenu.classList.contains("search-section-active"))
        searchMenu.classList.add("search-section-active");
});

// ********************** carousel testimonial *********************************
const testimonialCarouselWrapper = document.querySelector(".testimonial-carousel-wrapper");
const testimonialCarousel = document.querySelector(".testimonial-carousel");
const testimonialCarouselFirstCardWidth = testimonialCarousel.querySelector(".testimonial-carousel-card").offsetWidth;
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
    if (!testimonialCarouselWrapper.matches(":hover")) testimonialCarouselAutoPlay();
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

// ********************** Company Logo carousel *********************************
const brandCarouselWrapper = document.querySelector(".brand-carousel-wrapper");
const brandCarousel = document.querySelector(".brand-carousel");
const brandCarouselFirstCardWidth = brandCarousel.querySelector(".brand-carousel-card").offsetWidth;
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

// ********************** Scroll to Top *********************************
const scrollTopBtn = document.querySelector(".scroll-to-top")

window.addEventListener('scroll', () => {
    if (window.scrollY > 300)
        scrollTopBtn.style.display = "block"
    else
        scrollTopBtn.style.display = "none"
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
