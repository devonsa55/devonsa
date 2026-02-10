import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { mode, setMode } = useTheme();


  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  // Bitmaps (9x9)
  const sunBitmap = [
    "000010000",
    "010010010",
    "001111100",
    "001111100",
    "111111111",
    "001111100",
    "001111100",
    "010010010",
    "000010000"
  ];

  const moonBitmap = [
    "000111000",
    "001111000",
    "011110000",
    "111100000",
    "111100000",
    "111100000",
    "011110000",
    "001111000",
    "000111000"
  ];

  const GRID_W = 11;
  const GRID_H = 11;
  const currentBitmap = mode === 'light' ? moonBitmap : sunBitmap;

  const renderDots = () => {
    const dots = [];
    const startX = Math.floor((GRID_W - 9) / 2);
    const startY = Math.floor((GRID_H - 9) / 2);

    for (let r = 0; r < GRID_H; r++) {
      for (let c = 0; c < GRID_W; c++) {
        let isActive = false;
        if (r >= startY && r < startY + 9 && c >= startX && c < startX + 9) {
          isActive = currentBitmap[r - startY][c - startX] === '1';
        }
        dots.push(
          <div
            key={`${r}-${c}`}
            className={`matrix-dot ${isActive ? 'active' : ''}`}
          />
        );
      }
    }
    return dots;
  };

  return (
    <div className="theme-switcher">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMode}
        className="matrix-toggle"
      >
        <div className="matrix-screen" style={{
          gridTemplateColumns: `repeat(${GRID_W}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_H}, 1fr)`
        }}>
          {renderDots()}
        </div>
      </motion.button>

      <style dangerouslySetInnerHTML={{
        __html: `
        .theme-switcher {
            position: fixed;
            bottom: 2rem;
            right: 1rem;
            z-index: 2000;
        }

        .matrix-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 5px;
            background: var(--bg-primary);
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
            transition: var(--transition-smooth);
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
            border-color: var(--border-subtle);
            background: var(--bg-primary);
            /* Static look on hover */
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
      `}} />
    </div>
  );
};

export default ThemeSwitcher;
