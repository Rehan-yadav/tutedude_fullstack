// ---------- EmailJS config (apni keys yahan daalo) ----------
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ---------- Data ----------
const services = [
  { id: 1, icon: "🧥", name: "Dry Cleaning", price: 200 },
  { id: 2, icon: "🧺", name: "Wash & Fold", price: 100 },
  { id: 3, icon: "👔", name: "Ironing", price: 30 },
  { id: 4, icon: "🧼", name: "Stain Removal", price: 500 },
  { id: 5, icon: "👞", name: "Leather & Suede Cleaning", price: 999 },
  { id: 6, icon: "👰", name: "Wedding Dress Cleaning", price: 2800 },
];

let cart = []; // selected service objects

// ---------- Elements ----------
const servicesList = document.getElementById("servicesList");
const cartBody = document.getElementById("cartBody");
const emptyMsg = document.getElementById("emptyMsg");
const totalAmount = document.getElementById("totalAmount");
const bookBtn = document.getElementById("bookBtn");
const message = document.getElementById("message");

// ---------- Render services (left div) ----------
function renderServices() {
  servicesList.innerHTML = "";
  services.forEach((s) => {
    const added = cart.some((c) => c.id === s.id);
    const row = document.createElement("div");
    row.className = "service";
    row.innerHTML = `
      <div class="name">${s.icon} ${s.name} <span class="price">₹${s.price.toFixed(2)}</span></div>
      <button class="svc-btn ${added ? "remove" : ""}" data-id="${s.id}">
        ${added ? "Remove Item ⊖" : "Add Item ⊕"}
      </button>`;
    servicesList.appendChild(row);
  });
}

// ---------- Render cart (right div) ----------
function renderCart() {
  cartBody.innerHTML = "";
  cart.forEach((item, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i + 1}</td><td>${item.name}</td><td>₹${item.price.toFixed(2)}</td>`;
    cartBody.appendChild(tr);
  });
  emptyMsg.style.display = cart.length ? "none" : "block";
  const total = cart.reduce((sum, c) => sum + c.price, 0);
  totalAmount.textContent = `₹${total.toFixed(2)}`;
}

// ---------- Add / Remove toggle ----------
servicesList.addEventListener("click", (e) => {
  const btn = e.target.closest(".svc-btn");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const index = cart.findIndex((c) => c.id === id);

  if (index === -1) {
    cart.push(services.find((s) => s.id === id));
  } else {
    cart.splice(index, 1);
  }
  renderServices();
  renderCart();
});

// ---------- Hero button scroll ----------
document.getElementById("heroBtn").addEventListener("click", () => {
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
});

// ---------- Show message helper ----------
function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

// ---------- Book Now ----------
bookBtn.addEventListener("click", () => {
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (cart.length === 0) {
    showMessage("Please add at least one service to the cart.", "error");
    return;
  }
  if (!name || !email || !phone) {
    showMessage("Please fill in all the fields.", "error");
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^\d{10}$/.test(phone);
  if (!emailOk) { showMessage("Please enter a valid email.", "error"); return; }
  if (!phoneOk) { showMessage("Phone number must be 10 digits.", "error"); return; }

  const total = cart.reduce((sum, c) => sum + c.price, 0);
  const orderDetails = cart.map((c, i) => `${i + 1}. ${c.name} - ₹${c.price}`).join("\n");

  const params = {
    to_name: name,
    to_email: email,
    phone: phone,
    order_details: orderDetails,
    total_amount: `₹${total}`,
  };

  bookBtn.disabled = true;
  bookBtn.textContent = "Booking...";

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(() => {
      showMessage("Thank you For Booking the Service We will get back to you soon!", "success");
      cart = [];
      renderServices();
      renderCart();
      document.getElementById("fullName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    })
    .catch((err) => {
      console.error(err);
      showMessage("Something went wrong. Please try again.", "error");
    })
    .finally(() => {
      bookBtn.disabled = false;
      bookBtn.textContent = "Book now";
    });
});

// ---------- Newsletter ----------
document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("newsMsg").textContent = "Thanks for subscribing!";
  e.target.reset();
});

// ---------- Init ----------
renderServices();
renderCart();