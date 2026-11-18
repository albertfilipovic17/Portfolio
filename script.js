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