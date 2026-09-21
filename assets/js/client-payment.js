document.addEventListener("DOMContentLoaded", function () {

    const paymentSearch = document.getElementById("paymentSearch");
    const paymentStatusFilter =
        document.getElementById("paymentStatusFilter");

    const paymentMethodFilter =
        document.getElementById("paymentMethodFilter");

    const paymentsTableBody =
        document.getElementById("paymentsTableBody");

    const paymentsEmptyState =
        document.getElementById("paymentsEmptyState");

    const paymentCount =
        document.getElementById("paymentCount");


    if (!paymentsTableBody) {
        return;
    }


    const paymentRows = Array.from(
        paymentsTableBody.querySelectorAll("tr")
    );


    /* ==========================================
       UPDATE STATISTICS
    ========================================== */

    function updatePaymentStatistics() {

        let successful = 0;
        let pending = 0;
        let totalPaid = 0;

        paymentRows.forEach((row) => {

            const status = row.dataset.status;

            if (status === "successful") {
                successful++;
            }

            if (status === "pending") {
                pending++;
            }

            if (status === "successful") {

                const amountText =
                    row.cells[4].textContent;

                const amount =
                    Number(amountText.replace(/[₹,]/g, "").trim());

                if (!isNaN(amount)) {
                    totalPaid += amount;
                }

            }

        });


        document.getElementById("totalPayments").textContent =
            paymentRows.length;

        document.getElementById("successfulPayments").textContent =
            successful;

        document.getElementById("pendingPayments").textContent =
            pending;

        document.getElementById("totalPaid").textContent =
            `₹${totalPaid.toLocaleString("en-IN")}`;

    }


    /* ==========================================
       SEARCH AND FILTER
    ========================================== */

    function filterPayments() {

        const searchValue =
            paymentSearch.value.toLowerCase().trim();

        const statusValue =
            paymentStatusFilter.value;

        const methodValue =
            paymentMethodFilter.value;

        let visibleCount = 0;


        paymentRows.forEach((row) => {

            const rowText =
                row.textContent.toLowerCase();

            const rowStatus =
                row.dataset.status;

            const rowMethod =
                row.dataset.method;


            const matchesSearch =
                rowText.includes(searchValue);

            const matchesStatus =
                statusValue === "all" ||
                rowStatus === statusValue;

            const matchesMethod =
                methodValue === "all" ||
                rowMethod === methodValue;


            const shouldShow =
                matchesSearch &&
                matchesStatus &&
                matchesMethod;


            if (shouldShow) {

                row.style.display = "";
                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        paymentCount.textContent =
            `${visibleCount} Payments`;


        if (visibleCount === 0) {

            paymentsEmptyState.style.display = "block";

        } else {

            paymentsEmptyState.style.display = "none";

        }

    }


    /* ==========================================
       EVENT LISTENERS
    ========================================== */

    paymentSearch.addEventListener("input", filterPayments);

    paymentStatusFilter.addEventListener("change", filterPayments);

    paymentMethodFilter.addEventListener("change", filterPayments);


    /* ==========================================
       INITIALIZE
    ========================================== */

    updatePaymentStatistics();

    filterPayments();

});