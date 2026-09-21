/*--- 404 Page ---*/
document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.querySelector(".es-404-button");
    if (!backButton) return;
    backButton.addEventListener("click", function (event) {
        if (window.history.length <= 1) {
            event.preventDefault();
            window.location.href = "index.html";
        }
    });
});