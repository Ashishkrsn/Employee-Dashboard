# WorkHub Employee Dashboard

React + Vite employee dashboard.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production output is generated in `dist/`.

## Netlify

Netlify can detect this Vite project automatically when connected to the Git repository. Use:

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 22

No `netlify.toml` is required for this project.

## Cloudflare Workers Static Assets

This repository includes `wrangler.jsonc` for Wrangler deployments. Build the app first, then deploy with Wrangler according to your Cloudflare project setup.

The SPA fallback is handled by Cloudflare's `not_found_handling: single-page-application` setting; do not add a `public/_redirects` SPA rule.
