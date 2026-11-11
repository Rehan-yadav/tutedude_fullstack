
// =====================================
// 1. MOBILE NAVIGATION
// =====================================

// Select hamburger button and navigation menu

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


// Check whether elements exist

if (menuButton && navLinks) {

    // Open or close navigation on button click

    menuButton.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        // Update accessibility attributes

        menuButton.setAttribute("aria-expanded", String(isOpen));

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });


    // Close menu when a navigation link is clicked

    const allLinks = navLinks.querySelectorAll("a");

    allLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuButton.setAttribute("aria-expanded", "false");

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });

}


// =====================================
// 2. AUTOMATIC COPYRIGHT YEAR
// =====================================

const yearElement = document.querySelector("#year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}
