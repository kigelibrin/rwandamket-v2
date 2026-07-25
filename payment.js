// ========================================
// RWANDAMKET
// Payment Module
// ========================================

// Current payment method
let selectedPaymentMethod = null;

// ========================================
// SELECT PAYMENT METHOD
// ========================================

function selectPaymentMethod(method) {

    selectedPaymentMethod = method;

    document
        .querySelectorAll(".payment-method")
        .forEach(card => {

            card.classList.remove("selected");

        });

    const selectedCard =
        document.getElementById(method);

    if (selectedCard) {

        selectedCard.classList.add("selected");

    }

}

// ========================================
// PAY ORDER
// ========================================

async function payOrder(orderId) {

    if (!selectedPaymentMethod) {

        alert("Please select a payment method.");

        return;

    }

    switch (selectedPaymentMethod) {

        case "momo":

            await processMoMo(orderId);

            break;

        case "airtel":

            await processAirtel(orderId);

            break;

        case "card":

            await processCard(orderId);

            break;

        default:

            alert("Invalid payment method.");

    }

}

// ========================================
// MTN MOMO
// ========================================

async function processMoMo(orderId) {

    alert(
        "MTN MoMo integration will be connected soon."
    );

    console.log("MoMo Payment:", orderId);

}

// ========================================
// AIRTEL MONEY
// ========================================

async function processAirtel(orderId) {

    alert(
        "Airtel Money integration will be connected soon."
    );

    console.log("Airtel Payment:", orderId);

}

// ========================================
// BANK CARD
// ========================================

async function processCard(orderId) {

    alert(
        "Card payment integration will be connected soon."
    );

    console.log("Card Payment:", orderId);

}

// ========================================
// PAYMENT SUCCESS
// ========================================

function paymentSuccess(orderId) {

    alert("Payment completed successfully.");

    window.location.href =
        `success.html?order=${orderId}`;

}

// ========================================
// PAYMENT FAILED
// ========================================

function paymentFailed(message) {

    alert(message);

}
