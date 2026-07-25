// ========================================
// RWANDAMKET
// Shopping Cart
// ========================================

// Cart stored in browser
let cart = JSON.parse(localStorage.getItem("rwandamket_cart")) || [];

// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "rwandamket_cart",
        JSON.stringify(cart)
    );

    updateCartCount();

}

// ========================================
// ADD PRODUCT
// ========================================

async function addToCart(productId) {

    try {

        const { data: product, error } = await window._supabase
            .from("products")
            .select("*")
            .eq("id", productId)
            .single();

        if (error) throw error;

        const existing = cart.find(
            item => item.id === product.id
        );

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_url,
                quantity: 1

            });

        }

        saveCart();

        alert(`${product.name} added to cart.`);

    } catch (error) {

        console.error(error);

        alert("Unable to add product.");

    }

}

// ========================================
// REMOVE PRODUCT
// ========================================

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    renderCart();

}

// ========================================
// CHANGE QUANTITY
// ========================================

function changeQuantity(productId, change) {

    const product = cart.find(
        item => item.id === productId
    );

    if (!product) return;

    product.quantity += change;

    if (product.quantity <= 0) {

        removeFromCart(productId);

        return;

    }

    saveCart();

    renderCart();

}

// ========================================
// TOTAL
// ========================================

function calculateCartTotal() {

    return cart.reduce(

        (total, item) =>

            total + (item.price * item.quantity),

        0

    );

}

// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

    const badge = document.getElementById("cartCount");

    if (!badge) return;

    badge.textContent = cart.reduce(

        (count, item) =>

            count + item.quantity,

        0

    );

}

// ========================================
// RENDER CART
// ========================================

function renderCart() {

    console.log(cart);

    updateCartCount();

}

// ========================================
// CLEAR CART
// ========================================

function clearCart() {

    cart = [];

    saveCart();

    renderCart();

}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

});
