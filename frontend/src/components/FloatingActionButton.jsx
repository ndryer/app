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

  // Define fixed positions for menu items instead of calculating dynamically
  const menuItems = [
    {
      label: "Top",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
      onClick: scrollToTop,
      position: { top: '-70px', left: '0px' }
    },
    {
      label: "Timeline",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      onClick: scrollToTimeline,
      position: { top: '-50px', left: '-60px' }
    },
    {
      label: "Skills",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      onClick: scrollToSkills,
      position: { top: '-50px', left: '60px' }
    },
    {
      label: "Resume",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      onClick: downloadResume,
      position: { top: '0px', left: '70px' }
    },
    {
      label: "Email",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      copyToClipboard: true,
      text: email,
      onClick: handleCopy,
      position: { top: '0px', left: '-70px' }
    },
    {
      label: "Contact",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      onClick: scrollToBottom,
      position: { top: '50px', left: '0px' }
    }
  ];

  return (
    <>
      <div ref={containerRef} className="fixed bottom-10 right-10 z-50">
        <div className="relative">
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 bg-black/5 z-40" onClick={() => setIsOpen(false)} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <>
                {menuItems.map((item, index) => {
                  const ButtonComponent = item.copyToClipboard ? CopyToClipboardButton : RegularButton;
                  return (
                    <ButtonComponent 
                      key={index}
                      item={item}
                      index={index}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>

          <motion.button
            className="fab-modern"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isOpen ? { rotate: 45, backgroundColor: '#2C7A7B' } : { rotate: 0, backgroundColor: '#38B2AC' }}
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
            className="toast-modern"
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
const RegularButton = ({ item, index }) => {
  return (
    <motion.button
      className="fab-menu-item-modern"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...item.position 
      }}
      exit={{ 
        opacity: 0,
        scale: 0
      }}
      transition={{ 
        type: "spring",
        stiffness: 350,
        damping: 25,
        delay: index * 0.05,
      }}
      onClick={item.onClick}
      aria-label={item.label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {item.icon}
    </motion.button>
  );
};

// Helper component for copy-to-clipboard button
const CopyToClipboardButton = ({ item, index }) => {
  return (
    <CopyToClipboard text={item.text} onCopy={item.onClick}>
      <motion.button
        className="fab-menu-item-modern"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...item.position
        }}
        exit={{ 
          opacity: 0,
          scale: 0
        }}
        transition={{ 
          type: "spring",
          stiffness: 350,
          damping: 25,
          delay: index * 0.05,
        }}
        aria-label={item.label}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {item.icon}
      </motion.button>
    </CopyToClipboard>
  );
};

export default FloatingActionButton;
