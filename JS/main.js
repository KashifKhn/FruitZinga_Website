// **************** sticky Nav bar ********************
const primaryNav = document.querySelector(".primary-navigation");
const navSticky = primaryNav.offsetTop;
window.addEventListener('scroll', ()=> {
    if(window.scrollY > navSticky)
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
        if(subNav.classList.contains("active-sub-nav-link")) {
            plus.className = "fa-solid fa-minus";
            navLinks.style.minHeight=  "82%";
        }
        else {
            plus.className = "fa-solid fa-plus";
            navLinks.style.minHeight=  "0%";
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
    if(searchMenu.classList.contains("search-section-active"))
        searchMenu.classList.remove("search-section-active");
});

searchOpenBtn.addEventListener('click', () => {
    if(!searchMenu.classList.contains("search-section-active"))
        searchMenu.classList.add("search-section-active");
});


//  carousel 
const CarouselWrapper = document.querySelector(".carousel-wrapper");
const carousel = document.querySelector(".carousel");
const carouselFirstCardWidth = carousel.querySelector(".carousel-card").offsetWidth;
// const CarouselArrowBtns = document.querySelectorAll(".carousel-wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / carouselFirstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("carousel-no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("carousel-no-transition");

// // Add event listeners for the arrow buttons to scroll the carousel left and right
// CarouselArrowBtns.forEach(btn => {
//     btn.addEventListener("click", () => {
//         carousel.scrollLeft += btn.id == "left-carousel-btn" ? -carouselFirstCardWidth : carouselFirstCardWidth;
//     });
// });

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("carousel-dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("carousel-dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("carousel-no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("carousel-no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("carousel-no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("carousel-no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!CarouselWrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    // if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    if(!isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += carouselFirstCardWidth, 5000);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
CarouselWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
CarouselWrapper.addEventListener("mouseleave", autoPlay);