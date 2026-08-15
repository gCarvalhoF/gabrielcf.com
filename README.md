# personal-site

Vitrine + blog for gabrielcf.com. Astro 7, hand-written Markdown content collections
for now — Keystatic CMS, Docker packaging, and CI/CD land in later phases.

## Local dev

```
npm install
npm run dev
```

## Structure

- `src/content/posts/{en,pt}/*.md` — blog posts
- `src/content/projects/{en,pt}/*.md` — vitrine project entries
- `src/pages/{en,pt}/` — routes per locale (Astro i18n routing, `prefixDefaultLocale: true`)
- `src/layouts/BaseLayout.astro` — meta tags, OG/Twitter cards, JSON-LD, RSS `<link>`

## Status

Phase 1 (static scaffold, no CMS) — see the implementation plan for the full build order.
