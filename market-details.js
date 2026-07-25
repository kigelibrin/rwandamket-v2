// ========================================
// RWANDAMKET
// Market Details
// ========================================

// Read market ID from URL
const params = new URLSearchParams(window.location.search);

const marketId = params.get("id");

// ========================================
// START PAGE
// ========================================

document.addEventListener("DOMContentLoaded", async () => {

    if (!marketId) {

        alert("Market not found.");

        window.location.href = "index.html";

        return;

    }

    await loadMarket();

    await loadProducts(marketId);

});

// ========================================
// LOAD MARKET
// ========================================

async function loadMarket() {

    try {

        const market = await getMarket(marketId);

        displayMarket(market);

    } catch (error) {

        console.error(error);

    }

}

// ========================================
// DISPLAY MARKET
// ========================================

function displayMarket(market) {

    document.getElementById("marketCover").src =
        market.image_url || "assets/images/placeholder.jpg";

    document.getElementById("marketName").textContent =
        market.name;

    document.getElementById("marketCategory").textContent =
        market.category;

    document.getElementById("marketDescription").textContent =
        market.description || "";

    document.getElementById("marketLocation").textContent =
        market.location || "Kigali";

    document.getElementById("marketDeliveryTime").textContent =
        market.delivery_time || "30–45 min";

    document.getElementById("marketDeliveryFee").textContent =
        `${market.delivery_fee ?? 0} RWF`;

    document.getElementById("marketMinimumOrder").textContent =
        `${market.minimum_order ?? 0} RWF`;

    document.getElementById("marketRating").textContent =
        `⭐ ${market.rating ?? "5.0"}`;

    document.getElementById("marketReviews").textContent =
        `${market.total_reviews ?? 0} Reviews`;

    document.getElementById("marketStatus").textContent =
        market.is_open
            ? "🟢 Open"
            : "🔴 Closed";

    document.getElementById("marketVerified").textContent =
        market.verified
            ? "✔ Verified"
            : "";

}
