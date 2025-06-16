import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experienceData } from '../data';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Timeline = () => {
  const [expandedId, setExpandedId] = useState(null);
  const timelineRefs = useRef({});

  // Handle expanding/collapsing a timeline card
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(id);
    }
  };

  // Auto-scroll to expanded card
  useEffect(() => {
    if (expandedId && timelineRefs.current[expandedId]) {
      const element = timelineRefs.current[expandedId];
      const rect = element.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (!isInView) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }, [expandedId]);

  return (
    <section id="timeline" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Professional Timeline
        </h2>
        
        <VerticalTimeline lineColor="rgba(156, 163, 175, 0.2)">
          {experienceData.map((item) => {
            const isExpanded = expandedId === item.id;
            
            return (
              <div
                key={item.id}
                ref={el => timelineRefs.current[item.id] = el}
                className={`timeline-element-container ${isExpanded ? 'z-10' : ''}`}
              >
                <VerticalTimelineElement
                  contentStyle={{
                    background: isExpanded
                      ? 'rgba(59, 130, 246, 0.05)'
                      : 'rgba(255, 255, 255, 1)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    borderLeft: isExpanded
                      ? '4px solid #3B82F6'
                      : '4px solid transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  contentArrowStyle={{
                    borderRight: isExpanded
                      ? '7px solid rgba(59, 130, 246, 0.05)'
                      : '7px solid rgba(255, 255, 255, 1)',
                    transition: 'border-right 0.3s ease',
                  }}
                  date={item.date}
                  iconStyle={{
                    background: '#3B82F6',
                    color: '#fff',
                    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
                  }}
                  icon={<item.icon />}
                >
                  <div
                    className={`timeline-card group ${
                      expandedId && expandedId !== item.id ? 'opacity-60' : 'opacity-100'
                    } transition-opacity duration-300`}
                    onClick={() => toggleExpand(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-controls={`timeline-content-${item.id}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400">
                          {item.company}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {item.location}
                        </p>
                      </div>
                      <div className="text-gray-400 dark:text-gray-500 mt-1 transition-transform duration-300">
                        {isExpanded ? (
                          <ChevronUp size={20} className="text-blue-500" />
                        ) : (
                          <ChevronDown size={20} className="group-hover:text-blue-500" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {item.description}
                    </p>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={`timeline-content-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: 'auto', 
                            opacity: 1,
                            transition: { 
                              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.2, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: { 
                              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.2 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                            {/* Key Achievements */}
                            {item.achievements && (
                              <div className="mb-4">
                                <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
                                  Key Achievements
                                </h5>
                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                                  {item.achievements.map((achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Technologies Used */}
                            {item.technologies && (
                              <div className="mb-4">
                                <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
                                  Technologies & Skills
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {item.technologies.map((tech, index) => (
                                    <span
                                      key={index}
                                      className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Notable Projects */}
                            {item.projects && (
                              <div>
                                <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
                                  Notable Projects
                                </h5>
                                <div className="space-y-3">
                                  {item.projects.map((project, index) => (
                                    <div key={index} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                                      <h6 className="font-medium text-gray-800 dark:text-white">
                                        {project.name}
                                      </h6>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {project.description}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
                      {isExpanded ? "Click to collapse" : "Click to expand"}
                    </div>
                  </div>
                </VerticalTimelineElement>
              </div>
            );
          })}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Timeline;
