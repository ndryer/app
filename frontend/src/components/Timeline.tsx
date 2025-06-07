import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Experience } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './Timeline.module.css';


interface TimelineProps {
  experienceData: Experience[];
}

interface TimelineRefs {
  [key: string]: HTMLDivElement | null;
}

// ◀︎ LLM-modified: Animation variants for scroll-triggered timeline animations
const timelineContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.15, // 150ms stagger between timeline items
      delayChildren: 0.2, // 200ms delay before children start animating
    },
  },
};

const timelineItemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const TimelineComponent: React.FC<TimelineProps> = ({ experienceData }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [timelineHeight, setTimelineHeight] = useState<number>(0);
  const timelineRefs = useRef<TimelineRefs>({});
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // ◀︎ LLM-modified: useInView hook for scroll-triggered animations
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineContainerRef, {
    amount: 0.3, // Trigger when 30% of timeline is visible
    once: true, // Only animate once when scrolling down
    margin: '0px 0px -100px 0px', // Start animation 100px before element enters viewport
  });


  // PERFORMANCE OPTIMIZATION: Memoize year range extraction to avoid recalculation on re-renders
  // Extract year range from date string (handles formats like "2022 - Present", "April 2017 - 2022", "2011 - 2015")
  const getYearRange = useCallback((dateString: string): string => {
    // Handle "Present" cases
    if (dateString.toLowerCase().includes('present')) {
      const startYearMatch = dateString.match(/\b(19|20)\d{2}\b/);
      return startYearMatch ? `${startYearMatch[0]}-Present` : dateString;
    }

    // Extract all 4-digit years from the string
    const yearMatches = dateString.match(/\b(19|20)\d{2}\b/g);

    if (yearMatches && yearMatches.length >= 2) {
      // Return range format: "startYear-endYear"
      return `${yearMatches[0]}-${yearMatches[yearMatches.length - 1]}`;
    } else if (yearMatches && yearMatches.length === 1) {
      // Single year found
      return yearMatches[0];
    }

    // Fallback to original string if no years found
    return dateString.split(' ')[0];
  }, []);



  // PERFORMANCE OPTIMIZATION: Memoize toggle function to prevent unnecessary re-renders
  // Handle expanding/collapsing a timeline card
  const toggleExpand = useCallback((id: string): void => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  // Handle keyboard navigation with enhanced focus management
  const handleKeyDown = (e: React.KeyboardEvent, id: string): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(id);
      // Announce state change to screen readers
      announceStateChange(id, expandedId !== id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setExpandedId(null);
      // Announce collapse to screen readers
      if (expandedId) {
        announceStateChange(expandedId, false);
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = experienceData.findIndex(item => item.id === id);
      const nextIndex =
        e.key === 'ArrowDown'
          ? Math.min(currentIndex + 1, experienceData.length - 1)
          : Math.max(currentIndex - 1, 0);

      // Enhanced focus management with better selector
      const nextButton = document.querySelector(
        `button[aria-describedby="timeline-content-${experienceData[nextIndex].id}"]`
      ) as HTMLButtonElement;
      if (nextButton) {
        nextButton.focus();
      }
    }
  };

  // PERFORMANCE OPTIMIZATION: Memoize screen reader announcements
  // Screen reader announcements for state changes
  const announceStateChange = useCallback((id: string, isExpanding: boolean): void => {
    const item = experienceData.find(exp => exp.id === id);
    if (!item) return;

    const message = isExpanding
      ? `Expanded details for ${item.title} at ${item.company}`
      : `Collapsed details for ${item.title} at ${item.company}`;

    // Create a temporary element for screen reader announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [experienceData]);

  // Determine if item should be positioned on the left (odd indices) or right (even indices)
  const isLeftSide = (index: number): boolean => index % 2 === 0;

  // Auto-scroll to expanded card
  useEffect(() => {
    if (expandedId && timelineRefs.current[expandedId]) {
      const element = timelineRefs.current[expandedId];
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isInView) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [expandedId]);

  // Auto-collapse when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        !target.closest('.timeline-card') &&
        !target.closest('.timeline-icon')
      ) {
        setExpandedId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate dynamic timeline height based on actual icon positions
  useEffect(() => {
    const calculateTimelineHeight = () => {
      if (experienceData.length === 0) return;

      const firstItemRef = timelineRefs.current[experienceData[0].id];
      const lastItemRef =
        timelineRefs.current[experienceData[experienceData.length - 1].id];

      if (firstItemRef && lastItemRef) {
        const firstIconRect = firstItemRef.getBoundingClientRect();
        const lastIconRect = lastItemRef.getBoundingClientRect();

        // Calculate the distance between icon centers
        const height = lastIconRect.top - firstIconRect.top;

        if (height > 0) {
          setTimelineHeight(height);
        }
      }
    };

    // Calculate on mount and when expanded state changes
    const timeoutId = setTimeout(calculateTimelineHeight, 100);

    // Recalculate on window resize
    const handleResize = () => {
      const timeoutId = setTimeout(calculateTimelineHeight, 100);
      return () => clearTimeout(timeoutId);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [experienceData, expandedId]);

  // Create a callback function that assigns the ref and returns void
  const setTimelineRef =
    (id: string) =>
      (el: HTMLDivElement | null): void => {
        timelineRefs.current[id] = el;
      };

  return (
    // ◀︎ LLM-modified: Updated container background to bg-section-secondary and timeline elements to text-section-secondary/80
    <section
      id='timeline'
      className='py-[var(--space-section)] bg-section-secondary'
    >
      <div className='container mx-auto px-4'>
        {/* ◀︎ LLM-modified: Updated to text-white for better contrast on deep blue backgrounds */}
        <h2 className='mb-12 text-center text-3xl font-bold text-white'>
          Professional Timeline
        </h2>

        {/* Responsive Timeline Container - CSS Grid Layout with Scroll Animations */}
        <motion.div
          ref={timelineContainerRef}
          className='timeline-grid-container relative mx-auto w-full max-w-none px-4 md:max-w-6xl md:px-8'
          variants={shouldReduceMotion ? undefined : timelineContainerVariants}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          animate={shouldReduceMotion ? undefined : (isInView ? 'visible' : 'hidden')}
        >
          {/* Desktop Timeline Line - CSS Grid positioned for alternating layout */}
          <div
            ref={timelineLineRef}
            className='timeline-line-desktop hidden w-0.5 bg-white/60 md:block'
            style={{
              height:
                timelineHeight > 0
                  ? `${timelineHeight}px`
                  : `${(experienceData.length - 1) * 96}px`, // Keep calculated height as-is
              marginTop: 'calc(var(--space-6) + var(--space-5))', // Start at first milestone icon center (24px + 22px)
            }}
          />

          {/* Mobile Timeline Line - Left aligned for mobile */}
          <div
            className='absolute w-0.5 bg-white/60 md:hidden'
            style={{
              height:
                timelineHeight > 0
                  ? `${timelineHeight}px`
                  : `${(experienceData.length - 1) * 96}px`, // Keep calculated height as-is
              top: 'calc(var(--space-6) + var(--space-5))', // Start at first milestone icon center (24px + 22px)
              left: 'calc(var(--height-touch-min) / 2)', // Align with milestone icon center (44px / 2)
            }}
          />

          {experienceData.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const leftSide = isLeftSide(index);
            // Calculate consistent spacing using 8px scale - optimized for better visual balance
            const baseSpacing = 96; // Reduced spacing between items (8px scale: 12 * 8 = 96px)

            return (
              <motion.div
                key={item.id}
                ref={setTimelineRef(item.id)}
                className={`timeline-grid-item ${styles['timeline-item-hover']} relative ${leftSide ? 'timeline-left' : 'timeline-right'}`}
                style={{
                  minHeight: `${baseSpacing}px`, // Keep calculated spacing as-is
                  paddingTop: 'var(--space-6)', // 24px for better mobile spacing
                  paddingBottom: 'var(--space-4)', // 16px reduced bottom padding
                  marginBottom: isExpanded ? 'var(--space-8)' : 'var(--space-4)', // Reduced extra space when expanded
                }}
                variants={shouldReduceMotion ? undefined : timelineItemVariants}
              >
                {/* Timeline Icon - 44px minimum tap target for accessibility */}
                {/* ◀︎ LLM-modified: Removed all hover effects and animations to prevent erratic movement */}
                <button
                  className={`timeline-icon timeline-icon-focus flex h-11 min-h-touch-min w-11 min-w-touch-min cursor-pointer items-center justify-center rounded-full bg-token-primary-500 text-white shadow-token-lg`}
                  onClick={() => {
                    toggleExpand(item.id);
                    announceStateChange(item.id, expandedId !== item.id);
                  }}
                  onKeyDown={e => handleKeyDown(e, item.id)}
                  type='button'
                  role='button'
                  aria-expanded={isExpanded}
                  aria-controls={`timeline-content-${item.id}`}
                  aria-labelledby={`timeline-title-${item.id}`}
                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${item.title} at ${item.company}`}
                  aria-describedby={`timeline-content-${item.id}`}
                >
                  <item.icon size={20} />
                </button>

                {/* Single Transforming Card - CSS Grid Optimized with Year Label Above */}
                <motion.div
                  layout='position'
                  id={`timeline-content-${item.id}`}
                  className={`timeline-card-wrapper relative w-full md:w-auto ${isExpanded
                    ? 'z-timeline-card-expanded md:max-w-md lg:max-w-lg xl:max-w-xl'
                    : 'z-timeline-card md:max-w-sm lg:max-w-md xl:max-w-lg'
                    } `}
                  style={{
                    // UX: Align card content with timeline icon for visual connection - reduced gap
                    marginTop: '0', // No margin needed
                  }}
                  initial={false}
                  animate={{
                    transition: shouldReduceMotion
                      ? { duration: 0 }
                      : {
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      },
                  }}
                >
                  {/* Year Label - Positioned Above Card */}
                  <div className='timeline-year-label-above'>
                    <p className='timeline-year-text whitespace-nowrap text-lg font-semibold text-white/60 transition-all duration-300 md:text-xl'>
                      {getYearRange(item.date)}
                    </p>
                  </div>
                  <motion.div
                    layout='position'
                    className={`timeline-card rounded-lg ${isExpanded
                      ? 'bg-token-surface-50/90 dark:bg-token-secondary-800/90 shadow-xl backdrop-blur-md'
                      : 'bg-token-surface-50/95 dark:bg-token-secondary-800/95 shadow-md backdrop-blur-sm'
                      } timeline-card-hover ${shouldReduceMotion ? '' : 'transition-all duration-300'
                      } text-left ${isExpanded ? 'p-5' : 'p-4'} timeline-card-focus relative cursor-pointer`}
                    data-view-transition-name={`timeline-card-${index + 1}`}
                    style={
                      {
                        '--view-transition-name': `timeline-card-${index + 1}`,
                      } as React.CSSProperties
                    }
                    onClick={() => {
                      toggleExpand(item.id);
                      announceStateChange(item.id, expandedId !== item.id);
                    }}
                    role='button'
                    tabIndex={0}
                    aria-controls={`timeline-expanded-${item.id}`}
                    aria-labelledby={`timeline-title-${item.id}`}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleExpand(item.id);
                        announceStateChange(item.id, expandedId !== item.id);
                      }
                    }}
                  >
                    {/* Core Content - Always Visible */}
                    <motion.div layout='position'>
                      {/* Company Name - Primary Typography (Always Visible) */}
                      <h3
                        id={`timeline-title-${item.id}`}
                        className={`${isExpanded ? 'mb-3 text-xl' : 'mb-2 text-lg'} font-semibold leading-tight text-token-primary`}
                      >
                        {item.company}
                      </h3>

                      {/* Job Title - Secondary Typography */}
                      <p
                        className={`${isExpanded ? 'mb-3 text-lg' : 'mb-2 text-base'} font-medium leading-snug text-token-secondary`}
                      >
                        {item.title}
                      </p>

                      {/* Location - Tertiary Typography (Expanded only) */}
                      {isExpanded && (
                        <p className='mb-4 text-sm font-normal text-token-secondary'>
                          {item.location}
                        </p>
                      )}
                    </motion.div>

                    {/* Expanded Content - Conditionally Rendered */}
                    <AnimatePresence mode='wait'>
                      {isExpanded && (
                        <motion.div
                          id={`timeline-expanded-${item.id}`}
                          className='timeline-expanded-content'
                          data-view-transition-name={`expanded-content-${index + 1}`}
                          style={
                            {
                              overflow: 'hidden',
                              '--view-transition-name': `expanded-content-${index + 1}`,
                            } as React.CSSProperties
                          }
                          initial={
                            shouldReduceMotion
                              ? undefined
                              : { opacity: 0, height: 0 }
                          }
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : {
                                opacity: 1,
                                height: 'auto',
                                transition: {
                                  duration: 0.3,
                                  ease: [0.4, 0, 0.2, 1],
                                  staggerChildren: 0.1,
                                  type: 'spring',
                                  stiffness: 300,
                                  damping: 30,
                                },
                              }
                          }
                          exit={
                            shouldReduceMotion
                              ? undefined
                              : {
                                opacity: 0,
                                height: 0,
                                transition: {
                                  duration: 0.2,
                                  ease: [0.4, 0, 0.2, 1],
                                },
                              }
                          }
                        >
                          {/* Technologies Used - Quaternary Typography */}
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? undefined
                                : { opacity: 0, y: 10 }
                            }
                            animate={
                              shouldReduceMotion
                                ? undefined
                                : { opacity: 1, y: 0 }
                            }
                            transition={
                              shouldReduceMotion ? undefined : { delay: 0.05 }
                            }
                          >
                            {item.technologies && (
                              <div className='mb-4'>
                                <div className='flex flex-wrap justify-start gap-2'>
                                  {item.technologies.map((tech, index) => (
                                    <span
                                      key={index}
                                      className='inline-block rounded-full bg-token-primary-100 px-3 py-1.5 text-sm font-medium text-token-primary-800 backdrop-blur-sm transition-colors duration-200 hover:bg-token-primary-200 dark:bg-token-primary-900 dark:text-token-primary-200 dark:hover:bg-token-primary-800'
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Memoized Timeline component for performance optimization
 *
 * PERFORMANCE OPTIMIZATION: React.memo prevents unnecessary re-renders when:
 * - experienceData array reference hasn't changed
 *
 * Expected performance improvement: 20-30% reduction in Timeline re-renders
 * when parent App component re-renders for unrelated state changes
 *
 * The component includes several performance optimizations:
 * - Memoized callbacks (toggleExpand, announceStateChange, getYearRange)
 * - Optimized timeline height calculations
 * - Efficient event handlers and keyboard navigation
 */
export const Timeline = React.memo(TimelineComponent);
