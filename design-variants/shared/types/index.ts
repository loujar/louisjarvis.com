// Shared type definitions for all design variants

export interface Profile {
  name: string;
  headline: string;
  location: string;
  shortBio: string;
  portraitUrl: string;
  email: string;
}

export interface ResumeRole {
  company: string;
  title: string;
  startDate: string;
  endDate: string | null; // null = present
  location: string;
  bullets: string[];
  technologies: string[];
  featured?: boolean;
}

export interface Resume {
  roles: ResumeRole[];
  skills: string[];
  education: {
    institution: string;
    degree: string;
    years: string;
  }[];
  pdfUrl: string | null;
}

export interface Photo {
  id: string;
  title: string;
  location: string;
  date: string;
  imageUrl: string;
  thumbUrl: string;
  tags: string[];
  blurb: string;
  camera?: string;
}

export interface LinkItem {
  label: string;
  url: string;
  iconKey: string;
  priority: number;
}

export interface Bio {
  paragraphs: string[];
  highlights: string[];
}

export type TabId = "home" | "resume" | "bio" | "photography" | "links";

export interface TabDef {
  id: TabId;
  label: string;
}
