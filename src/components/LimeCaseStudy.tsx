import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import ProfileCard from './ui/ProfileCard'
import ViewModeToggle, { ViewMode } from './ui/ViewModeToggle'
import NotFound from './NotFound'
import { fadeIn, fadeInUp, EASE_OUT } from '../utils/motion'
import { isFlagEnabled } from '../utils/flags'
import {
  limeMeta,
  limeChapters,
  limeToday,
  limeEntry,
  limeQuestions,
  limeMoments,
  limeEndings,
  limeCardImage,
  limeCardParts,
  limeStatus,
  type LimeVisual,
} from '../data/lime'
import '../styles/components/LimeCaseStudy.css'

const TODAY_VISUAL = (
  <div className="lime-phones">
    {limeToday.map((phone) => (
      <figure key={phone.label} className="lime-phone">
        <figcaption className="lime-mono-label">{phone.label}</figcaption>
        <img src={phone.src} alt={phone.alt} width={720} height={1561} loading="lazy" />
      </figure>
    ))}
  </div>
)

const QUESTIONS_VISUAL = (
  <ol className="lime-rows">
    {limeQuestions.map((item) => (
      <li key={item.label} className="lime-row">
        <div>
          <p className="lime-row-lead">{item.question}</p>
          <p className="lime-mono-label">{item.label}</p>
        </div>
        <p className="lime-row-statement">{item.answer}</p>
      </li>
    ))}
  </ol>
)

const ENTRY_VISUAL = (
  <div className="lime-entry">
    <div className="lime-entry-group">
      <p className="lime-mono-label">Today</p>
      <div className="lime-entry-today">
        {limeEntry.today.map((phone) => (
          <img
            key={phone.src}
            src={phone.src}
            alt={phone.alt}
            width={640}
            height={1387}
            loading="lazy"
          />
        ))}
      </div>
    </div>
    <ArrowRight className="lime-entry-arrow" size={32} aria-hidden="true" />
    <div className="lime-entry-group">
      <p className="lime-mono-label lime-green">Where I landed</p>
      <div className="lime-entry-landed">
        <img
          src={limeEntry.landed.src}
          alt={limeEntry.landed.alt}
          width={900}
          height={1950}
          loading="lazy"
        />
      </div>
    </div>
  </div>
)

const waiting = limeMoments.groups[0]
const rest = limeMoments.groups.slice(1)

const MOMENTS_VISUAL = (
  <div className="lime-moments">
    <div
      className="lime-moment-grid"
      role="img"
      aria-label={`${limeMoments.total} moments: ${limeMoments.groups
        .map((group) => `${group.count} ${group.label.toLowerCase()}`)
        .join(', ')}.`}
    >
      {Array.from({ length: limeMoments.total }, (_, index) => (
        <span key={index} className={index < waiting.count ? 'is-wait' : undefined} />
      ))}
    </div>
    <div className="lime-moment-legend" aria-hidden="true">
      <p className="lime-moment-stat">
        <span className="lime-green">{waiting.count}</span> of {limeMoments.total}
      </p>
      <p className="lime-mono-label lime-green">
        {waiting.label} · {waiting.count}
      </p>
      <p className="lime-mono-label">
        {rest.map((group) => `${group.label} ${group.count}`).join(' · ')}
      </p>
    </div>
  </div>
)

const ENDINGS_VISUAL = (
  <div className="lime-endings">
    {limeEndings.map((ending) => (
      <div key={ending.label} className="lime-ending">
        <p className="lime-mono-label">{ending.label}</p>
        {ending.video && <video src={ending.video} controls muted playsInline preload="metadata" />}
        <p className="lime-row-statement">{ending.title}</p>
        <p className="lime-ending-body">{ending.body}</p>
      </div>
    ))}
  </div>
)

