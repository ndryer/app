# Documentation-Reality Audit  
_Target stack: React 19 + TypeScript + Tailwind CSS 3 + FastAPI / Python 3.11_  
_Last scan: 2025-05-31_

This audit lists every place where the **current codebase** (`nathan-dryer/app`) diverges from **modern best-practices** for the declared tech stack.  
Follow the table row-by-row; each “Fix” cell shows the minimal change required to reach the _target state_ described in the Style Guide & Tech Docs.

---

## 1 Language & Linting

| # | File(s) | Discrepancy | Why It’s a Problem | Fix (exact change) |
|---|---------|-------------|--------------------|--------------------|
| 1.1 | `frontend/src/App.js`, `frontend/src/components/*.jsx` | Components in **plain JS/JSX** instead of **`.tsx` with types** | Loses type safety, breaks tree-shaking & joint TS/ESLint rules | `git mv` each file to `.tsx`; add typed prop interfaces (`export interface HeaderProps { … }`). |
| 1.2 | `frontend/eslint.config.js` | **TypeScript is ignored** by the `ignores` array | Lint misses TS errors | Replace ignore glob with `files: ['**/*.{js,jsx,ts,tsx}']`; add `parser: '@typescript-eslint/parser'` and plugin. |
| 1.3 | *none* | **Prettier** integration absent | Inconsistent formatting hampers LLM edits | `yarn add -D prettier eslint-config-prettier` → extend ESLint with `"plugin:prettier/recommended"`. |

---

## 2 Project Structure & Exports

| # | File(s) | Discrepancy | Best Practice | Fix |
|---|---------|-------------|---------------|-----|
| 2.1 | `frontend/src/components` flat list | No _atomic_ folders, all **default exports** | Named exports aid treeshake & intellisense; folders group tests/stories | Move each component into `components/<Name>/<Name>.tsx`; add barrel `index.ts` with `export *`. |
| 2.2 | `frontend/src/data.js` vs `data.ts` | **Duplicate mock data** shapes (JS & TS) | Single source of truth prevents drift | Delete `data.js`; keep a typed `data.mock.ts` implementing interfaces. |

---

## 3 Design System & Styling

| # | Location | Discrepancy | Target Standard | Fix |
|---|----------|-------------|-----------------|-----|
| 3.1 | `tailwind.config.js` | Missing **8-px spacing scale** (`0,2,4,6,8,12,16,24`) | Consistent rhythm / responsive clamp helpers | Extend `theme.spacing` with those keys. |
| 3.2 | `frontend/src/index.css` | No `--space-section` / `--space-component` CSS vars | Tokens allow layout spacing clamps | Add to `:root`: `--space-component: clamp(16px,3vw,24px); --space-section: clamp(40px,6vw,64px);`. |
| 3.3 | Inline style hex colours (e.g. `Skills.jsx`) | Hard-coded colour values | Use Tailwind tokens or CSS vars for theme | Replace `style={{backgroundColor:'#3B82F6'}}` with `className="bg-primary-500"` etc. |
| 3.4 | Focus styles scattered | Inconsistent focus outline classes | Single utility ensures a11y | Centralise `.focus-ring` utility & apply via `@apply`. |

---

## 4 Accessibility

| # | File(s) | Issue | Best Practice | Fix |
|---|---------|-------|--------------|-----|
| 4.1 | `components/FloatingActionButton.jsx` et al. | Buttons **< 44 × 44 px** | WCAG mobile tap-target | Add `min-w-[44px] min-h-[44px]` to shared Button component. |
| 4.2 | No automated a11y tests | Lack of regression guard | Run `axe-playwright` in CI | Add Playwright test `contrast.spec.ts` for 320 / 768 / 1440 viewports; fail if WCAG AA contrast < 4.5 : 1. |

---

## 5 Testing & CI

| # | Gap | Impact | Fix |
|---|-----|--------|-----|
| 5.1 | **No Jest/RTL** component tests | Breaks confidence & LLM feedback loops | `yarn add -D jest @testing-library/react jest-environment-jsdom`; add `Header.test.tsx` snapshot. |
| 5.2 | **No Storybook** despite docs | Harder visual regression & a11y CI | `npx storybook@latest init --builder vite`; add Button, Timeline stories. |
| 5.3 | **No GitHub Actions** | Standards unenforced | Add workflow: `lint → test → build`; include `storybook-static` build for Chromatic if desired. |

---

## 6 Back-End (FastAPI)

| # | File | Discrepancy | Target | Fix |
|---|------|-------------|--------|-----|
| 6.1 | `backend/server.py` | Routes under `/api` (no versioning) | Semantic version prefix | Change router to `APIRouter(prefix='/api/v1')`; add 308 redirects. |
| 6.2 | `StatusCheck.id` typed `str` | Should be `UUID4` | `from uuid import uuid4, UUID`; use `id: UUID = Field(default_factory=uuid4)`. |
| 6.3 | No **pytest** suite | API changes untested | Add `tests/test_status.py` covering POST & GET. |

---

## 7 Deployment Artefacts

| # | File | Discrepancy | Modern Approach | Fix |
|---|------|-------------|-----------------|-----|
| 7.1 | `Dockerfile`, `nginx.conf` | Docker bundles SPA + API behind Nginx; docs now prefer _static host + API micro service_ | Simpler, cheaper hosting | Move legacy docker files to `docker/legacy/`; update README hosting section (Vercel/Render). |

---

## 8 Documentation Synch

| # | Doc vs Code | Conflict | Action |
|---|-------------|----------|--------|
| 8.1 | Style Guide references spacing tokens; **not yet in code** | After token PR merge, doc will be correct | Ensure spacing PR completes before next release. |
| 8.2 | Roadmap mentions `Landing.tsx`, `Button.tsx` files that don't exist | Placeholders for upcoming refactor | Create stubs during TypeScript migration to align docs. |

---

## High-Priority Fix Queue (90-day)

1. **TypeScript migration & ESLint update** – Items 1.1, 1.2, 2.1  
2. **Spacing scale + CSS vars** – Items 3.1, 3.2  
3. **Tap-target & focus utilities** – Items 4.1, 4.2  
4. **Jest + first tests** – Item 5.1  
5. **API versioning & UUID typing** – Item 6.1 & 6.2  

Track each as GitHub issues labelled `audit-fix`.

---

### Verification Commands

```bash
# Lint & types
yarn eslint src && tsc --noEmit

# Unit tests
yarn test --watchAll=false

# Storybook visual
yarn storybook:ci

# Playwright a11y
yarn smoke
```

_Resolve every 🔴 / 🟠 row to achieve full alignment with the documented best practices and to ensure that LLM coding agents operate on a consistent, future-proof foundation._
