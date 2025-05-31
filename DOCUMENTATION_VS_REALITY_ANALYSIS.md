# Documentation vs. Reality Analysis  
_Last scan: 2025-05-31_

This report compares the **documented standards & best-practices** (Style Guide, Technical Docs, Design System Roadmap) with the **current “as-is” codebase** (`nathan-dryer/app`).  
Each discrepancy lists evidence, severity, and exact remediation steps.

> **Severity Legend**  
> 🔴 High – blocks compliance / major tech-debt  
> 🟠 Medium – inconsistency, increases maintenance cost  
> 🟢 Low – cosmetic, fix when touching code  

---

## 1 Language & Typing

| # | Issue | Evidence | Severity | Recommendation |
|---|-------|----------|----------|----------------|
| 1.1 | **Mixed JS / TS** – components still `.jsx` / `.js`; standard says **all `.tsx`** | `frontend/src/components/Header.jsx`, `App.js` | 🔴 | Rename files to `.tsx`, add prop interfaces, run `tsc --noEmit` until clean. |
| 1.2 | **ESLint ignores TS** despite TypeScript in repo | `frontend/eslint.config.js` → `ignores: **/*.ts` | 🔴 | Switch parser to `@typescript-eslint/parser`; include `**/*.{ts,tsx}` in lint set. |
| 1.3 | **Duplicate data models** – `data.js` vs `data.ts` shapes diverge | `frontend/src/data.js` vs `data.ts` | 🟠 | Delete JS mock; move to `data.mock.ts` implementing interfaces in `src/types/portfolio.ts`. |

---

## 2 Component Structure

| # | Issue | Evidence | Severity | Recommendation |
|---|-------|----------|----------|----------------|
| 2.1 | **Flat folder, default exports** vs documented *atomic / named exports* | `frontend/src/components/*.jsx` all default export | 🟠 | Convert to folders: `components/Header/Header.tsx` + barrel `index.ts`; use `export const Header`. |
| 2.2 | **No layouts dir** though Style Guide references `layouts/` | absent path | 🟢 | Introduce `src/layouts/Layout.tsx` when you refactor pages. |

---

## 3 Styling & Design Tokens

| # | Issue | Evidence | Severity | Recommendation |
|---|-------|----------|----------|----------------|
| 3.1 | **8-px spacing scale not implemented** | `tailwind.config.js` spacing only default; `index.css` lacks `--space-section`, `--space-component` | 🔴 | Add tokens `0,2,4,6,8,12,16,24` (px/4) to `theme.spacing`; inject clamp vars in `:root`. |
| 3.2 | **Hard-coded hex colors inside components** | `Skills.jsx` uses inline `style={{backgroundColor: '#3B82F6'}}` | 🟠 | Replace with Tailwind token `bg-primary-500` or CSS var. |
| 3.3 | **Tailwind class order lint absent** | no `eslint-plugin-tailwindcss` | 🟢 | Add plugin + `classnames-order` rule. |

---

## 4 Tooling & Tests

| # | Issue | Evidence | Severity | Recommendation |
|---|-------|----------|----------|----------------|
| 4.1 | **Zero project tests** despite docs requiring Jest & Pytest | `find` shows none outside node_modules | 🔴 | Scaffold Jest + React Testing Library; add first snapshot for Header. |
| 4.2 | **No Playwright / axe a11y tests** | `/tests` only empty `__init__.py` | 🟠 | Add `contrast.spec.ts` per roadmap (320/768/1440 breakpoints). |
| 4.3 | **No CI config** (GitHub Actions) | repo lacks `.github/workflows` | 🟢 | Add CI: lint → test → build. |

---

## 5 Accessibility (A11y)

| # | Issue | Evidence | Severity | Recommendation |
|---|-------|----------|----------|----------------|
| 5.1 | **44 px tap target rule not enforced** | `FloatingActionButton.jsx`: `w-10 h-10` (=40 px) | 🔴 | Update shared `Button` util: `min-w-[44px] min-h-[44px]`. |
| 5.2 | **Focus outline inconsistent** | custom buttons mix inline and Tailwind classes | 🟠 | Centralise `focus-ring` utility, ensure every interactive element applies it. |

---

## 6 Deployment & Env

| # | Issue | Evidence | Severity | Recommendation |
|---|-------|----------|----------|----------------|
| 6.1 | **Docker stack present though docs now prefer static hosting** | `Dockerfile`, `nginx.conf` | 🟠 | Remove or move to `docker/legacy/`; update README removal note. |
| 6.2 | **Frontend .env injection via Docker build arg** no longer relevant | lines 24-29 in `Dockerfile` | 🟢 | Delete when Docker removed. |

---

## 7 Backend API

| # | Issue | Evidence | Severity | Recommendation |
|---|-------|----------|----------|----------------|
| 7.1 | **No version prefix** (`/api` vs `/api/v1`) as per standards | `backend/server.py` mounts `prefix="/api"` | 🟠 | Change to `/api/v1`; deprecate old routes. |
| 7.2 | **Model typing loose (`id: str`)** – no `UUID` validation | `StatusCheck.id: str` in `server.py` | 🟢 | `id: UUID4` with Pydantic v2 `from uuid import UUID`. |

---

## 8 Documentation Mismatches

| # | Issue | Evidence | Severity | Recommendation |
|---|-------|----------|----------|----------------|
| 8.1 | **Docs cite Storybook snapshots; Storybook absent** | no sb config | 🟠 | Install `@storybook/react` + initial stories for Button, Timeline. |
| 8.2 | **Roadmap references `Landing.tsx`, `CommandPalette.tsx`** – files don’t exist | code search empty | 🟢 | Align roadmap once components renamed/migrated. |

---

## 9 Priority Action Queue (Top 5)

1. **TypeScript migration** (1.1 + 1.2)  
2. **Spacing scale & CSS vars** (3.1)  
3. **Introduce Jest + first tests** (4.1)  
4. **Tap-target & focus utilities** (5.1, 5.2)  
5. **Component restructure & named exports** (2.1)  

Tracking each item via GitHub issues linked to this report is recommended.

---

_End of report_
