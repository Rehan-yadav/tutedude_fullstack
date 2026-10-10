// 1. Maximum number - normal function declaration
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// 2. Sum of all elements - arrow function
const calculateSum = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

// 3. Count of odd numbers - anonymous function (function expression)
const countOdd = function (arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
      count++;
    }
  }
  return count;
};

// Button click par input lena aur output dikhana
const inputBox = document.getElementById("arrayInput");
const button = document.getElementById("calculateBtn");
const output = document.getElementById("output");

button.addEventListener("click", function () {
  const text = inputBox.value.trim();

  if (text === "") {
    output.innerHTML = '<p class="error">Please kuch numbers enter karo.</p>';
    return;
  }

  // "4, 8, 2" -> [4, 8, 2]
  const numbers = text.split(",").map(function (item) {
    return Number(item.trim());
  });

  // Invalid input check
  if (numbers.some(isNaN)) {
    output.innerHTML = '<p class="error">Sirf valid numbers enter karo (comma se separated).</p>';
    return;
  }

  const max = findMax(numbers);
  const sum = calculateSum(numbers);
  const odd = countOdd(numbers);

  // Screen par output
  output.innerHTML =
    "<p><b>Array:</b> [" + numbers.join(", ") + "]</p>" +
    "<p><b>Maximum number:</b> " + max + "</p>" +
    "<p><b>Sum of all elements:</b> " + sum + "</p>" +
    "<p><b>Count of odd numbers:</b> " + odd + "</p>";

  // Console par bhi (assignment me console.log bola tha)
  console.log("Array:", numbers);
  console.log("Maximum number: " + max);
  console.log("Sum of all elements: " + sum);
  console.log("Count of odd numbers: " + odd);
});