const CARD_VISUAL = (
  <div className="lime-card-anatomy">
    <div className="lime-card-figure">
      <img
        src={limeCardImage.src}
        alt={limeCardImage.alt}
        width={1200}
        height={1170}
        loading="lazy"
      />
      {limeCardParts.map((part) => (
        <span
          key={part.key}
          className="lime-marker lime-marker-pin"
          style={{ top: `${part.top}%` }}
          aria-hidden="true"
        >
          {part.key}
        </span>
      ))}
    </div>
    <table className="lime-card-table">
      <thead>
        <tr>
          <th scope="col">Part</th>
          <th scope="col">Question it answers</th>
          <th scope="col">Rule</th>
        </tr>
      </thead>
      <tbody>
        {limeCardParts.map((part) => (
          <tr key={part.key}>
            <th scope="row">
              <span className="lime-marker" aria-hidden="true">
                {part.key}
              </span>
              {part.part}
            </th>
            <td className="lime-card-question">{part.question}</td>
            <td>{part.rule}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const STATUS_VISUAL = (
  <ol className="lime-rows">
    {limeStatus.map((item) => (
      <li key={item.label} className="lime-row">
        <p className="lime-mono-label">{item.label}</p>
        <div>
          <p className="lime-row-statement">{item.statement}</p>
          <p className="lime-row-note">{item.note}</p>
        </div>
      </li>
    ))}
  </ol>
)

const visuals: Record<LimeVisual, React.ReactNode> = {
  today: TODAY_VISUAL,
  questions: QUESTIONS_VISUAL,
  entry: ENTRY_VISUAL,
  moments: MOMENTS_VISUAL,
  endings: ENDINGS_VISUAL,
  card: CARD_VISUAL,
  status: STATUS_VISUAL,
}

// Hides the back bar while scrolling down, like the other case studies
const useNavVisible = () => {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (y < 50) setVisible(true)
      else if (y > lastScrollY.current + 5) setVisible(false)
      else if (y < lastScrollY.current - 5) setVisible(true)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return visible
}

const LimeCaseStudy: React.FC = () => {
  const [enabled] = useState(() => isFlagEnabled('lime'))
  const [searchParams, setSearchParams] = useSearchParams()
  const navVisible = useNavVisible()

  // The in-depth view has its own address (?view=full) so it can be linked to
  const mode: ViewMode = searchParams.get('view') === 'full' ? 'deck' : 'summary'
  const setMode = (next: ViewMode) => {
    const params = new URLSearchParams(searchParams)
    if (next === 'deck') params.set('view', 'full')
    else params.delete('view')
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }

  if (!enabled) return <NotFound />

  const isDeep = mode === 'deck'
  const chapters = limeChapters.filter((chapter) => isDeep || !chapter.deepOnly)

  return (
    <motion.div {...fadeIn} className="project-detail slack-template lime-case-study">
      <motion.nav
        initial={false}
        animate={{ y: navVisible ? 0 : -100, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="sticky-nav-wrapper"
      >
        <div className="nav-container">
          <Link to="/#work" className="back-link">
            <ArrowLeft size={18} />
            <span>Back to Work</span>
          </Link>
        </div>
      </motion.nav>

      <div className="container">
        <header className="slack-header">
          <p className="lime-mono-label lime-kicker">
            Lime · Prototype, not yet tested with riders
          </p>
          <motion.h1 {...fadeInUp}>{limeMeta.title}</motion.h1>
          <motion.p className="slack-intro-text" {...fadeInUp} transition={{ delay: 0.1 }}>
            {limeMeta.intro}
          </motion.p>
          <ViewModeToggle
            mode={mode}
            onModeChange={setMode}
            labels={{ summary: 'Quick read', deck: 'In depth' }}
            locked={false}
          />
        </header>
      </div>

      <div className="slack-metadata-fullwidth">
        <div className="container">
          <dl className="lime-facts">
            {limeMeta.facts.map((fact) => (
              <div key={fact.label} className="meta-col">
                <dt className="meta-label">{fact.label}</dt>
                <dd className="meta-value">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="container">
        <div className={`lime-chapters ${isDeep ? 'is-deep' : 'is-quick'}`}>
          {chapters.map((chapter) => {
            const visual = chapter.visual && (
              <figure className="lime-figure">
                <div className="lime-panel">{visuals[chapter.visual]}</div>
                {isDeep && chapter.caption && <figcaption>{chapter.caption}</figcaption>}
              </figure>
            )

            return isDeep ? (
              <section key={chapter.id} className="lime-chapter" aria-labelledby={chapter.id}>
                <div className="lime-chapter-text">
                  <p className="lime-mono-label">{chapter.eyebrow}</p>
                  <h2 id={chapter.id}>{chapter.title}</h2>
                  {chapter.deep.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {visual}
              </section>
            ) : (
              <section key={chapter.id} className="lime-chapter" aria-labelledby={chapter.id}>
                {visual}
                <div className="slack-annotation">
                  <p className="lime-mono-label">{chapter.eyebrow}</p>
                  <h2 id={chapter.id}>{chapter.title}</h2>
                  <p>{chapter.quick}</p>
                </div>
              </section>
            )
          })}
        </div>

        {!isDeep && (
          <div className="lime-more">
            <button type="button" className="lime-more-button" onClick={() => setMode('deck')}>
              Read the in-depth version
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="project-footer slack-footer">
          <ProfileCard
            icon={<Home size={20} />}
            text="Back to Home"
            subtext="See more of my work"
            link="/"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default LimeCaseStudy
