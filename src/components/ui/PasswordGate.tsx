import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Unlock, Loader2, CircleAlert, Eye, EyeOff } from 'lucide-react'
import { decryptUrl } from '../../utils/crypto'

const SALT = '6b951e0eebdf8ca4985db032cef2a632'
const IV = '19e8d960a836c265948883b0'
const CIPHERTEXT =
  '7825ee804734d757403b8e30e511e75554e9cec7d5875d180fe01860af9e0248a65aa90cd465000328612e8ef64734a415c81d44c40c4e058557ab2f5e17384b23e650106371b8e987af7701f426f704c301c58d08fa7eec69fc0dbe070938968a8e537b1e641638f4cf026f74866a4180d109e1f4f946c7f66dae94f749fcbe9186bfd04d9c2af99bf07af2470a84e195da8ef9598de4bcf37ee37c6c689c693952578cc0be7c8119161c2aac4431e1430908a2bd2ff7cec838'
const AUTH_TAG = '7ba19e898f82959ad122855d58054aed'

interface PasswordGateProps {
  onUnlock?: (url: string) => void
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [decryptedUrl, setDecryptedUrl] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [shouldShake, setShouldShake] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setIsLoading(true)
    setError('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 800)) // Smooth transition time
      const url = await decryptUrl(password, SALT, IV, CIPHERTEXT, AUTH_TAG)
      setDecryptedUrl(url)
      setIsUnlocked(true)
      if (onUnlock) onUnlock(url)
    } catch (err) {
      setError('Incorrect password. Please try again.')
      setShouldShake(true)
      setTimeout(() => setShouldShake(false), 500)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="password-gate-container w-full max-w-6xl mx-auto my-12">
      <div className="deck-player-frame w-full aspect-video rounded-[32px] overflow-hidden border-2 border-text-primary bg-bg-secondary relative">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="lock-screen"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {/* Actual Case Study Hero Background Image with Theme-aware Vignette */}
              <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
                <img
                  src="/images/projects/conversational-insights/agentic-hero.png"
                  className="w-full h-full object-cover opacity-20 dark:opacity-40 filter blur-[2px]"
                  alt="Case study preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-bg-primary/80" />
              </div>

              {/* Coherent Themed Decryption Card */}
              <motion.div
                animate={{
                  x: shouldShake ? [0, -10, 10, -10, 10, -5, 5, 0] : 0,
                }}
                transition={{
                  type: shouldShake ? 'linear' : 'spring',
                  duration: shouldShake ? 0.4 : 0.6,
                }}
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
                  Enter the password to load the interactive presentation deck.
                </p>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
                  <div className="relative w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-5 py-3.5 bg-bg-primary text-text-primary rounded-xl border-2 border-text-primary focus:outline-none transition-all pr-12 text-center placeholder:text-text-quinary text-sm font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {error && (
                    <div className="flex items-center justify-center gap-2 text-rose-500 dark:text-rose-400 text-xs font-bold mt-1">
                      <CircleAlert size={14} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !password}
                    className="w-full mt-1.5 py-3.5 font-bold text-sm rounded-xl hover:shadow-hover hover:-translate-y-[2px] active:scale-[0.98] border-2 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:scale-100"
                    style={{
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                      borderColor: 'var(--text-primary)',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Initializing...</span>
                      </>
                    ) : (
                      <>
                        <Unlock size={16} />
                        <span>Unlock & Load Deck</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="figma-embed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <iframe
                title="Figma Deck"
                style={{ border: 'none' }}
                width="100%"
                height="100%"
                src={decryptedUrl}
                allow="clipboard-write; encrypted-media; picture-in-picture; web-share; pointer-lock; autoplay"
                allowFullScreen
              ></iframe>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
