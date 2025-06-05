import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ParallaxProvider } from 'react-scroll-parallax';

/**
 * Test utilities for consistent test setup
 */

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ParallaxProvider>{children}</ParallaxProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Mock data for testing
export const mockUserData = {
  fullName: 'Test User',
  bioLine: 'Test Bio',
  photoUrl: '/test-profile.jpg',
  email: 'test@example.com',
  phone: '(555) 123-4567',
  location: 'Test City, TC',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/test' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/test' },
  ],
  resumeUrl: '/test-resume.pdf',
};

export const mockExperienceData = [
  {
    id: 'test-exp-1',
    title: 'Test Position',
    company: 'Test Company',
    location: 'Test Location',
    date: '2020 - Present',
    description: 'Test description',
    icon: () => null,
    achievements: ['Test achievement'],
    technologies: ['Test Tech'],
    projects: [
      { name: 'Test Project', description: 'Test project description' },
    ],
  },
];

export const mockSkillsData = [
  { id: 'test-skill-1', name: 'Test Skill', level: 90 },
];
