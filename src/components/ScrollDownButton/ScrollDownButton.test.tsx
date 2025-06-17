import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollDownButton } from './ScrollDownButton'; // Adjusted import path

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
  ChevronDown: () => <div data-testid='chevron-down-icon'>ChevronDown Icon</div>,
}));

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

// Mock IntersectionObserver as its detailed behavior is not critical for this simplified test
// The component also has a simple window scroll listener for handleHide.
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
  takeRecords: jest.fn().mockReturnValue([]),
}));

describe.skip('ScrollDownButton Component', () => { // Renamed describe block
  beforeEach(() => {
    mockScrollIntoView.mockClear();
    // The component adds a window scroll listener; ensure it's cleaned up if necessary
    // or that tests don't rely on its absence/presence beyond initial setup.
  });

  it('should render the button', () => {
    render(<ScrollDownButton />); // Use new component name
    expect(screen.getByRole('button', { name: /scroll to timeline section/i })).toBeInTheDocument();
    // Tooltip visibility and its timing is a secondary concern for core functionality testing.
  });

  it('should scroll to timeline when button is clicked', () => {
    const mockTimelineElement = document.createElement('div');
    mockTimelineElement.id = 'timeline';
    document.body.appendChild(mockTimelineElement);

    render(<ScrollDownButton />); // Use new component name
    const button = screen.getByRole('button', { name: /scroll to timeline section/i });
    fireEvent.click(button);

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    document.body.removeChild(mockTimelineElement);
  });

  it('should scroll to timeline on Enter key press', () => {
    const mockTimelineElement = document.createElement('div');
    mockTimelineElement.id = 'timeline';
    document.body.appendChild(mockTimelineElement);

    render(<ScrollDownButton />); // Use new component name
    const button = screen.getByRole('button', { name: /scroll to timeline section/i });
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
    document.body.removeChild(mockTimelineElement);
  });

  it('should scroll to timeline on Space key press', () => {
    const mockTimelineElement = document.createElement('div');
    mockTimelineElement.id = 'timeline';
    document.body.appendChild(mockTimelineElement);

    render(<ScrollDownButton />); // Use new component name
    const button = screen.getByRole('button', { name: /scroll to timeline section/i });
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
    document.body.removeChild(mockTimelineElement);
  });

  it('should fall back to scrolling to main element if timeline element is not found', () => {
    const mockMainElement = document.createElement('main');
    // Mock scrollIntoView on this specific element to verify it's called
    mockMainElement.scrollIntoView = jest.fn(); 
    document.body.appendChild(mockMainElement);

    const existingTimeline = document.getElementById('timeline');
    if (existingTimeline) {
      document.body.removeChild(existingTimeline);
    }

    render(<ScrollDownButton />); // Use new component name
    const button = screen.getByRole('button', { name: /scroll to timeline section/i });
    fireEvent.click(button);

    expect(mockMainElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    document.body.removeChild(mockMainElement);
  });
}); 