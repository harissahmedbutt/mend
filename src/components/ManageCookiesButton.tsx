'use client'

import { openConsentManager } from '@/lib/consent'

/**
 * Re-opens the cookie consent banner so the user can change their choice.
 * Styled to sit inline with surrounding link/text; pass `className` to match
 * the local context (footer link vs. prose link).
 */
export default function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentManager} className={className}>
      Manage cookies
    </button>
  )
}
