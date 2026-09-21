/* =========================================
   ADMIN DASHBOARD FUNCTIONALITY
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       GET LOGIN DETAILS
    ========================================= */

    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const loggedInRole = localStorage.getItem("loggedInRole");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    /*
     * Protect Admin Dashboard
     */

    if (
        isLoggedIn !== "true" ||
        loggedInRole !== "admin"
    ) {
        window.location.href = "login.html";
        return;
    }


    /* =========================================
       DISPLAY CURRENT DATE
    ========================================= */

    const dateButton = document.querySelector(".es-overview-date");

    if (dateButton) {

        const today = new Date();

        const formattedDate = today.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        dateButton.innerHTML = `
            <i class="bi bi-calendar3"></i>
            ${formattedDate}
        `;

    }


    /* =========================================
       SALES CHART
    ========================================= */

    const chartPlaceholder = document.querySelector(
        ".es-chart-placeholder"
    );

    if (chartPlaceholder) {

        const salesData = [
            4200,
            6500,
            5100,
            7800,
            6200,
            9400,
            8200,
            10500,
            8900,
            11200,
            9800,
            12500
        ];

        const chartMonths = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        const maxSales = Math.max(...salesData);

        chartPlaceholder.innerHTML = "";

        const chartWrapper = document.createElement("div");

        chartWrapper.className = "es-chart-bars";

        salesData.forEach(function (amount, index) {

            const barWrapper = document.createElement("div");

            barWrapper.className = "es-chart-bar-wrapper";

            const bar = document.createElement("div");

            bar.className = "es-chart-bar";

            bar.style.height =
                `${(amount / maxSales) * 100}%`;

            bar.title = `$${amount.toLocaleString()}`;

            const month = document.createElement("small");

            month.textContent = chartMonths[index];

            barWrapper.appendChild(bar);
            barWrapper.appendChild(month);

            chartWrapper.appendChild(barWrapper);

        });

        chartPlaceholder.appendChild(chartWrapper);

    }


    /* =========================================
       YEAR SELECT
    ========================================= */

    const yearSelect = document.querySelector(
        ".es-overview-select"
    );

    if (yearSelect) {

        yearSelect.addEventListener("change", function () {

            console.log(
                "Selected year:",
                this.value
            );

            /*
             * Connect your backend API here
             * to load sales for the selected year.
             */

        });

    }


    /* =========================================
       VIEW ALL ORDERS
    ========================================= */

    const viewAllLink = document.querySelector(
        ".es-view-all-link"
    );

    if (viewAllLink) {

        viewAllLink.addEventListener("click", function () {

            window.location.href = "admin-bookings.html";

        });

    }

});

document.addEventListener("DOMContentLoaded", function () {

    const chartCanvas = document.getElementById("salesChart");
    const yearSelect = document.getElementById("salesYear");

    if (!chartCanvas || typeof Chart === "undefined") {
        return;
    }

    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const salesData = {
        2026: [4200, 5800, 4600, 7200, 6800, 8500, 7900, 9200, 8700, 10400, 9800, 12000],
        2025: [3500, 4200, 3900, 5600, 6100, 6400, 7200, 6800, 7500, 8200, 7900, 9600],
        2024: [2800, 3600, 3200, 4500, 4900, 5300, 6100, 5800, 6500, 7100, 6800, 8000]
    };

    let salesChart;

    function renderSalesChart(year) {

        if (salesChart) {
            salesChart.destroy();
        }

        salesChart = new Chart(chartCanvas, {

            type: "line",

            data: {
                labels: months,

                datasets: [{
                    label: "Monthly Sales",
                    data: salesData[year],

                    borderColor: "#01A49E",
                    backgroundColor: "rgba(1, 164, 158, 0.12)",

                    borderWidth: 3,
                    pointRadius: 4,
                    pointHoverRadius: 6,

                    pointBackgroundColor: "#01A49E",
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2,

                    tension: 0.4,
                    fill: true
                }]
            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    },

                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return " Sales: $" +
                                    context.parsed.y.toLocaleString("en-US");
                            }
                        }
                    }
                },

                scales: {

                    x: {
                        grid: {
                            display: false
                        },

                        ticks: {
                            color: "#8492A0"
                        }
                    },

                    y: {

                        beginAtZero: true,

                        ticks: {
                            color: "#8492A0",

                            callback: function (value) {
                                return "$" + (value / 1000) + "K";
                            }
                        },

                        grid: {
                            color: "#EDF1F4"
                        }
                    }
                }
            }
        });

    }

    renderSalesChart(yearSelect.value);

    yearSelect.addEventListener("change", function () {
        renderSalesChart(this.value);
    });

});