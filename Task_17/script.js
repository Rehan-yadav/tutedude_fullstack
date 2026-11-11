// Arrow function jo Promise return karta hai
const divide = (a, b) => {
  return new Promise((resolve, reject) => {
    if (typeof a !== "number" || typeof b !== "number") {
      reject("Error: Both inputs must be numbers.");
    } else if (b === 0) {
      reject("Error: Division by zero is not allowed.");
    } else {
      resolve(a / b);
    }
  });
};

const output = document.getElementById("output");

// Page par result dikhane ke liye helper
const showOnPage = (lines, type) => {
  const div = document.createElement("div");
  div.className = "case " + type;
  div.innerHTML =
    `<p>${lines[0]}</p><p class="result">${lines[1]}</p>`;
  output.appendChild(div);
};

// Function ko test karne wala helper
const runTest = (a, b) => {
  const startMsg = `Dividing ${a} by ${b}...`;
  console.log(startMsg);

  return divide(a, b)
    .then((result) => {
      const msg = `Result: ${result}`;
      console.log(msg);
      showOnPage([startMsg, msg], "success");
    })
    .catch((error) => {
      console.log(error);
      showOnPage([startMsg, error], "error");
    });
};

// Dummy values ke saath 6 test cases
const testCases = [
  [10, 2],    // Result: 5
  [10, 0],    // Error: Division by zero
  [25, 5],    // Result: 5
  [-12, 4],   // Result: -3
  [7, 2],     // Result: 3.5
  [0, 9],     // Result: 0
];

// Ek ke baad ek run karo taaki output order mein aaye
(async () => {
  for (const [a, b] of testCases) {
    await runTest(a, b);
  }
})();