import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Timeline } from '../components/Timeline';
import { Experience } from '../types';
import { Brain, Briefcase } from 'lucide-react';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      animate,
      transition,
      initial,
      layout,
      ...props
    }: React.PropsWithChildren<any>) => (
      <div
        data-testid='motion-div'
        animate={animate ? JSON.stringify(animate) : undefined}
        transition={transition ? JSON.stringify(transition) : undefined}
        initial={initial ? JSON.stringify(initial) : undefined}
        layout={layout ? JSON.stringify(layout) : undefined}
        {...props}
      >
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
}));

// No longer need to mock react-vertical-timeline-component since we're using custom implementation

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid='chevron-down'>Down</div>,
  ChevronRight: () => <div data-testid='chevron-right'>Right</div>,
  // Create a mock icon component that matches LucideIcon interface
  Brain: Object.assign(() => <div data-testid='brain-icon'>Brain</div>, {
    $$typeof: Symbol.for('react.forward_ref'),
  }),
  Briefcase: Object.assign(
    () => <div data-testid='briefcase-icon'>Briefcase</div>,
    { $$typeof: Symbol.for('react.forward_ref') }
  ),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Timeline Component', () => {
  // Create minimal mock data
  const mockExperienceData: Experience[] = [
    {
      id: 'exp-1',
      title: 'Test Position',
      company: 'Test Company',
      location: 'Test Location',
      date: '2020 - Present',
      description: 'Test description',
      icon: Brain,
      achievements: ['Achievement 1', 'Achievement 2'],
      technologies: ['Tech 1', 'Tech 2'],
      projects: [{ name: 'Project 1', description: 'Project 1 description' }],
    },
    {
      id: 'exp-2',
      title: 'Previous Position',
      company: 'Previous Company',
      location: 'Previous Location',
      date: '2018 - 2020',
      description: 'Previous role description',
      icon: Briefcase,
      achievements: ['Achievement A', 'Achievement B'],
      technologies: ['Tech A', 'Tech B'],
      projects: [{ name: 'Project A', description: 'Project A description' }],
    },
  ];

  it('renders correctly with collapsed items', () => {
    const { container } = render(
      <Timeline experienceData={mockExperienceData} />
    );
    expect(container).toMatchSnapshot();
  });

  it('expands an item when timeline icon is clicked', () => {
    render(<Timeline experienceData={mockExperienceData} />);

    // Find the first timeline icon and click it
    const timelineIcons = screen.getAllByRole('button');
    fireEvent.click(timelineIcons[0]);

    // Check that detailed information is now visible in expanded state
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    // Year and location are now separated in expanded state
    expect(screen.getByText('2020-Present')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();

    // Check that technologies are displayed
    expect(screen.getByText('Tech 1')).toBeInTheDocument();
    expect(screen.getByText('Tech 2')).toBeInTheDocument();

    // Check that the icon has expanded state
    expect(timelineIcons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses an expanded item when timeline icon is clicked again', () => {
    render(<Timeline experienceData={mockExperienceData} />);

    // Find the first timeline icon and click it twice
    const timelineIcons = screen.getAllByRole('button');
    fireEvent.click(timelineIcons[0]);
    fireEvent.click(timelineIcons[0]);

    // Check that expanded-only content is no longer visible (location should not be visible when collapsed)
    expect(screen.queryByText('Test Location')).not.toBeInTheDocument();
    // But company name should still be visible in collapsed state
    expect(screen.getByText('Test Company')).toBeInTheDocument();

    // Check that the icon has collapsed state
    expect(timelineIcons[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('displays proper visual hierarchy in collapsed state', () => {
    render(<Timeline experienceData={mockExperienceData} />);

    // Check that job titles are always visible (Primary Typography)
    expect(screen.getByText('Test Position')).toBeInTheDocument();
    expect(screen.getByText('Previous Position')).toBeInTheDocument();

    // Check that company names are now always visible (Secondary Typography)
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Previous Company')).toBeInTheDocument();

    // Check that year ranges are extracted and displayed (Tertiary Typography)
    expect(screen.getByText('2020-Present')).toBeInTheDocument();
    expect(screen.getByText('2018-2020')).toBeInTheDocument();

    // Check that expanded-only content is NOT visible in collapsed state
    expect(screen.queryByText('Test Location')).not.toBeInTheDocument();
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });

  it('only allows one expanded item at a time', () => {
    render(<Timeline experienceData={mockExperienceData} />);

    // Get timeline icon buttons specifically (they have the timeline-icon class)
    const timelineIcons = screen
      .getAllByRole('button')
      .filter(button => button.classList.contains('timeline-icon'));

    // Expand first item
    fireEvent.click(timelineIcons[0]);
    expect(timelineIcons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(timelineIcons[1]).toHaveAttribute('aria-expanded', 'false');

    // Expand second item - should collapse first
    fireEvent.click(timelineIcons[1]);
    expect(timelineIcons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(timelineIcons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('displays alternating left-right layout correctly', () => {
    const { container } = render(
      <Timeline experienceData={mockExperienceData} />
    );

    // Check that first item (index 0, even position) has timeline-left class
    const firstTimelineItem = container.querySelector('.timeline-left');
    expect(firstTimelineItem).toBeInTheDocument();

    // Check that second item (index 1, odd position) has timeline-right class
    const secondTimelineItem = container.querySelector('.timeline-right');
    expect(secondTimelineItem).toBeInTheDocument();

    // Check that timeline grid items have proper CSS Grid classes
    const timelineGridItems = container.querySelectorAll(
      'div[class*="timeline-grid-item"]'
    );
    expect(timelineGridItems.length).toBe(2); // Should have 2 timeline items

    // Check that year labels are positioned above cards
    const yearLabelsAbove = container.querySelectorAll(
      '.timeline-year-label-above'
    );
    expect(yearLabelsAbove.length).toBe(2); // Should have 2 year labels above cards

    // Check that year labels are positioned independently (three-element architecture)
    const yearLabels = container.querySelectorAll(
      'div[class*="timeline-year-label"]'
    );
    expect(yearLabels.length).toBe(2); // Should have 2 year labels

    // Verify that all cards have consistent text-left alignment (no more text-right)
    const allCardContents = container.querySelectorAll('div.timeline-card');
    allCardContents.forEach(card => {
      expect(card).toHaveClass('text-left');
      expect(card).not.toHaveClass('text-right');
    });
  });

  it('displays clean cards without chevron icons', () => {
    render(<Timeline experienceData={mockExperienceData} />);

    // Check that chevron icons are NOT present (removed for cleaner design)
    const chevronIcons = screen.queryAllByTestId('chevron-right');
    expect(chevronIcons.length).toBe(0); // No chevron icons should be present

    // Check that old text-based hints are removed
    expect(
      screen.queryByText('Click the timeline icon to collapse')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Click on any timeline node or card to expand details')
    ).not.toBeInTheDocument();
  });

  it('has proper hover effects and accessibility for modern indicators', () => {
    const { container } = render(
      <Timeline experienceData={mockExperienceData} />
    );

    // Check that cards have cursor-pointer class for hover indication
    const timelineCards = container.querySelectorAll(
      'div[class*="cursor-pointer"]'
    );
    expect(timelineCards.length).toBeGreaterThan(0);

    // Check that timeline icons have proper ARIA labels with expand/collapse state
    const timelineIcons = screen.getAllByRole('button');
    expect(timelineIcons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(timelineIcons[0]).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Expand details')
    );
  });
});
