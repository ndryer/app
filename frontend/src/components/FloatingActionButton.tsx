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

      // Switch to bounce after fade-in completes (0.75s delay + 1s fade-in = 1.75s total)
      setTimeout(() => {
        setAnimationPhase('bounce');
      }, 1750); // Start bounce after synchronized fade-in completes
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
          className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 transform md:bottom-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
        >

          <motion.button
            className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 bg-gradient-button hover:bg-gradient-button-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-token-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-token-secondary-900 md:h-14 md:w-14"
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
            <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
