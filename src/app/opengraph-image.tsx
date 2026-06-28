import { ImageResponse } from 'next/og'
import { COMPANY } from '@/data/company'

// Route segment config
export const alt = 'Mend — Treatment financing in the UAE'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand tokens (kept literal — ImageResponse can't read Tailwind config).
const CREAM = '#F9F8F6'
const NAVY = '#1A1816'
const MUTED = '#6A7282'

// Note: we deliberately do not load a custom serif here. next/og (Satori)
// only accepts static TTF/OTF/WOFF fonts — variable fonts, WOFF2 and EOT all
// throw during prerender and fail the production build. Source Serif 4 is only
// distributed by Google as a variable font, so we render the wordmark with
// Satori's built-in default font, which is guaranteed to prerender on Vercel.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: CREAM,
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: NAVY,
            letterSpacing: '-0.02em',
          }}
        >
          mend
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              lineHeight: 1.05,
              color: NAVY,
              letterSpacing: '-0.03em',
              maxWidth: 980,
            }}
          >
            Pay for care, over time.
          </div>
          <div style={{ fontSize: 34, color: MUTED, maxWidth: 900, lineHeight: 1.3 }}>
            {`Premium, Sharia-compliant treatment financing in the UAE — from AED ${COMPANY.fromMonthlyAed}/month.`}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
