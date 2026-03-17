import {
  Code2,
  Shield,
  TestTube,
  Gauge,
  Terminal,
  Github,
  Rocket,
  Award,
} from "lucide-react";

export const skills = [
  {
    name: "TypeScript",
    category: "Language",
    color: "from-[#3178C6]/10 to-black/5", // TypeScript blue
  },
  {
    name: "React.js",
    category: "Frontend",
    color: "from-[#61DAFB]/10 to-black/5", // React cyan
  },
  {
    name: "Express.js",
    category: "Backend",
    color: "from-[#000000]/10 to-[#353535]/5", // Express black/dark
  },
  {
    name: "MongoDB",
    category: "Database",
    color: "from-[#47A248]/10 to-black/5", // MongoDB green
  },
  {
    name: "Next.js",
    category: "Full Stack",
    color: "from-[#000000]/10 to-[#111111]/5", // Next.js black
  },
  {
    name: "Selenium",
    category: "Testing",
    color: "from-[#43B02A]/10 to-black/5", // Selenium green
  },
  {
    name: "REST Assured",
    category: "API Testing",
    color: "from-[#4B8BBE]/10 to-black/5", // REST Assured blue
  },
  {
    name: "Grafana",
    category: "Monitoring",
    color: "from-[#F46800]/10 to-black/5", // Grafana orange
  },
  {
    name: "Metasploit",
    category: "Security",
    color: "from-[#E31F26]/10 to-black/5", // Metasploit red
  },
  {
    name: "Docker",
    category: "DevOps",
    color: "from-[#2496ED]/10 to-black/5", // Docker blue
  },
];

export const stats = [
  { label: "Full Stack Apps", value: "16+", icon: Rocket, accent: "#3b82f6" },
  { label: "Automation Tests", value: "7+", icon: TestTube, accent: "#10b981" },
  { label: "API Tests", value: "7+", icon: Terminal, accent: "#f59e0b" },
  { label: "Perf. Tests", value: "12+", icon: Gauge, accent: "#8b5cf6" },
  { label: "Custom Reports", value: "130+", icon: Award, accent: "#ec4899" },
  { label: "Lines of Code", value: "11700K+", icon: Code2, accent: "#06b6d4" },
  { label: "Devices Secured", value: "26+", icon: Shield, accent: "#ef4444" },
  { label: "GitHub Repos", value: "150+", icon: Github, accent: "#6366f1" },
];

export const projects = [
  {
    name: "Caffetest",
    tag: "Bug Tracking · AI",
    description:
      "A next-generation bug tracking application integrated with Anthropic AI. Features intelligent auto bug lock based on real-time test results, automated reports, and smart defect analysis.",
    users: "400+",
    tech: [
      "Express.js",
      "Node.js",
      "MongoDB",
      "React.js",
      "Anthropic API",
      "JavaScript",
    ],
    links: {
      app: "https://caffetest.vercel.app",
      frontend:
        "https://github.com/gyanaprakashkhandual/bug-tracking-app-frontned",
      backend:
        "https://github.com/gyanaprakashkhandual/bug-tracking-app-backend",
    },
    gradient: "from-blue-500/5 to-indigo-500/5",
  },
  {
    name: "Fetch",
    tag: "API Testing · AI",
    description:
      "Automatic API testing powered by Anthropic. Intelligently scans your entire codebase, maps all endpoints, and generates comprehensive test suites — completely autonomously.",
    users: "200+",
    tech: [
      "Express.js",
      "Node.js",
      "MongoDB",
      "Next.js",
      "Anthropic API",
      "TypeScript",
    ],
    links: {
      app: "https://fectch.metronique.vercel.app",
      frontend: "https://github.com/gyanaprakashkhandual/fetch-frontend",
      backend: "https://github.com/gyanaprakashkhandual/fetch-backend",
    },
    gradient: "from-emerald-500/5 to-teal-500/5",
  },
];

export const extensions = [
  {
    name: "Selenium Cucumber",
    description:
      "Auto-generates step definition code from raw Cucumber BDD. Slashes boilerplate and accelerates test automation workflows inside VS Code.",
    installs: "7000+",
    color: "from-green-500/10",
  },
  {
    name: "Caffetest Tracker",
    description:
      "Brings bug tracking and reporting directly into VS Code. Seamlessly integrates Caffetest's full power into your development environment.",
    installs: "604+",
    color: "from-blue-500/10",
  },
];

export const testimonials = [
  {
    name: "Dharmendra Kumar",
    role: "Product Manager",
    company: "Avidus Interactive",
    feedback:
      "Gyan's expertise in full-stack development and test automation has been invaluable. The quality of work is exceptional.",
    avatar: "DK",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Adishree Agrwal",
    role: "CEO",
    company: "Avidus Interactive",
    feedback:
      "Working with Gyan was a game-changer. The AI-integrated solutions delivered exceeded our expectations every single time.",
    avatar: "AA",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Ankshika Mishra",
    role: "Lead Developer",
    company: "Avidus Interactive",
    feedback:
      "Outstanding technical skills and problem-solving abilities. The automation tools built saved us countless hours of manual work.",
    avatar: "AM",
    color: "from-violet-500 to-purple-500",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

import { Variants } from "framer-motion";

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};
