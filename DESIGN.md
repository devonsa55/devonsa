# Design System

This document outlines the core semantic design rules, technical stack, and aesthetic guidelines for the Portfolio project. It acts as an agent-readable source of truth for generating complementary UIs.

## 1. Vibe & Identity

The portfolio has a **minimalist, modern, and structural** aesthetic. It blends high contrast with brutalist-inspired thick strokes and soft rounded corners.

- **Key aesthetic rule**: Interfaces should feel spacious, bold, and neatly sectioned using 2px solid borders.
- **Dark Mode**: Fully supported natively via the `[data-mode='dark']` attribute. Backgrounds become deep gray/black, and text/strokes adapt accordingly without losing the structural feel.

## 2. Color Palette & Tokens

### Light & Dark Themes (CSS Variables)

- **Backgrounds**: `--bg-primary`, `--bg-secondary`
- **Text & Borders**: `--text-primary`, `--text-secondary`, `--border-subtle`
- **Primary/Accent**: `--accent-purple`
- **Hover States**: `--hover-bg`

### Direct Colors (Tailwind/Custom)

- Backgrounds in light mode are typically `#ffffff` and borders `#000000`, flipping in dark mode.
- Faint gray backgrounds (`rgba(0, 0, 0, 0.06)` in light, `rgba(255, 255, 255, 0.05)` in dark) are used for pills, tabs, and subtle structural placeholders.

## 3. Typography

Four self-hosted families (OFL, files and licenses in `src/assets/fonts/`), one job each. Tokens and role classes live in `src/styles/type.css`; the existing variable names are kept so components pick them up.

- **Headings (`var(--font-heading)`)**: `Funnel Display` 600. h1, h2, hero, card titles. Tracking -4% (h1/display) and -2.5% (h2).
- **Body and UI (`var(--font-body)`)**: `Funnel Sans` 400 / 500 / 600 plus italic. Paragraphs, buttons, nav, and small headings (h3-h6, 600, -1%). Body italics are Funnel Sans italic.
- **Serif voice (`var(--font-serif)`)**: `Instrument Serif`, italic only, one weight. A single line of voice (subline, quote, takeaway, the Contact `<em>`), never body copy or UI. `--font-newsreader` remains as an alias.
- **Monospace/Labels (`var(--font-mono)`)**: `Fragment Mono` 400 only. Tags, eyebrows, captions, metadata, numerals, "Read More", the split-flap board. Never paragraphs.

Rules:

- One header weight (600). Hierarchy comes from size, not weight; map any 700/800 to 600.
- Fragment Mono and Instrument Serif have no bold. Don't set 600/700 on them; `font-synthesis: none` is set on `body` so browsers never fake a bold or italic. Use color, not weight, for emphasis in mono.
- Scale (fluid, 360px to 1440px viewports): display 44-72, h1 36-56, h2 28-40, h3 20-24, lead 24-36, body 17, small 15, label 12 (px). Role classes: `.t-display`, `.t-h1`-`.t-h3`, `.t-lead`, `.t-voice`, `.t-body`, `.t-small`, `.t-ui`, `.t-label`, `.t-numeral`, `.t-stat`.

## 4. Layout & Spacing

- **Container**: Max width usually `1176px` with `--container-padding` set to `40px` (or `32px` on mobile).
- **Grids**: Favor CSS Grid.
  - _Standard UI grid_: `grid-cols-1 md:grid-cols-2 lg:grid-cols-X`.
  - _Strict Card Grids_ (Strategy & AI Projects): Use `grid-cols-1 min-[820px]:grid-cols-2 gap-6`.
- **Vertical Rhythm**: Generous spacing. Major sections often have large top/bottom padding (`padding: 120px 0` or margin `80px`-`100px`).

## 5. Component Specifications

### Cards (Project, Strategy & AI Workflows)

- **Shape**: Rounded corners. Standard cards use `border-radius: var(--radius-card)` (typically 20px).
- **Border**: `var(--border-width) solid var(--text-primary)`.
- **Inner Padding**: High padding inside text containers (e.g., `40px`).
- **Media**: Image containers use strict aspect ratios, with images set to `object-fit: cover`.
- **Hover States**: Cards translate up (`transform: translateY(-4px)`) and apply a heavy shadow (`box-shadow: var(--shadow-hover)`). Do NOT scale images inside cards.

### Code Viewers & Tabs (e.g., MDViewer)

- Code blocks and sub-components use smaller radii (`rounded-sm` or `rounded-md`) to feel sharper and tighter compared to the bubbly outer cards.
- Tab interfaces seamlessly merge borders with the content block below them (e.g., matching border colors `border-border-subtle` and removing bottom borders on active tabs or wrapping components).

### Tags & Pills

- **Style**: Label type (`.t-label`: Fragment Mono 400, `0.75rem`, +0.1em tracking), uppercase.
- **Shape**: Utilize `Badge` component with secondary variants.

## 6. Technical Stack & Tooling Workflows

When implementing new features, adhere to the following library and component patterns:

### UI Component Library

- **Library**: `shadcn/ui` based on Radix primitives.
- **Installation Constraint**: Due to `EPERM` npm cache permission errors on this machine, DO NOT attempt to run `npx shadcn-ui@latest add <component>`.
- **Fallback Workflow**: If a Shadcn component is needed (e.g., `Tabs`, `ScrollArea`), you must **manually** create a fallback implementation in `src/components/ui/<component>.tsx` that mimics the expected Radix/Shadcn API and Tailwind styling behavior.

### Icons

- **Library**: `lucide-react`.
- **Usage**: Always import icons from `lucide-react` (e.g., `<ArrowLeft size={18} />`) rather than using external SVGs, FontAwesome, or other icon packs.

### Animations

- **Library**: `framer-motion`.
- **Usage**: Use for page load transitions, basic reveals (`fadeInUp`), and interactive card mounting. Keep animations fast and snappy (e.g., durations around `0.3s` to `0.5s` and appropriate easing curves like `cubic-bezier(0.16, 1, 0.3, 1)`).

## 7. Novelty Components

- The project occasionally utilizes specialized components (like airport-style split-flap boards) requiring strict mono font rendering and 3D transforms (`preserve-3d`). New interactive components should echo this tangible, physical interaction style.
