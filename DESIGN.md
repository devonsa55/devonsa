# Design System

This document outlines the core semantic design rules and aesthetic guidelines for the Portfolio project. It acts as an agent-readable source of truth for generating complementary UIs.

## 1. Vibe & Identity
The portfolio has a **minimalist, modern, and structural** aesthetic. It blends high contrast with brutalist-inspired thick strokes.
- **Key aesthetic rule**: Interfaces should feel spacious, bold, and neatly sectioned using 2px solid borders.
- **Dark Mode**: Fully supported natively. Backgrounds become deep gray/black, and text/strokes adapt accordingly without losing the structural feel.

## 2. Color Palette

### Light Mode
- **Background**: `#ffffff` (White)
- **Text & Borders**: `#000000` (Black)
- **Primary/Accent**: `#8a94e1` (Soft Purple/Blue)
- **Subtle Backgrounds**: `#F3F4F6` (Premium soft gray for placeholders)

### Dark Mode (Triggered by `[data-mode='dark']`)
- **Background**: `#191a1f`, `#111112`, `#050505` (Deep grays/blacks depending on the depth context)
- **Text & Borders**: `#ffffff` (White or high-contrast light grays)
- **Subtle Backgrounds**: `#1e1e1e` (or rgba(255, 255, 255, 0.05))

### Universal Accents
- **Vibrant Alert/Accent**: `#f6e05e` (Vibrant Construction Yellow)

## 3. Typography
The system relies on clear, highly legible Google Fonts.
- **Body (`var(--font-body)`)**: `Inter`, sans-serif. Used for readable paragraphs, descriptions, and general text.
- **Headings (`var(--font-heading)`)**: `Outfit`, sans-serif. Used for titles and headers. Headings should be bold (`font-weight: 800`) and tightly kerned (`letter-spacing: -0.02em` or `-0.03em`).
- **Monospace/Labels**: `Roboto Mono`. Used for small tags, split-flap displays, and 'Read More' links. Usually uppercase with heavy tracking (`letter-spacing: 0.1em` to `0.15em`).

## 4. Layout & Spacing
- **Grids**: Favor CSS Grid (e.g., 2 or 3 responsive columns) with calculated gaps. 
- **Padding/Margins**: Generous vertical rhythm (`padding: 120px 0`, margins `4rem`+).
- **Constraints**: Main content often caps at `900px` for readability, or `680px` for deeper reading (strategy papers).

## 5. Component Specifications

### Cards (Project & Article)
- **Shape**: Rounded corners (`border-radius: 32px`).
- **Border**: `2px solid var(--text-primary)`.
- **Inner Padding**: High padding inside text containers (e.g., `40px`).
- **Media**: Image containers use a strict `16/10` or `16/9` aspect ratio, with images set to `object-fit: cover`.
- **Hover States**: No default box shadows. On hover, translate up (`transform: translateY(-4px)`), set a custom shadow variable (`box-shadow: var(--shadow-hover)`), and DO NOT scale images inside cards.

### Tags & Pills
- **Style**: Small (`0.65rem`), bold layout (`font-weight: 600`), uppercase formatting.
- **Shape**: Small border radius (`6px`). 
- **Background**: Faint gray background (`rgba(0, 0, 0, 0.06)` in light mode, `rgba(255, 255, 255, 0.06)` in dark mode).

### Links & Interactions
- **Underline Links**: Links often use a pseudo-element (`::after`) underline that scales on hover (`transform: scaleX(1)`) from the left.
- **Read More Links**: Use mono typography, `0.875rem`, bold. Contains a span (e.g., an arrow) that translates right (`translateX(4px)`) on card hover.
- **Easing**: Default to premium physical easing curves (e.g., `cubic-bezier(0.175, 0.885, 0.32, 1.275)` for cards and elements needing a bit of bounce, `cubic-bezier(0.16, 1, 0.3, 1)` for underlines).

## 6. Novelty Components
- **Split-Flap Display**: The project utilizes specialized components like airport-style split-flap boards requiring strict mono font rendering and 3D transforms (`perspective: 400px`, `transform-style: preserve-3d`). New interactive components should echo this tangible, physical interaction style.
