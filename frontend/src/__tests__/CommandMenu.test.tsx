import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommandMenu } from '../components/CommandMenu';

// Mock cmdk
jest.mock('cmdk', () => {
  // Create main Command component
  const CommandComponent = ({
    children,
    className,
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid='cmdk-command' className={className}>
      {children}
    </div>
  );

  // Add subcomponents as properties
  CommandComponent.Input = ({
    value,
    onValueChange,
    className,
    placeholder,
  }: any) => (
    <input
      data-testid='cmdk-input'
      value={value}
      onChange={e => onValueChange(e.target.value)}
      className={className}
      placeholder={placeholder}
    />
  );

  CommandComponent.List = ({
    children,
    className,
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid='cmdk-list' className={className}>
      {children}
    </div>
  );

  CommandComponent.Empty = ({
    children,
    className,
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid='cmdk-empty' className={className}>
      {children}
    </div>
  );

  CommandComponent.Item = ({
    children,
    value,
    onSelect,
    className,
  }: React.PropsWithChildren<{
    value: string;
    onSelect: () => void;
    className?: string;
  }>) => (
    <div
      data-testid='cmdk-item'
      data-value={value}
      onClick={onSelect}
      className={className}
    >
      {children}
    </div>
  );

  return {
    Command: CommandComponent,
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid='motion-div' {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
    <>{children}</>
  ),
}));

// Mock react-copy-to-clipboard
jest.mock('react-copy-to-clipboard', () => ({
  CopyToClipboard: ({
    text,
    onCopy,
    children,
  }: React.PropsWithChildren<{ text: string; onCopy: () => void }>) => (
    <div data-testid='copy-to-clipboard' data-text={text} onClick={onCopy}>
      {children}
    </div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid='search-icon'>Search</div>,
  Mail: () => <div data-testid='mail-icon'>Mail</div>,
  Clock: () => <div data-testid='clock-icon'>Clock</div>,
  Linkedin: () => <div data-testid='linkedin-icon'>LinkedIn</div>,
  Github: () => <div data-testid='github-icon'>GitHub</div>,
  X: () => <div data-testid='x-icon'>X</div>,
  Check: () => <div data-testid='check-icon'>Check</div>,
}));

describe('CommandMenu Component', () => {
  // Mock props
  const mockSetIsOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when closed', () => {
    const { container } = render(
      <CommandMenu isOpen={false} setIsOpen={mockSetIsOpen} />
    );
    expect(container).toMatchSnapshot();
    // Should not render anything when closed
    expect(screen.queryByTestId('cmdk-command')).not.toBeInTheDocument();
  });

  it('renders correctly when open', () => {
    const { container } = render(
      <CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />
    );
    expect(container).toMatchSnapshot();
    // Should render the command palette when open
    expect(screen.getByTestId('cmdk-command')).toBeInTheDocument();
  });

  it('closes when clicking outside', () => {
    render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);

    // Find the backdrop (motion-div) and click it
    const backdrop = screen.getByTestId('motion-div');
    fireEvent.click(backdrop);

    // Should call setIsOpen with false
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('handles email copy action', () => {
    // Mock setTimeout
    jest.useFakeTimers();

    render(<CommandMenu isOpen={true} setIsOpen={mockSetIsOpen} />);

    // Find the copy to clipboard component and click it
    const copyComponent = screen.getByTestId('copy-to-clipboard');
    fireEvent.click(copyComponent);

    // Should show copied notification
    expect(screen.getByText('Email copied to clipboard')).toBeInTheDocument();

    // Fast-forward timers
    jest.runAllTimers();

    // Should close after timeout
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);

    // Restore timers
    jest.useRealTimers();
  });
});
