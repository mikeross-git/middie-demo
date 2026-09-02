# Middie website and clickable prototype

This repository contains the public Middie marketing site and the browser-only React prototype:

- `/` — archived marketing site, including the waitlist, blog, legal pages, and analyzer
- `/demo` — interactive React prototype

The marketing site's images and fonts are stored locally in `site/site-assets`. Framer's browser runtime remains referenced for its generated interactions, including the Tally waitlist component.

A standalone, browser-only React prototype designed to be deployed independently and linked or embedded from a Framer site.

## Guardrails

- No backend, database, API routes, authentication, or environment variables
- No real camera, messaging, payments, social integrations, or external services
- All interactions use temporary React state and mocked fixture data
- No user information is collected, transmitted, or persisted

## Local setup

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. The app is also available at `/demo`; Vercel rewrites client-side paths to the app entry point.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

To build the combined Cloudflare site:

```bash
npm run build:cloudflare
```

Cloudflare should deploy with `npx wrangler deploy`; the asset configuration is stored in `wrangler.jsonc`.

## Deploy to Vercel

1. Import this folder into a new Vercel project.
2. Keep the detected framework preset as **Vite**.
3. Use `npm run build` and the `dist` output directory.
4. No environment variables are required.

## Embed in Framer

Deploy first, then place the deployment URL in a Framer Embed component. Give the embed a minimum height of `760px` on desktop and `100dvh` on mobile. The prototype automatically removes its desktop device framing at phone widths.

## Structure

- `src/components/` — reusable visual primitives and the responsive shell
- `src/styles/index.css` — Middie design tokens and component styling
- `src/App.tsx` — temporary stage-one composition; later screens will replace this placeholder
- `vercel.json` — SPA fallback so direct URLs such as `/demo` work
