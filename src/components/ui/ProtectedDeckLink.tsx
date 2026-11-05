import React from 'react'
import { Lock, ArrowUpRight } from 'lucide-react'

// The deck is password-protected by Figma itself, so this URL is not a secret.
// /deck/ opens the audience presentation view, not the slides editor.
const DECK_URL = 'https://www.figma.com/deck/AqjJArs2DUZWZWKZ5QCRTW'

export const ProtectedDeckLink: React.FC = () => (
  <div className="password-gate-container w-full max-w-6xl mx-auto my-12">
    <div className="deck-player-frame w-full aspect-video rounded-[32px] overflow-hidden border-2 border-text-primary bg-bg-secondary relative flex items-center justify-center">
      {/* Case study hero as a theme-aware, blurred backdrop */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <img
          src="/images/projects/conversational-insights/agentic-hero.webp"
          className="w-full h-full object-cover opacity-20 dark:opacity-40 filter blur-[2px]"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-bg-primary/80" />
      </div>

      <div
        className="w-full max-w-md mx-4 p-8 md:p-10 rounded-[24px] border-2 border-text-primary flex flex-col items-center text-center relative z-20"
        style={{ backgroundColor: 'var(--bg-secondary)', boxShadow: 'var(--neo-shadow)' }}
      >
        <div className="mb-5 p-4 rounded-full bg-bg-primary border-2 border-text-primary text-text-primary">
          <Lock size={24} />
        </div>

        <h3 className="text-xl font-bold text-text-primary font-heading mb-1.5">
          Protected Case Study
        </h3>
        <p className="text-text-secondary text-xs max-w-xs mb-6 leading-relaxed">
          The presentation deck opens in Figma and asks for the password I shared with you.
        </p>

        <a
          href={DECK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 font-bold text-sm rounded-xl hover:shadow-hover hover:-translate-y-[2px] active:scale-[0.98] border-2 transition-all flex items-center justify-center gap-2"
          style={{
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            borderColor: 'var(--text-primary)',
          }}
        >
          <span>Open deck in Figma</span>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  </div>
)
