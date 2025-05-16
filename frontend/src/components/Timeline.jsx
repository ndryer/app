import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const TimelineItem = ({ experience, index, handleIntersection }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      handleIntersection(index);
    }
  }, [inView, index, handleIntersection]);

  return (
    <div ref={ref} className={`timeline-item ${inView ? 'animate-in' : ''}`}>
      <div className="timeline-item-dot"></div>
      <div className="timeline-item-date">{experience.dates}</div>
      <div className="timeline-item-content">
        <h3 className="font-display font-semibold text-lg text-accent mb-1">{experience.title}</h3>
        <h4 className="font-medium mb-2 text-sm">{experience.company}</h4>
        <p className="text-xs italic mb-3 text-gray-500 dark:text-gray-400">{experience.location}</p>
        <ul className="space-y-1">
          {experience.blurb.slice(0, 2).map((point, i) => (
            <li key={i} className="text-xs text-gray-600 dark:text-gray-300">{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Timeline = ({ userData }) => {
  const [animatedItems, setAnimatedItems] = useState([]);
  const timelineRef = useRef(null);

  const handleItemIntersection = (index) => {
    setAnimatedItems(prev => [...prev, index]);
  };

  // Calculate years of experience
  const currentYear = new Date().getFullYear();
  const startYear = 2009; // First job in the resume
  const yearsOfExperience = currentYear - startYear;

  return (
    <section ref={timelineRef} id="timeline" className="py-20 bg-[var(--color-bg-secondary)]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-text-primary)]">Professional Journey</h2>
          <p className="text-base text-[var(--color-text-secondary)] max-w-xl mx-auto font-light">
            With over {yearsOfExperience} years of experience building innovative products that make an impact.
          </p>
        </motion.div>

        <div className="timeline-container">
          <div className="timeline-center-line"></div>
          {userData.experiences.map((experience, index) => (
            <TimelineItem 
              key={index} 
              experience={experience} 
              index={index} 
              handleIntersection={handleItemIntersection}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
