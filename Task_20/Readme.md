# 🧺 Laundry Services Web App

A user-friendly Laundry Services Web Application built using JavaScript that allows users to explore laundry services, add services to their cart, and book appointments seamlessly. The application also sends order confirmation emails using EmailJS.

## 📌 Project Overview

The Laundry Services Web App aims to simplify the laundry booking process by providing an easy-to-use platform where users can browse available services, select their desired services, manage their cart, and book laundry appointments online.

When a user clicks on the **Book Now** button, the application sends an email containing the order details using EmailJS.

## ✨ Features

- **User-Friendly Interface:** Clean and responsive design for easy navigation.
- **Navigation Bar:** Easily navigate through different sections of the website.
- **Hero Section:** Attractive landing section introducing the laundry services.
- **Services Section:** Explore different laundry services with their details and pricing.
- **Add to Cart:** Add selected laundry services to the shopping cart.
- **Cart Management:** Review selected services and order details.
- **Booking System:** Book laundry appointments easily.
- **Email Confirmation:** Receive order confirmation emails using EmailJS.
- **Responsive Design:** Accessible across different screen sizes.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- EmailJS

## ⚙️ Installation and Setup

Follow these steps to run the project locally:

1. Clone the repository:

   ```bash
   git clone <your-repository-link>
   ```

2. Navigate to the project directory:

   ```bash
   cd laundry-services-web-app
   ```

3. Open the project folder in VS Code.

4. Run the application using the Live Server extension or open the `index.html` file in your browser.

## 📧 EmailJS Configuration

This project uses EmailJS to send booking confirmation emails.

To configure EmailJS:

1. Create an account on [EmailJS](https://www.emailjs.com/).
2. Create an email service.
3. Create an email template containing the order details.
4. Get your:
   - Service ID
   - Template ID
   - Public Key
5. Configure these credentials in your JavaScript EmailJS initialization and email-sending code.

**Note:** Never expose private credentials or secret keys in frontend code.

## 🚀 How It Works

1. Open the Laundry Services Web App.
2. Explore the available laundry services.
3. Select your preferred services.
4. Add services to the cart.
5. Review your selected items.
