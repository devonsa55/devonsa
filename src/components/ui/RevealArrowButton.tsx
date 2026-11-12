import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'
import './RevealArrowButton.css'

interface RevealArrowButtonProps {
  to: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Pill button: on hover the label shrinks and a circle with a down arrow
 * scales in from the right while the arrow slides down into place. Pure CSS.
 */
const RevealArrowButton = ({ to, children, onClick }: RevealArrowButtonProps) => (
  <Link to={to} className="reveal-arrow-btn" onClick={onClick}>
    <span className="reveal-arrow-btn__inner">{children}</span>
    <span className="reveal-arrow-btn__circle" aria-hidden="true">
      <span>
        <ArrowDown size={22} strokeWidth={2.5} />
      </span>
    </span>
  </Link>
)

export default RevealArrowButton
