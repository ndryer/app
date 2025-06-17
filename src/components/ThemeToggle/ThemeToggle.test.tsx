import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle'; // Adjusted import path

// Mock framer-motion - only need motion.div for the icon transitions
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div {...props}>{children}</div> // Basic div mock for icons
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</> // Pass through children
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Sun: () => <div data-testid='sun-icon'>Sun Icon</div>,
  Moon: () => <div data-testid='moon-icon'>Moon Icon</div>,
}));

// Mock useViewTransitions and useReducedMotion hooks
jest.mock('../../hooks/useViewTransitions', () => ({ // Adjusted path
  useViewTransitions: () => ({
    withViewTransition: (callback: () => void) => callback(), // Directly call callback
  }),
}));

jest.mock('../../hooks/useReducedMotion', () => ({ // Adjusted path
  useReducedMotion: () => false, // Assume motion is not reduced for these tests
}));

describe('ThemeToggle Component', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    mockToggleTheme.mockClear();
    // localStorage is not directly used by ThemeToggle, but by the useTheme hook it would normally consume.
    // For this component test, direct interaction is primary.
  });

  it('should render the correct icon and aria-label based on the darkMode prop', () => {
    const { rerender } = render(
      <ThemeToggle darkMode={false} toggleTheme={mockToggleTheme} />
    );
    // Light mode
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();

    // Dark mode
    rerender(<ThemeToggle darkMode={true} toggleTheme={mockToggleTheme} />);
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });

  it('should call toggleTheme when the button is clicked', () => {
    render(<ThemeToggle darkMode={false} toggleTheme={mockToggleTheme} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
}); 