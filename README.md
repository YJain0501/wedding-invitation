# Premium Interactive Indian Wedding Invitation

Frontend-only foundation for a cinematic Indian wedding invitation website.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Run Locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Project Foundation (Step 1)

This project is prepared with:

- Royal design tokens (burgundy + gold palette)
- Typography setup for script/serif/sans combinations
- Animation-ready style layers
- Folder structure for sections, components, hooks, and utilities
- Central wedding configuration in:
  - `src/config/weddingConfig.ts`

## Update Wedding Information

Edit `src/config/weddingConfig.ts` to update:

- Couple names and introductions
- Wedding date/time/timezone
- Events and venues
- Gallery paths
- Hero/welcome/venue media
- Background music path
- RSVP WhatsApp/email contact

## Assets

Place static assets under:

- `public/assets/images/couple`
- `public/assets/images/backgrounds`
- `public/assets/images/gallery`
- `public/assets/images/events`
- `public/assets/images/decorations`
- `public/assets/music`

## Deployment

This is a static frontend app and can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- Any static host serving the `dist/` output from `npm run build`
