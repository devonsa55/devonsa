import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Footer from './components/Footer'
import Decorations from './components/Decorations'
import ThemeSwitcher from './components/ThemeSwitcher'
import ProjectDetail from './components/ProjectDetail'
import Contact from './components/Contact'
import { ThemeProvider } from './context/ThemeContext'
import Button from './components/ui/Button'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

import { aboutData } from './data/about'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Work />
      <div className="container" style={{ paddingBottom: '120px', display: 'flex', justifyContent: 'center' }}>
        <Button
          href={aboutData.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="link"
          className="resume-link"
        >
          View my Resumé <ArrowUpRight size={20} style={{ marginLeft: '8px' }} />
        </Button>
      </div>
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="app">
      <ThemeSwitcher />
      <Decorations />
      <Navbar />
      <ScrollToHash />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
