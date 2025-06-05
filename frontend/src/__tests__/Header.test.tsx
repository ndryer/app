import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '../components/Header';
import { UserData } from '../types';

// Mock external dependencies
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid='motion-div' {...props}>
        {children}
      </div>
    ),
    h1: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <h1 data-testid='motion-h1' {...props}>
        {children}
      </h1>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <button data-testid='motion-button' {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
}));

jest.mock('react-scroll-parallax', () => ({
  ParallaxBanner: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid='parallax-banner' {...props}>
      {children}
    </div>
  ),
}));

jest.mock('lucide-react', () => ({
  Command: () => <div data-testid='command-icon'>Command Icon</div>,
  Sun: () => <div data-testid='sun-icon'>Sun Icon</div>,
  Moon: () => <div data-testid='moon-icon'>Moon Icon</div>,
}));



describe('Header Component', () => {
  // Mock props
  const mockUserData: UserData = {
    fullName: 'Test User',
    bioLine: 'Test Bio',
    photoUrl: '/test.jpg',
    email: 'test@example.com',
    phone: '(123) 456-7890',
    location: 'Test Location',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com/test' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/test' },
      { name: 'Personal Site', url: 'https://test.com' },
    ],
    resumeUrl: '/test_resume.pdf',
  };

  const mockToggleTheme = jest.fn();
  const mockToggleCommandMenu = jest.fn();

  it('renders correctly', () => {
    const { container } = render(
      <Header
        userData={mockUserData}
        toggleCommandMenu={mockToggleCommandMenu}
        darkMode={false}
        toggleTheme={mockToggleTheme}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with command menu functionality', () => {
    const { container } = render(
      <Header
        userData={mockUserData}
        toggleCommandMenu={mockToggleCommandMenu}
        darkMode={false}
        toggleTheme={mockToggleTheme}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
