// ========================================
// RWANDAMKET
// Markets Module
// ========================================

const marketsGrid = document.getElementById("marketsGrid");
const featuredMarketsGrid = document.getElementById("featuredMarketsGrid");

// ========================================
// LOAD ALL MARKETS
// ========================================

async function loadMarkets() {
    try {

        const markets = await getMarkets();

        renderMarkets(markets);

    } catch (error) {

        console.error(error);

        showMarketError(marketsGrid);

    }
}

// ========================================
// LOAD FEATURED MARKETS
// ========================================

async function loadFeaturedMarkets() {

    try {

        const markets = await getFeaturedMarkets();

        renderFeaturedMarkets(markets);

    } catch (error) {

        console.error(error);

        showMarketError(featuredMarketsGrid);

    }

}

// ========================================
// RENDER ALL MARKETS
// ========================================

function renderMarkets(markets) {

    if (!marketsGrid) return;

    if (!markets.length) {

        marketsGrid.innerHTML = emptyState("No markets available.");

        return;

    }

    marketsGrid.innerHTML =
        markets.map(createMarketCard).join("");

}

// ========================================
// RENDER FEATURED MARKETS
// ========================================

function renderFeaturedMarkets(markets) {

    if (!featuredMarketsGrid) return;

    if (!markets.length) {

        featuredMarketsGrid.innerHTML =
            emptyState("No featured markets.");

        return;

    }

    featuredMarketsGrid.innerHTML =
        markets.map(createMarketCard).join("");

}

// ========================================
// MARKET CARD
// ========================================

function createMarketCard(market) {

    return `

    <article class="market-card">

        <img
            src="${market.image_url || 'images/placeholder.jpg'}"
            alt="${market.name}"
            loading="lazy"
        >

       <h3>
    ${market.name}
    ${market.verified ? "✔️" : ""}
</h3>

        <p>${market.description ?? ""}</p>

        <div class="market-meta">

           <span>⭐ ${market.rating ?? "5.0"}</span>

<span>${market.total_reviews ?? 0} Reviews</span>
        </div>

        <div class="market-meta">

            <span>

               ${market.is_open ? "🟢 Open Now" : "🔴 Closed"}

            </span>

            <span>

                🚴 ${market.delivery_time ?? "30–45 min"}

            </span>

        </div>

        <div class="market-meta">

            <span>

               Delivery:
${market.delivery_fee ?? 0} RWF
            </span>

            <span>

                Min:
${market.minimum_order ?? 0} RWF
            </span>

        </div>

        <button
            class="btn-primary"
            onclick="openMarket(${market.id})">

            View Market

        </button>

    </article>

    `;

}

// ========================================
// EMPTY STATE
// ========================================

function emptyState(message) {

    return `

        <div class="state-message">

            ${message}

        </div>

    `;

}

// ========================================
// ERROR STATE
// ========================================

function showMarketError(container) {

    if (!container) return;

    container.innerHTML =

        emptyState("Unable to load markets.");

}
// ========================================
// OPEN MARKET
// ========================================

function openMarket(id) {

    console.log("Opening market:", id);

}
