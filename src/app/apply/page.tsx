import type { Metadata } from 'next'
import RateCheckFlow from './RateCheckFlow'

export const metadata: Metadata = {
  title: 'Check your rate',
  description:
    'Check your rate for treatment financing with Mend — a soft check with no impact on your credit score.',
  // Kept out of the index until the flow ships publicly; flip to index when ready.
  robots: { index: false, follow: true },
}

export default function ApplyPage() {
  return <RateCheckFlow />
}
