# WorkHub Employee Dashboard

A responsive React + Vite employee dashboard UI with an approved light theme, optional dark mode, a Home dashboard, a Teams workspace, and work-in-progress states for sections that are not built yet.

## Project structure

```text
src/
  main.jsx
  styles.css
public/
  _headers
  _redirects
  lotus-post.jpg
  lsicon_setting-outline.png
  work-anniversary-star.png
index.html
package.json
vite.config.js
netlify.toml
.nvmrc
.gitignore
```

## Local development

Requires Node.js 20–22. Node 22 is pinned for deployment consistency.

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
npm run preview
```

The production output is written to `dist/`.

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`

`netlify.toml` supplies the build settings, Node version, and SPA fallback. `public/_redirects` provides the same SPA fallback for compatible static hosting behavior.

## Cloudflare Pages

- Framework: Vite / React
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22`

The project is a standard static Vite build and does not require a server runtime.
