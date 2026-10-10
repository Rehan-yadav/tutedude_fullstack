# JavaScript - Loops

## Objective
A JavaScript program that takes a single number from the user and performs various operations on it using loops and conditionals:

- Sum of first n numbers
- Table of n
- Check if the number is prime
- Print all factors
- Sum of all digits
- Check if the number is an Armstrong number

## Files
| File | Description |
|------|-------------|
| `index.html` | Page structure with a number input and Calculate button |
| `style.css` | Styling for the page |
| `script.js` | Logic for all operations using loops and conditionals |

## How to Run
1. Keep `index.html`, `style.css` and `script.js` in the same folder.
2. Open `index.html` in any browser.
3. Enter a number and click **Calculate**.
4. The result is shown on the page and also printed in the browser console (press `F12` and open the **Console** tab).

## Concepts Used
- `for` loop: sum of first n numbers, table, factors, prime check
- `while` loop: sum of digits, Armstrong check
- `if-else` conditions: prime and Armstrong checks
- `Math.floor()`, `Math.sqrt()` and the modulus operator (`%`)
- Separate variables for each operation (`n`, `tableOf`, `primeCheck`, `factorOf`, `digitNum`, `armstrongNum`)
- `console.log()` to display the output

## Sample Output
Input: `153`

```
Number :- 153
Sum of first 153 numbers: 11781
Table of 153:
153 x 1 = 153
...
153 x 10 = 1530
Sum of its digits: 9
Is it an Armstrong number? Yes
Is it a prime number? No
Factors: 1, 3, 9, 17, 51, 153
```

## Armstrong Number
A number whose sum of digits raised to the power three equals the number itself.
Example: `153 => 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153`