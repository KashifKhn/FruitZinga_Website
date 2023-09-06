const subTotalElement = document.querySelector('[data-sub-total]');
const totalElement = document.querySelector('[data-total]');
const shippingElement = document.querySelector('[data-shipping-price]');
const discountElement = document.querySelector('[data-discount]');
const subTotal = localStorage.getItem('subtotal');
const total = localStorage.getItem('total');
let discount = localStorage.getItem("couponDiscount");
discount = (subTotal * discount) / 100;
discount = Math.round(discount * 100) / 100;
if (subTotal >= 75) {
    shippingElement.style.textDecoration = "line-through 2px #f27f21";
}
else
    shippingElement.style.textDecoration = "none";
if (total !== null && subTotal !== null) {
    subTotalElement.innerText = '$' + subTotal;
    discountElement.innerText = '- $' + discount;
    totalElement.innerText = '$' + total;
}
let productId = JSON.parse(localStorage.getItem("productId"));
const productList = JSON.parse(localStorage.getItem("productList"));
console.log(productList);
console.log(productId)
if (productId != "" && productId !== null) {
    productId.forEach(id => {
        const item = productList.find(product => product.id == id)
        let productPrice = item.productPrice;
        let itemQun = item.productQun;
        productPrice = productPrice * itemQun;
        addItemToContainer(item.ProductName, productPrice)
    });

    function addItemToContainer(itemName, itemPrice) {
        const checkItemContainer = document.querySelector('[data-check-item-container]');
        console.log(checkItemContainer);
        const checkItem = document.createElement('div');
        checkItem.classList.add('check-out-item');
        checkItem.classList.add('total-item');
        checkItem.classList.add('grid');
        checkItem.style.order = "-1";
        let checkItemContent = `
    <p data-item-name class="fs-14 fw-500 text-clr-secondary xs-pd-inline sm-pd-block">${itemName} </p>
    <p data-item-price class="fs-13 fw-400 text-clr-secondary xs-pd-inline sm-pd-block">$${itemPrice}</p>
    `
        checkItem.innerHTML = checkItemContent;
        checkItemContainer.append(checkItem);
    }
}


const cardNumberElement = document.querySelector('[data-credit-number]');
const cardExpireDateElement = document.querySelector('[data-credit-expe]');
const cardCvvElement = document.querySelector('[data-credit-cvv]');

cardNumberElement.addEventListener('keyup', () => {
    let cardNumber = cardNumberElement.value;
    cardNumber = cardNumber.replace(/\D/g, '');
    cardNumber = cardNumber.replace(/(\d{4})/g, '$1-');
    cardNumber = cardNumber.replace(/-$/, '');
    cardNumberElement.value = cardNumber;
});

const billingForm = document.querySelector('[data-billing-form ]');
const shippingForm = document.querySelector('[data-shipping-form]');
const paymentForm = document.querySelector('[data-payment-form]');



const placeOrderBtn = document.querySelector('[data-place-order-btn]');
placeOrderBtn.addEventListener('click', () => {
    if(!localStorage.getItem("productId") || localStorage.getItem("productId") == "" || localStorage.getItem("productId") == null) {
        alert("Please add product to cart");
        return;
    }
    if (!(checkForm(billingForm) && checkForm(shippingForm) && checkForm(paymentForm)) ){
        console.log("All forms are filled, proceed with order placement.");
        alert("All are not filled");
        return;
    }
    if (!checkCardExpires(cardExpireDateElement.value)) {
        console.log("Card is valid");
        alert("Card is Expires");
        return;
    }
    if(!checkCardCVV(cardCvvElement.value)) {
        alert("Cvv is wrong")
        return;
    }
    removeItemFromLocalStorage();
    alert("Place Order Successfully");

});


function checkCardExpires(dateInput) {
    const [year, month] = dateInput.split('-'); // Split using hyphen
    const expDate = new Date(`${year}-${month}-01`);
    console.log(expDate);
    const currentDate = new Date();
    console.log(currentDate);
    if (expDate < currentDate) {
        return false;
    }
    return true;
}

function checkCardCVV(cvvInput) {
    if (cvvInput >= 100 && cvvInput <= 999)
        return true; 
    return false;
}

function checkForm(element) {
    const elementInput = element.querySelectorAll("[data-input]");
    for (const input of elementInput) {
        if (input.value.trim() === '') {
            alert("Please fill the form First");
            return false; // Return false if any input is empty
        }
    }
    return true;
}

function removeItemFromLocalStorage() {
    localStorage.removeItem("productId");
    localStorage.removeItem("productList");
    localStorage.removeItem("couponDiscount");
    localStorage.removeItem("total");
    localStorage.removeItem("subtotal");
    localStorage.removeItem("itemCount");
    location.reload();
}

