/* =========================================
   ADMIN BOOKINGS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const bookingTableBody = document.getElementById("bookingTableBody");
    const bookingSearch = document.getElementById("bookingSearch");
    const bookingStatusFilter = document.getElementById("bookingStatusFilter");
    const emptyBookings = document.getElementById("emptyBookings");

    const totalBookings = document.getElementById("totalBookings");
    const pendingBookings = document.getElementById("pendingBookings");
    const completedBookings = document.getElementById("completedBookings");
    const cancelledBookings = document.getElementById("cancelledBookings");

    const exportBookingsBtn = document.getElementById("exportBookingsBtn");

    if (!bookingTableBody) return;

    /* =========================================
       SAMPLE BOOKINGS
    ========================================= */

    const bookings = [
        {
            id: "ES1001",
            customer: "Mohammed Asaraf",
            product: "Wireless Headphones",
            date: "2026-09-20",
            amount: 2499,
            status: "Pending"
        },
        {
            id: "ES1002",
            customer: "Rahul Kumar",
            product: "Gaming Keyboard",
            date: "2026-09-19",
            amount: 1899,
            status: "Completed"
        },
        {
            id: "ES1003",
            customer: "Arun Kumar",
            product: "Smart Watch",
            date: "2026-09-18",
            amount: 3499,
            status: "Completed"
        },
        {
            id: "ES1004",
            customer: "Priya S",
            product: "Bluetooth Speaker",
            date: "2026-09-17",
            amount: 1599,
            status: "Cancelled"
        },
        {
            id: "ES1005",
            customer: "Sanjay R",
            product: "Laptop Stand",
            date: "2026-09-16",
            amount: 999,
            status: "Pending"
        }
    ];

    /* =========================================
       FORMAT CURRENCY
    ========================================= */

    function formatCurrency(amount) {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);

    }

    /* =========================================
       UPDATE STATISTICS
    ========================================= */

    function updateStatistics() {

        totalBookings.textContent = bookings.length;

        pendingBookings.textContent = bookings.filter(
            booking => booking.status === "Pending"
        ).length;

        completedBookings.textContent = bookings.filter(
            booking => booking.status === "Completed"
        ).length;

        cancelledBookings.textContent = bookings.filter(
            booking => booking.status === "Cancelled"
        ).length;

    }

    /* =========================================
       RENDER BOOKINGS
    ========================================= */

    function renderBookings() {

        const searchValue = bookingSearch.value
            .trim()
            .toLowerCase();

        const statusValue = bookingStatusFilter.value;

        const filteredBookings = bookings.filter(function (booking) {

            const matchesSearch =
                booking.id.toLowerCase().includes(searchValue) ||
                booking.customer.toLowerCase().includes(searchValue) ||
                booking.product.toLowerCase().includes(searchValue);

            const matchesStatus =
                statusValue === "all" ||
                booking.status === statusValue;

            return matchesSearch && matchesStatus;

        });

        bookingTableBody.innerHTML = "";

        if (filteredBookings.length === 0) {

            emptyBookings.hidden = false;

            return;

        }

        emptyBookings.hidden = true;

        filteredBookings.forEach(function (booking) {

            const row = document.createElement("tr");

            const statusClass = booking.status.toLowerCase();

            row.innerHTML = `
                <td>
                    <span class="es-booking-id">
                        #${booking.id}
                    </span>
                </td>

                <td>
                    <span class="es-booking-customer">
                        ${booking.customer}
                    </span>
                </td>

                <td>${booking.product}</td>

                <td>${booking.date}</td>

                <td>${formatCurrency(booking.amount)}</td>

                <td>
                    <span class="es-booking-status ${statusClass}">
                        ${booking.status}
                    </span>
                </td>

                <td>
                    <button
                        type="button"
                        class="es-booking-action"
                        data-booking-id="${booking.id}"
                        aria-label="View booking">

                        <i class="bi bi-eye"></i>

                    </button>
                </td>
            `;

            bookingTableBody.appendChild(row);

        });

    }

    /* =========================================
       SEARCH AND FILTER
    ========================================= */

    bookingSearch.addEventListener("input", renderBookings);

    bookingStatusFilter.addEventListener("change", renderBookings);

    /* =========================================
       VIEW BOOKING
    ========================================= */

    bookingTableBody.addEventListener("click", function (event) {

        const actionButton = event.target.closest(
            ".es-booking-action"
        );

        if (!actionButton) return;

        const bookingId = actionButton.dataset.bookingId;

        const booking = bookings.find(
            item => item.id === bookingId
        );

        if (!booking) return;

        alert(
            `Booking ID: ${booking.id}\n` +
            `Customer: ${booking.customer}\n` +
            `Product: ${booking.product}\n` +
            `Amount: ${formatCurrency(booking.amount)}\n` +
            `Status: ${booking.status}`
        );

    });

    /* =========================================
       EXPORT CSV
    ========================================= */

    exportBookingsBtn.addEventListener("click", function () {

        const headers = [
            "Booking ID",
            "Customer",
            "Product",
            "Date",
            "Amount",
            "Status"
        ];

        const rows = bookings.map(function (booking) {

            return [
                booking.id,
                booking.customer,
                booking.product,
                booking.date,
                booking.amount,
                booking.status
            ];

        });

        const csvContent = [
            headers,
            ...rows
        ]
            .map(row => row.join(","))
            .join("\n");

        const blob = new Blob(
            [csvContent],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "stackly-bookings.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    });

    /* =========================================
       INITIALIZE
    ========================================= */

    updateStatistics();
    renderBookings();

});