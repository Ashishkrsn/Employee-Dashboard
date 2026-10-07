# Employee Dashboard

React + Vite employee dashboard UI.

## Production build

```bash
npm install
npm run build
npm run preview
```

Production output is generated in `dist/`.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

Cloudflare Pages supports React/Vite with this configuration.

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`

`netlify.toml` and `public/_redirects` are included for SPA routing.
