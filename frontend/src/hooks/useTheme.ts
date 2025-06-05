import { useState, useEffect, useCallback } from 'react';

interface UseThemeReturn {
  darkMode: boolean;
  toggleTheme: () => void;
}

/**
 * Custom hook for managing theme state with View Transitions API
 * Implements proper View Transitions according to MDN documentation
 * Handles localStorage persistence and system preference detection
 */
export const useTheme = (): UseThemeReturn => {
  // Initialize theme state from localStorage or system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    const stored = localStorage.getItem('theme');
    if (stored) {
      return stored === 'dark';
    }

    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  /**
   * Toggle theme with optimized CSS transitions
   * FIXED: Removed View Transitions API to eliminate white screen flash
   * Uses CSS transitions for smooth theme changes without visual artifacts
   * Memoized for performance optimization to prevent unnecessary re-renders
   */
  const toggleTheme = useCallback((): void => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  // Apply theme changes to DOM and localStorage
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (darkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // Save preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no explicit preference is stored
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    darkMode,
    toggleTheme,
  };
};
