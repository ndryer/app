import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FloatingCommandButton } from './FloatingCommandButton'; // Adjusted import path

// Mock framer-motion for simplicity
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Command: () => <div data-testid='command-icon'>Command Icon</div>,
}));

// Mock useReducedMotion hook
jest.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => false, // Assume motion is not reduced for these tests
}));


describe('FloatingCommandButton Component', () => {
  const mockToggleCommandMenu = jest.fn();

  beforeEach(() => {
    mockToggleCommandMenu.mockClear();

    // Mock navigator.platform for isMac detection
    Object.defineProperty(navigator, 'platform', {
      value: 'MacIntel',
      writable: true,
    });
  });

  it('should initially not render the button due to visibility logic', () => {
    render(<FloatingCommandButton toggleCommandMenu={mockToggleCommandMenu} />);
    // The button becomes visible after a delay controlled by useEffect and isVisible state.
    // This test verifies the initial state before timers advance.
    expect(screen.queryByRole('button', { name: /open command menu/i })).toBeNull();
  });

  it('should call toggleCommandMenu when button is clicked after becoming visible', async () => {
    // Use fake timers to control useEffect delays
    jest.useFakeTimers();

    render(<FloatingCommandButton toggleCommandMenu={mockToggleCommandMenu} />);

    // Advance timers to make the button visible
    act(() => {
      // 750ms for initial delay (setIsVisible(true), setAnimationPhase('visible'))
      // + 1000ms for animationPhase change to 'pulse'
      jest.advanceTimersByTime(1800); 
    });
    
    const button = screen.getByRole('button', { name: /open command menu/i });
    expect(button).toBeInTheDocument(); // Button should now be visible
    fireEvent.click(button);
    expect(mockToggleCommandMenu).toHaveBeenCalledTimes(1);

    jest.useRealTimers(); // Clean up fake timers
  });

  // Add more tests for tooltip, keyboard interaction, etc. as needed
}); 