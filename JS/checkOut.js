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
    discountElement.innerText = '$' + discount;
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
const placeOrderBtn = document.querySelector('[data-place-order-btn]')
placeOrderBtn.addEventListener('click', () => {
    localStorage.removeItem("productId");
    localStorage.removeItem("productList");
    localStorage.removeItem("couponDiscount");
    localStorage.removeItem("total");
    localStorage.removeItem("subtotal");
    location.reload();
    if (productId !== null && productId !== "")
        alert("Order Place Successfully");
    else
        alert("Please Add order to cart");
});


