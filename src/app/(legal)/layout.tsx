import Link from 'next/link'

/**
 * Shared chrome for legal/content pages (Terms, Privacy, Cookies):
 * a minimal wordmark header, a centered prose column, and a back link.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-cream">
      <header className="border-b border-black/5">
        <div className="container-width flex items-center justify-between py-5">
          <Link
            href="/"
            className="select-none font-serif text-[24px] font-semibold tracking-tight text-brand-navy"
          >
            mend
          </Link>
          <Link href="/" className="text-[14px] text-gray-500 transition-colors hover:text-brand-navy">
            ← Back to home
          </Link>
        </div>
      </header>

      <main id="main" className="container-width py-16 lg:py-24">
        <article className="prose prose-neutral mx-auto max-w-2xl prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-brand-navy prose-a:text-brand-navy">
          {children}
        </article>
      </main>
    </div>
  )
}
