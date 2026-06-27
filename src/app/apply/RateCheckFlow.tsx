'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { PRICING, indicativeMonthly } from '@/data/pricing'
import { TREATMENTS } from '@/data/treatments'
import { track } from '@/lib/analytics'

/* ── Types ── */

type FormState = {
  treatment: string
  amount: string
  term: string
  name: string
  email: string
  consent: boolean
}

type Decision = {
  approved: boolean
  apr: number
  monthly: number
  term: number
  total: number
}

const INITIAL: FormState = {
  treatment: '',
  amount: '',
  term: '',
  name: '',
  email: '',
  consent: false,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STEP_COUNT = 5 // input steps before the result screen

/* ── Component ── */

export default function RateCheckFlow() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [decision, setDecision] = useState<Decision | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  // Move focus to the step heading on each transition for screen-reader users.
  useEffect(() => {
    headingRef.current?.focus()
  }, [step, decision])

  // Record that someone began the flow (gated on cookie consent inside track()).
  useEffect(() => {
    track('rate_check_started')
  }, [])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setError(null)
  }

  /** Validate the current step; returns an error message or null. */
  const validateStep = (): string | null => {
    switch (step) {
      case 0:
        return form.treatment ? null : 'Choose the type of treatment.'
      case 1: {
        const amount = Number(form.amount)
        if (!Number.isFinite(amount) || form.amount === '')
          return 'Enter the treatment amount.'
        if (amount < PRICING.minAmount || amount > PRICING.maxAmount)
          return `Enter an amount between AED ${PRICING.minAmount.toLocaleString()} and AED ${PRICING.maxAmount.toLocaleString()}.`
        return null
      }
      case 2:
        return form.term ? null : 'Choose a repayment term.'
      case 3:
        if (form.name.trim().length < 2) return 'Enter your name.'
        if (!EMAIL_RE.test(form.email.trim())) return 'Enter a valid email address.'
        return null
      case 4:
        return form.consent ? null : 'Please agree to the soft eligibility check.'
      default:
        return null
    }
  }

  const next = async () => {
    const err = validateStep()
    if (err) {
      setError(err)
      return
    }
    if (step < STEP_COUNT - 1) {
      setStep((s) => s + 1)
      return
    }
    await submit()
  }

  const back = () => {
    setError(null)
    setStep((s) => Math.max(0, s - 1))
  }

  const submit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/rate-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          treatment: form.treatment,
          amount: Number(form.amount),
          term: Number(form.term),
          name: form.name.trim(),
          email: form.email.trim(),
          consent: form.consent,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const firstErr =
          data?.errors && typeof data.errors === 'object'
            ? Object.values(data.errors)[0]
            : null
        throw new Error((firstErr as string) ?? 'Something went wrong. Please try again.')
      }
      const data = (await res.json()) as { result: Decision }
      setDecision(data.result)
      track('rate_check_completed', { amount: Number(form.amount), term: Number(form.term) })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Result screen ── */
  if (decision) {
    return (
      <Shell>
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
          Good news
        </p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 font-serif text-4xl font-medium leading-tight text-brand-navy outline-none sm:text-5xl"
        >
          You&apos;re likely eligible.
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-gray-500">
          Based on what you told us, here&apos;s an indicative plan. This is an estimate — your exact
          rate is confirmed when you complete your application.
        </p>

        <dl className="mt-8 divide-y divide-black/10 rounded-brand border border-black/10 bg-white">
          <Row label="Indicative monthly payment" value={`AED ${decision.monthly.toLocaleString()}`} emphasis />
          <Row label="Term" value={`${decision.term} months`} />
          <Row label="Representative APR" value={`${decision.apr}%`} />
          <Row label="Total payable" value={`AED ${decision.total.toLocaleString()}`} />
        </dl>

        <p className="mt-6 text-[12px] leading-relaxed text-gray-500">
          Indicative only and subject to status, eligibility and full checks. Mend is a financing
          platform, not a clinic, and does not provide medical advice.
        </p>

        <Link href="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </Shell>
    )
  }

  /* ── Step screens ── */
  const monthlyPreview =
    form.amount && form.term
      ? indicativeMonthly(Number(form.amount), Number(form.term))
      : null

  return (
    <Shell>
      <Progress step={step} />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void next()
        }}
        noValidate
      >
        {step === 0 && (
          <Step
            headingRef={headingRef}
            title="What are you financing?"
            help="Choose the area of care closest to your treatment."
          >
            <fieldset className="mt-2">
              <legend className="sr-only">Treatment type</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {TREATMENTS.map((t) => {
                  const active = form.treatment === t.id
                  return (
                    <label
                      key={t.id}
                      className={`flex cursor-pointer flex-col rounded-2xl border p-5 transition-colors ${
                        active
                          ? 'border-brand-navy bg-brand-navy/[0.03]'
                          : 'border-black/10 hover:border-black/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="treatment"
                        value={t.id}
                        checked={active}
                        onChange={() => set('treatment', t.id)}
                        className="sr-only"
                      />
                      <span className="font-serif text-[20px] font-semibold text-brand-navy">
                        {t.label}
                      </span>
                      <span className="mt-1 text-[13px] text-gray-500">{t.blurb}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </Step>
        )}

        {step === 1 && (
          <Step
            headingRef={headingRef}
            title="How much is your treatment?"
            help={`We finance from AED ${PRICING.minAmount.toLocaleString()} to AED ${PRICING.maxAmount.toLocaleString()}.`}
          >
            <label htmlFor="amount" className="sr-only">
              Treatment amount in AED
            </label>
            <div className="mt-2 flex items-center rounded-2xl border border-black/10 px-5 focus-within:border-brand-navy">
              <span className="text-[16px] font-medium text-gray-500">AED</span>
              <input
                id="amount"
                name="amount"
                type="number"
                inputMode="numeric"
                min={PRICING.minAmount}
                max={PRICING.maxAmount}
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
                placeholder="12,000"
                aria-describedby={error ? 'step-error' : undefined}
                className="w-full bg-transparent px-3 py-4 text-[18px] text-brand-navy outline-none"
                autoFocus
              />
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step
            headingRef={headingRef}
            title="Over how long?"
            help="Pick a term — you can change this later before you commit."
          >
            <fieldset className="mt-2">
              <legend className="sr-only">Repayment term in months</legend>
              <div className="flex flex-wrap gap-2.5">
                {PRICING.terms.map((t) => {
                  const active = form.term === String(t)
                  return (
                    <label
                      key={t}
                      className={`cursor-pointer rounded-full border px-5 py-2.5 text-[15px] font-medium transition-colors ${
                        active
                          ? 'border-brand-navy bg-brand-navy text-white'
                          : 'border-black/10 text-brand-navy hover:border-black/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="term"
                        value={t}
                        checked={active}
                        onChange={() => set('term', String(t))}
                        className="sr-only"
                      />
                      {t} months
                    </label>
                  )
                })}
              </div>
            </fieldset>
            {monthlyPreview ? (
              <p className="mt-6 text-[15px] text-gray-500" aria-live="polite">
                That&apos;s about{' '}
                <span className="font-semibold text-brand-navy">
                  AED {monthlyPreview.toLocaleString()}/month
                </span>{' '}
                at {PRICING.representativeApr}% APR.
              </p>
            ) : null}
          </Step>
        )}

        {step === 3 && (
          <Step
            headingRef={headingRef}
            title="Where should we send your rate?"
            help="We only use these to show your result — checking has no impact on your credit."
          >
            <div className="mt-2 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-[14px] font-medium text-brand-navy">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 text-[16px] text-brand-navy outline-none focus:border-brand-navy"
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[14px] font-medium text-brand-navy">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 text-[16px] text-brand-navy outline-none focus:border-brand-navy"
                />
              </div>
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step
            headingRef={headingRef}
            title="One last thing"
            help="We'll run a soft eligibility check — it's invisible to other lenders and leaves no mark on your credit file."
          >
            <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 p-5">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={(e) => set('consent', e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-brand-navy"
              />
              <span className="text-[14px] leading-relaxed text-gray-600">
                I agree to a soft eligibility check and to Mend&apos;s{' '}
                <Link href="/terms" className="underline underline-offset-2">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </Step>
        )}

        {error ? (
          <p id="step-error" role="alert" className="mt-5 text-[14px] font-medium text-red-700">
            {error}
          </p>
        ) : null}

        {/* Controls */}
        <div className="mt-8 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              disabled={submitting}
              className="btn-secondary"
            >
              Back
            </button>
          )}
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting
              ? 'Checking…'
              : step === STEP_COUNT - 1
                ? 'See my rate'
                : 'Continue'}
          </button>
        </div>
      </form>
    </Shell>
  )
}

