// ================================
// RWANDAMARKET
// Main Application
// ================================

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 RWANDAMARKET starting...");

    try {
        // 1. Initialize synchronous UI components immediately
        initTheme();
        initSearch();
        initCart();

        // 2. Fetch data in parallel for faster load times
        console.log("📦 Fetching market data...");
        const [categories, featured, markets] = await Promise.allSettled([
            loadCategories(),
            loadFeaturedMarkets(),
            loadMarkets()
        ]);

        // Check for fetch failures without breaking the whole UI
        if (categories.status === "rejected") console.error("Failed categories:", categories.reason);
        if (featured.status === "rejected") console.error("Failed featured markets:", featured.reason);
        if (markets.status === "rejected") console.error("Failed markets:", markets.reason);

        console.log("✅ RWANDAMARKET loaded successfully.");
    } catch (error) {
        console.error("❌ Critical app initialization error:", error);
    }
});

