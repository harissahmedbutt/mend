type Pillar = {
  title: string
  description: string
}

const pillars: Pillar[] = [
  {
    title: 'Medical & surgery',
    description:
      'Fund elective procedures, specialist treatment and hospital stays — without draining your savings.',
  },
  {
    title: 'Dental & orthodontics',
    description: 'Implants, clear aligners and cosmetic dentistry, paid in comfortable monthly instalments.',
  },
  {
    title: 'Fertility & IVF',
    description: 'Spread the cost of treatment cycles over a term that fits your plans, not your stress.',
  },
  {
    title: 'Cosmetic & wellness',
    description: 'Aesthetic and wellness procedures at leading UAE clinics, with nothing to pay upfront.',
  },
]

export default function ServicePillars() {
  return (
    <section id="services" className="bg-brand-cream section-padding">
      <div className="container-width">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold leading-tight text-brand-navy">
            Financing for every kind of care.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-gray-500">
            The right treatment shouldn&apos;t wait for the right month. Mend lets you say yes
            to care now and pay for it gradually.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-left">
              <h3 className="font-serif text-xl font-semibold text-brand-navy">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-gray-500">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a href="/apply" className="btn-primary">
            Check your rate
          </a>
        </div>
      </div>
    </section>
  )
}
