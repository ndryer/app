# Style Guide – Nathan Dryer Personal Portfolio  
_Last revision 2025-05-31_

This short guide defines the **minimum conventions** for a small, single-page portfolio built with **React 19 + TypeScript + Tailwind CSS**.  
Follow these rules so human contributors and LLM coding agents produce consistent, accessible code.

---

## 1 Project Layout

```
frontend/
└─ src/
   ├─ components/        # all React components (flat or small sub-folders)
   ├─ styles/            # global.css (+ Tailwind imports)
   ├─ types/             # shared TS interfaces
   ├─ data.mock.ts       # static data used by the page
   ├─ App.tsx            # SPA root
   └─ index.tsx          # bootstraps React
```

Simple rule: **one file per component** (`Header.tsx`, `Timeline.tsx`, …).  
Use **named exports**:

```ts
export const Header = () => <header>…</header>;
```

---

## 2 TypeScript & React Rules

| Topic | Convention |
|-------|------------|
| TS Mode | `strict` enabled; avoid `any`. |
| Component Props | Declare `interface HeaderProps { … }`. |
| Exports | Always `export const Component`; never default export. |
| Hooks | Custom hooks start with `use` and live beside components or in `hooks/`. |
| Imports | Group: 1) react/3rd-party, 2) internal paths (`@/` alias), 3) relative `./`. |
| State & Effects | Prefer `useState`, `useEffect`; clean up subscriptions. |

---

## 3 Styling with Tailwind

### 3.1 Spacing Scale (8 px multiples)

Add to `tailwind.config.js`:

```js
spacing: {
  0:  '0px',
  2:  '8px',
  4:  '16px',
  6:  '24px',
  8:  '32px',
  12: '48px',
  16: '64px',
  24: '96px',
},
```

### 3.2 Responsive CSS Vars

In `src/styles/global.css`:

```
:root {
  --space-component: clamp(16px,3vw,24px);
  --space-section:   clamp(40px,6vw,64px);
}
```

Use them like:

```html
<section className="py-[var(--space-section)]">
```

### 3.3 Utility Order

`layout → spacing → colour → typography → motion`.  
Example:

```html
<button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md transition-all duration-200 hover:bg-primary-600">
```

---

## 4 Accessibility Basics

| Requirement | Implementation |
|-------------|----------------|
| Tap targets | `min-w-[44px] min-h-[44px]` on buttons/links |
| Focus ring  | `.focus-ring { @apply outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2; }` |
| Alt text    | All images must include `alt` attribute (empty if decorative). |
| Keyboard    | All interactive elements reachable with `Tab`; Escape closes modals. |
| Colour contrast | Use Tailwind palette; ensure ≥ 4.5 : 1 text/background. |
| Reduced motion | Wrap animations in `prefers-reduced-motion` checks or Framer Motion’s `useReducedMotion()`. |

---

## 5 Linting & Formatting

* **ESLint v9** with `@typescript-eslint` and `eslint-plugin-tailwindcss`.
* **Prettier** for consistent formatting (default options).
* CI step (GitHub Actions) runs:  
  `yarn lint && tsc --noEmit && yarn test` (tests optional but encouraged).

---

## 6 Commit & Branch Naming

* Branch: `feat/section-header`, `fix/scroll-bug`, etc.
* Commit: Conventional Commits `feat(header): add theme toggle`.

---

## 7 Glossary

* **Token** – Named design value (colour, spacing, motion).  
* **Tap Target** – Interactive element ≥ 44 × 44 px.  
* **AA** – WCAG 2.2 colour contrast ratio ≥ 4.5 : 1.  

_Keep the site simple, accessible, and easy to maintain._  
