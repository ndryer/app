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
          delay: index * 0.2,
        }
      });
    } else {
      controls.start({
        opacity: 0,
        x: isEven ? -40 : 40,
      });
    }
  }, [inView, isEven, controls, index]);

  // On mobile, all cards are on the right side
  const isMobile = window.innerWidth < 768;

  return (
    <div className={`timeline-card-container ${isEven && !isMobile ? 'timeline-left' : 'timeline-right'}`}>
      <div className="timeline-dot">
        <div className="timeline-dot-inner"></div>
      </div>
      
      <motion.div 
        className="timeline-card"
        initial={{ opacity: 0, x: isEven && !isMobile ? -40 : 40 }}
        animate={controls}
      >
        <div className="timeline-date">{experience.dates}</div>
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
    <section ref={ref} id="timeline" className="py-24 bg-gray-950 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4">
        <div className="timeline-wrapper">
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
