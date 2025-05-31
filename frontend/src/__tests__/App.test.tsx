import React from 'react';
import { render } from '@testing-library/react';
import { App } from '../App';

// Mock the components and data to avoid complex dependencies
jest.mock('../components/Header', () => ({
  Header: () => <div data-testid="mock-header">Header</div>
}));

jest.mock('../components/Timeline', () => ({
  Timeline: () => <div data-testid="mock-timeline">Timeline</div>
}));

jest.mock('../components/Skills', () => ({
  Skills: () => <div data-testid="mock-skills">Skills</div>
}));

jest.mock('../components/Footer', () => ({
  Footer: () => <div data-testid="mock-footer">Footer</div>
}));

jest.mock('../components/FloatingActionButton', () => ({
  FloatingActionButton: () => <div data-testid="mock-fab">FAB</div>
}));

jest.mock('../components/CommandMenu', () => ({
  CommandMenu: () => <div data-testid="mock-command-menu">CommandMenu</div>
}));

// Simple mock for data
jest.mock('../data', () => ({
  userData: {},
  experienceData: [],
  skillsData: []
}));

// Mock ParallaxProvider
jest.mock('react-scroll-parallax', () => ({
  ParallaxProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('App Component', () => {
  // Simple test to verify TypeScript compilation and component import
  it('compiles and imports correctly', () => {
    // This test just verifies that the component can be imported and instantiated
    expect(App).toBeDefined();
  });
  
  // Basic render test - just make sure it doesn't crash
  it('renders without crashing', () => {
    const { unmount } = render(<App />);
    unmount();
  });
});
