# D&D Imperium Trade

Landing page for **D&D Imperium Trade**, a U.S.-based distributor that sources, preps, and ships product to Amazon and Walmart fulfillment centers. Built with Next.js 16 + TypeScript and Tailwind v4.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5.7** (strict)
- **Tailwind v4** + custom CSS design tokens
- **Fonts**: DM Sans + JetBrains Mono via `next/font`

## Pages

- `/` — Home (Hero, Credibility, Process band, Prep Center, Trust, Social proof, Contact, Footer)
- `/catalogo` — Sample catalog with email-gated full access

## Project structure

```
src/
├── app/
│   ├── catalogo/page.tsx   # Catalog page entry
│   ├── globals.css         # Design tokens + all CSS
│   ├── layout.tsx          # Root layout, fonts
│   └── page.tsx            # Home entry
├── components/
│   ├── CatalogClient.tsx   # Catalog page (client)
│   ├── Contact.tsx
│   ├── Credibility.tsx
│   ├── ddi-ui.tsx          # Icons, logo, hooks
│   ├── ddi-video-parts.tsx # ParcelBox, Vehicle for ProcessBand
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── PrepCenter.tsx
│   ├── ProcessBand.tsx     # Kinetic process loop (Stage/Sprite)
│   ├── SocialProof.tsx
│   └── Trust.tsx
└── lib/
    ├── animations.tsx      # Stage/Sprite/useTime framework
    └── ddi-data.ts         # i18n (ES/EN) + content
```

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deploy on Vercel

This project is ready to deploy on [Vercel](https://vercel.com) with zero configuration:

1. Push to GitHub
2. Import the repo on Vercel
3. Vercel auto-detects Next.js and builds with `npm run build`

No environment variables required.

## i18n

The site supports Spanish (default) and English via the language toggle in the header. Preference is stored in `localStorage` (`ddi-lang`).

## Media assets

- `/public/ddi-logo.png` — Lion-shield brand mark
- `/public/prep-warehouse.mp4` / `.webm` / `-poster.jpg` — Warehouse video loop for Prep Center
- `/public/prep-*.jpg` — Photos for evidence tiles

Source media files (`*.mov`, raw `*.jpg`) at the repo root are gitignored to keep the bundle small.
