import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timeline } from '../components/Timeline';
import { Briefcase } from 'lucide-react';

// Mock the useViewTransitions hook
jest.mock('../hooks/useViewTransitions', () => ({
  useViewTransitions: () => ({
    isSupported: false, // Mock as unsupported for testing fallback
    withViewTransition: (callback: () => void) => callback(), // Just execute callback
  }),
}));

// Mock data for testing
const mockExperienceData = [
  {
    id: 'exp-1',
    title: 'Test Position',
    company: 'Test Company',
    location: 'Test Location',
    date: '2020-Present',
    description: 'Test description',
    icon: Briefcase,
    achievements: ['Achievement 1', 'Achievement 2'],
    technologies: ['Tech 1', 'Tech 2'],
    projects: [{ name: 'Project 1', description: 'Project 1 description' }],
  },
];

describe('Timeline with View Transitions', () => {
  it('renders timeline cards with view-transition-name attributes', () => {
    const { container } = render(
      <Timeline experienceData={mockExperienceData} />
    );

    // Check that timeline cards have the data-view-transition-name attribute
    const timelineCard = container.querySelector('.timeline-card');
    expect(timelineCard).toHaveAttribute(
      'data-view-transition-name',
      'timeline-card-1'
    );
  });

  it('expands card content with view transition attributes when clicked', () => {
    const { container } = render(
      <Timeline experienceData={mockExperienceData} />
    );

    // Find and click the timeline icon
    const timelineIcon = screen.getByRole('button', {
      name: /expand details for test position/i,
    });
    fireEvent.click(timelineIcon);

    // Check that expanded content has the view-transition-name attribute
    const expandedContent = container.querySelector(
      '.timeline-expanded-content'
    );
    expect(expandedContent).toHaveAttribute(
      'data-view-transition-name',
      'expanded-content-1'
    );
  });

  it('maintains existing functionality with view transitions disabled', () => {
    render(<Timeline experienceData={mockExperienceData} />);

    // Test that basic expansion/collapse still works
    const timelineIcon = screen.getByRole('button', {
      name: /expand details for test position/i,
    });

    // Initially collapsed
    expect(timelineIcon).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(timelineIcon);
    expect(timelineIcon).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    fireEvent.click(timelineIcon);
    expect(timelineIcon).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies CSS custom properties for view transition names', () => {
    const { container } = render(
      <Timeline experienceData={mockExperienceData} />
    );

    const timelineCard = container.querySelector(
      '.timeline-card'
    ) as HTMLElement;
    expect(timelineCard?.style.getPropertyValue('--view-transition-name')).toBe(
      'timeline-card-1'
    );
  });
});
