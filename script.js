
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
