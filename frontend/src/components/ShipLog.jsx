import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ShipLog = ({ userData }) => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15
      }
    }
  };

  return (
    <section 
      ref={ref} 
      id="shiplog" 
      className="py-16 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white mt-20 md:mt-32"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Professional Journey</h2>
        
        <motion.ul 
          ref={containerRef}
          className="shiplog flex flex-col md:flex-row gap-8 h-[80vh] md:h-auto
                     overflow-y-auto md:overflow-x-auto
                     scroll-snap-type-y mandatory md:scroll-snap-type-x mandatory
                     pb-8 md:pb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          aria-label="Professional timeline"
        >
          {userData.experiences.map((experience, index) => (
            <motion.li 
              key={index}
              className="relative flex items-start gap-4 p-6
                         w-full md:w-[260px] md:shrink-0 md:snap-center
                         bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm
                         rounded-xl shadow-sm ring-1 ring-black/5 dark:ring-white/10
                         scroll-snap-align-start"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Timeline dot */}
              <div 
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 
                           ${index === 0 
                             ? "bg-gradient-to-r from-blue-400 to-blue-500 border-blue-400" 
                             : "border-blue-500 dark:border-blue-400"}`}
                aria-hidden="true"
              >
                {/* Pulse effect for the first/latest item */}
                {index === 0 && (
                  <span className="absolute inset-0 rounded-full animate-pulse-slow 
                                  bg-blue-400/20 dark:bg-blue-400/30" 
                        aria-hidden="true"></span>
                )}
              </div>
              
              <div className="flex-1">
                {/* Date */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {experience.dates}
                </p>
                
                {/* Role */}
                <h3 className="text-lg font-bold mb-1">
                  {experience.title}
                </h3>
                
                {/* Company */}
                <h4 className="text-md font-medium text-blue-600 dark:text-blue-400 mb-2">
                  {experience.company}
                </h4>
                
                {/* Location */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {experience.location}
                </p>
                
                {/* Achievements */}
                <ul className="space-y-2">
                  {experience.blurb.map((point, i) => (
                    <li 
                      key={i} 
                      className="text-sm leading-relaxed"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default ShipLog;
