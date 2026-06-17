# Mend

Premium, Sharia-compliant **treatment financing** for the UAE — pay for medical,
dental, fertility and cosmetic care over time, in simple monthly instalments.

This is the marketing site. It reuses the calm, trust-first, editorial design
language defined in the original `DESIGN.md` (warm cream + near-black ink,
Source Serif 4 headlines / Source Sans 3 body, black pills for actions,
photography as the only colour, motion that respects `prefers-reduced-motion`).

## Stack

- **Next.js 16** (App Router) + **React 18**
- **Tailwind CSS 3** with the shared brand tokens (`tailwind.config.ts`)
- `next/font/google` for Source Serif 4 + Source Sans 3

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

> `next/font/google` downloads fonts at build/dev time, so the first run needs
> network access to `fonts.gstatic.com`.

## Structure

- `src/app/page.tsx` — the landing page, composing the sections below
- `src/app/apply/page.tsx` — placeholder for the rate-check / application flow
- `src/components/`
  - `Navbar` — transparent over hero, collapses to a floating white pill on scroll
  - `Hero` — full-bleed photo, lower-left serif headline, trust row
  - `ServicePillars` — four plain-text columns (what we finance)
  - `HowItWorks` — scroll-pinned 5-step section with FAQ pills
  - `Pricing` — the offer: rates + striped feature list with a representative example
  - `Testimonials` — slow marquee of pastel cards + one black stat card
  - `FounderQuote` — founder pull-quote + plan-options list
  - `FinalCTA` — full-bleed photo + white pill
  - `Footer` — warm-cream footer with disclaimer + link columns
  - `CookieConsent` — dismissible dark bar, remembers dismissal in `localStorage`

## Next steps (not yet built)

- The conversational **rate-check / application flow** (`/apply`)
- Accounts/auth and plan checkout
- Real licensed photography (currently Unsplash placeholders)
- Legal pages (Terms, Privacy, Cookies) — footer links point to `/apply` for now
