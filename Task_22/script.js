
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    const isOpen = !mobileMenu.classList.contains("hidden");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after clicking a link
const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// Chat widget
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatResponse = document.getElementById("chatResponse");

chatBtn.addEventListener("click", () => {
    chatBox.classList.toggle("hidden");

    const isOpen = !chatBox.classList.contains("hidden");
    chatBtn.setAttribute("aria-expanded", String(isOpen));
});

function sendMessage() {
    const message = chatInput.value.trim();

    if (message === "") {
        return;
    }

    chatResponse.textContent =
        "Demo mode: Your message was not sent to a support team.";
    chatResponse.classList.remove("hidden");

    chatInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
