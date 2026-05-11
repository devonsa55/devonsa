import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const ThemeSwitcher = () => {
  const { mode, setMode } = useTheme()
  const [isTop, setIsTop] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50)
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = location.pathname === '/'
  const isAligned = isHome && isTop

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  // Bitmaps (9x9)
  const sunBitmap = [
    '000010000',
    '010010010',
    '001111100',
    '001111100',
    '111111111',
    '001111100',
    '001111100',
    '010010010',
    '000010000',
  ]

  const moonBitmap = [
    '000111000',
    '001111000',
    '011110000',
    '111100000',
    '111100000',
    '111100000',
    '011110000',
    '001111000',
    '000111000',
  ]

  const GRID_SIZE = 13
  const currentBitmap = mode === 'light' ? moonBitmap : sunBitmap

  const renderDots = () => {
    const dots = []
    const center = (GRID_SIZE - 1) / 2
    const radius = GRID_SIZE / 2
    const iconOffset = Math.floor((GRID_SIZE - 9) / 2)

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const dist = Math.sqrt(Math.pow(r - center, 2) + Math.pow(c - center, 2))
        const isWithinCircle = dist <= radius

        let isActive = false
        if (
          isWithinCircle &&
          r >= iconOffset &&
          r < iconOffset + 9 &&
          c >= iconOffset &&
          c < iconOffset + 9
        ) {
          isActive = currentBitmap[r - iconOffset][c - iconOffset] === '1'
        }

        dots.push(
          <div
            key={`${r}-${c}`}
            className={`matrix-dot ${isActive ? 'active' : ''}`}
            style={{
              opacity: isWithinCircle ? 1 : 0,
              visibility: isWithinCircle ? 'visible' : 'hidden',
            }}
          />,
        )
      }
    }
    return dots
  }

  return (
    <div className={`theme-switcher ${isAligned ? 'aligned' : ''}`}>
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, transition: { type: 'tween', duration: 0.15, ease: 'easeOut' } }}
        whileTap={{ scale: 0.95, transition: { type: 'tween', duration: 0.1, ease: 'easeOut' } }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={toggleMode}
        className="matrix-toggle"
      >
        <span className="matrix-text">{mode === 'light' ? 'Go Dark' : 'Go Light'}</span>
        <div
          className="matrix-screen"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {renderDots()}
        </div>
      </motion.button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .theme-switcher {
            position: fixed;
            bottom: 4svh;
            right: 1rem;
            z-index: 40;
            transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1), bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 1024px) {
            .theme-switcher {
                bottom: 5vh;
            }
        }
        
        .theme-switcher.aligned {
            right: max(var(--container-padding, 40px), calc(50vw - (var(--container-max-width, 1176px) / 2) + var(--container-padding, 40px)));
        }

        .matrix-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: var(--bg-primary);
            border: 2px solid var(--border-subtle);
            border-radius: 100px;
            overflow: hidden;
            box-sizing: border-box;
            transition: background 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                        border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                        box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                        padding 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                        gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            padding: 0.3rem;
        }

        .theme-switcher.aligned .matrix-toggle {
            height: 54px;
            padding: 0 0.8rem;
            border-radius: 100px;
            background: var(--bg-secondary);
        }

        @media (min-width: 768px) {
            .theme-switcher.aligned .matrix-toggle {
                padding: 0 1rem 0 1.5rem;
                gap: 1.25rem;
            }
        }

        .matrix-text {
            font-family: var(--font-heading);
            font-weight: 800;
            font-size: 1.15rem;
            color: var(--text-primary);
            white-space: nowrap;
            max-width: 0;
            opacity: 0;
            line-height: 1.1;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 768px) {
            .theme-switcher.aligned .matrix-text {
                max-width: 250px;
                opacity: 1;
            }
        }

        .matrix-screen {
            display: grid;
            gap: 1px;
            padding: 1px;
            background: transparent;
        }

        .matrix-dot {
            width: 2px;
            height: 2px;
            background-color: var(--border-subtle);
            border-radius: 50%;
            transition: all 0.2s ease;
        }

        .matrix-dot.active {
            background-color: var(--text-primary);
            transform: scale(1.1);
        }

        .matrix-toggle:hover {
            border-color: var(--text-primary);
            box-shadow: var(--shadow-hover);
        }
        
        /* Mode-specific glows */
        [data-mode='light'] .matrix-dot.active {
            background-color: var(--accent-purple); /* Amethyst for light mode moon */
            /* Removed box-shadow */
        }

        [data-mode='dark'] .matrix-dot.active {
            background-color: #FF9254; /* Tangerine for dark mode sun */
            /* Removed box-shadow */
        }
      `,
        }}
      />
    </div>
  )
}

export default ThemeSwitcher
