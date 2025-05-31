import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Skills } from '../components/Skills';
import { Skill } from '../types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid="motion-div" {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <button data-testid="motion-button" {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children, mode }: React.PropsWithChildren<any>) => <div data-testid="animate-presence">{children}</div>,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Skills Component', () => {
  // Create minimal mock data
  const mockSkillsData: Skill[] = [
    { 
      id: 'skill-1', 
      name: "Test Skill 1", 
      level: 95 
    },
    { 
      id: 'skill-2', 
      name: "Test Skill 2", 
      level: 85 
    },
    { 
      id: 'skill-3', 
      name: "Test Skill 3", 
      level: 75 
    },
  ];

  it('renders correctly', () => {
    const { container } = render(<Skills skillsData={mockSkillsData} />);
    expect(container).toMatchSnapshot();
  });

  it('displays all skills initially', () => {
    render(<Skills skillsData={mockSkillsData} />);
    expect(screen.getByText('Test Skill 1')).toBeInTheDocument();
    expect(screen.getByText('Test Skill 2')).toBeInTheDocument();
    expect(screen.getByText('Test Skill 3')).toBeInTheDocument();
  });

  it('filters skills when a category is selected', () => {
    render(<Skills skillsData={mockSkillsData} />);
    
    // Find and click the "AI/ML & Product" category button
    const categoryButtons = screen.getAllByRole('button');
    const aiMlButton = categoryButtons.find(button => button.textContent === 'AI/ML & Product');
    
    if (aiMlButton) {
      fireEvent.click(aiMlButton);
      
      // Check that the category description is displayed
      expect(screen.getByText(/artificial intelligence, machine learning/i)).toBeInTheDocument();
    }
  });

  it('resets to all skills when "All Skills" is clicked', () => {
    render(<Skills skillsData={mockSkillsData} />);
    
    // First click a category filter
    const categoryButtons = screen.getAllByRole('button');
    const aiMlButton = categoryButtons.find(button => button.textContent === 'AI/ML & Product');
    
    if (aiMlButton) {
      fireEvent.click(aiMlButton);
      
      // Then click "All Skills" to reset
      const allSkillsButton = screen.getByText('All Skills');
      fireEvent.click(allSkillsButton);
      
      // All skills should be visible again
      expect(screen.getByText('Test Skill 1')).toBeInTheDocument();
      expect(screen.getByText('Test Skill 2')).toBeInTheDocument();
      expect(screen.getByText('Test Skill 3')).toBeInTheDocument();
    }
  });
});
