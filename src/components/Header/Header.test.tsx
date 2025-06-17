import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header'; // Adjusted import path
import { UserData } from '../../types'; // Adjusted import path

// Mock external dependencies
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <h1 {...props}>{children}</h1>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
}));

// Mock ThemeToggle as its internal workings are tested separately.
// The Header component uses it and we need to ensure it can be rendered.
jest.mock('../ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: ({ darkMode, toggleTheme }: { darkMode: boolean; toggleTheme: () => void }) => (
    <button aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>
      ThemeToggleMock
    </button>
  )
}));

jest.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}));

jest.mock('lucide-react', () => ({
  Command: () => <div data-testid='command-icon'>Command Icon</div>,
  // Sun and Moon are used by ThemeToggle, which is now mocked directly.
}));

describe.skip('Header Component', () => {
  const mockUserData: UserData = {
    fullName: 'Test User Name',
    bioLine: 'Test User Bio Line',
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

  const mockToggleTheme = jest.fn();
  const mockToggleCommandMenu = jest.fn();

  beforeEach(() => {
    mockToggleTheme.mockClear();
    mockToggleCommandMenu.mockClear();
  });

  it('should render user data correctly and handle theme and command menu interactions', () => {
    render(
      <Header
        userData={mockUserData}
        toggleCommandMenu={mockToggleCommandMenu}
        darkMode={false}
        toggleTheme={mockToggleTheme}
      />
    );

    // Check for user data
    expect(screen.getByText('Test User Name')).toBeInTheDocument();
    expect(screen.getByText('Test User Bio Line')).toBeInTheDocument();

    // Check for theme toggle button (mocked) and interaction
    const themeToggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggleButton).toBeInTheDocument();
    expect(themeToggleButton).toHaveTextContent('ThemeToggleMock');
    fireEvent.click(themeToggleButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);

    // Check for command menu button and interaction
    const commandMenuButton = screen.getByLabelText('Open command palette');
    expect(commandMenuButton).toBeInTheDocument();
    fireEvent.click(commandMenuButton);
    expect(mockToggleCommandMenu).toHaveBeenCalledTimes(1);
  });
}); 