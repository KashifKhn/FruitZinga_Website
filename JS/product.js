const addToCartBtns = document.querySelectorAll("[data-add-to-cart-btn]");
let cartItems = JSON.parse(localStorage.getItem("productId")) || [];

addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const clickedItem = btn.parentElement.parentElement;
        console.log(clickedItem);
        const productId = clickedItem.dataset.productId;
        const isItemInCart = cartItems.some(cartItem => cartItem === productId);
        if (!isItemInCart) {
            cartItems.push(productId);
            localStorage.setItem("productId", JSON.stringify(cartItems));
        }
    });
});
