import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ experience, index, inView }) => {
  const isEven = index % 2 === 0;
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 15,
          delay: index * 0.2, // Staggered delay for better effect
        }
      });
    } else {
      controls.start({
        opacity: 0,
        x: isEven ? -80 : 80,
      });
    }
  }, [inView, isEven, controls, index]);

  return (
    <div className={`timeline-item ${isEven ? 'timeline-item-left' : 'timeline-item-right'}`}>
      <div className="timeline-dot" data-date={experience.dates}>
        <div className="timeline-dot-inner"></div>
      </div>
      <motion.div 
        className="timeline-content"
        initial={{ opacity: 0, x: isEven ? -80 : 80 }}
        animate={controls}
      >
        <span className="timeline-date">{experience.dates}</span>
        <h3 className="timeline-title">{experience.title}</h3>
        <h4 className="timeline-company">{experience.company}</h4>
        <p className="timeline-location">{experience.location}</p>
        <ul className="timeline-points">
          {experience.blurb.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const Timeline = ({ userData }) => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "-100px 0px",
  });

  // Calculate years of experience
  const currentYear = new Date().getFullYear();
  const startYear = 2009; // First job in the resume
  const yearsOfExperience = currentYear - startYear;

  return (
    <section ref={ref} id="timeline" className="py-24 bg-white dark:bg-dark-800">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold mb-4 text-gray-900 dark:text-white">Professional Journey</h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            With over {yearsOfExperience} years of experience building innovative products that make an impact.
          </p>
        </motion.div>

        <div className="timeline-container" ref={containerRef}>
          <div className="timeline-line"></div>
          
          {userData.experiences.map((experience, index) => (
            <TimelineItem 
              key={index} 
              experience={experience} 
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
