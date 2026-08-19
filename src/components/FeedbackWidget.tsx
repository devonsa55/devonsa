import { useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Turnstile, { type TurnstileHandle } from './ui/Turnstile'

const NAME_MAX = 100
const MESSAGE_MAX = 500
const SUBMITTED_AT_KEY = 'fw-submitted-at'
const RESUBMIT_COOLDOWN_MS = 24 * 60 * 60 * 1000 // 24h
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

const FeedbackWidget = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(() => {
    const lastSubmittedAt = Number(localStorage.getItem(SUBMITTED_AT_KEY) || 0)
    return Date.now() - lastSubmittedAt < RESUBMIT_COOLDOWN_MS
  })
  const [error, setError] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileHandle>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Honeypot: silently pretend success for bots
    if (website) {
      setSent(true)
      return
    }

    if (!name.trim() || !message.trim()) {
      setError('Please fill in both name and message.')
      return
    }

    if (!turnstileToken) {
      setError('Please complete the verification check.')
      return
    }

    setLoading(true)
    const { data, error: invokeError } = await supabase.functions.invoke('verify-feedback', {
      body: { name: name.trim(), message: message.trim(), turnstileToken },
    })
    setLoading(false)

    if (invokeError || data?.error) {
      setError(data?.error || 'Something went wrong. Please try again.')
      turnstileRef.current?.reset()
      setTurnstileToken('')
      return
    }

    localStorage.setItem(SUBMITTED_AT_KEY, String(Date.now()))
    setSent(true)
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-8 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success)] text-white">
                <Check size={22} />
              </div>
              <p className="font-heading text-xl font-semibold text-text-primary">
                Thanks for reaching out!
              </p>
              <p className="max-w-[360px] text-sm text-[var(--text-secondary)]">
                Your message has been saved to my Supabase database and I&apos;ll review it shortly.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Honeypot */}
              <div aria-hidden="true" className="hidden">
                <label htmlFor="fw-website">Website</label>
                <input
                  id="fw-website"
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fw-name"
                  className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
                >
                  Name ({name.length}/{NAME_MAX})
                </label>
                <input
                  id="fw-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={NAME_MAX}
                  disabled={loading}
                  required
                  className="rounded-[10px] border-2 border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.95rem] text-text-primary outline-none transition-colors placeholder:text-[var(--text-quinary)] focus:border-[var(--text-primary)] disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fw-message"
                  className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
                >
                  Message ({message.length}/{MESSAGE_MAX})
                </label>
                <textarea
                  id="fw-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={5}
                  maxLength={MESSAGE_MAX}
                  disabled={loading}
                  required
                  className="resize-none rounded-[10px] border-2 border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.95rem] text-text-primary outline-none transition-colors placeholder:text-[var(--text-quinary)] focus:border-[var(--text-primary)] disabled:opacity-50"
                />
              </div>

              {TURNSTILE_SITE_KEY && (
                <Turnstile
                  ref={turnstileRef}
                  siteKey={TURNSTILE_SITE_KEY}
                  onVerify={setTurnstileToken}
                  onExpire={() => setTurnstileToken('')}
                />
              )}

              {error && (
                <p className="rounded-[10px] border border-red-500/35 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
                className="btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FeedbackWidget
