//Temaväxling
const themeButton = document.querySelector("#theme-toggle");        //hittar och hämtar temaknappen 

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-theme");    // växlar mellan ljust och mörkt tema

    if (isDark) {
        themeButton.textContent = "Ljust tema";
    } else {
        themeButton.textContent = "Mörkt tema";
    }
}
themeButton.addEventListener("click", toggleTheme);         //kopplar temaknappen till funktione så att den körs när besökaren klickar på knappen


// Kontaktformulär
const contactForm = document.querySelector(".contact-form");                // hittar kontaktformuläret
const formStatus = document.querySelector("#form-status");                  // hittar platsen där återkoppling ska visas
const submitButton = contactForm.querySelector('button[type="submit"]');    // hittar formulärets skicka-knapp

async function sendMessage(event) {                         //Körs när besökaren skickar formuläret
    event.preventDefault();                                 //hindrar att formuläret skickas på vanligt sätt, vilket skulle lämna sidan och ladda om den.

    submitButton.disabled = true;                           // inaktiverar knappen medan meddelandet skickas
    submitButton.textContent = "Skickar...";

    formStatus.textContent = "";                            // tömmer texten i återkopplingsområdet

    try {                                                   // försöker skicka meddelandet
        const response = await fetch(contactForm.action, {  // skickar formulärets data till servern
            method: "POST", 
            body: new FormData(contactForm),                // skapar ett FormData-objekt med formulärets fält och värden
            headers: { 
                Accept: "application/json"                  // ber om att servern ska svara med JSON
            }
        });

        if (response.ok) {
            contactForm.reset();                        // tömmer formulärets fält om meddelandet skickades och visar att det lyckades
            formStatus.textContent = "Tack! Ditt meddelande har skickats.";
        } else {
            formStatus.textContent =
                "Meddelandet kunde inte skickas. Försök igen.";
        }
    } catch (error) {
        formStatus.textContent =
            "Det gick inte att ansluta. Kontrollera din internetanslutning och försök igen.";
    } finally {
        submitButton.disabled = false;                  //återaktiverar nappen 
        submitButton.textContent = "Skicka meddelande";
    }
}
contactForm.addEventListener("submit", sendMessage);    // kopplar formuläret till funktionen som skickar meddelandet



// Bilddialog 
const imageDialog = document.querySelector("#image-dialog");                 // hämtar dialogen som visar kompetensbilder
const dialogContent = document.querySelector("#image-dialog-content");       // hämtar dialogens innehåll, där bilden ska visas
const closeImageDialog = document.querySelector("#close-image-dialog");      // hämtar dialogens stängknapp
const skillImageButtons = document.querySelectorAll(".skill-image-button");  // hämtar alla knappar som öppnar en kompetensbild

function openSkillImage(event) {
    const button = event.currentTarget;                 // hämtar knappen som besökaren klickade på
    const image = button.querySelector(".skill-icon");  // hämtar bilden som ska visas i dialogen
    const imageCopy = image.cloneNode(true);            // skapar en kopia av bilden

    dialogContent.replaceChildren(imageCopy);                // tar bort tidigare innehåll och lägger till den nya bilden

    imageDialog.showModal();                                // Öppnar dialogen ovanpå sidan. resten blir inaktiverat tills dialogen stängs.
}

skillImageButtons.forEach(function (button) {
    button.addEventListener("click", openSkillImage);       // Går igenom och kopplar varje knapp till funktionen som öppnar kompetensbilden.
});
closeImageDialog.addEventListener("click", function () {
    imageDialog.close();                                    // Stänger dialogen med stängknappen och återställer sidan till normalt läge.
});


// Mobilmeny och sidhuvudets höjd
const menuToggle = document.querySelector("#menu-toggle");  // hämtar knappen som öppnar/stänger mobilmenyn
const mainNav = document.querySelector("#main-nav");        // hämtar navigationen som innehåller menylänkarna
const siteHeader = document.querySelector("header");        // hämtar sidhuvudet.
const mobileView = window.matchMedia("(max-width: 700px)"); // Håller koll på om fönstret är smalare än 700px, samma som mobilmenyn använder i CSS.

document.documentElement.classList.add("js");               //lägger till klass js på html elementet, så att CSS kan aktivera mobilmenyn.

// Mätning av sidhuvudets höjd
function updateHeaderHeight() {

    if (mainNav.classList.contains("is-open")) {
        return;                                                 // Avbryter mätningen om menyn är öppen.
    }

    const height = siteHeader.getBoundingClientRect().height;   //hämtar sidhuvudets höjd i pixlar. 

    document.documentElement.style.setProperty(                 // uppdaterar CSS-variabeln 
        "--header-height", // 
        `${height}px` //
    );
}

const headerObserver = new ResizeObserver(updateHeaderHeight);  //Kör mätning när sidhuvudet ändrar storlek.
headerObserver.observe(siteHeader);                             //håller koll på vad som ska observeras 
updateHeaderHeight();                                           // Mäter sidhuvudets höjd direkt när sidan laddas.



// Öppna och stänga mobilmenyn
function closeMenu() {
    mainNav.classList.remove("is-open");                        // Tar bort klassen som gör mobilmenyn synlig.
    menuToggle.setAttribute("aria-expanded", "false");          // Visar att menyn är stängd. retunerar false till HTML-attributet.
    updateHeaderHeight();                                       // Mäter sidhuvudets höjd igen när menyn har stängts
}

menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("is-open");         // Gör så att menyn kan öppnas och stängas.
    menuToggle.setAttribute("aria-expanded", String(isOpen));   // Visar om menyn är öppen eller stängd. returnerar true eller false som text för HTML-attributet.
});

mainNav.querySelectorAll("a").forEach(function (link) {         // Går igenom alla länkar i menyn.
    link.addEventListener("click", closeMenu);                  // Kopplar varje länk till funktionen som stänger menyn.
});

document.addEventListener("keydown", function (event) {         // Lyssnar efter nedtryckta tangenter på hela sidan.

    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {  // Om Escape trycktes ned och menyn är öppen
        closeMenu();

        menuToggle.focus();                                                 //fokus på menyknappen efter stängning med esc
    }
});
mobileView.addEventListener("change", closeMenu); //Kopplar funktionen till media queryn som kontollerar om fönstret är smalare än 700px.