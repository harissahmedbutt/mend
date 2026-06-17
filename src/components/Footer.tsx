const DISCLAIMER =
  'Mend is a treatment-financing platform that helps people in the UAE spread the cost of medical, dental, fertility and cosmetic care into manageable monthly payments. Mend is not a clinic and does not provide medical advice. Finance is subject to status and eligibility.'

const FOOTER_LINKS: ReadonlyArray<{
  title: string
  links: ReadonlyArray<{ label: string; href: string }>
}> = [
  {
    title: 'Product',
    links: [
      { label: 'What we finance', href: '/#services' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Rates', href: '/#pricing' },
      { label: 'For clinics', href: '/apply' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/apply' },
      { label: 'Privacy Policy', href: '/apply' },
      { label: 'Manage cookies', href: '/apply' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-cream-warm text-brand-navy">
      <div className="container-width section-padding">
        {/* Top area: brand + link columns */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          {/* Brand column */}
          <div className="max-w-md">
            <a
              href="/"
              className="font-serif text-3xl lowercase tracking-tight text-brand-navy"
              aria-label="Mend home"
            >
              mend
            </a>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-gray-500">{DISCLAIMER}</p>
          </div>

          {/* Link columns */}
          <div className="flex gap-16 sm:gap-24">
            {FOOTER_LINKS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-[14px] font-semibold text-brand-navy">{group.title}</h2>
                <ul className="mt-5 space-y-4">
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[14px] text-gray-500 transition-colors duration-150 hover:text-brand-navy"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-2 border-t border-black/10 pt-8 text-[13px] text-gray-500">
          <p>© 2026 Mend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
