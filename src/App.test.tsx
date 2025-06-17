import React from 'react';
import { render } from '@testing-library/react';
import App from './App'; // Updated import

// Mock the components and data to avoid complex dependencies
jest.mock('./components/Header', () => ({ // Updated import
  Header: () => <div data-testid='mock-header'>Header</div>,
}));

jest.mock('./components/Timeline', () => ({ // Updated import
  Timeline: () => <div data-testid='mock-timeline'>Timeline</div>,
}));

jest.mock('./components/Skills', () => ({ // Updated import
  Skills: () => <div data-testid='mock-skills'>Skills</div>,
}));

jest.mock('./components/Footer', () => ({ // Updated import
  Footer: () => <div data-testid='mock-footer'>Footer</div>,
}));

jest.mock('./components/FloatingActionButton', () => ({ // Updated import
  FloatingActionButton: () => <div data-testid='mock-fab'>FAB</div>,
}));

jest.mock('./components/CommandMenu', () => ({ // Updated import
  CommandMenu: () => <div data-testid='mock-command-menu'>CommandMenu</div>,
}));

// Simple mock for data
jest.mock('./__mocks__/data.mock', () => ({ // Updated import
  userData: {},
  experienceData: [],
  skillsData: [],
}));

// Mock ParallaxProvider
jest.mock('react-scroll-parallax', () => ({
  ParallaxProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

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

describe.skip('App Component', () => {
  // Simple test to verify TypeScript compilation and component import
  it('should compile and import correctly', () => {
    // This test just verifies that the component can be imported and instantiated
    expect(App).toBeDefined();
  });

  // Basic render test - just make sure it doesn't crash
  it('should render without crashing', () => {
    const { unmount } = render(<App />);
    unmount();
  });
}); 