/*--- Product Hero Section Start ---*/
document.addEventListener("DOMContentLoaded", function () { const cards = document.querySelectorAll(".prd-hero-main,.prd-hero-side"); if (!cards.length) return; cards.forEach(function (card) { card.addEventListener("mouseenter", function () { card.classList.add("active"); }); card.addEventListener("mouseleave", function () { card.classList.remove("active"); }); }); });
/*--- Product Hero Section End ---*/

/*--- Product Filter and Wishlist Start ---*/
function prdProductFilterInit() {

    const filterButtons = document.querySelectorAll(
        ".prd-sidebar-filter, .prd-filter-button"
    );

    const topCategoryButtons = document.querySelectorAll(
        ".prd-top-category"
    );

    const productCards = document.querySelectorAll(
        ".prd-product-card-top"
    );

    const noProducts = document.querySelector(
        "#prd-no-products"
    );

    if (!productCards.length) return;

    function updateActiveButtons(category) {

        filterButtons.forEach(function (button) {

            const buttonCategory = button.getAttribute(
                "data-filter"
            );

            button.classList.toggle(
                "active",
                buttonCategory === category
            );

        });

    }

    function filterProducts(category, updateUrl = true) {

        let visibleProducts = 0;

        productCards.forEach(function (product) {

            const productCategories = product
                .getAttribute("data-category")
                .split(" ");

            const isVisible =
                category === "all" ||
                productCategories.includes(category);

            product.style.display = isVisible
                ? ""
                : "none";

            if (isVisible) {
                visibleProducts++;
            }

        });

        if (noProducts) {
            noProducts.style.display =
                visibleProducts === 0
                    ? "block"
                    : "none";
        }

        updateActiveButtons(category);

        if (updateUrl) {

            const url = new URL(
                window.location.href
            );

            if (category === "all") {
                url.searchParams.delete("category");
            } else {
                url.searchParams.set(
                    "category",
                    category
                );
            }

            window.history.replaceState(
                {},
                "",
                url
            );

        }

    }

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category = button.getAttribute(
                "data-filter"
            );

            filterProducts(category);

            const sidebar = document.querySelector(
                ".prd-sidebar"
            );

            if (sidebar) {
                sidebar.classList.remove("active");
            }

        });

    });

    topCategoryButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const category = button.getAttribute(
                "data-filter"
            );

            filterProducts(category);

        });

    });

    const urlParams = new URLSearchParams(
        window.location.search
    );

    const urlCategory = urlParams.get(
        "category"
    );

    filterProducts(
        urlCategory || "all",
        false
    );

}
/*--- Wishlist ---*/
function prdWishlistInit() {

    document.addEventListener("click", function (event) {

        const button = event.target.closest(".prd-wishlist-btn");

        if (!button) return;

        event.preventDefault();
        event.stopPropagation();

        const icon = button.querySelector("i");

        if (!icon) return;

        const isActive = button.classList.toggle("active");

        if (isActive) {

            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");

            button.setAttribute(
                "aria-label",
                "Remove from wishlist"
            );

        } else {

            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");

            button.setAttribute(
                "aria-label",
                "Add to wishlist"
            );

        }

    });

}
/*--- Mobile Filter ---*/
function prdMobileFilterInit() {

    const openButton = document.querySelector(
        ".prd-mobile-filter-button-top"
    );

    const closeButton = document.querySelector(
        ".prd-filter-close"
    );

    const sidebar = document.querySelector(
        ".prd-sidebar"
    );

    if (!openButton || !sidebar) return;

    openButton.addEventListener("click", function () {
        sidebar.classList.add("active");
    });

    if (closeButton) {

        closeButton.addEventListener("click", function () {
            sidebar.classList.remove("active");
        });

    }

}

/*--- Product Filter and Wishlist End ---*/

