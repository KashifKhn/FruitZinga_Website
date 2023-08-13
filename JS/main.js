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


