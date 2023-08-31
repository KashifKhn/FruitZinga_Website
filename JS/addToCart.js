console.log("addToCart.js connected");
const productId = JSON.parse(localStorage.getItem("productId"));
const productList = JSON.parse(localStorage.getItem("productList"));

productId.forEach((id) => {
    const product = productList.find(product => product.id == id);
    addItemToCart(product.productImg, product.ProductName, product.productPrice, product.id);
});


function addItemToCart(itemImage, itemName, itemPrice, itemId) {
    let cartItemContainer = document.querySelector("[data-cart-item-container]");
    let allCartItemsNames = document.querySelectorAll("[data-item-name]");
    for (let i = 0; i < allCartItemsNames.length; i++) {
        if (allCartItemsNames[i].innerText == itemName) {
            alert("This item is already added to the cart");
            return;
        }
    }
    let cardRow = document.createElement("div");
    cardRow.classList.add("cart-item-row");
    cardRow.classList.add("grid");
    cardRow.classList.add("text-center");
    cardRow.setAttribute("data-cart-item-row", "");
    cardRow.setAttribute("data-cart-item-id", `${itemId}`);
    let cardRowContent = `
    <div data-item-delete class="item-delete | flex ai-jc-center  text-center "><i class="fa-solid fa-trash-can | hover-link"></i></div>
    <div  class="item-img | flex ai-jc-center text-center "><img data-item-img src="${itemImage}" alt=""></div>
    <p data-item-name class="item-name | flex ai-jc-center text-center ">${itemName}</p>
    <p data-item-price class="item-price | flex ai-jc-center text-center ">$${itemPrice}</p>
    <div class="item-quantity | flex ai-jc-center text-center "><input data-item-quantity class="text-center" type="number" value="1"></div>
    <p data-item-total class="item-total | flex ai-jc-center text-center "></p>`
    cardRow.innerHTML = cardRowContent;
    cartItemContainer.append(cardRow);
    cardRow.querySelector("[data-item-quantity]").value = productList.find(product => product.id == itemId).productQun;
    cardRow.querySelector("[data-item-delete] i").addEventListener("click", (e) => {
        let buttonClicked = e.target;
        const cartItemId = buttonClicked.parentElement.parentElement.dataset.cartItemId;
        const cartItem = document.querySelector(`[data-cart-item-id="${cartItemId}"]`);
        cartItem.remove();
        const productIdArray = JSON.parse(localStorage.getItem("productId"));
        const index = productIdArray.indexOf(cartItemId);
        productIdArray.splice(index, 1);
        localStorage.setItem("productId", JSON.stringify(productIdArray));
        updateCartTotal();
    });
    cardRow.querySelector("[data-item-quantity]").addEventListener("change", (e) => {
        if (isNaN(e.target.value) || e.target.value <= 0)
            e.target.value = 1;
        updateCartTotal();
    });
    updateCartTotal();
}
if (window.location.href.includes("cart")) {
    const updateCartBtn = document.querySelector("[data-update-cart]");
    updateCartBtn.addEventListener('click', () => {
        updateCartTotal();
    });
}
// const removeCartItemBtn = document.querySelectorAll("[data-item-delete] i");
// removeCartItemBtn.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//         let buttonClicked = e.target;
//         const cartItemId = buttonClicked.parentElement.parentElement.dataset.cartItemId;
//         console.log(cartItemId);
//         // const cartItem = document.querySelector(`[data-cart-item-id="${cartItemId}"]`);
//         // cartItem.remove();
//         // const productIdArray = JSON.parse(localStorage.getItem("productId"));
//         // const index = productIdArray.indexOf(cartItemId);
//         // productIdArray.splice(index, 1);
//         // console.log(productIdArray);
//         // localStorage.setItem("productId", JSON.stringify(productIdArray));
//         // updateCartTotal();
//     });
// });
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
const allCartRow = document.querySelectorAll("[data-cart-item-row]");
if(allCartRow.length != 0) {
    allCartRow.forEach((row) => {
        const quantity = row.querySelector("[data-item-quantity]");
        quantity.addEventListener("change", (e) => {
            const itemId = e.target.parentElement.parentElement.dataset.cartItemId;
            const product = productList.find(product => product.id == itemId);
            product.productQun = e.target.value;
            localStorage.setItem("productList", JSON.stringify(productList));
        });
    });
}

