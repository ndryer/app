# Nathan Dryer Portfolio – Technical Documentation  
_Last revision : 2025-05-31_

This document captures **everything you need to run, build, and ship** the single-page portfolio hosted at **nathandryer.com**.  
There is **no backend** – the site is compiled to static files and served through **GitHub Pages**.

---

## 1 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| UI Framework | React 19 | ^19 | Declarative component model |
| Language | TypeScript | ^5.8 | Type-safe authoring |
| Styling | Tailwind CSS | ^3.4 | Utility-first, dark-mode class |
| Animation | Framer Motion | ^12 | Declarative motion, respects `prefers-reduced-motion` |
| Tooling | Vite (CRA-compat) | ^5 | Fast dev server & build |
| Lint / Format | ESLint v9 + Prettier | — | Consistent style & quality |
| Hosting | GitHub Pages | — | Free CDN for static assets |
| CI (optional) | GitHub Actions | — | Lint → Build → Deploy |

---

## 2 Directory Layout (simplified)

```
frontend/
└─ src/
   ├─ components/     # Header.tsx, Timeline.tsx, etc.
   ├─ styles/         # global.css (Tailwind imports + CSS vars)
   ├─ types/          # shared TS interfaces
   ├─ data.mock.ts    # static JSON data
   ├─ App.tsx         # SPA root
   └─ main.tsx        # ReactDOM.createRoot(...)
```

> Rule : keep components flat or use small sub-folders – no complex atomic hierarchy required.

---

## 3 Local Development

1. Install Node ≥ 20  
   ```bash
   git clone https://github.com/nathan-dryer/app.git
   cd app/frontend
   yarn
   ```

2. Start dev server (hot reload @ http://localhost:5173)  
   ```bash
   yarn dev
   ```

3. Lint & type-check anytime  
   ```bash
   yarn lint       # ESLint
   yarn tsc --noEmit
   ```

---

## 4 Build & GitHub Pages Deployment

### 4.1 Build

```bash
cd frontend
yarn build           # outputs static files to dist/
```

### 4.2 One-command publish (manual)

```bash
# install once
yarn add -D gh-pages

# package.json
"scripts": {
  "predeploy": "yarn build",
  "deploy": "gh-pages -d dist -b gh-pages"
}

# then
yarn deploy
```

This pushes the `dist/` folder to the `gh-pages` branch, automatically served at  
`https://<github-username>.github.io/<repo-name>/`.

### 4.3 Custom Domain (nathandryer.com)

1. In repo → Settings → Pages → **Custom domain** → `www.nathandryer.com`  
2. Add a DNS **CNAME** record:  
   ```
   www   CNAME   <github-username>.github.io
   ```
3. (Optional) Root domain redirect: use an ALIAS/ANAME to `www` or an A record to GitHub’s IPs.  
4. Enable “Enforce HTTPS”.

---

## 5 Continuous Deployment (optional)

`.github/workflows/pages.yml`

```yaml
name: Pages CI
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: |
          cd frontend
          yarn
          yarn lint && yarn tsc --noEmit
          yarn build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: frontend/dist
```

---

## 6 Accessibility & Performance Checklist

- 44 px × 44 px minimum tap targets (`min-w-[44px] min-h-[44px]`).  
- Focus indication via `.focus-ring` utility.  
- Alt text for all images; empty `alt=""` if decorative.  
- Colour contrast ≥ 4.5 : 1 (WCAG AA).  
- Use `prefers-reduced-motion` to disable non-essential animations.  
- Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO.

---

## 7 Troubleshooting

| Symptom | Fix |
|---------|-----|
| Tailwind classes not applied | Ensure `@tailwind base; components; utilities;` in `global.css`. |
| Broken relative links on GH Pages | Confirm `vite.config.ts` has `base:'/app/'` or repository name. |
| 404 after page refresh | This is a true SPA; configure `<HashRouter>` or use GitHub Pages 404 redirect trick. |
| Custom domain not HTTPS | Wait up to 24 h after enabling "Enforce HTTPS". |

---

## 8 Glossary

* **SPA** – Single-Page Application (front-end routing only).  
* **Token** – Named design value (spacing, colour, etc.).  
* **Tailwind CLI** – PostCSS engine generating utility classes.  
* **GitHub Pages** – Static hosting service backed by a `gh-pages` branch.  

_End of Technical Documentation_
