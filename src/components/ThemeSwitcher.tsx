import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { mode, setMode } = useTheme();

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="theme-switcher">
      <div className="fab-group">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMode}
          className="mode-toggle fab"
          title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {mode === 'light' ? '🌙' : '☀️'}
        </motion.button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .theme-switcher {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 2000;
        }
        .fab-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .fab {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--accent-purple);
          color: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .mode-toggle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-secondary);
          color: var(--text-primary);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          cursor: pointer;
        }
        .theme-menu {
          position: absolute;
          bottom: 70px;
          right: 0;
          background: white;
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 140px;
        }
        .theme-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 500;
          color: var(--text-primary);
          transition: var(--transition-smooth);
          width: 100%;
          text-align: left;
        }
        .theme-option:hover {
          background: var(--bg-secondary);
        }
        .theme-option.active {
          background: var(--accent-purple-light);
          color: var(--accent-purple);
        }
        
        /* Dark mode specific tweaks for buttons */
        [data-mode='dark'] .mode-toggle {
          background: var(--bg-secondary);
          border-color: var(--border-subtle);
        }

        }
      `}} />
    </div>
  );
};

export default ThemeSwitcher;
