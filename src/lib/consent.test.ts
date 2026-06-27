import { afterEach, describe, expect, it, vi } from 'vitest'
import { CONSENT_CHANGED, getConsent, setConsent } from './consent'

afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('consent', () => {
  it('returns null before any choice', () => {
    expect(getConsent()).toBeNull()
  })

  it('persists and reads back an accepted choice', () => {
    setConsent('accepted')
    expect(getConsent()).toBe('accepted')
  })

  it('persists a declined choice', () => {
    setConsent('declined')
    expect(getConsent()).toBe('declined')
  })

  it('treats unknown stored values as no decision', () => {
    localStorage.setItem('mend-cookie-consent', 'garbage')
    expect(getConsent()).toBeNull()
  })

  it('dispatches a change event with the new value', () => {
    const handler = vi.fn()
    window.addEventListener(CONSENT_CHANGED, handler)
    setConsent('accepted')
    expect(handler).toHaveBeenCalledOnce()
    window.removeEventListener(CONSENT_CHANGED, handler)
  })
})
