/* =========================================
   STACKLY ELECTRONICS LOADER
========================================= */

const esLdrLoader = document.getElementById("esLdrLoader");
const esLdrMessage = document.getElementById("esLdrMessage");
const esLdrParticles = document.getElementById("esLdrParticles");

let esLdrMessageInterval = null;
let esLdrHideTimeout = null;
let esLdrMessageIndex = 0;

/* Loader Messages */

const esLdrMessages = [
    "Powering up your experience...",
    "Connecting your electronic world...",
    "Preparing the latest technology...",
    "Setting up your shopping experience...",
    "Almost ready to explore..."
];

/* Show Loader */

function esShowLoader() {
    if (!esLdrLoader) return;

    clearTimeout(esLdrHideTimeout);
    clearInterval(esLdrMessageInterval);

    esLdrLoader.style.display = "flex";
    esLdrLoader.classList.remove(
        "es-ldr-hidden",
        "es-ldr-exit"
    );

    esLdrMessageIndex = 0;

    if (esLdrMessage) {
        esLdrMessage.textContent = esLdrMessages[0];
        esLdrMessage.style.opacity = "1";
        esLdrMessage.style.transform = "translateY(0)";
    }

    esLdrMessageInterval = setInterval(() => {
        esLdrMessageIndex++;

        if (esLdrMessageIndex >= esLdrMessages.length) {
            esLdrMessageIndex = 0;
        }

        if (!esLdrMessage) return;

        esLdrMessage.style.opacity = "0";
        esLdrMessage.style.transform = "translateY(5px)";

        setTimeout(() => {
            if (!esLdrMessage) return;

            esLdrMessage.textContent =
                esLdrMessages[esLdrMessageIndex];

            esLdrMessage.style.opacity = "1";
            esLdrMessage.style.transform = "translateY(0)";
        }, 250);

    }, 1300);
}

/* Hide Loader */

function esHideLoader() {
    if (!esLdrLoader) return;

    clearTimeout(esLdrHideTimeout);

    esLdrHideTimeout = setTimeout(() => {
        clearInterval(esLdrMessageInterval);

        esLdrLoader.classList.add("es-ldr-exit");

        setTimeout(() => {
            if (!esLdrLoader) return;

            esLdrLoader.classList.add("es-ldr-hidden");
            esLdrLoader.style.display = "none";

        }, 750);

    }, 500);
}

/* Create Floating Particles */

function esCreateLoaderParticles() {
    if (!esLdrParticles) return;

    if (
        esLdrParticles.querySelector(".es-ldr-particle")
    ) {
        return;
    }

    for (let i = 0; i < 35; i++) {
        const esParticle = document.createElement("span");

        esParticle.className = "es-ldr-particle";

        esParticle.style.left =
            Math.random() * 100 + "%";

        esParticle.style.top =
            Math.random() * 100 + "%";

        const esParticleSize = 2 + Math.random() * 3;

        esParticle.style.width =
            esParticleSize + "px";

        esParticle.style.height =
            esParticleSize + "px";

        esParticle.style.animationDelay =
            Math.random() * 5 + "s";

        esParticle.style.animationDuration =
            4 + Math.random() * 5 + "s";

        esLdrParticles.appendChild(esParticle);
    }
}

/* Mouse Glow */

document.addEventListener("mousemove", (esLdrEvent) => {
    if (
        !esLdrLoader ||
        esLdrLoader.style.display === "none"
    ) {
        return;
    }

    esLdrLoader.style.setProperty(
        "--es-ldr-x",
        esLdrEvent.clientX + "px"
    );

    esLdrLoader.style.setProperty(
        "--es-ldr-y",
        esLdrEvent.clientY + "px"
    );
});

/* Initial Page Load */

document.addEventListener("DOMContentLoaded", () => {
    esCreateLoaderParticles();
    esShowLoader();
});

/* Window Loaded */

window.addEventListener("load", () => {
    esHideLoader();
});

/* Browser Back / Forward */

window.addEventListener("pageshow", (esLdrEvent) => {
    if (esLdrEvent.persisted) {
        if (esLdrLoader) {
            esLdrLoader.style.display = "flex";
        }

        esShowLoader();
        esHideLoader();
    }
});