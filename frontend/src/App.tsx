import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
// import { ErrorBoundary } from 'react-error-boundary'; - Temporarily removed
import './App.css';
import { userData, experienceData, skillsData } from './data';

// Lazy load components for better performance
const Header = lazy(() => import('./components/Header').then(module => ({ default: module.Header })));
const Timeline = lazy(() => import('./components/Timeline').then(module => ({ default: module.Timeline })));
const Skills = lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const FloatingActionButton = lazy(() => import('./components/FloatingActionButton').then(module => ({ default: module.FloatingActionButton })));
const CommandMenu = lazy(() => import('./components/CommandMenu').then(module => ({ default: module.CommandMenu })));

// Error fallback component - kept for future use
/* 
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-container p-4 m-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Something went wrong:</h2>
      <p className="text-red-600 dark:text-red-400 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
};
*/

// Loading component
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-700 dark:text-gray-300">Loading experience...</p>
    </div>
  </div>
);

export const App: React.FC = () => {
  // Centralized theme management
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Otherwise, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Command menu state
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState<boolean>(false);

  // Toggle theme function to pass to components
  const toggleTheme = (): void => {
    setDarkMode(!darkMode);
  };

  // Command menu toggle
  const toggleCommandMenu = (): void => {
    setIsCommandMenuOpen(!isCommandMenuOpen);
  };

  // Keyboard shortcut for command menu (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply theme class when component mounts and when theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <ParallaxProvider>
      <div className="App">
        <Suspense fallback={<LoadingFallback />}>
          <Header 
            userData={userData} 
            toggleTheme={toggleTheme} 
            darkMode={darkMode}
            toggleCommandMenu={toggleCommandMenu}
          />
          
          <main>
            <Timeline experienceData={experienceData} />
            <Skills skillsData={skillsData} />
          </main>
          
          <Footer userData={userData} />
          
          <FloatingActionButton 
            toggleCommandMenu={toggleCommandMenu} 
          />
          
          <CommandMenu 
            isOpen={isCommandMenuOpen} 
            setIsOpen={setIsCommandMenuOpen} 
          />
        </Suspense>
      </div>
    </ParallaxProvider>
  );
};
