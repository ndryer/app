import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
// import { ErrorBoundary } from 'react-error-boundary'; - Temporarily removed
import './styles/app.css';
import { userData, experienceData, skillsData } from './data.mock';
import { useTheme } from './hooks/useTheme';

// Lazy load components for better performance
const Header = lazy(() =>
  import('./components/Header').then(module => ({ default: module.Header }))
);
const Timeline = lazy(() =>
  import('./components/Timeline').then(module => ({ default: module.Timeline }))
);
const Skills = lazy(() =>
  import('./components/Skills').then(module => ({ default: module.Skills }))
);
const Footer = lazy(() =>
  import('./components/Footer').then(module => ({ default: module.Footer }))
);
const FloatingActionButton = lazy(() =>
  import('./components/FloatingActionButton').then(module => ({
    default: module.FloatingActionButton,
  }))
);
const FloatingCommandButton = lazy(() =>
  import('./components/FloatingCommandButton').then(module => ({
    default: module.FloatingCommandButton,
  }))
);
const CommandMenu = lazy(() =>
  import('./components/CommandMenu').then(module => ({
    default: module.CommandMenu,
  }))
);

// Error fallback component - kept for future use
/* 
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-4 m-4 border border-red-200 rounded-lg error-container bg-red-50 dark:bg-red-900/20 dark:border-red-800">
      <h2 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-300">Something went wrong:</h2>
      <p className="mb-4 text-red-600 dark:text-red-400">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
};
*/

// Loading component
const LoadingFallback: React.FC = () => (
  <div className='flex min-h-screen items-center justify-center bg-white dark:bg-gray-900'>
    <div className='text-center'>
      <div className='mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
      <p className='text-gray-700 dark:text-gray-300'>Loading experience...</p>
    </div>
  </div>
);

export const App: React.FC = () => {
  // Theme management with performance optimization
  const { darkMode, toggleTheme } = useTheme();

  // Command menu state
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState<boolean>(false);

  // Command menu toggle - Memoized for performance optimization
  // Prevents unnecessary re-renders of Header component
  const toggleCommandMenu = useCallback((): void => {
    console.log('toggleCommandMenu called, current state:', isCommandMenuOpen);
    setIsCommandMenuOpen(!isCommandMenuOpen);
  }, [isCommandMenuOpen]);

  // Keyboard shortcut for command menu (Cmd+K / Ctrl+K)
  // Memoized handler to prevent unnecessary effect re-runs
  const handleKeyDown = useCallback((e: KeyboardEvent): void => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsCommandMenuOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);



  return (
    <ParallaxProvider>
      <div className='App min-h-screen bg-white dark:bg-gray-900'>
        <Suspense fallback={<LoadingFallback />}>
          <Header
            userData={userData}
            toggleCommandMenu={toggleCommandMenu}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />

          <main>
            <Timeline experienceData={experienceData} />
            <Skills skillsData={skillsData} />
          </main>

          <Footer userData={userData} />

          <FloatingActionButton />
          <FloatingCommandButton toggleCommandMenu={toggleCommandMenu} />

          <CommandMenu
            isOpen={isCommandMenuOpen}
            setIsOpen={setIsCommandMenuOpen}
          />
        </Suspense>
      </div>
    </ParallaxProvider>
  );
};
