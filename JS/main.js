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
const activePage = window.location.pathname;
const navLinksActive = document.querySelectorAll("nav a");
// navLinks.forEach(link => {
//     if(link.href.includes('${activePage}'))
//         console.log('${activePage}');
// });
navLinksActive.forEach(link => {
    if(link.href === window.location.origin + activePage)
        link.classList.add('active-Link');
});

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

// ********************** Scroll to Top *********************************
const scrollTopBtn = document.querySelector(".scroll-to-top");

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
