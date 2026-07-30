// ========================================
// CART DRAWER
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const cartButton = document.getElementById("cartButton");

    const cartDrawer = document.getElementById("cartDrawer");

    const cartOverlay = document.getElementById("cartOverlay");

    const closeCartBtn = document.getElementById("closeCartBtn");

    function openCart(){

        cartDrawer.classList.add("active");
        cartOverlay.classList.add("active");

    }

    function closeCart(){

        cartDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");

    }

    cartButton?.addEventListener("click", openCart);

    closeCartBtn?.addEventListener("click", closeCart);

    cartOverlay?.addEventListener("click", closeCart);

});
