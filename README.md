# Nathan Dryer Portfolio

A modern, performant one-page portfolio site for Nathan Dryer, featuring a vertical timeline layout with parallax effects and smooth animations.

## Features

- Responsive design with Tailwind CSS
- Vertical timeline for professional experience
- Parallax scrolling effects
- Framer Motion animations
- Material-style floating action button
- Clipboard functionality for copying email
- Accessibility features (respects prefers-reduced-motion)
- Optimized for performance

## Tech Stack

- React 18
- TypeScript 5
- Tailwind CSS 3
- Framer Motion for animations
- react-vertical-timeline-component
- react-scroll-parallax
- react-social-icons
- react-copy-to-clipboard

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Development

To start the development server:

```bash
npm run start
```

The site will be available at http://localhost:3000

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `build` directory, ready for deployment.

## Deployment

The site is optimized for deployment to services like GitHub Pages, Vercel, or Netlify. Simply connect your repository to any of these services for automatic deployment.

### For GitHub Pages:

1. Create a GitHub repository
2. Push your code to the repository
3. Enable GitHub Pages in the repository settings
4. Set the source to the `gh-pages` branch

## Customization

To customize the portfolio for your own use:

1. Edit the data in `src/data.ts` to include your own information
2. Replace the profile image in `public/profile.jpg`
3. Adjust the color scheme in `tailwind.config.js` if desired
4. Update the favicon and logo files in the `public` directory

## Performance

The site is optimized for performance:
- Code splitting with dynamic imports
- React Suspense for lazy loading
- Optimized images
- Minimal dependencies
- Tailwind JIT for reduced CSS size

## Accessibility

The site includes several accessibility features:
- Proper semantic HTML
- ARIA labels on interactive elements
- Support for keyboard navigation
- Respects the user's motion preference settings
- High contrast text for readability
