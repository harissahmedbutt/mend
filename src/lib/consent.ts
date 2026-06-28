/**
 * Cookie-consent state shared by the consent banner, the "Manage cookies"
 * footer control, and analytics loading.
 *
 * Consent is all-or-nothing for non-essential (analytics) cookies:
 *   'accepted' → analytics may load
 *   'declined' → analytics must not load
 *   null       → no decision yet; banner should show
 */

export const CONSENT_KEY = 'mend-cookie-consent'

export type Consent = 'accepted' | 'declined'

/** Fired whenever consent changes; analytics listens for this. */
export const CONSENT_CHANGED = 'mend:consent-changed'
/** Fired to re-open the consent banner (e.g. from the footer). */
export const CONSENT_OPEN = 'mend:consent-open'

export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'accepted' || v === 'declined' ? v : null
  } catch {
    return null
  }
}

export function setConsent(value: Consent): void {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* ignore storage failures (private mode, blocked storage) */
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<Consent>(CONSENT_CHANGED, { detail: value }))
  }
}

/** Re-open the consent banner so the user can change their choice. */
export function openConsentManager(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CONSENT_OPEN))
  }
}
