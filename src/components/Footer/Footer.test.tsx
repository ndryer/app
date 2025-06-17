import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer'; // Adjusted import path
import { UserData } from '../../types'; // Adjusted import path

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    a: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <a data-testid='motion-link' {...props}>
        {children}
      </a>
    ),
  },
}));

describe('Footer Component', () => {
  // Create mock user data
  const mockUserData: UserData = {
    fullName: 'Test User',
    bioLine: 'Test Bio',
    photoUrl: '/test.jpg',
    email: 'test@example.com',
    phone: '(123) 456-7890',
    location: 'Test Location',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com/test-user' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/test-user' },
      { name: 'Personal Site', url: 'https://test-user.com' },
    ],
    resumeUrl: '/test_resume.pdf',
  };

  it('should render correctly and match snapshot', () => {
    const { container } = render(<Footer userData={mockUserData} />);
    expect(container).toMatchSnapshot();
  });

  it('should display the correct copyright year and user name', () => {
    render(<Footer userData={mockUserData} />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} ${mockUserData.fullName}`))
    ).toBeInTheDocument();
  });

  it('should render all social links with correct href attributes', () => {
    render(<Footer userData={mockUserData} />);

    // Check that all social links are rendered
    const socialLinks = screen.getAllByTestId('motion-link');
    // Note: The snapshot shows 3 links: GitHub, LinkedIn, Email. 
    // The mock socialLinks array has 3 items, but the component might be hardcoding the email link.
    // Based on the current Footer.tsx, it does not render social links from props, only a copyright line.
    // Therefore, this test will likely fail or needs adjustment based on actual Footer.tsx implementation.
    // For now, assuming the test reflects an older version or intended functionality.
    // If Footer.tsx is updated to use socialLinks from userData, this test will be more relevant.
    
    // This expectation needs to be aligned with the actual number of links rendered by Footer.tsx
    // Based on the provided Footer.tsx, it seems it *doesn't* render these social links dynamically.
    // The snapshot for Footer.test.tsx.snap however *does* show these links.
    // This indicates a discrepancy between the component code and its test/snapshot.
    // For now, I will keep the test as is, assuming the snapshot is the source of truth for desired functionality.
    expect(socialLinks.length).toBe(3); 

    const githubLink = socialLinks.find(link => link.getAttribute('aria-label') === 'GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test-user');

    const linkedinLink = socialLinks.find(link => link.getAttribute('aria-label') === 'LinkedIn');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/test-user');
    
    const emailLink = socialLinks.find(link => link.getAttribute('aria-label') === 'Email');
    expect(emailLink).toHaveAttribute('href', `mailto:${mockUserData.email}`);
  });
}); 