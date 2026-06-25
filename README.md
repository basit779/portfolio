# Abdul Basit — Portfolio

A single-page portfolio for an aspiring **DevOps engineer**. Dark "Terminal × Aurora"
aesthetic with an animated background, a live-typing terminal hero, an animated
CI/CD pipeline, spotlight project cards, and scroll-reveal motion throughout.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**,
**Tailwind CSS**, and **Framer Motion**.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com) — zero config.

- `metadataBase` (in `app/layout.tsx`) auto-resolves to your Vercel URL via
  `VERCEL_PROJECT_PRODUCTION_URL`. To pin a custom domain, set
  `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in the Vercel env vars.
- The social share image is generated at `/opengraph-image` (Vercel OG, edge runtime).

## Structure

```
app/
  layout.tsx           fonts + SEO metadata
  page.tsx             page composition + skip link + footer
  globals.css          design system, keyframes, effects
  opengraph-image.tsx  dynamic social share card
components/
  Background.tsx        aurora blobs + grid + particles + cursor glow
  Nav.tsx               glass nav, scroll progress, mobile menu
  Hero.tsx              gradient name + live-typing terminal + stats
  Projects.tsx          StudySnap + FluxBid spotlight cards
  Pipeline.tsx          animated CI/CD pipeline (DevOps journey)
  Stack.tsx             toolbox + marquee + "leveling up next"
  About.tsx             bio + quick-facts panel
  Contact.tsx           CTA card + links
  Reveal.tsx            scroll-reveal wrapper
  Magnetic.tsx          cursor-magnetic buttons
```

## Before you share it — two manual to-dos

1. **LinkedIn** — a real link wasn't available, so the LinkedIn entry was removed
   rather than ship a broken one. Add yours back in `components/Contact.tsx`
   (`LINKS` array).
2. **StudySnap repo name** — the "Source" link points to
   `github.com/basit779/NotesSummarizer`. Optionally rename that repo to
   `StudySnap` on GitHub (it auto-redirects) and update the URL in
   `components/Projects.tsx` so the brand and repo match.
