/**
 * Frequently asked questions.
 *
 * Shared by the `HowItWorks` accordion UI and the `FAQPage` JSON-LD schema so
 * the two never drift apart.
 */

export type Faq = { question: string; answer: string }

export const FAQS: readonly Faq[] = [
  {
    question: 'Will checking my rate affect my credit score?',
    answer:
      'No. Checking your rate uses a soft search that is invisible to other lenders and leaves no mark on your credit file. A record is only created once you accept a plan.',
  },
  {
    question: 'Is the financing Sharia-compliant?',
    answer:
      'Yes. Our plans are structured to be Sharia-compliant — there is no interest in the conventional sense. You see a clear, fixed total and fixed monthly payments up front.',
  },
  {
    question: 'Which clinics can I use?',
    answer:
      'Mend works with a growing network of licensed UAE clinics and hospitals across medical, dental, fertility and aesthetic care. If your provider is not yet a partner, we can usually onboard them quickly.',
  },
] as const
