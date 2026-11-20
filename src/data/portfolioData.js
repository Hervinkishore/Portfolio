import {
  Coffee,
  Code2,
  Database,
  Globe,
  ShoppingCart,
  Mountain,
  BarChart3
} from 'lucide-react';

export const personalInfo = {
  name: 'Kishore M S',
  handle: 'KISHORE.MS',
  title: 'Computer Science Student & Developer',
  email: 'hervinsspam@example.com',
  linkedinUrl: 'https://www.linkedin.com/in/kishore-ms-9910b3317',
  githubUrl: 'https://github.com/Hervinkishore',
  location: 'Thiruvallur, Tamil Nadu',
  education: {
    period: '2022 - 2026',
    degree: 'B.E - Computer Science and Engineering',
    institution: 'Panimalar Engineering College',
    location: 'Poonamallee, Tamil Nadu'
  }
};

export const coreSkills = [
  {
    title: 'Java',
    subtitle: 'Primary Language',
    icon: Coffee,
  },
  {
    title: 'DSA',
    subtitle: 'Problem Solving',
    icon: Code2,
  },
  {
    title: 'SQL',
    subtitle: 'Database Skills',
    icon: Database,
  },
  {
    title: 'Web Dev',
    subtitle: 'Frontend Development',
    icon: Globe,
  },
];

export const projects = [
  {
    id: '01',
    title: 'Mobile Ecommerce Application',
    meta: 'Pearl Tech Solutions • Jul 2024',
    summary: 'A web application for seamless shopping experience.',
    stack: ['React', 'JavaScript', 'REST API', 'Tailwind CSS'],
    details:
      'Engineered a responsive mobile-first storefront featuring instant product filtering, persistent cart state, optimized checkout flow, and clean modular UI components.',
    icon: ShoppingCart,
  },
  {
    id: '02',
    title: 'Trekking Management System',
    meta: 'Flask • SQLite • Bootstrap',
    summary: 'Plan and manage treks with ease.',
    stack: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
    details:
      'Built a full-stack trail booking and itinerary tracker allowing trekkers to browse routes, check difficulty levels, reserve slots, and manage group schedules.',
    icon: Mountain,
  },
  {
    id: '03',
    title: 'Employee Attendance Dashboard',
    meta: 'React • Firebase',
    summary: 'Track and manage attendance efficiently.',
    stack: ['React', 'Firebase', 'Realtime DB', 'Analytics'],
    details:
      'Developed an administrative attendance analytics dashboard with real-time check-in logs, leave summaries, and automated daily reporting.',
    icon: BarChart3,
  },
];
