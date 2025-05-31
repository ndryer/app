import { LucideIcon } from 'lucide-react';

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

// Legacy interfaces to maintain compatibility during migration
export interface LegacyExperience {
  title: string;
  company: string;
  location: string;
  dates: string;
  blurb: string[];
}
