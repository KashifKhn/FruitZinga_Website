// get the product quantity from the local storage a

const productList = [
    {
        id: 0,
        ProductName: "strawberry",
        productPrice: 85,
        productImg: "Image/products/product-img-1.jpg",
        productQun: 1
    },
    {
        id: 1,
        ProductName: "black grapes",
        productPrice: 80,
        productImg: "Image/products/product-img-2.jpg",
        productQun: 1
    },
    {
        id: 2,
        ProductName: "lemon",
        productPrice: 25,
        productImg: "Image/products/product-img-3.jpg",
        productQun: 1
    },
    {
        id: 3,
        ProductName: "kiwi",
        productPrice: 75,
        productImg: "Image/products/product-img-4.jpg",
        productQun: 1
    },
    {
        id: 4,
        ProductName: "apple",
        productPrice: 65,
        productImg: "Image/products/product-img-5.jpg",
        productQun: 1
    },
    {
        id: 5,
        ProductName: 'berry',
        productPrice: 95,
        productImg: "Image/products/product-img-6.jpg",
        productQun: 1
    },
];

const couponCode = [
    {
        code: "kashif",
        discount: 50
    },
    {
        code: "kashifKhan",
        discount: 40
    },
    {
        code: "fruitzinga",
        discount: 30
    },
    {
        code: "atif",
        discount: 25
    },
    {
        code: "wasif",
        discount: 35
    },
    {
        code: "family",
        discount: 45
    },
    {
        code: "friends",
        discount: 15
    },
]

const couponStorage = JSON.parse(localStorage.getItem("coupon"))
if(couponStorage == null || couponStorage == "" || couponStorage == undefined)
    localStorage.setItem("coupon", JSON.stringify(couponCode));

const productListStorage = JSON.parse(localStorage.getItem("productList"));
const productId = JSON.parse(localStorage.getItem("productId"));
if (productListStorage == null || productListStorage == "" || productId == null || productId == "") {
    localStorage.setItem("productList", JSON.stringify(productList));
}

let cartCount = JSON.parse(localStorage.getItem("itemCount"));
if (cartCount == null || cartCount == "" || cartCount == NaN || cartCount == undefined)
    cartCount = 0;
localStorage.setItem("itemCount", JSON.stringify(cartCount));