import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeInUp } from '../utils/motion'
import { Github, Linkedin, FileText, MessageSquareHeart, ChevronDown } from 'lucide-react'
import { aboutData } from '../data/about'
import FeedbackWidget from './FeedbackWidget'

const Contact = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section
        id="contact"
        className="pt-[20vh] pb-[20vh] bg-bg-primary relative bg-[radial-gradient(var(--dot-color-contact)_calc(var(--dot-size)*var(--show-dot-grid-contact)),transparent_0)] bg-[length:var(--dot-space)_var(--dot-space)] bg-[position:var(--grid-align-offset)]"
      >
        <div className="container">
          <div className="max-w-[800px] mx-auto flex flex-col">
            <div className="text-left mb-0">
              <motion.h1
                {...fadeInUp}
                transition={{ delay: 0.1 }}
                className="text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.1] text-text-primary font-heading max-w-none"
              >
                Let&apos;s build something <br />
                <em className="font-['Newsreader',serif] italic font-medium pr-[0.4ch]">
                  meaningful
                </em>{' '}
                together.
              </motion.h1>

              <motion.p
                {...fadeInUp}
                transition={{ delay: 0.15 }}
                className="mt-6 text-[clamp(1.25rem,4vw,1.8rem)] leading-[1.35] text-text-primary font-medium font-heading text-left"
              >
                Whether you have a specific project in mind or just want to chat about design,
                tools, or AI—I&apos;d love to hear from you.
              </motion.p>
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 mt-16"
            >
              <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <a
                  href="https://github.com/devonsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 bg-bg-primary border-2 border-text-primary rounded-[var(--radius-card)] no-underline text-text-primary transition-all duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-hover hover:-translate-y-[4px]"
                >
                  <div className="text-text-primary flex items-center justify-center shrink-0">
                    <Github size={22} />
                  </div>
                  <div className="method-info">
                    <span className="block text-[0.7rem] uppercase tracking-[0.1em] opacity-50 mb-0.5">
                      GitHub
                    </span>
                    <p className="text-[1rem] font-semibold m-0 tracking-tight">
                      Check out my code
                    </p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/devonsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 bg-bg-primary border-2 border-text-primary rounded-[var(--radius-card)] no-underline text-text-primary transition-all duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-hover hover:-translate-y-[4px]"
                >
                  <div className="text-text-primary flex items-center justify-center shrink-0">
                    <Linkedin size={22} />
                  </div>
                  <div className="method-info">
                    <span className="block text-[0.7rem] uppercase tracking-[0.1em] opacity-50 mb-0.5">
                      LinkedIn
                    </span>
                    <p className="text-[1rem] font-semibold m-0 tracking-tight">Connect with me</p>
                  </div>
                </a>

                <a
                  href={aboutData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 bg-bg-primary border-2 border-text-primary rounded-[var(--radius-card)] no-underline text-text-primary transition-all duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-hover hover:-translate-y-[4px]"
                >
                  <div className="text-text-primary flex items-center justify-center shrink-0">
                    <FileText size={22} />
                  </div>
                  <div className="method-info">
                    <span className="block text-[0.7rem] uppercase tracking-[0.1em] opacity-50 mb-0.5">
                      Resume / CV
                    </span>
                    <p className="text-[1rem] font-semibold m-0 tracking-tight">
                      View my experience
                    </p>
                  </div>
                </a>
              </div>

              <div
                className={`overflow-hidden rounded-[var(--radius-card)] !border-solid !border-2 !border-text-primary bg-bg-primary transition-all duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isFeedbackOpen ? '' : 'hover:-translate-y-[4px] hover:shadow-hover'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsFeedbackOpen((open) => !open)}
                  aria-expanded={isFeedbackOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left outline-none"
                >
                  <div className="flex shrink-0 items-center justify-center text-text-primary">
                    <MessageSquareHeart size={22} />
                  </div>
                  <div className="method-info flex-1">
                    <p className="m-0 text-[1rem] font-semibold tracking-tight">
                      Feedback is a gift
                    </p>
                    <span className="mt-0.5 block text-[0.85rem] text-[var(--text-secondary)]">
                      If you have thoughts on how I could improve this portfolio—or just want to
                      leave something kind—I&apos;d genuinely love to hear it.
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-text-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isFeedbackOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isFeedbackOpen && (
                    <motion.div
                      key="feedback-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="!border-solid !border-t-2 !border-text-primary px-5 pb-5 pt-5">
                        <FeedbackWidget />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact
