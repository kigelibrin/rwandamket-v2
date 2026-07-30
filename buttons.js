// ========================================
// RWANDAMKET
// Homepage Buttons
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    window.scrollToMarkets = function () {

        const section = document.getElementById("markets");

        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };

    window.scrollToAbout = function () {

        const section = document.getElementById("about");

        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };

});
