import React from 'react';
import { render } from '@testing-library/react';
import { ShipLog } from '../components/ShipLog';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid='motion-div' {...props}>
        {children}
      </div>
    ),
    ul: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <ul data-testid='motion-ul' {...props}>
        {children}
      </ul>
    ),
    li: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <li data-testid='motion-li' {...props}>
        {children}
      </li>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
}));

// Mock any lucide-react icons that might be used
jest.mock('lucide-react', () => ({
  FileText: () => <div data-testid='file-text-icon'>FileText Icon</div>,
  X: () => <div data-testid='x-icon'>X Icon</div>,
  // Add other icons that might be used in ShipLog
}));

describe('ShipLog Component', () => {
  const mockUserData = {
    fullName: 'Test User',
    bioLine: 'Test Bio',
    photoUrl: '/test.jpg',
    email: 'test@example.com',
    phone: '(123) 456-7890',
    location: 'Test Location',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com/test' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/test' },
    ],
    resumeUrl: '/test_resume.pdf',
  };

  it('renders correctly', () => {
    const { container } = render(<ShipLog userData={mockUserData} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with the correct structure', () => {
    const { getByTestId } = render(<ShipLog userData={mockUserData} />);

    // Check that the component renders with motion elements
    // This is a basic check that will pass as long as at least one motion element is used
    const motionElements = ['motion-div', 'motion-ul', 'motion-li'];

    const hasMotionElement = motionElements.some(id => {
      try {
        getByTestId(id);
        return true;
      } catch {
        return false;
      }
    });

    expect(hasMotionElement).toBe(true);
  });
});
