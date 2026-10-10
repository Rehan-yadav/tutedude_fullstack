# JavaScript - Check if a Number is Even or Odd

A small JavaScript project that checks whether a number entered by the user is even or odd. The result is printed with `console.log()` and also shown on the web page.

## Objective

Create a JavaScript program that checks whether a given number is even or odd, using an `if-else` statement.

## Project Structure

```
even-odd/
├── index.html   # Page structure (input box, button, result area)
├── style.css    # Styling for the page
├── script.js    # JavaScript logic (if-else check, console.log output)
└── README.md    # Project documentation
```

## How It Works

1. The user types a number into the input box.
2. The user clicks the **Check** button (or presses **Enter**).
3. The program validates that the input is a whole number.
4. An `if-else` statement uses the modulus operator (`%`) to decide:
   - If `number % 2 === 0`, the number is **even**.
   - Otherwise, the number is **odd**.
5. The message is printed in the browser console with `console.log()` and displayed on the page.

## How to Run

1. Download or copy all three files (`index.html`, `style.css`, `script.js`) into the same folder.
2. Open `index.html` in any web browser.
3. Type a number and click **Check**.
4. To see the console output, press **F12** and open the **Console** tab.

## Sample Output

```
The number 5 is odd.
The number 10 is even.
```

## Concepts Used

- Variables (`const`, `let`)
- `if-else` statement
- Modulus operator (`%`)
- Functions
- DOM manipulation (`getElementById`, `addEventListener`, `textContent`)
- `console.log()`

## Notes

- Negative numbers work as well (`-3` is odd, `-4` is even).
- Empty or non-integer input (such as `2.5`) shows an error message.