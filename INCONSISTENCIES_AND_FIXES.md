# Inconsistencies & Fix-Plan  
_Last reviewed: 2025-05-31_

This document tracks **all deviations from the desired standards** uncovered in the portfolio codebase and prescribes **exact steps** to resolve them.  
Follow the items top-to-bottom; each task unblocks the next.

---

## 1  Inventory of Inconsistencies

| # | Area | Current State | Impact |
|---|------|---------------|--------|
| 1 | **Language / File Extensions** | Mixed `.js`, `.jsx`, `.tsx` across React components (e.g. `src/App.js`, `components/CommandMenu.jsx`). | Breaks type-safety, confuses tooling. |
| 2 | **ESLint Coverage** | `frontend/eslint.config.js` ignores `*.ts`/`*.tsx`. | TS errors slip by CI; inconsistent style. |
| 3 | **Data Model Duplication** | Static data defined in `data.js` (JS objects) and interfaces in `types.ts`; shapes not identical. | Single source of truth unclear; increases bug risk. |
| 4 | **Export Style** | Components use a mix of `export default` and named exports. | Unpredictable import syntax, tree-shaking penalties. |
| 5 | **Tailwind Class Ordering** | Utilities occasionally out of recommended order (layout → spacing → color …). | Harder to scan, merge conflicts. |
| 6 | **Docker-only Deployment Artifacts** | Dockerfile + Nginx exist although personal hosting will use static hosting (e.g. Vercel). | Adds maintenance overhead; unused files may confuse contributors. |

---

## 2  Standardization Recommendations

| Inconsistency | Target Standard |
|---------------|-----------------|
| File extensions | **All React UI in TypeScript**: `.tsx` / `.ts`. No `.js` / `.jsx` in `src/`. |
| Linting | ESLint with `@typescript-eslint` parser & plugin; covers TS + JSX. |
| Data models | **Single source**: `src/types/portfolio.ts`. Generate sample data in `data.mock.ts` that *implements* those interfaces (import types). |
| Exports | Components: **named exports**; Pages (if any): default export. |
| Class order | Follow Tailwind recommended grouping (`flex`, spacing, color, typography, motion). |
| Deployment | Static front-end build (`yarn build`) + optional FastAPI back-end on Render/Fly; **remove Dockerfile & nginx.conf** for personal hosting branch. |

---

## 3  Prioritized Action Plan

### 🥇 Priority 1 — TypeScript Migration & Lint

1. **Rename files**  
   ```bash
   # from repo root
   mv frontend/src/App.js                frontend/src/App.tsx
   mv frontend/src/components/CommandMenu.jsx frontend/src/components/CommandMenu.tsx
   # Repeat for all .js/.jsx in src/**
   ```

2. **Convert syntax**  
   * Change React import to `import { FC } from 'react';`  
   * Add explicit prop interfaces.

3. **Install & configure ESLint for TS**  
   ```bash
   cd frontend
   yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier
   ```
   Update `eslint.config.js`:
   ```diff
   - files: ['**/*.js', '**/*.jsx'],
   + files: ['**/*.{ts,tsx,js,jsx}'],
   ...
   + parser: '@typescript-eslint/parser',
   + plugins: { '@typescript-eslint': eslintTsPlugin, ... }
   ```

4. **Run fixer**  
   ```bash
   yarn eslint src --fix
   yarn tsc --noEmit           # ensure zero TS errors
   ```

### 🥈 Priority 2 — Data Model Consolidation

1. **Create single types file**: `frontend/src/types/portfolio.ts` (see Style Guide).  
2. **Delete** `frontend/src/data.js`.  
3. **Create** typed mock: `frontend/src/data.mock.ts`
   ```ts
   import { Experience, Skill, UserData } from './types/portfolio';
   export const experienceData: Experience[] = [ /* … */ ];
   ```
4. Update component imports:
   ```diff
   - import { userData, experienceData } from './data';
   + import { userData, experienceData } from './data.mock';
   ```

### 🥉 Priority 3 — Export Consistency

1. For each component folder:  
   ```tsx
   // components/Header/Header.tsx
   export const Header: FC<HeaderProps> = () => { … };
   // components/Header/index.ts
   export * from './Header';
   ```
2. Update imports:
   ```diff
   - import Header from './components/Header';
   + import { Header } from './components/Header';
   ```

### 🔧 Priority 4 — Tailwind Utility Order (lint-style)

1. Install plugin:  
   ```bash
   yarn add -D eslint-plugin-tailwindcss
   ```
2. Add rule to ESLint:  
   ```js
   'tailwindcss/classnames-order': 'error'
   ```
3. Run auto-fix:  
   ```bash
   yarn eslint src --fix
   ```

### 🗑️ Priority 5 — Remove Docker Artifacts (optional)

* Delete `Dockerfile`, `nginx.conf`, `entrypoint.sh`.  
* Remove Docker instructions from README.  
* Keep FastAPI back-end runnable via `uvicorn` for local demos.

---

## 4  Before / After Examples

### 4.1 File Conversion

**Before `App.js`**

```js
function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (<Header />);
}
export default App;
```

**After `App.tsx`**

```ts
import { FC, useState } from 'react';
import { Header } from './components/Header';

export const App: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return <Header darkMode={darkMode} />;
};
```

### 4.2 Data Model Source of Truth

```ts
// types/portfolio.ts
export interface Skill { id: string; name: string; level: number; }

// data.mock.ts
import { Skill } from './types/portfolio';
export const skillsData: Skill[] = [
  { id: 's1', name: 'React', level: 90 },
];
```

Components now import types instead of inferring shapes.

---

## 5  Lightweight Deployment Guide (No Docker)

1. **Build static site**  
   ```bash
   cd frontend
   yarn build         # outputs to frontend/build
   ```

2. **Host options**  
   | Platform | Steps |
   |----------|-------|
   | **Vercel** | `vercel .` (point to `/frontend`) – framework = CRA |
   | **Netlify** | Drag-and-drop `frontend/build` or `netlify deploy` |
   | **GitHub Pages** | `npm i -g gh-pages` → `gh-pages -d build` |

_Back-end_: deploy FastAPI separately on Render/Fly (if needed) or convert to Serverless Function later.

---

## 6  Progress Checklist

| Task | Owner | Status |
|------|-------|--------|
| Migrate all `.js/.jsx` → `.tsx` | _You_ | ☐ |
| Enable TS lint rules | _You_ | ☐ |
| Consolidate data models | _You_ | ☐ |
| Normalize exports | _You_ | ☐ |
| Tailwind class order lint | _You_ | ☐ |
| Remove Docker artefacts | _Optional_ | ☐ |

Tick each box as you complete the work; submit PRs referencing this file.

---

> By following this action plan, the repository will achieve full type-safety, consistent style, simpler hosting, and easier onboarding for both humans and LLM coding agents.
