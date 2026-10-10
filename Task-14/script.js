const runBtn = document.getElementById("runBtn");
const outputBox = document.getElementById("output");

runBtn.addEventListener("click", function () {
  // Single input number
  let number = Number(document.getElementById("numberInput").value);

  if (!Number.isInteger(number) || number < 1) {
    outputBox.textContent = "Please enter a valid positive whole number.";
    outputBox.style.display = "block";
    return;
  }

  // Different variables for each operation
  let n = number;            // sum of first n numbers
  let tableOf = number;      // table
  let primeCheck = number;   // prime check
  let factorOf = number;     // factors
  let digitNum = number;     // sum of digits
  let armstrongNum = number; // armstrong check

  let result = "Number :- " + number + "\n";

  // 1. Sum of first n numbers
  let sumN = 0;
  for (let i = 1; i <= n; i++) {
    sumN += i;
  }
  result += "Sum of first " + n + " numbers: " + sumN + "\n";

  // 2. Table of n
  result += "Table of " + tableOf + ":\n";
  for (let i = 1; i <= 10; i++) {
    result += tableOf + " x " + i + " = " + tableOf * i + "\n";
  }

  // 3. Sum of digits
  let temp = digitNum;
  let digitSum = 0;
  while (temp > 0) {
    digitSum += temp % 10;
    temp = Math.floor(temp / 10);
  }
  result += "Sum of its digits: " + digitSum + "\n";

  // 4. Armstrong number (cube of each digit)
  let temp2 = armstrongNum;
  let armSum = 0;
  while (temp2 > 0) {
    let digit = temp2 % 10;
    armSum += digit * digit * digit;
    temp2 = Math.floor(temp2 / 10);
  }
  result += "Is it an Armstrong number? " + (armSum === armstrongNum ? "Yes" : "No") + "\n";

  // 5. Prime check
  let isPrime = primeCheck > 1;
  for (let i = 2; i <= Math.sqrt(primeCheck); i++) {
    if (primeCheck % i === 0) {
      isPrime = false;
      break;
    }
  }
  result += "Is it a prime number? " + (isPrime ? "Yes" : "No") + "\n";

  // 6. Factors
  let factors = [];
  for (let i = 1; i <= factorOf; i++) {
    if (factorOf % i === 0) {
      factors.push(i);
    }
  }
  result += "Factors: " + factors.join(", ");

  // Display using console.log and on the page
  console.log(result);
  outputBox.textContent = result;
  outputBox.style.display = "block";
});