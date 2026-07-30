// ========================================
// RWANDAMKET
// Cart Drawer
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const cartButton = document.getElementById("cartButton");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCartBtn = document.getElementById("closeCartBtn");

    window.openCart = function () {

        cartDrawer.classList.add("active");
        cartOverlay.classList.add("active");

        renderCartDrawer();

    };

    window.closeCart = function () {

        cartDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");

    };

    cartButton?.addEventListener("click", openCart);

    closeCartBtn?.addEventListener("click", closeCart);

    cartOverlay?.addEventListener("click", closeCart);

});
// ========================================
// Render Cart
// ========================================

function renderCartDrawer() {

    const container = document.getElementById("cartItems");

    const totalElement = document.getElementById("cartTotalAmount");

    if (!container) return;

    container.innerHTML = "";

    if (!window.CURRENT_CART || CURRENT_CART.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                Your cart is empty.

            </div>

        `;

        totalElement.textContent = "0 RWF";

        return;

    }

    let total = 0;

    CURRENT_CART.forEach((item, index) => {

        total += item.price * item.quantity;

        container.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>${item.name}</strong>

                    <br>

                    ${item.price.toLocaleString()} RWF

                </div>

                <div class="cart-controls">

                    <button onclick="decreaseCartItem(${index})">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseCartItem(${index})">+</button>

                </div>

            </div>

        `;

    });

    totalElement.textContent = total.toLocaleString() + " RWF";

}
// ========================================
// Quantity Controls
// ========================================

window.increaseCartItem = function(index){

    CURRENT_CART[index].quantity++;

    renderCartDrawer();

    refreshCartUIFooterPanel();

};

window.decreaseCartItem = function(index){

    CURRENT_CART[index].quantity--;

    if(CURRENT_CART[index].quantity <= 0){

        CURRENT_CART.splice(index,1);

    }

    renderCartDrawer();

    refreshCartUIFooterPanel();

};
