import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import Footer from './components/Footer'
import Decorations from './components/Decorations'
import ThemeSwitcher from './components/ThemeSwitcher'
import { ThemeProvider } from './context/ThemeContext'
import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ProfileCard from './components/ui/ProfileCard'
import CustomCursor from './components/ui/CustomCursor'
import { aboutData } from './data/about'

// Every page except Home is split into its own chunk and only downloaded
// when it's opened (or prefetched once the homepage has gone idle, below).
const loadAbout = () => import('./components/About')
const loadContact = () => import('./components/Contact')
const loadProjectDetail = () => import('./components/ProjectDetail')
const loadStrategyDetail = () => import('./components/StrategyDetail')
const loadAIProjectDetail = () => import('./components/AIProjectDetail')
const loadNotFound = () => import('./components/NotFound')

const About = lazy(loadAbout)
const Contact = lazy(loadContact)
const ProjectDetail = lazy(loadProjectDetail)
const StrategyDetail = lazy(loadStrategyDetail)
const AIProjectDetail = lazy(loadAIProjectDetail)
const NotFound = lazy(loadNotFound)

// Warm the page chunks after first load so later navigation is instant,
// without putting them on the critical path.
const usePrefetchPages = () => {
  useEffect(() => {
    const prefetch = () =>
      [loadAbout, loadContact, loadProjectDetail, loadStrategyDetail, loadAIProjectDetail].forEach(
        (load) => load(),
      )
    // Safari has no requestIdleCallback, so fall back to a short timeout there
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(prefetch, 2500)
    return () => clearTimeout(id)
  }, [])
}

const Page = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={null}>{children}</Suspense>
)

const ScrollToHash = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // The target page mounts only after the previous page's exit animation,
    // so keep looking for the anchor briefly instead of a single fixed delay.
    const id = decodeURIComponent(hash.slice(1))
    const deadline = Date.now() + 2000
    let timer: ReturnType<typeof setTimeout>
    const tryScroll = () => {
      const element = document.getElementById(id)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
      else if (Date.now() < deadline) timer = setTimeout(tryScroll, 50)
    }
    timer = setTimeout(tryScroll, 50)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

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
      <div
        className="container"
        style={{
          paddingTop: '100px',
          paddingBottom: '200px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ProfileCard
          image={aboutData.profileImage}
          text="Intrigued?"
          subtext="Learn more about me"
          link="/about"
          size="large"
        />
      </div>
    </motion.div>
  )
}

function AppContent() {
  const location = useLocation()
  usePrefetchPages()

  return (
    <div className="app">
      <CustomCursor />
      <ThemeSwitcher />
      <Decorations />
      <Navbar />
      <ScrollToHash />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route
              path="/about"
              element={
                <Page>
                  <About />
                </Page>
              }
            />
            <Route
              path="/contact"
              element={
                <Page>
                  <Contact />
                </Page>
              }
            />
            <Route
              path="/project/:projectId"
              element={
                <Page>
                  <ProjectDetail />
                </Page>
              }
            />
            <Route
              path="/strategy/:strategyId"
              element={
                <Page>
                  <StrategyDetail />
                </Page>
              }
            />
            <Route
              path="/ai-project/:projectId"
              element={
                <Page>
                  <AIProjectDetail />
                </Page>
              }
            />
            {/* Catch-all route to catch bad URLs */}
            <Route
              path="*"
              element={
                <Page>
                  <NotFound />
                </Page>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
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
