import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import { Skill } from '../types';

interface SkillsProps {
  skillsData: Skill[];
}

interface SkillCategory {
  id: string;
  name: string;
  color: string;
  description: string;
}

interface SkillLevel {
  min: number;
  name: string;
  color: string;
}

interface CategorizedSkill extends Skill {
  category: string;
}

// Refined skill categories with better descriptions
const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI/ML & Product',
    color: '#3B82F6',
    description: 'Artificial intelligence, machine learning, and product development expertise'
  },
  {
    id: 'technical',
    name: 'Technical Skills',
    color: '#10B981',
    description: 'Programming, development, and technical implementation'
  },
  {
    id: 'leadership',
    name: 'Leadership & Strategy',
    color: '#F59E0B',
    description: 'Team leadership, management, and strategic planning'
  }
];

// Skill level definitions
const skillLevels: SkillLevel[] = [
  { min: 90, name: 'Expert', color: '#3B82F6' },
  { min: 80, name: 'Advanced', color: '#10B981' },
  { min: 70, name: 'Intermediate', color: '#F59E0B' },
  { min: 0, name: 'Foundational', color: '#6B7280' }
];

// Get skill level
const getSkillLevel = (level: number): SkillLevel => {
  return skillLevels.find(sl => level >= sl.min) || skillLevels[skillLevels.length - 1];
};

export const Skills: React.FC<SkillsProps> = ({ skillsData }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [inViewSkills, setInViewSkills] = useState<Record<string, boolean>>({});
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Map skills to simplified categories
  const categorizedSkills: CategorizedSkill[] = skillsData.map(skill => {
    let category = 'technical'; // Default category
    
    // Simplified category determination
    if (/ai|ml|agent|llm|nlp|gpt|model|embedding|vector|orchestration|product|roadmap|strategy/i.test(skill.name)) {
      category = 'ai-ml';
    } else if (/lead|leadership|manage|team|strategy|vision|executive/i.test(skill.name)) {
      category = 'leadership';
    }
    
    return {
      ...skill,
      category
    };
  });
  
  // Toggle category filter
  const toggleCategory = (categoryId: string | null): void => {
    setActiveCategory(prev => prev === categoryId ? null : categoryId);
    // Reset in-view skills when changing categories
    setInViewSkills({});
  };
  
  // Get filtered skills
  const getFilteredSkills = (): CategorizedSkill[] => {
    if (!activeCategory) return categorizedSkills;
    return categorizedSkills.filter(skill => skill.category === activeCategory);
  };
  
  // Get category color
  const getCategoryColor = (categoryId: string): string => {
    const category = skillCategories.find(cat => cat.id === categoryId);
    return category ? category.color : '#3B82F6';
  };

  // Check if skills are in view for animation
  useEffect(() => {
    if (!skillsContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const skillId = (entry.target as HTMLElement).dataset.skillId;
            if (skillId) {
              setInViewSkills(prev => ({ ...prev, [skillId]: true }));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    const skillElements = skillsContainerRef.current.querySelectorAll('.skill-card');
    skillElements.forEach(el => observer.observe(el));

    return () => {
      skillElements.forEach(el => observer.unobserve(el));
    };
  }, [activeCategory]);

  return (
    <section id="skills" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white tracking-tight">
          Skills & Expertise
        </h2>
        
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-light tracking-wide">
          Professional competencies across AI, product, and technical domains
        </p>
        
        {/* Refined Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <motion.button
            onClick={() => toggleCategory(null)}
            className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 shadow-sm ${
              activeCategory === null
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            All Skills
          </motion.button>
          
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 shadow-sm ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              style={{
                borderLeft: `3px solid ${category.color}`,
              }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        
        {/* Category Description */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-600 dark:text-gray-300 italic font-light">
                {skillCategories.find(cat => cat.id === activeCategory)?.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Skills Grid - Enhanced Card-Based Layout */}
        <div 
          ref={skillsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {getFilteredSkills().map((skill) => {
              const skillLevel = getSkillLevel(skill.level);
              
              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="skill-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                  data-skill-id={skill.id}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div 
                    className="h-2" 
                    style={{ backgroundColor: getCategoryColor(skill.category) }}
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                        {skill.name}
                      </h3>
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ 
                          backgroundColor: `${skillLevel.color}20`,
                          color: skillLevel.color
                        }}
                      >
                        {skillLevel.name}
                      </span>
                    </div>
                    
                    <div className="mt-4 relative">
                      <div className="flex justify-between items-center space-x-3 mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                          Proficiency
                        </span>
                        <span className="text-lg font-bold" style={{ color: getCategoryColor(skill.category) }}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full"
                          style={{
                            width: '0%',
                            backgroundColor: getCategoryColor(skill.category)
                          }}
                          animate={{ 
                            width: inViewSkills[skill.id] ? `${skill.level}%` : '0%' 
                          }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <span 
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium"
                      >
                        {skillCategories.find(cat => cat.id === skill.category)?.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Empty State */}
        {getFilteredSkills().length === 0 && (
          <motion.div 
            className="text-center py-10 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No skills found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
