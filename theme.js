// ========================================
// RWANDAMKET
// Theme Controller
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-theme");
        themeToggle.textContent = "☀️";

    } else {

        themeToggle.textContent = "🌙";

    }

    themeToggle.addEventListener("click", toggleTheme);

});

function toggleTheme() {

    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        themeToggle.textContent = isDark ? "☀️" : "🌙";

    }

}
