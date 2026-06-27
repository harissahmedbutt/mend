import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Mend collects, uses and protects your personal data when you use our website and treatment-financing services.',
}

const LAST_UPDATED = '28 June 2026'

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="lead">Last updated: {LAST_UPDATED}</p>

      <p>
        This Privacy Policy explains how Mend Technologies Ltd (&ldquo;Mend&rdquo;) collects, uses
        and protects your personal data when you use our website and services. We are committed to
        handling your data lawfully and transparently.
      </p>

      <h2>1. Data we collect</h2>
      <ul>
        <li>
          <strong>Application data</strong> — your name, contact details, date of birth, identity
          information and the treatment and amount you are financing.
        </li>
        <li>
          <strong>Eligibility data</strong> — information used to run soft and, on acceptance, full
          eligibility and affordability checks.
        </li>
        <li>
          <strong>Usage data</strong> — with your consent, analytics about how you use the site
          (see our Cookie Policy).
        </li>
      </ul>

      <h2>2. How we use your data</h2>
      <p>
        We use your data to assess applications, provide and service finance, meet legal and
        regulatory obligations, prevent fraud, and improve our services. We only use analytics
        cookies where you have given consent.
      </p>

      <h2>3. Sharing your data</h2>
      <p>
        We may share data with credit and identity-verification providers, payment processors,
        your chosen clinic where relevant, and regulators or authorities where required by law. We
        do not sell your personal data.
      </p>

      <h2>4. Keeping your data</h2>
      <p>
        We keep personal data only as long as necessary for the purposes above and to meet legal
        retention requirements, after which it is securely deleted or anonymised.
      </p>

      <h2>5. Your rights</h2>
      <p>
        Subject to applicable law, you may request access to, correction of, or deletion of your
        personal data, and you may withdraw consent for analytics at any time using the{' '}
        <a href="/cookies">cookie settings</a>.
      </p>

      <h2>6. Contact</h2>
      <p>
        To exercise your rights or ask about this policy, contact{' '}
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
