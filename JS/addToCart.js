// if (document.readyState == "loading")
//     document.addEventListener("DOMContentLoaded", ready);
// else
//     ready();

// function ready() {
//     removeCartItem();
// }

const addToCartBtn = document.querySelectorAll("[data-add-to-cart-btn]");
addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let buttonClicked = e.target;
        let item = buttonClicked.parentElement.parentElement;
        let itemImage = item.querySelector("[data-card-item-img]").src;
        let itemName = item.querySelector("[data-card-item-title]").innerText;
        let itemPrice = item.querySelector("[data-card-item-price]").innerText;
        addItemToCart(itemImage, itemName, itemPrice);
        updateCartTotal();
    });
});

function addItemToCart(itemImage, itemName, itemPrice) {
    let cartItemContainer = document.querySelector("[data-cart-item-container]");
    let allCartItemsNames = document.querySelectorAll("[data-item-name]");
    for (let i = 0; i < allCartItemsNames.length; i++) {
        if (allCartItemsNames[i].innerText == itemName) {
            alert("This item is already added to the cart");
            return;
        }
    }
    // create a div in cart.html page

    let cardRow = document.createElement("div");
    cardRow.classList.add("cart-item-row");
    cardRow.classList.add("grid");
    cardRow.classList.add("text-center");
    cardRow.classList.add("p-i-center");
    cardRow.setAttribute("data-cart-item-row", "");

    let cardRowContent = `
    <div data-item-delete class="item-delete | flex ai-jc-center  text-center "><i class="fa-solid fa-trash-can | hover-link"></i></div>
    <div data-item-img class="item-img | flex ai-jc-center text-center "><img src="${itemImage}" alt=""></div>
    <p data-item-name class="item-name | flex ai-jc-center text-center ">${itemName}</p>
    <p data-item-price class="item-price | flex ai-jc-center text-center ">100$</p>
    <div class="item-quantity | flex ai-jc-center text-center "><input data-item-quantity class="text-center" type="number" value="1"></div>
    <p data-item-total class="item-total | flex ai-jc-center text-center ">${itemPrice}</p>`
    cardRow.innerHTML = cardRowContent;
    cartItemContainer.append(cardRow);
    cardRow.querySelector("[data-item-delete] i").addEventListener("click", (e) => {
        let buttonClicked = e.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    });
    cardRow.querySelector("[data-item-quantity]").addEventListener("change", (e) => {
        if (isNaN(e.target.value) || e.target.value <= 0)
            e.target.value = 1;
        updateCartTotal();
    });
}

newDocument = window.location.href;
console.log(newDocument);


if (window.location.href.includes("cart")) {
    const updateCartBtn = document.querySelector("[data-update-cart]");
    updateCartBtn.addEventListener('click', () => {
        updateCartTotal();
    });
}

const removeCartItemBtn = document.querySelectorAll("[data-item-delete] i");
removeCartItemBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let buttonClicked = e.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    });
});

function updateCartTotal() {
    const cartItemContainer = document.querySelector("[data-cart-item-container]");
    const cartRows = cartItemContainer.querySelectorAll("[data-cart-item-row]");
    let subTotal = 0;
    cartRows.forEach((row) => {
        let itemTotal = 0;
        const priceElement = row.querySelector("[data-item-price]");
        const quantityElement = row.querySelector("[data-item-quantity]");
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = parseFloat(quantityElement.value);
        itemTotal = price * quantity;
        Math.round(itemTotal * 100) / 100;
        const totalElement = row.querySelector("[data-item-total]");
        totalElement.innerText = '$' + itemTotal;
        subTotal += itemTotal;
    });
    Math.round(subTotal * 100) / 100;
    const subTotalElement = document.querySelector("[data-sub-total]");
    subTotalElement.innerText = '$' + subTotal;
    const shippingPrice = parseFloat(document.querySelector("[data-shipping-price]").innerText.replace("$", ""));
    let total = subTotal + shippingPrice;
    Math.round(total * 100) / 100;
    const totalElement = document.querySelector("[data-total]");
    if (subTotal != 0)
        totalElement.innerText = '$' + total;
    else
        totalElement.innerText = '$0';
}

const quantityElement = document.querySelectorAll("[data-item-quantity]");
quantityElement.forEach((quantity) => {
    quantity.addEventListener("change", (e) => {
        if (isNaN(e.target.value) || e.target.value <= 0)
            e.target.value = 1;
        updateCartTotal();
    });
});
