# Service Booking Web App (JS DOM)

A simple service booking web application built with HTML, CSS and vanilla JavaScript (DOM manipulation). Users can browse services one by one, add them to a cart, see the running total and book them using a form.

## Features

- **Navigation bar** with a logo, links (Home, Services, Contact Us, About Us), the username and a red/pink logout button.
- **Added Items (left section)**
  - Shows "No Items Added" initially.
  - Table with S.No, Service Name and Price, updated dynamically when a service is added.
  - Total amount starts at ₹0 and updates as items are added.
- **Book Now form (left section)**
  - Fields: Full Name, Email ID, Phone Number.
  - Button stays faded until at least one item is in the cart.
  - Shows an error message if the cart or form is empty.
  - Shows a success message after booking, then resets the cart and form.
- **Browse Our Services (right section)**
  - Heading and short description of the services.
  - One service is shown at a time with its image, name and price.
  - **Add Item** adds the service to the cart and shows the next service.
  - **Skip Item** skips to the next service.
  - Services loop back to the first one after the last.

## Project Structure

```
service-booking-app/
├── index.html
├── style.css
├── script.js
└── Readme.md
```

## Services Included

| Service                 | Price   |
|-------------------------|---------|
| Dry Cleaning            | ₹200    |
| Leather & Suede Cleaning| ₹999    |
| Ironing                 | ₹30     |
| Wedding Dress Cleaning  | ₹2400   |
| Wash and Fold           | ₹140    |
| Stain Removal           | ₹500    |

## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any modern browser.
3. No installation or build step is required.

## How to Use

1. Look at the service shown in the "Browse Our Services" section.
2. Click **Add Item** to add it to the cart, or **Skip Item** to see the next one.
3. Check the "Added Items" table and the total amount on the left.
4. Fill in your Full Name, Email ID and Phone Number.
5. Click **Book now** to confirm the booking.

## Technologies Used

- HTML5
- CSS3 (Flexbox, responsive layout)
- JavaScript (DOM manipulation, event handling)

## Notes

- Service images are loaded from placeholder URLs (picsum.photos). Replace the `img` values in `script.js` with local images if needed.
- Cart data is kept in memory only, so it resets on page refresh.
