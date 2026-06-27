import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('points legal links at real pages (not the apply placeholder)', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute(
      'href',
      '/terms',
    )
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      '/privacy',
    )
    expect(screen.getByRole('link', { name: 'Cookie Policy' })).toHaveAttribute(
      'href',
      '/cookies',
    )
  })

  it('offers a control to re-open cookie settings', () => {
    render(<Footer />)
    expect(screen.getByRole('button', { name: 'Manage cookies' })).toBeInTheDocument()
  })
})
