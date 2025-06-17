# Skills Component

This directory contains the `Skills` component, its tests, and related files.

## Purpose

The `Skills` component displays a categorized and filterable grid of the user's skills. Each skill shows a proficiency level and can be animated when it comes into view. Users can filter skills by predefined categories.

## Usage

```tsx
import { Skills } from '@/components/Skills'; // Or the correct relative path
import { skillsData } from '@/data.mock'; // Or your actual data source

<Skills skillsData={skillsData} />
```

## Props

- `skillsData`: `Skill[]` - An array of skill objects, each containing the skill's name, proficiency level, and an optional icon. See `src/types/portfolio.ts` for the `Skill` type definition. 