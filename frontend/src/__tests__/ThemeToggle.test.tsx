import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeToggle } from '../components/ThemeToggle';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <button data-testid='motion-button' {...props}>
        {children}
      </button>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid='motion-div' {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Sun: () => <div data-testid='sun-icon'>Sun Icon</div>,
  Moon: () => <div data-testid='moon-icon'>Moon Icon</div>,
}));

describe('ThemeToggle Component', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    mockToggleTheme.mockClear();
  });

  it('renders correctly', () => {
    const { container } = render(
      <ThemeToggle darkMode={false} toggleTheme={mockToggleTheme} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders a button with proper accessibility', () => {
    const { getByTestId } = render(
      <ThemeToggle darkMode={false} toggleTheme={mockToggleTheme} />
    );

    const button = getByTestId('motion-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label');
  });

  it('can be clicked without errors', () => {
    const { getByTestId } = render(
      <ThemeToggle darkMode={false} toggleTheme={mockToggleTheme} />
    );

    const button = getByTestId('motion-button');
    fireEvent.click(button);

    // Verify the toggle function was called
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    expect(button).toBeInTheDocument();
  });

  it('renders with motion button wrapper', () => {
    const { getByTestId } = render(
      <ThemeToggle darkMode={true} toggleTheme={mockToggleTheme} />
    );

    expect(getByTestId('motion-button')).toBeInTheDocument();
  });
});
