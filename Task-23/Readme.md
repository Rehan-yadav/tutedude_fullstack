# Greenwood Public Library – Landing Page

A minimal, modern, editorial-style landing page for the Greenwood Public Library, built with **HTML** and **Tailwind CSS (CDN)**. It showcases large typography, asymmetrical bento grids, hover transformations (image zoom, grayscale transitions) and staggered entry animations, using only native Tailwind utilities.

## Project Structure

```
greenwood-library/
├── index.html    # Page markup + Tailwind config (custom keyframes/animations)
├── style.css     # Small extras: animation delays, selection colour, scroll padding
└── Readme.md
```

## How to Run

1. Download or clone the project folder.
2. Keep `index.html` and `style.css` in the same folder.
3. Open `index.html` in any modern browser.

An internet connection is needed because Tailwind CSS is loaded from the CDN and placeholder images come from `picsum.photos`.

## Sections Implemented

1. **Navigation** – sticky navbar with `backdrop-blur-md`, "Open Sat" badge, animated underline links (`after:w-0 hover:after:w-full`), "Visit Us" pill button with colour inversion, links hidden on mobile.
2. **Hero** – large light-weight headline, "Explore Collection" (solid) and "Join Free" (outlined) buttons, feature image with `hover:scale-105`, 4-column stats row.
3. **Sections Grid** – 1 column on mobile, 2 on desktop, six cards (Fiction, Children's, Science, History, Arts, Reference) with different hover background colours and group-hover text colour changes.
4. **Gallery** – 2×2 responsive grid with `overflow-hidden rounded-lg`, `group-hover:scale-105` zoom, title and floor tag on each card.
5. **Values (Bento Grid)** – asymmetrical layout with column spans, large "About" card and pastel benefit cards (slate, emerald, amber, rose, violet, zinc) with hover colour changes.
6. **About** – large light-weight heading with newspaper-style text using `columns-1 sm:columns-2`.
7. **Membership** – responsive grid (1 column mobile, up to 4 on desktop), intro card, Basic / Student / Family cards with `brightness-95` header images, absolute-positioned "Popular" badge on Student, pricing, feature list and CTA.
8. **Testimonial** – quote with author, circular avatar that goes from grayscale to full colour on hover (`grayscale hover:grayscale-0 transition-all duration-500`).
9. **Contact CTA** – rounded tinted block (`bg-emerald-50`), large address heading, opening hours, "Get Directions" and mailto buttons.
10. **Events** – 4-column responsive grid, each card with zoom-on-hover image, title and date.
11. **Footer** – multi-column layout (Brand, Pages, Sections, Details), social icon circles with hover backgrounds, copyright and legal links with a top border, subtle hover colour transitions on all links.
12. **Animation & UI** – `max-w-7xl` containers, `group` / `group-hover` effects, `transition-all`, `transition-colors`, `transition-transform`, and `overflow-hidden` for image scaling.

## Tailwind Configuration

Custom animations are defined through the Tailwind CDN config in `index.html`:

```js
tailwind.config = {
  theme: {
    extend: {
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out both',
        'fade-in': 'fadeIn 1s ease-out both',
      },
    },
  },
};
```

Staggered entry is achieved with the `.delay-1` to `.delay-4` helper classes in `style.css`.

## Responsiveness

- Mobile: single-column layouts, navigation links hidden.
- Tablet: two-column grids for sections, gallery and events.
- Desktop: full bento grid, 4-column membership and events grids.

## Technologies Used

- HTML5
- Tailwind CSS (CDN) with extended configuration
- Placeholder images from picsum.photos

## Author

Your Name
