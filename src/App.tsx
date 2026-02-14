import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Footer from './components/Footer'
import Decorations from './components/Decorations'
import ThemeSwitcher from './components/ThemeSwitcher'
import ProjectDetail from './components/ProjectDetail'
import StrategyDetail from './components/StrategyDetail'
import Contact from './components/Contact'
import { ThemeProvider } from './context/ThemeContext'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

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

import ProfileCard from './components/ui/ProfileCard'
import { aboutData } from './data/about'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-page"
    >
      <Hero />
      <Work />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '200px', display: 'flex', justifyContent: 'center' }}>
        <ProfileCard
          image={aboutData.profileImage}
          text="Intrigued?"
          subtext="Learn more about me"
          link="/about"
        />
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
            <Route path="/strategy/:strategyId" element={<StrategyDetail />} />
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
