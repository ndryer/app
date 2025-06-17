import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

import { Skill } from '../../types'; // Adjusted import path
import { useViewTransitions } from '../../hooks/useViewTransitions'; // Adjusted import path

/**
 * Props for the Skills component.
 */
type SkillsProps = {
  /** Array of skill data to display. */
  skillsData: Skill[];
};

type SkillCategory = {
  id: string;
  name: string;
  color: string;
  description: string;
};

type SkillLevel = {
  min: number;
  name: string;
  color: string;
};

type CategorizedSkill = Skill & {
  category: string;
};

const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI/ML & Product',
    color: 'var(--accent)',
    description:
      'Artificial intelligence, machine learning, and product development expertise',
  },
  {
    id: 'technical',
    name: 'Technical Skills',
    color: 'var(--text-secondary)',
    description: 'Programming, development, and technical implementation',
  },
  {
    id: 'leadership',
    name: 'Leadership & Strategy',
    color: 'var(--text-primary)',
    description: 'Team leadership, management, and strategic planning',
  },
];

const skillLevels: SkillLevel[] = [
  { min: 90, name: 'Expert', color: 'var(--accent)' },
  { min: 80, name: 'Advanced', color: 'var(--text-primary)' },
  { min: 70, name: 'Intermediate', color: 'var(--text-secondary)' },
  { min: 0, name: 'Foundational', color: 'var(--text-secondary)' },
];

const getSkillLevel = (level: number): SkillLevel => {
  return (
    skillLevels.find(sl => level >= sl.min) ||
    skillLevels[skillLevels.length - 1]
  );
};

/**
 * SkillsComponent displays a categorized and filterable list of skills with proficiency levels.
 * It uses animations and view transitions for a smooth user experience.
 * @param {SkillsProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered SkillsComponent.
 */
const SkillsComponent = ({ skillsData }: SkillsProps) => {
  const { withViewTransition } = useViewTransitions();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [inViewSkills, setInViewSkills] = useState<Record<string, boolean>>({});
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);

  const categorizedSkills: CategorizedSkill[] = useMemo(() => skillsData.map(skill => {
    let category = 'technical';
    if (
      /ai|ml|agent|llm|nlp|gpt|model|embedding|vector|orchestration|product|roadmap|strategy/i.test(
        skill.name
      )
    ) {
      category = 'ai-ml';
    } else if (
      /lead|leadership|manage|team|strategy|vision|executive/i.test(skill.name)
    ) {
      category = 'leadership';
    }
    return {
      ...skill,
      category,
    };
  }), [skillsData]);

  const toggleCategory = useCallback((categoryId: string | null): void => {
    withViewTransition(() => {
      setActiveCategory(prev => (prev === categoryId ? null : categoryId));
      setInViewSkills({});
    });
  }, [withViewTransition]);

  const getFilteredSkills = useMemo((): CategorizedSkill[] => {
    if (!activeCategory) return categorizedSkills;
    return categorizedSkills.filter(skill => skill.category === activeCategory);
  }, [activeCategory, categorizedSkills]);

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
    const skillElements =
      skillsContainerRef.current.querySelectorAll('.skill-card');
    skillElements.forEach(el => observer.observe(el));
    return () => {
      skillElements.forEach(el => observer.unobserve(el));
    };
  }, [activeCategory]);

  return (
    <section id='skills' className='bg-bg-surface-subtle py-[var(--space-12)]'>
      <div className='container mx-auto w-full px-4'>
        <h2 className='mb-6 text-center font-display text-4xl font-semibold tracking-tight'>
          Skills & Expertise
        </h2>
        <p className='mx-auto mb-10 max-w-2xl text-center font-light tracking-wide text-text-secondary'>
          Professional competencies across AI, product, and technical domains
        </p>
        <div className='mb-10 flex flex-wrap justify-center gap-3'>
          <motion.button
            onClick={() => toggleCategory(null)}
            className={`rounded-full px-[var(--space-5)] py-[var(--space-2)] text-sm font-medium shadow-sm transition-all duration-300 md:text-base ${activeCategory === null
              ? 'bg-accent text-on-accent'
              : 'bg-surface hover:bg-text-secondary/10 text-text-primary'
              } glass-surface`}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            All Skills
          </motion.button>
          {skillCategories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`rounded-full px-[var(--space-5)] py-[var(--space-2)] text-sm font-medium shadow-sm transition-all duration-300 md:text-base ${activeCategory === category.id
                ? 'bg-accent text-on-accent'
                : 'bg-surface hover:bg-text-secondary/10 text-text-primary'
                } glass-surface`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode='wait'>
          {activeCategory && (
            <motion.div
              className='mb-8 text-center'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className='font-light italic text-text-secondary'>
                {skillCategories.find(cat => cat.id === activeCategory)?.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          ref={skillsContainerRef}
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
        >
          <AnimatePresence>
            {getFilteredSkills.map(skill => {
              const skillLevel = getSkillLevel(skill.level);
              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className='skill-card bg-surface border-text-secondary/10 glass-surface overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md'
                  data-skill-id={skill.id}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className='p-5'>
                    <div className='mb-3 flex items-start justify-between'>
                      <h3 className='text-lg font-semibold text-text-primary'>
                        {skill.name}
                      </h3>
                      <span
                        className='rounded-full px-2 py-1 text-xs font-medium'
                        style={{
                          backgroundColor: `color-mix(in srgb, ${skillLevel.color} 20%, transparent)`,
                          color: skillLevel.color,
                        }}
                      >
                        {skillLevel.name}
                      </span>
                    </div>
                    <div className='relative mt-4'>
                      <div className='mb-1 flex items-center justify-between space-x-3'>
                        <span className='text-xs font-medium tracking-wide text-text-secondary'>
                          Proficiency
                        </span>
                        <span
                          className='text-lg font-bold text-accent'
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className='bg-text-secondary/10 h-2.5 w-full overflow-hidden rounded-full'>
                        <motion.div
                          className='h-full rounded-full bg-accent'
                          style={{
                            width: '0%',
                          }}
                          animate={{
                            width: inViewSkills[skill.id]
                              ? `${skill.level}%`
                              : '0%',
                          }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: 'easeOut',
                          }}
                        />
                      </div>
                    </div>
                    <div className='mt-4'>
                      <span className='bg-text-secondary/10 rounded-full px-2 py-1 text-xs font-medium text-text-secondary'>
                        {skillCategories.find(cat => cat.id === skill.category)?.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {getFilteredSkills.length === 0 && (
          <motion.div
            className='bg-surface rounded-lg py-10 text-center shadow-inner'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className='font-medium text-text-secondary'>
              No skills found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

/**
 * Memoized Skills component for performance optimization.
 * This component displays a filterable grid of skills with proficiency levels.
 * @see SkillsComponent
 */
export const Skills = React.memo(SkillsComponent); 