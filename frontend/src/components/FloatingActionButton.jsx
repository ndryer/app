import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CopyToClipboard from 'react-copy-to-clipboard';

const FloatingActionButton = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    setShowToast(true);
    setIsOpen(false);
    setTimeout(() => setShowToast(false), 2000);
  };

  const scrollToTop = () => {
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const scrollToBottom = () => {
    document.getElementById('end')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  // Circular menu animation setup
  const circleRadius = 70; // Distance from the center to the buttons
  
  // Calculate the position for each button
  const getButtonPosition = (index, total) => {
    const angle = (index * (360 / total)) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * circleRadius,
      y: Math.sin(angle) * circleRadius
    };
  };

  // Button variants for floating animations
  const buttonVariants = {
    closed: {
      scale: 0,
      opacity: 0,
    },
    open: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: i * 0.05,
      }
    })
  };

  return (
    <>
      <div className="relative z-20">
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Top action */}
              <motion.button
                className="fab-action"
                custom={0}
                variants={buttonVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                style={{
                  x: getButtonPosition(0, 3).x,
                  y: getButtonPosition(0, 3).y,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
              
              {/* Bottom action */}
              <motion.button
                className="fab-action"
                custom={1}
                variants={buttonVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={scrollToBottom}
                aria-label="Scroll to bottom"
                style={{
                  x: getButtonPosition(1, 3).x,
                  y: getButtonPosition(1, 3).y,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
              
              {/* Copy email action */}
              <CopyToClipboard text={email} onCopy={handleCopy}>
                <motion.button
                  className="fab-action"
                  custom={2}
                  variants={buttonVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  aria-label="Copy email address"
                  style={{
                    x: getButtonPosition(2, 3).x,
                    y: getButtonPosition(2, 3).y,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </motion.button>
              </CopyToClipboard>
            </>
          )}
        </AnimatePresence>

        {/* Main FAB button */}
        <motion.button
          className="fab"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
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
            Email copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActionButton;
