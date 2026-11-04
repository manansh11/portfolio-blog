# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Astro as a fully static site (no client JS except the lazy-loaded speed reader). Posts are MDX files in `app/blog/posts/`.

## Essential Commands

```bash
pnpm dev        # dev server on http://localhost:4321
pnpm build      # static build into dist/
pnpm preview    # serve dist/ locally
```

No test framework is configured.

## Architecture

### Tech Stack
- **Framework**: Astro (static output, pinned version), deployed on Vercel via `vercel.json`
- **Styling**: plain CSS in `src/styles/global.css` (Tailwind preflight vendored at the top, no Tailwind dependency)
- **Content**: MDX posts in `app/blog/posts/`, loaded in place by `src/content.config.ts`
- **Font**: Inter, self-hosted in `public/fonts/` (`src/styles/fonts.css`)

### Directory Structure
- `app/blog/posts/` - post files (path kept from the Next.js era)
- `src/pages/` - `index.astro` (numbered index), `blog/[slug].astro`, `404.astro`, `rss.xml.ts`, `sitemap.xml.ts`, `robots.txt.ts`
- `src/layouts/Base.astro` - head/meta, aurora orbs, footer, Vercel analytics scripts
- `src/components/` - `Header.astro`, `Footer.astro`
- `src/lib/posts.ts` - `getNumberedPosts` (oldest = 1, ties by slug), reading time, date format
- `src/scripts/speed-reader.ts` - vanilla speed reader, imported only on first use
- `public/` - static assets, `og.png`

### Key Behaviors
- **Zero JS by default**: only the speed reader loads JS, on hover/click. Reading progress is a CSS scroll-driven animation.
- **Homepage = Index**: `/blog`, `/about` redirect to `/`; `/rss` redirects to `/rss.xml` (all in `vercel.json`)
- **Clean URLs**: `build.format: 'file'` + `cleanUrls` in `vercel.json`, so posts live at `/blog/<slug>`
- **Header**: `<Header home />` on the index, compact elsewhere

### Styling Guidelines ("ethereal" design — see docs/plans/2026-06-09-ethereal-redesign-design.md)
Dark only, no theme toggle. Tokens in `src/styles/global.css`:
- Background: deep space `#06060F` with fixed aurora orbs (blurred radial gradients, slow drift)
- Type: Inter (self-hosted), light weights; titles use white→violet gradient text (`.text-light-gradient`)
- Accent: violet `#A78BFA` / blue `#7DABF8`; labels use `.text-accent-gradient`
- Interaction rule: hover states glow (text-shadow halos), nothing inverts or moves
- Signature: breathing dot (10s cycle) as divider and as `hr` in prose; respect prefers-reduced-motion

### Content Guidelines
Blog posts focus on:
- Systems thinking and philosophy
- Personal development and inner work
- Technology and programming insights
- Life experiences and reflections

When adding new blog posts:
1. Create `.mdx` file in `app/blog/posts/`
2. Include frontmatter: title, date, description
3. Follow existing post naming convention (kebab-case)
4. Ensure mobile responsiveness for any custom components