/*--- Product Listing Filter Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector("#prd-filter-sidebar");
    const openButton = document.querySelector(".prd-mobile-filter-button");
    const closeButton = document.querySelector("#prd-filter-close");
    const resetButton = document.querySelector("#prd-filter-reset");
    const cards = [...document.querySelectorAll(".prd-product-card")];
    const noProducts = document.querySelector("#prd-no-products");
    const grid = document.querySelector("#prd-products-grid");
    const pagination = document.querySelector("#prd-pagination");
    const minInput = document.querySelector("#prd-price-min");
    const maxInput = document.querySelector("#prd-price-max");
    const applyPriceButton = document.querySelector("#prd-price-apply");
    const sortSelect = document.querySelector(".prd-sort-select");
    const itemsSelect = document.querySelector(".prd-items-select");
    if (!cards.length) return; let filters = { brand: [], rating: [], size: [], memory: [], condition: [], color: [], minPrice: 5, maxPrice: 5000 };
    let currentPage = 1; let itemsPerPage = 24; const getSelected = function (type) { return filters[type] || []; };
    const cardMatches = function (card) {
        const brand = card.dataset.brand || "";
        const price = Number(card.dataset.price || 0); const rating = Number(card.dataset.rating || 0);
        const size = card.dataset.size || ""; const color = card.dataset.color || "";
        const memory = card.dataset.memory || ""; const condition = card.dataset.condition || "";
        if (price < filters.minPrice || price > filters.maxPrice) return false;
        if (filters.brand.length && !filters.brand.includes(brand)) return false;
        if (filters.rating.length && !filters.rating.some(function (item) { return rating >= Number(item); })) return false;
        if (filters.size.length && !filters.size.includes(size)) return false; if (filters.memory.length && !filters.memory.includes(memory)) return false;
        if (filters.condition.length && !filters.condition.includes(condition)) return false; if (filters.color.length && !filters.color.includes(color)) return false; return true;
    };
    const getFilteredCards = function () { return cards.filter(cardMatches); };
    const sortCards = function (list) {
        const mode = sortSelect ? sortSelect.value : "default";
        return list.sort(function (a, b) {
            const priceA = Number(a.dataset.price || 0);
            const priceB = Number(b.dataset.price || 0); if (mode === "price-low") return priceA - priceB;
            if (mode === "price-high") return priceB - priceA; if (mode === "rating") return Number(b.dataset.rating || 0) - Number(a.dataset.rating || 0); return 0;
        });
    };
const renderProducts = function () {
        let filtered = sortCards(getFilteredCards());
        const total = filtered.length; cards.forEach(function (card) { card.style.display = "none"; }); const start = (currentPage - 1) * itemsPerPage;
        const visible = filtered.slice(start, start + itemsPerPage); visible.forEach(function (card) { card.style.display = ""; });
        if (noProducts) noProducts.style.display = total ? "none" : "block"; renderPagination(total);
    };
    const readFilters = function () {
        document.querySelectorAll(".prd-filter-check input").forEach(function (input) {
            const type = input.dataset.filterType;
            if (!filters[type]) filters[type] = [];
            if (input.checked) { if (!filters[type].includes(input.value)) filters[type].push(input.value); } else { filters[type] = filters[type].filter(function (value) { return value !== input.value; }); }
        });
        filters.minPrice = Number(minInput && minInput.value || 5); filters.maxPrice = Number(maxInput && maxInput.value || 5000);
    };
    document.querySelectorAll(".prd-filter-check input").forEach(function (input) {
        input.addEventListener("change", function () {
            readFilters();
            currentPage = 1; renderProducts();
        });
    });
    document.querySelectorAll(".prd-color-option").forEach(function (button) { button.addEventListener("click", function () { const value = button.dataset.color; button.classList.toggle("active"); if (button.classList.contains("active")) { filters.color = filters.color.filter(function (item) { return item !== value; }); filters.color.push(value); } else { filters.color = filters.color.filter(function (item) { return item !== value; }); } currentPage = 1; renderProducts(); }); }); if (applyPriceButton) applyPriceButton.addEventListener("click", function () { readFilters(); currentPage = 1; renderProducts(); }); if (sortSelect) sortSelect.addEventListener("change", function () { currentPage = 1; renderProducts(); }); if (itemsSelect) itemsSelect.addEventListener("change", function () { itemsPerPage = Number(itemsSelect.value) || 24; currentPage = 1; renderProducts(); }); if (resetButton) resetButton.addEventListener("click", function () { filters = { brand: [], rating: [], size: [], memory: [], condition: [], color: [], minPrice: 5, maxPrice: 5000 }; document.querySelectorAll(".prd-filter-check input").forEach(function (input) { input.checked = false; }); document.querySelectorAll(".prd-color-option").forEach(function (button) { button.classList.remove("active"); }); if (minInput) minInput.value = 5; if (maxInput) maxInput.value = 5000; currentPage = 1; renderProducts(); }); if (openButton && sidebar) openButton.addEventListener("click", function () { sidebar.classList.add("active"); document.body.classList.add("prd-filter-open"); }); if (closeButton && sidebar) closeButton.addEventListener("click", function () { sidebar.classList.remove("active"); document.body.classList.remove("prd-filter-open"); }); window.addEventListener("resize", function () { if (window.innerWidth > 767 && sidebar) { sidebar.classList.remove("active"); document.body.classList.remove("prd-filter-open"); } }); document.querySelectorAll(".prd-wishlist-btn").forEach(function (button) { button.addEventListener("click", function (event) { event.preventDefault(); event.stopPropagation(); const icon = button.querySelector("i"); button.classList.toggle("active"); if (button.classList.contains("active")) { icon.classList.remove("bi-heart"); icon.classList.add("bi-heart-fill"); button.setAttribute("aria-label", "Remove from wishlist"); } else { icon.classList.remove("bi-heart-fill"); icon.classList.add("bi-heart"); button.setAttribute("aria-label", "Add to wishlist"); } }); }); renderProducts();
});
/*--- Product Listing Filter Section End ---*/

/*--- Initialize Product Section ---*/
document.addEventListener(
    "DOMContentLoaded",
    function () {

        prdProductFilterInit();
        prdWishlistInit();
        prdMobileFilterInit();

    }
);

document.addEventListener("DOMContentLoaded", function () {

    const paginationButtons = document.querySelectorAll(
        ".prd-pagination button:not(.active)"
    );

    paginationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "404.html";

        });

    });

});

/* ==========================================
   PRODUCT PAGE REVEAL ANIMATION
========================================== */

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

/* =========================================
   PRODUCT ITEMS PER PAGE
========================================= */

const productItemButtons = document.querySelectorAll(
    ".prd-shop-item-btn"
);

productItemButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        productItemButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const itemsPerPage = this.textContent.trim();

        console.log("Items per page:", itemsPerPage);

        // Add your product pagination/filter logic here
    });

});