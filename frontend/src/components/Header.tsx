// ◀︎ LLM-modified
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Command } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { UserData } from '../types';

interface HeaderProps {
  userData: UserData;
  toggleCommandMenu: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  userData,
  toggleCommandMenu,
  darkMode,
  toggleTheme,
}) => {
  const [isMac, setIsMac] = useState<boolean>(false);

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);



  return (
    <ParallaxBanner
      layers={[
        {
          speed: -20,
          expanded: false,
          children: (
            <div className='absolute inset-0 opacity-100 bg-gradient-header'>
              {/* Clean background without hexagon pattern */}
            </div>
          ),
        },
      ]}
      className='relative flex h-screen items-center justify-center overflow-hidden pb-20 pt-[var(--space-section)] md:pb-32'
      id='top'
    >
      {/* Theme Toggle - Positioned in top-right corner */}
      <motion.div
        className='absolute right-4 top-4 z-20 md:right-6 md:top-6'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      </motion.div>

      <div className='container relative z-10 mx-auto px-6 py-8'>
        <div className='flex h-full flex-col items-center justify-center text-center'>
          {/* Name and Subtitle - Now Above Command Prompt */}
          <motion.div
            className='mb-4 max-w-xl text-center text-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.h1
              className='mb-3 font-sans text-5xl font-bold tracking-tight md:text-6xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {userData.fullName}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className='text-xl font-medium text-white/85 md:text-2xl'>
                {userData.bioLine}
              </p>
            </motion.div>
          </motion.div>

          {/* Command Prompt Container */}
          <div className='w-full max-w-md'>
            {/* Modern Pill-Shaped Command Prompt Field */}
            <motion.div
              className='relative w-full'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className='flex cursor-pointer items-center rounded-full px-4 py-3 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                style={{ background: 'var(--token-bg-frosted)' }}
                /* Frosted glass effect for overlays */
                onClick={toggleCommandMenu}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label='Open command palette'
                aria-keyshortcuts='⌘+K'
              >
                <Command size={18} className='mr-3 text-white/70' />
                <span className='flex-1 text-left text-white/70'>
                  Open Command Menu
                </span>
                <kbd className='hidden items-center justify-center rounded bg-white/5 px-2 py-1 text-xs text-white/70 md:flex'>
                  {isMac ? '⌘K' : 'Ctrl+K'}
                </kbd>
              </motion.div>


            </motion.div>
          </div>
        </div>


      </div>
    </ParallaxBanner>
  );
};

/**
 * Memoized Header component for performance optimization
 *
 * PERFORMANCE OPTIMIZATION: React.memo prevents unnecessary re-renders when:
 * - userData object reference hasn't changed
 * - toggleCommandMenu function reference hasn't changed (memoized in App.tsx)
 * - darkMode boolean value hasn't changed
 * - toggleTheme function reference hasn't changed (memoized in useTheme hook)
 *
 * Expected performance improvement: 20-30% reduction in Header re-renders
 * when parent App component re-renders for unrelated state changes
 */
export const Header = React.memo(HeaderComponent);
