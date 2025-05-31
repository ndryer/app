import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Timeline } from '../components/Timeline';
import { Experience } from '../types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid="motion-div" {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
}));

// Mock react-vertical-timeline-component
jest.mock('react-vertical-timeline-component', () => ({
  VerticalTimeline: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="vertical-timeline" {...props}>{children}</div>
  ),
  VerticalTimelineElement: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="timeline-element" {...props}>{children}</div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down">Down</div>,
  ChevronUp: () => <div data-testid="chevron-up">Up</div>,
}));

describe('Timeline Component', () => {
  // Create minimal mock data
  const mockExperienceData: Experience[] = [
    {
      id: 'exp-1',
      title: "Test Position",
      company: "Test Company",
      location: "Test Location",
      date: "2020 - Present",
      description: "Test description",
      icon: () => <div>Icon</div>,
      achievements: ["Achievement 1", "Achievement 2"],
      technologies: ["Tech 1", "Tech 2"],
      projects: [
        { name: "Project 1", description: "Project 1 description" }
      ]
    },
    {
      id: 'exp-2',
      title: "Previous Position",
      company: "Previous Company",
      location: "Previous Location",
      date: "2018 - 2020",
      description: "Previous role description",
      icon: () => <div>Icon</div>,
      achievements: ["Achievement A", "Achievement B"],
      technologies: ["Tech A", "Tech B"],
      projects: [
        { name: "Project A", description: "Project A description" }
      ]
    }
  ];

  it('renders correctly with collapsed items', () => {
    const { container } = render(<Timeline experienceData={mockExperienceData} />);
    expect(container).toMatchSnapshot();
  });

  it('expands an item when clicked', () => {
    render(<Timeline experienceData={mockExperienceData} />);
    
    // Find the first timeline card and click it
    const timelineCards = screen.getAllByRole('button');
    fireEvent.click(timelineCards[0]);
    
    // Check that expanded content is now visible
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();
    expect(screen.getByText('Technologies & Skills')).toBeInTheDocument();
    expect(screen.getByText('Notable Projects')).toBeInTheDocument();
    
    // Take a snapshot of the expanded state
    expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument();
  });

  it('collapses an expanded item when clicked again', () => {
    render(<Timeline experienceData={mockExperienceData} />);
    
    // Find the first timeline card and click it twice
    const timelineCards = screen.getAllByRole('button');
    fireEvent.click(timelineCards[0]);
    fireEvent.click(timelineCards[0]);
    
    // Check that item is collapsed
    expect(screen.queryByText('Key Achievements')).not.toBeInTheDocument();
    
    // All items should be collapsed
    const expandedItems = screen.queryAllByRole('button', { expanded: true });
    expect(expandedItems.length).toBe(0);
  });
});
