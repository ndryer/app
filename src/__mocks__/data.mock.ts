import {
  Briefcase,
  Building2,
  GraduationCap,
  Award,
  Brain,
} from 'lucide-react';
import { Experience, Skill, UserData } from '../types';

/**
 * Mock Data for Portfolio Application
 * This file contains static data that implements the interfaces defined in types/portfolio.ts
 */

// Enhanced experience data with additional details
export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    title: 'AI Product Manager',
    company: 'Anthropic',
    location: 'San Francisco, CA',
    date: '2022 - Present',
    description:
      'Leading product development for agent orchestration systems and AI-powered automation tools.',
    icon: Brain,
    achievements: [
      'Led the development of a groundbreaking agent orchestration framework that reduced task completion time by 67%',
      'Designed and implemented a natural language interface that increased user adoption by 43% in the first quarter',
      'Established product metrics and analytics framework to measure AI agent performance and business impact',
      'Collaborated with research teams to translate cutting-edge AI capabilities into practical product features',
    ],
    technologies: [
      'LLM Orchestration',
      'Python',
      'TypeScript',
      'React',
      'FastAPI',
      'Vector Databases',
      'Embeddings',
    ],
    projects: [
      {
        name: 'Eko Framework',
        description:
          'Developed a comprehensive framework for building computer use agents with natural language interfaces',
      },
      {
        name: 'Agent Collaboration System',
        description:
          'Created a system allowing multiple specialized AI agents to collaborate on complex tasks',
      },
      {
        name: 'Multimodal Reasoning Pipeline',
        description:
          'Built a pipeline for processing and reasoning about multimodal inputs (text, images, code)',
      },
    ],
  },
  {
    id: 'exp-2',
    title: 'Senior Product Manager',
    company: 'ForeSee',
    location: 'San Francisco, CA',
    date: 'April 2017 - 2022',
    description:
      'Led product strategy and development for enterprise feedback and analytics solutions.',
    icon: Briefcase,
    achievements: [
      'Built new user management tools from scratch for the Enterprise Suite Platform, reducing support costs by 78%',
      'Developed feedback collection tools that increased response rates by 35% across client implementations',
      'Implemented AI-powered analytics features that surfaced actionable insights from unstructured feedback data',
      'Managed a cross-functional team of designers, engineers, and data scientists to deliver quarterly releases',
    ],
    technologies: [
      'Product Analytics',
      'SQL',
      'Tableau',
      'JIRA',
      'Figma',
      'NLP',
      'A/B Testing',
    ],
    projects: [
      {
        name: 'Enterprise Suite 2.0',
        description:
          'Complete redesign of the enterprise platform with self-service capabilities and improved UX',
      },
      {
        name: 'Feedback Intelligence',
        description:
          'AI-powered system for analyzing customer feedback and generating actionable insights',
      },
    ],
  },
  {
    id: 'exp-3',
    title: 'Product Manager',
    company: 'McKesson Corp. (RelayHealth)',
    location: 'San Francisco, CA',
    date: 'Jan 2015 - April 2017',
    description:
      'Defined roadmap and strategy for healthcare management product lines worth $40M annually.',
    icon: Building2,
    achievements: [
      'Grew user base by 35% from 4.1 to 5.5M in a one-year period through strategic feature development',
      'Implemented a patient engagement platform that increased medication adherence by 28%',
      'Led the development of a secure messaging system compliant with HIPAA regulations',
      'Collaborated with healthcare providers to identify and prioritize high-impact features',
    ],
    technologies: [
      'Healthcare IT',
      'HIPAA Compliance',
      'Agile',
      'User Research',
      'Data Security',
      'Electronic Health Records',
    ],
    projects: [
      {
        name: 'Patient Portal 3.0',
        description:
          'Redesigned patient portal with improved accessibility and mobile responsiveness',
      },
      {
        name: 'Provider Communication Suite',
        description:
          'Secure messaging and collaboration tools for healthcare providers',
      },
    ],
  },
  {
    id: 'exp-4',
    title: 'Sr. Business Analyst',
    company: 'Fifth Third Bank (Corporate, Digital Delivery Team)',
    location: 'Cincinnati, Ohio',
    date: '2011 - 2015',
    description:
      'Defined digital product requirements and functional specifications with business partners.',
    icon: Award,
    achievements: [
      "Led the functional design of Fifth Third's first mobile apps and mobile deposit functionality",
      'Increased mobile banking adoption by 47% through improved UX and feature development',
      'Developed comprehensive user stories and acceptance criteria for digital banking features',
      'Facilitated workshops with stakeholders to align on product vision and requirements',
    ],
    technologies: [
      'Business Analysis',
      'Mobile Banking',
      'User Stories',
      'Wireframing',
      'Financial Services',
      'Regulatory Compliance',
    ],
    projects: [
      {
        name: 'Mobile Banking Platform',
        description:
          'First-generation mobile banking application with secure transaction capabilities',
      },
      {
        name: 'Remote Deposit Capture',
        description:
          'Feature allowing customers to deposit checks using their smartphone cameras',
      },
    ],
  },
  {
    id: 'exp-5',
    title: 'IT Leader Rotational Program',
    company: 'Fifth Third Bank (Corporate, Digital Delivery Team)',
    location: 'Cincinnati, Ohio',
    date: '2009 - 2011',
    description:
      'Completed 2-year leadership rotational program across multiple IT disciplines.',
    icon: GraduationCap,
    achievements: [
      'Rotated through Product Management, Business Analysis, and Project Management roles',
      "Contributed to the bank's first digital transformation initiative",
      'Developed technical and leadership skills across multiple disciplines',
      'Received recognition for outstanding performance in each rotation',
    ],
    technologies: [
      'Project Management',
      'Business Analysis',
      'Product Management',
      'Agile',
      'Banking Technology',
    ],
    projects: [
      {
        name: 'Digital Banking Strategy',
        description:
          'Contributed to the long-term digital banking strategy and implementation roadmap',
      },
      {
        name: 'Online Banking Redesign',
        description:
          'Assisted with requirements gathering and user testing for online banking platform',
      },
    ],
  },
];

