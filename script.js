// ================================
// RWANDAMKET
// Main Application
// ================================

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 RWANDAMKET starting...");

    try {
        // UI
        initTheme();
        initHeroSlider();

        // Load data
        await loadCategories();
        await loadFeaturedMarkets();
        await loadMarkets();

        // Initialize features
        initSearch();
        initCart();

        console.log("✅ RWANDAMKET loaded successfully.");
    } catch (error) {
        console.error("❌ App failed to initialize:", error);
    }
});
