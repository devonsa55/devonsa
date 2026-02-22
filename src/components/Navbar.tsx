import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getAssetPath } from '../utils/assets';



const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const IS_UNDER_CONSTRUCTION = false;

  const isHomePage = location.pathname === '/';
  const isDetailPage = location.pathname.startsWith('/project/') || location.pathname.startsWith('/strategy/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  if (isDetailPage) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      onAnimationComplete={() => setIsLoaded(true)}
      className={`navbar ${scrolled ? 'is-scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''} ${isHomePage ? 'is-home' : ''} ${!isLoaded ? 'is-loading' : ''}`}
    >
      <div className="container nav-content">
        <Link to="/" className="logo">
          <div
            className="signature-logo-header"
            role="img"
            aria-label="Devon Anderson"
            style={{
              maskImage: `url(${getAssetPath('/assets/Handwriting-2.svg')})`,
              WebkitMaskImage: `url(${getAssetPath('/assets/Handwriting-2.svg')})`
            }}
          />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link to="/#work" className="nav-link-work">{IS_UNDER_CONSTRUCTION ? '🚧WIP🚧' : 'Work'}</Link>
          <div className="nav-stack">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mobile-menu-overlay"
          >
            <div className="mobile-menu-content">
              <div className="mobile-nav-section">
                <span className="mobile-nav-label">Navigation</span>
                <ul className="mobile-nav-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/#work">{IS_UNDER_CONSTRUCTION ? '🚧WIP🚧' : 'Work'}</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navbar;
