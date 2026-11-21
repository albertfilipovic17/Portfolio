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