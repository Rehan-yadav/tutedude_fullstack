const services = [
  { name: "Dry Cleaning",          price: 200,  img: "https://picsum.photos/seed/drycleaning/600/400" },
  { name: "Leather & Suede Cleaning", price: 999, img: "https://picsum.photos/seed/leathersofa/600/400" },
  { name: "Ironing",               price: 30,   img: "https://picsum.photos/seed/ironing/600/400" },
  { name: "Wedding Dress Cleaning", price: 2400, img: "https://picsum.photos/seed/weddingdress/600/400" },
  { name: "Wash and Fold",         price: 140,  img: "https://picsum.photos/seed/washfold/600/400" },
  { name: "Stain Removal",         price: 500,  img: "https://picsum.photos/seed/stainremoval/600/400" }
];

let current = 0;   // index of service currently shown
let cart = [];     // items added

const imgEl = document.getElementById("service-img");
const nameEl = document.getElementById("service-name");
const priceEl = document.getElementById("service-price");
const emptyState = document.getElementById("empty-state");
const cartRows = document.getElementById("cart-rows");
const totalEl = document.getElementById("total");
const bookBtn = document.getElementById("book-btn");
const formMsg = document.getElementById("form-msg");

const fmt = n => "₹" + n.toFixed(2);

function showService() {
  const s = services[current];
  imgEl.src = s.img;
  imgEl.alt = s.name;
  nameEl.textContent = s.name;
  priceEl.textContent = fmt(s.price);
}

function nextService() {
  current = (current + 1) % services.length;
  showService();
}

function renderCart() {
  cartRows.innerHTML = "";
  cart.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <span class="c-sno">${i + 1}</span>
      <span class="c-name">${item.name}</span>
      <span class="c-price">${fmt(item.price)}</span>`;
    cartRows.appendChild(row);
  });

  emptyState.style.display = cart.length === 0 ? "block" : "none";

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalEl.textContent = "₹ " + total.toFixed(total % 1 ? 2 : (cart.length ? 2 : 0));

  bookBtn.classList.toggle("inactive", cart.length === 0);
}

function setMsg(text, type) {
  formMsg.textContent = text;
  formMsg.className = "form-msg " + (type || "");
}

// Add Item
document.getElementById("add-btn").addEventListener("click", () => {
  const s = services[current];
  if (!cart.some(item => item.name === s.name)) {
    cart.push({ name: s.name, price: s.price });
  }
  renderCart();
  setMsg("");
  nextService();
});

// Skip Item
document.getElementById("skip-btn").addEventListener("click", () => {
  if (cart.length === 0) setMsg("Add the items to the cart to book", "error");
  nextService();
});

// Book now
document.getElementById("booking-form").addEventListener("submit", e => {
  e.preventDefault();

  if (cart.length === 0) {
    setMsg("Add the items to the cart to book", "error");
    return;
  }

  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    setMsg("Please fill in all the details", "error");
    return;
  }

  setMsg("Thank you for contacting, we will get back to you soon", "success");

  // reset everything
  cart = [];
  current = 0;
  e.target.reset();
  renderCart();
  showService();
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  alert("Logged out successfully!");
});

showService();
renderCart();