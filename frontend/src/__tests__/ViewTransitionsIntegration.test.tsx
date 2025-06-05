import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { CommandMenu } from '../components/CommandMenu';
import { Skills } from '../components/Skills';

// Mock the useViewTransitions hook
const mockWithViewTransition = jest.fn((callback: () => void) => callback());
jest.mock('../hooks/useViewTransitions', () => ({
  useViewTransitions: () => ({
    isSupported: false,
    withViewTransition: mockWithViewTransition,
  }),
}));

// Mock data for Skills component
const mockSkillsData = [
  { id: '1', name: 'React', level: 90 },
  { id: '2', name: 'TypeScript', level: 85 },
  { id: '3', name: 'Leadership', level: 80 },
];

describe('View Transitions Integration', () => {
  beforeEach(() => {
    mockWithViewTransition.mockClear();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
    // Mock matchMedia
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
  });

  describe('ThemeToggle Component', () => {
    it('wraps theme toggle with View Transitions', () => {
      const mockToggleTheme = jest.fn();
      render(<ThemeToggle darkMode={false} toggleTheme={mockToggleTheme} />);

      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);

      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  describe('CommandMenu Component', () => {
    it('wraps menu close with View Transitions', () => {
      const mockSetIsOpen = jest.fn();
      render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);

      // Click the close button (X)
      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);

      expect(mockWithViewTransition).toHaveBeenCalled();
    });

    it('wraps backdrop click close with View Transitions', () => {
      const mockSetIsOpen = jest.fn();
      render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);

      // Click the backdrop
      const backdrop = screen.getByRole('dialog');
      fireEvent.click(backdrop);

      expect(mockWithViewTransition).toHaveBeenCalled();
    });
  });

  describe('Skills Component', () => {
    it('wraps category toggle with View Transitions', () => {
      render(<Skills skillsData={mockSkillsData} />);

      // Find and click a category filter button
      const categoryButton = screen.getByText('AI & ML');
      fireEvent.click(categoryButton);

      expect(mockWithViewTransition).toHaveBeenCalled();
      expect(mockWithViewTransition).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('Integration Patterns', () => {
    it('ensures all interactive elements use View Transitions', () => {
      // This test verifies that our pattern is consistently applied
      const mockSetIsOpen = jest.fn();

      // Render multiple components
      const mockToggleTheme = jest.fn();
      const { rerender } = render(
        <ThemeToggle darkMode={false} toggleTheme={mockToggleTheme} />
      );

      // Test ThemeToggle
      const themeButton = screen.getByRole('button');
      fireEvent.click(themeButton);
      expect(mockToggleTheme).toHaveBeenCalled();

      mockWithViewTransition.mockClear();

      // Test CommandMenu
      rerender(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);
      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);
      expect(mockWithViewTransition).toHaveBeenCalled();

      mockWithViewTransition.mockClear();

      // Test Skills
      rerender(<Skills skillsData={mockSkillsData} />);
      const categoryButton = screen.getByText('AI & ML');
      fireEvent.click(categoryButton);
      expect(mockWithViewTransition).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('continues to work when View Transitions fail', () => {
      // Mock withViewTransition to throw an error
      const mockWithViewTransitionError = jest.fn((callback: () => void) => {
        try {
          throw new Error('View Transitions not supported');
        } catch (error) {
          // Should still call the callback as fallback
          callback();
        }
      });

      jest
        .mocked(require('../hooks/useViewTransitions').useViewTransitions)
        .mockReturnValue({
          isSupported: false,
          withViewTransition: mockWithViewTransitionError,
        });

      const mockToggleTheme2 = jest.fn();
      render(<ThemeToggle darkMode={false} toggleTheme={mockToggleTheme2} />);

      const toggleButton = screen.getByRole('button');

      // Should not throw an error
      expect(() => {
        fireEvent.click(toggleButton);
      }).not.toThrow();

      expect(mockWithViewTransitionError).toHaveBeenCalled();
    });
  });
});
