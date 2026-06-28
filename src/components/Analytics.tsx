'use client'

import { useEffect } from 'react'
import { track, type AnalyticsEvent } from '@/lib/analytics'

/**
 * Mounts once in the root layout. Uses a single delegated click listener so
 * server components can opt into tracking declaratively with a data attribute —
 * no need to make every CTA a client component:
 *
 *   <a href="/apply" data-analytics="rate_check_started">Check your rate</a>
 *
 * `track()` itself is gated on cookie consent, so nothing fires until the user
 * accepts analytics.
 */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const el = target?.closest<HTMLElement>('[data-analytics]')
      if (!el) return
      const event = el.dataset.analytics as AnalyticsEvent | undefined
      if (event) track(event, { href: (el as HTMLAnchorElement).href ?? '' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
