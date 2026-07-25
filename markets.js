// ========================================
// RWANDAMKET
// Markets Module
// ========================================

const marketsContainer = document.getElementById("marketsGrid");
const featuredContainer = document.getElementById("featuredMarketsGrid");

// ========================================
// Load All Markets
// ========================================

async function loadMarkets() {
    try {
        const markets = await getMarkets();

        renderMarkets(markets);

    } catch (error) {
        console.error("Failed to load markets:", error);

        if (marketsContainer) {
            marketsContainer.innerHTML = `
                <div class="state-message">
                    Failed to load markets.
                </div>
            `;
        }
    }
}

// ========================================
// Load Featured Markets
// ========================================

async function loadFeaturedMarkets() {
    try {
        const markets = await getFeaturedMarkets();

        renderFeaturedMarkets(markets);

    } catch (error) {
        console.error("Failed to load featured markets:", error);
    }
}

// ========================================
// Render All Markets
// ========================================

function renderMarkets(markets) {

    if (!marketsContainer) return;

    if (!markets.length) {

        marketsContainer.innerHTML = `
            <div class="state-message">
                No markets available.
            </div>
        `;

        return;
    }

    marketsContainer.innerHTML =
        markets.map(createMarketCard).join("");
}

// ========================================
// Render Featured Markets
// ========================================

function renderFeaturedMarkets(markets) {

    if (!featuredContainer) return;

    if (!markets.length) {

        featuredContainer.innerHTML = `
            <div class="state-message">
                No featured markets.
            </div>
        `;

        return;
    }

    featuredContainer.innerHTML =
        markets.map(createMarketCard).join("");
}

// ========================================
// Market Card
// ========================================

function createMarketCard(market) {

    return `
        <div class="market-card">

            <img
                src="${market.image_url || 'images/placeholder.jpg'}"
                alt="${market.name}"
            >

            <h4>${market.name}</h4>

            <p>${market.description || ""}</p>

            <span class="price-tag">
                ⭐ ${market.rating ?? 5.0}
            </span>

            <p>
                ${market.delivery_time || "30–45 min"}
            </p>

            <button
                class="btn-primary"
                onclick="openMarket(${market.id})">

                View Market

            </button>

        </div>
    `;
}