// Enhanced skills data with proficiency levels
export const skillsData: Skill[] = [
  { id: 'skill-1', name: 'LLM Orchestration & Prompt Engineering', level: 95 },
  { id: 'skill-2', name: 'AI/ML Product Development', level: 92 },
  { id: 'skill-3', name: 'Agent Architecture Design', level: 90 },
  { id: 'skill-4', name: 'Natural Language Interface Design', level: 88 },
  { id: 'skill-5', name: 'Product Strategy & Roadmapping', level: 94 },
  { id: 'skill-6', name: 'User Experience Research', level: 85 },
  { id: 'skill-7', name: 'Technical Requirement Definition', level: 87 },
  { id: 'skill-8', name: 'Data Analysis & Metrics', level: 82 },
  { id: 'skill-9', name: 'Agile Product Management', level: 90 },
  { id: 'skill-10', name: 'Cross-functional Team Leadership', level: 88 },
  { id: 'skill-11', name: 'Vector Database Implementation', level: 78 },
  { id: 'skill-12', name: 'Multimodal AI Applications', level: 84 },
  { id: 'skill-13', name: 'Retrieval Augmented Generation', level: 86 },
  { id: 'skill-14', name: 'Python & TypeScript Development', level: 75 },
  { id: 'skill-15', name: 'Prototyping & Wireframing', level: 80 },
  { id: 'skill-16', name: 'AI Ethics & Responsible AI', level: 89 },
  { id: 'skill-17', name: 'Product Analytics & KPIs', level: 91 },
  { id: 'skill-18', name: 'Go-to-Market Strategy', level: 83 },
  { id: 'skill-19', name: 'Competitive Analysis', level: 79 },
  { id: 'skill-20', name: 'User Story Mapping', level: 86 },
];

// Profile photo will be saved and referenced locally
export const userData: UserData = {
  fullName: 'Nathan Dryer',
  bioLine: 'AI/ML Product Manager • Agent Orchestrator',
  photoUrl: '/profile.jpg', // We'll save this image from the provided photo
  email: 'nathan.dryer@example.com',
  phone: '(513) 448-5603',
  location: 'San Francisco, California',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/nathan-dryer' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nathandryer' },
    { name: 'Personal Site', url: 'https://nathandryer.com' },
  ],
  resumeUrl: '/nathan_dryer_resume.pdf',
};
