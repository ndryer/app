import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Timeline } from './Timeline'; // Adjusted import path
import { Experience } from '../../types'; // Adjusted import path
import { Brain, Briefcase } from 'lucide-react';

// Minimal Mock for framer-motion, focusing on structure not animation details
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, layout, ...props }: React.PropsWithChildren<{ layout?: unknown }>) => (
      <div {...props} data-layout={layout ? 'true' : 'false'}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
  useInView: jest.fn(() => true),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Brain: Object.assign(() => <div data-testid='brain-icon'>Brain</div>, {
    $$typeof: Symbol.for('react.forward_ref'),
  }),
  Briefcase: Object.assign(
    () => <div data-testid='briefcase-icon'>Briefcase</div>,
    { $$typeof: Symbol.for('react.forward_ref') }
  ),
}));

// Mock window.matchMedia for useReducedMotion hook
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe.skip('Timeline Component', () => {
  const mockExperienceData: Experience[] = [
    {
      id: 'exp-1',
      title: 'AI Product Manager',
      company: 'Anthropic',
      location: 'San Francisco, CA',
      date: '2022 - Present',
      description: 'Leading product development for agent orchestration systems.',
      icon: Brain,
      achievements: ['Led agent orchestration framework.'],
      technologies: ['LLM Orchestration', 'Python'],
      projects: [{ name: 'Eko Framework', description: 'Computer use agents.' }],
    },
    {
      id: 'exp-2',
      title: 'Senior Product Manager',
      company: 'ForeSee',
      location: 'Ann Arbor, MI',
      date: 'April 2017 - 2022',
      description: 'Led product strategy for feedback solutions.',
      icon: Briefcase,
      achievements: ['Built user management tools.'],
      technologies: ['Product Analytics', 'SQL'],
      projects: [{ name: 'Enterprise Suite 2.0', description: 'Platform redesign.' }],
    },
  ];

  const getTimelineIcons = async () => screen.findAllByRole('button', { name: /expand details for|collapse details for/i });

  it('should render essential information for collapsed items', () => {
    render(<Timeline experienceData={mockExperienceData} />);
    expect(screen.getByText('Anthropic')).toBeInTheDocument();
    expect(screen.getByText('AI Product Manager')).toBeInTheDocument();
    expect(screen.getByText('2022-Present')).toBeInTheDocument();
    expect(screen.queryByText('San Francisco, CA')).not.toBeInTheDocument();
    expect(screen.queryByText('Tech 1')).not.toBeInTheDocument(); 

    expect(screen.getByText('ForeSee')).toBeInTheDocument();
    expect(screen.getByText('Senior Product Manager')).toBeInTheDocument();
    expect(screen.getByText('2017-2022')).toBeInTheDocument();
  });

  it('should expand an item and show details when its icon is clicked', async () => {
    render(<Timeline experienceData={mockExperienceData} />);
    const firstItemIcon = (await getTimelineIcons())[0];

    fireEvent.click(firstItemIcon);

    expect(firstItemIcon).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('LLM Orchestration')).toBeInTheDocument();
    expect(screen.getByText('Led agent orchestration framework.')).toBeInTheDocument();
    expect(screen.getByText('Eko Framework')).toBeInTheDocument();
  });

  it('should collapse an already expanded item when its icon is clicked again', async () => {
    render(<Timeline experienceData={mockExperienceData} />);
    const firstItemIcon = (await getTimelineIcons())[0];

    fireEvent.click(firstItemIcon); // Expand
    expect(firstItemIcon).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();

    fireEvent.click(firstItemIcon); // Collapse
    expect(firstItemIcon).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('San Francisco, CA')).not.toBeInTheDocument();
  });

  it('should only allow one item to be expanded at a time', async () => {
    render(<Timeline experienceData={mockExperienceData} />);
    const icons = await getTimelineIcons();
    const firstItemIcon = icons[0];
    const secondItemIcon = icons[1];

    fireEvent.click(firstItemIcon); // Expand first
    expect(firstItemIcon).toHaveAttribute('aria-expanded', 'true');
    expect(secondItemIcon).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.queryByText('Ann Arbor, MI')).not.toBeInTheDocument();

    fireEvent.click(secondItemIcon); // Expand second
    expect(firstItemIcon).toHaveAttribute('aria-expanded', 'false');
    expect(secondItemIcon).toHaveAttribute('aria-expanded', 'true');
    expect(screen.queryByText('San Francisco, CA')).not.toBeInTheDocument();
    expect(screen.getByText('Ann Arbor, MI')).toBeInTheDocument();
  });

  it('should have cursor-pointer style on cards and correct ARIA labels on icons', async () => {
    render(<Timeline experienceData={mockExperienceData} />);
    const cards = screen.getAllByRole('button').filter(button => button.classList.contains('timeline-card-focus'));
    expect(cards.length).toBeGreaterThan(0);
    cards.forEach(card => {
      expect(card).toHaveClass('cursor-pointer');
    });

    const firstIcon = (await getTimelineIcons())[0];
    expect(firstIcon).toHaveAttribute('aria-label', 'Expand details for AI Product Manager at Anthropic');
    fireEvent.click(firstIcon);
    expect(firstIcon).toHaveAttribute('aria-label', 'Collapse details for AI Product Manager at Anthropic');
  });

   it('should handle keyboard navigation for expansion and collapse', async () => {
    render(<Timeline experienceData={mockExperienceData} />);
    const firstItemIcon = (await getTimelineIcons())[0];

    fireEvent.keyDown(firstItemIcon, { key: 'Enter', code: 'Enter' });
    expect(firstItemIcon).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(firstItemIcon, { key: ' ', code: 'Space' });
    expect(firstItemIcon).toHaveAttribute('aria-expanded', 'false');
  });

}); 