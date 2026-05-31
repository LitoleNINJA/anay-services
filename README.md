# Anay Interior — Landing Site

Single-page marketing site for a UAE-based flooring & fit-out studio. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lenis. Contact submissions go through a server action to Resend.

## Quick start

```bash
npm install
cp .env.example .env.local
# fill in RESEND_API_KEY + CONTACT_TO_EMAIL + CONTACT_FROM_EMAIL
npm run dev
```

Open http://localhost:3000

## Where content lives

All copy, services, projects, stats and links live in **`content/content.ts`**. Swap imagery, phone/email and address in **`lib/business.ts`**. Changing text here is safe — components read everything from these files.

## Scripts

- `npm run dev` — local dev with Turbopack
- `npm run build` — production build
- `npm run start` — run the built output
- `npm run lint` — ESLint

## Environment

```
RESEND_API_KEY          # from resend.com
CONTACT_TO_EMAIL        # inbox receiving enquiries
CONTACT_FROM_EMAIL      # verified sender, e.g. "Anay Interior <noreply@anayservices.com>"
NEXT_PUBLIC_SITE_URL    # https://www.anayinterior.com
```

Until `RESEND_API_KEY` is set the form will silently succeed (for local dev) and log a warning; nothing is emailed.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel → New Project → import the repo. Framework auto-detects as Next.js.
3. Add the four env vars above under Settings → Environment Variables (Production + Preview).
4. Settings → Domains: add `anayinterior.com` + `www.anayinterior.com` (canonical is `www`).
   - Registrar DNS: `A` apex → `76.76.21.21`, `CNAME www` → `cname.vercel-dns.com`.
5. Resend domain verification (for sending email): add the SPF + DKIM `TXT` records Resend provides to the same DNS zone.
6. Enable Vercel Web Analytics in project settings.

## Out of scope (v1)

Headless CMS · Arabic/RTL · blog or project detail pages · admin UI · cookie banner · newsletter · A/B testing.

Migration notes:
- **CMS** — swap the import source of `content/content.ts`; components stay the same.
- **Arabic/RTL** — add `next-intl`, `dir="rtl"` handling, and a second `font-display` for Arabic script.
- **Rate limiting** — `app/actions/contact.ts` currently uses an in-memory throttle; swap for Upstash Ratelimit when traffic grows.
