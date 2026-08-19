import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquarePlus, X, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'

const NAME_MAX = 100
const MESSAGE_MAX = 500

const FeedbackWidget = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = () => {
    setName('')
    setMessage('')
    setWebsite('')
    setSent(false)
    setError(null)
  }

  const close = () => {
    setOpen(false)
    setTimeout(reset, 300)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Honeypot: silently pretend success for bots
    if (website) {
      setSent(true)
      setTimeout(close, 1500)
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
    setTimeout(close, 1500)
  }

  return (
    <div className="fixed bottom-[4svh] left-4 z-40 lg:bottom-[5vh] lg:left-6">
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[min(360px,88vw)] origin-bottom-left rounded-[var(--radius-card)] border-[var(--border-width)] border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 shadow-[var(--neo-shadow)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-extrabold text-[var(--text-primary)]">
                Send feedback
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
              >
                <X size={18} />
              </button>
            </div>

            {sent ? (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-success)] text-white">
                  <Check size={20} />
                </div>
                <p className="font-medium text-[var(--text-primary)]">Thanks for reaching out!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    className="rounded-[10px] border-[var(--border-width)] border-[var(--border-subtle)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-quinary)] focus:border-[var(--text-primary)] disabled:opacity-50"
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
                    rows={4}
                    maxLength={MESSAGE_MAX}
                    disabled={loading}
                    required
                    className="resize-none rounded-[10px] border-[var(--border-width)] border-[var(--border-subtle)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-quinary)] focus:border-[var(--text-primary)] disabled:opacity-50"
                  />
                </div>

                {error && (
                  <p className="rounded-[10px] border border-red-500/35 bg-red-500/10 px-3.5 py-2 text-sm text-red-400">
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
              </form>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="fab"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4, transition: { type: 'tween', duration: 0.15, ease: 'easeOut' } }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'tween', duration: 0.1, ease: 'easeOut' },
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(true)}
            aria-label="Send feedback"
            className="flex h-[54px] w-[54px] items-center justify-center rounded-full border-[var(--border-width)] border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)] hover:shadow-[var(--shadow-hover)]"
          >
            <MessageSquarePlus size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackWidget
