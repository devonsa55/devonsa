import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { fadeInUp } from '../../utils/motion'

export type ViewMode = 'summary' | 'deck'

interface ViewModeToggleProps {
  mode: ViewMode
  onModeChange: (mode: ViewMode) => void
}

/**
 * Summary / deck switcher. The active pill slides with a plain CSS transition on purpose:
 * a framer-motion shared `layoutId` pill registers with the route-level AnimatePresence
 * in App.tsx and, once it has moved, never reports exit-complete. That leaves the old route
 * invisible but mounted, so navigating away (e.g. "Back to Home") renders a blank page.
 */
const ViewModeToggle = ({ mode, onModeChange }: ViewModeToggleProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Record<ViewMode, HTMLButtonElement | null>>({
    summary: null,
    deck: null,
  })
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const button = buttonRefs.current[mode]
      if (button) setPill({ left: button.offsetLeft, width: button.offsetWidth })
    }
    measure()

    // Re-measure when fonts load or the viewport changes the button widths.
    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [mode])

  return (
    <motion.div
      ref={containerRef}
      className="mode-toggle-container"
      {...fadeInUp}
      transition={{ delay: 0.15 }}
    >
      {pill && (
        <span
          aria-hidden="true"
          className="toggle-active-bg"
          style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
        />
      )}
      <button
        ref={(el) => {
          buttonRefs.current.summary = el
        }}
        onClick={() => onModeChange('summary')}
        className={`mode-toggle-btn ${mode === 'summary' ? 'active' : ''}`}
      >
        Read Summary
      </button>
      <button
        ref={(el) => {
          buttonRefs.current.deck = el
        }}
        onClick={() => onModeChange('deck')}
        className={`mode-toggle-btn flex items-center gap-2 ${mode === 'deck' ? 'active' : ''}`}
      >
        View Full Case Study
        <Lock
          size={14}
          className="transition-opacity"
          style={{ opacity: mode === 'deck' ? 0.9 : 0.6 }}
        />
      </button>
    </motion.div>
  )
}

export default ViewModeToggle
