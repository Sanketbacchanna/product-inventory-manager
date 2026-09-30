// ==========================================
// BASIC TYPES AND VARIABLES
// ==========================================

let productName: string = "Wireless Mouse";
let price: number = 799;
let inStock: boolean = true;
let tags: string[] = ["electronics", "mouse", "wireless"];
let productId: number | string = 101;


// Function to print product information
function printProductInfo(): void {
    console.log(
        `Product: ${productName}, ID: ${productId}, Price: ₹${price}, ` +
        `In Stock: ${inStock}, Tags: ${tags.join(", ")}`
    );
}

printProductInfo();


// ==========================================
// ANY TYPE AND REFACTORING
// ==========================================

// Less safe
let productData: any = "Wireless Mouse";

// Refactored to a specific type
let productDataSafe: string = "Wireless Mouse";

console.log(productDataSafe);

// Using a specific type is safer because TypeScript can
// detect invalid operations and values during compilation.


// ==========================================
// FUNCTIONS AND SCOPE
// ==========================================

// Calculate discounted price
function calculateDiscount(
    price: number,
    discountPercent: number = 10
): number {

    return price - (price * discountPercent / 100);
}

console.log("Discounted Price:", calculateDiscount(1000));
console.log("20% Discount:", calculateDiscount(1000, 20));


// ==========================================
// BULK DISCOUNT
// ==========================================

function applyBulkDiscount(
    prices: number[],
    discountRate: number
): number[] {

    return prices.map((price: number): number => {
        return calculateDiscount(price, discountRate);
    });
}

const prices: number[] = [500, 1000, 1500, 2000];

const discountedPrices: number[] =
    applyBulkDiscount(prices, 10);

console.log("Original Prices:", prices);
console.log("Discounted Prices:", discountedPrices);


// ==========================================
// BLOCK SCOPE VS FUNCTION SCOPE
// ==========================================

function scopeExample(): void {

    for (let i: number = 0; i < 3; i++) {

        let message: string = `Loop number: ${i}`;

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
// INTERFACE
// ==========================================

interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    tags?: string[];
}


// ==========================================
// PRODUCT ARRAY
// ==========================================

const products: Product[] = [
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

function getAvailableProducts(
    products: Product[]
): Product[] {

    return products.filter(
        (product: Product): boolean => product.inStock
    );
}

const availableProducts: Product[] =
    getAvailableProducts(products);

console.log("Available Products:");
console.log(availableProducts);


// ==========================================
// DISCOUNTED PRODUCT INTERFACE
// ==========================================

interface DiscountedProduct extends Product {
    discountPercent: number;
}


// ==========================================
// APPLY DISCOUNT TO PRODUCTS
// ==========================================

function applyDiscountToProducts(
    products: Product[],
    discountPercent: number
): DiscountedProduct[] {

    return products.map(
        (product: Product): DiscountedProduct => {

            return {
                ...product,
                price: calculateDiscount(
                    product.price,
                    discountPercent
                ),
                discountPercent: discountPercent
            };
        }
    );
}


const discountedProducts: DiscountedProduct[] =
    applyDiscountToProducts(products, 15);

console.log("Discounted Products:");
console.log(discountedProducts);


// ==========================================
// BROWSER PRODUCT INVENTORY MANAGER
// ==========================================

const productListElement =
    document.getElementById("productList");

const totalProductsElement =
    document.getElementById("totalProducts");

const availableProductsElement =
    document.getElementById("availableProducts");


// Display products on webpage
function displayProducts(productArray: Product[]): void {

    if (!productListElement) {
        return;
    }

    productListElement.innerHTML = "";

    productArray.forEach((product: Product) => {

        const productCard: HTMLDivElement =
            document.createElement("div");

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
                ${product.tags?.join(", ") || "No tags"}
            </p>
        `;

        productListElement.appendChild(productCard);
    });
}


// Update statistics
function updateStatistics(): void {

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

const searchInput =
    document.getElementById("searchInput");

if (searchInput instanceof HTMLInputElement) {

    searchInput.addEventListener(
        "input",
        (): void => {

            const searchText: string =
                searchInput.value.toLowerCase();

            const filteredProducts: Product[] =
                products.filter(
                    (product: Product): boolean =>
                        product.name
                            .toLowerCase()
                            .includes(searchText)
                );

            displayProducts(filteredProducts);
        }
    );
}