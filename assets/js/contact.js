/*--- Contact Form Validation ---*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#con-ctt-form");
    const firstName = document.querySelector("#con-ctt-first-name");
    const lastName = document.querySelector("#con-ctt-last-name");
    const phone = document.querySelector("#con-ctt-phone");
    const popup = document.querySelector("#con-ctt-popup");
    const popupClose = document.querySelector("#con-ctt-popup-close");
    const popupButton = document.querySelector("#con-ctt-popup-button");
    const popupOverlay = popup ? popup.querySelector(".con-ctt-popup-overlay") : null;
    if (!form) return;
    const sanitizeName = function (input) {
        input.value = input.value.replace(/[^A-Za-z ]/g, "");
    };
    const sanitizePhone = function (input) {
        input.value = input.value.replace(/\D/g, "").slice(0, 10);
    };
    if (firstName) {
        firstName.addEventListener("input", function () { sanitizeName(firstName); });
        firstName.addEventListener("paste", function () { setTimeout(function () { sanitizeName(firstName); }, 0); });
    }
    if (lastName) {
        lastName.addEventListener("input", function () { sanitizeName(lastName); });
        lastName.addEventListener("paste", function () { setTimeout(function () { sanitizeName(lastName); }, 0); });
    }
    if (phone) {
        phone.addEventListener("input", function () { sanitizePhone(phone); });
        phone.addEventListener("paste", function () { setTimeout(function () { sanitizePhone(phone); }, 0); });
    }
    const closePopup = function () {
        if (!popup) return;
        popup.classList.remove("active");
        popup.setAttribute("aria-hidden", "true");
        document.body.classList.remove("con-ctt-popup-open");
    };
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sanitizeName(firstName);
        sanitizeName(lastName);
        sanitizePhone(phone);
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        if (popup) {
            popup.classList.add("active");
            popup.setAttribute("aria-hidden", "false");
            document.body.classList.add("con-ctt-popup-open");
        }
        form.reset();
    });
    if (popupClose) popupClose.addEventListener("click", closePopup);
    if (popupButton) popupButton.addEventListener("click", closePopup);
    if (popupOverlay) popupOverlay.addEventListener("click", closePopup);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && popup && popup.classList.contains("active")) closePopup();
    });
});
/*--- Contact Phone Validation ---*/
document.addEventListener("DOMContentLoaded", function () {
    const phone = document.querySelector("#con-ctt-phone");
    if (!phone) return;
    phone.addEventListener("keydown", function (event) {
        const allowedKeys = ["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "Home", "End"];
        if (allowedKeys.includes(event.key)) return;
        if (!/^\d$/.test(event.key)) event.preventDefault();
    });
});

/* CONTACT SCROLL REVEAL */

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
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
});