/* ── Presentational helpers ── */

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="min-h-screen bg-brand-cream px-6 py-10">
      <div className="mx-auto max-w-xl">
        <Link
          href="/"
          className="select-none font-serif text-[26px] font-semibold tracking-tight text-brand-navy"
        >
          mend
        </Link>
        <div className="mt-10">{children}</div>
      </div>
    </main>
  )
}

function Progress({ step }: { step: number }) {
  const pct = ((step + 1) / STEP_COUNT) * 100
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-[12px] font-medium text-gray-500">
        <span>
          Step {step + 1} of {STEP_COUNT}
        </span>
      </div>
      <div
        className="mt-2 h-1 w-full overflow-hidden rounded-full bg-black/10"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={STEP_COUNT}
        aria-label="Application progress"
      >
        <div
          className="h-full rounded-full bg-brand-navy transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function Step({
  title,
  help,
  children,
  headingRef,
}: {
  title: string
  help: string
  children: React.ReactNode
  headingRef: React.RefObject<HTMLHeadingElement | null>
}) {
  return (
    <div aria-live="polite">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-serif text-3xl font-medium leading-tight text-brand-navy outline-none sm:text-4xl"
      >
        {title}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-gray-500">{help}</p>
      {children}
    </div>
  )
}

function Row({
  label,
  value,
  emphasis,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <dt className="text-[14px] text-gray-500">{label}</dt>
      <dd
        className={
          emphasis
            ? 'font-serif text-[22px] font-semibold text-brand-navy'
            : 'text-[15px] font-medium text-brand-navy'
        }
      >
        {value}
      </dd>
    </div>
  )
}
