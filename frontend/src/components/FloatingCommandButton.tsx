// ◀︎ LLM-modified - Enhanced tooltip with glassmorphism effects and responsive sizing using clamp() functions
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Command } from 'lucide-react';

interface FloatingCommandButtonProps {
  toggleCommandMenu: () => void;
}

export const FloatingCommandButton: React.FC<FloatingCommandButtonProps> = ({
  toggleCommandMenu,
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isMac, setIsMac] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'visible' | 'pulse'>('hidden');
  const [tooltipTimer, setTooltipTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  // Synchronized delayed appearance with scroll button
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsVisible(true);
      setAnimationPhase('visible');

      // Start pulse after fade-in completes (0.75s delay + 1s fade-in = 1.75s total)
      setTimeout(() => {
        setAnimationPhase('pulse');
      }, 1000); // Start pulse after fade-in completes
    }, 750); // 0.75 second delay - synchronized with scroll button

    return () => clearTimeout(delayTimer);
  }, []);

  // Enhanced tooltip handlers with 500ms delay
  const handleMouseEnter = (): void => {
    // Clear any existing timer
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
    }

    // Set new timer for 500ms delay
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 500);

    setTooltipTimer(timer);
  };

  // Handle mouse leave with immediate hide
  const handleMouseLeave = (): void => {
    // Clear any pending timer
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
      setTooltipTimer(null);
    }

    // Immediately hide tooltip
    setShowTooltip(false);
  };

  // Cleanup tooltip timer on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }
    };
  }, [tooltipTimer]);



  // Check for reduced motion preference safely
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Set up reduced motion detection
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // ◀︎ LLM-modified: Framer Motion variants for synchronized animations
  const buttonVariants: Variants = {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        opacity: { duration: 1.0, ease: 'easeOut' }, // 1s fade-in
        scale: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 0.5
        },
        y: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 1.0 // 1s slide-up
        }
      }
    },
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 16, // Synchronized initial position (translate-y-4 = 16px)
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    },
    pulse: {
      scale: [1, 1.02, 1], // Using --token-scale-pulse-min (1) and --token-scale-pulse-max (1.02)
      transition: {
        duration: 3.0, // Using --duration-pulse (3s)
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut'
      }
    },
    hover: {
      scale: 1.05, // From --token-scale-hover
      boxShadow: [
        'var(--token-glow-hover)',
        'inset 0 0 0 1px rgba(59, 130, 246, 0.4)' // ◀︎ LLM-modified: Inner glow effect for better hover visibility
      ].join(', '),
      transition: { duration: 0.18 } // 180ms from --duration-hover
    },
    tap: {
      scale: 0.95, // From --token-scale-tap
      transition: { duration: 0.15 } // 150ms from --duration-fast
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }} // 200ms from --duration-tooltip
                className="absolute bottom-full right-0 mb-4 whitespace-nowrap rounded-lg px-4 py-2 text-sm text-white backdrop-blur-md"
                style={{
                  background: 'var(--token-bg-frosted)',
                  boxShadow: 'var(--token-shadow-tooltip)',
                  border: '1px solid rgba(255, 255, 255, 0.1)', // Enhanced glassmorphism border
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Open Command Menu</span>
                  <span className="text-xs text-white/70">
                    {isMac ? '⌘K' : 'Ctrl+K'}
                  </span>
                </div>
                <div
                  className="absolute bottom-0 right-4 h-2 w-2 translate-y-1/2 rotate-45 transform"
                  style={{
                    background: 'var(--token-bg-frosted)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderTop: 'none',
                    borderLeft: 'none',
                  }}
                ></div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={toggleCommandMenu}
            className="flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 bg-gradient-button hover:bg-gradient-button-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-token-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-token-secondary-900"
            style={{
              width: 'clamp(2.75rem, 4vw, 3.5rem)', // Responsive sizing: 44px mobile to 56px desktop
              height: 'clamp(2.75rem, 4vw, 3.5rem)', // Maintains 44px minimum accessibility target
            }}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            animate={prefersReducedMotion ? undefined : animationPhase} // Controlled animation phases
            aria-label="Open Command Menu"
            aria-keyshortcuts={isMac ? '⌘+K' : 'Ctrl+K'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCommandMenu();
              }
            }}
          >
            <Command
              style={{
                width: 'clamp(1rem, 2.5vw, 1.5rem)', // Responsive icon: 16px mobile to 24px desktop
                height: 'clamp(1rem, 2.5vw, 1.5rem)',
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
