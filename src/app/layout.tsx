import type { Metadata } from 'next'
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import CookieConsent from '@/components/CookieConsent'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
})

// Display/heading serif — Source Serif 4
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-serif',
  display: 'swap',
})

const BASE_URL = 'https://mend.ae'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Mend — Pay for care, over time | Treatment financing in the UAE',
    template: '%s | Mend',
  },
  description:
    'Premium, Sharia-compliant financing for medical, dental, fertility and cosmetic treatment in the UAE. Check your rate in minutes, with no impact on your credit. Plans from AED 250/month.',
  keywords: [
    'medical financing UAE', 'treatment financing Dubai', 'dental finance UAE',
    'IVF financing UAE', 'cosmetic surgery finance', 'pay monthly healthcare UAE',
    'Sharia-compliant medical finance', 'healthcare instalments Dubai',
    'spread the cost of treatment', 'patient financing UAE',
  ],
  authors: [{ name: 'Mend Technologies Ltd' }],
  creator: 'Mend Technologies Ltd',
  publisher: 'Mend Technologies Ltd',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: BASE_URL,
    siteName: 'Mend',
    title: 'Mend — Pay for care, over time | Treatment financing in the UAE',
    description:
      'Premium, Sharia-compliant financing for the treatment you need today. Check your rate in minutes. Plans from AED 250/month.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mend — Treatment financing in the UAE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mend — Pay for care, over time',
    description:
      'Premium, Sharia-compliant financing for medical, dental, fertility and cosmetic treatment in the UAE. From AED 250/month.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: BASE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      {/* suppressHydrationWarning: browser extensions can mutate <body> before
          hydration; this ignores those extension-injected attribute diffs only. */}
      <body suppressHydrationWarning>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
