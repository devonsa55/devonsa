import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chillwave } from './Decorations';

const Hero = () => {
  const words = ["designer", "thinker", "strategist", "prototyper", "storyteller", "builder", "leader"];
  const highlightColors = [
    'var(--cyan-blue)',
    'var(--aqua-green)',
    'var(--tangerine)',
    'var(--amethyst)',
    'var(--light-red)'
  ];

  const [index, setIndex] = useState(0);
  const HERO_HIGHLIGHT_COLOR = highlightColors[index % highlightColors.length];

  const [isSurfing, setIsSurfing] = useState(false);
  const [isHonoluluHovered, setIsHonoluluHovered] = useState(false);
  const [isAudioHovered, setIsAudioHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const centerX = rect.width / 2;
    const offset = (x - centerX) / centerX; // normalized -1 to 1
    // Apply a maximum shift of 15px
    setMouseX(offset * 15);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // Reduced to 2.5 seconds
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="hero">
      <div className="container hero-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text"
        >

          <h1 style={{ position: 'relative' }}>
            I'm a product
            <span
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setMouseX(0); // Reset offset
              }}
              style={{
                display: 'inline-block',
                width: 'auto',
                marginLeft: '0.25em',
                marginRight: '0.1em',
                position: 'relative',
                verticalAlign: 'baseline',
                cursor: 'default'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.em
                  key={words[index]}
                  initial={{ opacity: 0, y: 10, color: HERO_HIGHLIGHT_COLOR }}
                  animate={{ opacity: 1, y: 0, color: HERO_HIGHLIGHT_COLOR }}
                  exit={{ opacity: 0, y: -10, color: HERO_HIGHLIGHT_COLOR }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'inline-block',
                    fontStyle: 'italic',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.15
                  }}
                >
                  {words[index]}
                </motion.em>
              </AnimatePresence>
              <motion.span
                initial={{ opacity: 0, x: -10, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{
                  position: 'absolute',
                  left: '115%',
                  top: '.5em',
                  marginLeft: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.4em',
                  color: 'var(--text-quinary)',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  fontWeight: 700,
                  letterSpacing: '0.02em'
                }}
              >
                @ Google
              </motion.span>
            </span>,
            <br />
            <span
              className="hover-trigger"
              onMouseEnter={() => setIsSurfing(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setIsSurfing(false);
                setMouseX(0);
              }}
              style={{
                position: 'relative',
                cursor: 'help',
                marginRight: '0.1em'
              }}
            >
              surfer,
              <AnimatePresence>
                {isSurfing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: '-120%', y: '-50%' }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: `calc(-110% + ${mouseX}px)`,
                      y: '-50%'
                    }}
                    exit={{ opacity: 0, scale: 0.5, x: '-120%', y: '-50%' }}
                    className="hover-decoration"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '0',
                      pointerEvents: 'none',
                      zIndex: 100 // High z-index for hover
                    }}
                  >
                    <Chillwave size={160} />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>{' '}
            & <span
              className="hover-trigger"
              onMouseEnter={() => setIsAudioHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setIsAudioHovered(false);
                setMouseX(0);
              }}
              style={{
                position: 'relative',
                cursor: 'help'
              }}
            >
              audio enthusiast
              <AnimatePresence>
                {isAudioHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: 20, y: '-50%', rotate: -15 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 15 + mouseX,
                      y: '-50%',
                      rotate: 10
                    }}
                    exit={{ opacity: 0, scale: 0.5, x: 20, y: '-50%', rotate: -15 }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '100%',
                      fontSize: '2rem',
                      pointerEvents: 'none',
                      zIndex: 100,
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      gap: '4px',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {['♪', '♪', '♪'].map((note, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          y: [0, -15, 0],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      >
                        {note}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </span><br />
            currently living in <span
              className="hover-trigger"
              onMouseEnter={() => setIsHonoluluHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setIsHonoluluHovered(false);
                setMouseX(0);
              }}
              style={{
                position: 'relative',
                cursor: 'help',
                marginLeft: '0.1em'
              }}
            >
              Honolulu, HI.
              <AnimatePresence>
                {isHonoluluHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: mouseX, y: 10 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: mouseX,
                      y: 20
                    }}
                    exit={{ opacity: 0, scale: 0.5, x: mouseX, y: 10 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '3rem',
                      pointerEvents: 'none',
                      zIndex: 100,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    🌴🏖️🥥
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="scroll-nudge"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hero {
          padding-top: 100px; /* Account for fixed navbar height */
          padding-bottom: 0;
          min-height: 85vh; /* Allow work to peek */
          overflow: visible;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          justify-content: center;
          padding-bottom: 0; /* Centered perfectly on Y-axis */
        }

        .hero-text h1 {
          font-size: clamp(2.5rem, 6.2vw, 4.75rem);
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          color: var(--text-primary);
          line-height: 1.15;
          max-width: 100vw;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .hover-trigger {
          display: inline-block;
          color: var(--text-primary);
          position: relative;
          text-decoration: none;
          z-index: 1;
        }

        .hover-trigger::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1.5px;
          bottom: 6px;
          left: 0;
          background-color: #000;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }

        .hover-trigger:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .hover-decoration {
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
        }

        .scroll-nudge {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          color: var(--text-secondary);
          opacity: 0.7;
          pointer-events: none;
        }

        .text-highlight {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }


        @media (max-width: 820px) {
          .hero-text h1 {
            /* Now handled by linear clamp above */
          }
        }
      `}} />
    </section >
  );
};

export default Hero;
