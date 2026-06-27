import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing your use of the Mend website and treatment-financing services in the UAE.',
}

const LAST_UPDATED = '28 June 2026'

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="lead">Last updated: {LAST_UPDATED}</p>

      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Mend
        website and the treatment-financing services provided by Mend Technologies Ltd
        (&ldquo;Mend&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using our website or applying
        for finance, you agree to these Terms.
      </p>

      <h2>1. What Mend provides</h2>
      <p>
        Mend is a treatment-financing platform that helps people in the UAE spread the cost of
        eligible medical, dental, fertility and cosmetic care into monthly payments. Mend is not a
        clinic and does not provide medical advice, diagnosis or treatment. Decisions about your
        care are between you and your healthcare provider.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        To apply you must be at least 18 years old, a UAE resident, and able to enter into a binding
        agreement. All finance is subject to status, eligibility and our affordability and
        compliance checks. Approval is not guaranteed.
      </p>

      <h2>3. Checking your rate</h2>
      <p>
        Checking your rate uses a soft eligibility check that does not affect your credit score. A
        rate shown before you accept a plan is indicative and may change once full checks are
        completed.
      </p>

      <h2>4. Your finance agreement</h2>
      <p>
        If you accept a plan, the specific terms — including the total amount, the fixed monthly
        payment and the term length — are set out in your finance agreement. Our plans are
        structured to be Sharia-compliant. In the event of any conflict between these Terms and your
        finance agreement, the finance agreement prevails for that plan.
      </p>

      <h2>5. Payments</h2>
      <p>
        Payments are collected automatically on the dates set out in your agreement. You may settle
        your balance early at any time without an early-settlement penalty. Missed payments may
        affect your ability to obtain finance in the future.
      </p>

      <h2>6. Acceptable use</h2>
      <p>
        You agree to provide accurate information and not to misuse the website, attempt to
        interfere with its operation, or use it for any unlawful purpose.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the extent permitted by law, Mend is not liable for the outcome of any treatment or for
        indirect or consequential losses. Nothing in these Terms limits liability that cannot be
        limited under applicable law.
      </p>

      <h2>8. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be reflected by the
        &ldquo;last updated&rdquo; date above, and where appropriate we will notify you.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms can be sent to{' '}
        <a href="mailto:hello@mend.ae">hello@mend.ae</a>.
      </p>

      <hr />
      <p>
        <em>
          This page is provided for information and should be reviewed by qualified legal counsel
          before launch.
        </em>
      </p>
    </>
  )
}
