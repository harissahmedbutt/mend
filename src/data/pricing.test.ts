import { describe, expect, it } from 'vitest'
import { PRICING, indicativeMonthly } from './pricing'

describe('indicativeMonthly', () => {
  it('matches the representative example (AED 12,000 over 12 months at 0% APR)', () => {
    expect(indicativeMonthly(12_000, 12)).toBe(1_000)
  })

  it('divides evenly at 0% APR', () => {
    expect(indicativeMonthly(9_000, 3)).toBe(3_000)
    expect(indicativeMonthly(6_000, 6)).toBe(1_000)
  })

  it('returns 0 for invalid inputs', () => {
    expect(indicativeMonthly(0, 12)).toBe(0)
    expect(indicativeMonthly(12_000, 0)).toBe(0)
    expect(indicativeMonthly(-100, 12)).toBe(0)
  })

  it('only advertises supported terms within the financeable range', () => {
    expect(PRICING.minAmount).toBeLessThan(PRICING.maxAmount)
    expect(PRICING.terms).toContain(12)
    expect(PRICING.terms.every((t) => t > 0)).toBe(true)
  })
})
