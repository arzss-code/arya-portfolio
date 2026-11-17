<div align="center">
  <a href="https://atsiilaarya.me">
    <img src="./public/images/icon.webp" alt="Atsiila Arya Nabiih Logo" width="76" height="76" />
  </a>

  <h1>Atsiila Arya Portfolio</h1>

  <p>
    Personal portfolio, project showcase, and developer activity dashboard of <strong>Atsiila Arya Nabiih</strong>.<br />
    Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Supabase, Next-Intl, and PostHog.
  </p>

  <p>
    <a href="https://atsiilaarya.me">
      <img src="https://img.shields.io/badge/Live_Site-atsiilaarya.me-0f5ef0?style=flat-square" alt="Live Website" />
    </a>
    <a href="https://github.com/arzss-code/arya-portfolio/releases">
      <img src="https://img.shields.io/github/v/release/arzss-code/arya-portfolio?style=flat-square&color=16a34a" alt="Latest Release" />
    </a>
    <a href="./LICENSE">
      <img src="https://img.shields.io/github/license/arzss-code/arya-portfolio?style=flat-square&color=334155" alt="MIT License" />
    </a>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js" alt="Next.js 16" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5.7" />
    </a>
  </p>
</div>

---

## Overview

Source code for [atsiilaarya.me](https://atsiilaarya.me), my personal website and portfolio. It presents software engineering case studies, verified certifications, live GitHub contribution metrics, and real-time portfolio traffic analytics in both Indonesian and English.

You are welcome to explore the codebase for architectural reference or fork it as a starter for your own portfolio (please replace personal assets, copy, and credentials before publishing).

## Key Highlights

- **Tactile Rim-Lit Design System:** Custom 5-layer CSS surface tokens in `app/globals.css` (`.btn-tactile-*`, `.surface-tactile-track`, `.thumb-tactile-primary`, `.input-tactile`) with physical `:active` press feedback, high-contrast `:focus-visible` outlines, light/dark modes, and full `prefers-reduced-motion` support.
- **Core Web Vitals Optimized:** Server-rendered hero prioritization (`fetchPriority="high"`, responsive `sizes`, `preconnect` hints), `requestIdleCallback` analytics deferral, and route-level `next/dynamic` splitting (`223 ms` desktop LCP, `0.00` mobile CLS).
- **Hybrid SSR + SWR Content:** Projects and achievements are stored in Supabase PostgreSQL, pre-fetched on the server as `initialData` for search engine crawlers, and revalidated client-side via SWR, paired with MDX case studies.
- **Developer & Traffic Dashboard:** Visualizes GitHub contribution calendars via the GitHub GraphQL API alongside visitor and page-view trends from PostHog Insights.
- **Technical SEO & AI Discovery:** Dynamic `/sitemap.xml`, `/robots.txt`, `next/og` Open Graph image generation (`1200x630`), rich JSON-LD structured data (`ProfilePage`, `Person`, `WebSite`, `Service`, `CollectionPage`, `SoftwareSourceCode`, `BreadcrumbList`), and an `llmstxt.org`-compliant `/llms.txt` endpoint.
- **Bilingual Support (ID / EN):** Cookie-persisted internationalization powered by `next-intl` without duplicate locale URL prefixes.

## Live Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Hero introduction, availability status, featured bento grid, and service overview |
| `/about` | Biography, work & organization experience, education, and downloadable CV |
| `/projects` & `/projects/[slug]` | Filterable project showcase with MDX case studies, galleries, and live/repo links |
| `/achievements` | Searchable certifications and awards with credential verification modal |
| `/dashboard` | Live GitHub contribution calendar and PostHog portfolio traffic charts |
| `/contact` | Social channels and validated SMTP contact form |
| `/sitemap.xml` & `/llms.txt` | Search engine XML sitemap and structured plain-text index for AI agents |

## Tech Stack

- **Core:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack), [React 19](https://react.dev/), [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling & Motion:** [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/), `next-themes`
- **Data, Auth & Backend:** [Supabase](https://supabase.com/) (`@supabase/ssr`), [SWR](https://swr.vercel.app/), [Zustand](https://zustand-demo.pmnd.rs/), [NextAuth.js](https://next-auth.js.org/), [Nodemailer](https://nodemailer.com/)
- **Content, i18n & Analytics:** MDX (`remark`, `react-markdown`), [next-intl](https://next-intl.dev/), [PostHog](https://posthog.com/), [Chart.js](https://www.chartjs.org/), Vercel Analytics

## Project Structure

The codebase follows a modular, feature-first layout:

```text
arya-portfolio/
├── app/                  # Next.js App Router pages, metadata routes, and API handlers
│   ├── api/              # REST endpoints (projects, achievements, github, analytics, email, cron)
│   ├── llms.txt/         # AI crawler plain-text index
│   └── version/          # Release version manifest endpoint (GET /version)
├── common/               # Shared UI primitives, layouts, constants, types, stores, and SEO helpers
│   ├── components/       # Reusable elements (Button, Image, InputField, TiltedCard) & Header layout
│   ├── constants/        # Static profile metadata, career, education, and tech stack definitions
│   ├── libs/             # JSON-LD builders, SEO metadata helpers, PostHog, MDX, and NextAuth config
│   └── utils/            # Server, client, middleware, and public Supabase clients
├── contents/             # MDX markdown descriptions for portfolio projects
├── hooks/                # Custom viewport and notification React hooks
├── messages/             # Localized UI copy and SEO strings (en.json, id.json)
├── modules/              # Feature modules (home, about, projects, achievements, dashboard, contact)
├── public/               # Static WebP assets, icons, and CV document
└── services/             # Data-fetching and external API service layer
```

## Getting Started

### Prerequisites

- **Node.js** `>= 20.x` (with `npm`) or **[Bun](https://bun.sh/)** `>= 1.1`
- A [Supabase](https://supabase.com/) project (optional if running UI-only; empty states render gracefully when credentials are omitted)

### 1. Clone and Install

```bash
git clone https://github.com/arzss-code/arya-portfolio.git
cd arya-portfolio

# Using npm
npm install

# Or using Bun
bun install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Site Metadata & SEO
DOMAIN=http://localhost:3000
GOOGLE_SITE_VERIFICATION=          # Optional: Google Search Console verification token

# Supabase (Projects & Achievements CMS)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth.js (Optional unless using authenticated features)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Developer Dashboard (Optional: GitHub GraphQL & PostHog Insights)
GITHUB_READ_USER_TOKEN_PERSONAL=   # GitHub Personal Access Token (read:user scope)
NEXT_PUBLIC_POSTHOG_KEY=
POSTHOG_PROJECT_ID=
POSTHOG_API_KEY=                   # PostHog Personal API Key for server-side insights

# Contact Form SMTP (Optional: Gmail App Password for /api/email)
NODEMAILER_EMAIL=
NODEMAILER_PW=
```

### 3. Run Locally

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Typecheck and Production Build

```bash
npx tsc --noEmit
npm run build
npm run start
```

## Deployment

This project is configured for [Vercel](https://vercel.com/):

1. Import the repository into Vercel and set `DOMAIN` to your production URL (for example, `https://atsiilaarya.me`) along with the environment variables above.
2. `vercel.json` includes a lightweight scheduled cron job (`/api/cron/keep-alive` on Mondays and Thursdays at `00:00 UTC`) that pings Supabase so free-tier instances do not pause due to inactivity.
3. Release metadata is tracked in [version.json](./version.json) and [CHANGELOG.md](./CHANGELOG.md), and exposed at `/version`.

## Contributing & Security

- Contribution guidelines, folder conventions, and pre-PR checks: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Vulnerability reporting policy: [SECURITY.md](./SECURITY.md)
- Release history: [CHANGELOG.md](./CHANGELOG.md)

## License

Released under the [MIT License](./LICENSE). Copyright (c) 2026 Atsiila Arya Nabiih.
