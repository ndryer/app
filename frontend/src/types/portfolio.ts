import { LucideIcon } from 'lucide-react';

/**
 * Portfolio Type Definitions
 * Single source of truth for all data models used in the portfolio application
 */

export interface Project {
  name: string;
  description: string;
}

export interface Experience {
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
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface UserData {
  fullName: string;
  bioLine: string;
  photoUrl: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
  resumeUrl: string;
}

/**
 * Theme and UI related types
 */
export interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

/**
 * Component prop interfaces
 */
export interface HeaderProps {
  userData: UserData;
  toggleTheme: () => void;
  darkMode: boolean;
  toggleCommandMenu: () => void;
}

export interface TimelineProps {
  experienceData: Experience[];
}

export interface SkillsProps {
  skillsData: Skill[];
}

export interface FooterProps {
  userData: UserData;
}

export interface FloatingActionButtonProps {
  toggleCommandMenu: () => void;
}

export interface CommandMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
