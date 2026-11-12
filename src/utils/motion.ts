// Motion tokens, mirroring --ease-out / --duration-* / --lift in index.css.
// Use these for Framer Motion; CSS and Tailwind read the custom properties.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const DURATION = { fast: 0.15, base: 0.3, slow: 0.6 } as const
export const LIFT = -4

/** Standard transition for hover / tap feedback. */
export const hoverTransition = { duration: DURATION.base, ease: EASE_OUT }
export const tapTransition = { duration: DURATION.fast, ease: EASE_OUT }

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
}

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
}

// True when the visitor's system asks for less motion. Read at call time so
// it follows setting changes.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const scrollBehavior = (): ScrollBehavior => (prefersReducedMotion() ? 'auto' : 'smooth')
