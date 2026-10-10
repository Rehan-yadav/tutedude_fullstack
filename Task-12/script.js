// Predefined (static) values
const principal = 40000;  // P = principal amount
const rate = 0.075;       // r = annual interest rate (7.5% as a decimal)
const n = 4;              // n = times interest is compounded per year
const time = 3;           // t = time in years

// Compound interest formula: A = P(1 + r/n)^(nt)
const amount = principal * Math.pow(1 + rate / n, n * time);

// Compound interest = total amount - principal
const compoundInterest = amount - principal;

// Message to display
const message = "The compound interest after " + time + " years is: " + compoundInterest.toFixed(2);

// Display in the console (required by the task)
console.log(message);

// Display on the web page
document.getElementById("principal").textContent = principal;
document.getElementById("rate").textContent = (rate * 100) + "%";
document.getElementById("n").textContent = n;
document.getElementById("time").textContent = time;
document.getElementById("result").textContent = message;