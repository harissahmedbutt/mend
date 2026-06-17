import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Check your rate',
  description:
    'Check your rate for treatment financing with Mend — a soft check with no impact on your credit score.',
  robots: { index: false, follow: true },
}

export default function ApplyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-cream px-6 text-center">
      <Link
        href="/"
        className="select-none font-serif text-[28px] font-semibold tracking-tight text-brand-navy"
      >
        mend
      </Link>

      <h1 className="mt-10 max-w-lg font-serif text-4xl font-medium leading-tight text-brand-navy sm:text-5xl">
        Your rate check is on its way.
      </h1>
      <p className="mt-5 max-w-md text-[16px] leading-relaxed text-gray-500">
        The Mend application is a quick, conversational flow — tell us about your treatment, run a
        soft eligibility check, and choose a plan in minutes. It&apos;s coming soon.
      </p>

      <Link href="/" className="btn-primary mt-10">
        Back to home
      </Link>
    </main>
  )
}
