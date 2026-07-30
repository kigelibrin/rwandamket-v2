// ========================================
// RWANDAMKET
// Hero Slider
// ========================================

document.addEventListener("DOMContentLoaded", initHeroSlider);

function initHeroSlider() {

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {

        slides.forEach(slide =>
            slide.classList.remove("active")
        );

        dots.forEach(dot =>
            dot.classList.remove("active")
        );

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

        clearInterval(slideInterval);

        slideInterval = setInterval(nextSlide, 5000);

    }

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentSlide = index;

            showSlide(currentSlide);

            startAutoSlide();

        });

    });

    showSlide(currentSlide);

    startAutoSlide();

}
