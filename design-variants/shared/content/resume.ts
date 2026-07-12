import type { Resume } from "../types";

export const resume: Resume = {
  roles: [
    {
      company: "Independent",
      title: "Freelance Software Consultant",
      startDate: "2023",
      endDate: null,
      location: "Honolulu, HI",
      bullets: [
        "Architected and shipped full-stack web applications for small businesses and creative studios across Hawaiʻi.",
        "Advised on cloud infrastructure, CI/CD pipelines, and developer experience improvements.",
        "Built reusable component systems and design tokens that reduced new-project setup time by 60%.",
      ],
      technologies: ["TypeScript", "React", "Node.js", "AWS", "Vite"],
      featured: true,
    },
    {
      company: "Vanta Studios",
      title: "Senior Full-Stack Engineer",
      startDate: "2020",
      endDate: "2023",
      location: "San Francisco, CA",
      bullets: [
        "Led the rewrite of a legacy PHP platform to a modern TypeScript monorepo serving 50K+ monthly users.",
        "Introduced end-to-end type safety, reducing production bugs by 40% in the first quarter post-launch.",
        "Mentored four junior engineers; two were promoted to mid-level during my tenure.",
      ],
      technologies: ["TypeScript", "React", "GraphQL", "PostgreSQL", "Docker"],
      featured: false,
    },
    {
      company: "Wavefront Labs",
      title: "Full-Stack Engineer",
      startDate: "2018",
      endDate: "2020",
      location: "Remote",
      bullets: [
        "Built real-time data visualization dashboards for oceanographic sensor networks.",
        "Implemented WebSocket-based streaming pipeline handling 10K messages/second at peak load.",
        "Open-sourced the charting library; reached 1.2K GitHub stars and was adopted by three universities.",
      ],
      technologies: ["JavaScript", "D3.js", "WebSocket", "Redis", "Python"],
      featured: true,
    },
    {
      company: "Blue Horizon Digital",
      title: "Frontend Developer",
      startDate: "2016",
      endDate: "2018",
      location: "Seattle, WA",
      bullets: [
        "Developed responsive marketing sites and web apps for clients in the marine and outdoor industries.",
        "Established the agency's first reusable CSS architecture, adopted across all client projects.",
      ],
      technologies: ["JavaScript", "Sass", "jQuery", "PHP", "WordPress"],
      featured: false,
    },
  ],
  skills: [
    "TypeScript", "React", "Node.js", "Python", "PostgreSQL", "AWS",
    "Docker", "GraphQL", "Vite", "Tailwind CSS", "Figma", "Redis",
  ],
  education: [
    {
      institution: "University of Washington",
      degree: "B.S. in Computer Science",
      years: "2012–2016",
    },
  ],
  pdfUrl: "/assets/resume-placeholder.pdf",
};
