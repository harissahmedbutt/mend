type Feature = {
  title: string
  description: string
}

const features: Feature[] = [
  {
    title: 'Plans from AED 250/month',
    description: 'Spread treatment costs from AED 1,500 up to AED 150,000 over 3 to 36 months.',
  },
  {
    title: '0% plans available',
    description: 'Selected treatments at partner clinics qualify for interest-free instalments.',
  },
  {
    title: 'Sharia-compliant',
    description: 'A clear, fixed total and fixed monthly payments — structured without conventional interest.',
  },
  {
    title: 'Soft rate check',
    description: 'See your rate in minutes with no impact on your credit score.',
  },
  {
    title: 'No upfront cost',
    description: 'Nothing to pay on the day — Mend settles your bill with the clinic directly.',
  },
  {
    title: 'No early-settlement fees',
    description: 'Pay off your plan ahead of schedule whenever you like, at no extra cost.',
  },
  {
    title: 'One simple agreement',
    description: 'Transparent terms, no hidden charges, and the full cost shown before you commit.',
  },
  {
    title: 'Dedicated specialist',
    description: 'A care-finance specialist on hand from application through to your final payment.',
  },
  {
    title: 'Wide clinic network',
    description: 'Medical, dental, fertility and aesthetic providers across the UAE.',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-brand-cream section-padding">
      <div className="container-width">
        <div className="text-center">
          <p className="text-[13px] text-gray-500">Transparent from the first payment.</p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight text-brand-navy sm:text-5xl">
            Rates from 0% APR. Plans from AED 250 a month*.
          </h2>
        </div>

        <dl className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-brand sm:mt-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-12 sm:gap-6 ${
                index % 2 === 1 ? 'bg-black/[0.025]' : 'bg-transparent'
              }`}
            >
              <dt className="text-[15px] font-semibold text-brand-navy sm:col-span-5">
                {feature.title}
              </dt>
              <dd className="text-[14px] leading-relaxed text-gray-500 sm:col-span-7">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 text-center">
          <a href="/apply" className="btn-primary">
            Check your rate
          </a>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[12px] leading-relaxed text-gray-500">
          *Representative example: AED 12,000 of treatment over 12 months at 0% APR is AED 1,000
          per month — total payable AED 12,000. Rates and terms depend on the treatment, the clinic
          and your eligibility. Finance is subject to status. Mend is a financing platform, not a
          clinic, and does not provide medical advice.
        </p>
      </div>
    </section>
  )
}
