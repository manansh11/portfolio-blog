# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio and blog website built with Next.js App Router, TypeScript, and Tailwind CSS. The site features a blog with MDX support for rich content authoring.

## Essential Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Testing
# No test framework is currently configured
```

## Architecture

### Tech Stack
- **Framework**: Next.js (canary version with App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.0.0-alpha
- **Content**: MDX for blog posts
- **Font**: Geist (Vercel's font family)

### Directory Structure
- `app/` - Next.js App Router pages and layouts
  - `api/` - API routes for homepage and posts data
  - `blog/` - Blog functionality
    - `posts/` - MDX blog post files
- `components/` - Reusable React components
- `lib/` - Utility functions and blog post logic
- `public/` - Static assets

### Key Components
- **MDX Blog System**: Posts are stored as `.mdx` files in `app/blog/posts/`
- **Post Utilities**: `lib/posts.ts` handles post fetching, sorting, and metadata
- **Theme**: Dark blue color scheme with CSS variables defined in `app/globals.css`
- **Navigation**: Sticky header with Home/Blog links

### Styling Guidelines
The site uses a custom dark theme with:
- Background: Oxford Blue (#10131a)
- Headings: Jordy Blue (#88b3f0)
- Text: Light gray/white variants
- Links: Hover effects with underline decoration

### Content Guidelines
Blog posts focus on:
- Systems thinking and philosophy
- Personal development and inner work
- Technology and programming insights
- Life experiences and reflections

When adding new blog posts:
1. Create `.mdx` file in `app/blog/posts/`
2. Include proper frontmatter (title, date, summary)
3. Follow existing post naming convention (kebab-case)
4. Ensure mobile responsiveness for any custom components