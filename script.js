// Start Temaväxling
// Hämtar knappen med id="theme-toggle" från HTML-dokumentet.
const themeButton = document.querySelector("#theme-toggle");

// Funktionen körs när besökaren klickar på temaknappen.
function toggleTheme() {
    // Lägger till dark-theme om klassen saknas, annars tas den bort.
    // toggle returnerar true om klassen finns efter ändringen.
    const isDark = document.body.classList.toggle("dark-theme");

    // Knapptexten visar vilket tema besökaren kan byta till.
    if (isDark) {
        themeButton.textContent = "Ljust tema";
    } else {
        themeButton.textContent = "Mörkt tema";
    }
}

// Kopplar ett klick på knappen till funktionen toggleTheme.
// Utan parenteser här körs funktionen först när klicket sker.
themeButton.addEventListener("click", toggleTheme);
// Slut Temaväxling


// Start Kontaktformulär
// Hämtar formuläret och platsen där återkoppling ska visas.
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector("#form-status");

// Söker efter skicka-knappen inuti formuläret.
const submitButton = contactForm.querySelector('button[type="submit"]');

// async gör att funktionen kan använda await för att invänta
// svaret från servern utan att låsa resten av sidan.
async function sendMessage(event) {
    // Stoppar formulärets vanliga skickande, som skulle lämna sidan.
    event.preventDefault();

    // Förhindrar fler klick medan meddelandet skickas.
    submitButton.disabled = true;
    submitButton.textContent = "Skickar...";

    // Tar bort eventuell återkoppling från ett tidigare försök.
    formStatus.textContent = "";

    // try innehåller det vi försöker utföra.
    // Om ett fel kastas går körningen vidare till catch.
    try {
        // Skickar uppgifterna till adressen i formulärets action.
        // FormData samlar fältens namn och deras ifyllda värden.
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                // Ber servern att svara i JSON-format.
                Accept: "application/json"
            }
        });

        // response.ok är true vid en HTTP-status mellan 200 och 299.
        if (response.ok) {
            // Återställer fälten och visar att meddelandet skickats.
            contactForm.reset();
            formStatus.textContent = "Tack! Ditt meddelande har skickats.";
        } else {
            // Servern svarade, men skickandet lyckades inte.
            // Fältens innehåll behålls så att besökaren kan försöka igen.
            formStatus.textContent =
                "Meddelandet kunde inte skickas. Försök igen.";
        }
    } catch (error) {
        // Hanterar exempelvis ett nätverksfel som gör att fetch misslyckas.
        formStatus.textContent =
            "Det gick inte att ansluta. Kontrollera din internetanslutning och försök igen.";
    } finally {
        // Återaktiverar knappen när försöket är avslutat,
        // oavsett om meddelandet skickades eller ett fel uppstod.
        submitButton.disabled = false;
        submitButton.textContent = "Skicka meddelande";
    }
}

// Lyssnar på formulärets submit-händelse.
// Det fungerar både med skicka-knappen och när formuläret
// skickas med tangentbordet. Webbläsaren kontrollerar först
// bland annat required-fälten och mejladressens format.
contactForm.addEventListener("submit", sendMessage);
// Slut Kontaktformulär


// Start Bilddialog
// Hämtar dialogen, dess innehållsyta och stängknappen.
const imageDialog = document.querySelector("#image-dialog");
const dialogContent = document.querySelector("#image-dialog-content");
const closeImageDialog = document.querySelector("#close-image-dialog");

// Hämtar alla knappar som öppnar en kompetensbild.
const skillImageButtons = document.querySelectorAll(".skill-image-button");

function openSkillImage(event) {
    // currentTarget är knappen som händelselyssnaren sitter på,
    // även om besökaren klickade på bilden inuti knappen.
    const button = event.currentTarget;

    // Hämtar knappens bild eller AI-symbol.
    const image = button.querySelector(".skill-icon");

    // Skapar en kopia så att originalet blir kvar i kortet.
    // true betyder att även elementets innehåll kopieras,
    // exempelvis emojin inuti AI-symbolens span.
    const imageCopy = image.cloneNode(true);

    // Ersätter dialogens tidigare innehåll med den nya kopian.
    dialogContent.replaceChildren(imageCopy);

    // Öppnar dialogen ovanpå sidan.
    // Resten av sidan kan inte användas förrän dialogen stängs.
    imageDialog.showModal();
}

// Går igenom knapparna och kopplar varje knapp till samma funktion.
skillImageButtons.forEach(function (button) {
    button.addEventListener("click", openSkillImage);
});

// Stänger dialogen när stängknappen används.
closeImageDialog.addEventListener("click", function () {
    imageDialog.close();
});

// Escape hanteras automatiskt av webbläsarens dialogfunktion.
// Slut Bilddialog

// Start Mobilmeny och sidhuvudets höjd

// Hämtar menyknappen, navigationen och sidhuvudet.
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");
const siteHeader = document.querySelector("header");

// Bevakar samma breddgräns som mobilmenyn använder i CSS.
const mobileView = window.matchMedia("(max-width: 700px)");

// Lägger klassen js på html-elementet.
// CSS använder klassen för att aktivera den hopfällbara mobilmenyn.
document.documentElement.classList.add("js");


// Start Mätning av sidhuvudets höjd

function updateHeaderHeight() {
    // När mobilmenyn är öppen blir sidhuvudet högre.
    // Vi behåller då det tidigare värdet för den stängda menyn.
    if (mainNav.classList.contains("is-open")) {
        return;
    }

    // Mäter sidhuvudets aktuella höjd i pixlar.
    const height = siteHeader.getBoundingClientRect().height;

    // Uppdaterar CSS-variabeln som används för avsnittens höjd
    // och avståndet vid hopp via menylänkar.
    // `${height}px` skapar exempelvis texten "77.2px".
    document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
    );
}

// Kör mätningen när sidhuvudets storlek ändras,
// exempelvis när innehållet behöver byta rad.
const headerObserver = new ResizeObserver(updateHeaderHeight);
headerObserver.observe(siteHeader);

// Mäter också direkt när den här koden körs.
updateHeaderHeight();

// Slut Mätning av sidhuvudets höjd


// Start Öppna och stänga mobilmenyn

function closeMenu() {
    // Tar bort klassen som gör mobilmenyn synlig.
    mainNav.classList.remove("is-open");

    // Berättar för hjälpmedel att menyn är stängd.
    menuToggle.setAttribute("aria-expanded", "false");

    // Mäter sidhuvudet igen när menyn har stängts.
    updateHeaderHeight();
}

menuToggle.addEventListener("click", function () {
    // Växlar mellan öppen och stängd meny.
    // isOpen blir true om klassen finns efter ändringen.
    const isOpen = mainNav.classList.toggle("is-open");

    // Omvandlar true eller false till text för HTML-attributet.
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Stänger mobilmenyn när besökaren väljer en navigationslänk.
mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

// Stänger en öppen mobilmeny med Escape.
document.addEventListener("keydown", function (event) {
    // Båda villkoren måste vara uppfyllda:
    // Escape trycktes ned OCH menyn är öppen.
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
        closeMenu();

        // Flyttar tillbaka tangentbordsfokus till menyknappen.
        menuToggle.focus();
    }
});

// Återställer menyn när fönstret passerar gränsen 700px,
// oavsett om det blir bredare eller smalare.
mobileView.addEventListener("change", closeMenu);

// Slut Öppna och stänga mobilmenyn

// Slut Mobilmeny och sidhuvudets höjd