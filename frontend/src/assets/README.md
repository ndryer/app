# Assets Directory

This directory contains static assets used throughout the application:

- **Images**: Component-specific images, icons, and graphics
- **Fonts**: Custom font files (if not using web fonts)
- **Icons**: SVG icons and icon sets
- **Other**: Any other static assets needed by components

## Organization

- Keep assets organized by type or component
- Use descriptive filenames
- Optimize images for web (WebP, appropriate sizes)
- Consider using subdirectories for better organization

## Usage

Import assets directly in your components:

```tsx
import logoImage from '@/assets/images/logo.png';
import iconSvg from '@/assets/icons/menu.svg';
```
