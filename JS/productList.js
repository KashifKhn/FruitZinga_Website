const productList = [
    {
        id:0,
        ProductName: "strawberry",
        productPrice: 85,
        productImg: "Image/products/product-img-1.jpg",
        productQun:1
    },
    {
        id:1,
        ProductName: "black grapes",
        productPrice: 80,
        productImg: "Image/products/product-img-2.jpg",
        productQun:1
    },
    {
        id:2,
        ProductName: "lemon",
        productPrice: 25,
        productImg: "Image/products/product-img-3.jpg",
        productQun:1
    },
    {
        id:3,
        ProductName: "kiwi",
        productPrice: 75,
        productImg: "Image/products/product-img-4.jpg",
        productQun:1
    },
    {
        id:4,
        ProductName: "apple",
        productPrice: 65,
        productImg: "Image/products/product-img-5.jpg",
        productQun:1
    },
    {
        id:5,
        ProductName: 'berry',
        productPrice: 95,
        productImg: "Image/products/product-img-6.jpg",
        productQun:1
    },
];
localStorage.setItem("productList", JSON.stringify(productList));