import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import './App.css';
import { userData } from './data';

// Lazy load components for better performance
const Header = lazy(() => import('./components/Header'));
const ShipLog = lazy(() => import('./components/Timeline')); // Component name stays Timeline but implements ship-log design
const Skills = lazy(() => import('./components/Skills'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingActionButton = lazy(() => import('./components/FloatingActionButton'));

function App() {
  // Centralized theme management
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Otherwise, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Toggle theme function to pass to components
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

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
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Header 
            userData={userData} 
            toggleTheme={toggleTheme} 
            darkMode={darkMode} 
          />
          
          <main>
            <ShipLog userData={userData} />
            <Skills userData={userData} />
          </main>
          
          <Footer userData={userData} />
          <FloatingActionButton email={userData.email} />
        </Suspense>
      </div>
    </ParallaxProvider>
  );
}

export default App;
