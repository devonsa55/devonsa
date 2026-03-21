import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { getAssetPath } from '../utils/assets';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';



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
      <div className="container flex justify-between items-center w-full z-[1002]">
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
        <div className="hidden md:flex gap-8 items-start m-0 p-0">
          <Link to="/#work" className="group font-heading font-bold text-[1.4rem] text-text-primary no-underline relative tracking-[0.02em] z-[1] after:absolute after:w-full after:h-[1.5px] after:bottom-[2px] after:left-0 after:bg-text-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:-z-10">{IS_UNDER_CONSTRUCTION ? '🚧WIP🚧' : 'Work'}</Link>
          <div className="flex flex-col relative gap-0">
            <Link to="/about" className="group font-heading font-bold text-[1.4rem] text-text-primary no-underline relative tracking-[0.02em] z-[1] after:absolute after:w-full after:h-[1.5px] after:bottom-[2px] after:left-0 after:bg-text-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:-z-10">About</Link>
            <Link to="/contact" className="group font-heading font-bold text-[1.4rem] text-text-primary no-underline absolute top-full right-0 tracking-[0.02em] z-[1] after:absolute after:w-[1.5px] after:h-full after:left-[-4px] after:top-0 after:bg-text-primary after:scale-y-0 after:origin-top hover:after:scale-y-100 after:transition-transform after:duration-300 after:-z-10 [writing-mode:vertical-rl] mt-4 mr-[2px]">Contact</Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="block md:hidden text-text-primary z-[1002] p-2 mt-0 max-[720px]:-mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? null : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <button
            className="hidden top-0"
            aria-label="Toggle menu"
          />
        </SheetTrigger>
        <SheetContent side="right" className="w-[100vw] sm:max-w-[400px] bg-bg-primary pt-[180px] px-[var(--container-padding)] border-none">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-text-secondary font-bold font-mono">Navigation</span>
              <ul className="flex flex-col gap-6 list-none p-0 m-0">
                <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[2.5rem] font-extrabold font-heading text-text-primary no-underline transition-all duration-300 inline-block tracking-[-0.03em] hover:text-text-secondary hover:translate-x-3">Home</Link></li>
                <li><Link to="/#work" onClick={() => setIsMobileMenuOpen(false)} className="text-[2.5rem] font-extrabold font-heading text-text-primary no-underline transition-all duration-300 inline-block tracking-[-0.03em] hover:text-text-secondary hover:translate-x-3">{IS_UNDER_CONSTRUCTION ? '🚧WIP🚧' : 'Work'}</Link></li>
                <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-[2.5rem] font-extrabold font-heading text-text-primary no-underline transition-all duration-300 inline-block tracking-[-0.03em] hover:text-text-secondary hover:translate-x-3">About</Link></li>
                <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[2.5rem] font-extrabold font-heading text-text-primary no-underline transition-all duration-300 inline-block tracking-[-0.03em] hover:text-text-secondary hover:translate-x-3">Contact</Link></li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>

    </motion.nav>
  );
};

export default Navbar;
