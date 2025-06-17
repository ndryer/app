import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CommandMenu } from './CommandMenu'; // Adjusted import path

// Minimal Mock for cmdk
jest.mock('cmdk', () => {
  const CommandComponent = ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid='cmdk-command' {...props}>{children}</div>
  );
  CommandComponent.List = ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid='cmdk-list' {...props}>{children}</div>
  );
  CommandComponent.Item = ({ children, onSelect, ...props }: React.PropsWithChildren<{ onSelect?: () => void }>) => (
    <div data-testid='cmdk-item' onClick={onSelect} {...props}>{children}</div>
  );
  CommandComponent.Group = ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid='cmdk-group' {...props}>{children}</div> // Mock Group
  );
  return {
    Command: CommandComponent,
  };
});

// Minimal Mock for framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid={props.role === 'dialog' ? 'cmdk-backdrop' : 'motion-div'} {...props}>
        {children}
      </div>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<any>) => (
        <button {...props}>{children}</button>
    )
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
  LayoutGroup: ({children}: React.PropsWithChildren<any>) => <>{children}</>
}));

// Mock react-copy-to-clipboard
jest.mock('react-copy-to-clipboard', () => ({
  CopyToClipboard: ({ children, onCopy }: React.PropsWithChildren<{ text: string; onCopy: () => void }>) => (
    <div onClick={onCopy}>{children}</div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Mail: () => 'MailIcon',
  Download: () => 'DownloadIcon',
  Eye: () => 'EyeIcon',
  Code: () => 'CodeIcon',
  Linkedin: () => 'LinkedinIcon',
  Github: () => 'GithubIcon',
  X: () => 'XIcon',
  Check: () => 'CheckIcon',
}));

// Mock useReducedMotion hook as its actual behavior is not critical for these tests
jest.mock('../../hooks/useReducedMotion', () => ({ // Adjusted import path
  useReducedMotion: () => false,
}));

describe('CommandMenu Component', () => {
  const mockSetIsOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should not render when isOpen is false', () => {
    render(<CommandMenu isOpen={false} setIsOpen={mockSetIsOpen} />);
    expect(screen.queryByTestId('cmdk-command')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);
    expect(screen.getByTestId('cmdk-command')).toBeInTheDocument();
  });

  it('should close when clicking the backdrop', () => {
    render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);
    const backdrop = screen.getByTestId('cmdk-backdrop');
    fireEvent.click(backdrop);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('should close when the close button (X) is clicked', () => {
    render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);
    const closeButton = screen.getByRole('button', {name: /close command menu/i});
    fireEvent.click(closeButton);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('should call setIsOpen(false) after a command item is selected and its action (with timeout) completes', async () => {
    jest.useFakeTimers();
    render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);    
    const commandItems = screen.getAllByTestId('cmdk-item');
    expect(commandItems.length).toBeGreaterThan(0);
    fireEvent.click(commandItems[0]);
    expect(mockSetIsOpen).not.toHaveBeenCalled(); 
    act(() => {
        jest.advanceTimersByTime(1600); 
    });
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);    
    jest.useRealTimers();
  });
}); 