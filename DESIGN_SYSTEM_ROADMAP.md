# Design System Roadmap  
_Bridging Current Implementation → WP-A … WP-D Vision_  
_Last updated: 2025-05-31_

---

## 1 Purpose

This roadmap explains **how the existing portfolio codebase will evolve into the planned, token-driven design system** described in Work Packages **WP-A through WP-D** (spacing scale, component spacing, rhythm, grid refinement, accessibility & a11y automation).  
It complements:  
* `STYLE_GUIDE.md` – coding & visual standards  
* `TECHNICAL_DOCUMENTATION.md` – architecture & workflow  
* `INCONSISTENCIES_AND_FIXES.md` – current gaps & immediate fixes  

---

## 2 Current Snapshot (v0)

| Area | Status | Evidence |
|------|--------|----------|
| Spacing tokens | Tailwind defaults + ad-hoc classes | `frontend/tailwind.config.js` |
| Custom props | None | `frontend/src/index.css` |
| Component files | Mixed `.js/.jsx`, flat folder | e.g. `CommandMenu.jsx` |
| Accessibility | Generic focus rings; inconsistent tap size | random `focus:outline-none` |
| Automated a11y | None (manual only) | no axe/Playwright tests |

---

## 3 Target State (WP-A → WP-D)

### 3.1 WP-A — 8 px Global Spacing Scale
| Token | px | Tailwind key | CSS Var (mobile→desktop) |
|-------|----|--------------|--------------------------|
| 0     | 0  | `0`          | `0` |
| 1     | 8  | `2` (`0.5`)  | – |
| 2     | 16 | `4` (`1`)    | – |
| 3     | 24 | `6` (`1.5`)  | `--space-component: clamp(16px,3vw,24px)` |
| 4     | 32 | `8` (`2`)    | – |
| 5     | 48 | `12` (`3`)   | – |
| 6     | 64 | `16` (`4`)   | `--space-section: clamp(40px,6vw,64px)` |
| 7     | 96 | `24` (`6`)   | – |

_Additions_  
1. Extend `theme.spacing` in `tailwind.config.js`.  
2. Inject variables into `global.css :root` (mobile values inside `@media (min-width:768px)`).

### 3.2 WP-B — Landing & Command Palette Spacing
* `<h1>` margin-block-start → `var(--space-section)`  
* `<CommandPalette>` top / bottom margin → `var(--space-component)`  
* Refactor components to **named exports in `.tsx`** under `components/` & `layouts/`.

### 3.3 WP-C — Timeline Rhythm
* Card padding `p-6` (24 px)  
* Vertical gap `space-y-8` (32 px)  
* Line→card gap `ml-4` (16 px)  
* Storybook “dense timeline” @ 320 px snapshot to guard.

### 3.4 WP-D — Skills Grid Refinement
* Grid gap `gap-6` (24 px) via `grid-cols-auto` helper  
* Card padding `p-5` (20 px)  
* Icon–label spacing `space-x-3` (12 px)  
* Unit test asserts `columnGap === 24`.

### 3.5 Universal Accessibility Enhancements
* Tap targets: `min-w-[44px] min-h-[44px]` in `Button.tsx` (+ propagated).  
* Focus ring: `focus:outline-2 focus:outline-primary-500 focus:outline-offset-2`.  
* Automated contrast: **axe-playwright** across 3 breakpoints (`320×640`, `768×1024`, `1440×900`).

---

## 4 Integration Plan

| Sprint | Milestone | Key PRs | Owners |
|--------|-----------|---------|--------|
| 1 | **Token Foundation** – WP-A | `tailwind+global-spacing` | Design + FE |
| 2 | **Component Migrations** – WP-B, tap target refactor | `landing-spacing`, `button-a11y` | FE |
| 3 | **Timeline & Skills Polish** – WP-C, WP-D | `timeline-rhythm`, `skills-grid` | FE |
| 4 | **Testing Automation** | `axe-playwright`, Storybook CI | QA |
| 5 | **Regression Hardening** | visual diff threshold, docs update | All |

---

## 5 CI / Toolchain Updates

1. **Jest Snapshot Guard** – fails if `--space-*` vars missing.  
2. **Playwright Tests**  
   ```bash
   yarn smoke   # axe, viewport loops
   yarn e2e:ci  # 44 px tap target checks
   ```  
3. **Storybook Visual Diff** – `<2 %` delta threshold.  
4. **Lint Rule** – `eslint-plugin-tailwindcss` spacing-token whitelist.

---

## 6 Impact on Existing Docs

| Doc | Update Needed |
|-----|---------------|
| STYLE_GUIDE.md | Add § “8 px Spacing Scale & CSS Vars” → mirror table in 3.1 |
| TECHNICAL_DOCUMENTATION.md | Deployment unchanged; update Front-End section with new component tree & testing commands |
| INCONSISTENCIES_AND_FIXES.md | Close duplicate spacing issues once WP-A merged |

---

## 7 Risks & Mitigations

| Risk | Probability | Mitigation |
|------|-------------|------------|
| Legacy components still using arbitrary px | Medium | ESLint custom rule + codemod report |
| Tailwind class bloat | Low | PurgeCSS already active; verify bundle size < 200 KB |
| Visual regressions on small screens | Medium | Storybook snapshots @ 320 px + Playwright |
| Overlap with TypeScript migration | Medium | Coordinate branch strategy; merge token foundation first |

---

## 8 Glossary

* **Token** – a named, reusable design value.  
* **Clamp helper** – CSS `clamp(min, vw, max)` for responsive fluid spacing.  
* **Tap Target** – interactive element with ≥ 44 × 44 px touch area.  

---

## 9 Reference Links

* Work Packages: WP-A – WP-D specification (internal Notion)  
* Style Guide §3 — Design Tokens  
* Technical Doc §7 — Development Workflow  
* MDN `clamp()` – <https://developer.mozilla.org/en-US/docs/Web/CSS/clamp>  

---

_This roadmap will be versioned alongside the codebase. Amend in each PR that affects design tokens, spacing, or accessibility compliance._
