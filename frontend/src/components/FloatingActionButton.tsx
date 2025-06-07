// ◀︎ LLM-modified - Enhanced responsive sizing using clamp() functions for better mobile/desktop scaling
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const FloatingActionButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'visible' | 'pulse' | 'bounce'>('hidden');
  const [hasShownInitially, setHasShownInitially] = useState<boolean>(false);
  const [isPermanentlyHidden, setIsPermanentlyHidden] = useState<boolean>(false);

  // Initial delayed appearance with subtle bounce - synchronized with command button
  useEffect(() => {
    if (isPermanentlyHidden) return;

    const delayTimer = setTimeout(() => {
      setIsVisible(true);
      setHasShownInitially(true);
      setAnimationPhase('visible');

      // ◀︎ LLM-modified: Switch to pulse after fade-in completes (0.75s delay + 1s fade-in = 1.75s total)
      setTimeout(() => {
        setAnimationPhase('pulse');
      }, 1750); // Start pulse after synchronized fade-in completes
    }, 750); // 0.75 second initial delay - synchronized with command button

    return () => clearTimeout(delayTimer);
  }, [isPermanentlyHidden]);

  // Intersection Observer for scroll-based hiding logic
  useEffect(() => {
    if (!hasShownInitially || isPermanentlyHidden) return; // Only activate after initial show and if not permanently hidden

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide button permanently when timeline becomes visible (user scrolled down)
        if (entry.isIntersecting) {
          setIsPermanentlyHidden(true);
          setIsVisible(false);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -25% 0px'
      }
    );

    const timelineElement = document.getElementById('timeline');
    if (timelineElement) {
      observer.observe(timelineElement);
    }

    return () => observer.disconnect();
  }, [hasShownInitially, isPermanentlyHidden]);



  // Enhanced scroll handler with permanent hide
  const handleScrollToTimeline = useCallback((): void => {
    const timelineElement = document.getElementById('timeline') ||
      document.querySelector('[data-section="timeline"]') ||
      document.querySelector('main');

    if (timelineElement) {
      timelineElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Permanently hide button after scroll
      setIsPermanentlyHidden(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    }
  }, []);

  // ◀︎ LLM-modified: Enhanced Framer Motion variants with synchronized fade-in animation
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
      scale: 0.4,
      y: 16, // Synchronized initial position (translate-y-4 = 16px)
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    },
    bounce: {
      y: [0, -3, 0], // More visible bounce animation
      transition: {
        duration: 2.0, // 2s bounce duration
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut'
        // No delay here - delay is handled by the animationPhase timing
      }
    },
    pulse: {
      scale: [1, 1.02, 1], // ◀︎ LLM-modified: Using --token-scale-pulse-min (1) and --token-scale-pulse-max (1.02)
      transition: {
        duration: 3.0, // Using --duration-pulse (3s)
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut'
      }
    },
    initialPulse: {
      scale: [1, 1.1, 1, 1.05, 1], // Reduced for mobile
      boxShadow: [
        'var(--token-glow-primary-subtle)',
        'var(--token-glow-primary)',
        'var(--token-glow-primary-subtle)',
        'var(--token-glow-hover)',
        'var(--token-glow-primary-subtle)'
      ],
      transition: {
        duration: 1.0, // Shortened for mobile
        ease: 'easeInOut',
        times: [0, 0.3, 0.6, 0.8, 1]
      }
    },
    hover: {
      scale: 1.05, // Token-based scaling converted to numeric
      y: -1,
      boxShadow: 'var(--token-glow-hover)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      scale: 0.95, // Token-based scaling converted to numeric
      y: 0,
      transition: { duration: 0.15 } // 150ms fast duration
    }
  };

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 transform" // ◀︎ LLM-modified: Aligned with FloatingCommandButton height (bottom-6)
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
        >

          <motion.button
            className="flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 bg-gradient-button hover:bg-gradient-button-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-token-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-token-secondary-900"
            style={{
              width: 'clamp(2.75rem, 4vw, 3.5rem)', // Responsive sizing: 44px mobile to 56px desktop
              height: 'clamp(2.75rem, 4vw, 3.5rem)', // Maintains 44px minimum accessibility target
            }}
            onClick={handleScrollToTimeline}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            animate={prefersReducedMotion ? undefined : animationPhase}
            aria-label="Scroll to timeline section"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleScrollToTimeline();
              }
            }}
          >
            <ChevronDown
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
