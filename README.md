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


## Runtime

This project is pinned to Node.js 26.10.0 (current release at the time of this package) and uses React 19.3.0, Vite 8.3.3, @vitejs/plugin-react 6.1.2, and Wrangler 4.148.0.

Run `npm install` once after cloning to generate the local `package-lock.json`, then use `npm run build` for a production build or `npm run deploy` for Cloudflare Workers Static Assets.
