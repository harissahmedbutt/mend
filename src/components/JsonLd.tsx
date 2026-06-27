import { COMPANY } from '@/data/company'
import { FAQS } from '@/data/faqs'

/**
 * Structured data (JSON-LD) for search engines and AI answer engines.
 *
 * Emits an Organization/FinancialService graph plus a FAQPage built from the
 * same FAQ source the UI uses. Rendered once in the root layout.
 */
export default function JsonLd() {
  const graph = [
    {
      '@type': ['Organization', 'FinancialService'],
      '@id': `${COMPANY.url}/#organization`,
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      url: COMPANY.url,
      description: COMPANY.description,
      email: COMPANY.email,
      logo: `${COMPANY.url}/icon.svg`,
      image: `${COMPANY.url}/opengraph-image`,
      areaServed: COMPANY.areaServed,
      ...(COMPANY.sameAs.length > 0 ? { sameAs: COMPANY.sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${COMPANY.url}/#website`,
      url: COMPANY.url,
      name: COMPANY.name,
      publisher: { '@id': `${COMPANY.url}/#organization` },
      inLanguage: 'en-AE',
    },
    {
      '@type': 'FAQPage',
      '@id': `${COMPANY.url}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]

  const json = { '@context': 'https://schema.org', '@graph': graph }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
