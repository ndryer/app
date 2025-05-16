import React, { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const Timeline = ({ userData }) => {
  // Set up intersection observer to trigger animations
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Calculate years of experience
  const currentYear = new Date().getFullYear();
  const startYear = 2009; // First job in the resume
  const yearsOfExperience = currentYear - startYear;

  return (
    <section id="timeline" ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-850 mb-4 font-display">Professional Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            With over {yearsOfExperience} years of experience building innovative products that make an impact.
          </p>
        </motion.div>

        <VerticalTimeline animate={true} lineColor="">
          {userData.experiences.map((experience, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element"
              contentStyle={{ background: 'white', color: '#1f2537', boxShadow: '0 3px 15px rgba(0, 0, 0, 0.05)' }}
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date={experience.dates}
              iconStyle={{ background: '#2a3142', color: '#fff' }}
              icon={
                <div className="flex items-center justify-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              }
            >
              <h3 className="vertical-timeline-element-title text-xl font-bold text-neutral-850 font-display">{experience.title}</h3>
              <h4 className="vertical-timeline-element-subtitle text-lg mt-1 text-primary-600 font-medium">{experience.company}</h4>
              <p className="text-sm text-gray-500 mt-1 mb-4 font-light italic">{experience.location}</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 font-light">
                {experience.blurb.map((point, i) => (
                  <li key={i} className="text-sm md:text-base">{point}</li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Timeline;
