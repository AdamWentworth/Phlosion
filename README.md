# phlosion.com

Phlosion is a software product lab: a recruiter-facing companion to [adamwentworth.ca](https://adamwentworth.ca) that turns project work into product case studies.

The site shows full-stack services, local AI systems, desktop tooling, websites, and C++ game/runtime work through users, delivery surfaces, architecture, market constraints, and support needs.

## Purpose

- Product case studies for hiring managers and recruiters
- A product-minded layer that complements the resume site
- Interactive demos, landing pages, release notes, documentation, and technical systems behind each project
- Engineering notes that expose architecture, quality, release, and support decisions in product context
- Careful framing for fan/community projects as portfolio, learning, or support tooling
- A visible example of Next.js and Tailwind CSS site work

## Portfolio Tracks

- **Pokemon Go Nexus:** full-stack coordination system
- **Jarvin:** local AI assistant platform
- **Cipher Snagem Editor:** cross-platform desktop tooling
- **Pokemon Autochess:** systems-heavy game prototype
- **AdamWentworth.ca:** Astro resume and portfolio site
- **Phlosion.com:** Next.js and Tailwind CSS product-lab site

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) App Router
- **Styling:** [Tailwind CSS](https://tailwindcss.com) with custom CSS tokens
- **Hosting:** [Vercel](https://vercel.com)
- **Domain:** `phlosion.com`

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run format
npm run generate:social-card
npm run optimize:media
npm run verify
```

## Deployment

Push to GitHub and connect to Vercel. Set the custom domain to `phlosion.com`.
