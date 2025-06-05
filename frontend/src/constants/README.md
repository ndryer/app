# Constants Directory

This directory contains application-wide constants and configuration values:

- **API endpoints and URLs**
- **Application configuration**
- **Theme constants**
- **Breakpoints and responsive values**
- **Animation durations and easing**
- **Default values and settings**

## Organization

- Group related constants in separate files
- Use TypeScript for type safety
- Export as named exports for better tree-shaking

## Example Structure

```
constants/
├── api.ts          # API endpoints and configuration
├── theme.ts        # Theme colors, spacing, etc.
├── breakpoints.ts  # Responsive breakpoints
├── animations.ts   # Animation constants
└── index.ts        # Re-export all constants
```

## Usage

```tsx
import { API_ENDPOINTS, THEME_COLORS } from '@/constants';
import { BREAKPOINTS } from '@/constants/breakpoints';
```
