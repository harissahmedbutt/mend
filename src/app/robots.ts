import type { MetadataRoute } from 'next'
import { COMPANY } from '@/data/company'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /apply is a work-in-progress flow kept out of the index for now.
      disallow: '/apply',
    },
    sitemap: `${COMPANY.url}/sitemap.xml`,
    host: COMPANY.url,
  }
}
