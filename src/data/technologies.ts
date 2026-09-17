export interface TechItem {
  name: string;
  description?: string;
}

export interface TechGroup {
  id: string;
  label: string;
  items: TechItem[];
}

export const TECH_GROUPS: TechGroup[] = [
  {
    id: 'development',
    label: 'DEVELOPMENT',
    items: [
      { name: 'Java', description: 'Enterprise backend foundation' },
      { name: 'Python', description: 'Versatile scripting and ML' },
      { name: 'JavaScript', description: 'Client-side interactivity' },
      { name: 'React', description: 'Modern UI architecture' },
      { name: 'Node.js', description: 'Scalable backend services' },
      { name: 'Spring Boot', description: 'Robust microservices framework' }
    ]
  },
  {
    id: 'data-ai',
    label: 'DATA & AI',
    items: [
      { name: 'Python', description: 'Data science ecosystem' },
      { name: 'SQL', description: 'Relational database querying' },
      { name: 'Data Analytics', description: 'Extracting business insights' },
      { name: 'Machine Learning', description: 'Predictive modeling' },
      { name: 'AI', description: 'Advanced artificial intelligence' }
    ]
  },
  {
    id: 'cloud-devops',
    label: 'CLOUD & DEVOPS',
    items: [
      { name: 'Cloud Computing', description: 'Scalable infrastructure' },
      { name: 'Docker', description: 'Containerized deployment' },
      { name: 'DevOps', description: 'Streamlined delivery pipelines' },
      { name: 'Git', description: 'Version control systems' },
      { name: 'CI/CD', description: 'Continuous integration and delivery' }
    ]
  },
  {
    id: 'quality-design',
    label: 'QUALITY & DESIGN',
    items: [
      { name: 'Software Testing', description: 'Ensuring robust applications' },
      { name: 'UI/UX', description: 'User-centric design principles' },
      { name: 'APIs', description: 'System communication interfaces' },
      { name: 'Databases', description: 'Efficient data storage' }
    ]
  }
];
