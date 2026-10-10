# Compound Interest Calculation

A simple JavaScript program that calculates compound interest using predefined (static) values. The result is displayed in the browser console with `console.log()` and also on a web page.

## Objective

Create a JavaScript program that calculates compound interest based on static values, using variables and operators.

## Formula

```
A = P(1 + r/n)^(nt)
```

| Symbol | Meaning |
|--------|---------|
| A | Final amount (principal + interest) |
| P | Principal |
| r | Annual interest rate (as a decimal) |
| n | Number of times interest is compounded per year |
| t | Time in years |

Compound interest earned = `A - P`

## Project Structure

```
compound-interest/
├── index.html   # Page structure
├── style.css    # Styling
├── script.js    # Calculation logic
└── README.md    # Project documentation
```

## Static Values Used

| Variable | Value | Description |
|----------|-------|-------------|
| `principal` | 40000 | Principal amount |
| `rate` | 0.075 | 7.5% annual rate |
| `n` | 4 | Compounded quarterly |
| `time` | 3 | Years |

You can change these in `script.js` to test other values.

## How to Run

1. Keep `index.html`, `style.css`, and `script.js` in the **same folder** with exactly these names.
2. Open `index.html` in any web browser.
3. The result appears in the green box on the page.
4. To see the console output, press **F12** and open the **Console** tab.

## Sample Output

```
The compound interest after 3 years is: 9988.66
```

(Total amount after 3 years: 49988.66)

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

## Troubleshooting

- **Values or result are blank:** `script.js` did not load. Check that the file is named exactly `script.js` (not `script.js.txt`) and is in the same folder as `index.html`.
- **Styling is missing:** Check that `style.css` is named correctly and is in the same folder.
- **Check for errors:** Press F12 and look at the Console tab.