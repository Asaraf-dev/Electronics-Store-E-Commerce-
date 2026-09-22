/*--- Hero Section Start ---*/
/*--- Hero Slider ---*/
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector("#es-ind-hero-slider");
    if (!slider) return; const slides = slider.querySelectorAll(".es-ind-hero-slide");
    const dots = slider.querySelectorAll(".es-ind-hero-dot"); if (!slides.length || !dots.length) return;
    let currentSlide = 0; let sliderTimer = null;
    let sliderPaused = false; const showSlide = function (index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0; slides.forEach(function (slide) { slide.classList.remove("active"); });
        dots.forEach(function (dot) { dot.classList.remove("active"); });
        slides[index].classList.add("active");
        dots[index].classList.add("active"); currentSlide = index;
    };
    const startSlider = function () {
        clearInterval(sliderTimer);
        if (sliderPaused) return; sliderTimer = setInterval(function () { showSlide(currentSlide + 1); }, 5000);
    };
    const pauseSlider = function () { sliderPaused = true; clearInterval(sliderTimer); };
    const resumeSlider = function () { sliderPaused = false; startSlider(); };
    dots.forEach(function (dot, index) { dot.addEventListener("click", function () { showSlide(index); startSlider(); }); });
    const newsletterInputs = slider.querySelectorAll(".es-ind-hero-newsletter input");
    newsletterInputs.forEach(function (input) {
        input.addEventListener("focus", function () { pauseSlider(); });
        input.addEventListener("input", function () { pauseSlider(); }); input.addEventListener("blur", function () { resumeSlider(); });
    });
    slider.addEventListener("mouseenter", function () { pauseSlider(); });
    slider.addEventListener("mouseleave", function () { if (!slider.querySelector(".es-ind-hero-newsletter input:focus")) resumeSlider(); });
    showSlide(0); startSlider();
});

/*--- Newsletter Success Popup ---*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".es-ind-hero-newsletter");
    const popup = document.querySelector("#es-ind-hero-popup");
    const closeButton = document.querySelector("#es-ind-hero-popup-close");
    const okButton = document.querySelector("#es-ind-hero-popup-button");
    if (!form || !popup) return; const closePopup = function () {
        popup.classList.remove("active");
        document.body.classList.remove("es-ind-hero-popup-open");
    };
    form.addEventListener("submit", function (event) {
        event.preventDefault(); const input = form.querySelector("input[type='email']");
        if (!input) return; if (!input.checkValidity()) { input.reportValidity(); return; }
        popup.classList.add("active"); document.body.classList.add("es-ind-hero-popup-open");
        form.reset();
    }); if (closeButton) closeButton.addEventListener("click", closePopup);
    if (okButton) okButton.addEventListener("click", closePopup);
    popup.addEventListener("click", function (event) {
        if (event.target.classList.contains("es-ind-hero-popup-overlay")) closePopup();
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && popup.classList.contains("active")) closePopup();
    });
});
/*--- Newsletter Popup Scroll Lock ---*/
document.addEventListener("DOMContentLoaded", function () { const style = document.createElement("style"); style.textContent = ".es-ind-hero-popup-open{overflow:hidden;}"; document.head.appendChild(style); });
/*--- Hero Section End ---*/

/*--- Featured Brands Section Start ---*/
/*--- Featured Brands ---*/
document.addEventListener("DOMContentLoaded", function () { const brands = document.querySelector(".es-ind-featured-brands"); if (!brands) return; const brandItems = brands.querySelectorAll(".es-ind-featured-brands-item"); brandItems.forEach(function (item) { item.addEventListener("click", function () { brandItems.forEach(function (brand) { brand.classList.remove("active"); }); item.classList.add("active"); }); }); });
/*--- Featured Brands Section End ---*/

/*--- Deals Of The Day Section Start ---*/
/*--- Deals Of The Day ---*/
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".es-ind-deals");
    if (!section) return; const mainImage = document.querySelector("#es-ind-deals-main-image");
    const thumbs = document.querySelectorAll(".es-ind-deals-thumb");
    const imageSources = ["assets/images/prod5.webp", "assets/images/prod6.webp", "assets/images/prod7.webp", "assets/images/prod8.webp"]; thumbs.forEach(function (thumb, index) {
        thumb.addEventListener("click", function () {
            if (!mainImage || !imageSources[index]) return; mainImage.src = imageSources[index];
            thumbs.forEach(function (item) { item.classList.remove("active"); }); thumb.classList.add("active");
        });
    });
    const timer = document.querySelector("#es-ind-deals-timer");
    if (!timer) return; const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 9);
    const updateTimer = function () {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        if (distance <= 0) { timer.querySelectorAll("b").forEach(function (item) { item.textContent = "00"; }); return; }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000); const values = [days, hours, minutes, seconds];
        timer.querySelectorAll("b").forEach(function (item, index) { item.textContent = String(values[index]).padStart(2, "0"); });
    };
    updateTimer(); setInterval(updateTimer, 1000);
});
const wishlistButton = document.querySelector(".es-ind-deals-wishlist");
if (wishlistButton) {
    wishlistButton.addEventListener("click", function () {
        const icon = this.querySelector("i");
        this.classList.toggle("active");
        if (this.classList.contains("active")) {
            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");
        } else {
            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");
        }
    });
}
/*--- Deals Of The Day Section End ---*/

