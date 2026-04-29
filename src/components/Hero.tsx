import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chillwave } from './Decorations';
import TypewriterEffect from './ui/TypewriterEffect';

const words = ["designer", "builder", "thinker", "strategist", "leader"];
const highlightColors = [
  'var(--cyan-blue)',
  'var(--aqua-green)',
  'var(--tangerine)',
  'var(--amethyst)',
  'var(--light-red)'
];

const Hero = () => {
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

  return (
    <section className="pt-[20vh] md:pt-[220px] pb-[40px] md:pb-[80px] min-h-[85vh] overflow-visible relative flex items-center justify-center z-10">
      <div className="container flex flex-col items-start text-left relative z-[2] w-full h-full justify-center pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >

          <h1
            className="!m-0 text-[clamp(2.5rem,6.2vw,4.75rem)] text-text-primary leading-[1.15] max-w-[100vw] font-extrabold tracking-[-0.03em] relative"
          >
            I'm a product <br className="md:hidden" />
            <span
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setMouseX(0); // Reset offset
              }}
              className="inline-block relative align-baseline ml-0 md:ml-[0.25em] mr-[0.1em]"
              style={{
                width: 'auto',
              }}
            >
              <TypewriterEffect
                words={words}
                colors={highlightColors}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2000}
              />
              <motion.span
                initial={{ opacity: 0, x: -10, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute left-full top-[0.5em] ml-4 md:ml-10 font-mono font-bold whitespace-nowrap inline-block tracking-normal"
                style={{
                  fontSize: '.4em',
                  color: 'var(--text-quinary)',
                }}
              >
                @ Google
              </motion.span>
            </span>,
            <br />
            <span
              className="group inline-block text-text-primary relative no-underline z-[1] after:absolute after:w-full after:h-[1.5px] after:bottom-[6px] after:left-0 after:bg-text-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] after:-z-10 mr-[0.1em]"
              onMouseEnter={() => setIsSurfing(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setIsSurfing(false);
                setMouseX(0);
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
                    className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
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
              className="group inline-block text-text-primary relative no-underline z-[1] after:absolute after:w-full after:h-[1.5px] after:bottom-[6px] after:left-0 after:bg-text-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] after:-z-10"
              onMouseEnter={() => setIsAudioHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setIsAudioHovered(false);
                setMouseX(0);
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
              className="group inline-block text-text-primary relative no-underline z-[1] after:absolute after:w-full after:h-[1.5px] after:bottom-[6px] after:left-0 after:bg-text-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] after:-z-10 ml-[0.1em]"
              onMouseEnter={() => setIsHonoluluHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setIsHonoluluHovered(false);
                setMouseX(0);
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

      </div>
    </section>
  );
};

export default Hero;
