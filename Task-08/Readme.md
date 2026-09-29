# Laundry Services – Hamburger Menu (Mobile)

A pure HTML + CSS hamburger menu for the mobile view of the Laundry web app. No JavaScript, no Bootstrap.

## How it works
- **Navbar:** the hamburger icon sits inside a `<button>` and is `display: none` by default. A media query (`max-width: 768px`) turns it on for mobile only.
- **Menu list:** a `div` with `position: absolute` on the right side of the screen, `display: none` by default.
- **Show on click:** the div is a sibling placed right after the button, so `.menu-btn:focus + .menu-list { display: flex; }` reveals it while the button has focus.
- `.menu-list:hover` keeps the menu open while the pointer is over it so links stay clickable.

## Files
- `index.html`
- `style.css`
- `README.md`

## Run
Open `index.html` in a browser and use DevTools responsive mode (width below 768px).