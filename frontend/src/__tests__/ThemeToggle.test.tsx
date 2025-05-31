import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeToggle } from '../components/ThemeToggle';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <button data-testid="motion-button" {...props}>{children}</button>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid="motion-div" {...props}>{children}</div>
    ),
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Sun: () => <div data-testid="sun-icon">Sun Icon</div>,
  Moon: () => <div data-testid="moon-icon">Moon Icon</div>,
}));

describe('ThemeToggle Component', () => {
  // Mock props
  const mockToggleTheme = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders correctly in light mode', () => {
    const { container } = render(
      <ThemeToggle 
        darkMode={false}
        toggleTheme={mockToggleTheme}
      />
    );
    expect(container).toMatchSnapshot();
    
    // Should show moon icon in light mode
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });
  
  it('renders correctly in dark mode', () => {
    const { container } = render(
      <ThemeToggle 
        darkMode={true}
        toggleTheme={mockToggleTheme}
      />
    );
    expect(container).toMatchSnapshot();
    
    // Should show sun icon in dark mode
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });
  
  it('calls toggleTheme when clicked', () => {
    render(
      <ThemeToggle 
        darkMode={false}
        toggleTheme={mockToggleTheme}
      />
    );
    
    // Find the button and click it
    const button = screen.getByTestId('motion-button');
    fireEvent.click(button);
    
    // Should call the toggle function
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
  
  it('has the correct accessibility attributes', () => {
    render(
      <ThemeToggle 
        darkMode={false}
        toggleTheme={mockToggleTheme}
      />
    );
    
    const button = screen.getByTestId('motion-button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });
});
