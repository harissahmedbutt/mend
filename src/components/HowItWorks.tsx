'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/* ── Content ── */

type Step = {
  number: string
  label: string
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    number: '01',
    label: 'Your treatment',
    title: 'Tell us what you need',
    body: 'Share the treatment you are planning and a quote from your clinic — medical, dental, fertility or cosmetic. It takes a couple of minutes, online, in your own time. No paperwork, no waiting room.',
  },
  {
    number: '02',
    label: 'Check your rate',
    title: 'See your rate in minutes',
    body: 'We run a soft eligibility check that has no impact on your credit score. You instantly see whether you are approved and the rate available to you — including 0% plans on eligible treatments.',
  },
  {
    number: '03',
    label: 'Choose your plan',
    title: 'Pick a plan that fits',
    body: 'Choose a term from 3 to 36 months and see your exact monthly payment before you commit. No hidden fees, no early-settlement penalties — pay it off ahead of time whenever you like.',
  },
  {
    number: '04',
    label: 'Get approved',
    title: 'We pay your clinic directly',
    body: 'Once you accept, Mend settles the bill with your clinic so your treatment can go ahead without delay. You deal with one simple agreement, not a stack of forms.',
  },
  {
    number: '05',
    label: 'Pay monthly',
    title: 'Simple monthly payments',
    body: 'Your payments are collected automatically each month and tracked in your Mend dashboard. A dedicated care-finance specialist is on hand if anything ever needs adjusting.',
  },
]

type Faq = { question: string; answer: string }

const FAQS: Faq[] = [
  {
    question: 'Will checking my rate affect my credit score?',
    answer:
      'No. Checking your rate uses a soft search that is invisible to other lenders and leaves no mark on your credit file. A record is only created once you accept a plan.',
  },
  {
    question: 'Is the financing Sharia-compliant?',
    answer:
      'Yes. Our plans are structured to be Sharia-compliant — there is no interest in the conventional sense. You see a clear, fixed total and fixed monthly payments up front.',
  },
  {
    question: 'Which clinics can I use?',
    answer:
      'Mend works with a growing network of licensed UAE clinics and hospitals across medical, dental, fertility and aesthetic care. If your provider is not yet a partner, we can usually onboard them quickly.',
  },
]

/* ── Component ── */

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement | null>(null)

  /* Drive the active step from scroll progress while the section is pinned. */
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = sectionRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      const progress = total > 0 ? scrolled / total : 0
      const idx = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length))
      setActive((prev) => (prev === idx ? prev : idx))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /* Clicking a step label scrolls to the part of the section where it's active. */
  const scrollToStep = (i: number) => {
    const el = sectionRef.current
    if (!el) return
    const total = el.offsetHeight - window.innerHeight
    const target = el.offsetTop + ((i + 0.5) / STEPS.length) * total
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const current = STEPS[active]

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      {/* Pinned viewport — stays put while the section scrolls past */}
      <div className="sticky top-0 flex h-screen w-full items-stretch overflow-hidden">
        {/* Full-bleed background photo */}
        <Image
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=80"
          alt="A reassuring moment of care between patient and clinician"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        {/* Legibility overlays */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-transparent"
        />

        {/* Content */}
        <div className="container-width relative z-10 flex w-full flex-col gap-10 py-20 lg:flex-row lg:items-stretch lg:gap-12 lg:py-24">
          {/* Step list (right on desktop, first on mobile) */}
          <div
            role="tablist"
            aria-label="How it works steps"
            aria-orientation="vertical"
            className="order-first flex w-full min-w-0 max-w-full flex-row gap-5 overflow-x-auto pb-2 lg:order-last lg:w-56 lg:max-w-none lg:shrink-0 lg:flex-col lg:items-end lg:justify-center lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {STEPS.map((step, i) => {
              const isActive = active === i
              return (
                <button
                  key={step.number}
                  type="button"
                  role="tab"
                  id={`step-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="step-panel"
                  onClick={() => scrollToStep(i)}
                  className="group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full text-[16px] font-medium tracking-tight outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:text-[17px]"
                >
                  <span
                    className={
                      isActive
                        ? 'font-semibold text-white'
                        : 'text-white/40 group-hover:text-white/70'
                    }
                  >
                    {step.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`transition-opacity duration-200 ${
                      isActive ? 'text-white opacity-100' : 'opacity-0'
                    }`}
                  >
                    →
                  </span>
                </button>
              )
            })}
          </div>

          {/* Left-hand content */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div
              role="tabpanel"
              id="step-panel"
              aria-labelledby={`step-tab-${active}`}
              aria-live="polite"
              className="flex flex-1 flex-col justify-center"
            >
              <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70">
                How it works
              </p>
              <h2
                key={active}
                className="max-w-xl animate-slide-up font-serif text-[40px] font-medium leading-[1.05] text-white sm:text-[52px] lg:text-[60px]"
              >
                {current.title}
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/85 lg:text-[17px]">
                {current.body}
              </p>
            </div>

            {/* FAQ accordion pills — bottom left */}
            <div className="mt-12 max-w-md space-y-3 lg:mt-10">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-white/15 bg-white/10 backdrop-blur-md"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none transition-colors duration-200 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60"
                    >
                      <span className="text-[14px] font-medium text-white lg:text-[15px]">
                        {faq.question}
                      </span>
                      <svg
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 text-white/80 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="min-h-0">
                        <p className="px-5 pb-4 text-[13px] leading-relaxed text-white/75 lg:text-[14px]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