/*--- Pre Order Banner  Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const banner = document.querySelector(".es-ind-preorder-banner");
    const button = document.querySelector(".es-ind-preorder-button");
    if (!banner || !button) return; button.addEventListener("click", function () {
        banner.classList.add("es-ind-preorder-clicked");
        setTimeout(function () { banner.classList.remove("es-ind-preorder-clicked"); }, 350);
    });
});
/*--- Pre Order Banner  Section End ---*/

/*--- Best Seller Products Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".es-ind-product-tab");
    const panels = document.querySelectorAll(".es-ind-product-panel");
    const prevButton = document.querySelector(".es-ind-product-tabs-prev");
    const nextButton = document.querySelector(".es-ind-product-tabs-next");
    if (!tabs.length || !panels.length) return; let currentIndex = 0;
    const showPanel = function (index) {
        if (index < 0) index = tabs.length - 1; if (index >= tabs.length) index = 0;
        tabs.forEach(function (tab) { tab.classList.remove("active"); });
        panels.forEach(function (panel) { panel.classList.remove("active"); });
        tabs[index].classList.add("active"); const target = tabs[index].getAttribute("data-tab");
        const panel = document.querySelector('.es-ind-product-panel[data-panel="' + target + '"]');
        if (panel) panel.classList.add("active"); currentIndex = index;
    };
    tabs.forEach(function (tab, index) { tab.addEventListener("click", function () { showPanel(index); }); });
    if (prevButton) prevButton.addEventListener("click", function () { showPanel(currentIndex - 1); });
    if (nextButton) nextButton.addEventListener("click", function () { showPanel(currentIndex + 1); });
    showPanel(0);
});
/*--- Best Seller Products Section End ---*/

/*--- Top Cellphones & Tablets Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".es-ind-cellphones");
    if (!section) return; const products = section.querySelectorAll(".es-ind-cellphones-product");
    products.forEach(function (product) {
        product.addEventListener("mouseenter", function () { product.classList.add("active"); });
        product.addEventListener("mouseleave", function () { product.classList.remove("active"); });
    });
});
/*--- Top Cellphones & Tablets Section End ---*/

/*--- Best Laptops & Computers Section Start ---*/
/*--- Best Laptops & Computers ---*/
document.addEventListener("DOMContentLoaded",function(){const section=document.querySelector(".es-ind-laptops");if(!section)return;const products=section.querySelectorAll(".es-ind-laptops-product");products.forEach(function(product){product.addEventListener("mouseenter",function(){product.classList.add("active");});product.addEventListener("mouseleave",function(){product.classList.remove("active");});});});
/*--- Best Laptops & Computers Section End ---*/

/*--- Promotional Cards Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){const cards=document.querySelectorAll(".es-ind-promo-card");if(!cards.length)return;cards.forEach(function(card){card.addEventListener("mouseenter",function(){card.classList.add("active");});card.addEventListener("mouseleave",function(){card.classList.remove("active");});});});
/*--- Promotional Cards Section Start ---*/

/*--- Your Recently Viewed Section Start ---*/
/*--- Your Recently Viewed ---*/
document.addEventListener("DOMContentLoaded",function(){const items=document.querySelectorAll(".es-ind-recently-viewed-item");if(!items.length)return;items.forEach(function(item){item.addEventListener("mouseenter",function(){item.classList.add("active");});item.addEventListener("mouseleave",function(){item.classList.remove("active");});});});
/*--- Your Recently Viewed Section End ---*/

/* ==========================================
   ES HOME PAGE REVEAL ANIMATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".es-reveal, .es-reveal-left, .es-reveal-right, .es-reveal-scale, .es-reveal-stagger"
  );

  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("es-reveal-active");

          // Animate only once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});

/*--- Cellphones Wishlist ---*/
const cellphoneWishlistButtons = document.querySelectorAll(
    ".es-ind-cellphones-wishlist"
);

cellphoneWishlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const icon = this.querySelector("i");

        this.classList.toggle("active");

        if (this.classList.contains("active")) {

            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");

        } else {

            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");

        }

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const actionButtons = document.querySelectorAll(".es-ind-recently-viewed-name ,.es-ind-recently-viewed-price");

    actionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "product.html";

        });

    });

});