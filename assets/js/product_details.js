/*--- Product Details Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.querySelector("#prd-dtl-main-image");
    const thumbs = document.querySelectorAll(".prd-dtl-thumb");
    const wishlistButton = document.querySelector(".prd-dtl-wishlist");
    const colorButtons = document.querySelectorAll(".prd-dtl-color");
    const memoryButtons = document.querySelectorAll(".prd-dtl-memory-btn");
    const minusButton = document.querySelector(".prd-dtl-qty-minus");
    const plusButton = document.querySelector(".prd-dtl-qty-plus");
    const quantityValue = document.querySelector(".prd-dtl-qty-value");
    if (mainImage && thumbs.length) {
        thumbs.forEach(function (thumb) {
            thumb.addEventListener("click", function () {
                const image = thumb.dataset.image;
                if (!image) return;
                mainImage.style.opacity = "0";
                setTimeout(function () {
                    mainImage.src = image;
                    mainImage.style.opacity = "1";
                }, 150);
                thumbs.forEach(function (item) { item.classList.remove("active"); });
                thumb.classList.add("active");
            });
        });
    }
    if (wishlistButton) {
        wishlistButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            wishlistButton.classList.toggle("active");
            const icon = wishlistButton.querySelector("i");
            if (!icon) return;
            if (wishlistButton.classList.contains("active")) {
                icon.classList.remove("bi-heart");
                icon.classList.add("bi-heart-fill");
                wishlistButton.setAttribute("aria-label", "Remove from wishlist");
            } else {
                icon.classList.remove("bi-heart-fill");
                icon.classList.add("bi-heart");
                wishlistButton.setAttribute("aria-label", "Add to wishlist");
            }
        });
    }
    colorButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            colorButtons.forEach(function (item) { item.classList.remove("active"); });
            button.classList.add("active");
        });
    });
    memoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            memoryButtons.forEach(function (item) { item.classList.remove("active"); });
            button.classList.add("active");
        });
    });
    if (minusButton && plusButton && quantityValue) {
        minusButton.addEventListener("click", function () {
            let quantity = parseInt(quantityValue.textContent, 10) || 1;
            if (quantity > 1) quantity--;
            quantityValue.textContent = quantity;
        });
        plusButton.addEventListener("click", function () {
            let quantity = parseInt(quantityValue.textContent, 10) || 1;
            quantity++;
            quantityValue.textContent = quantity;
        });
    }
});
/*--- Product Details Section End ---*/

/*--- Product Details Second Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.querySelector("#prd-det-sen-main-image");
    const thumbnails = document.querySelectorAll(".prd-det-sen-thumb");
    const wishlistButtons = document.querySelectorAll(".prd-det-sen-wishlist,.prd-det-sen-wishlist-small");
    const minusButton = document.querySelector(".prd-det-sen-qty-minus");
    const plusButton = document.querySelector(".prd-det-sen-qty-plus");
    const quantity = document.querySelector("#prd-det-sen-qty");
    if (mainImage) {
        thumbnails.forEach(function (thumb) {
            thumb.addEventListener("click", function () {
                const image = thumb.getAttribute("data-image");
                if (!image) return;
                thumbnails.forEach(function (item) { item.classList.remove("active"); });
                thumb.classList.add("active");
                mainImage.style.opacity = "0";
                setTimeout(function () {
                    mainImage.src = image;
                    mainImage.style.opacity = "1";
                }, 150);
            });
        });
    }
    wishlistButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            const active = button.classList.toggle("active");
            const icon = button.querySelector("i");
            if (icon) {
                icon.classList.toggle("bi-heart", !active);
                icon.classList.toggle("bi-heart-fill", active);
            }
            button.setAttribute("aria-label", active ? "Remove from wishlist" : "Add to wishlist");
        });
    });
    if (minusButton && plusButton && quantity) {
        minusButton.addEventListener("click", function () {
            let value = parseInt(quantity.textContent, 10) || 1;
            quantity.textContent = Math.max(1, value - 1);
        });
        plusButton.addEventListener("click", function () {
            let value = parseInt(quantity.textContent, 10) || 1;
            quantity.textContent = value + 1;
        });
    }
});
/*--- Product Details Second Section End ---*/

/*--- Frequently Bought Together Section Start ---*/
/*--- Product Details Tabs ---*/
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".prd-det-sen-tab");
    const panels = document.querySelectorAll(".prd-det-sen-tab-panel");
    if (!tabs.length || !panels.length) return;
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            const target = tab.getAttribute("data-tab");
            if (!target) return;
            tabs.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });
            panels.forEach(function (panel) {
                panel.classList.remove("active");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            const targetPanel = document.querySelector('.prd-det-sen-tab-panel[data-panel="' + target + '"]');
            if (targetPanel) targetPanel.classList.add("active");
        });
    });
});
/*--- Frequently Bought Together ---*/
document.addEventListener("DOMContentLoaded", function () {
    const checks = document.querySelectorAll(".prd-det-sen-bundle-check input");
    const totalPrice = document.querySelector(".prd-det-sen-bundle-total > strong");
    const wishlistButton = document.querySelector(".prd-det-sen-bundle-wishlist");
    if (!checks.length) return;
    function updateBundleTotal() {
        let total = 0;
        checks.forEach(function (check) {
            if (!check.checked) return;
            const text = check.parentElement.textContent || "";
            const match = text.match(/\(\$([\d,.]+)/);
            if (match) total += parseFloat(match[1].replace(/,/g, ""));
        });
        if (totalPrice) totalPrice.textContent = "$" + total.toFixed(2);
    }
    checks.forEach(function (check) {
        check.addEventListener("change", updateBundleTotal);
    });
    updateBundleTotal();
    if (wishlistButton) {
        wishlistButton.addEventListener("click", function () {
            this.classList.toggle("active");
            const icon = this.querySelector("i");
            if (icon) {
                icon.classList.toggle("bi-heart-fill", this.classList.contains("active"));
                icon.classList.toggle("bi-heart", !this.classList.contains("active"));
            }
        });
    }
});
/*--- Frequently Bought Together Section End ---*/

/* PRODUCT DETAILS REVEAL ANIMATION */

document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".es-reveal, " +
        ".es-reveal-left, " +
        ".es-reveal-right, " +
        ".es-reveal-scale, " +
        ".es-reveal-stagger"
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
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const actionButtons = document.querySelectorAll(".prd-det-sen-bundle-cart");

    actionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "404.html";

        });

    });

});