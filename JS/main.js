// **************** sticky Nav bar ********************
const primaryNav = document.querySelector("[data-primary-navigation]");
const navSticky = primaryNav.offsetTop;
window.addEventListener('scroll', () => {
    if (window.scrollY > navSticky)
        primaryNav.classList.add("nav-sticky");
    else
        primaryNav.classList.remove("nav-sticky");
});

// ************************ hamburger menu  *********************
const hamburgerBtn = document.querySelector("[data-hamburger-btn]");
const hamburgerIcon = hamburgerBtn.querySelector("[data-hamburger-icon]");
const navLinks = document.querySelector("[data-nav-links]");
const subNavPlusBtns = document.querySelectorAll("[data-plus-btn]");
const subNavLinks = document.querySelectorAll("[data-sub-nav-links]");
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
navLinksActive.forEach(link => {
    if (link.href === window.location.origin + activePage)
        link.classList.add('active-Link');
});

// ********************** Search Menu *********************************
const searchCloseBtn = document.querySelector("[data-search-close-btn]");
const searchMenu = document.querySelector("[data-search-section]");
const searchOpenBtn = document.querySelector("[data-search-open-btn]");
searchCloseBtn.addEventListener('click', () => {
    if (searchMenu.classList.contains("search-section-active"))
        searchMenu.classList.remove("search-section-active");
});

searchOpenBtn.addEventListener('click', () => {
    if (!searchMenu.classList.contains("search-section-active"))
        searchMenu.classList.add("search-section-active");
});

// ********************** Scroll to Top *********************************
const scrollTopBtn = document.querySelector("[data-back-top]");

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

// ********************** cart count *********************************
setInterval(() => {
    try {
        const cartCountBox = document.querySelector("[data-cart-count-box]");
        const cartCountElement = document.querySelector("[data-cart-item-count]");
        const itemCountNoParse = localStorage.getItem("itemCount");
        
        if (itemCountNoParse !== null) {
            const cartCount = parseInt(itemCountNoParse, 10);
            if (!isNaN(cartCount)) {
                cartCountElement.innerText = cartCount;
            } else {
                localStorage.setItem("itemCount", 0);
                cartCountElement.innerText = 0;
                cartCountBox.style.display = "none";
            }
        } else {
            localStorage.setItem("itemCount", 0);
            cartCountElement.innerText = 0;
            cartCountBox.style.display = "none";
        }
        const productId = JSON.parse(localStorage.getItem("productId"));
        if (!productId || (Array.isArray(productId) && productId.length === 0)) {
            localStorage.setItem("itemCount", 0);
            cartCountElement.innerText = 0;
            cartCountBox.style.display = "none";
        } else {
            cartCountBox.style.display = "flex";
        }
    } catch (error) {
        console.log(error);
    }
}, 10);



// ********************** Accordion *********************************
const accordionItem = document.querySelectorAll("[data-accordion-item]");
accordionItem.forEach(item => {
    const accordionTitle = item.querySelector("[data-accordion-item-title]");
    accordionTitle.addEventListener('click', () => {
        for (let i = 0; i < accordionItem.length; i++) {
            if (accordionItem[i] != item)
                accordionItem[i].classList.remove("accordion-active");
            else
                item.classList.toggle("accordion-active");
        }
    });
});

