document.addEventListener("DOMContentLoaded", function () {

    const orderSearch = document.getElementById("orderSearch");
    const orderStatusFilter = document.getElementById("orderStatusFilter");
    const orderDateFilter = document.getElementById("orderDateFilter");

    const ordersTableBody = document.getElementById("ordersTableBody");
    const ordersEmptyState = document.getElementById("ordersEmptyState");
    const orderCount = document.getElementById("orderCount");


    if (!ordersTableBody) {
        return;
    }


    const orderRows = Array.from(
        ordersTableBody.querySelectorAll("tr")
    );


    /* ==========================================
       UPDATE ORDER STATISTICS
    ========================================== */

    function updateOrderStatistics() {

        let pending = 0;
        let delivered = 0;
        let cancelled = 0;

        orderRows.forEach((row) => {

            const status = row.dataset.status;

            if (status === "pending") {
                pending++;
            }

            if (status === "delivered") {
                delivered++;
            }

            if (status === "cancelled") {
                cancelled++;
            }

        });


        const totalOrders = document.getElementById("totalOrders");
        const pendingOrders = document.getElementById("pendingOrders");
        const deliveredOrders = document.getElementById("deliveredOrders");
        const cancelledOrders = document.getElementById("cancelledOrders");


        if (totalOrders) {
            totalOrders.textContent = orderRows.length;
        }

        if (pendingOrders) {
            pendingOrders.textContent = pending;
        }

        if (deliveredOrders) {
            deliveredOrders.textContent = delivered;
        }

        if (cancelledOrders) {
            cancelledOrders.textContent = cancelled;
        }

    }


    /* ==========================================
       SEARCH AND FILTER
    ========================================== */

    function filterOrders() {

        const searchValue =
            orderSearch.value.toLowerCase().trim();

        const statusValue =
            orderStatusFilter.value;

        const dateValue =
            orderDateFilter.value;

        let visibleCount = 0;


        orderRows.forEach((row) => {

            const rowText =
                row.textContent.toLowerCase();

            const rowStatus =
                row.dataset.status;

            const rowDate =
                row.dataset.date;


            const matchesSearch =
                rowText.includes(searchValue);

            const matchesStatus =
                statusValue === "all" ||
                rowStatus === statusValue;

            const matchesDate =
                dateValue === "all" ||
                rowDate.startsWith(dateValue);


            const shouldShow =
                matchesSearch &&
                matchesStatus &&
                matchesDate;


            if (shouldShow) {

                row.style.display = "";
                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        // Update count
        orderCount.textContent =
            `${visibleCount} Orders`;


        // Empty state
        if (visibleCount === 0) {

            ordersEmptyState.style.display = "block";

        } else {

            ordersEmptyState.style.display = "none";

        }

    }


    /* ==========================================
       EVENT LISTENERS
    ========================================== */

    orderSearch.addEventListener("input", filterOrders);

    orderStatusFilter.addEventListener("change", filterOrders);

    orderDateFilter.addEventListener("change", filterOrders);


    /* ==========================================
       INITIALIZE
    ========================================== */

    updateOrderStatistics();

    filterOrders();

});