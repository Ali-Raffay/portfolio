export const personalInfo = {
  name: "Ali Raffay",
  tagline: "Demo",
  bio: "Demo and demo demo",
  email: "raffay004@gmail.com",
  github: "https://github.com/Ali-Raffay",
  linkedin: "https://www.linkedin.com/in/ali-raffay-8588b8399",
  location: "Pakistan, Multan",
  resumeUrl: "/resume.pdf",
}

export const skills = [
  { name: "React", level: 85, category: "Frontend" },
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "Tailwind CSS", level: 88, category: "Frontend" },
  { name: "Three.js", level: 70, category: "3D Graphics" },
  { name: "GSAP", level: 75, category: "Animation" },
  { name: "Express", level: 78, category: "Backend" },
  { name: "Python", level: 72, category: "Backend" },
  { name: "PostgreSQL", level: 76, category: "Database" },
]

export const education = [
  {
    degree: "BS Data Science",
    institution: "Emerson University",
    year: "2024",
    description: "Specialized in data analytics and machine learning applications.",
  },
  {
    degree: "Web Development Bootcamp",
    institution: "Self-taught",
    year: "2023",
    description: "Full-stack development with React, Node.js, and modern web technologies.",
  },
]

export const experience = [
  {
    role: "Full Stack Developer",
    company: "Tech Solutions Inc",
    duration: "Jan 2024 – Present",
    description: "Building scalable web applications with React and Node.js, implementing real-time features with WebSockets.",
  },
  {
    role: "Frontend Developer Intern",
    company: "Digital Agency Co",
    duration: "Jun 2023 – Dec 2023",
    description: "Created responsive UI components and optimized website performance, improved load time by 40%.",
  },
]

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    shortDesc: "Full-stack e-commerce solution with payment integration",
    fullDesc: "A complete e-commerce platform built with React, Node.js, and MongoDB. Features include product catalog, shopping cart, secure payment processing with Stripe, user authentication, and admin dashboard for inventory management.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    github: "https://github.com/Ali-Raffay/ecommerce-platform",
    live: "https://ecommerce-demo.vercel.app",
    color: "#7c3aed",
  },
  {
    id: 2,
    title: "Real-time Chat Application",
    shortDesc: "WebSocket-based messaging app with room support",
    fullDesc: "A real-time chat application enabling users to create rooms and communicate instantly. Built with Socket.io, Express, and React, featuring user authentication, message persistence, and typing indicators.",
    tech: ["React", "Socket.io", "Express", "MongoDB", "Firebase"],
    github: "https://github.com/Ali-Raffay/chat-app",
    live: "https://chat-app-demo.vercel.app",
    color: "#06b6d4",
  },
  {
    id: 3,
    title: "Task Management System",
    shortDesc: "Collaborative project management tool",
    fullDesc: "A Trello-like task management system with drag-and-drop functionality, team collaboration features, and real-time updates. Built with React, Firebase, and Tailwind CSS.",
    tech: ["React", "Firebase", "Tailwind CSS", "React Beautiful DnD"],
    github: "https://github.com/Ali-Raffay/task-manager",
    live: "https://task-manager-demo.vercel.app",
    color: "#a855f7",
  },
  {
    id: 4,
    title: "Weather Forecast App",
    shortDesc: "Real-time weather data with beautiful UI",
    fullDesc: "A responsive weather application using OpenWeather API. Features include current weather, 7-day forecast, location search, and interactive maps integration.",
    tech: ["React", "OpenWeather API", "Mapbox", "Axios"],
    github: "https://github.com/Ali-Raffay/weather-app",
    live: "https://weather-app-demo.vercel.app",
    color: "#f59e0b",
  },
  {
    id: 5,
    title: "Content Management System",
    shortDesc: "Headless CMS for managing digital content",
    fullDesc: "A powerful headless CMS allowing users to create, manage, and publish content across multiple platforms. Features REST API, markdown support, and content versioning.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
    github: "https://github.com/Ali-Raffay/cms",
    live: "https://cms-demo.vercel.app",
    color: "#10b981",
  },
]

export const socialLinks = [
  { platform: "GitHub", url: personalInfo.github, icon: "github" },
  { platform: "LinkedIn", url: personalInfo.linkedin, icon: "linkedin" },
  { platform: "Email", url: `mailto:${personalInfo.email}`, icon: "mail" },
]
