# SPECIFIC_ISSUES_AND_FIXES.md  
_Target branch: `main` • Generated 2025-05-31_

This file lists every **concrete code change** required to bring the repo into compliance with the documented Style Guide, Technical Docs and Design-System Roadmap.  
Work through the checklist top-to-bottom; PRs should reference the **Issue ID** column.

| ID | File / Path | Issue | Severity |
|----|-------------|-------|----------|
| 01 | `frontend/eslint.config.js` | TypeScript files excluded from lint | 🔴 |
| 02 | `frontend/src/App.js` | JS file; should be `.tsx` with typed props | 🔴 |
| 03 | `frontend/src/components/*.jsx` | Default exports + JSX; should be named `.tsx` | 🔴 |
| 04 | `frontend/src/data.js` & `data.ts` | Duplicate data shapes | 🟠 |
| 05 | `tailwind.config.js` | 8-px spacing tokens missing | 🔴 |
| 06 | `frontend/src/index.css` | CSS vars `--space-section`/`--space-component` absent | 🔴 |
| 07 | `frontend/src/components/FloatingActionButton.jsx` | Tap-target < 44 px | 🔴 |
| 08 | `backend/server.py` | API prefix `/api`, no versioning; `id` not UUID | 🟠 |
| 09 | `Dockerfile`, `nginx.conf`, `entrypoint.sh` | Legacy Docker stack not needed | 🟢 |

---

## 01  `frontend/eslint.config.js`

### Current
```js
// excerpt lines 26-33
{
  files: ['**/*.js', '**/*.jsx'],
  plugins: { react: reactPlugin, 'jsx-a11y': jsxA11yPlugin, import: importPlugin },
  ...
},
// Ignore patterns
{
  ignores: [
    ...
    '**/*.ts',
    '**/*.tsx',
  ],
},
```

### Required
```diff
- files: ['**/*.js', '**/*.jsx'],
+ files: ['**/*.{js,jsx,ts,tsx}'],

+ parser: '@typescript-eslint/parser',
+ plugins: {
+   '@typescript-eslint': eslintTsPlugin,
+   react: reactPlugin,
+   'jsx-a11y': jsxA11yPlugin,
+   import: importPlugin,
+ },

- ignores: [ ... '**/*.ts', '**/*.tsx', ],
+ ignores: [ 'node_modules/**', 'build/**', 'dist/**', 'coverage/**' ],
```

#### Command
```bash
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-tailwindcss
```

---

## 02  `frontend/src/App.js`

### Tasks
1. **Rename**  
   ```bash
   git mv frontend/src/App.js frontend/src/App.tsx
   ```
2. **Add typed props** (none in this file) and convert React import:  
   ```ts
   import { FC, Suspense, ... } from 'react';
   export const App: FC = () => { ... };
   ```
3. **Update imports** to use named component exports (see 03).

---

## 03  `frontend/src/components/*.jsx`

### Bulk rename & scaffold
```bash
for f in frontend/src/components/*.jsx; do
  base=$(basename "$f" .jsx)
  mkdir -p "frontend/src/components/$base"
  git mv "$f" "frontend/src/components/$base/$base.tsx"
done
```

### Example fix – `Header`
#### Current (top of file)
```js
import React, { useState } from 'react';
...
const Header = ({ userData, toggleTheme, darkMode, toggleCommandMenu }) => {
```

#### Required
```ts
import { FC, useState } from 'react';

export interface HeaderProps {
  userData: UserData;
  toggleTheme: () => void;
  darkMode: boolean;
  toggleCommandMenu: () => void;
}

export const Header: FC<HeaderProps> = ({ userData, toggleTheme, darkMode, toggleCommandMenu }) => {
```

Add barrel:
```ts
// components/Header/index.ts
export * from './Header';
```

Update usages:
```diff
- import Header from './components/Header';
+ import { Header } from './components/Header';
```

Repeat for every component.

---

## 04  `frontend/src/data.js` & `data.ts`

### Resolution Plan
1. Delete `data.js`
   ```bash
   git rm frontend/src/data.js
   ```
2. Move `data.ts` to `data.mock.ts` and ensure it **implements** types from `src/types/portfolio.ts`.
3. Update imports:
   ```diff
   - import { userData, experienceData } from './data';
   + import { userData, experienceData } from './data.mock';
   ```

---

## 05  `tailwind.config.js`

### Add spacing scale
```js
theme: {
  extend: {
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

---

## 06  `frontend/src/index.css`

Add to `:root` block **before other vars**:
```css
--space-component: clamp(16px, 3vw, 24px);
--space-section: clamp(40px, 6vw, 64px);
```

---

## 07  `frontend/src/components/FloatingActionButton.jsx`

### Current
```html
<button className="w-10 h-10 ...">
```
(width = 40 px)

### Required
```diff
- className="w-10 h-10 ..."
+ className="min-w-[44px] min-h-[44px] w-11 h-11 ..."
```
also add utility `focus-ring`.

---

## 08  `backend/server.py`

### Changes
```diff
-api_router = APIRouter(prefix="/api")
+api_router = APIRouter(prefix="/api/v1")

-from pydantic import BaseModel, Field
+from pydantic import BaseModel, Field, UUID4
@@
-class StatusCheck(BaseModel):
-    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
+class StatusCheck(BaseModel):
+    id: UUID4 = Field(default_factory=uuid.uuid4)
```
Add deprecation notice for old `/api` route (return 410).

---

## 09  Docker artifacts

```bash
git mv Dockerfile docker/legacy/Dockerfile
git mv nginx.conf docker/legacy/nginx.conf
git mv entrypoint.sh docker/legacy/entrypoint.sh
```
Update README: remove Docker section.

---

## Batch Verification

```bash
# 1. Lint & Type Check
yarn eslint src && tsc --noEmit
# 2. Jest snapshot (add after scaffolding)
yarn test
# 3. Storybook visual diff (once Storybook added)
yarn storybook:ci
```

---

## Completion Checklist

- [ ] ESLint config updated & passes  
- [ ] All components converted to `.tsx` named exports  
- [ ] Data mock unified (no duplicate JS)  
- [ ] Tailwind spacing tokens & CSS vars present  
- [ ] Tap-target utilities ≥ 44 px  
- [ ] API prefix `/api/v1` + UUID typing  
- [ ] Legacy Docker files archived  

_Mark each bullet complete in PR descriptions. When all items are ✅, the repo fully aligns with documented standards._
