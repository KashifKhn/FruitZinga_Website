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
        let product = productList.find(product => product.id == cartItemId);
        let productQun = product.productQun;
        let cartCount = parseInt(JSON.parse(localStorage.getItem("itemCount")));
        cartCount = (cartCount - productQun);
        localStorage.setItem("itemCount", JSON.stringify(cartCount));
        const productIdArray = JSON.parse(localStorage.getItem("productId"));
        const index = productIdArray.indexOf(cartItemId);
        productIdArray.splice(index, 1);
        localStorage.setItem("productId", JSON.stringify(productIdArray));
        updateCartTotal();
    });
    updateCartTotal();
}

const updateCartBtn = document.querySelector("[data-update-cart]");
updateCartBtn.addEventListener('click', () => {
    updateCartTotal();
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
    const shippingElement = document.querySelector("[data-shipping-price]");
    const totalElement = document.querySelector("[data-total-original]");
    const totalElementDis = document.querySelector("[data-total-after-coupon]");
    subTotalElement.innerText = '$' + subTotal;
    let shippingPrice = parseInt(shippingElement.innerText.replace("$", ""));

    if (subTotal >= 75) {
        shippingElement.style.textDecoration = "line-through 2px #f27f21";
        shippingPrice = 0;
    }
    else
        shippingElement.style.textDecoration = "none";
    let total = 0;
    total = subTotal + shippingPrice;
    const totalWithOutCoupon = total;
    let couponDiscount = parseInt(localStorage.getItem("couponDiscount"));
    console.log(couponDiscount)
    if (isNaN(couponDiscount))
        couponDiscount = 1;
    console.log(couponDiscount)
    if(couponDiscount != 1) {
        couponDiscount = (total * couponDiscount) / 100;
        total = total - couponDiscount;
    }
    Math.round(total * 100) / 100;
    if (productId == "" || productId == null || productId == undefined) {
        total = 0;
        subTotal = 0;
        localStorage.removeItem("total");
        localStorage.removeItem("subtotal");
    }
    if (total < 0) total = 0;
    if (couponDiscount != 1) {
        let discount = totalWithOutCoupon - total;
        totalElementDis.innerText = '$' + total;
        totalElement.innerText = '$' + `${totalWithOutCoupon}`;
        totalElement.style.textDecoration = "line-through 2px #f27f21";
        totalElementDis.style.display = "block";
    }
    else {
        totalElement.innerText = '$' + total;
        totalElementDis.innerText = "";
        totalElementDis.style.display = "none";
        totalElement.style.textDecoration = "none";
    }
    localStorage.setItem("total", total);
    localStorage.setItem("subtotal", subTotal);
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
if (allCartRow.length != 0) {
    allCartRow.forEach((row) => {
        let previousQuantity = row.querySelector("[data-item-quantity]").value;
        const quantity = row.querySelector("[data-item-quantity]");
        quantity.addEventListener("change", (e) => {
            const itemId = e.target.parentElement.parentElement.dataset.cartItemId;
            const product = productList.find(product => product.id == itemId);
            product.productQun = e.target.value;
            let cartCount = parseInt(JSON.parse(localStorage.getItem("itemCount")));
            if (e.target.value > previousQuantity)
                cartCount += (e.target.value - previousQuantity);
            else
                cartCount -= (previousQuantity - e.target.value);
            previousQuantity = e.target.value;
            localStorage.setItem("itemCount", cartCount);
            localStorage.setItem("productList", JSON.stringify(productList));
        });
    });
}

const couponCodeInput = document.querySelector("[data-coupon-input]");
const couponCodeBtn = document.querySelector("[data-coupon-apply-btn]");
let couponCode = JSON.parse(localStorage.getItem("coupon"))
couponCodeBtn.addEventListener("click", () => {
    let couponCodeValue = couponCodeInput.value;
    let couponCodeObj = couponCode.find(code => code.code == couponCodeValue);
    if (couponCodeObj) {
        const couponDiscount = couponCodeObj.discount;
        localStorage.setItem("couponDiscount", couponDiscount);
        couponCode = couponCode.filter(code => code.code != couponCodeValue);
        localStorage.setItem("coupon", JSON.stringify(couponCode));
        let i = 0;
        const couponMsg = 'Coupon Apply Successfully';
        let speed = 50;
        function typeWriter() {
            if (i < couponMsg.length) {
                document.querySelector("[data-coupon-message]").innerHTML += couponMsg.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
        setTimeout(() => {
            let i = couponMsg.length;
            let speed = 50;
            function untypedWriter() {
                if (i > 0) {
                    document.querySelector("[data-coupon-message]").innerHTML = couponMsg.substring(0, i - 1);
                    i--;
                    setTimeout(untypedWriter, speed);
                }
            }
            untypedWriter();
        }, 5000);
        updateCartTotal();
    }
    else {
        alert("Invalid Coupon Code");
    }
});
