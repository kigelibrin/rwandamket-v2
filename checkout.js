// ========================================
// RWANDAMKET
// Checkout Module
// ========================================

// ========================================
// OPEN CHECKOUT
// ========================================

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const customerName =
        prompt("Enter your full name:");

    if (!customerName) return;

    const phoneNumber =
        prompt("Enter your phone number:");

    if (!phoneNumber) return;

    const deliveryAddress =
        prompt("Enter your delivery address:");

    if (!deliveryAddress) return;

    submitOrder({

        customerName,

        phoneNumber,

        deliveryAddress

    });

}

// ========================================
// SUBMIT ORDER
// ========================================

async function submitOrder(customer) {

    try {

        const order = {

            customer_name: customer.customerName,

            delivery_address: customer.deliveryAddress,

            phone_number: customer.phoneNumber,

            total_amount: calculateCartTotal(),

            payment_status: "pending",

            order_status: "received",

            items: cart

        };

        const createdOrder =
            await createOrder(order);
        await createOrderItems(
    order.id,
    cart
);

        console.log(createdOrder);

        alert("Order created successfully.");

        clearCart();

        window.location.href =
            `payment.html?order=${createdOrder.id}`;

    } catch (error) {

        console.error(error);

        alert("Unable to create order.");

    }

}

// ========================================
// CHECKOUT BUTTON
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const button =
        document.getElementById("checkoutButton");

    if (!button) return;

    button.addEventListener(

        "click",

        openCheckout

    );

});
