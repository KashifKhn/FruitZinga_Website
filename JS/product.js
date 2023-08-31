const addToCartBtns = document.querySelectorAll("[data-add-to-cart-btn]");
let cartItems = JSON.parse(localStorage.getItem("productId")) || [];

addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const clickedItem = btn.parentElement.parentElement;
        console.log(clickedItem);
        const productId = clickedItem.dataset.productId;
        const isItemInCart = cartItems.some(cartItem => cartItem === productId);
        if (!isItemInCart) {     
            let cartCount = localStorage.getItem("itemCount");
            cartCount++;
            localStorage.setItem("itemCount", cartCount);
            cartItems.push(productId);
            localStorage.setItem("productId", JSON.stringify(cartItems));
        }
        else {
            alert("This item is already in your cart");
        }
    });
});

// // ********************** Cart count *********************************

