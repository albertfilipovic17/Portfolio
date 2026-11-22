const themeButton = document.querySelector("#theme-toggle");

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-theme");

    if (isDark) {
        themeButton.textContent = "Ljust tema";
    } else {
        themeButton.textContent = "Mörkt tema";
    }
}

themeButton.addEventListener("click", toggleTheme);


// Contact form submission
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = contactForm.querySelector('button[type="submit"]');

async function sendMessage(event) {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Skickar...";
    formStatus.textContent = "";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            contactForm.reset();
            formStatus.textContent = "Tack! Ditt meddelande har skickats.";
        } else {
            formStatus.textContent =
                "Meddelandet kunde inte skickas. Försök igen.";
        }
    } catch (error) {
        formStatus.textContent =
            "Det gick inte att ansluta. Kontrollera din internetanslutning och försök igen.";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Skicka meddelande";
    }
}

contactForm.addEventListener("submit", sendMessage);

//Kompetensbilder dialog
const imageDialog = document.querySelector("#image-dialog");
const dialogContent = document.querySelector("#image-dialog-content");
const closeImageDialog = document.querySelector("#close-image-dialog");
const skillImageButtons = document.querySelectorAll(".skill-image-button");

function openSkillImage(event) {
    const button = event.currentTarget;
    const image = button.querySelector(".skill-icon");
    const imageCopy = image.cloneNode(true);

    dialogContent.replaceChildren(imageCopy);
    imageDialog.showModal();
}

skillImageButtons.forEach(function (button) {
    button.addEventListener("click", openSkillImage);
});

closeImageDialog.addEventListener("click", function () {
    imageDialog.close();
});

//
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");
const mobileView = window.matchMedia("(max-width: 700px)");

document.documentElement.classList.add("js");

//Dynamsik höjd på header för att kunna använda scroll-margin-top på sektioner
const siteHeader = document.querySelector("header");

function updateHeaderHeight() {
    if (mainNav.classList.contains("is-open")) {
        return;
    }

    const height = siteHeader.getBoundingClientRect().height;

    document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
    );
}

const headerObserver = new ResizeObserver(updateHeaderHeight);

headerObserver.observe(siteHeader);
updateHeaderHeight();

// Hantera menyöppning och stängning
function closeMenu() {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    updateHeaderHeight();
}

menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
        closeMenu();
        menuToggle.focus();
    }
});

mobileView.addEventListener("change", closeMenu);