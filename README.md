# Mend

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)
![License: Proprietary](https://img.shields.io/badge/license-proprietary-lightgrey)

> Premium, Sharia-compliant **treatment financing** for the UAE. Pay for
> medical, dental, fertility and cosmetic care over time, in simple monthly
> instalments.

## What Mend is

Mend lets people in the UAE spread the cost of private healthcare (medical, dental,
fertility, cosmetic) across simple monthly instalments, structured to be
Sharia-compliant with no interest. Necessary treatment is often expensive and
time-sensitive, and paying the full amount up front puts good care out of reach for
many people. Mend turns a large one-off bill into a manageable monthly figure so the
decision becomes about the treatment, not the price tag.

The product is positioned as premium and trust-first, because financing a health
decision is a sensitive moment and the experience has to feel calm and credible.

**Who it's for:** UAE residents paying for private treatment who want a transparent,
faith-aligned way to pay over time rather than a conventional interest-bearing loan.

## About this repository

This repo is the **marketing site** and the `/apply` rate-check flow: the public-facing
front door where a visitor understands the offer and gets an indicative monthly figure.
It follows a calm, trust-first, editorial design language: warm cream + near-black ink,
Source Serif 4 headlines / Source Sans 3 body, black pills for actions,
photography as the only colour, and motion that respects
`prefers-reduced-motion`.

The `/apply` flow is a multi-step conversational form: pick a treatment, amount, and
term, and the `/api/rate-check` route returns an indicative monthly figure. Eligibility
is stubbed behind `runEligibility()` so a real credit / affordability / KYC provider can
be dropped in later without touching the form.

- **Production:** `main` → auto-deployed to Vercel
- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 3 · Vitest

## Contents

- [Quick start](#quick-start)
- [What's in the box](#whats-in-the-box)
- [Project structure](#project-structure)
- [The `/api/rate-check` contract](#the-apirate-check-contract)
- [Configure before launch](#configure-before-launch)
- [Deployment](#deployment)
- [Notes / gotchas](#notes--gotchas)
- [License](#license)

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (next lint) |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Vitest in watch mode |

> **First run needs network.** `next/font/google` downloads Source Serif 4 +
> Source Sans 3 from `fonts.gstatic.com` at build/dev time.

## What's in the box

- **Landing page** (`/`) — Hero, service pillars, how-it-works, pricing,
  testimonials, founder quote, final CTA, footer.
- **Rate-check flow** (`/apply`) — a multi-step conversational form that returns
  an indicative monthly figure, backed by the `/api/rate-check` route.
- **Legal pages** (`/terms`, `/privacy`, `/cookies`) — under the `(legal)`
  route group with a shared layout.
- **SEO & metadata** — `sitemap`, `robots`, web `manifest`, dynamic
  `opengraph-image` + `apple-icon`, and Organization / FinancialService + FAQ
  structured data (`JsonLd`).
- **Analytics & consent** — consent-gated analytics with
  `rate_check_started` / `rate_check_completed` events, a dismissible cookie
  banner, and a "Manage cookies" control to reopen it.
- **Tests** — Vitest + React Testing Library (`*.test.ts[x]`).

## Project structure

```
src/
  app/
    page.tsx                 # landing page (composes the sections)
    layout.tsx               # root layout, fonts, metadata, analytics, consent
    apply/
      page.tsx               # /apply entry
      RateCheckFlow.tsx      # multi-step conversational rate-check (client)
    api/rate-check/route.ts  # POST endpoint backing the flow
    (legal)/                 # /terms, /privacy, /cookies + shared layout
    opengraph-image.tsx      # dynamic OG image (next/og)
    apple-icon.tsx           # dynamic apple touch icon
    icon.svg, manifest.ts, robots.ts, sitemap.ts
  components/                # Navbar, Hero, ServicePillars, HowItWorks,
                             # Pricing, Testimonials, FounderQuote, FinalCTA,
                             # Footer, CookieConsent, ManageCookiesButton,
                             # Analytics, JsonLd
  data/                      # company, pricing, treatments, faqs (typed,
                             # single source of truth) + tests
  lib/                       # analytics, consent helpers + tests
```

## The `/api/rate-check` contract

`POST /api/rate-check`

```jsonc
// request body
{ "treatment": "dental", "amount": 12000, "term": 12,
  "name": "Sara", "email": "sara@example.com", "consent": true }
```

| Status | Body | Meaning |
| --- | --- | --- |
| `200` | `{ result: { approved, apr, monthly, term, total } }` | Indicative decision |
| `422` | `{ errors: { field: message } }` | Validation failed |
| `400` | `{ error }` | Body wasn't valid JSON |

Eligibility is **stubbed** behind `runEligibility()` so a real
credit / affordability / KYC provider can be dropped in without touching the
route or the form. The indicative monthly figure comes from `src/data/pricing.ts`.

## Configure before launch

- **`src/data/company.ts`** — single source of truth for name, legal entity,
  `url`, support email, `fromMonthlyAed`, and `sameAs` social profiles. Metadata,
  JSON-LD, and the legal pages all read from here.
- **`src/data/pricing.ts`** — advertised rates, representative APR, min/max
  amount, and terms.
- **Eligibility provider** — replace the stub in `api/rate-check/route.ts`.
- **Photography** — Hero/CTA images are Unsplash placeholders; swap in licensed
  assets (allowed hosts are configured in `next.config.ts`).

## Deployment

Hosted on **Vercel**. Pushing to `main` triggers a production deploy; other
branches and PRs get preview deploys.

## Notes / gotchas

- **OG image fonts** — `next/og` (Satori) only accepts static TTF/OTF/WOFF.
  Variable fonts, WOFF2 and EOT crash the prerender, so `opengraph-image.tsx`
  uses Satori's built-in font. To restore the serif wordmark, commit a static
  TTF and load it from disk. Any `<div>` with more than one child must also set
  an explicit `display`.
- **React 19 is required** by Next 16 — keep `react`/`react-dom` on v19.

## License

© Mend Technologies Ltd. All rights reserved.

This source is published for reference only and is **not** licensed for reuse,
redistribution, or derivative works. It is not open source.
