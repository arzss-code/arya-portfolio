# Changelog

All notable changes to **arya-portfolio** will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [v1.0.2] - 2026-11-18

### Fixed
- Restored full `Plus Jakarta Sans`, `Manrope`, and variable-font `DM Sans` CSS variables on `<body>` in `app/layout.tsx` and `common/styles/fonts.ts` (plus CSS custom-property fallbacks in `tailwind.config.ts`) so `font-sans` never falls back to browser serif (`Times New Roman`), while keeping Vercel Turbopack builds passing.
- Fixed React development console warning in `common/components/elements/TiltedCard.tsx` by using camelCase `fetchPriority="high"` JSX prop (`fetchpriority="high"` in rendered HTML).

## [v1.0.1] - 2026-11-18

### Fixed
- Resolved Vercel Next.js 16 Turbopack build failure (`next/font/google queries have exactly one entry` on `DM_Sans`) in `common/styles/fonts.ts` by switching `Plus_Jakarta_Sans` to variable-font mode and removing unused multi-weight static `DM_Sans` / `Manrope` font requests that returned dynamic `?kit=...&skey=...` URLs.

## [v1.0.0] - 2026-11-18

### Added
- Dynamic XML sitemap (`app/sitemap.ts`) indexing static showcase routes (`/`, `/about`, `/projects`, `/achievements`, `/dashboard`, `/contact`) and active Supabase project case studies (`/projects/[slug]`).
- Dynamic Open Graph image generator (`app/opengraph-image.tsx` via `next/og`) at `1200x630` resolution and Web App Manifest (`app/manifest.ts`).
- AI Search / GEO discovery endpoint (`app/llms.txt/route.ts`) following the `llmstxt.org` specification.
- Rich SSR JSON-LD structured data builders (`common/libs/jsonLd.ts`) implementing `ProfilePage`, `Person`, `WebSite`, `Service` (local `areaServed` across Mranggen, Demak, Semarang, and Central Java), `CollectionPage`, `SoftwareSourceCode`/`CreativeWork`, and `BreadcrumbList`.
- Local client discovery keywords (`jasa website mranggen demak`, `programmer mranggen demak`, `jasa website semarang`, etc.) across metadata, localized descriptions, and `/llms.txt`.
- Google Search Console HTML verification support via `GOOGLE_SITE_VERIFICATION` environment variable.
- Release version manifest (`version.json`) and `GET /version` endpoint.

### Changed
- Migrated canonical production domain configuration to `https://atsiilaarya.me` with URL normalization and legacy `atsiilaarya.web.id` fallback redirection in `common/constants/metadata.ts`.
- Upgraded `/projects` and `/achievements` to pass server-fetched `initialData` into `useSWR` inside `<Suspense>` boundaries so search crawlers receive full HTML cards and internal links on initial load.
- Localized and expanded SERP titles and meta descriptions (135–159 chars) in `messages/id.json` and `messages/en.json`.
- Updated `app/robots.ts` to allow `/dashboard` indexing while disallowing `/api/`, `/ingest/`, and `/version`.
- Prioritized above-the-fold Hero LCP rendering (`fetchPriority="high"`, explicit image dimensions, and non-blocking initial paint).

### Fixed
- Fixed broken Open Graph URL on `/projects/[slug]` (`/${slug}` -> `/projects/${slug}`).
- Fixed unhandled `500` error on missing or hidden project slugs by deduplicating queries with `React.cache()` and returning `notFound()` (`404`).
