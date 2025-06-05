import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../../App';

/**
 * Integration tests for the main App component
 * These tests verify that components work together correctly
 */

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

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock framer-motion to avoid animation issues in tests
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
    section: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <section data-testid='motion-section' {...props}>
        {children}
      </section>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
}));

// Mock react-scroll-parallax
jest.mock('react-scroll-parallax', () => ({
  ParallaxProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Parallax: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('App Integration Tests', () => {
  test('renders without crashing', () => {
    const { unmount } = render(<App />);
    unmount();
  });

  test('displays user information correctly', () => {
    render(<App />);

    // Check that user data is displayed
    expect(screen.getByText('Nathan Dryer')).toBeInTheDocument();
    expect(
      screen.getByText('AI Product Manager - Agent Orchestrator')
    ).toBeInTheDocument();
  });

  test('renders timeline section', () => {
    render(<App />);

    // Check for timeline content - look for company names instead of section titles
    expect(screen.getByText('Anthropic')).toBeInTheDocument();
    expect(screen.getByText('AI Product Manager')).toBeInTheDocument();
  });

  test('renders skills section', () => {
    render(<App />);

    // Check for skills content - look for specific skills
    expect(screen.getByText(/LLM Orchestration/)).toBeInTheDocument();
  });

  test('has proper document structure', () => {
    render(<App />);

    // Check that the app container exists
    const appContainer = document.querySelector('.App');
    expect(appContainer).toBeInTheDocument();
  });
});
