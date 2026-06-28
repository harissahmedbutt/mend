import type { Metadata } from 'next'
import ManageCookiesButton from '@/components/ManageCookiesButton'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How Mend uses cookies and similar technologies, and how to manage your preferences.',
}

const LAST_UPDATED = '28 June 2026'

export default function CookiesPage() {
  return (
    <>
      <h1>Cookie Policy</h1>
      <p className="lead">Last updated: {LAST_UPDATED}</p>

      <p>
        This Cookie Policy explains how Mend uses cookies and similar technologies, and how you can
        control them.
      </p>

      <h2>1. What cookies we use</h2>
      <ul>
        <li>
          <strong>Essential cookies</strong> — required for the site to function (for example,
          remembering your cookie choice). These are always on.
        </li>
        <li>
          <strong>Analytics cookies</strong> — help us understand how the site is used so we can
          improve it. These load only if you accept.
        </li>
      </ul>

      <h2>2. Managing your preferences</h2>
      <p>
        You can change your choice at any time. We will not load analytics cookies unless you
        accept.
      </p>
      <p>
        <ManageCookiesButton className="font-medium text-brand-navy underline underline-offset-2" />
      </p>

      <h2>3. Contact</h2>
      <p>
        Questions about this policy can be sent to{' '}
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
