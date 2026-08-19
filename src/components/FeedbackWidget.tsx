import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { supabase } from '../lib/supabase'

const NAME_MAX = 100
const MESSAGE_MAX = 500

const FeedbackWidget = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    setLoading(true)
    const { error: insertError } = await supabase
      .from('messages')
      .insert({ name: name.trim(), message: message.trim() })
    setLoading(false)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      return
    }

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

              {error && (
                <p className="rounded-[10px] border border-red-500/35 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
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
