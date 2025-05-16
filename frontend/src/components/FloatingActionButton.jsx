import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CopyToClipboard from 'react-copy-to-clipboard';

const FloatingActionButton = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
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
    { label: "Top", icon: "arrow-up", onClick: scrollToTop },
    { label: "Timeline", icon: "timeline", onClick: scrollToTimeline },
    { label: "Skills", icon: "lightbulb", onClick: scrollToSkills },
    { label: "Contact", icon: "chevron-down", onClick: scrollToBottom },
    { 
      label: "Email", 
      icon: "mail",
      onClick: handleCopy,
      copyToClipboard: true,
      text: email
    },
    { 
      label: "Resume", 
      icon: "document-download",
      onClick: downloadResume 
    }
  ];

  // Circular menu layout calculations
  const getButtonPosition = (index, total, radius = 80) => {
    // Start from the top position and distribute buttons evenly in a circle
    const angleOffset = -90; // Start from top (negative y-axis in screen coordinates)
    const angleStep = (360 / total);
    const angle = ((index * angleStep) + angleOffset) * (Math.PI / 180);
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  // SVG path map
  const iconPathMap = {
    "arrow-up": "M5 15l7-7 7 7",
    "timeline": "M4 5h16M4 12h16M4 19h7",
    "lightbulb": "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    "chevron-down": "M19 9l-7 7-7-7",
    "mail": "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    "document-download": "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  };

  return (
    <>
      <div ref={containerRef} className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          <AnimatePresence>
            {isOpen && (
              <div className="absolute top-0 left-0">
                {buttons.map((button, index) => {
                  const position = getButtonPosition(index, buttons.length);
                  
                  if (button.copyToClipboard) {
                    return (
                      <CopyToClipboard key={index} text={button.text} onCopy={button.onClick}>
                        <motion.button
                          className="menu-button"
                          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            x: position.x, 
                            y: position.y,
                            opacity: 1,
                          }}
                          exit={{ 
                            scale: 0,
                            x: 0,
                            y: 0,
                            opacity: 0,
                            transition: { duration: 0.2 }
                          }}
                          transition={{ 
                            type: "spring",
                            stiffness: 350,
                            damping: 25,
                            delay: index * 0.04,
                          }}
                          aria-label={button.label}
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "#4F46E5",
                            color: "white"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPathMap[button.icon]} />
                          </svg>
                        </motion.button>
                      </CopyToClipboard>
                    );
                  }

                  return (
                    <motion.button
                      key={index}
                      className="menu-button"
                      initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        x: position.x, 
                        y: position.y,
                        opacity: 1,
                      }}
                      exit={{ 
                        scale: 0,
                        x: 0,
                        y: 0,
                        opacity: 0,
                        transition: { duration: 0.2 }
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                        delay: index * 0.04,
                      }}
                      onClick={button.onClick}
                      aria-label={button.label}
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: "#4F46E5",
                        color: "white"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPathMap[button.icon]} />
                      </svg>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

          <motion.button
            className="main-button"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isOpen ? { rotate: 135 } : { rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.button>
        </div>
      </div>

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

export default FloatingActionButton;
