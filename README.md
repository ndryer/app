# Nathan Dryer • Personal Portfolio

A lightweight, single-page site that showcases my work, skills and contact details.  
Built with modern-but-minimal tooling, published via **GitHub Pages** at **https://nathandryer.com**.

---

## 🚀  Why this project exists
* Lets recruiters and collaborators experience my work instead of reading a PDF.
* Doubles as a sandbox for trying the newest React / Tailwind features without extra infrastructure.
* Entirely static—no server, database, or API to maintain.

---

## ✨  Key Features
| Feature | Notes |
|---------|-------|
| Smooth scrolling timeline | Animated with Framer Motion |
| Skills grid | Responsive, token-based spacing |
| Command palette | `⌘ / Ctrl + K` for quick navigation |
| Dark / light theme | Respects OS preference |
| Accessible by default | WCAG 2.2 AA contrast, focus ring, 44 px tap targets |

---

## 🔧  Tech Stack
| Layer | Tool | Why |
|-------|------|-----|
| UI | **React 19** + **TypeScript** | Modern, type-safe |
| Styling | **Tailwind CSS 3** | Utility-first with custom spacing tokens |
| Animation | **Framer Motion 12** | Declarative motion, respects `prefers-reduced-motion` |
| Build | **Vite 5** | Fast dev server & build |
| Lint / Format | ESLint v9 • Prettier | Consistent code style |
| Hosting | **GitHub Pages** | Free CDN, custom domain support |

---

## 💻  Local Development
```bash
# 1 · Clone & install
git clone https://github.com/nathan-dryer/app.git
cd app/frontend
yarn

# 2 · Start dev server (http://localhost:5173)
yarn dev

# 3 · Optional quality checks
yarn lint        # ESLint + Prettier
yarn tsc --noEmit
```

---

## 🌐  Deployment (GitHub Pages)
1. Install the helper once:
   ```bash
   yarn add -D gh-pages
   ```
2. Add scripts to the root `package.json`:
   ```json
   "scripts": {
     "predeploy": "yarn --cwd frontend build",
     "deploy": "gh-pages -d frontend/dist -b gh-pages"
   }
   ```
3. Publish:
   ```bash
   yarn deploy
   ```
   The static files land on the **`gh-pages`** branch and are served at  
   `https://<github-user>.github.io/<repo>/`.

### Custom Domain
1. In **Repo → Settings → Pages** set custom domain `www.nathandryer.com`.  
2. Add a DNS record:  
   ```
   www  CNAME  <github-user>.github.io
   ```  
3. Enable **Enforce HTTPS** and wait for the TLS certificate.

---

## 🗂  Project Structure (concise)
```
frontend/
└─ src/
   ├─ components/     # Header.tsx, Timeline.tsx, etc.
   ├─ styles/         # global.css (Tailwind install + CSS vars)
   ├─ types/          # shared TS interfaces
   ├─ data.mock.ts    # static data displayed on the page
   ├─ App.tsx         # SPA root component
   └─ main.tsx        # ReactDOM.createRoot(...)
```

---

## 🧭  Spacing Tokens
Defined in `tailwind.config.js` (8 px scale) and exposed as CSS vars:

```
:root {
  --space-component: clamp(16px,3vw,24px);
  --space-section:   clamp(40px,6vw,64px);
}
```
Use via Tailwind’s arbitrary values e.g.  
`class="pt-[var(--space-section)]"`.

---

## 🤝  Contributing
1. Create a branch `feat/<short-thing>` or `fix/<bug>`.
2. Follow the [Style Guide](STYLE_GUIDE.md) for TypeScript, Tailwind and accessibility rules.
3. Run `yarn lint && yarn tsc --noEmit` before committing.
4. Open a PR—CI will build & deploy a preview automatically.

---

## 📄  License
MIT – do anything, just give credit.  
© 2025 Nathan Dryer
