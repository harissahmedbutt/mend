/**
 * Canonical company / brand facts.
 *
 * Single source of truth for things that appear in metadata, structured data,
 * and the UI (legal pages, footer). Keep this in sync with the real business
 * details before launch.
 */

export const COMPANY = {
  /** Trading / brand name. */
  name: 'Mend',
  /** Registered legal entity. */
  legalName: 'Mend Technologies Ltd',
  /** Production origin — used as canonical + metadataBase. */
  url: 'https://mend.ae',
  /** One-line description reused across metadata + JSON-LD. */
  description:
    'Premium, Sharia-compliant financing for medical, dental, fertility and cosmetic treatment in the UAE. Check your rate in minutes, with no impact on your credit. Plans from AED 250/month.',
  /** Support / general enquiries. */
  email: 'hello@mend.ae',
  /** Operating region. */
  areaServed: 'AE',
  locale: 'en_AE',
  /** Lowest advertised monthly plan, in AED. */
  fromMonthlyAed: 250,
  /** Social / external profiles for sameAs. Add real handles before launch. */
  sameAs: [] as string[],
} as const

export type Company = typeof COMPANY
