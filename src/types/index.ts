import { LucideIcon } from 'lucide-react';

/**
 * Portfolio Type Definitions
 * Single source of truth for all data models used in the portfolio application
 */

export type Project = {
  name: string;
  description: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  icon: LucideIcon;
  achievements: string[];
  technologies: string[];
  projects: Project[];
};

export type Skill = {
  id: string;
  name: string;
  level: number;
  icon?: string;
};

export type SocialLink = {
  name: string;
  url: string;
};

export type UserData = {
  fullName: string;
  bioLine: string;
  photoUrl: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
  resumeUrl: string;
};

/**
 * Theme and UI related types
 */
export type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

/**
 * Component prop interfaces
 */
export type HeaderProps = {
  userData: UserData;
  toggleTheme: () => void;
  darkMode: boolean;
  toggleCommandMenu: () => void;
};

export type TimelineProps = {
  experienceData: Experience[];
};

export type SkillsProps = {
  skillsData: Skill[];
};

export type FooterProps = {
  userData: UserData;
};

export type FloatingActionButtonProps = {
  toggleCommandMenu: () => void;
};

export type CommandMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
