import React from 'react';
import { render, screen } from '@testing-library/react';
import { ShipLog } from './ShipLog'; // Updated import path

// Mock framer-motion as it's not essential for this basic test
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div {...props}>{children}</div>
    ),
  },
  useInView: jest.fn(() => true),
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

  it('should render and display the coming soon message', () => {
    render(<ShipLog userData={mockUserData} />);
    expect(screen.getByText(/Coming Soon/i)).toBeInTheDocument();
    expect(screen.getByText(/professional journey timeline is currently being updated/i)).toBeInTheDocument();
  });
}); 