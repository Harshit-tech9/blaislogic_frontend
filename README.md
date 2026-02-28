# BlaiseLogic Website

Marketing site for BlaiseLogic — parent company for MetricAI, AIAdFactory, and custom AI solutions.

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS 4** for styling
- **React Router** for routing

## Commands

| Command   | Description              |
| --------- | ------------------------- |
| `pnpm dev`   | Start dev server (localhost) |
| `pnpm build` | Type-check + production build |
| `pnpm preview` | Serve production build locally |
| `pnpm lint`   | Run ESLint                  |

## Project structure

- **`src/components/landing/`** — Landing page sections (Hero, Philosophy, Infrastructure, VisualBreak, CTA)
- **`src/components/layout/`** — Header, Footer, Container, Section, Layout
- **`src/components/ui/`** — Button, Icon
- **`src/config/site.ts`** — Site copy, nav links, product URLs (single source of truth)
- **`public/`** — Static assets (logo, favicon, robots, sitemap)

## Environment

Optional:

- **`VITE_SITE_URL`** — Canonical origin for meta tags (e.g. `https://blaiselogic.com`)
- **`VITE_VISUAL_BREAK_IMAGE`** — Override URL for the visual-break section image

## Deployment

Run `pnpm build`; serve the `dist/` folder over HTTPS. Point the server at `dist/index.html` for SPA fallback if using client-side routing.
