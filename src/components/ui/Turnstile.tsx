import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

let scriptPromise: Promise<void> | null = null
function loadTurnstileScript() {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      if (window.turnstile) {
        resolve()
        return
      }
      const script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Turnstile'))
      document.head.appendChild(script)
    })
  }
  return scriptPromise
}

interface TurnstileProps {
  siteKey: string
  onVerify: (token: string) => void
  onExpire?: () => void
}

export interface TurnstileHandle {
  reset: () => void
}

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  ({ siteKey, onVerify, onExpire }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const widgetId = useRef<string | null>(null)
    const onVerifyRef = useRef(onVerify)
    const onExpireRef = useRef(onExpire)
    onVerifyRef.current = onVerify
    onExpireRef.current = onExpire

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetId.current && window.turnstile) {
          window.turnstile.reset(widgetId.current)
        }
      },
    }))

    useEffect(() => {
      let cancelled = false

      loadTurnstileScript().then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onVerifyRef.current(token),
          'expired-callback': () => onExpireRef.current?.(),
        })
      })

      return () => {
        cancelled = true
        if (widgetId.current && window.turnstile) {
          window.turnstile.remove(widgetId.current)
        }
      }
    }, [siteKey])

    return <div ref={containerRef} />
  },
)
Turnstile.displayName = 'Turnstile'

export default Turnstile
