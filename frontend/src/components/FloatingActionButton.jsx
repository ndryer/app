import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command } from 'lucide-react';

const FloatingActionButton = ({ toggleCommandMenu }) => {
  const [isMac, setIsMac] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);
  
  // Hide tooltip after 5 seconds
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);
  
  // Show tooltip on hover
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  
  return (
    <div 
      className="fixed bottom-6 right-6 z-40"
      onMouseEnter={handleMouseEnter}
    >
      {/* Keyboard shortcut tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-full mb-4 right-0 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-lg shadow-md text-sm"
          >
            Press <kbd className="px-1.5 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono">
              {isMac ? '⌘' : 'Ctrl'}+K
            </kbd> for commands
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Command Button */}
      <motion.button
        onClick={toggleCommandMenu}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open command palette"
      >
        <Command size={24} />
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
