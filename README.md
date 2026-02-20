# Swifotine Landing Page

Production landing page for **Swifotine** built with Next.js App Router.

## What ships

- Single polished landing experience at `/`
- Dark mode + light mode toggle with saved preference
- Direct download CTA to the arm release package:
  - `https://github.com/juggperc/swifotine/releases/download/arm/Swifotine.app.zip`
- Updated favicon generated from the real app icon (`src/app/favicon.ico`)
- Animated, responsive design tuned for desktop and mobile

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm run lint
npm run build
```

## Deploy with Vercel CLI

```bash
vercel deploy -y
```

For a production deployment:

```bash
vercel deploy --prod -y
```
