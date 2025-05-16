export interface Experience {
  title: string;
  company: string;
  location: string;
  dates: string;
  blurb: string[];
}

export interface Skill {
  name: string;
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
  experiences: Experience[];
  skills: Skill[];
  socialLinks: SocialLink[];
  email: string;
  phone: string;
  location: string;
}
