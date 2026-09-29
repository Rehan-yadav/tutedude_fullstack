# Laundry Services - Hero Section (CSS Transforms)

## Project Description
This project is a responsive hero section for a laundry services website. In this task, I added an interactive hover effect to the CTA button ("Book a service today!") using CSS transforms.

## Task
CTA button on hover:
- Its size will increase.
- It will also look tilted.

## Hover Effect Used
- Size increase: `transform: scale(1.1)`
- Tilt: `transform: rotate(-6deg)`
- Smooth animation: `transition: transform 0.3s ease`

```css
.cta-btn {
  transition: transform 0.3s ease;
}

.cta-btn:hover {
  transform: scale(1.1) rotate(-6deg);
}
```

## Technologies Used
- HTML5
- CSS3 (Flexbox, Transforms, Transitions, Media Queries)

## Folder Structure