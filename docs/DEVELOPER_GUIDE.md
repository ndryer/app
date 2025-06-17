# Developer Guide

This guide provides an overview of the styling principles, design tokens, animation guidelines, and testing procedures for this project.

## Style Guide

This section outlines the "Graphite & Gold" visual theme, including foundational elements, color system, CSS variables, Tailwind CSS configuration, typography, and component blueprints.

### 1. Foundations

| Primitive     | Value / Rationale                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| **Grid**      | 4px / 8px baseline; use `--space-component` and `--space-section` for responsive containers.                    |
| **Radii**     | `--r-sm: 6px`, `--r-md: 8px`, `--r-lg: 16px`.                                                                   |
| **Elevation** | `--e-sm: 0 1px 3px rgba(0,0,0,.06)`, `--e-md: 0 4px 8px rgba(0,0,0,.08)`, `--e-lg: 0 12px 24px rgba(0,0,0,.12)` |
| **Motion**    | `--motion-duration: 200ms`, `--motion-easing: cubic-bezier(.4,0,.2,1)`; honours `prefers-reduced-motion`.       |
| **Fonts**     | `Space Grotesk` → headlines, nav, CTAs.<br>`Inter` → body, captions.                                            |

### 2. Colour System: Graphite & Gold

| Mode      | --bg-primary | --bg-surface | --bg-surface-alt | --bg-surface-subtle | --accent  | --text-primary | --text-secondary |
| --------- | ------------ | ------------ | ---------------- | ------------------- | --------- | -------------- | ---------------- |
| **Light** | `#F5F5F7`    | `#F0F0F2`    | `#EAEAEB`        | `#F3F3F5`           | `#F1B33E` | `#1C1C1C`      | `#5F5F5F`        |
| **Dark**  | `#1C1C1C`    | `#181818`    | `#222222`        | `#222222`           | `#FACA63` | `#E0E0E0`      | `#9D9D9D`        |

*All pairs meet WCAG 2.2 AA (≥ 4.5 : 1) for normal text.*

### 3. CSS Variable Contract

The following CSS variables define the core primitives and theme tokens. These are typically located in `src/styles/tokens.css`.

```css
/* 1 · FONT FAMILIES & CORE PRIMITIVES */
:root {
  /* Font Families (to be loaded via <link> in <head>) */
  --ff-display: "Space Grotesk", system-ui, sans-serif;
  --ff-body: "Inter", system-ui, sans-serif;

  /* Typographic Scale */
  --tracking-tight: -0.015em;

  /* Radii */
  --r-sm: 0.375rem; /* 6px */
  --r-md: 0.5rem; /* 8px */
  --r-lg: 1rem; /* 16px */

  /* Elevation */
  --e-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
  --e-md: 0 4px 8px rgba(0, 0, 0, 0.08);
  --e-lg: 0 12px 24px rgba(0, 0, 0, 0.12);

  /* Spacing Scale (4px/8px baseline) */
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.5rem; /* 24px */
  --space-6: 2rem; /* 32px */
  --space-8: 3rem; /* 48px */
  --space-12: 4rem; /* 64px */
  --space-24: 6rem; /* 96px */

  /* Responsive Spacing */
  --space-component: clamp(1rem, 3vw, 1.5rem); /* 16px to 24px */
  --space-section: clamp(2.5rem, 6vw, 4rem); /* 40px to 64px */

  /* Motion */
  --motion-duration: 200ms;
  --motion-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 2 · THEME TOKENS (GRAPHITE & GOLD) */
/* Light Mode */
:root,
:root[data-theme="graphite-light"] {
  --bg-primary: #f5f5f7;
  --bg-surface: #f0f0f2;
  --bg-surface-alt: #eaeaeb;
  --bg-surface-subtle: #f3f3f5;
  --accent: #f1b33e;
  --on-accent: #111111;
  --text-primary: #1c1c1c;
  --text-secondary: #5f5f5f;
}

/* Dark Mode */
:root[data-theme="graphite-dark"] {
  --bg-primary: #1c1c1c;
  --bg-surface: #181818;
  --bg-surface-alt: #222222;
  --bg-surface-subtle: #222222;
  --accent: #faca63;
  --on-accent: #181818;
  --text-primary: #e0e0e0;
  --text-secondary: #9d9d9d;
}

/* 3 · GLOBAL ELEMENT DEFAULTS (Example) */
body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--ff-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color var(--motion-duration) var(--motion-easing), color
      var(--motion-duration) var(--motion-easing);
}

/* Reduced Motion Preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 4. Tailwind CSS Configuration

Merge the following into your `tailwind.config.js` to utilize the CSS variables and design tokens:

```javascript
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: ["class", '[data-theme="graphite-dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--ff-display)", "system-ui", "sans-serif"],
        body: ["var(--ff-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        DEFAULT: "var(--r-md)",
        lg: "var(--r-lg)",
      },
      boxShadow: {
        sm: "var(--e-sm)",
        md: "var(--e-md)",
        lg: "var(--e-lg)",
      },
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-surface": "var(--bg-surface)",
        "accent": "var(--accent)",
        "on-accent": "var(--on-accent)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
      },
      spacing: {
        "space-1": "var(--space-1)",
        "space-2": "var(--space-2)",
        "space-3": "var(--space-3)",
        "space-4": "var(--space-4)",
        "space-5": "var(--space-5)",
        "space-6": "var(--space-6)",
        "space-8": "var(--space-8)",
        "space-12": "var(--space-12)",
        "space-24": "var(--space-24)",
        "space-component": "var(--space-component)",
        "space-section": "var(--space-section)",
      },
      transitionDuration: {
        DEFAULT: "var(--motion-duration)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--motion-easing)",
      },
    },
  },
  plugins: [],
};
```

### 5. Typographic Scale

| Token   | rem / px   | Tailwind    | Classes                                     |
| ------- | ---------- | ----------- | ------------------------------------------- |
| **T-5** | 2.5 / 40   | `text-5xl`  | `font-display font-bold tracking-tight`     |
| **T-4** | 2 / 32     | `text-4xl`  | `font-display font-semibold tracking-tight` |
| **T-3** | 1.5 / 24   | `text-2xl`  | `font-display font-medium tracking-tight`   |
| **T-2** | 1.25 / 20  | `text-xl`   | `font-display font-medium`                  |
| **T-1** | 1 / 16     | `text-base` | `font-body`                                 |
| **T-0** | 0.875 / 14 | `text-sm`   | `font-body opacity-80`                      |

### 6. Component Blueprints (Key Classes)

| Component             | Core classes                                                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary button**    | `inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-on-accent font-display font-medium text-sm uppercase hover:opacity-90 transition` |
| **Card**              | `bg-surface rounded-lg shadow-sm p-6 space-y-4`                                                                                                       |
| **Section title**     | `text-4xl font-display font-semibold tracking-tight mb-6`                                                                                             |
| **Command-menu pill** | `fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent text-on-accent shadow-lg grid place-content-center hover:scale-105 transition`               |

> **Note:** Tailwind will automatically resolve `bg-accent`, `text-on-accent` etc. thanks to the custom colour definitions.

### 7. Interaction & Motion

| State          | Effect (tailwind utilities)                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Hover          | `hover:scale-105 hover:opacity-90`                                                                  |
| Focus          | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40`                      |
| Active         | `active:translate-y-px active:shadow-sm`                                                            |
| Reduced-motion | Add `motion-safe:` prefix to transform utilities so they're skipped when users request less motion. |

