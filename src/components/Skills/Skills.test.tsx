import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import { Skill } from '../../types'; // Adjusted import path
import { Skills } from './Skills'; // Adjusted import path

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid='motion-div' {...props}>
        {children}
      </div>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <button data-testid='motion-button' {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <div data-testid='animate-presence'>{children}</div>
  ),
}));

describe('Skills Component', () => {
  const mockSkillsData: Skill[] = [
    {
      id: 'skill-1',
      name: 'Test Skill 1',
      level: 95,
    },
    {
      id: 'skill-2',
      name: 'Test Skill 2',
      level: 85,
    },
    {
      id: 'skill-3',
      name: 'Test Skill 3',
      level: 75,
    },
  ];

  it('should display all skills initially', () => {
    render(<Skills skillsData={mockSkillsData} />);
    expect(screen.getByText('Test Skill 1')).toBeInTheDocument();
    expect(screen.getByText('Test Skill 2')).toBeInTheDocument();
    expect(screen.getByText('Test Skill 3')).toBeInTheDocument();
  });

  it('should filter skills when a category is selected and show the category description', () => {
    render(<Skills skillsData={mockSkillsData} />);

    const categoryButtons = screen.getAllByRole('button');
    const aiMlButton = categoryButtons.find(
      button => button.textContent === 'AI/ML & Product'
    );

    if (aiMlButton) {
      fireEvent.click(aiMlButton);
      expect(
        screen.getByText(/Artificial intelligence, machine learning, and product development expertise/i)
      ).toBeInTheDocument();
    } else {
      throw new Error('AI/ML & Product category button not found');
    }
  });

  it('should reset to display all skills when "All Skills" is clicked after a filter', () => {
    render(<Skills skillsData={mockSkillsData} />);

    const categoryButtons = screen.getAllByRole('button');
    const aiMlButton = categoryButtons.find(
      button => button.textContent === 'AI/ML & Product'
    );
    const allSkillsButton = categoryButtons.find(
      button => button.textContent === 'All Skills'
    );

    if (aiMlButton && allSkillsButton) {
      fireEvent.click(aiMlButton);
      fireEvent.click(allSkillsButton);

      expect(screen.getByText('Test Skill 1')).toBeInTheDocument();
      expect(screen.getByText('Test Skill 2')).toBeInTheDocument();
      expect(screen.getByText('Test Skill 3')).toBeInTheDocument();
    } else {
      throw new Error('Required category buttons not found for reset test');
    }
  });
}); 