const greeting = document.getElementById("greeting");
const nameInput = document.getElementById("nameInput");
const greetBtn = document.getElementById("greetBtn");
const boxes = document.querySelectorAll(".box");

// Greet button: header text change
greetBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  greeting.textContent = name ? `Hello, ${name}` : "Hello";
});

// Boxes: click par background colour fill
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.style.backgroundColor = box.dataset.color;
    box.style.color = "#fff";
  });
});