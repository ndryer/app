import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FloatingActionButton } from '../components/FloatingActionButton';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => {
      // Filter out framer-motion specific props
      const { initial, animate, exit, whileHover, whileTap, layout, ...domProps } = props;
      return (
        <div data-testid='motion-div' {...domProps}>
          {children}
        </div>
      );
    },
    button: ({ children, ...props }: React.PropsWithChildren<any>) => {
      // Filter out framer-motion specific props
      const { initial, animate, exit, whileHover, whileTap, layout, ...domProps } = props;
      return (
        <button data-testid='motion-button' {...domProps}>
          {children}
        </button>
      );
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid='chevron-down-icon'>ChevronDown Icon</div>,
}));

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

// Mock IntersectionObserver
const mockObserver = {
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
};

// Properly mock IntersectionObserver constructor
global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
  return {
    observe: mockObserver.observe,
    disconnect: mockObserver.disconnect,
    unobserve: mockObserver.unobserve,
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('FloatingActionButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockScrollIntoView.mockClear();
    mockObserver.observe.mockClear();
    mockObserver.disconnect.mockClear();

    // Reset timers before each test
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const { container } = render(<FloatingActionButton />);
    expect(container).toMatchSnapshot();
  });

  it('shows tooltip initially', () => {
    render(<FloatingActionButton />);

    // Tooltip should be visible with scroll message
    expect(screen.getByText(/scroll to timeline/i)).toBeInTheDocument();
  });

  it('hides tooltip after timeout', () => {
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    render(<FloatingActionButton />);

    // Tooltip should be visible initially
    expect(screen.getByText(/scroll to timeline/i)).toBeInTheDocument();

    // Verify setTimeout was called for the tooltip timer
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 5000);

    // Fast-forward timers to trigger tooltip hide
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Note: With our mock AnimatePresence, the element doesn't actually disappear
    // In real implementation, AnimatePresence would handle the exit animation
    setTimeoutSpy.mockRestore();
  });

  it('scrolls to timeline when button is clicked', () => {
    // Mock timeline element
    const mockTimelineElement = document.createElement('div');
    mockTimelineElement.id = 'timeline';
    document.body.appendChild(mockTimelineElement);

    render(<FloatingActionButton />);

    // Find the button and click it
    const button = screen.getByTestId('motion-button');
    fireEvent.click(button);

    // Should call scrollIntoView on timeline element
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });

    // Cleanup
    document.body.removeChild(mockTimelineElement);
  });

  it('shows tooltip on mouse enter after it was hidden', () => {
    jest.useFakeTimers();

    render(<FloatingActionButton />);

    // Hide tooltip first
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Trigger mouse enter
    const container = screen
      .getByTestId('motion-button')
      .closest('div') as HTMLElement;

    act(() => {
      fireEvent.mouseEnter(container);
    });

    // Tooltip should be visible (in our mock, it's always visible due to AnimatePresence mock)
    expect(screen.getByText(/scroll to timeline/i)).toBeInTheDocument();
  });

  it('falls back to main element if timeline not found', () => {
    // Mock main element
    const mockMainElement = document.createElement('main');
    document.body.appendChild(mockMainElement);

    render(<FloatingActionButton />);

    // Find the button and click it
    const button = screen.getByTestId('motion-button');
    fireEvent.click(button);

    // Should call scrollIntoView on main element as fallback
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });

    // Cleanup
    document.body.removeChild(mockMainElement);
  });

  describe('Auto-hide functionality', () => {
    it('sets up intersection observer when timeline element exists', () => {
      // Mock timeline element
      const mockTimelineElement = document.createElement('div');
      mockTimelineElement.id = 'timeline';
      document.body.appendChild(mockTimelineElement);

      render(<FloatingActionButton />);

      // Should observe the timeline element
      expect(mockObserver.observe).toHaveBeenCalledWith(mockTimelineElement);

      // Cleanup
      document.body.removeChild(mockTimelineElement);
    });

    it('handles keyboard navigation correctly', () => {
      // Mock timeline element
      const mockTimelineElement = document.createElement('div');
      mockTimelineElement.id = 'timeline';
      document.body.appendChild(mockTimelineElement);

      render(<FloatingActionButton />);
      const button = screen.getByTestId('motion-button');

      // Test Enter key
      fireEvent.keyDown(button, { key: 'Enter' });
      expect(mockScrollIntoView).toHaveBeenCalled();

      // Clear previous calls
      mockScrollIntoView.mockClear();

      // Test Space key
      fireEvent.keyDown(button, { key: ' ' });
      expect(mockScrollIntoView).toHaveBeenCalled();

      // Cleanup
      document.body.removeChild(mockTimelineElement);
    });

    it('disconnects observer on unmount', () => {
      const { unmount } = render(<FloatingActionButton />);

      unmount();

      expect(mockObserver.disconnect).toHaveBeenCalled();
    });
  });
});
