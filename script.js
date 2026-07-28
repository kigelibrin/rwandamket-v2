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
// ========================================
// HERO SLIDER
// ========================================

function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    if (!slides.length) return;

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[index].classList.add("active");

        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

