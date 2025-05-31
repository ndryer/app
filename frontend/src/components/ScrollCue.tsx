import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const ScrollCue: React.FC = () => {
  // Animation variants for the button
  const buttonVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1
      }
    },
    bounce: {
      y: [0, -8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    },
    pulse: {
      opacity: [1, 0.7, 1],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // Handle click to scroll to the shiplog section
  const handleScrollToShiplog = (): void => {
    document.getElementById("shiplog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleScrollToShiplog}
      className="absolute left-1/2 bottom-6 -translate-x-1/2 z-10
                 flex items-center justify-center
                 w-12 h-12 rounded-full 
                 bg-gradient-to-r from-blue-500 to-blue-600
                 text-white shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      aria-label="Scroll to timeline"
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      <motion.div
        variants={buttonVariants}
        animate={window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "pulse" : "bounce"}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
};
