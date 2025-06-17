import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timeline } from './Timeline'; // Updated import
import { Experience } from '../../types'; // Updated import
import { Briefcase } from 'lucide-react'; // Assuming Briefcase is used in mock data

// Mock the useViewTransitions hook to simulate view transitions being unsupported
jest.mock('../../hooks/useViewTransitions', () => ({ // Corrected import path
  useViewTransitions: () => ({
    isSupported: false, 
    withViewTransition: (callback: () => void) => callback(), // Directly execute callback
  }),
}));

// Mock the useReducedMotion hook
jest.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: jest.fn(() => false), // Assume motion is not reduced for this test
}));

// Mock lucide-react icons as they are not the focus
jest.mock('lucide-react', () => ({
  Briefcase: Object.assign(() => <div data-testid='briefcase-icon'>Briefcase</div>, { 
    $$typeof: Symbol.for('react.forward_ref') 
  }),
  // Add other icons used by Timeline if necessary
}));

// Mock window.matchMedia for Framer Motion internals
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated but framer-motion might still use it
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock data for testing
const mockExperienceData: Experience[] = [
  {
    id: 'exp-1',
    title: 'Test Position',
    company: 'Test Company',
    location: 'Test Location',
    date: '2020-Present',
    description: 'Test description',
    icon: Briefcase, // Use the mocked Briefcase icon
    achievements: ['Achievement 1'],
    technologies: ['Tech 1'],
    projects: [{ name: 'Project 1', description: 'Project 1 description' }],
  },
];

describe.skip('Timeline Fallback Behavior (View Transitions Disabled)', () => {
  it('should maintain core expand/collapse functionality when view transitions are not supported', () => {
    render(<Timeline experienceData={mockExperienceData} />);

    const timelineIcon = screen.getByRole('button', {
      // Use a more general name matcher if the title/company is dynamic in the label
      name: /details for Test Position/i, 
    });

    // Initially collapsed
    expect(timelineIcon).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Test Location')).not.toBeInTheDocument();
    expect(screen.queryByText('Tech 1')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(timelineIcon);
    expect(timelineIcon).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(screen.getByText('Tech 1')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(timelineIcon);
    expect(timelineIcon).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Test Location')).not.toBeInTheDocument();
    expect(screen.queryByText('Tech 1')).not.toBeInTheDocument();
  });
}); 