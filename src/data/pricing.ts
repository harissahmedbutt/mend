/**
 * Financing parameters — the single source of truth for the rate figures shown
 * on the marketing page and used by the /apply indicative calculator.
 *
 * These are marketing/illustrative values. Real pricing comes from the
 * eligibility provider at application time.
 */

export const PRICING = {
  /** Minimum financeable treatment cost, AED. */
  minAmount: 1_500,
  /** Maximum financeable treatment cost, AED. */
  maxAmount: 150_000,
  /** Available repayment terms, in months. */
  terms: [3, 6, 9, 12, 18, 24, 36] as const,
  /** Lowest advertised monthly plan, AED. */
  fromMonthly: 250,
  /**
   * Representative APR used for indicative quotes before a real rate is
   * returned. 0% reflects the advertised 0% plans on eligible treatments.
   */
  representativeApr: 0,
} as const

export type Term = (typeof PRICING.terms)[number]

/**
 * Indicative monthly payment for a given amount/term at the representative APR.
 * Mirrors the representative example on the pricing section (0% APR → simple
 * division). Returns a whole-dirham figure.
 */
export function indicativeMonthly(amount: number, termMonths: number): number {
  if (amount <= 0 || termMonths <= 0) return 0
  const apr = PRICING.representativeApr
  if (apr === 0) return Math.round(amount / termMonths)
  const r = apr / 12
  const payment = (amount * r) / (1 - Math.pow(1 + r, -termMonths))
  return Math.round(payment)
}
