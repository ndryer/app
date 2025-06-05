import { useState, useEffect } from 'react';

/**
 * Custom hook to check for reduced motion preference
 * Respects user's accessibility preferences for animations
 */
export const useReducedMotion = (): boolean => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check if window.matchMedia is available (not available in Jest environment)
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        const mediaQuery = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        );
        if (mediaQuery && typeof mediaQuery.matches === 'boolean') {
          setShouldReduceMotion(mediaQuery.matches);

          const handleChange = (e: MediaQueryListEvent) => {
            setShouldReduceMotion(e.matches);
          };

          mediaQuery.addEventListener('change', handleChange);
          return () => mediaQuery.removeEventListener('change', handleChange);
        }
      } catch {
        // Fallback for environments where matchMedia is not properly supported
        console.warn('matchMedia not supported, using default motion settings');
      }
    }
  }, []);

  return shouldReduceMotion;
};
