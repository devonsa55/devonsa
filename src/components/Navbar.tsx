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
          <Link to="/#work" className="nav-link-work">Work</Link>
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
                  <li><Link to="/#work">Work</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-primary);
          z-index: 1000;
          border-bottom: 2px solid transparent;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), background-color 0.5s ease;
        }
        .navbar.is-home:not(.is-scrolled) {
          background-image: radial-gradient(var(--dot-color) var(--dot-size), transparent 0);
          background-size: var(--dot-space) var(--dot-space);
          background-position: var(--grid-align-offset);
          background-color: var(--bg-primary); /* Ensure it's opaque so content slides under */
        }

        .navbar.is-loading {
          background-color: transparent !important;
          background-image: none !important;
          border-bottom-color: transparent !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
        }

        .navbar.is-scrolled {
          height: 72px;
          background-color: var(--bg-primary);
          backdrop-filter: none;
          border-bottom: 2px solid var(--text-primary);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .navbar.is-scrolled.is-home {
          background-image: radial-gradient(var(--dot-color) var(--dot-size), transparent 0);
          background-size: var(--dot-space) var(--dot-space);
          background-position: var(--grid-align-offset);
        }

        .navbar.mobile-menu-open {
          background-image: none;
          background-color: var(--bg-primary);
          height: 100px !important;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center; /* Generally center, but nav-links will override */
          width: 100%;
          z-index: 1002;
        }
        .logo {
          display: flex;
          align-items: center;
          font-weight: 800;
          font-size: 1.8rem;
          font-family: var(--font-heading);
          text-decoration: none;
          color: var(--text-primary);
          letter-spacing: -0.05em;
        }
        .signature-logo-header {
          position: relative;
          width: 150px; 
          max-width: 100%;
          height: 161px;
          background-color: var(--text-primary);
          mask-repeat: no-repeat;
          mask-position: left center;
          mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: left center;
          -webkit-mask-size: contain;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 5.5rem; 
          transform-origin: left center;
          margin-left: 20px; /* Nudged right to align the 'base' of the signature with the page gutter */
        }



        .logo:hover .signature-logo-header {
           opacity: 0.8;
        }
        .is-scrolled .signature-logo-header {
          height: 107px;
          width: 100px;
          margin-top: 5px;
          margin-left: 20px;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: flex-start; /* Align Work with top of stack */
          margin: 0;
          padding: 0;
        }
        
        .nav-stack {
          display: flex;
          flex-direction: column;
          gap: 0; /* Remove gap as rotation handles spacing */
          position: relative;
        }

        .nav-stack a:last-child {
          position: absolute;
          top: 0;
          right: -8px;
          transform-origin: top right;
          transform: rotate(90deg) translateX(100%);
          margin-top: 3rem;
          white-space: nowrap;
        }

        .nav-links a {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.4rem;
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          letter-spacing: -0.01em;
          z-index: 1;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1.5px;
          bottom: 2px;
          left: 0;
          background-color: #000;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }

        .nav-links a:hover {
          color: var(--text-primary);
        }

        .nav-links a:hover::after {
          transform: scaleX(1);
        }
        .nav-item-dropdown {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .is-scrolled .nav-item-dropdown {
          height: 72px;
        }
        .nav-link-with-icon {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .dropdown-icon {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dropdown-icon.open {
          transform: rotate(180deg);
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% - 10px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          min-width: 380px;
          padding: 1.25rem;
          overflow: hidden;
          backdrop-filter: blur(30px);
          z-index: 1001;
        }


        [data-mode='dark'] .dropdown-menu {
          background: #09090b;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }


        .dropdown-grid {
          display: grid;
          gap: 0.25rem;
        }
        .dropdown-item {
          display: block;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
        }
        .dropdown-item::after {
          display: none !important;
        }
        .dropdown-item:hover {
          background: var(--hover-bg);
          transform: translateX(4px);
        }
        .dropdown-item-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .dropdown-item-title {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }
        .dropdown-item-desc {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .mobile-toggle {
          display: none;
          color: var(--text-primary);
          z-index: 1002;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: var(--bg-primary);
          z-index: 1001;
          padding: 180px var(--container-padding) 40px; /* Synchronized with global gutter */
          overflow-y: auto;
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .mobile-nav-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-nav-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          font-weight: 700;
          font-family: var(--font-mono);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mobile-nav-links a {
          font-size: 2.5rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--text-primary);
          text-decoration: none;
          transition: transform 0.3s ease, color 0.3s ease;
          display: inline-block;
          letter-spacing: -0.03em;
        }
        
        
        .mobile-nav-links a:hover {
          color: var(--text-secondary);
          transform: translateX(12px);
        }

        .mobile-project-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mobile-project-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: var(--bg-secondary);
          border: var(--border-width) solid var(--border-subtle);
          border-radius: 16px;
          text-decoration: none;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        
        .mobile-project-item:hover {
          background: var(--hover-bg);
          border-color: var(--text-primary);
          transform: translateY(-4px);
        }

        
        /* Medium Screens / Tablets */
        @media (max-width: 1024px) {
        }

        /* Mobile Screens */
        @media (max-width: 720px) {
          .desktop-only { display: none; }
          .mobile-toggle { 
            display: block; 
            margin-top: 0px; 
            color: var(--text-primary);
            padding: 10px;
            margin-right: -10px;
          }
          .navbar { 
            height: 100px; 
            padding-top: 2vh; 
            align-items: center;
          }
          .navbar.is-scrolled { 
            height: 80px; 
            padding-top: 0;
            align-items: center;
          }
          .signature-logo-header {
            width: 314px; 
            height: 112px;
            margin-top: 44px;
            margin-left: 15px;
          }
          .is-scrolled .signature-logo-header {
            width: 202px;
            height: 67px;
            margin-top: 0;
            margin-left: 15px;
          }
          .is-scrolled .mobile-toggle {
            margin-top: 0;
          }
        }

        /* Tiny Screens (e.g. iPhone SE, Fold closed) */
        @media (max-width: 375px) {
          .signature-logo-header {
            width: 269px; 
            height: 95px;
          }
          .navbar { padding-top: 1vh; }
        }
        `}} />
    </motion.nav>
  );
};

export default Navbar;
