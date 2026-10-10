const numberInput = document.getElementById("numberInput");
const checkBtn = document.getElementById("checkBtn");
const resultText = document.getElementById("result");

function checkEvenOdd() {
  const value = numberInput.value;

  // Make sure the user entered a whole number
  if (value === "" || !Number.isInteger(Number(value))) {
    resultText.textContent = "Please enter a valid whole number.";
    resultText.className = "error";
    console.log("Invalid input.");
    return;
  }

  const number = Number(value);
  let message;

  if (number % 2 === 0) {
    message = "The number " + number + " is even.";
    resultText.className = "even";
  } else {
    message = "The number " + number + " is odd.";
    resultText.className = "odd";
  }

  console.log(message);
  resultText.textContent = message;
}

checkBtn.addEventListener("click", checkEvenOdd);

// Pressing Enter also works
numberInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkEvenOdd();
  }
});