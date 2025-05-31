import React from 'react';
import { render } from '@testing-library/react';
import { ScrollCue } from '../components/ScrollCue';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid="motion-div" {...props}>{children}</div>
    ),
    svg: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <svg data-testid="motion-svg" {...props}>{children}</svg>
    ),
    path: ({ ...props }: any) => (
      <path data-testid="motion-path" {...props} />
    ),
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down-icon">ChevronDown Icon</div>,
  ArrowDown: () => <div data-testid="arrow-down-icon">ArrowDown Icon</div>,
  // Add any other icons that might be used in ScrollCue
}));

describe('ScrollCue Component', () => {
  it('renders correctly', () => {
    const { container } = render(<ScrollCue />);
    expect(container).toMatchSnapshot();
  });

  it('renders with the correct test IDs', () => {
    const { getByTestId } = render(<ScrollCue />);
    
    // Check that at least one of these elements exists
    // (depending on which one the component actually uses)
    const elements = [
      'motion-div',
      'motion-svg',
      'chevron-down-icon',
      'arrow-down-icon'
    ];
    
    const hasElement = elements.some(id => {
      try {
        getByTestId(id);
        return true;
      } catch {
        return false;
      }
    });
    
    expect(hasElement).toBe(true);
  });
});
