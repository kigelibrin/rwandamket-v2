// ================================
// RWANDAMARKET
// Main Application
// ================================

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 RWANDAMARKET starting...");

    try {
        // 1. Initialize synchronous UI components immediately
        initTheme();
        initHeroSlider();
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

// ========================================
// HERO SLIDER
// ========================================

function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval = null;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[index].classList.add("active");

        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        // Prevent duplicate intervals
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Add click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide(); // Reset timer on manual click
        });
    });

    // Start auto slider
    startAutoSlide();
}
