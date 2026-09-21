document.addEventListener("DOMContentLoaded", function () {

    const loggedInEmail =
        localStorage.getItem("loggedInEmail") ||
        localStorage.getItem("registeredEmail") ||
        "user@example.com";

    const clientName =
        localStorage.getItem("profileName") ||
        localStorage.getItem("registeredName") ||
        "Client";


    const topbarEmail = document.getElementById("topbarEmail");
    const sidebarEmail = document.getElementById("sidebarEmail");

    const overviewName =
        document.getElementById("clientOverviewName");

    const overviewEmail =
        document.getElementById("clientOverviewEmail");


    if (topbarEmail) {
        topbarEmail.textContent = loggedInEmail;
    }

    if (sidebarEmail) {
        sidebarEmail.textContent = loggedInEmail;
    }

    if (overviewName) {
        overviewName.textContent = clientName;
    }

    if (overviewEmail) {
        overviewEmail.textContent = loggedInEmail;
    }


    // Dashboard title
    const dashboardTitle =
        document.getElementById("dashboardTitle");

    if (dashboardTitle) {
        dashboardTitle.textContent = "Dashboard";
    }

});