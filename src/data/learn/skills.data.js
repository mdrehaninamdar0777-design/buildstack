export const skills = [
  {
    id: "html",
    slug: "html",
    name: "HTML",
    category: "Web Development",
    level: "Beginner",
    description:
      "Learn how to structure modern web pages using semantic HTML.",
    lessons: 24,
    duration: "8–10 hours",
    progress: 95,
  },
  {
    id: "css",
    slug: "css",
    name: "CSS",
    category: "Web Development",
    level: "Beginner",
    description:
      "Master layouts, responsive design, animations, and modern CSS.",
    lessons: 30,
    duration: "10–12 hours",
    progress: 90,
  },
  {
    id: "javascript",
    slug: "javascript",
    name: "JavaScript",
    category: "Web Development",
    level: "Intermediate",
    description:
      "Build strong JavaScript fundamentals and create interactive applications.",
    lessons: 42,
    duration: "16–20 hours",
    progress: 80,
  },
  {
    id: "react",
    slug: "react",
    name: "React",
    category: "Frontend",
    level: "Beginner",
    description:
      "A JavaScript library for building user interfaces, developed by Facebook. React makes it painless to create interactive UIs with component-based architecture.",
    lessons: 48,
    duration: "20–25 hours",
    progress: 65,

    overview:
      "Learn the core concepts of React from the ground up and build real-world applications.",

    prerequisites: [
      "Basic HTML, CSS & JavaScript",
      "ES6+ JavaScript",
      "Understanding of DOM",
    ],

    outcomes: [
      "Build interactive UIs with React",
      "Understand components & props",
      "Manage state and lifecycle",
      "Work with hooks and context API",
      "Build and deploy real-world apps",
    ],

    notes: [
      {
        id: 1,
        title: "Introduction to React",
        chapter: "Chapter 1",
        pages: "25 Pages",
        size: "1.2 MB",
      },
      {
        id: 2,
        title: "Components in React",
        chapter: "Chapter 2",
        pages: "32 Pages",
        size: "1.5 MB",
      },
      {
        id: 3,
        title: "State and Lifecycle",
        chapter: "Chapter 3",
        pages: "28 Pages",
        size: "1.3 MB",
      },
      {
        id: 4,
        title: "Handling Events",
        chapter: "Chapter 4",
        pages: "18 Pages",
        size: "0.9 MB",
      },
      {
        id: 5,
        title: "React Hooks",
        chapter: "Chapter 5",
        pages: "35 Pages",
        size: "1.7 MB",
      },
    ],

    videos: {
      title: "Video Lectures",
      description:
        "Watch step-by-step video lectures to learn React visually and practically.",
    },

    documentation: {
      title: "Documentation",
      description:
        "Access official React documentation and trusted learning resources.",
    },

    quiz: {
      title: "Quiz",
      description:
        "Test your understanding with quizzes and track your knowledge.",
    },

    practice: {
      title: "Practice",
      description:
        "Solve practice questions and coding challenges to strengthen your skills.",
    },

    previousSkill: {
      slug: "javascript",
      name: "JavaScript",
    },

    nextSkill: {
      slug: "nextjs",
      name: "Next.js",
    },
  },

  {
    id: "nextjs",
    slug: "nextjs",
    name: "Next.js",
    category: "Web Development",
    level: "Intermediate",
    description:
      "Build production-ready React applications with Next.js.",
    lessons: 36,
    duration: "15–18 hours",
    progress: 0,
  },
  {
    id: "nodejs",
    slug: "nodejs",
    name: "Node.js",
    category: "Backend Development",
    level: "Intermediate",
    description:
      "Learn server-side JavaScript and build scalable backend applications.",
    lessons: 40,
    duration: "18–22 hours",
    progress: 35,
  },
  {
    id: "expressjs",
    slug: "expressjs",
    name: "Express.js",
    category: "Backend Development",
    level: "Intermediate",
    description:
      "Build APIs and backend services using Express.js.",
    lessons: 28,
    duration: "10–14 hours",
    progress: 20,
  },
  {
    id: "mongodb",
    slug: "mongodb",
    name: "MongoDB",
    category: "Database",
    level: "Beginner",
    description:
      "Learn document databases, queries, indexing, and data modeling.",
    lessons: 26,
    duration: "10–12 hours",
    progress: 20,
  },
  {
    id: "python",
    slug: "python",
    name: "Python",
    category: "Software Development",
    level: "Beginner",
    description:
      "Learn Python programming from fundamentals to practical development.",
    lessons: 45,
    duration: "18–24 hours",
    progress: 0,
  },
  {
    id: "typescript",
    slug: "typescript",
    name: "TypeScript",
    category: "Web Development",
    level: "Intermediate",
    description:
      "Add type safety and scalable architecture to JavaScript applications.",
    lessons: 32,
    duration: "12–16 hours",
    progress: 60,
  },
  {
    id: "docker",
    slug: "docker",
    name: "Docker",
    category: "DevOps",
    level: "Beginner",
    description:
      "Learn containers, images, Dockerfiles, and modern deployment workflows.",
    lessons: 22,
    duration: "8–10 hours",
    progress: 0,
  },
  {
    id: "git",
    slug: "git",
    name: "Git & GitHub",
    category: "Developer Tools",
    level: "Beginner",
    description:
      "Master version control and collaborative development with Git and GitHub.",
    lessons: 20,
    duration: "6–8 hours",
    progress: 100,
  },
];