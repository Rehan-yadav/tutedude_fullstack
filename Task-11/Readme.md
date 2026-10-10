# Thala 7. - Sneaker Store

A front-end web application for a sneaker selling store, built with HTML, CSS and vanilla JavaScript. It has four pages: Landing, Product Display, Shopping Cart and Payment.

## Project Structure

```
sneaker-store/
├── index.html   # Page structure and JavaScript (all four pages)
├── style.css    # All styling
└── README.md
```

## How to Run

1. Download `index.html` and `style.css` into the same folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

No installation, build step or internet connection is needed.

## Pages and Features

### 1. Landing Page
- **Header:** logo on the left, menus in the centre, and search icon, cart icon and profile picture on the right, laid out with Flexbox.
- **Hero section:** two divs. The left has the heading, description and a "Shop Now" button. The right shows a sneaker image.
- **Service overview:** a full-width orange band showing 2k+ Reviews, 30k+ Customers, High Quality and a 4.5/5 Rating.

### 2. Product Display Page
- Main product image on the left.
- Product name, description, price, sale details, quantity selector and "Add to cart" button on the right.
- Bottom gallery of product images in a horizontally scrolling container. Clicking a thumbnail changes the main image.

### 3. Shopping Cart
- **Left:** "Shopping Cart" heading and a table of product, quantity and price, with +/- buttons and a remove icon. A "Continue Shopping" link sits at the bottom.
- **Right:** a coupon code input with an "Apply Coupon" button, then Sub Total, Taxes, Discount and Total, followed by a "Pay Now" button and Razorpay-style icons.

### 4. Payment Page
- **Left:** "Checkout" sub-heading, an Email ID field, and payment options (Card, Crypto, Bank). The Card option asks for card number, expiry, CVV, country and ZIP.
- **Right:** "Order Summary" with the coupon box, totals, "Pay Now" button and Razorpay icons.

## Navigation

The app is a single-page app. Pages switch with URL hashes and no page reload:

| Page     | URL hash    |
|----------|-------------|
| Landing  | `#home`     |
| Product  | `#product`  |
| Cart     | `#cart`     |
| Payment  | `#checkout` |

## Business Rules

- Product price: ₹1,334.
- Tax: 5% of the sub total.
- Coupon: `SNEAK10` gives 10% off the sub total. Any other code shows an error.
- "Pay Now" on the Payment page requires a valid email address, then shows an order confirmation. No real payment is processed.
- Opening the payment page with an empty cart redirects back to the cart.

## Technologies Used

- HTML5
- CSS3 (Flexbox, CSS variables, media queries)
- JavaScript (ES6)

## Responsive Design

The layout adapts to mobile, tablet and desktop screens. The navigation wraps on small screens and the columns stack. Dark mode follows the system theme.

## Notes

- The sneaker images are inline SVG drawings. To use a real photo, replace the `shoe()` calls in `home()` and `product()` with `<img src="your-image.jpg" alt="Sneaker">`.
- The Razorpay badges are styled text, not the official logos, and no payment gateway is connected.

## Possible Improvements

- Add more products and a product listing page.
- Save the cart in `localStorage` so it survives a page refresh.
- Connect the real Razorpay checkout API.
- Add search and user login.