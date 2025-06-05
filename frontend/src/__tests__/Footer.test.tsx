import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer';
import { UserData } from '../types';

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

  it('renders correctly', () => {
    const { container } = render(<Footer userData={mockUserData} />);
    expect(container).toMatchSnapshot();
  });

  it('displays the correct copyright year', () => {
    render(<Footer userData={mockUserData} />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} ${mockUserData.fullName}`))
    ).toBeInTheDocument();
  });

  it('renders all social links', () => {
    render(<Footer userData={mockUserData} />);

    // Check that all social links are rendered
    const socialLinks = screen.getAllByTestId('motion-link');
    expect(socialLinks.length).toBe(3); // GitHub, LinkedIn, Email

    // Verify GitHub link
    const githubLink = socialLinks[0];
    expect(githubLink).toHaveAttribute('href', mockUserData.socialLinks[0].url);

    // Verify LinkedIn link
    const linkedinLink = socialLinks[1];
    expect(linkedinLink).toHaveAttribute(
      'href',
      mockUserData.socialLinks[1].url
    );

    // Verify Email link
    const emailLink = socialLinks[2];
    expect(emailLink).toHaveAttribute('href', `mailto:${mockUserData.email}`);
  });
});
