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
hamburgerBtn.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("rotate");
    navLinks.classList.toggle("mobile-active");
});


const plusBtn = document.querySelectorAll(".plus-btn");
plusBtn.forEach((btn) => {
    const plus = btn.querySelector(".fa-plus");
    btn.addEventListener("click", () => {
        const allSubNavs = document.querySelectorAll(".sub-nav-links");
        allSubNavs.forEach((subNav) => {
            if (subNav !== btn.nextElementSibling) {
                subNav.classList.remove("active-sub-nav-link");
            }
        });
        const subNav = btn.nextElementSibling;
        subNav.classList.toggle("active-sub-nav-link");
        if (subNav.classList.contains("active-sub-nav-link")) {
            plus.className = "fa-solid fa-minus";
            navLinks.style.minHeight = "82%";
        }
        else {
            plus.className = "fa-solid fa-plus";
            navLinks.style.minHeight = "0%";
        }
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
const CarouselWrapper = document.querySelector(".carousel-wrapper");
const carousel = document.querySelector(".carousel");
const carouselFirstCardWidth = carousel.querySelector(".carousel-card").offsetWidth;
const carouselChildrens = [...carousel.children];

const companyCarouselWrapper = document.querySelector(".company-carousel-wrapper");
const companyCarousel = document.querySelector(".company-carousel");
const companyCarouselFirstCardWidth = companyCarousel.querySelector(".company-carousel-card").offsetWidth;
const companyCarouselChildrens = [...companyCarousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerViewCompany = Math.round(companyCarousel.offsetWidth / companyCarouselFirstCardWidth);
let cardPerView = Math.round(carousel.offsetWidth / carouselFirstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

companyCarouselChildrens.slice(-cardPerViewCompany).reverse().forEach(card => {
    companyCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
companyCarouselChildrens.slice(0, cardPerViewCompany).forEach(card => {
    companyCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("carousel-no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("carousel-no-transition");

companyCarousel.classList.add("carousel-no-transition");
companyCarousel.scrollLeft = companyCarousel.offsetWidth;
companyCarousel.classList.remove("carousel-no-transition");

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("carousel-dragging");
    companyCarousel.classList.add("carousel-dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
    startScrollLeft = companyCarousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    companyCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("carousel-dragging");
    companyCarousel.classList.remove("carousel-dragging");
}

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0 || companyCarousel.scrollLeft === 0) {
        carousel.classList.add("carousel-no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("carousel-no-transition");
        companyCarousel.classList.add("carousel-no-transition");
        companyCarousel.scrollLeft = companyCarousel.scrollWidth - (2 * companyCarousel.offsetWidth);
        companyCarousel.classList.remove("carousel-no-transition");
    }
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth || Math.ceil(companyCarousel.scrollLeft) === companyCarousel.scrollWidth - companyCarousel.offsetWidth) {
        carousel.classList.add("carousel-no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("carousel-no-transition");
        companyCarousel.classList.add("carousel-no-transition");
        companyCarousel.scrollLeft = companyCarousel.offsetWidth;
        companyCarousel.classList.remove("carousel-no-transition");
    }
    clearTimeout(timeoutId);
    if (!CarouselWrapper.matches(":hover") || !companyCarouselWrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    timeoutId = setTimeout(() => carousel.scrollLeft += carouselFirstCardWidth, 5000);
    timeoutId = setTimeout(() => companyCarousel.scrollLeft += companyCarouselFirstCardWidth, 4500);
}

autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
CarouselWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
CarouselWrapper.addEventListener("mouseleave", autoPlay);

companyCarousel.addEventListener("mousedown", dragStart);
companyCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
companyCarousel.addEventListener("scroll", infiniteScroll);
companyCarouselWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
companyCarouselWrapper.addEventListener("mouseleave", autoPlay);

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
