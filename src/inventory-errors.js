"use strict";
let wrongPrice = "1000";
function calculateDiscount(price, discountPercent = 10) {
    return price - (price * discountPercent / 100);
}
calculateDiscount(1000, 10, 20);
