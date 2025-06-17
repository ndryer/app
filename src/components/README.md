# Components Directory

This directory contains all reusable UI components for the application.

## Structure

Each component resides in its own subdirectory, which typically includes:

-   `ComponentName.tsx`: The component source file.
-   `ComponentName.test.tsx`: Unit and integration tests for the component.
-   `index.ts`: A barrel file re-exporting the component.
-   `README.md`: Documentation specific to the component, its props, and usage examples.

This directory utilizes a barrel export (`index.ts`) to make importing components more convenient from other parts of the application.

## Component Types

Currently, components are organized directly under this directory. Future organization might involve subdirectories like `common/` (for highly reusable, generic components), `layout/` (for structural components), and `features/` (for feature-specific components) as the application grows and if adherence to the stricter prescribed structure in `CODING_STANDARDS.md` is prioritized.

## Usage

Components can be imported from the main barrel file:

```typescript
import { MyComponent, AnotherComponent } from '@/components';
```

Or, if preferred, directly from their respective directories, though the barrel export is the recommended approach for consistency. 