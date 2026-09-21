/*--- Navbar ---*/
function esNavbarInit() {
    const navbar = document.querySelector("#es-navbar");
    const menu = document.querySelector(".es-navbar-mobile-menu");
    const toggle = document.querySelector(".es-navbar-mobile-toggle");
    const close = document.querySelector(".es-navbar-mobile-close");
    const backdrop = document.querySelector(".es-navbar-backdrop");
    const links = document.querySelectorAll(".es-navbar-mobile-link");
    const categoryWrap = document.querySelector(".es-navbar-category-wrap");
    const categoryToggle = document.querySelector("#es-category-toggle");
    if (!navbar) return;
    const openMenu = function () {
        if (menu) menu.classList.add("active");
        document.body.classList.add("es-navbar-menu-open");
    };
    const closeMenu = function () {
        if (menu) menu.classList.remove("active");
        document.body.classList.remove("es-navbar-menu-open");
    };
    if (toggle) toggle.addEventListener("click", openMenu);
    if (close) close.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);
    links.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });
    if (categoryToggle && categoryWrap) {
        categoryToggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            categoryWrap.classList.toggle("active");
        });
        document.addEventListener("click", function (event) {
            if (!categoryWrap.contains(event.target) && event.target !== categoryToggle) {
                categoryWrap.classList.remove("active");
            }
        });
    }
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            if (categoryWrap) categoryWrap.classList.remove("active");
        }
    });
    window.addEventListener("scroll", function () {
        if (window.scrollY > 10) {
            navbar.classList.add("es-navbar-scrolled");
        } else {
            navbar.classList.remove("es-navbar-scrolled");
        }
    }, { passive: true });
}
/*--- Navbar Active Link ---*/
function esNavbarActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".es-navbar-menu-link, .es-navbar-mobile-link");
    navLinks.forEach(function (link) {
        const href = link.getAttribute("href");
        if (!href) return;
        const linkPage = href.split("/").pop().split("?")[0] || "index.html";
        link.classList.toggle("active", linkPage === currentPage);
    });
}

/*--- Component Loader ---*/
document.addEventListener("esComponentLoaded", function (event) {
    if (event.detail && event.detail.component === "navbar") {
        esNavbarInit();
        esNavbarActiveLink();
    }
});
/*--- Force Enable Body Scroll ---*/
document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.remove("es-navbar-menu-open");
});