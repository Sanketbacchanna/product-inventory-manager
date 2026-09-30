"use strict";
// ==========================================
// BASIC TYPES AND VARIABLES
// ==========================================
let productName = "Wireless Mouse";
let price = 799;
let inStock = true;
let tags = ["electronics", "mouse", "wireless"];
let productId = 101;
// Function to print product information
function printProductInfo() {
    console.log(`Product: ${productName}, ID: ${productId}, Price: ₹${price}, ` +
        `In Stock: ${inStock}, Tags: ${tags.join(", ")}`);
}
printProductInfo();
// ==========================================
// ANY TYPE AND REFACTORING
// ==========================================
// Less safe
let productData = "Wireless Mouse";
// Refactored to a specific type
let productDataSafe = "Wireless Mouse";
console.log(productDataSafe);
// Using a specific type is safer because TypeScript can
// detect invalid operations and values during compilation.
// ==========================================
// FUNCTIONS AND SCOPE
// ==========================================
// Calculate discounted price
function calculateDiscount(price, discountPercent = 10) {
    return price - (price * discountPercent / 100);
}
console.log("Discounted Price:", calculateDiscount(1000));
console.log("20% Discount:", calculateDiscount(1000, 20));
// ==========================================
// BULK DISCOUNT
// ==========================================
function applyBulkDiscount(prices, discountRate) {
    return prices.map((price) => {
        return calculateDiscount(price, discountRate);
    });
}
const prices = [500, 1000, 1500, 2000];
const discountedPrices = applyBulkDiscount(prices, 10);
console.log("Original Prices:", prices);
console.log("Discounted Prices:", discountedPrices);
// ==========================================
// BLOCK SCOPE VS FUNCTION SCOPE
// ==========================================
function scopeExample() {
    for (let i = 0; i < 3; i++) {
        let message = `Loop number: ${i}`;
        console.log(message);
    }
    // Uncommenting the line below causes an error:
    // console.log(message);
    // Error:
    // Cannot find name 'message'.
    //
    // 'message' has block scope because it was declared
    // using let inside the for-loop.
}
scopeExample();
// ==========================================
// PRODUCT ARRAY
// ==========================================
const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        price: 799,
        inStock: true,
        tags: ["electronics", "mouse"]
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        price: 2499,
        inStock: true,
        tags: ["electronics", "keyboard"]
    },
    {
        id: 3,
        name: "USB Cable",
        price: 299,
        inStock: false,
        tags: ["accessories", "cable"]
    },
    {
        id: 4,
        name: "Laptop Stand",
        price: 1299,
        inStock: true,
        tags: ["laptop", "stand"]
    }
];
// ==========================================
// GET AVAILABLE PRODUCTS
// ==========================================
function getAvailableProducts(products) {
    return products.filter((product) => product.inStock);
}
const availableProducts = getAvailableProducts(products);
console.log("Available Products:");
console.log(availableProducts);
// ==========================================
// APPLY DISCOUNT TO PRODUCTS
// ==========================================
function applyDiscountToProducts(products, discountPercent) {
    return products.map((product) => {
        return Object.assign(Object.assign({}, product), { price: calculateDiscount(product.price, discountPercent), discountPercent: discountPercent });
    });
}
const discountedProducts = applyDiscountToProducts(products, 15);
console.log("Discounted Products:");
console.log(discountedProducts);
// ==========================================
// BROWSER PRODUCT INVENTORY MANAGER
// ==========================================
const productListElement = document.getElementById("productList");
const totalProductsElement = document.getElementById("totalProducts");
const availableProductsElement = document.getElementById("availableProducts");
// Display products on webpage
function displayProducts(productArray) {
    if (!productListElement) {
        return;
    }
    productListElement.innerHTML = "";
    productArray.forEach((product) => {
        var _a;
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>ID:</strong> ${product.id}</p>
            <p><strong>Price:</strong> ₹${product.price}</p>
            <p>
                <strong>Status:</strong>
                ${product.inStock ? "Available" : "Out of Stock"}
            </p>
            <p>
                <strong>Tags:</strong>
                ${((_a = product.tags) === null || _a === void 0 ? void 0 : _a.join(", ")) || "No tags"}
            </p>
        `;
        productListElement.appendChild(productCard);
    });
}
// Update statistics
function updateStatistics() {
    if (totalProductsElement) {
        totalProductsElement.textContent =
            products.length.toString();
    }
    if (availableProductsElement) {
        availableProductsElement.textContent =
            availableProducts.length.toString();
    }
}
// Initial display
displayProducts(products);
updateStatistics();
// ==========================================
// SEARCH FUNCTION
// ==========================================
const searchInput = document.getElementById("searchInput");
if (searchInput instanceof HTMLInputElement) {
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        const filteredProducts = products.filter((product) => product.name
            .toLowerCase()
            .includes(searchText));
        displayProducts(filteredProducts);
    });
}
