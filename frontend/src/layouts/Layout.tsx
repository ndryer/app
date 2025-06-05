import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

/**
 * Main layout component that wraps the entire application
 * Provides consistent structure and global providers
 */

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <ParallaxProvider>
      <div
        className={`min-h-screen bg-white transition-colors duration-300 dark:bg-gray-900 ${className}`}
      >
        {children}
      </div>
    </ParallaxProvider>
  );
};

export default Layout;
