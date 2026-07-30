// ========================================
// RWANDAMKET
// Theme
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const themeButton = document.getElementById("themeToggle");

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-theme");
        themeButton.textContent = "☀️";

    }

    themeButton?.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        const isDark = document.body.classList.contains("dark-theme");

        localStorage.setItem("theme", isDark ? "dark" : "light");

        themeButton.textContent = isDark ? "☀️" : "🌙";

    });

});