## Animation Guide

This section details the animation parameters for key interactive elements and provides a checklist for testing animations.

### Animation Parameters & Implementation

#### FloatingActionButton (Scroll Button)
- **Delay**: 750ms initial delay (0.75s)
- **Fade-in**: 1s duration with upward slide (y: 16 → 0)
- **Bounce**: Starts at 1750ms total (750ms delay + 1000ms fade-in)
- **Bounce Animation**: y: [0, -3, 0] every 2 seconds, infinite loop
- **Timing Control**: Timing is controlled by `animationPhase` state in the component.

#### FloatingCommandButton (Command Menu)
- **Delay**: 750ms initial delay (0.75s) - synchronized with Scroll Button.
- **Fade-in**: 1s duration with upward slide (y: 16 → 0).
- **Pulse**: Starts at 1750ms total (750ms delay + 1000ms fade-in).
- **Pulse Animation**: scale: [1, 1.02, 1] every 3 seconds, infinite loop.
- **Timing Control**: Uses `animationPhase` state management.

#### Synchronization Details
- Both buttons share a 750ms delay before their fade-in sequence.
- Both buttons have a 1s fade-in duration.
- Both buttons commence their continuous animations (bounce/pulse) at 1750ms from initial page load/component mount.
- **Accessibility**: Animations respect the `prefers-reduced-motion` media query.

### Animation Testing Checklist

#### Visual Validation
Ensure the following visual sequence upon page refresh:
1. **0 - 0.75s**: Both `FloatingActionButton` and `FloatingCommandButton` should be invisible.
2. **0.75s - 1.75s**: Both buttons should fade in simultaneously with an upward slide.
3. **1.75s+**:
    - `FloatingActionButton` (bottom center) should exhibit a bounce animation (approx. -3px vertical movement).
    - `FloatingCommandButton` (bottom right) should exhibit a gentle pulse animation (approx. scale 1.02).

#### Interactive Testing
- **Hover**: Verify hover effects (e.g., scaling, glow) on both buttons.
- **Click**:
    - Clicking `FloatingActionButton` should scroll to the timeline section.
    - Clicking `FloatingCommandButton` should open the command menu.
- **Keyboard Navigation**: Test tabbing to buttons and activating them with Enter/Space keys.

#### Accessibility Testing
1. Enable "Reduce Motion" in system/browser preferences.
2. Refresh the page. Animations should be disabled or significantly minimized.
3. Disable "Reduce Motion". Animations should resume as normal.

### Expected Animation Timeline Overview

| Time    | Scroll Button (Bottom Center)     | Command Menu (Bottom Right)       |
|---------|-----------------------------------|-----------------------------------|
| 0-750ms | Hidden (opacity: 0, y: 16)        | Hidden (opacity: 0, y: 16)        |
| 750ms   | Fade-in starts                    | Fade-in starts                    |
| 1750ms  | Fade-in complete, bounce starts   | Fade-in complete, pulse starts    |
| 1750ms+ | Bouncing: y[0,-3,0] every 2s      | Pulsing: scale[1,1.02,1] every 3s |

---
*This guide should be kept up-to-date with any changes to the design system or animation logic.* 