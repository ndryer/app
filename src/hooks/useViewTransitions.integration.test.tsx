import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { CommandMenu } from '../components/CommandMenu';
import { Skills } from '../components/Skills';
import { Skill } from '../types'; // Import Skill type for mockSkillsData

// Mock the useViewTransitions hook: withViewTransition directly calls the callback.
const mockWithViewTransition = jest.fn((callback: () => void) => callback());
jest.mock('./useViewTransitions', () => ({ // Updated import
  useViewTransitions: () => ({
    isSupported: false, // Mock as unsupported, so actual browser API is not a factor
    withViewTransition: mockWithViewTransition,
  }),
}));

// Minimal mocks for dependencies not under direct test for these integration points
jest.mock('./useReducedMotion', () => ({ // Updated import
  useReducedMotion: () => false,
}));

jest.mock('cmdk', () => {
  const CommandComponent = ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid='cmdk-command' {...props}>{children}</div>
  );
  CommandComponent.List = ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...props}>{children}</div>
  );
  CommandComponent.Item = ({ children, onSelect, ...props }: React.PropsWithChildren<{onSelect?: () => void}>) => (
    <div onClick={onSelect} {...props} data-testid='cmdk-item'>{children}</div>
  );
  CommandComponent.Group = ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...props}>{children}</div>
  );
  return { Command: CommandComponent };
});

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.PropsWithChildren<any>) => <button {...props}>{children}</button>,
    h1: ({ children, ...props }: React.PropsWithChildren<any>) => <h1 {...props}>{children}</h1>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
  LayoutGroup: ({children}: React.PropsWithChildren<any>) => <>{children}</>
}));

jest.mock('lucide-react', () => ({
    ThemeToggle: () => 'ThemeToggleIcon',
    Command: () => 'CommandIcon',
    Mail: () => 'MailIcon',
    Download: () => 'DownloadIcon',
    Eye: () => 'EyeIcon',
    Code: () => 'CodeIcon',
    Linkedin: () => 'LinkedinIcon',
    Github: () => 'GithubIcon',
    X: () => 'XIcon',
    Check: () => 'CheckIcon',
    Sun: () => <div data-testid='sun-icon'>Sun</div>,
    Moon: () => <div data-testid='moon-icon'>Moon</div>,
}));

const mockSkillsData: Skill[] = [
  { id: '1', name: 'React', level: 90 },
  { id: '2', name: 'TypeScript', level: 85 },
  { id: '3', name: 'Leadership Skill', level: 80 },
  { id: '4', name: 'AI Skill', level: 95 },
];

describe.skip('View Transitions Fallback Integration', () => {
  beforeEach(() => {
    mockWithViewTransition.mockClear();
    // Mock localStorage and matchMedia for hooks used by child components
    Object.defineProperty(window, 'localStorage', {
      value: { getItem: jest.fn(), setItem: jest.fn(), clear: jest.fn(), removeItem: jest.fn() }, writable: true });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false, media: query, onchange: null,
        addListener: jest.fn(), removeListener: jest.fn(),
        addEventListener: jest.fn(), removeEventListener: jest.fn(), dispatchEvent: jest.fn(),
      })),
    });
  });

  describe('ThemeToggle Component', () => {
    it('should correctly call toggleTheme action when view transitions are mocked', () => {
      const mockToggleTheme = jest.fn();
      render(<ThemeToggle darkMode={false} toggleTheme={mockToggleTheme} />);
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      expect(mockWithViewTransition).toHaveBeenCalledWith(mockToggleTheme);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1); // Verifies the original action was called
    });
  });

  describe('CommandMenu Component', () => {
    const mockSetIsOpen = jest.fn();
    beforeEach(() => mockSetIsOpen.mockClear());

    it('should correctly call setIsOpen(false) on X button click when view transitions are mocked', () => {
      render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);
      const closeButton = screen.getByRole('button', { name: /close command menu/i });
      fireEvent.click(closeButton);
      expect(mockWithViewTransition).toHaveBeenCalledWith(expect.any(Function)); // withViewTransition wraps the setIsOpen(false) call
      expect(mockSetIsOpen).toHaveBeenCalledWith(false); // Verifies the original action was called
    });

    it('should correctly call setIsOpen(false) on backdrop click when view transitions are mocked', () => {
      render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);
      const backdrop = screen.getByRole('dialog'); // motion.div with role='dialog' is the backdrop
      fireEvent.click(backdrop);
      expect(mockWithViewTransition).toHaveBeenCalledWith(expect.any(Function));
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('Skills Component', () => {
    it('should correctly filter skills on category toggle when view transitions are mocked', () => {
      render(<Skills skillsData={mockSkillsData} />);      
      // Initially, all skills should be potentially visible (or at least queryable by name)
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Leadership Skill')).toBeInTheDocument();
      expect(screen.getByText('AI Skill')).toBeInTheDocument();

      // Find and click the "AI/ML & Product" category button
      // This text comes from the Skills component's internal category definition
      const aiMlButton = screen.getByRole('button', { name: 'AI/ML & Product' });
      fireEvent.click(aiMlButton);

      // Verify withViewTransition was called with a function (the state update)
      expect(mockWithViewTransition).toHaveBeenCalledWith(expect.any(Function));
      
      // After filtering, only AI Skill should be visible from our mock set
      // Other skills should not be in the document (or their specific cards not rendered)
      // This depends on how Skills component filters and renders.
      // Let's assume skills not in the active category are removed from the DOM or their text is not present.
      expect(screen.getByText('AI Skill')).toBeInTheDocument();
      expect(screen.queryByText('React')).not.toBeInTheDocument();
      expect(screen.queryByText('Leadership Skill')).not.toBeInTheDocument();
    });
  });
}); 