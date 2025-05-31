import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Command, Sun, Moon } from 'lucide-react';
import { ScrollCue } from './ScrollCue';
import { UserData } from '../types';

interface HeaderProps {
  userData: UserData;
  toggleTheme: () => void;
  darkMode: boolean;
  toggleCommandMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userData, toggleTheme, darkMode, toggleCommandMenu }) => {
  const [isMac, setIsMac] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  
  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  // Animation variants - simplified
  const animations = {
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <ParallaxBanner
      layers={[
        { speed: -20, expanded: false, children: (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-600 opacity-100">
            {/* Clean background without hexagon pattern */}
          </div>
        )},
      ]}
      className="relative h-screen flex items-center justify-center overflow-hidden pb-20 md:pb-32 pt-[var(--space-section)]"
      id="top"
    >
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Name and Subtitle - Now Above Command Prompt */}
          <motion.div 
            className="text-center text-white max-w-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 font-sans tracking-tight"
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
              <p className="text-2xl md:text-3xl text-blue-300 font-medium">
                {userData.bioLine}
              </p>
            </motion.div>
          </motion.div>
          
          {/* Modern Pill-Shaped Command Prompt Field */}
          <motion.div 
            className="relative w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
          >
            <motion.div
              className="flex items-center px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white cursor-pointer hover:bg-white/15 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={toggleCommandMenu}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Open command palette"
              aria-keyshortcuts="⌘+K"
            >
              <Command size={18} className="text-white/70 mr-3" />
              <span className="text-white/70 flex-1 text-left">Search or type a command...</span>
              <kbd className="hidden md:flex items-center justify-center rounded border border-white/20 bg-white/5 px-2 py-1 text-xs text-white/70">
                {isMac ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </motion.div>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div 
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm shadow-lg border border-white/20 whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  Click or press {isMac ? '⌘' : 'Ctrl'}+K to open menu
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white/10 border-r border-b border-white/20"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Cue - Moved higher up with bounce animation */}
      <motion.div 
        className="absolute -bottom-32 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate="bounce"
          variants={animations}
          className="relative"
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md"></div>
          <div className="relative z-10">
            <ScrollCue />
          </div>
        </motion.div>
      </motion.div>
    </ParallaxBanner>
  );
};
