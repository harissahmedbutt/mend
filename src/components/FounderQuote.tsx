import Image from 'next/image'

type Plan = {
  title: string
  price: string
  description: string
}

const PLANS: Plan[] = [
  {
    title: 'Short term — 3 to 6 months',
    price: '0% APR',
    description:
      'Ideal for smaller treatments you want cleared quickly. Interest-free on eligible plans, with low fixed payments.',
  },
  {
    title: 'Standard — 12 to 24 months',
    price: 'From 0% APR',
    description:
      'Our most popular choice. Spread larger treatments like orthodontics or fertility into comfortable monthly amounts.',
  },
  {
    title: 'Extended — up to 36 months',
    price: 'Subject to status',
    description:
      'For major medical or surgical costs, keep monthly payments low across a longer, fully fixed term.',
  },
]

export default function FounderQuote() {
  return (
    <section id="founder" className="bg-brand-cream section-padding">
      <div className="container-width">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Founder quote */}
          <figure className="max-w-md">
            <span
              aria-hidden="true"
              className="block font-serif text-7xl leading-none text-brand-navy/25"
            >
              &ldquo;
            </span>

            <blockquote className="mt-2 font-serif text-2xl leading-snug text-brand-navy lg:text-3xl">
              No one should have to choose between their health and their savings. We built
              Mend so the question is never &ldquo;can I afford it this month&rdquo; &mdash; it&rsquo;s simply
              &ldquo;when would you like to begin&rdquo;.
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-3">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Mend founder"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span>
                <span className="text-[14px] font-semibold text-brand-navy">Layla Haddad</span>{' '}
                <span className="text-[13px] text-gray-500">Founder</span>
              </span>
            </figcaption>
          </figure>

          {/* RIGHT: Plan options */}
          <div>
            <ul role="list">
              {PLANS.map((plan, index) => (
                <li
                  key={plan.title}
                  className={index === 0 ? 'py-6 first:pt-0' : 'border-t border-black/10 py-6'}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-semibold text-brand-navy">{plan.title}</h3>
                    <span className="shrink-0 text-[13px] text-gray-500">{plan.price}</span>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
                    {plan.description}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[12px] leading-relaxed text-gray-500">
              Available terms and rates depend on the treatment, the clinic and your eligibility.
              Finance is subject to status.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
