/* ── Content ── */

type QuoteItem = { kind: 'quote'; name: string; quote: string }
type StatItem = { kind: 'stat' }
type Item = QuoteItem | StatItem

const TESTIMONIALS: QuoteItem[] = [
  { kind: 'quote', name: 'Aisha', quote: 'I could finally start IVF without waiting another year to save. The 0% plan made it possible.' },
  { kind: 'quote', name: 'Daniel', quote: 'Approved in minutes and the clinic was paid the same week. Genuinely effortless.' },
  { kind: 'quote', name: 'Priya', quote: 'My daughter’s braces, spread over two years. The monthly amount barely registers.' },
  { kind: 'quote', name: 'Omar', quote: 'No interest, no hidden fees, and a real person to call. Exactly what I needed.' },
  { kind: 'quote', name: 'Sophie', quote: 'I checked my rate out of curiosity and it didn’t touch my credit. Booked my surgery the next day.' },
  { kind: 'quote', name: 'Rashid', quote: 'Sharia-compliant and completely transparent. I knew the total before I signed anything.' },
  { kind: 'quote', name: 'Elena', quote: 'The dental work I’d put off for years — sorted in one visit, paid over twelve months.' },
  { kind: 'quote', name: 'James', quote: 'Premium experience from start to finish. It felt like care, not a loan application.' },
]

/* Build the strip with one black stat card inserted at the third position. */
const ITEMS: Item[] = [
  TESTIMONIALS[0],
  TESTIMONIALS[1],
  { kind: 'stat' },
  ...TESTIMONIALS.slice(2),
]

/* Muted pastel backgrounds cycle through the configured palette, then repeat. */
const PASTELS = ['bg-pastel-sage', 'bg-pastel-tan', 'bg-pastel-blue', 'bg-pastel-stone', 'bg-pastel-rose'] as const

/* Every card shares one fixed footprint so the strip is perfectly uniform.
   The trailing margin (instead of a flex gap) makes the marquee's -50% shift exact. */
const CARD_SIZE = 'h-[360px] w-[280px] mr-5 shrink-0 rounded-brand'

function Card({ item, pastel }: { item: Item; pastel: string }) {
  if (item.kind === 'stat') {
    return (
      <div className={`flex flex-col justify-center bg-brand-navy p-8 text-center ${CARD_SIZE}`}>
        <p className="font-serif text-5xl font-semibold leading-none text-white">AED 0</p>
        <p className="mt-4 text-sm leading-relaxed text-white/70">to pay upfront, and no impact on your credit to check</p>
      </div>
    )
  }
  return (
    <figure className={`flex flex-col p-6 lg:p-8 ${CARD_SIZE} ${pastel}`}>
      <span aria-hidden="true" className="font-serif text-5xl leading-none text-brand-navy/30">
        &ldquo;
      </span>
      <blockquote className="mt-3 flex-1 overflow-hidden font-serif text-[16px] leading-snug text-brand-navy lg:text-[18px]">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 text-sm text-gray-500">{item.name}</figcaption>
    </figure>
  )
}

/* ── Section ── */

export default function Testimonials() {
  // Pre-assign a pastel to each non-stat card so the colour order is stable.
  let pastelIndex = 0
  const cards = ITEMS.map((item) => ({
    item,
    pastel: item.kind === 'quote' ? PASTELS[pastelIndex++ % PASTELS.length] : '',
  }))

  return (
    <section id="testimonials" className="bg-brand-cream section-padding">
      <div className="container-width">
        <h2 className="max-w-md font-serif text-4xl font-semibold leading-tight tracking-tight text-brand-navy lg:text-5xl">
          Care that couldn&apos;t wait, made possible.
        </h2>
      </div>

      {/* Continuous marquee — one track holding two copies loops seamlessly. Pauses on hover. */}
      <div className="group mt-12 overflow-hidden" role="region" aria-label="Customer stories">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {cards.map(({ item, pastel }, i) => (
            <Card key={`a-${i}`} item={item} pastel={pastel} />
          ))}
          {cards.map(({ item, pastel }, i) => (
            <Card key={`b-${i}`} item={item} pastel={pastel} />
          ))}
        </div>
      </div>
    </section>
  )
}
