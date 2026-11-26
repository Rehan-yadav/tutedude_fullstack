# Laundry Services – Hero Image Animation

## Problem Statement
Replicate the animation effect shown in the video on the hero section image.

## Approach
- Built a simple landing page with a navbar and hero section using HTML and CSS.
- The hero image has two CSS animations running together:
  1. **orbit**: moves the image along a circular path (8s, linear, infinite).
  2. **squeeze**: scales the image on X/Y axes so it looks squeezed at certain points (4s, ease-in-out, infinite).
- Used the individual `translate` and `scale` properties so both animations
  work together without overriding each other.
- Added a hover effect on the "Book a service today!" button and paused the
  animation when hovering over the image.

## How to Run
1. Put your hero image at `images/washing-machine.png`.
2. Open `index.html` in any modern browser.

## Files
- `index.html` – page structure
- `style.css` – styling and animations
