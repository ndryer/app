# Documentation Summary  
_Last updated: 2025-05-31_

## 1 Project Snapshot
A **single-page React 19 + TypeScript + Tailwind CSS** portfolio distributed as static files via **GitHub Pages** (`gh-pages` branch) at **nathandryer.com**.  
There is **no backend, database, or Docker** in the new target state.

## 2 Core Repository Files

| Path | Purpose |
|------|---------|
| `frontend/src/` | All site code (components, styles, data). |
| &nbsp;  `App.tsx` | Root page component. |
| &nbsp;  `components/` | Simple flat list of React components (`Header.tsx`, `Timeline.tsx`, …). |
| &nbsp;  `styles/global.css` | Tailwind imports + CSS custom properties (`--space-*`). |
| &nbsp;  `types/` | Shared TypeScript interfaces. |
| &nbsp;  `data.mock.ts` | Static JSON/TS data rendered by the page. |
| `tailwind.config.js` | Theme configuration — **must expose 8-px spacing scale**. |
| `README.md` | Quick start & deployment guide. |
| `STYLE_GUIDE.md` | Coding, styling & accessibility rules (simplified). |
| `TECHNICAL_DOCUMENTATION.md` | Tech stack + GitHub Pages deployment details. |
| `CURRENT_ISSUES_AND_FIXES.md` | Actionable checklist to finish migration. |

## 3 Immediate Next Steps

| Priority | Task | Reference |
|----------|------|-----------|
| 🔴 | Convert remaining `.js/.jsx` files to **`.tsx`** with named exports & typed props. | Issues #1 |
| 🔴 | Update **ESLint** config to include TS parser & Tailwind class-order rule. | Issues #2 |
| 🔴 | Add **8-px spacing tokens** to `tailwind.config.js` and `--space-section / --space-component` vars to `global.css`. | Issues #3 |
| 🔴 | Ensure every button/link meets **44 × 44 px** tap-target and uses `.focus-ring`. | Issues #4 + #5 |
| 🟠 | Add `gh-pages` scripts to root `package.json`; run `yarn deploy` once tokens/TS fixes are in place. | Issues #6 |
| 🟢 | Remove stale backend / Docker references from docs once above steps land. | Issues #7 |

_Run the verification block in **CURRENT_ISSUES_AND_FIXES.md** after each PR._

## 4 How LLM Coding Agents Should Work

1. **Read the Style Guide first** – it is short and binding.  
2. Generate components in `frontend/src/components`; export with `export const`.  
3. Use spacing utilities (`p-6`, `pt-[var(--space-section)]`) – never hard-coded `px`.  
4. Add `min-w-[44px] min-h-[44px]` and `.focus-ring` to any new interactive element.  
5. Update `CURRENT_ISSUES_AND_FIXES.md` (check-box) when a task is completed.

---

_Success = site builds with `yarn build`, deploys with `yarn deploy`, and renders on https://nathandryer.com with zero console errors._  
