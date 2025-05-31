# CURRENT_ISSUES_AND_FIXES.md  
_Actionable checklist to finish the simple one-page portfolio_  
_Last scan : 2025-05-31_

Legend 🔴 High 🟠 Medium 🟢 Low  

| # | Priority | Files / Path | Issue | Fix |
|---|----------|--------------|-------|--------|
| 1 | 🔴 | `frontend/src/App.tsx`, `frontend/src/components/*.tsx` | Components migrated to strict TypeScript (`.tsx`) with **named exports** (`export const Header`) | ✅ |
| 2 | 🔴 | `frontend/eslint.config.js` | ESLint ignores `.ts/.tsx`; no TS parser | ✅ |
| 3 | 🔴 | `tailwind.config.js`, `index.css`, Header, CommandMenu, Timeline, Skills | 8-px scale in place + all section/card spacing implemented | ✅ Added spacing keys `0,2,4,6,8,12,16,24` in Tailwind `theme.spacing`; defined `--space-component: 24px;` and `--space-section: 48px;` in `:root` of `src/index.css`. Skills grid uses `gap-6` (24px), cards use `p-5` (20px). |
| 3.1 | 🔴 | `frontend/src/components/Timeline.tsx` | Timeline component spacing requirements | ✅ Implemented and tested timeline spacing with `p-6` (24px padding), `space-y-8` (32px vertical spacing), and `mr-4` (16px margin-end) via CSS overrides. Added Playwright test to verify spacing. |
| 4 | 🔴 | Buttons / FAB (e.g. `FloatingActionButton.jsx`) | Tap target smaller than 44 px | Add `min-w-[44px] min-h-[44px]` classes or wrap with shared `Button` component. |
| 5 | 🟠 | Focus styles inconsistent | Some interactive elements lack visible focus | Create `.focus-ring` utility in `global.css` and apply to all `<button>` / `<a>` elements. |
| 6 | 🟠 | Build script for GH Pages absent | Manual deploy error-prone | `yarn add -D gh-pages`; in root `package.json` add scripts:<br>`\"predeploy\":\"yarn --cwd frontend build\",`<br>`\"deploy\":\"gh-pages -d frontend/dist -b gh-pages\"` |
| 6.1 | ✅ | Root workspace setup | Root workspace/package.json created | Added workspace configuration with frontend as workspace and deployment scripts |
| 7 | 🟢 | README still references Docker/backend | Outdated info | Remove backend/Docker sections once above issues resolved. |

---

## Verification

```bash
# Lint & type check
cd frontend
yarn lint && yarn tsc --noEmit

# Build
yarn build            # output in frontend/dist

# Manual deploy test (renders under file protocol)
npx serve dist
```

---

### Completion Definition

All 🔴 items complete and site loads correctly from `dist/` with:

* No console errors
* Correct spacing via CSS vars
* Buttons ≥ 44 × 44 px & visible focus ring
* GitHub Pages branch `gh-pages` serving latest build at `https://nathandryer.com`

Mark each row ✅ in PR descriptions when finished.  

✅ Dev-tooling bootstrap
