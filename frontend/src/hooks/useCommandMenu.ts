import { useState, useEffect, useCallback } from 'react';

interface UseCommandMenuReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

/**
 * Custom hook for managing command menu state and keyboard shortcuts
 * Handles Cmd+K / Ctrl+K keyboard shortcut
 */
export const useCommandMenu = (): UseCommandMenuReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Toggle function - Memoized to prevent infinite re-renders
  // PERFORMANCE FIX: Removed isOpen dependency that was causing infinite re-renders
  const toggle = useCallback((): void => {
    setIsOpen(prev => !prev);
  }, []);

  // Keyboard shortcut for command menu (Cmd+K / Ctrl+K)
  // PERFORMANCE FIX: Removed isOpen from dependency array to prevent infinite re-renders
  // Using functional state update (prev => !prev) instead of direct state access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]); // Only depend on toggle function, not isOpen state

  return {
    isOpen,
    setIsOpen,
    toggle,
  };
};
