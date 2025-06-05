import { useCallback, useMemo } from 'react';

/**
 * Custom hook for View Transitions API with proper progressive enhancement
 * Based on MDN documentation and best practices
 *
 * IMPORTANT: Only use for appropriate state changes:
 * ✅ Theme changes, page navigation, content sections
 * ❌ Modal open/close, tooltips, hover states, form inputs
 */
export const useViewTransitions = () => {
  /**
   * Feature detection for View Transitions API
   * Uses proper detection as recommended by MDN
   */
  const isSupported = useMemo((): boolean => {
    return (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      typeof document.startViewTransition === 'function'
    );
  }, []);

  /**
   * Execute a callback with View Transitions if supported
   * Falls back to direct execution for unsupported browsers
   *
   * @param callback - Function that updates the DOM/state
   * @returns ViewTransition object if supported, undefined otherwise
   */
  const withViewTransition = useCallback(
    (callback: () => void) => {
      // Respect reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        callback();
        return;
      }

      if (isSupported && document.startViewTransition) {
        try {
          // Use View Transitions API as per MDN documentation
          return document.startViewTransition(callback);
        } catch (error) {
          // Graceful fallback if View Transitions fail
          console.warn('View Transitions failed, falling back:', error);
          callback();
        }
      } else {
        // Direct execution for unsupported browsers
        callback();
      }
    },
    [isSupported]
  );

  return {
    isSupported,
    withViewTransition,
  };
};
