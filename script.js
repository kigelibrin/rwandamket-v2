
// ===========================================
// RWANDAMKET
// Main JavaScript
// ===========================================

// -------------------------------
// GLOBAL VARIABLES
// -------------------------------

const db = window._supabase;

let markets = [];
let featuredMarkets = [];
let cart = [];
let selectedCategory = "all";
let selectedLocation = null;
let currentHeroSlide = 0;
let heroInterval = null;

// -------------------------------
// APP START
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    init();
});

// -------------------------------
// INITIALIZATION
// -------------------------------

async function init() {

    initTheme();

    initHeroSlider();

    initSearch();

    initCategoryFilters();

    initFAQ();

    initModals();

    await loadFeaturedMarkets();

    await loadMarkets();

    updateCartUI();

    console.log("✅ RWANDAMKET Loaded Successfully");

}

// ===========================================
// DARK MODE
// ===========================================

function initTheme() {

    const themeButton = document.getElementById("themeToggle");

    if (!themeButton) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const dark = document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );

        themeButton.textContent = dark ? "☀️" : "🌙";

    });

}

// ===========================================
// HERO SLIDER
// ===========================================

function initHeroSlider() {

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    if (!slides.length) return;

    currentHeroSlide = 0;

    showHeroSlide(currentHeroSlide);

    heroInterval = setInterval(() => {

        currentHeroSlide++;

        if (currentHeroSlide >= slides.length) {
            currentHeroSlide = 0;
        }

        showHeroSlide(currentHeroSlide);

    }, 5000);

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentHeroSlide = index;

            showHeroSlide(index);

            clearInterval(heroInterval);

            heroInterval = setInterval(() => {

                currentHeroSlide++;

                if (currentHeroSlide >= slides.length) {
                    currentHeroSlide = 0;
                }

                showHeroSlide(currentHeroSlide);

            }, 5000);

        });

    });

}
function showHeroSlide(index) {

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    if (slides[index]) {
        slides[index].classList.add("active");
    }

    if (dots[index]) {
        dots[index].classList.add("active");
    }

}
// ===========================================
// SEARCH
// ===========================================

function initSearch() {

    const searchInput = document.getElementById("marketSearch");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const keyword = this.value.trim().toLowerCase();

        const filteredMarkets = markets.filter(market => {

            const name = (market.market_name || "").toLowerCase();
            const description = (market.description || "").toLowerCase();
            const category = (market.category || "").toLowerCase();

            return (
                name.includes(keyword) ||
                description.includes(keyword) ||
                category.includes(keyword)
            );

        });

        renderMarkets(filteredMarkets);

    });

}
function clearSearch() {

    const input = document.getElementById("marketSearch");

    if (input) {
        input.value = "";
    }

    renderMarkets(markets);

}
// ===========================================
// CATEGORY FILTERS
// ===========================================

function initCategoryFilters() {

    const chips = document.querySelectorAll(".filter-chip");

    if (!chips.length) return;

    chips.forEach(chip => {

        chip.addEventListener("click", () => {

            chips.forEach(c => c.classList.remove("active"));

            chip.classList.add("active");

            selectedCategory = chip.dataset.category;

            filterMarkets();

        });

    });

}
function filterMarkets() {

    let filtered = [...markets];

    // Category filter
    if (selectedCategory !== "all") {

        filtered = filtered.filter(market =>

            (market.category || "").toLowerCase() ===
            selectedCategory.toLowerCase()

        );

    }

    // Search filter
    const search = document
        .getElementById("marketSearch")
        ?.value.trim()
        .toLowerCase();

    if (search) {

        filtered = filtered.filter(market => {

            return (
                (market.market_name || "").toLowerCase().includes(search) ||
                (market.description || "").toLowerCase().includes(search)
            );

        });

    }

    renderMarkets(filtered);

}
