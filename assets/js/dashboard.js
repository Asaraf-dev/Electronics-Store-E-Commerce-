/* =========================================
   DASHBOARD FUNCTIONALITY
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sidebar = document.getElementById("esSidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const logoutBtn = document.getElementById("logoutBtn");

    const topbarEmail = document.getElementById("topbarEmail");
    const sidebarEmail = document.getElementById("sidebarEmail");

    /* =========================================
       GET LOGIN INFORMATION
    ========================================= */

    const loggedInEmail =
        localStorage.getItem("loggedInEmail") ||
        localStorage.getItem("profileEmail") ||
        "user@example.com";

    if (topbarEmail) {
        topbarEmail.textContent = loggedInEmail;
    }

    if (sidebarEmail) {
        sidebarEmail.textContent = loggedInEmail;
    }

    /* =========================================
       OPEN SIDEBAR
    ========================================= */

    function openSidebar() {

        sidebar.classList.add("show");
        sidebarOverlay.classList.add("show");
        document.body.style.overflow = "hidden";

    }

    /* =========================================
       CLOSE SIDEBAR
    ========================================= */

    function closeSidebar() {

        sidebar.classList.remove("show");
        sidebarOverlay.classList.remove("show");
        document.body.style.overflow = "";

    }

    /* =========================================
       TOGGLE SIDEBAR
    ========================================= */

    if (sidebarToggle) {

        sidebarToggle.addEventListener("click", function () {

            if (sidebar.classList.contains("show")) {
                closeSidebar();
            } else {
                openSidebar();
            }

        });

    }

    /* =========================================
       CLOSE EVENTS
    ========================================= */

    if (sidebarClose) {
        sidebarClose.addEventListener("click", closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }

    /* =========================================
       CLOSE SIDEBAR AFTER LINK CLICK
    ========================================= */

    const sidebarLinks = document.querySelectorAll(
        ".es-sidebar-link:not(.es-logout-link)"
    );

    sidebarLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 991.98) {
                closeSidebar();
            }

        });

    });

    /* =========================================
       LOGOUT
    ========================================= */

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function (event) {

            event.preventDefault();

            localStorage.removeItem("loggedInEmail");
            localStorage.removeItem("loggedInRole");
            localStorage.removeItem("isLoggedIn");

            window.location.href = "login.html";

        });

    }

    /* =========================================
       WINDOW RESIZE
    ========================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 991.98) {
            closeSidebar();
        }

    });

});