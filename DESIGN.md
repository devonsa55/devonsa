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
The system relies on clear, highly legible Google Fonts.
- **Body (`var(--font-body)`)**: `Public Sans` / `Inter`, sans-serif. Used for readable paragraphs, descriptions, and general text.
- **Headings (`var(--font-heading)`)**: `Plus Jakarta Sans` / `Outfit`, sans-serif. Used for titles and headers. Headings should be bold (`font-weight: 700` or `800`) and tightly kerned (`letter-spacing: -0.02em` or `-0.03em`).
- **Monospace/Labels (`var(--font-mono)`)**: `Google Sans Code` / `Roboto Mono`. Used for small tags, code blocks, and functional elements.

## 4. Layout & Spacing
- **Container**: Max width usually `1176px` with `--container-padding` set to `40px` (or `32px` on mobile).
- **Grids**: Favor CSS Grid.
  - *Standard UI grid*: `grid-cols-1 md:grid-cols-2 lg:grid-cols-X`.
  - *Strict Card Grids* (Strategy & AI Projects): Use `grid-cols-1 min-[820px]:grid-cols-2 gap-6`.
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
- **Style**: Small text (`0.65rem`), bold layout (`font-weight: 600`), uppercase formatting.
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
