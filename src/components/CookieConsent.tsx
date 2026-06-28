'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CONSENT_OPEN, getConsent, setConsent, type Consent } from '@/lib/consent'

export default function CookieConsent() {
  // Render nothing until mounted so server and client markup match (no hydration flash).
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show the banner only until a choice has been recorded.
    if (getConsent() === null) setVisible(true)

    // Allow the "Manage cookies" control to re-open the banner at any time.
    const reopen = () => setVisible(true)
    window.addEventListener(CONSENT_OPEN, reopen)
    return () => window.removeEventListener(CONSENT_OPEN, reopen)
  }, [])

  const choose = (value: Consent) => {
    setConsent(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] bg-brand-navy text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:gap-4 sm:px-6">
        <p className="flex-1 text-center text-[13px] leading-relaxed text-white/80 sm:text-left">
          Mend uses cookies to run the site and, with your consent, to understand how it&apos;s
          used. See our{' '}
          <Link
            href="/cookies"
            className="font-medium text-white underline underline-offset-2 hover:text-white/90"
          >
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => choose('declined')}
            className="rounded-full px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-brand-navy transition-colors hover:bg-white/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
