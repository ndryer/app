import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingActionButton } from '../components/FloatingActionButton';

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
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Command: () => <div data-testid="command-icon">Command Icon</div>,
}));

describe('FloatingActionButton Component', () => {
  // Mock props
  const mockToggleCommandMenu = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock navigator.platform for OS detection
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'MacIntel',
    });
    
    // Reset timers before each test
    jest.useRealTimers();
  });
  
  it('renders correctly', () => {
    const { container } = render(
      <FloatingActionButton toggleCommandMenu={mockToggleCommandMenu} />
    );
    expect(container).toMatchSnapshot();
  });
  
  it('shows tooltip initially', () => {
    render(<FloatingActionButton toggleCommandMenu={mockToggleCommandMenu} />);
    
    // Tooltip should be visible with Mac keyboard shortcut
    expect(screen.getByText(/press/i)).toBeInTheDocument();
    expect(screen.getByText('⌘+K')).toBeInTheDocument();
  });
  
  it('hides tooltip after timeout', () => {
    jest.useFakeTimers();
    
    render(<FloatingActionButton toggleCommandMenu={mockToggleCommandMenu} />);
    
    // Tooltip should be visible initially
    expect(screen.getByText(/press/i)).toBeInTheDocument();
    
    // Fast-forward timers to trigger tooltip hide
    jest.advanceTimersByTime(5000);
    
    // Tooltip should be hidden
    expect(screen.queryByText(/press/i)).not.toBeInTheDocument();
  });
  
  it('shows Windows shortcut when not on Mac', () => {
    // Mock Windows platform
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'Win32',
    });
    
    render(<FloatingActionButton toggleCommandMenu={mockToggleCommandMenu} />);
    
    // Should show Ctrl+K instead of ⌘+K
    expect(screen.getByText('Ctrl+K')).toBeInTheDocument();
  });
  
  it('calls toggleCommandMenu when button is clicked', () => {
    render(<FloatingActionButton toggleCommandMenu={mockToggleCommandMenu} />);
    
    // Find the button and click it
    const button = screen.getByTestId('motion-button');
    fireEvent.click(button);
    
    // Should call the toggle function
    expect(mockToggleCommandMenu).toHaveBeenCalledTimes(1);
  });
  
  it('shows tooltip on mouse enter after it was hidden', () => {
    jest.useFakeTimers();
    
    render(<FloatingActionButton toggleCommandMenu={mockToggleCommandMenu} />);
    
    // Hide tooltip first
    jest.advanceTimersByTime(5000);
    expect(screen.queryByText(/press/i)).not.toBeInTheDocument();
    
    // Trigger mouse enter
    const container = screen.getByTestId('motion-button').closest('div') as HTMLElement;
    fireEvent.mouseEnter(container);
    
    // Tooltip should be visible again
    expect(screen.getByText(/press/i)).toBeInTheDocument();
  });
});
