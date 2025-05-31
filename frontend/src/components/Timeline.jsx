import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ experience, index, isLatest }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 15,
          delay: index * 0.1,
        }
      });
    } else {
      controls.start({
        opacity: 0,
        y: 20,
      });
    }
  }, [inView, controls, index]);

  return (
    <motion.li 
      ref={ref}
      className="w-full md:w-[260px] flex-shrink-0 scroll-snap-align-start"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <div className={`relative p-5 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm 
                      shadow-sm ring-1 ring-black/5 dark:ring-white/10 h-full`}>
        {/* Timeline dot - with gradient ring for latest item */}
        <div className={`absolute -left-3 md:left-1/2 md:-top-3 md:-translate-x-1/2 w-6 h-6 rounded-full 
                        flex items-center justify-center
                        ${isLatest 
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 p-[3px]' 
                          : 'border-2 border-blue-500 dark:border-blue-400'}`}>
          <div className={`rounded-full ${isLatest 
            ? 'bg-white dark:bg-slate-900 w-full h-full flex items-center justify-center' 
            : 'bg-blue-500 dark:bg-blue-400 w-2 h-2'}`}>
            {isLatest && (
              <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 
                            animate-pulse"></div>
            )}
          </div>
        </div>
        
        {/* Card content */}
        <div className="ml-4 md:ml-0 md:mt-4">
          <div className="text-sm font-medium text-blue-500 dark:text-blue-400 mb-1">
            {experience.dates}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {experience.title}
          </h3>
          <h4 className="text-md font-medium text-blue-600 dark:text-blue-500 mb-1">
            {experience.company}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {experience.location}
          </p>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {experience.blurb.map((point, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 mt-1 text-blue-500 dark:text-blue-400">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
};

const Timeline = ({ userData }) => {
  const containerRef = useRef(null);

  return (
    <section 
      id="shiplog" 
      className="py-16 bg-gray-50 dark:bg-gray-950 mt-20 md:mt-32"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Experience Timeline
        </h2>
        
        <ul 
          ref={containerRef}
          className="shiplog relative flex flex-col md:flex-row gap-8 md:gap-6
                    h-[80vh] md:h-auto overflow-y-auto md:overflow-x-auto md:pb-8
                    scroll-snap-type-y md:scroll-snap-type-x scroll-snap-mandatory
                    pl-6 md:pl-0"
        >
          {/* Vertical line for mobile only */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-blue-600 md:hidden"></div>
          
          {userData.experiences.map((experience, index) => (
            <TimelineItem 
              key={index} 
              experience={experience} 
              index={index}
              isLatest={index === 0}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Timeline;
