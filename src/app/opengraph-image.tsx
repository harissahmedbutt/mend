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

/**
 * Best-effort serif font for the wordmark; falls back to the default font.
 * Time-boxed so a slow/blocked network can never hang the build.
 */
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      'https://github.com/google/fonts/raw/main/ofl/sourceserif4/SourceSerif4%5Bopsz%2Cwght%5D.ttf',
      { signal: AbortSignal.timeout(2500) },
    )
    if (!res.ok) return null
    return await res.arrayBuffer()
  } catch {
    return null
  }
}

export default async function OpengraphImage() {
  const serif = await loadSerif()

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
            fontFamily: serif ? 'Source Serif 4' : 'serif',
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
              fontFamily: serif ? 'Source Serif 4' : 'serif',
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
            Premium, Sharia-compliant treatment financing in the UAE — from AED{' '}
            {COMPANY.fromMonthlyAed}/month.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif
        ? [{ name: 'Source Serif 4', data: serif, style: 'normal', weight: 600 }]
        : [],
    },
  )
}
