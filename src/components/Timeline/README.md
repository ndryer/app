# Timeline Component

This directory contains the `Timeline` component, its tests, and related files.

## Purpose

The `Timeline` component displays a chronological list of professional experiences. It features expandable items, keyboard navigation, and scroll-triggered animations, presenting a user's career path in an interactive and engaging manner.

## Usage

```tsx
import { Timeline } from '@/components/Timeline'; // Or the correct relative path
import { experienceData } from '@/data.mock'; // Or your actual data source

<Timeline experienceData={experienceData} />
```

## Props

- `experienceData`: `Experience[]` - An array of experience objects, each detailing a specific role or project in the user's career. See `src/types/portfolio.ts` for the `Experience` type definition. 