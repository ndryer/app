import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CopyToClipboard from 'react-copy-to-clipboard';

const FloatingActionButton = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Close menu on page click (except when clicking the menu itself)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.fab-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = () => {
    setToastMessage('Email copied to clipboard!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const scrollToTop = () => {
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    document.getElementById('end')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    // Create a link to download the resume (placeholder URL)
    const link = document.createElement('a');
    link.href = '/nathan_dryer_resume.pdf';
    link.download = 'Nathan_Dryer_Resume.pdf';
    link.click();
    
    setToastMessage('Resume downloaded!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Button configuration
  const buttons = [
    { label: "Top", icon: "M5 15l7-7 7 7", onClick: scrollToTop },
    { label: "Timeline", icon: "M4 5h16M4 12h16M4 19h7", onClick: scrollToTimeline },
    { label: "Skills", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", onClick: scrollToSkills },
    { label: "Bottom", icon: "M19 9l-7 7-7-7", onClick: scrollToBottom },
    { 
      label: "Email", 
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", 
      onClick: handleCopy,
      copyToClipboard: true,
      text: email
    },
    { 
      label: "Resume", 
      icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", 
      onClick: downloadResume 
    }
  ];

  return (
    <>
      <div className="fab-container fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute -inset-10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {buttons.map((button, index) => {
                // Calculate position in a circle
                const step = (2 * Math.PI) / buttons.length;
                const angle = index * step;
                const radius = 80; // Distance from center
                
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                const Button = button.copyToClipboard ? CopyToClipboardButton : RegularButton;
                
                return (
                  <Button
                    key={index}
                    button={button}
                    index={index}
                    position={{ x, y }}
                    total={buttons.length}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB button */}
        <motion.button
          className="fab bg-[var(--color-accent)] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </motion.button>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="alert"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper component for regular button
const RegularButton = ({ button, index, position, total }) => {
  return (
    <motion.button
      className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-dark-600 text-[var(--color-accent)] shadow-md"
      initial={{ scale: 0, x: 0, y: 0 }}
      animate={{ 
        scale: 1, 
        x: position.x, 
        y: position.y,
      }}
      exit={{ 
        scale: 0,
        x: 0,
        y: 0,
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.03,
      }}
      onClick={button.onClick}
      aria-label={button.label}
      whileHover={{ 
        scale: 1.1, 
        backgroundColor: "var(--color-accent)",
        color: "white"
      }}
      whileTap={{ scale: 0.9 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={button.icon} />
      </svg>
    </motion.button>
  );
};

// Helper component for copy-to-clipboard button
const CopyToClipboardButton = ({ button, index, position, total }) => {
  return (
    <CopyToClipboard text={button.text} onCopy={button.onClick}>
      <motion.button
        className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-dark-600 text-[var(--color-accent)] shadow-md"
        initial={{ scale: 0, x: 0, y: 0 }}
        animate={{ 
          scale: 1, 
          x: position.x, 
          y: position.y,
        }}
        exit={{ 
          scale: 0,
          x: 0,
          y: 0,
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: index * 0.03,
        }}
        aria-label={button.label}
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: "var(--color-accent)",
          color: "white"
        }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={button.icon} />
        </svg>
      </motion.button>
    </CopyToClipboard>
  );
};

export default FloatingActionButton;
