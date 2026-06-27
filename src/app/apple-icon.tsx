import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Apple touch icon — navy rounded tile with a serif wordmark initial. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A1816',
          color: '#F9F8F6',
          fontSize: 118,
          fontWeight: 600,
          fontFamily: 'serif',
        }}
      >
        m
      </div>
    ),
    size,
  )
}
