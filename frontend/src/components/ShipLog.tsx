import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UserData } from '../types';

interface ShipLogProps {
  userData: UserData; // Keeping the UserData prop for future compatibility
}

export const ShipLog: React.FC<ShipLogProps> = ({ userData: _userData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={ref}
      id='shiplog'
      className='mt-20 bg-gray-50 py-16 text-gray-800 dark:bg-gray-950 dark:text-white md:mt-32'
    >
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          Professional Journey
        </h2>

        <motion.div
          ref={containerRef}
          className='flex flex-col items-center justify-center py-16'
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            className='max-w-md rounded-xl bg-white/50 p-8 text-center shadow-sm ring-1 ring-black/5 backdrop-blur-sm dark:bg-slate-900/50 dark:ring-white/10'
            variants={itemVariants}
          >
            <h3 className='mb-4 text-xl font-bold text-blue-600 dark:text-blue-400'>
              Coming Soon
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              The professional journey timeline is currently being updated with
              a new interactive format. Check back soon to explore my career
              path in detail.
            </p>
            <div className='mt-6'>
              <div className='inline-block h-1 w-10 rounded-full bg-blue-500'></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
