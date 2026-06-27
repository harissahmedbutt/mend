/**
 * Tiny, privacy-first analytics wrapper.
 *
 * Events are only delivered after the user has accepted analytics cookies
 * (see `@/lib/consent`). Until then they are dropped. The actual delivery
 * mechanism is intentionally pluggable: swap `deliver()` for your provider
 * (Vercel Analytics, Plausible, PostHog, a first-party endpoint, …).
 */

import { getConsent } from '@/lib/consent'

export type AnalyticsEvent =
  | 'rate_check_started'
  | 'rate_check_completed'
  | 'cta_clicked'

type Props = Record<string, string | number | boolean>

function deliver(event: AnalyticsEvent, props?: Props): void {
  // Placeholder delivery — replace with a real provider call before launch.
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info('[analytics]', event, props ?? {})
  }
  // Example real integration:
  // navigator.sendBeacon('/api/track', JSON.stringify({ event, props }))
}

export function track(event: AnalyticsEvent, props?: Props): void {
  if (typeof window === 'undefined') return
  if (getConsent() !== 'accepted') return
  deliver(event, props)
}
