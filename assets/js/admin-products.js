document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================= */

    const searchInput = document.getElementById("productSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const tableBody = document.getElementById("productsTableBody");
    const emptyState = document.getElementById("emptyProductState");

    if (!searchInput || !categoryFilter || !tableBody) {
        console.error("Product filter elements are missing.");
        return;
    }


    /* =========================================
       FILTER PRODUCTS
    ========================================= */

    function filterProducts() {

        const searchText = searchInput.value
            .trim()
            .toLowerCase();

        const selectedCategory = categoryFilter.value
            .trim()
            .toLowerCase();

        const rows = tableBody.querySelectorAll("tr");

        let visibleProducts = 0;


        rows.forEach(function (row) {

            const productName = row
                .querySelector("strong")
                ?.textContent
                .trim()
                .toLowerCase() || "";

            const productCategory = row
                .getAttribute("data-category")
                ?.trim()
                .toLowerCase() || "";

            const rowText = row.textContent.toLowerCase();


            /* Search condition */
            const matchesSearch =
                rowText.includes(searchText) ||
                productName.includes(searchText) ||
                productCategory.includes(searchText);


            /* Category condition */
            const matchesCategory =
                selectedCategory === "all" ||
                productCategory === selectedCategory;


            /* Final result */
            if (matchesSearch && matchesCategory) {

                row.style.display = "";
                visibleProducts++;

            } else {

                row.style.display = "none";

            }

        });


        /* Empty state */
        if (emptyState) {

            if (visibleProducts === 0) {
                emptyState.classList.remove("d-none");
            } else {
                emptyState.classList.add("d-none");
            }

        }

    }


    /* =========================================
       SEARCH EVENT
    ========================================= */

    searchInput.addEventListener("input", function () {
        filterProducts();
    });


    /* =========================================
       CATEGORY EVENT
    ========================================= */

    categoryFilter.addEventListener("change", function () {
        filterProducts();
    });


    /* =========================================
       INITIAL FILTER
    ========================================= */

    filterProducts();

});

document.addEventListener("DOMContentLoaded", function () {

    const actionButtons = document.querySelectorAll(".es-action-btn ,.es-primary-btn");

    actionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "404.html";

        });

    });

});