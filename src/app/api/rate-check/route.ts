import { NextResponse } from 'next/server'
import { PRICING, indicativeMonthly, type Term } from '@/data/pricing'
import { TREATMENT_IDS } from '@/data/treatments'

/**
 * POST /api/rate-check
 *
 * Validates a rate-check submission and returns an indicative result. The
 * eligibility decision is stubbed behind a single function so a real provider
 * (credit/affordability/KYC) can be dropped in without touching the route.
 */

type RateCheckInput = {
  treatment: string
  amount: number
  term: number
  name: string
  email: string
  consent: boolean
}

type ValidationResult =
  | { ok: true; value: RateCheckInput }
  | { ok: false; errors: Record<string, string> }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(body: unknown): ValidationResult {
  const errors: Record<string, string> = {}
  const b = (body ?? {}) as Record<string, unknown>

  const treatment = String(b.treatment ?? '')
  if (!TREATMENT_IDS.includes(treatment as (typeof TREATMENT_IDS)[number])) {
    errors.treatment = 'Choose a treatment type.'
  }

  const amount = Number(b.amount)
  if (!Number.isFinite(amount) || amount < PRICING.minAmount || amount > PRICING.maxAmount) {
    errors.amount = `Enter an amount between AED ${PRICING.minAmount.toLocaleString()} and AED ${PRICING.maxAmount.toLocaleString()}.`
  }

  const term = Number(b.term)
  if (!PRICING.terms.includes(term as Term)) {
    errors.term = 'Choose a repayment term.'
  }

  const name = String(b.name ?? '').trim()
  if (name.length < 2) errors.name = 'Enter your name.'

  const email = String(b.email ?? '').trim()
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'

  const consent = b.consent === true
  if (!consent) errors.consent = 'Please agree to the soft eligibility check.'

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return { ok: true, value: { treatment, amount, term, name, email, consent } }
}

/** Stubbed eligibility check — replace with a real provider integration. */
async function runEligibility(input: RateCheckInput) {
  const monthly = indicativeMonthly(input.amount, input.term)
  return {
    approved: true,
    apr: PRICING.representativeApr,
    monthly,
    term: input.term,
    total: monthly * input.term,
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const result = validate(body)
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 422 })
  }

  const decision = await runEligibility(result.value)
  return NextResponse.json({ result: decision })
}
