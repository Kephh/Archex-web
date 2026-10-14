# Archex Website

Premium software engineering company website built with Next.js App Router, TypeScript, Tailwind CSS, MDX content files, Supabase lead persistence, Resend notifications, Vitest, Playwright, and GitHub Actions.

## Windows PowerShell Setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Checks

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

## Environment Variables

Fill these in `.env.local` for local integration testing and in your hosting provider for production.

- `NEXT_PUBLIC_SITE_URL`: production URL, such as `https://example.com`.
- `SUPABASE_URL`: Supabase project URL from Project Settings.
- `SUPABASE_SECRET_KEY`: Supabase server-only secret or service role key. Required with `SUPABASE_URL` for production persistence. Never expose this in browser code.
- `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM`: configure all three to send notification email from a verified domain. The lead is still saved if notification email is unavailable.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: optional Cloudflare Turnstile site key.
- `TURNSTILE_SECRET_KEY`: optional Turnstile secret key.

In development, missing Supabase credentials produce a safe validation-only success message. In production, missing Supabase credentials make enquiries unavailable rather than silently discarding leads.

## Supabase

1. Create a Supabase project.
2. In Supabase SQL Editor, run `supabase/migrations/202610120001_create_leads.sql`, or link the project with the Supabase CLI and run:

```powershell
supabase db push
```

3. Copy `SUPABASE_URL` and a server-only secret/service role key into `.env.local` and production hosting settings.
4. Confirm Row Level Security is enabled on `public.leads`.
5. Submit a test enquiry and verify a row appears in `public.leads`.

## Resend

1. Create or open a Resend account.
2. Verify the sending domain for production.
3. Create an API key.
4. Set `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, and `LEAD_NOTIFY_FROM`.
5. Submit a test enquiry after Supabase is configured. Leads are persisted before notification email is attempted.

## Optional Spam Protection

Cloudflare Turnstile is optional. Add both the public site key and secret key to render and enforce the widget. The honeypot field is always active.

## Content

Content lives in `content/services`, `content/modernization`, `content/industries`, `content/work`, and `content/insights`. Each `.mdx` file needs frontmatter with `title`, `slug`, `summary`, and `status`. Draft entries are ignored by public route generation.

Case studies are currently illustrative and clearly labeled. Replace them with approved real work, real constraints, and verified outcomes only.

## Deployment

Recommended build command:

```powershell
npm run build
```

Production smoke tests:

- Visit `/`, `/services`, `/modernization`, `/industries`, `/work`, `/insights`, `/contact`, and `/start-project`.
- Submit a test enquiry and verify Supabase persistence.
- Verify Resend notification delivery.
- Check `/sitemap.xml`, `/robots.txt`, and metadata in the deployed page source.
- Test mobile navigation at 390px width.

## Launch Checklist

- Replace `src/config/site.ts` example email, address, and social links.
- Add real company story and team details to `/about`.
- Replace illustrative case studies with approved client work or keep them labeled as illustrative.
- Get legal review for `/privacy` and `/terms`.
- Configure Supabase, Resend, and optional Turnstile.
- Set production environment variables in hosting.
- Connect domain and configure DNS.
- Run the full check suite before launch.

## External Services And Costs

Supabase, Resend, Cloudflare Turnstile, domain registration, and hosting may require paid plans depending on volume, sending domain needs, and production requirements.
