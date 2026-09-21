/*--- Components ---*/
document.addEventListener("DOMContentLoaded", function () {
    const componentElements = document.querySelectorAll("[data-component]");
    if (!componentElements.length) return;
    componentElements.forEach(function (element) {
        const component = element.getAttribute("data-component");
        if (!component) return;
        fetch("assets/components/" + component + ".html").then(function (response) {
            if (!response.ok) throw new Error("Failed to load " + component + " component");
            return response.text();
        }).then(function (html) {
            element.innerHTML = html;
            element.classList.add("es-component-loaded");
            document.dispatchEvent(new CustomEvent("esComponentLoaded", { detail: { component: component, element: element } }));
        }).catch(function (error) { console.error("Component Error:", error); });
    });
});