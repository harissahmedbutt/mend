import type { MetadataRoute } from 'next'
import { COMPANY } from '@/data/company'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY.name} — Treatment financing in the UAE`,
    short_name: COMPANY.name,
    description: COMPANY.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F9F8F6',
    theme_color: '#1A1816',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  }
}
